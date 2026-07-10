'use client'

import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { LINKS } from '@/lib/links'

export function HowToBuy() {
  const { t } = useLanguage()
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1600px] px-4 py-24 md:px-8 md:py-32">
        <div className="flex flex-col justify-between gap-6 border-b border-primary-foreground/25 pb-10 md:flex-row md:items-end">
          <div><p className="mb-4 text-xs font-bold uppercase tracking-[.2em]">02 / Easy order</p><h2 className="font-heading text-5xl font-black uppercase leading-[.85] tracking-[-.06em] sm:text-7xl lg:text-9xl">{t.howToBuy.title}</h2></div>
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 self-start border border-primary-foreground px-5 py-3.5 text-sm font-bold uppercase transition-colors hover:bg-primary-foreground hover:text-primary">
            {t.howToBuy.writeInstagram}<ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>
        <div className="grid md:grid-cols-3">
          {t.howToBuy.steps.map((step, i) => (
            <article key={step.title} className="flex min-h-72 flex-col border-b border-primary-foreground/25 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <span className="font-heading text-6xl font-black opacity-25">0{i + 1}</span>
              <div className="mt-auto pt-16"><h3 className="font-heading text-xl font-black uppercase">{step.title.replace(/^\d\.\s*/, '')}</h3><p className="mt-3 max-w-sm text-sm leading-relaxed opacity-70">{step.text}</p></div>
            </article>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 border-t border-primary-foreground/25 pt-6 text-xs font-bold uppercase tracking-[.18em]">
          <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp</a>
          <a href={LINKS.telegramDm} target="_blank" rel="noopener noreferrer" className="hover:underline">Telegram</a>
          <span className="opacity-60">Original products</span><span className="opacity-60">Try on in store</span>
        </div>
      </div>
    </section>
  )
}
