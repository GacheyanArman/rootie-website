'use client'

import { ChangeEvent, DragEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  LockKeyhole,
  RefreshCw,
  RotateCcw,
  Trash2,
  UploadCloud,
  X,
  ArrowLeft,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/language-provider'
import { LanguageSwitcher } from '@/components/language-switcher'
import { logoutFromAdmin } from '@/app/admin/actions'

type FormStatus =
  | { type: 'idle' }
  | { type: 'loading'; message: string }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

type AdminCatalogItem = {
  id: string
  name: string
  category: string
  price: number
  stock: 'available' | 'low' | 'out'
  image_url: string
  sizes: string[]
  featured: boolean
  link: string | null
  created_at: string
}

const MAX_SOURCE_IMAGE_BYTES = 25 * 1024 * 1024
const MAX_UPLOAD_IMAGE_BYTES = 3.2 * 1024 * 1024
const MAX_IMAGE_DIMENSION = 1800

const subscribeToHydration = () => () => {}

const initialFields = {
  name: '',
  category: '',
  price: '',
  stock: 'available',
  sizes: '',
  featured: false,
  link: '',
  password: '',
}

export function CatalogAdminForm() {
  const { t } = useLanguage()
  const inputRef = useRef<HTMLInputElement>(null)
  const isMounted = useSyncExternalStore(subscribeToHydration, () => true, () => false)
  const [fields, setFields] = useState(initialFields)
  const [image, setImage] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isPreparingImage, setIsPreparingImage] = useState(false)
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })
  const [items, setItems] = useState<AdminCatalogItem[]>([])
  const [isLoadingItems, setIsLoadingItems] = useState(false)
  const [listError, setListError] = useState('')
  const [deletingId, setDeletingId] = useState('')

  const previewUrl = useMemo(() => (image ? URL.createObjectURL(image) : ''), [image])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const loadItems = useCallback(async () => {
    setIsLoadingItems(true)
    setListError('')
    try {
      const response = await fetch('/api/catalog/items', { cache: 'no-store' })
      const payload = (await response.json().catch(() => null)) as {
        items?: AdminCatalogItem[]
        message?: string
        details?: string
      } | null

      if (!response.ok) {
        throw new Error([payload?.message, payload?.details].filter(Boolean).join(' ') || 'Не удалось загрузить товары.')
      }

      setItems(Array.isArray(payload?.items) ? payload.items : [])
    } catch (error) {
      setListError(error instanceof Error ? error.message : 'Не удалось загрузить товары.')
    } finally {
      setIsLoadingItems(false)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const timeoutId = window.setTimeout(() => {
      void loadItems()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [isMounted, loadItems])

  const setField = (name: keyof typeof initialFields, value: string | boolean) => {
    setFields((current) => ({ ...current, [name]: value }))
    if (status.type !== 'idle') setStatus({ type: 'idle' })
  }

  const chooseImage = async (file?: File) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setStatus({ type: 'error', message: 'Выберите файл изображения.' })
      return
    }

    if (file.size > MAX_SOURCE_IMAGE_BYTES) {
      setStatus({ type: 'error', message: 'Исходная фотография слишком большая. Максимальный размер — 25 МБ.' })
      return
    }

    setIsPreparingImage(true)
    setStatus({ type: 'idle' })
    try {
      setImage(await prepareCatalogImage(file))
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Не удалось подготовить фотографию.',
      })
    } finally {
      setIsPreparingImage(false)
    }
  }

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    void chooseImage(event.target.files?.[0])
    event.target.value = ''
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    void chooseImage(event.dataTransfer.files?.[0])
  }

  const resetProduct = (keepPassword = true) => {
    setFields((current) => ({ ...initialFields, password: keepPassword ? current.password : '' }))
    setImage(null)
    setStatus({ type: 'idle' })
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isPreparingImage) {
      setStatus({ type: 'error', message: 'Дождитесь окончания обработки фотографии.' })
      return
    }

    if (!image) {
      setStatus({ type: 'error', message: 'Выберите фотографию товара.' })
      return
    }

    const formData = new FormData()
    formData.set('name', fields.name)
    formData.set('category', fields.category)
    formData.set('price', fields.price)
    formData.set('stock', fields.stock)
    formData.set('sizes', fields.sizes)
    formData.set('featured', fields.featured ? 'yes' : 'no')
    formData.set('link', fields.link)
    formData.set('password', fields.password)
    formData.set('image', image)

    setStatus({ type: 'loading', message: t.adminForm.loadingUpload })

    try {
      const response = await fetch('/api/catalog/items', {
        method: 'POST',
        body: formData,
      })
      const payload = (await response.json().catch(() => null)) as {
        message?: string
        details?: string
      } | null

      if (!response.ok) {
        throw new Error([payload?.message, payload?.details].filter(Boolean).join(' ') || 'Не удалось добавить товар.')
      }

      setStatus({ type: 'success', message: payload?.message || 'Товар добавлен в каталог.' })
      setFields((current) => ({ ...initialFields, password: current.password }))
      setImage(null)
      await loadItems()
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Не удалось добавить товар.',
      })
    }
  }

  const deleteItem = async (item: AdminCatalogItem) => {
    if (!fields.password) {
      setStatus({ type: 'error', message: 'Введите пароль администратора, чтобы удалить товар.' })
      return
    }

    const confirmed = window.confirm(`Удалить товар «${item.name}»? Фото тоже будет удалено.`)
    if (!confirmed) return

    setDeletingId(item.id)
    setListError('')
    try {
      const response = await fetch('/api/catalog/items', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, password: fields.password }),
      })
      const payload = (await response.json().catch(() => null)) as {
        message?: string
        details?: string
      } | null

      if (!response.ok) {
        throw new Error([payload?.message, payload?.details].filter(Boolean).join(' ') || 'Не удалось удалить товар.')
      }

      setItems((current) => current.filter((currentItem) => currentItem.id !== item.id))
      setStatus({ type: 'success', message: payload?.message || 'Товар удалён.' })
    } catch (error) {
      setListError(error instanceof Error ? error.message : 'Не удалось удалить товар.')
    } finally {
      setDeletingId('')
    }
  }

  if (!isMounted) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-2xl border border-border bg-card" aria-live="polite">
        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          <Loader2 className="size-5 animate-spin" /> {t.adminForm.loadingCatalog}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mb-8 border-b border-border pb-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:text-foreground">
              <ArrowLeft className="size-4" /> {t.adminForm.backToSite}
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <button onClick={() => void logoutFromAdmin()} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:text-foreground">
              <LogOut className="size-4" /> {t.adminForm.logout}
            </button>
          </div>
          <LanguageSwitcher />
        </div>
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">ROOTIE / ADMIN</p>
        </div>
        <h1 className="font-heading text-4xl font-black uppercase tracking-tight sm:text-6xl">{t.adminForm.pageTitle}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          {t.adminForm.pageDesc}
        </p>
      </div>

      <form onSubmit={submit} className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">01</p>
              <h2 className="mt-1 font-heading text-2xl font-black uppercase">{t.adminForm.photo}</h2>
            </div>
            {image && !isPreparingImage && (
              <button
                type="button"
                onClick={() => setImage(null)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-border transition hover:bg-foreground hover:text-background"
                aria-label="Удалить фотографию"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {isPreparingImage ? (
            <div className="flex aspect-square flex-col items-center justify-center rounded-xl border border-border bg-background px-6 text-center">
              <Loader2 className="mb-5 size-10 animate-spin" />
              <p className="font-heading text-xl font-black uppercase">{t.adminForm.preparingPhoto}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.adminForm.preparingDesc}</p>
            </div>
          ) : previewUrl ? (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="group relative block aspect-square w-full overflow-hidden rounded-xl bg-background"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
              <img src={previewUrl} alt="Предпросмотр товара" className="h-full w-full object-cover" />
              <span className="absolute inset-x-4 bottom-4 flex items-center justify-center gap-2 rounded-full bg-background/90 px-4 py-3 text-xs font-bold uppercase tracking-widest opacity-0 backdrop-blur transition group-hover:opacity-100">
                <ImagePlus className="size-4" /> {t.adminForm.replacePhoto}
              </span>
            </button>
          ) : (
            <div
              role="button"
              tabIndex={0}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click()
              }}
              onDragEnter={(event) => {
                event.preventDefault()
                setIsDragging(true)
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              className={cn(
                'flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background px-6 text-center transition',
                isDragging && 'border-foreground bg-secondary',
              )}
            >
              <span className="mb-5 flex size-16 items-center justify-center rounded-full bg-foreground text-background">
                <UploadCloud className="size-7" />
              </span>
              <p className="font-heading text-xl font-black uppercase">{t.adminForm.choosePhoto}</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                {t.adminForm.chooseDesc}
              </p>
            </div>
          )}

          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={onFileChange} className="sr-only" />
        </section>

        <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">02</p>
            <h2 className="mt-1 font-heading text-2xl font-black uppercase">{t.adminForm.info}</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t.adminForm.name} className="sm:col-span-2">
              <input required maxLength={120} value={fields.name} onChange={(event) => setField('name', event.target.value)} placeholder="Nike Air Jordan 1 Low" className={inputClassName} />
            </Field>

            <Field label={t.adminForm.category}>
              <input maxLength={80} value={fields.category} onChange={(event) => setField('category', event.target.value)} placeholder="Кроссовки" className={inputClassName} />
            </Field>

            <Field label={t.adminForm.price}>
              <input required type="number" min="0" max="100000000" step="1" inputMode="numeric" value={fields.price} onChange={(event) => setField('price', event.target.value)} placeholder="85000" className={inputClassName} />
            </Field>

            <Field label={t.adminForm.stock}>
              <select value={fields.stock} onChange={(event) => setField('stock', event.target.value)} className={inputClassName}>
                <option value="available">{t.adminForm.stockAvailable}</option>
                <option value="low">{t.adminForm.stockLow}</option>
                <option value="out">{t.adminForm.stockOut}</option>
              </select>
            </Field>

            <Field label={t.adminForm.sizes}>
              <input maxLength={240} value={fields.sizes} onChange={(event) => setField('sizes', event.target.value)} placeholder="40, 41, 42, 43" className={inputClassName} />
            </Field>

            <Field label={t.adminForm.link} hint={t.adminForm.optional} className="sm:col-span-2">
              <input type="url" maxLength={500} value={fields.link} onChange={(event) => setField('link', event.target.value)} placeholder="https://instagram.com/..." className={inputClassName} />
            </Field>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-4 sm:col-span-2">
              <span>
                <span className="block text-sm font-bold">{t.adminForm.featured}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{t.adminForm.featuredDesc}</span>
              </span>
              <input type="checkbox" checked={fields.featured} onChange={(event) => setField('featured', event.target.checked)} className="size-5 accent-white" />
            </label>

            <Field label={t.adminForm.password} className="sm:col-span-2">
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input required type="password" autoComplete="current-password" value={fields.password} onChange={(event) => setField('password', event.target.value)} placeholder={t.adminForm.passwordPlaceholder} className={cn(inputClassName, 'pl-11')} />
              </div>
            </Field>
          </div>

          {status.type !== 'idle' && (
            <StatusMessage status={status} />
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button type="submit" disabled={status.type === 'loading' || isPreparingImage} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-black uppercase tracking-wider text-background transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50">
              {status.type === 'loading' ? <Loader2 className="size-4 animate-spin" /> : <UploadCloud className="size-4" />}
              {t.adminForm.submit}
            </button>
            <button type="button" onClick={() => resetProduct(true)} disabled={status.type === 'loading' || isPreparingImage} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-bold uppercase tracking-wider transition hover:bg-secondary disabled:opacity-50">
              <RotateCcw className="size-4" /> {t.adminForm.clear}
            </button>
          </div>
        </section>
      </form>

      <section className="mt-8 rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">03</p>
            <h2 className="mt-1 font-heading text-2xl font-black uppercase">{t.adminForm.addedItems}</h2>
          </div>
          <button type="button" onClick={() => void loadItems()} disabled={isLoadingItems} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-border px-5 text-xs font-bold uppercase tracking-wider transition hover:bg-secondary disabled:opacity-50">
            <RefreshCw className={cn('size-4', isLoadingItems && 'animate-spin')} /> {t.adminForm.refresh}
          </button>
        </div>

        {listError && (
          <div className="mt-5 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-4 text-sm text-red-200">
            {listError}
          </div>
        )}

        {isLoadingItems ? (
          <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="size-5 animate-spin" /> {t.adminForm.loadingCatalog}
          </div>
        ) : items.length === 0 ? (
          <div className="flex min-h-40 items-center justify-center text-center text-sm text-muted-foreground">
            {t.adminForm.emptyCatalog}
          </div>
        ) : (
          <div className="mt-5 grid gap-3">
            {items.map((item) => (
              <article key={item.id} className="flex items-center gap-4 rounded-xl border border-border bg-background p-3 sm:p-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-card sm:size-24">
                  {/* eslint-disable-next-line @next/next/no-img-element -- dynamic Supabase image */}
                  <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate font-heading text-lg font-black uppercase sm:text-xl">{item.name}</h3>
                    {item.featured && <span className="rounded-full border border-border px-2 py-1 text-[10px] font-bold uppercase tracking-wider">{t.adminForm.featuredBadge}</span>}
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{item.category || t.adminForm.noCategory}</p>
                  <p className="mt-2 text-sm font-bold">{Number(item.price).toLocaleString('ru-RU')} ֏</p>
                </div>
                <button type="button" onClick={() => void deleteItem(item)} disabled={deletingId === item.id} className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border transition hover:border-red-400/50 hover:bg-red-400/10 hover:text-red-300 disabled:opacity-50" aria-label={`Удалить ${item.name}`}>
                  {deletingId === item.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

function StatusMessage({ status }: { status: Exclude<FormStatus, { type: 'idle' }> }) {
  return (
    <div className={cn(
      'mt-6 flex items-start gap-3 rounded-xl border px-4 py-4 text-sm',
      status.type === 'error' && 'border-red-400/40 bg-red-400/10 text-red-200',
      status.type === 'success' && 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
      status.type === 'loading' && 'border-border bg-background text-muted-foreground',
    )}>
      {status.type === 'loading' && <Loader2 className="mt-0.5 size-4 shrink-0 animate-spin" />}
      {status.type === 'success' && <CheckCircle2 className="mt-0.5 size-4 shrink-0" />}
      {status.type === 'error' && <X className="mt-0.5 size-4 shrink-0" />}
      <span>{status.message}</span>
    </div>
  )
}

async function prepareCatalogImage(source: File): Promise<File> {
  const objectUrl = URL.createObjectURL(source)

  try {
    const image = await loadImage(objectUrl)
    const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(image.naturalWidth, image.naturalHeight))
    const width = Math.max(1, Math.round(image.naturalWidth * scale))
    const height = Math.max(1, Math.round(image.naturalHeight * scale))
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    if (!context) throw new Error('Браузер не смог обработать фотографию.')

    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, width, height)
    context.drawImage(image, 0, 0, width, height)

    let quality = 0.88
    let blob = await canvasToBlob(canvas, quality)
    while (blob.size > MAX_UPLOAD_IMAGE_BYTES && quality > 0.52) {
      quality -= 0.08
      blob = await canvasToBlob(canvas, quality)
    }

    if (blob.size > MAX_UPLOAD_IMAGE_BYTES) {
      throw new Error('Не удалось достаточно уменьшить фотографию. Выберите изображение меньшего размера.')
    }

    const baseName = source.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 80) || 'catalog-image'
    return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg', lastModified: Date.now() })
  } catch (error) {
    if (error instanceof Error && error.message) throw error
    throw new Error('Формат фотографии не поддерживается браузером. Используйте JPG, PNG или WebP.')
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Формат фотографии не поддерживается браузером. Используйте JPG, PNG или WebP.'))
    image.src = source
  })
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Не удалось сжать фотографию.'))),
      'image/jpeg',
      quality,
    )
  })
}

function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string
  hint?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
        {label}
        {hint && <span className="font-normal normal-case tracking-normal text-muted-foreground">{hint}</span>}
      </span>
      {children}
    </label>
  )
}

const inputClassName =
  'min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/65 focus:border-foreground'
