import { LanguageProvider } from '@/components/language-provider'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Catalog } from '@/components/catalog'
import { HowToBuy } from '@/components/how-to-buy'
import { Gallery } from '@/components/gallery'
import { Contacts } from '@/components/contacts'
import { SiteFooter } from '@/components/site-footer'
import { DropsNews } from '@/components/drops-news'
import { BrandStory } from '@/components/brand-story'
import { Faq } from '@/components/faq'
import { FloatingContact } from '@/components/floating-contact'

export default function HomePage() {
  return (
    <LanguageProvider>
      <SiteHeader />
      <main>
        <Hero />
        <Catalog />
        <HowToBuy />
        <DropsNews />
        <Gallery />
        <BrandStory />
        <Faq />
        <Contacts />
      </main>
      <SiteFooter />
      <FloatingContact />
    </LanguageProvider>
  )
}
