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
        <p className="text-xs font-bold uppercase tracking-[.2em] text-primary">07 / Come through</p>
        <h2 className="mt-8 max-w-6xl font-heading text-[16vw] font-black uppercase leading-[.72] tracking-[-.08em] text-balance sm:text-[13vw] lg:text-[10vw]">{t.contacts.title}</h2>
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <div className="grid border-t border-border sm:grid-cols-3 lg:grid-cols-1">
            {details.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <Icon className="size-5 text-primary lg:hidden" aria-hidden="true" />
                  <div className="flex w-full flex-col gap-1 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="hidden size-5 text-primary lg:block" aria-hidden="true" />
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
                    </div>
                    <strong className="font-heading text-lg uppercase">{value}</strong>
                  </div>
                  {href && <ArrowUpRight className="absolute right-5 top-5 size-5" aria-hidden="true" />}
                </>
              )
              const className = 'relative flex min-h-40 flex-col justify-between gap-3 border-b border-border py-5 transition-colors hover:bg-card sm:min-h-56 sm:border-r sm:px-5 lg:min-h-0 lg:flex-row lg:items-center lg:border-r-0 lg:px-5 lg:py-8'
              return href ? <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className={className}>{content}</a> : <div key={label} className={className}>{content}</div>
            })}
          </div>
          <div className="h-80 overflow-hidden border border-border bg-card md:h-[560px] lg:h-full">
            <iframe
              src={`https://www.google.com/maps?q=${STORE.latitude},${STORE.longitude}&output=embed`}
              title="Rootie store location at 4 Martiros Saryan Street in Yerevan"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-popups"
              className="size-full grayscale contrast-125"
            />
          </div>
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
