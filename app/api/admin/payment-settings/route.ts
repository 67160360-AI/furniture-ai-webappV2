import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { hasAdminAccess } from '@/lib/admin-api'
import { db } from '@/lib/db'
import { storeSettings } from '@/lib/db/schema'
import { getSettings } from '@/lib/settings'

export const dynamic = 'force-dynamic'

const paymentSettingsSchema = z.object({
  promptpay: z.object({
    enabled: z.boolean(),
    accountName: z.string().max(160),
    promptpayId: z.string().max(40),
    qrImageUrl: z.string().max(1000).refine((value) => {
      if (!value) return true
      if (value.startsWith('/') && !value.startsWith('//')) return true
      try {
        return new URL(value).protocol === 'https:'
      } catch {
        return false
      }
    }, 'ลิงก์ QR ต้องเป็น HTTPS หรือพาธภายในเว็บไซต์'),
  }),
  creditCard: z.object({ enabled: z.boolean() }),
  bankTransfer: z.object({
    enabled: z.boolean(),
    bankName: z.string().max(160),
    accountName: z.string().max(160),
    accountNumber: z.string().max(80),
  }),
  cod: z.object({ enabled: z.boolean() }),
})

export async function GET() {
  if (!(await hasAdminAccess())) return NextResponse.json({ error: 'ไม่มีสิทธิ์เข้าถึง' }, { status: 403 })
  try {
    const { payment } = await getSettings()
    return NextResponse.json({ payment }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Could not load admin payment settings:', error)
    return NextResponse.json({ error: 'ไม่สามารถโหลดวิธีชำระเงินได้' }, { status: 503 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await hasAdminAccess())) return NextResponse.json({ error: 'ไม่มีสิทธิ์เข้าถึง' }, { status: 403 })
  const parsed = paymentSettingsSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'ข้อมูลวิธีชำระเงินไม่ถูกต้อง' }, { status: 400 })

  try {
    const payment = parsed.data
    await db.insert(storeSettings)
      .values({ key: 'payment', value: payment })
      .onConflictDoUpdate({
        target: storeSettings.key,
        set: { value: payment, updatedAt: new Date() },
      })
    return NextResponse.json({ ok: true, payment })
  } catch (error) {
    console.error('Could not save payment settings:', error)
    return NextResponse.json({ error: 'บันทึกวิธีชำระเงินไม่สำเร็จ' }, { status: 503 })
  }
}
