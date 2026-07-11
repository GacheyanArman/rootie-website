'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { LINKS } from '@/lib/links'

export function FloatingContact() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  const items = [
    { href: LINKS.whatsapp, label: 'WhatsApp', icon: MessageCircle },
    { href: LINKS.telegramDm, label: 'Telegram', icon: Send },
  ]

  return (
    <div ref={containerRef} className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <div className="flex flex-col items-end gap-3">
        {items.map(({ href, label, icon: Icon }, index) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Contact Rootie on ${label}`}
            className={`flex items-center gap-3 rounded-full bg-foreground p-3 text-background shadow-xl transition-all duration-300 motion-reduce:transition-none ${open ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-4 scale-75 opacity-0'}`}
            style={{ transitionDelay: open ? `${(items.length - index - 1) * 55}ms` : '0ms' }}
          >
            <span className="hidden pl-2 text-xs font-bold uppercase tracking-wider sm:inline">{label}</span>
            <Icon className="size-5" aria-hidden="true" />
          </a>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
      >
        {open ? <X className="size-6" aria-hidden="true" /> : <MessageCircle className="size-6" aria-hidden="true" />}
      </button>
    </div>
  )
}
