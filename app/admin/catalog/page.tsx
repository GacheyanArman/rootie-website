import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CatalogAdminForm } from '@/components/catalog-admin-form'
import { LanguageProvider } from '@/components/language-provider'

export const metadata: Metadata = {
  title: 'Управление каталогом | ROOTIE',
  robots: { index: false, follow: false },
}

export default async function CatalogAdminPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get('admin_auth')?.value === 'true'

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
