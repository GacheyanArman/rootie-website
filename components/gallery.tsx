'use client'

import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { LINKS } from '@/lib/links'

export function Gallery() {
  const { t } = useLanguage()
  return (
    <section id="gallery" className="mx-auto max-w-[1600px] px-4 py-24 md:px-8 md:py-36">
      <div className="grid gap-8 border-t border-border pt-6 md:grid-cols-12">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-primary md:col-span-3">04 / Saryan 4</p>
        <div className="md:col-span-9"><h2 className="font-heading text-5xl font-black uppercase leading-[.88] tracking-[-.06em] sm:text-7xl lg:text-9xl">{t.gallery.title}</h2><p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">{t.gallery.subtitle}</p></div>
      </div>
      <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-12 md:grid-rows-[360px_360px]">
        <figure className="group relative min-h-96 overflow-hidden md:col-span-8 md:row-span-2"><Image src="/images/sneaker-wall-nike.jpg" alt={t.gallery.alts[0]} fill sizes="(min-width:768px) 66vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><figcaption className="absolute bottom-4 left-4 bg-background px-3 py-2 text-xs font-bold uppercase tracking-widest">Sneaker room / 01</figcaption></figure>
        <figure className="group relative min-h-72 overflow-hidden md:col-span-4"><Image src="/images/store-counter.jpg" alt={t.gallery.alts[1]} fill sizes="(min-width:768px) 34vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></figure>
        <figure className="group relative min-h-72 overflow-hidden md:col-span-4"><Image src="/images/storefront-night.png" alt={t.gallery.alts[2]} fill sizes="(min-width:768px) 34vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><a href={LINKS.maps} target="_blank" rel="noopener noreferrer" className="absolute inset-x-4 bottom-4 flex items-center justify-between bg-primary p-4 font-heading font-black uppercase text-primary-foreground"><span className="flex items-center gap-2"><MapPin className="size-4" />Visit us</span><span>Saryan 4</span></a></figure>
      </div>
    </section>
  )
}
