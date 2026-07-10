'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { LINKS } from '@/lib/links'

const ITEMS = [
  { image: '/images/travis-scott.png', span: 'md:col-span-7', ratio: 'aspect-[4/5] md:aspect-[5/4]' },
  { image: '/images/clothing-area.png', span: 'md:col-span-5 md:mt-28', ratio: 'aspect-[4/5]' },
  { image: '/images/bearbricks.png', span: 'md:col-span-6 md:col-start-4', ratio: 'aspect-[4/3]' },
]

export function Catalog() {
  const { t } = useLanguage()
  return (
    <section id="catalog" className="mx-auto max-w-[1600px] px-4 py-24 md:px-8 md:py-36">
      <div className="grid gap-8 border-t border-border pt-6 md:grid-cols-12">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-primary md:col-span-3">01 / Curated selection</p>
        <div className="md:col-span-9">
          <h2 className="font-heading text-5xl font-black uppercase leading-[.9] tracking-[-.055em] text-balance sm:text-7xl lg:text-9xl">{t.catalog.title}</h2>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground text-pretty">{t.catalog.subtitle}</p>
        </div>
      </div>
      <div className="mt-16 grid gap-x-6 gap-y-16 md:grid-cols-12 md:mt-24">
        {t.catalog.items.map((item, i) => (
          <a key={item.title} href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className={`group ${ITEMS[i].span}`}>
            <div className={`relative overflow-hidden bg-card ${ITEMS[i].ratio}`}>
              <Image src={ITEMS[i].image} alt={item.alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <span className="absolute left-4 top-4 bg-background/85 px-3 py-2 text-xs font-bold uppercase tracking-widest backdrop-blur">0{i + 1}</span>
              <span className="absolute bottom-4 right-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="size-5" /></span>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-border py-5">
              <div><h3 className="font-heading text-2xl font-black uppercase tracking-tight md:text-3xl">{item.title}</h3><p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{item.description}</p></div>
              <span className="shrink-0 pt-2 text-[10px] font-bold uppercase tracking-widest text-primary">View drop</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
