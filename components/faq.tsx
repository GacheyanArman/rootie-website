'use client'

import { Plus } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export function Faq() {
  const { t } = useLanguage()

  return (
    <section id="faq" className="mx-auto max-w-[1600px] px-4 py-24 md:px-8 md:py-36">
      <div className="grid gap-8 border-t border-border pt-6 md:grid-cols-12">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-primary md:col-span-3">06 / FAQ</p>
        <div className="md:col-span-9">
          <h2 className="font-heading text-5xl font-black uppercase leading-[.9] tracking-[-.055em] text-balance sm:text-7xl lg:text-9xl">{t.faq.title}</h2>
          <div className="mt-14 border-b border-border md:mt-20">
            {t.faq.items.map((item, index) => (
              <details key={item.question} className="group border-t border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-heading text-xl font-black uppercase marker:hidden md:py-8 md:text-2xl">
                  <span className="flex items-start gap-4"><span className="pt-1 text-xs text-muted-foreground">0{index + 1}</span>{item.question}</span>
                  <Plus className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="max-w-3xl pb-8 pl-10 leading-relaxed text-muted-foreground text-pretty">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
