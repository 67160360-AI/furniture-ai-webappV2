import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE, createAdminToken, isAdminCredentials, isValidAdminToken } from '@/lib/admin-session'

export const dynamic = 'force-dynamic'

function getAdminProfile() {
  const email = process.env.ADMIN_EMAIL ?? 'admin67160360@gmail.com'
  return { id: 'admin', name: email.split('@')[0], email, role: 'admin' as const }
}

export async function GET() {
  const tokens = (await cookies()).getAll(ADMIN_COOKIE)
  if (!tokens.some(({ value }) => isValidAdminToken(value))) return NextResponse.json({ user: null })
  return NextResponse.json({ user: getAdminProfile() }, { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body || typeof body.email !== 'string' || typeof body.password !== 'string') {
    return NextResponse.json({ error: 'กรุณากรอกอีเมลและรหัสผ่าน' }, { status: 400 })
  }
  if (!isAdminCredentials(body.email, body.password)) {
    return NextResponse.json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 })
  }
  try {
    const response = NextResponse.json({ ok: true, user: getAdminProfile() })
    response.cookies.set(ADMIN_COOKIE, createAdminToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 8,
    })
    return response
  } catch {
    return NextResponse.json({ error: 'ระบบยืนยันตัวตนไม่พร้อมใช้งาน' }, { status: 503 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 0 })
  response.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/admin', maxAge: 0 })
  return response
}
