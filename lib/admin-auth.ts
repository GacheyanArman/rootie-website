import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies, headers } from 'next/headers'

const COOKIE_NAME = 'rootie_admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 8
const LOGIN_WINDOW_MS = 15 * 60 * 1000
const LOGIN_MAX_ATTEMPTS = 8

type Attempt = { count: number; resetAt: number }
const loginAttempts = new Map<string, Attempt>()

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.CATALOG_ADMIN_PASSWORD
  if (!secret || secret.length < 24) {
    throw new Error('ADMIN_SESSION_SECRET must be configured with at least 24 characters')
  }
  return secret
}

function sign(value: string) {
  return createHmac('sha256', getSessionSecret()).update(value).digest('base64url')
}

export function createAdminSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const payload = `v1.${expiresAt}`
  return `${payload}.${sign(payload)}`
}

export function verifyAdminSessionToken(token?: string) {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 3 || parts[0] !== 'v1') return false

  const expiresAt = Number(parts[1])
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false

  const payload = `${parts[0]}.${parts[1]}`
  const expected = Buffer.from(sign(payload))
  const received = Buffer.from(parts[2])
  return expected.length === received.length && timingSafeEqual(expected, received)
}

export async function setAdminSession() {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
    priority: 'high',
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/',
  })
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  return verifyAdminSessionToken(cookieStore.get(COOKIE_NAME)?.value)
}

export async function assertSameOrigin() {
  const headerStore = await headers()
  const origin = headerStore.get('origin')
  const host = headerStore.get('x-forwarded-host') || headerStore.get('host')
  if (!origin || !host) return false

  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export async function getRequestIdentity() {
  const headerStore = await headers()
  return (
    headerStore.get('x-vercel-forwarded-for') ||
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerStore.get('x-real-ip') ||
    'unknown'
  )
}

export function consumeLoginAttempt(identity: string) {
  const now = Date.now()
  const current = loginAttempts.get(identity)
  if (!current || current.resetAt <= now) {
    loginAttempts.set(identity, { count: 1, resetAt: now + LOGIN_WINDOW_MS })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  current.count += 1
  loginAttempts.set(identity, current)
  return {
    allowed: current.count <= LOGIN_MAX_ATTEMPTS,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  }
}

export function clearLoginAttempts(identity: string) {
  loginAttempts.delete(identity)
}
