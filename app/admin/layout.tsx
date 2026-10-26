'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useStore } from '@/components/store-context'
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  FolderTree,
  Users,
  Settings,
  Cpu,
  LogOut,
  Store,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, loginAs, logout } = useStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const adminNav = [
    { href: '/admin', label: 'แดชบอร์ด (Overview)', icon: LayoutDashboard },
    { href: '/admin/products', label: 'จัดการสินค้า (Products)', icon: Package },
    { href: '/admin/product-form', label: 'เพิ่มสินค้าใหม่ (Add Product)', icon: PlusCircle },
    { href: '/admin/orders', label: 'จัดการคำสั่งซื้อ (Orders)', icon: ShoppingBag },
    { href: '/admin/categories', label: 'หมวดหมู่สินค้า (Categories)', icon: FolderTree },
    { href: '/admin/customers', label: 'รายชื่อลูกค้า (Customers)', icon: Users },
    { href: '/admin/settings', label: 'ตั้งค่าร้านค้า (Store Settings)', icon: Settings },
    { href: '/admin/ai-settings', label: 'ตั้งค่าระบบ AI (AI Engine)', icon: Cpu },
  ]

  // Gatekeeper check: if not admin, show switch/auth prompt
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#F1F2FA] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#FFFDF7] rounded-[44px] p-8 text-center border border-[#E5DFEB] shadow-[16px_24px_48px_rgba(91,79,115,0.08)] space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto text-2xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#383139] font-heading">
              เข้าสู่ระบบผู้ดูแลระบบ (Admin Only)
            </h1>
            <p className="text-xs text-[#706A76] mt-1.5 leading-relaxed">
              หน้านี้สงวนสิทธิ์เฉพาะผู้ดูแลระบบร้าน Maison Forme เท่านั้น
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F1F2FA] text-xs text-[#706A76]">
            บัญชีปัจจุบันของคุณคือ: <strong>{user ? `${user.name} (${user.role})` : 'ยังไม่ได้เข้าสู่ระบบ'}</strong>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => loginAs('admin')}
              className="w-full py-3.5 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm transition active:scale-95"
            >
              สลับเป็นสิทธิ์แอดมินทันที (Quick Admin Demo)
            </button>

            <Link
              href="/"
              className="block w-full py-3 rounded-full bg-[#F1F2FA] hover:bg-gray-200 text-[#383139] font-semibold text-xs transition"
            >
              กลับสู่หน้าร้านทั่วไป
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F1F2FA] flex flex-col md:flex-row">

      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-3 bg-[#FFFDF7] border-b border-[#E5DFEB] sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F6A3CA] to-[#9333EA] flex items-center justify-center text-white font-bold text-sm">
            M
          </div>
          <div>
            <div className="font-bold text-sm text-[#383139] font-heading">Maison Forme</div>
            <div className="text-[10px] text-purple-700 font-bold uppercase tracking-wider">Admin Portal</div>
          </div>
        </Link>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2.5 rounded-xl bg-[#F1F2FA] hover:bg-gray-200 text-[#383139] min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="เปิดเมนู"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#FFFDF7] border-r border-[#E5DFEB] p-5 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:static md:translate-x-0 md:w-64 lg:w-72 shrink-0
      `}>
        <div className="space-y-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5DFEB]">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F6A3CA] to-[#9333EA] flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <div>
                <div className="font-bold text-sm text-[#383139] font-heading">Maison Forme</div>
                <div className="text-[10px] text-purple-700 font-bold uppercase tracking-wider">Admin Portal</div>
              </div>
            </Link>

            <Link
              href="/"
              className="p-1.5 rounded-xl bg-[#F1F2FA] hover:bg-gray-200 text-[#706A76] text-xs"
              title="ดูหน้าร้าน"
            >
              <Store className="w-4 h-4" />
            </Link>
          </div>

          {/* Close button - mobile only */}
          <div className="flex md:hidden justify-end -mt-1 -mr-1 mb-2">
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2.5 rounded-xl hover:bg-[#F1F2FA] text-[#706A76] min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="ปิดเมนู"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition min-h-[44px] ${
                    isActive
                      ? 'bg-purple-100 text-purple-900 font-bold shadow-xs'
                      : 'text-[#706A76] hover:text-[#383139] hover:bg-[#F1F2FA]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-700' : 'text-[#706A76]'}`} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

        </div>

        {/* User Badge & Logout */}
        <div className="pt-6 border-t border-[#E5DFEB] space-y-2">
          <div className="p-3 bg-[#F1F2FA] rounded-2xl text-xs flex items-center justify-between">
            <div>
              <div className="font-bold text-[#383139]">{user.name}</div>
              <div className="text-[10px] text-[#706A76]">ผู้ดูแลระบบหลัก</div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50"
              title="ออกจากระบบ"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-8">
        {children}
      </main>

    </div>
  )
}
