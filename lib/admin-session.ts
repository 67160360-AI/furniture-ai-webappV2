import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'

export const ADMIN_COOKIE = 'maison-forme-admin'
const SESSION_TTL_SECONDS = 60 * 60 * 8

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET ?? process.env.BETTER_AUTH_SECRET
  if (!value) throw new Error('ADMIN_SESSION_SECRET or BETTER_AUTH_SECRET must be configured to enable admin sessions')
  return value
}

function signature(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

export function isAdminCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL ?? 'admin67160360@gmail.com'
  const expectedPassword = process.env.ADMIN_PASSWORD ?? '12345678Zaza'
  return email.trim().toLowerCase() === expectedEmail.toLowerCase() && password === expectedPassword
}

export function createAdminToken() {
  const payload = `${Date.now() + SESSION_TTL_SECONDS * 1000}`
  return `${payload}.${signature(payload)}`
}

export function isValidAdminToken(token?: string) {
  if (!token) return false
  const [payload, supplied] = token.split('.')
  if (!payload || !supplied || !/^\d+$/.test(payload)) return false
  const expiresAt = Number(payload)
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Date.now()) return false
  try {
    const expected = Buffer.from(signature(payload))
    const actual = Buffer.from(supplied)
    return expected.length === actual.length && timingSafeEqual(expected, actual)
  } catch {
    return false
  }
}
