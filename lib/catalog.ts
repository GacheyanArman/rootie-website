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

export async function getCatalogItems(): Promise<CatalogItem[]> {
  let url = process.env.CATALOG_SHEET_CSV_URL
  if (!url) return []

  if (url.includes('/pubhtml')) {
    url = url.replace(/\/pubhtml.*/, '/pub?output=csv')
  }

  try {
    const response = await fetch(url, { next: { revalidate: 300 } })
    if (!response.ok) return []

    const csv = await response.text()
    const { data } = Papa.parse<Record<string, string>>(csv, {
      header: true,
      skipEmptyLines: true,
    })

    return data
      .filter((row) => row.name?.trim() && row.image?.trim())
      .map((row) => {
        const stock = row.stock?.trim() as StockStatus

        return {
          name: row.name.trim(),
          category: row.category?.trim() ?? '',
          price: Number(row.price) || 0,
          stock: STOCK_STATUSES.includes(stock) ? stock : 'available',
          image: row.image.trim(),
          sizes: row.sizes ? row.sizes.split(',').map((size) => size.trim()).filter(Boolean) : [],
          featured: row.featured?.trim().toLowerCase() === 'yes',
        }
      })
      .sort((a, b) => Number(b.featured) - Number(a.featured))
  } catch {
    return []
  }
}
