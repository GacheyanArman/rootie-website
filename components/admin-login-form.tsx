'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LockKeyhole, Loader2, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/language-provider'
import { LanguageSwitcher } from '@/components/language-switcher'
import { loginToAdmin } from '@/app/admin/actions'

export function AdminLoginForm() {
  const { t } = useLanguage()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const res = await loginToAdmin(password)
    if (res.success) {
      router.push('/admin/catalog')
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg mt-10 md:mt-20">
      <div className="mb-8 border-b border-border pb-7">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:text-foreground">
            <ArrowLeft className="size-4" /> {t.adminForm.backToSite}
          </Link>
          <LanguageSwitcher />
        </div>
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">ROOTIE / ADMIN</p>
        </div>
        <h1 className="font-heading text-4xl font-black uppercase tracking-tight">{t.adminForm.loginTitle}</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {t.adminForm.loginDesc}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            {t.adminForm.password}
          </span>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.adminForm.passwordPlaceholder}
              className={cn(
                'min-h-12 w-full rounded-xl border border-border bg-background px-4 pl-11 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/65 focus:border-foreground',
                error && 'border-red-500'
              )}
            />
          </div>
          {error && <p className="mt-2 text-xs text-red-500">{t.adminForm.loginError}</p>}
        </label>
        
        <button
          type="submit"
          disabled={loading || !password}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-black uppercase tracking-wider text-background transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {t.adminForm.loginSubmit}
        </button>
      </form>
    </div>
  )
}
