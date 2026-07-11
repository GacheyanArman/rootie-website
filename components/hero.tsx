'use client'

import Image from 'next/image'
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { LINKS } from '@/lib/links'
import { OpenStatus } from '@/components/open-status'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-20">
      <div className="absolute inset-0">
        <Image src="/images/sneaker-wall-full.jpg" alt={t.hero.heroAlt} fill priority sizes="100vw" className="object-cover object-center opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,16,.15)_0%,rgba(17,18,16,.15)_35%,rgba(17,18,16,.95)_100%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end px-4 pb-8 md:px-8 md:pb-12">
        <div className="animate-reveal mb-auto flex items-center justify-between gap-4 pt-5 text-[11px] font-semibold uppercase tracking-[.22em] text-foreground/80">
          <span>{t.hero.tagline}</span>
          <span className="hidden sm:inline-flex"><OpenStatus /></span>
        </div>

        <div className="animate-reveal-delay grid items-end gap-8 lg:grid-cols-[1fr_330px]">
          <div>
            <p className="mb-3 font-heading text-sm font-bold uppercase tracking-[.3em] text-primary">Original only / Since Yerevan</p>
            <h1 className="font-heading text-[22vw] font-black uppercase leading-[.72] tracking-[-.085em] text-balance sm:text-[18vw] lg:text-[13vw]">
              Rootie
            </h1>
          </div>
          <div className="flex flex-col gap-5 lg:pb-2">
            <p className="max-w-sm text-base leading-relaxed text-foreground/75 text-pretty">{t.hero.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 bg-primary px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:-translate-y-1">
                {t.hero.buyInstagram}<ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
              </a>
              <a href={LINKS.maps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-foreground/30 bg-background/20 px-5 py-3.5 text-sm font-semibold backdrop-blur-md transition-colors hover:bg-foreground hover:text-background">
                <MapPin className="size-4" aria-hidden="true" /> Saryan 4
              </a>
            </div>
          </div>
        </div>
        <a href="#catalog" aria-label="Scroll to catalog" className="absolute bottom-8 right-4 hidden size-12 items-center justify-center rounded-full border border-foreground/40 transition-colors hover:bg-primary hover:text-primary-foreground md:flex md:right-8">
          <ArrowDown className="size-5" aria-hidden="true" />
        </a>
      </div>

      <div className="relative flex overflow-hidden border-y border-foreground/15 bg-primary py-3 text-primary-foreground">
        <div className="marquee-track flex whitespace-nowrap font-heading text-sm font-black uppercase tracking-[.18em]">
          {[...Array(2)].map((_, half) => (
            <div key={half} className="flex" aria-hidden={half === 1}>
              {[...Array(6)].map((_, rep) => (
                <div key={rep} className="flex gap-8 pr-8">
                  <span>Original sneakers</span><span>/</span><span>Rare drops</span><span>/</span><span>Streetwear</span><span>/</span><span>Yerevan</span><span>/</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
