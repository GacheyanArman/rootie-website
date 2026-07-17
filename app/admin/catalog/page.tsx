import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { CatalogAdminForm } from '@/components/catalog-admin-form'
import { LanguageProvider } from '@/components/language-provider'
import { isAdminAuthenticated } from '@/lib/admin-auth'

export const metadata: Metadata = {
  title: 'Управление каталогом | ROOTIE',
  robots: { index: false, follow: false },
}

export default async function CatalogAdminPage() {
  const isAuthenticated = await isAdminAuthenticated()

  if (!isAuthenticated) {
    redirect('/admin')
  }

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <CatalogAdminForm />
        </div>
      </main>
    </LanguageProvider>
  )
}
