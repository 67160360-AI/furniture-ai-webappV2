'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, PlusCircle, ShoppingBag, FolderTree, Users, Settings, Cpu, LogOut, Store, Menu, X, CreditCard } from 'lucide-react'

const items = [
  { href: '/admin', label: 'แดชบอร์ด (Overview)', icon: LayoutDashboard },
  { href: '/admin/products', label: 'จัดการสินค้า (Products)', icon: Package },
  { href: '/admin/product-form', label: 'เพิ่มสินค้าใหม่ (Add Product)', icon: PlusCircle },
  { href: '/admin/orders', label: 'จัดการคำสั่งซื้อ (Orders)', icon: ShoppingBag },
  { href: '/admin/categories', label: 'หมวดหมู่สินค้า (Categories)', icon: FolderTree },
  { href: '/admin/customers', label: 'รายชื่อลูกค้า (Customers)', icon: Users },
  { href: '/admin/settings', label: 'ตั้งค่าร้านค้า (Store Settings)', icon: Settings },
  { href: '/admin/payment-settings', label: 'วิธีชำระเงิน (Payments)', icon: CreditCard },
  { href: '/admin/ai-settings', label: 'ตั้งค่าระบบ AI (AI Engine)', icon: Cpu },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  async function logout() {
    await fetch('/api/admin-session', { method: 'DELETE' })
    router.replace('/admin/login')
    router.refresh()
  }
  return <div className="min-h-screen bg-[#F1F2FA] flex flex-col md:flex-row">
    <div className="md:hidden flex items-center justify-between p-3 bg-[#FFFDF7] border-b border-[#E5DFEB] sticky top-0 z-40">
      <Link href="/" className="font-bold text-sm text-[#383139]">Maison Forme · Admin</Link>
      <button onClick={() => setSidebarOpen(true)} className="p-2.5 rounded-xl bg-[#F1F2FA] min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="เปิดเมนู"><Menu className="w-5 h-5" /></button>
    </div>
    {sidebarOpen && <div className="md:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setSidebarOpen(false)} />}
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#FFFDF7] border-r border-[#E5DFEB] p-5 flex flex-col justify-between transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:w-64 lg:w-72 shrink-0`}>
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5DFEB]"><Link href="/" className="font-bold text-sm text-[#383139]">Maison Forme <span className="block text-[10px] text-purple-700 uppercase tracking-wider">Admin Portal</span></Link><Link href="/" className="p-2 rounded-xl bg-[#F1F2FA]" title="ดูหน้าร้าน"><Store className="w-4 h-4" /></Link></div>
        <div className="flex md:hidden justify-end"><button onClick={() => setSidebarOpen(false)} aria-label="ปิดเมนู"><X className="w-5 h-5" /></button></div>
        <nav className="space-y-1">{items.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold min-h-[44px] ${pathname === href ? 'bg-purple-100 text-purple-900 font-bold' : 'text-[#706A76] hover:bg-[#F1F2FA]'}`}><Icon className="w-4 h-4" /><span>{label}</span></Link>)}</nav>
      </div>
      <div className="pt-6 border-t border-[#E5DFEB]"><div className="p-3 bg-[#F1F2FA] rounded-2xl text-xs flex items-center justify-between"><div><div className="font-bold text-[#383139]">ผู้ดูแลระบบ</div><div className="text-[10px] text-[#706A76]">Maison Forme</div></div><button onClick={logout} className="p-2 rounded-xl text-rose-600 hover:bg-rose-50" title="ออกจากระบบ"><LogOut className="w-4 h-4" /></button></div></div>
    </aside>
    <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-8">{children}</main>
  </div>
}
