import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, isValidAdminToken } from '@/lib/admin-session'
import { getSession, isAdminUser } from '@/lib/session'
import AdminShell from './admin-shell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value
  if (!isValidAdminToken(token)) {
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
