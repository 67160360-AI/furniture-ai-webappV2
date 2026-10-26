import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE, createAdminToken, isAdminCredentials, isValidAdminToken } from '@/lib/admin-session'

export async function GET() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value
  if (!isValidAdminToken(token)) return NextResponse.json({ user: null })
  const email = process.env.ADMIN_EMAIL ?? 'admin67160360@gmail.com'
  return NextResponse.json({ user: { id: 'admin', name: email.split('@')[0], email, role: 'admin' as const } })
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
    const response = NextResponse.json({ ok: true })
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
  return response
}
