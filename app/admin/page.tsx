import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminLoginForm } from '@/components/admin-login-form'
import { LanguageProvider } from '@/components/language-provider'

export const metadata = {
  title: 'Вход в панель | ROOTIE',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get('admin_auth')?.value === 'true'

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
