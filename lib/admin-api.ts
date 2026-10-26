import 'server-only'

import { cookies } from 'next/headers'
import { ADMIN_COOKIE, isValidAdminToken } from '@/lib/admin-session'
import { getCurrentUser, isAdminUser } from '@/lib/session'

export async function hasAdminAccess() {
  const cookieStore = await cookies()
  if (cookieStore.getAll(ADMIN_COOKIE).some(({ value }) => isValidAdminToken(value))) return true

  try {
    const sessionUser = await getCurrentUser()
    return Boolean(sessionUser && (await isAdminUser(sessionUser.id)))
  } catch {
    return false
  }
}
