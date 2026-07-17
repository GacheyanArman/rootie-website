import { randomUUID, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { getCatalogBucket, getSupabaseAdmin, hasSupabaseConfig } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const MAX_IMAGE_BYTES = 3.5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const STOCK_STATUSES = new Set(['available', 'low', 'out'])
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === 'string'
    ? value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength)
    : ''
}

function safeSecretMatches(received: string, expected: string) {
  const left = Buffer.from(received)
  const right = Buffer.from(expected)
  return left.length === right.length && timingSafeEqual(left, right)
}

function error(message: string, status: number, details?: string) {
  return NextResponse.json({ message, ...(details ? { details } : {}) }, { status })
}

function requireConfigured() {
  if (!hasSupabaseConfig()) {
    throw new Error('SUPABASE_NOT_CONFIGURED')
  }
  return getSupabaseAdmin()
}

export async function GET() {
  try {
    const supabase = requireConfigured()
    const { data, error: queryError } = await supabase
      .from('catalog_items')
      .select('id,name,category,price,stock,image_url,sizes,featured,link,created_at')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(500)

    if (queryError) {
      return error('Не удалось загрузить список товаров.', 502, queryError.message)
    }

    return NextResponse.json({ items: data ?? [] })
  } catch (caughtError) {
    if (caughtError instanceof Error && caughtError.message === 'SUPABASE_NOT_CONFIGURED') {
      return error('Supabase ещё не настроен. Откройте README.md и выполните 4 шага.', 503)
    }
    return error('Не удалось загрузить список товаров.', 500)
  }
}

export async function POST(request: Request) {
  const adminPassword = process.env.CATALOG_ADMIN_PASSWORD
  if (!adminPassword) return error('Пароль администратора не настроен на сервере.', 503)

  let supabase
  try {
    supabase = requireConfigured()
  } catch {
    return error('Supabase ещё не настроен. Откройте README.md и выполните 4 шага.', 503)
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return error('Не удалось прочитать форму.', 400)
  }

  const password = cleanText(formData.get('password'), 200)
  if (!password || !safeSecretMatches(password, adminPassword)) {
    return error('Неверный пароль администратора.', 401)
  }

  const name = cleanText(formData.get('name'), 120)
  const category = cleanText(formData.get('category'), 80)
  const stockValue = cleanText(formData.get('stock'), 20)
  const sizesValue = cleanText(formData.get('sizes'), 240)
  const featured = cleanText(formData.get('featured'), 10).toLowerCase() === 'yes'
  const link = cleanText(formData.get('link'), 500)
  const priceValue = cleanText(formData.get('price'), 20)
  const image = formData.get('image')

  if (!name) return error('Укажите название товара.', 400)
  if (!(image instanceof File) || image.size === 0) return error('Выберите фотографию товара.', 400)
  if (!ALLOWED_IMAGE_TYPES.has(image.type)) return error('Поддерживаются только JPG, PNG и WebP.', 400)
  if (image.size > MAX_IMAGE_BYTES) return error('После сжатия фото должно быть меньше 3,5 МБ.', 413)

  const parsedPrice = Number(priceValue)
  if (!Number.isFinite(parsedPrice) || parsedPrice < 0 || parsedPrice > 100_000_000) {
    return error('Укажите корректную цену.', 400)
  }

  let normalizedLink: string | null = null
  if (link) {
    try {
      const url = new URL(link)
      if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new Error('Invalid protocol')
      normalizedLink = url.toString()
    } catch {
      return error('Ссылка на товар указана неверно.', 400)
    }
  }

  const extension = image.type === 'image/png' ? 'png' : image.type === 'image/webp' ? 'webp' : 'jpg'
  const imagePath = `products/${new Date().toISOString().slice(0, 10)}/${Date.now()}-${randomUUID()}.${extension}`
  const bucket = getCatalogBucket()
  const imageBuffer = Buffer.from(await image.arrayBuffer())

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(imagePath, imageBuffer, {
      contentType: image.type,
      cacheControl: '31536000',
      upsert: false,
    })

  if (uploadError) {
    return error('Не удалось загрузить фотографию.', 502, uploadError.message)
  }

  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(imagePath)
  const imageUrl = publicUrlData.publicUrl
  const sizes = sizesValue
    .split(',')
    .map((size) => size.trim())
    .filter(Boolean)
    .slice(0, 20)

  const { data: inserted, error: insertError } = await supabase
    .from('catalog_items')
    .insert({
      name,
      category,
      price: Math.round(parsedPrice),
      stock: STOCK_STATUSES.has(stockValue) ? stockValue : 'available',
      image_url: imageUrl,
      image_path: imagePath,
      sizes,
      featured,
      link: normalizedLink,
    })
    .select('id,name,category,price,stock,image_url,sizes,featured,link,created_at')
    .single()

  if (insertError) {
    await supabase.storage.from(bucket).remove([imagePath])
    return error('Фото загрузилось, но товар не удалось сохранить.', 502, insertError.message)
  }

  return NextResponse.json({
    message: 'Товар добавлен в каталог.',
    item: inserted,
  })
}

export async function DELETE(request: Request) {
  const adminPassword = process.env.CATALOG_ADMIN_PASSWORD
  if (!adminPassword) return error('Пароль администратора не настроен на сервере.', 503)

  let supabase
  try {
    supabase = requireConfigured()
  } catch {
    return error('Supabase ещё не настроен.', 503)
  }

  let body: { id?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return error('Не удалось прочитать запрос.', 400)
  }

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  const password = typeof body.password === 'string' ? body.password : ''

  if (!password || !safeSecretMatches(password, adminPassword)) {
    return error('Неверный пароль администратора.', 401)
  }
  if (!UUID_PATTERN.test(id)) return error('Некорректный идентификатор товара.', 400)

  const { data: existing, error: findError } = await supabase
    .from('catalog_items')
    .select('image_path')
    .eq('id', id)
    .single()

  if (findError || !existing) return error('Товар не найден.', 404)

  const { error: deleteError } = await supabase.from('catalog_items').delete().eq('id', id)
  if (deleteError) return error('Не удалось удалить товар.', 502, deleteError.message)

  if (existing.image_path) {
    await supabase.storage.from(getCatalogBucket()).remove([existing.image_path])
  }

  return NextResponse.json({ message: 'Товар удалён.' })
}
