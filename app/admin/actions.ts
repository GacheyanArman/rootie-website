'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function loginToAdmin(password: string) {
  if (!password) return { success: false }
  
  if (password === process.env.CATALOG_ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    revalidatePath('/admin/catalog')
    return { success: true }
  }
  
  return { success: false }
}

export async function logoutFromAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_auth')
  revalidatePath('/admin')
  revalidatePath('/admin/catalog')
}
