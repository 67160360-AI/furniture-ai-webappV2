import 'server-only'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

export async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user ?? null
}

export async function requireUser() {
  const current = await getCurrentUser()
  if (!current) throw new HttpError(401, 'กรุณาเข้าสู่ระบบ')
  return current
}

/** Role is re-read from the database so a demoted admin loses access immediately. */
export async function isAdminUser(userId: string) {
  const [row] = await db.select({ role: user.role }).from(user).where(eq(user.id, userId)).limit(1)
  return row?.role === 'admin'
}

export async function requireAdmin() {
  const current = await requireUser()
  if (!(await isAdminUser(current.id))) throw new HttpError(403, 'ไม่มีสิทธิ์เข้าถึง')
  return current
}
