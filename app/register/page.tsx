'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CapsuleNavbar } from '@/components/capsule-navbar'
import { Footer } from '@/components/footer'
import { useStore } from '@/components/store-context'
import { signUp } from '@/lib/auth-client'
import { User, Lock, Mail, Phone, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export default function RegisterPage() {
  const router = useRouter()
  const { loginUser } = useStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast.error('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน')
      return
    }

    setPending(true)
    try {
      await fetch('/api/admin-session', { method: 'DELETE' })
      const { data, error } = await signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone: phone.trim() || undefined,
      })
      if (error || !data?.user) throw new Error(error?.message || 'สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่')
      loginUser({ id: data.user.id, name: data.user.name, email: data.user.email, role: 'customer' })
      toast.success('สมัครสมาชิกและเข้าสู่ระบบสำเร็จ ยินดีต้อนรับสู่ Maison Forme!')
      router.replace('/')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'สมัครสมาชิกไม่สำเร็จ')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F2FA]">
      <CapsuleNavbar />

      <main className="flex-1 max-w-md mx-auto px-4 py-12 w-full flex items-center justify-center">
        <div className="w-full bg-[#FFFDF7] rounded-[44px] p-8 sm:p-10 border border-[#E5DFEB] shadow-[16px_24px_48px_rgba(91,79,115,0.08),-10px_-10px_28px_rgba(255,255,255,0.9)] space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F6A3CA] to-[#C0EFDC] text-white flex items-center justify-center font-bold text-xl mx-auto shadow-sm">
              M
            </div>
            <h1 className="text-2xl font-extrabold text-[#383139] tracking-tight font-heading">
              สมัครสมาชิกใหม่
            </h1>
            <p className="text-xs text-[#706A76]">
              รับสิทธิพิเศษ ส่วนลดสมาชิก 10% และบันทึกแบบเฟอร์นิเจอร์ AI ได้ไม่จำกัด
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">
                ชื่อ-นามสกุล *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="คุณสมชาย สดใส"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F1F2FA] text-[#383139] text-xs pl-9 pr-4 py-3 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
                />
                <User className="w-4 h-4 text-[#706A76] absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">
                อีเมล *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="somchai@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F1F2FA] text-[#383139] text-xs pl-9 pr-4 py-3 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
                />
                <Mail className="w-4 h-4 text-[#706A76] absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">
                เบอร์โทรศัพท์
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="08x-xxx-xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F1F2FA] text-[#383139] text-xs pl-9 pr-4 py-3 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
                />
                <Phone className="w-4 h-4 text-[#706A76] absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">
                ตั้งรหัสผ่าน *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="อย่างน้อย 8 ตัวอักษร"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F1F2FA] text-[#383139] text-xs pl-9 pr-4 py-3 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
                />
                <Lock className="w-4 h-4 text-[#706A76] absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full py-3.5 rounded-full bg-[#F6A3CA] hover:bg-[#f08bb9] text-white font-bold text-sm shadow-[6px_8px_20px_rgba(246,163,202,0.4)] active:scale-98 transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span>{pending ? 'กำลังสมัคร…' : 'ยืนยันสมัครสมาชิก'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-[#706A76]">
            มีบัญชีสมาชิกอยู่แล้ว?{' '}
            <Link href="/login" className="font-bold text-[#F6A3CA] hover:underline">
              เข้าสู่ระบบที่นี่
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
