import Papa from 'papaparse'

export type StockStatus = 'available' | 'low' | 'out'

export type CatalogItem = {
  name: string
  category: string
  price: number
  stock: StockStatus
  image: string
  sizes: string[]
  featured: boolean
}

const STOCK_STATUSES: StockStatus[] = ['available', 'low', 'out']
const CATALOG_HOSTS = new Set(['docs.google.com', 'drive.google.com'])
const MAX_CSV_BYTES = 2 * 1024 * 1024
const MAX_CATALOG_ROWS = 500
const MAX_REDIRECTS = 3
const REQUEST_TIMEOUT_MS = 8_000



function parseTrustedCatalogUrl(value: string) {
  const url = new URL(value)

  const hostname = url.hostname.toLowerCase()
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.port ||
    !(CATALOG_HOSTS.has(hostname) || hostname.endsWith('.googleusercontent.com'))
  ) {
    throw new Error('Untrusted catalog URL')
  }

  if (url.pathname.includes('/pubhtml')) {
    url.pathname = url.pathname.replace(/\/pubhtml.*$/, '/pub')
    url.search = 'output=csv'
  }

  return url
}

function parseTrustedImageUrl(value: string) {
  const url = new URL(value.trim())
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.port
  ) {
    throw new Error('Untrusted image URL')
  }

  return url.toString()
}

async function fetchTrustedCsv(initialUrl: URL, signal: AbortSignal) {
  const response = await fetch(initialUrl, {
    cache: 'no-store',
    redirect: 'follow',
    signal,
    headers: { Accept: 'text/csv,text/plain;q=0.9' },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from Google Sheets`)
  }

  return response
}

async function readLimitedText(response: Response) {
  const declaredSize = Number(response.headers.get('content-length') ?? 0)
  if (declaredSize > MAX_CSV_BYTES) throw new Error('Catalog is too large')
  if (!response.body) throw new Error('Catalog response has no body')

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let byteCount = 0
  let text = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    byteCount += value.byteLength
    if (byteCount > MAX_CSV_BYTES) {
      await reader.cancel()
      throw new Error('Catalog is too large')
    }
    text += decoder.decode(value, { stream: true })
  }

  return text + decoder.decode()
}

function cleanText(value: string | undefined, maxLength: number) {
  return (value ?? '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength)
}

export async function getCatalogItems(): Promise<CatalogItem[]> {
  const configuredUrl = process.env.CATALOG_SHEET_CSV_URL
  if (!configuredUrl) {
    return [{
      name: 'ERROR: CATALOG_SHEET_CSV_URL is not set in Vercel Environment Variables',
      category: 'DEBUG',
      price: 0,
      stock: 'available',
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop',
      sizes: [],
      featured: false
    }]
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const trustedUrl = parseTrustedCatalogUrl(configuredUrl)
    const response = await fetchTrustedCsv(trustedUrl, controller.signal)
    if (!response.ok) return []

    const contentType = response.headers.get('content-type')?.toLowerCase() ?? ''
    if (contentType && !contentType.includes('text/') && !contentType.includes('csv')) return []

    const csv = await readLimitedText(response)
    const { data } = Papa.parse<Record<string, string>>(csv, {
      header: true,
      skipEmptyLines: true,
    })

    return data
      .slice(0, MAX_CATALOG_ROWS)
      .flatMap((row: Record<string, string>): CatalogItem[] => {
        const name = cleanText(row.name, 120)
        if (!name || !row.image) return []

        try {
          const stock = cleanText(row.stock, 20) as StockStatus
          const parsedPrice = Number(row.price)
          const price = Number.isFinite(parsedPrice) && parsedPrice >= 0 && parsedPrice <= 100_000_000
            ? Math.round(parsedPrice)
            : 0

          return [{
            name,
            category: cleanText(row.category, 80),
            price,
            stock: STOCK_STATUSES.includes(stock) ? stock : 'available',
            image: parseTrustedImageUrl(row.image),
            sizes: (row.sizes ?? '')
              .split(',')
              .map((size: string) => cleanText(size, 20))
              .filter(Boolean)
              .slice(0, 20),
            featured: cleanText(row.featured, 10).toLowerCase() === 'yes',
          }]
        } catch {
          return []
        }
      })
      .sort((a: CatalogItem, b: CatalogItem) => Number(b.featured) - Number(a.featured))
  } catch (error: any) {
    return [{
      name: `ERROR: ${error?.message || 'Unknown fetching error'}`,
      category: 'DEBUG',
      price: 0,
      stock: 'available',
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop',
      sizes: [],
      featured: false
    }]
  } finally {
    clearTimeout(timeout)
  }
}
