'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/language-provider'

function isStoreOpen() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Yerevan',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date())
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0)
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0)
  const minutes = hour * 60 + minute
  return minutes >= 11 * 60 && minutes < 22 * 60
}

export function OpenStatus() {
  const { t } = useLanguage()
  const [open, setOpen] = useState<boolean | null>(null)

  useEffect(() => {
    const update = () => setOpen(isStoreOpen())
    update()
    const timer = window.setInterval(update, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <span className="inline-flex items-center gap-2" aria-live="polite">
      <span className={`size-2 rounded-full ${open ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} aria-hidden="true" />
      {open === null ? t.contacts.hoursValue : open ? t.openStatus.openNow : t.openStatus.closedNow}
    </span>
  )
}
