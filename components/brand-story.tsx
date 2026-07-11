'use client'

import Image from 'next/image'
import { ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export function BrandStory() {
  const { t } = useLanguage()

  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-24 md:px-8 md:py-36 lg:pr-16">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-primary">05 / Rootie story</p>
          <h2 className="mt-8 font-heading text-5xl font-black uppercase leading-[.9] tracking-[-.055em] text-balance sm:text-7xl">{t.brandStory.title}</h2>
          <div className="mt-10 flex flex-col gap-6">
            {t.brandStory.paragraphs.map((paragraph) => <p key={paragraph} className="max-w-xl leading-relaxed text-muted-foreground text-pretty">{paragraph}</p>)}
          </div>
          <div className="mt-12 flex items-center gap-3 border-t border-border pt-6 text-xs font-bold uppercase tracking-[.18em]"><ShieldCheck className="size-5 text-primary" aria-hidden="true" />{t.brandStory.promise}</div>
        </div>
        <div className="relative min-h-[560px] overflow-hidden lg:min-h-full">
          <Image src="/images/store-counter.jpg" alt={t.brandStory.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-background/15" />
          <span className="absolute bottom-6 left-6 bg-background px-4 py-3 text-xs font-bold uppercase tracking-widest">Yerevan / Saryan 4</span>
        </div>
      </div>
    </section>
  )
}
