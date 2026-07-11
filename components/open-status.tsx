'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/language-provider'
import { STORE } from '@/lib/links'

function isStoreOpen() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: STORE.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date())
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0)
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0)
  const minutes = hour * 60 + minute
  const [opensHour, opensMinute] = STORE.opens.split(':').map(Number)
  const [closesHour, closesMinute] = STORE.closes.split(':').map(Number)
  return minutes >= opensHour * 60 + opensMinute && minutes < closesHour * 60 + closesMinute
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
      {open !== false && <span className={`size-2 rounded-full ${open ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} aria-hidden="true" />}
      {open === null ? t.contacts.hoursValue : open ? t.openStatus.openNow : t.openStatus.closedNow}
    </span>
  )
}
