import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, isValidAdminToken } from '@/lib/admin-session'
import { getSession, isAdminUser } from '@/lib/session'
import AdminShell from './admin-shell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminTokens = (await cookies()).getAll(ADMIN_COOKIE)
  const hasValidAdminCookie = adminTokens.some(({ value }) => isValidAdminToken(value))
  if (!hasValidAdminCookie) {
    let authorized = false
    try {
      const session = await getSession()
      authorized = Boolean(session && (await isAdminUser(session.user.id)))
    } catch {
      authorized = false
    }
    if (!authorized) redirect('/admin/login')
  }
  return <AdminShell>{children}</AdminShell>
}
