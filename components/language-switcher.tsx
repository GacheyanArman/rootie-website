'use client'

import { LANGS } from '@/lib/i18n'
import { useLanguage } from '@/components/language-provider'

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  return (
    <div className="flex items-center border border-foreground/25 bg-background/50 p-0.5 backdrop-blur" role="group" aria-label="Language">
      {LANGS.map((item) => (
        <button key={item.code} type="button" onClick={() => setLang(item.code)} aria-pressed={lang === item.code} className={`px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${lang === item.code ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}>{item.label}</button>
      ))}
    </div>
  )
}
