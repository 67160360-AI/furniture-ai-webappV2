'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CapsuleNavbar } from '@/components/capsule-navbar'
import { Footer } from '@/components/footer'
import { useStore } from '@/components/store-context'
import { Lock, Mail, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const { loginAs } = useStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('กรุณากรอกอีเมลและรหัสผ่าน')
      return
    }

    loginAs('customer')
    toast.success('เข้าสู่ระบบสำเร็จ ยินดีต้อนรับกลับมา')
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F2FA]">
      <CapsuleNavbar />

      <main className="flex-1 max-w-md mx-auto px-4 py-12 w-full flex items-center justify-center">
        <div className="w-full bg-[#FFFDF7] rounded-[44px] p-8 sm:p-10 border border-[#E5DFEB] shadow-[16px_24px_48px_rgba(91,79,115,0.08),-10px_-10px_28px_rgba(255,255,255,0.9)] space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F6A3CA] to-[#DED0F9] text-white flex items-center justify-center font-bold text-xl mx-auto shadow-sm">
              M
            </div>
            <h1 className="text-2xl font-extrabold text-[#383139] tracking-tight font-heading">
              เข้าสู่ระบบ Maison Forme
            </h1>
            <p className="text-xs text-[#706A76]">
              ยินดีต้อนรับกลับสู่แพลตฟอร์มเฟอร์นิเจอร์และ AI Designer
            </p>
          </div>

          {/* Manual Form */}
          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">
                อีเมล (Email)
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="patcha@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F1F2FA] text-[#383139] text-xs pl-9 pr-4 py-3 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
                />
                <Mail className="w-4 h-4 text-[#706A76] absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">
                รหัสผ่าน (Password)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F1F2FA] text-[#383139] text-xs pl-9 pr-4 py-3 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
                />
                <Lock className="w-4 h-4 text-[#706A76] absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#F6A3CA] hover:bg-[#f08bb9] text-white font-bold text-sm shadow-[6px_8px_20px_rgba(246,163,202,0.4)] active:scale-98 transition flex items-center justify-center gap-2"
            >
              <span>เข้าสู่ระบบ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-[#706A76]">
            ยังไม่มีบัญชีสมาชิก?{' '}
            <Link href="/register" className="font-bold text-[#F6A3CA] hover:underline">
              สมัครสมาชิกที่นี่
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
