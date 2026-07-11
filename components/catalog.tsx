import { CatalogGrid } from '@/components/catalog-grid'
import { CatalogIntro } from '@/components/catalog-intro'
import { getCatalogItems } from '@/lib/catalog'

export async function Catalog() {
  const items = await getCatalogItems()

  return (
    <section id="catalog" className="mx-auto max-w-[1600px] px-4 py-24 md:px-8 md:py-36">
      <CatalogIntro />
      <CatalogGrid items={items} />
    </section>
  )
}
