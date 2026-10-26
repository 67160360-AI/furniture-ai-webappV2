'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useStore } from '@/components/store-context'
import {
  ShoppingBag,
  Sparkles,
  Search,
  Menu,
  X,
  ShieldCheck,
  LogOut,
  ChevronDown,
} from 'lucide-react'

export function CapsuleNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { cartCount, user, loginAs, logout } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)

  // Close all open overlays on route change or Escape key
  useEffect(() => {
    setMobileMenuOpen(false)
    setUserDropdownOpen(false)
    setMoreMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        setUserDropdownOpen(false)
        setMoreMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
      setMobileMenuOpen(false)
    }
  }

  // All 7 links for full desktop and mobile drawer
  const allNavLinks = [
    { href: '/', label: 'หน้าแรก' },
    { href: '/products', label: 'เฟอร์นิเจอร์' },
    { href: '/furniture-designer', label: 'AI Designer', highlight: true },
    { href: '/services', label: 'บริการ' },
    { href: '/promo', label: 'โปรโมชั่น' },
    { href: '/about', label: 'เกี่ยวกับเรา' },
    { href: '/contact', label: 'ติดต่อร้าน' },
  ]

  // Secondary links placed in the "เพิ่มเติม" (More) dropdown on medium screens (md/lg)
  const secondaryLinks = [
    { href: '/promo', label: 'โปรโมชั่น' },
    { href: '/about', label: 'เกี่ยวกับเรา' },
    { href: '/contact', label: 'ติดต่อร้าน' },
  ]

  // Check if any link in the "More" dropdown is currently active
  const isMoreActiveLg = secondaryLinks.some(
    (l) => pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href))
  )
  const isMoreActiveMd = isMoreActiveLg || pathname === '/' || pathname.startsWith('/services')

  return (
    <header className="sticky top-4 z-50 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
      <div className="bg-[#FFFDF7]/90 backdrop-blur-md rounded-full px-4 sm:px-6 lg:px-7 py-2.5 sm:py-3 border border-[#E5DFEB] shadow-[12px_16px_32px_rgba(91,79,115,0.08),-6px_-6px_16px_rgba(255,255,255,0.9),inset_1px_1px_3px_rgba(255,255,255,0.8)] flex items-center justify-between gap-2 lg:gap-3 xl:gap-4 transition-all duration-300">
        
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A3CA] rounded-full select-none"
          aria-label="Maison Forme หน้าหลัก"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#F6A3CA] to-[#DED0F9] flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),3px_3px_8px_rgba(91,79,115,0.15)] group-hover:scale-105 transition-transform shrink-0 leading-none">
            M
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight leading-none text-[#383139] font-heading hidden sm:inline whitespace-nowrap">
            Maison <span className="text-[#F6A3CA]">Forme</span>
          </span>
        </Link>

        {/* Adaptive Horizontal Navigation:
            - md (768px-1023px): Shows key destinations + "เพิ่มเติม ▾" dropdown (Zero text wrapping on tablets)
            - lg (1024px-1279px): Shows 4 primary destinations + "เพิ่มเติม ▾" dropdown (Zero text wrapping on compact laptops)
            - xl (1280px+): Shows all 7 links inline full-width without dropdown
        */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 xl:gap-1 2xl:gap-1.5 shrink-0" aria-label="เมนูหลัก">
          
          {/* 1. หน้าแรก: visible inline on lg and xl; accessible in 'More' on md */}
          <Link
            href="/"
            className={`hidden lg:inline-flex whitespace-nowrap shrink-0 px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-full text-xs xl:text-xs 2xl:text-sm font-medium leading-none tracking-normal transition-all duration-200 items-center justify-center gap-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A3CA] ${
              pathname === '/'
                ? 'bg-[#F6A3CA] text-[#383139] shadow-xs font-bold'
                : 'text-[#706A76] hover:text-[#383139] hover:bg-[#F1F2FA] active:scale-[0.98]'
            }`}
          >
            <span className="leading-none whitespace-nowrap shrink-0">หน้าแรก</span>
          </Link>

          {/* 2. เฟอร์นิเจอร์: always visible inline across md, lg, xl */}
          <Link
            href="/products"
            className={`whitespace-nowrap shrink-0 px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-full text-xs xl:text-xs 2xl:text-sm font-medium leading-none tracking-normal transition-all duration-200 inline-flex items-center justify-center gap-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A3CA] ${
              pathname.startsWith('/products')
                ? 'bg-[#F6A3CA] text-[#383139] shadow-xs font-bold'
                : 'text-[#706A76] hover:text-[#383139] hover:bg-[#F1F2FA] active:scale-[0.98]'
            }`}
          >
            <span className="leading-none whitespace-nowrap shrink-0">เฟอร์นิเจอร์</span>
          </Link>

          {/* 3. AI Designer: signature tool with highlight, always visible inline across md, lg, xl */}
          <Link
            href="/furniture-designer"
            className="whitespace-nowrap shrink-0 px-2.5 xl:px-3 2xl:px-3.5 py-1.5 rounded-full text-xs xl:text-xs 2xl:text-sm font-semibold leading-none tracking-tight transition-all duration-200 inline-flex items-center justify-center gap-1.5 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A3CA] bg-gradient-to-r from-[#DED0F9] to-[#C0EFDC] text-[#383139] hover:shadow-xs hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#383139] shrink-0" />
            <span className="leading-none whitespace-nowrap shrink-0">AI Designer</span>
          </Link>

          {/* 4. บริการ: visible inline on lg and xl; accessible in 'More' on md */}
          <Link
            href="/services"
            className={`hidden lg:inline-flex whitespace-nowrap shrink-0 px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-full text-xs xl:text-xs 2xl:text-sm font-medium leading-none tracking-normal transition-all duration-200 items-center justify-center gap-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A3CA] ${
              pathname.startsWith('/services')
                ? 'bg-[#F6A3CA] text-[#383139] shadow-xs font-bold'
                : 'text-[#706A76] hover:text-[#383139] hover:bg-[#F1F2FA] active:scale-[0.98]'
            }`}
          >
            <span className="leading-none whitespace-nowrap shrink-0">บริการ</span>
          </Link>

          {/* 5, 6, 7. Secondary links: rendered inline on xl (1280px+) */}
          <div className="hidden xl:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 shrink-0">
            {secondaryLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap shrink-0 px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-full text-xs xl:text-xs 2xl:text-sm font-medium leading-none tracking-normal transition-all duration-200 inline-flex items-center justify-center gap-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A3CA] ${
                    isActive
                      ? 'bg-[#F6A3CA] text-[#383139] shadow-xs font-bold'
                      : 'text-[#706A76] hover:text-[#383139] hover:bg-[#F1F2FA] active:scale-[0.98]'
                  }`}
                >
                  <span className="leading-none whitespace-nowrap shrink-0">{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* More (เพิ่มเติม) Dropdown:
              Active on medium screens (md and lg: 768px-1279px) to prevent line-wrapping.
              Hidden on xl (1280px+) where all links fit inline.
          */}
          <div className="relative shrink-0 xl:hidden">
            <button
              type="button"
              onClick={() => {
                setMoreMenuOpen(!moreMenuOpen)
                setUserDropdownOpen(false)
              }}
              aria-expanded={moreMenuOpen}
              aria-haspopup="true"
              aria-label="เมนูเพิ่มเติม"
              className={`whitespace-nowrap shrink-0 px-2.5 lg:px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium leading-none tracking-normal transition-all duration-200 inline-flex items-center justify-center gap-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A3CA] active:scale-[0.98] ${
                isMoreActiveMd
                  ? 'bg-[#F6A3CA] text-[#383139] font-bold shadow-xs'
                  : 'text-[#706A76] hover:text-[#383139] hover:bg-[#F1F2FA]'
              }`}
            >
              <span className="leading-none whitespace-nowrap shrink-0">เพิ่มเติม</span>
              <ChevronDown
                className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                  moreMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {moreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMoreMenuOpen(false)}
                  aria-hidden="true"
                />
                <div
                  className="absolute left-0 top-full mt-2 w-48 bg-[#FFFDF7] rounded-3xl p-2 border border-[#E5DFEB] shadow-[12px_16px_36px_rgba(91,79,115,0.15),-6px_-6px_20px_rgba(255,255,255,0.9)] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  role="menu"
                >
                  <div className="space-y-1">
                    {/* Items shown in More on tablet md (768px-1023px) */}
                    <div className="lg:hidden space-y-1">
                      <Link
                        href="/"
                        onClick={() => setMoreMenuOpen(false)}
                        className={`block px-3 py-2 rounded-2xl text-xs font-medium leading-normal tracking-normal select-none transition ${
                          pathname === '/' ? 'bg-[#F6A3CA] text-[#383139] font-bold' : 'text-[#383139] hover:bg-[#F1F2FA]'
                        }`}
                      >
                        <span className="whitespace-nowrap">หน้าแรก</span>
                      </Link>
                      <Link
                        href="/services"
                        onClick={() => setMoreMenuOpen(false)}
                        className={`block px-3 py-2 rounded-2xl text-xs font-medium leading-normal tracking-normal select-none transition ${
                          pathname.startsWith('/services') ? 'bg-[#F6A3CA] text-[#383139] font-bold' : 'text-[#383139] hover:bg-[#F1F2FA]'
                        }`}
                      >
                        <span className="whitespace-nowrap">บริการ</span>
                      </Link>
                      <div className="border-t border-[#E5DFEB] my-1" />
                    </div>

                    {/* Secondary items always present in More dropdown */}
                    {secondaryLinks.map((link) => {
                      const isActive = pathname === link.href || pathname.startsWith(link.href)
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMoreMenuOpen(false)}
                          className={`block px-3 py-2 rounded-2xl text-xs font-medium leading-normal tracking-normal select-none transition ${
                            isActive ? 'bg-[#F6A3CA] text-[#383139] font-bold' : 'text-[#383139] hover:bg-[#F1F2FA]'
                          }`}
                        >
                          <span className="whitespace-nowrap">{link.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

        </nav>

        {/* Right-Side Controls Group: Search + Cart + User + Mobile Hamburger (all with shrink-0) */}
        <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0">
          
          {/* Search Bar - shrink-0 */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center relative shrink-0 transition-all duration-300 w-24 sm:w-28 lg:w-32 xl:w-32 2xl:w-40 focus-within:w-36 lg:focus-within:w-40 xl:focus-within:w-44 2xl:focus-within:w-52"
            role="search"
          >
            <input
              type="text"
              placeholder="ค้นหา..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F1F2FA] text-[#383139] text-xs xl:text-xs 2xl:text-sm leading-normal pl-8 pr-3 py-1.5 rounded-full border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none transition-all shadow-[inset_2px_2px_5px_rgba(91,79,115,0.06)] placeholder:text-[#8D8794] whitespace-nowrap truncate shrink-0"
            />
            <Search className="w-3.5 h-3.5 text-[#706A76] absolute left-2.5 pointer-events-none shrink-0" />
          </form>

          {/* Cart Pill - shrink-0 */}
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#FFFDF7] hover:bg-[#F1F2FA] px-2.5 sm:px-3 py-1.5 rounded-full border border-[#E5DFEB] shadow-[4px_4px_10px_rgba(91,79,115,0.08),-3px_-3px_8px_rgba(255,255,255,0.9)] active:scale-95 transition-all text-[#383139] shrink-0 whitespace-nowrap select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A3CA]"
            title="ตะกร้าสินค้า"
            aria-label={`ตะกร้าสินค้า ${cartCount > 0 ? `(${cartCount} รายการ)` : ''}`}
          >
            <div className="relative shrink-0 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#383139] shrink-0" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F6A3CA] text-white text-xs font-bold tabular-nums min-w-[18px] h-4 px-1 rounded-full flex items-center justify-center leading-none select-none animate-pulse shadow-xs shrink-0">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold leading-none tracking-normal hidden 2xl:inline whitespace-nowrap shrink-0">ตะกร้า</span>
          </Link>

          {/* User Profile / Auth Dropdown - shrink-0 */}
          <div className="relative shrink-0">
            {user ? (
              <button
                type="button"
                onClick={() => {
                  setUserDropdownOpen(!userDropdownOpen)
                  setMoreMenuOpen(false)
                }}
                aria-expanded={userDropdownOpen}
                aria-haspopup="true"
                className="inline-flex items-center gap-1.5 bg-[#FFFDF7] hover:bg-[#F1F2FA] px-2.5 py-1.5 rounded-full border border-[#E5DFEB] shadow-[4px_4px_10px_rgba(91,79,115,0.08),-3px_-3px_8px_rgba(255,255,255,0.9)] active:scale-95 transition-all text-[#383139] shrink-0 whitespace-nowrap select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A3CA]"
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold leading-none text-white shrink-0 ${
                    user.role === 'admin' ? 'bg-[#9333EA]' : 'bg-[#F6A3CA]'
                  }`}
                >
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-medium leading-none tracking-normal hidden sm:inline max-w-[70px] xl:max-w-[85px] 2xl:max-w-[110px] truncate whitespace-nowrap shrink-0">
                  {user.name}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-[#706A76] shrink-0 transition-transform duration-200 ${
                    userDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-1.5 bg-[#F6A3CA] hover:bg-[#f08bb9] px-3 py-2 rounded-full border border-[#E5DFEB] shadow-[4px_4px_10px_rgba(91,79,115,0.08),-3px_-3px_8px_rgba(255,255,255,0.9)] active:scale-95 transition-all text-[#383139] text-xs font-bold shrink-0 whitespace-nowrap select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A3CA]"
              >
                เข้าสู่ระบบ
              </Link>
            )}

            {user && userDropdownOpen && (
              <>
                {/* Invisible backdrop to dismiss dropdown on outside click */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserDropdownOpen(false)}
                  aria-hidden="true"
                />

                <div
                  className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] bg-[#FFFDF7] rounded-3xl p-3 border border-[#E5DFEB] shadow-[12px_16px_36px_rgba(91,79,115,0.15),-6px_-6px_20px_rgba(255,255,255,0.9)] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  role="menu"
                >
                  <div className="space-y-2">
                      <div className="px-3 py-2 bg-[#F1F2FA] rounded-2xl">
                        <div className="font-semibold text-xs text-[#383139]">{user.name}</div>
                        <div className="text-xs text-[#706A76] truncate">{user.email}</div>
                        <div className="mt-1 flex items-center gap-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              user.role === 'admin'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {user.role}
                          </span>
                        </div>
                      </div>

                      <div className="pt-1 text-xs space-y-1">
                        {user.role === 'admin' && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#383139] hover:bg-[#DED0F9]/40 font-semibold transition"
                          >
                            <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                            <span>ระบบจัดการหลังบ้าน (Admin)</span>
                          </Link>
                        )}
                        <Link
                          href="/orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#383139] hover:bg-[#F1F2FA] transition"
                        >
                          <span>ประวัติคำสั่งซื้อของฉัน</span>
                        </Link>
                        <Link
                          href="/furniture-designer"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#383139] hover:bg-[#F1F2FA] transition"
                        >
                          <span>แบบเฟอร์นิเจอร์ AI ที่บันทึกไว้</span>
                        </Link>
                      </div>

                      {/* Quick Demo Switcher */}
                      <div className="border-t border-[#E5DFEB] pt-2 px-1">
                        <div className="text-xs font-semibold text-[#706A76] mb-1.5 uppercase tracking-wider">
                          สลับโหมดทดสอบ (Demo Switcher)
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              loginAs('customer')
                              setUserDropdownOpen(false)
                            }}
                            className={`text-xs py-1.5 rounded-xl border text-center font-medium transition ${
                              user.role === 'customer'
                                ? 'bg-[#C0EFDC] border-[#9ad9bf] text-[#383139] font-bold'
                                : 'bg-white border-[#E5DFEB] text-[#706A76] hover:bg-[#F1F2FA]'
                            }`}
                          >
                            ลูกค้าทั่วไป
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              loginAs('admin')
                              setUserDropdownOpen(false)
                            }}
                            className={`text-xs py-1.5 rounded-xl border text-center font-medium transition ${
                              user.role === 'admin'
                                ? 'bg-[#DED0F9] border-[#b9a3ee] text-[#383139] font-bold'
                                : 'bg-white border-[#E5DFEB] text-[#706A76] hover:bg-[#F1F2FA]'
                            }`}
                          >
                            แอดมินร้าน
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-[#E5DFEB] pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            logout()
                            setUserDropdownOpen(false)
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-medium transition"
                        >
                          <LogOut className="w-3.5 h-3.5 shrink-0" />
                          <span>ออกจากระบบ</span>
                        </button>
                      </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button: visible only on mobile screens (< 768px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#383139] rounded-full hover:bg-[#F1F2FA] shrink-0 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A3CA]"
            aria-label={mobileMenuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 shrink-0" /> : <Menu className="w-5 h-5 shrink-0" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer with Backdrop (for screens < 768px) */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/15 backdrop-blur-xs z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 md:hidden mt-2 bg-[#FFFDF7] rounded-3xl p-5 border border-[#E5DFEB] shadow-[12px_16px_36px_rgba(91,79,115,0.15)] animate-in fade-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearch} className="mb-4 relative">
              <input
                type="text"
                placeholder="ค้นหาเฟอร์นิเจอร์..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F1F2FA] text-[#383139] text-sm pl-9 pr-3 py-2.5 rounded-full border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none shadow-[inset_2px_2px_5px_rgba(91,79,115,0.06)]"
              />
              <Search className="w-4 h-4 text-[#706A76] absolute left-3 top-3 shrink-0" />
            </form>

            <nav className="flex flex-col gap-1.5" aria-label="เมนูมือถือ">
              {allNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center justify-between transition-colors ${
                    pathname === link.href
                      ? 'bg-[#F6A3CA] text-white font-bold shadow-sm'
                      : 'text-[#383139] hover:bg-[#F1F2FA]'
                  }`}
                >
                  <span className="whitespace-nowrap">{link.label}</span>
                  {link.highlight && <Sparkles className="w-4 h-4 text-[#383139] shrink-0" />}
                </Link>
              ))}
              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-2xl text-sm font-bold bg-purple-100 text-purple-700 flex items-center justify-between mt-2"
                >
                  <span className="whitespace-nowrap">ระบบหลังบ้านแอดมิน</span>
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
