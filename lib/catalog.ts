import { getSupabaseAdmin, hasSupabaseConfig } from '@/lib/supabase-admin'

export type StockStatus = 'available' | 'low' | 'out'

export type CatalogItem = {
  id?: string
  name: string
  category: string
  price: number
  stock: StockStatus
  image: string
  sizes: string[]
  featured: boolean
  link?: string
}

const STOCK_STATUSES: StockStatus[] = ['available', 'low', 'out']
const MAX_CATALOG_ROWS = 500

function parseTrustedImageUrl(value: string) {
  const url = new URL(value.trim())
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error('Untrusted image URL')
  }
  return url.toString()
}

function parseTrustedLinkUrl(value: string | null | undefined): string | undefined {
  if (!value?.trim()) return undefined

  try {
    const url = new URL(value.trim())
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return undefined
    return url.toString()
  } catch {
    return undefined
  }
}

function cleanText(value: unknown, maxLength: number) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .trim()
    .slice(0, maxLength)
}

export async function getCatalogItems(): Promise<CatalogItem[]> {
  if (!hasSupabaseConfig()) return []

  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('catalog_items')
      .select('id,name,category,price,stock,image_url,sizes,featured,link,created_at')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(MAX_CATALOG_ROWS)

    if (error) {
      console.error('Supabase catalog error:', error.message)
      return []
    }

    return (data ?? []).flatMap((row): CatalogItem[] => {
      try {
        const name = cleanText(row.name, 120)
        const stock = cleanText(row.stock, 20) as StockStatus
        const price = Number(row.price)

        if (!name || !row.image_url) return []

        return [{
          id: cleanText(row.id, 80) || undefined,
          name,
          category: cleanText(row.category, 80),
          price: Number.isFinite(price) && price >= 0 ? Math.round(price) : 0,
          stock: STOCK_STATUSES.includes(stock) ? stock : 'available',
          image: parseTrustedImageUrl(String(row.image_url)),
          sizes: Array.isArray(row.sizes)
            ? row.sizes.map((size) => cleanText(size, 20)).filter(Boolean).slice(0, 20)
            : [],
          featured: Boolean(row.featured),
          link: parseTrustedLinkUrl(row.link),
        }]
      } catch {
        return []
      }
    })
  } catch (error) {
    console.error('Supabase catalog request failed:', error)
    return []
  }
}
