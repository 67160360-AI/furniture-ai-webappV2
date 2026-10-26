'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Mail, ShieldCheck } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')
    try {
      const response = await fetch('/api/admin-session', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'เข้าสู่ระบบไม่สำเร็จ')
      router.replace('/admin')
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'เข้าสู่ระบบไม่สำเร็จ')
    } finally {
      setPending(false)
    }
  }

  return <main className="min-h-screen bg-[#F1F2FA] flex items-center justify-center p-4">
    <div className="w-full max-w-md rounded-[36px] bg-[#FFFDF7] border border-[#E5DFEB] p-8 sm:p-10 shadow-xl space-y-6">
      <div className="text-center space-y-3">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center"><ShieldCheck className="w-7 h-7" /></div>
        <h1 className="text-2xl font-bold text-[#383139]">ยืนยันตัวตนผู้ดูแลระบบ</h1>
        <p className="text-sm text-[#706A76]">เข้าสู่ระบบเพื่อจัดการ Maison Forme</p>
      </div>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm font-semibold text-[#383139]">อีเมล
          <span className="relative block mt-1"><Mail className="absolute left-3 top-3.5 w-4 h-4 text-[#706A76]" /><input type="email" required autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-xl bg-[#F1F2FA] py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-purple-300" /></span>
        </label>
        <label className="block text-sm font-semibold text-[#383139]">รหัสผ่าน
          <span className="relative block mt-1"><Lock className="absolute left-3 top-3.5 w-4 h-4 text-[#706A76]" /><input type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-xl bg-[#F1F2FA] py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-purple-300" /></span>
        </label>
        {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
        <button disabled={pending} className="w-full rounded-full bg-purple-700 py-3.5 font-bold text-white disabled:opacity-60">{pending ? 'กำลังตรวจสอบ…' : 'เข้าสู่ระบบแอดมิน'}</button>
      </form>
      <Link href="/" className="block text-center text-sm text-[#706A76] hover:underline">กลับสู่หน้าร้าน</Link>
    </div>
  </main>
}
