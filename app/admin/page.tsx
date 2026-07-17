import { redirect } from 'next/navigation'
import { AdminLoginForm } from '@/components/admin-login-form'
import { LanguageProvider } from '@/components/language-provider'
import { isAdminAuthenticated } from '@/lib/admin-auth'

export const metadata = {
  title: 'Вход в панель | ROOTIE',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const isAuthenticated = await isAdminAuthenticated()

  if (isAuthenticated) {
    redirect('/admin/catalog')
  }

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
        <AdminLoginForm />
      </main>
    </LanguageProvider>
  )
}
