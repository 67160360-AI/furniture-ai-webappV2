import { NextResponse } from 'next/server'
import { getSettings } from '@/lib/settings'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { payment } = await getSettings()
    return NextResponse.json({ payment }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Could not load payment settings:', error)
    return NextResponse.json({ error: 'ไม่สามารถโหลดวิธีชำระเงินได้' }, { status: 503 })
  }
}
