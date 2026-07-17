'use server'

import { timingSafeEqual } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import {
  assertSameOrigin,
  clearAdminSession,
  clearLoginAttempts,
  consumeLoginAttempt,
  getRequestIdentity,
  setAdminSession,
} from '@/lib/admin-auth'

function safeSecretMatches(received: string, expected: string) {
  const left = Buffer.from(received)
  const right = Buffer.from(expected)
  return left.length === right.length && timingSafeEqual(left, right)
}

export async function loginToAdmin(password: string) {
  if (!(await assertSameOrigin())) return { success: false }

  const identity = await getRequestIdentity()
  const attempt = consumeLoginAttempt(identity)
  if (!attempt.allowed) {
    return { success: false, retryAfterSeconds: attempt.retryAfterSeconds }
  }

  const expectedPassword = process.env.CATALOG_ADMIN_PASSWORD
  if (!expectedPassword || expectedPassword.length < 12 || !password) {
    return { success: false }
  }

  if (safeSecretMatches(password, expectedPassword)) {
    clearLoginAttempts(identity)
    await setAdminSession()
    revalidatePath('/admin')
    revalidatePath('/admin/catalog')
    return { success: true }
  }

  return { success: false }
}

export async function logoutFromAdmin() {
  if (!(await assertSameOrigin())) return
  await clearAdminSession()
  revalidatePath('/admin')
  revalidatePath('/admin/catalog')
}
