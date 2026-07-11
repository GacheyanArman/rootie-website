'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { LINKS } from '@/lib/links'

const DROPS = [
  { date: '04.07.2026', image: '/images/travis-scott.jpg' },
  { date: '21.06.2026', image: '/images/clothing-area.jpg' },
  { date: '08.06.2026', image: '/images/bearbricks.jpg' },
]

export function DropsNews() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-8 md:py-36">
      <div className="grid gap-8 border-t border-border pt-6 md:grid-cols-12">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-primary md:col-span-3">03 / Latest drops</p>
        <div className="md:col-span-9"><h2 className="font-heading text-5xl font-black uppercase leading-[.9] tracking-[-.055em] text-balance sm:text-7xl lg:text-9xl">{t.drops.title}</h2><p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">{t.drops.subtitle}</p></div>
      </div>
      <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-3">
        {DROPS.map((drop, index) => {
          const copy = t.drops.items[index]
          return (
            <a key={copy.title} href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="group border-b border-border pb-6">
              <div className="relative aspect-[4/5] overflow-hidden bg-card"><Image src={drop.image} alt={copy.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><span className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45"><ArrowUpRight className="size-5" aria-hidden="true" /></span></div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[.18em] text-muted-foreground">{drop.date}</p>
              <h3 className="mt-3 font-heading text-2xl font-black uppercase tracking-tight">{copy.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.excerpt}</p>
            </a>
          )
        })}
      </div>
    </section>
  )
}
