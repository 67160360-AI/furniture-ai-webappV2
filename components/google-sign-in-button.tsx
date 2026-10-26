'use client'

import { useState } from 'react'
import { signIn } from '@/lib/auth-client'
import { toast } from 'sonner'

export function GoogleSignInButton() {
  const [pending, setPending] = useState(false)

  async function handleGoogleSignIn() {
    setPending(true)
    try {
      const { error } = await signIn.social({ provider: 'google', callbackURL: '/' })
      if (error) throw new Error(error.message || 'Google Sign-In ไม่สำเร็จ')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Google Sign-In ไม่สำเร็จ')
      setPending(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={pending}
      className="flex w-full min-h-12 items-center justify-center gap-3 rounded-full border border-[#DADCE0] bg-white px-4 py-3 text-sm font-semibold text-[#3C4043] shadow-sm transition hover:bg-[#F8F9FA] disabled:cursor-wait disabled:opacity-60"
    >
      <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
        <path fill="#4285F4" d="M48 24c0-1.7-.2-3.4-.5-5H24v9.5h13.5c-.6 3.1-2.4 5.7-5.1 7.4l8.2 6.4C45 37.8 48 31.5 48 24Z" />
        <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.7l-8.2-6.4c-2.2 1.5-4.9 2.4-7.8 2.4-6 0-11.1-4-12.9-9.4l-8.5 6.6C6.5 43 14.6 48 24 48Z" />
        <path fill="#FBBC05" d="M11.1 28.9c-.5-1.5-.8-3.2-.8-4.9 0-1.7.3-3.4.8-4.9l-8.5-6.6C.9 15.7 0 19.7 0 24s.9 8.3 2.6 11.5l8.5-6.6Z" />
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.7 1.2 9.2 3.6l7-7C36 2.3 30.5 0 24 0 14.6 0 6.5 5 2.6 12.5l8.5 6.6C12.9 13.7 18 9.5 24 9.5Z" />
      </svg>
      <span>{pending ? 'กำลังเชื่อมต่อ Google…' : 'เข้าสู่ระบบด้วย Google'}</span>
    </button>
  )
}
