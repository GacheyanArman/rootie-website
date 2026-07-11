'use client'

import { useLanguage } from '@/components/language-provider'

export function CatalogIntro() {
  const { t } = useLanguage()

  return (
    <div className="grid gap-8 border-t border-border pt-6 md:grid-cols-12">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-primary md:col-span-3">01 / Curated selection</p>
      <div className="md:col-span-9">
        <h2 className="font-heading text-5xl font-black uppercase leading-[.9] tracking-[-.055em] text-balance sm:text-7xl lg:text-9xl">{t.catalog.title}</h2>
        <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground text-pretty">{t.catalog.subtitle}</p>
      </div>
    </div>
  )
}
