import { LanguageProvider } from '@/components/language-provider'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Catalog } from '@/components/catalog'
import { HowToBuy } from '@/components/how-to-buy'
import { Gallery } from '@/components/gallery'
import { Contacts } from '@/components/contacts'
import { SiteFooter } from '@/components/site-footer'

export default function HomePage() {
  return (
    <LanguageProvider>
      <SiteHeader />
      <main>
        <Hero />
        <Catalog />
        <HowToBuy />
        <Gallery />
        <Contacts />
      </main>
      <SiteFooter />
    </LanguageProvider>
  )
}
