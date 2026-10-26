import 'server-only'
import { db } from '@/lib/db'
import { storeSettings } from '@/lib/db/schema'

export type StoreInfo = {
  name: string
  tagline: string
  phone: string
  email: string
  address: string
  lineId: string
}
export type ShippingSettings = { standardFee: number; expressFee: number; freeThreshold: number }
export type BannerSettings = { enabled: boolean; text: string }
export type PaymentSettings = {
  bankTransfer: { enabled: boolean; bankName: string; accountName: string; accountNumber: string }
  cod: { enabled: boolean }
}
export type Settings = {
  store: StoreInfo
  shipping: ShippingSettings
  banner: BannerSettings
  payment: PaymentSettings
}

export const DEFAULT_SETTINGS: Settings = {
  store: {
    name: 'Maison Forme',
    tagline: 'เฟอร์นิเจอร์ที่ออกแบบมาเพื่อพื้นที่ของคุณ',
    phone: '',
    email: '',
    address: '',
    lineId: '',
  },
  shipping: { standardFee: 500, expressFee: 1200, freeThreshold: 30000 },
  banner: { enabled: false, text: '' },
  payment: {
    bankTransfer: { enabled: false, bankName: '', accountName: '', accountNumber: '' },
    cod: { enabled: true },
  },
}

export async function getSettings(): Promise<Settings> {
  const rows = await db.select().from(storeSettings)
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value])) as Partial<Settings>
  return {
    store: { ...DEFAULT_SETTINGS.store, ...map.store },
    shipping: { ...DEFAULT_SETTINGS.shipping, ...map.shipping },
    banner: { ...DEFAULT_SETTINGS.banner, ...map.banner },
    payment: {
      bankTransfer: { ...DEFAULT_SETTINGS.payment.bankTransfer, ...map.payment?.bankTransfer },
      cod: { ...DEFAULT_SETTINGS.payment.cod, ...map.payment?.cod },
    },
  }
}

export type ShippingMethod = 'standard' | 'express' | 'pickup'

export function computeShippingFee(method: ShippingMethod, subtotal: number, shipping: ShippingSettings) {
  if (method === 'pickup') return 0
  if (method === 'express') return shipping.expressFee
  return subtotal >= shipping.freeThreshold ? 0 : shipping.standardFee
}

export const SHIPPING_LABEL: Record<ShippingMethod, string> = {
  standard: 'จัดส่งมาตรฐาน (3–7 วันทำการ)',
  express: 'จัดส่งด่วนพร้อมติดตั้ง (1–3 วันทำการ)',
  pickup: 'รับสินค้าเองที่โชว์รูม',
}
