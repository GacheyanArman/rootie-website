'use client'

import { useLanguage } from '@/components/language-provider'

export function SiteFooter() {
  const { t } = useLanguage()
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-4 py-10 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><a href="#top" className="font-heading text-6xl font-black uppercase leading-none tracking-[-.07em] sm:text-8xl">ROOTIE.</a><p className="max-w-md text-sm leading-relaxed opacity-65 md:text-right">{t.footer.line}</p></div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-background/20 pt-5 text-[10px] font-bold uppercase tracking-[.18em] opacity-60"><span>Original culture / Yerevan</span><span>© {new Date().getFullYear()} ROOTIE</span></div>
      </div>
    </footer>
  )
}
