import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, isValidAdminToken } from '@/lib/admin-session'
import AdminShell from './admin-shell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value
  if (!isValidAdminToken(token)) redirect('/admin/login')
  return <AdminShell>{children}</AdminShell>
}
