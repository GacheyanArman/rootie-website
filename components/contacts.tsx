'use client'

import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { LINKS, STORE } from '@/lib/links'

export function Contacts() {
  const { t } = useLanguage()
  const details = [
    { icon: MapPin, label: t.contacts.address, value: t.contacts.addressValue, href: LINKS.maps },
    { icon: Clock, label: t.contacts.hours, value: t.contacts.hoursValue },
    { icon: Phone, label: t.contacts.phone, value: STORE.phone, href: LINKS.phone },
  ]
  return (
    <section id="contacts" className="relative overflow-hidden border-t border-border">
      <div className="mx-auto max-w-[1600px] px-4 py-24 md:px-8 md:py-36">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-primary">04 / Come through</p>
        <h2 className="mt-8 max-w-6xl font-heading text-[16vw] font-black uppercase leading-[.72] tracking-[-.08em] text-balance sm:text-[13vw] lg:text-[10vw]">{t.contacts.title}</h2>
        <div className="mt-20 grid border-t border-border md:grid-cols-3">
          {details.map(({ icon: Icon, label, value, href }) => {
            const content = <><Icon className="size-5 text-primary" aria-hidden="true" /><span className="mt-10 text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</span><strong className="mt-3 max-w-xs font-heading text-xl uppercase">{value}</strong>{href && <ArrowUpRight className="absolute right-6 top-6 size-5" />}</>
            return href ? <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="relative flex min-h-56 flex-col border-b border-border py-6 transition-colors hover:bg-card md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">{content}</a> : <div key={label} className="relative flex min-h-56 flex-col border-b border-border py-6 md:border-b-0 md:border-r md:px-6">{content}</div>
          })}
        </div>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-between bg-primary px-6 py-5 font-heading text-lg font-black uppercase text-primary-foreground transition-transform hover:-translate-y-1">Instagram <ArrowUpRight className="size-5" /></a>
          <a href={LINKS.telegramChannel} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-between border border-border px-6 py-5 font-heading text-lg font-black uppercase transition-colors hover:bg-foreground hover:text-background">Telegram <ArrowUpRight className="size-5" /></a>
          <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-between border border-border px-6 py-5 font-heading text-lg font-black uppercase transition-colors hover:bg-foreground hover:text-background">WhatsApp <ArrowUpRight className="size-5" /></a>
        </div>
      </div>
    </section>
  )
}
