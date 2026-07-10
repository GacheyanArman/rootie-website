'use client'

import { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useLanguage } from '@/components/language-provider'
import { LINKS } from '@/lib/links'

export function SiteHeader() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#catalog', label: t.nav.catalog },
    { href: '#gallery', label: t.nav.store },
    { href: '#contacts', label: t.nav.contacts },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/15 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-4 md:px-8">
        <a href="#top" className="font-heading text-2xl font-black uppercase tracking-[-.06em]">ROOTIE<span className="text-primary">.</span></a>
        <nav className="hidden items-center gap-9 text-xs font-bold uppercase tracking-[.18em] md:flex" aria-label="Main navigation">
          {links.map((link) => <a key={link.href} href={link.href} className="transition-colors hover:text-primary">{link.label}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex">Shop <ArrowUpRight className="size-4" /></a>
          <button type="button" onClick={() => setOpen(!open)} className="inline-flex size-10 items-center justify-center border border-border md:hidden" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-border bg-background px-4 py-6 md:hidden" aria-label="Mobile navigation">
          {links.map((link, i) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border py-5 font-heading text-3xl font-black uppercase"><span>{link.label}</span><span className="text-sm text-primary">0{i + 1}</span></a>)}
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex justify-center bg-primary px-5 py-4 font-bold uppercase text-primary-foreground">Instagram</a>
        </nav>
      )}
    </header>
  )
}
