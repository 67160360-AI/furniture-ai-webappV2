const thb = new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 })

export function formatPrice(value: number) {
  return thb.format(value)
}

export function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

export function formatDimensions(w?: number | null, d?: number | null, h?: number | null) {
  if (!w && !d && !h) return null
  return `${w ?? '-'} × ${d ?? '-'} × ${h ?? '-'} ซม.`
}

export const ORDER_STATUS_LABEL: Record<string, string> = {
  pending: 'รอยืนยัน',
  confirmed: 'ยืนยันแล้ว',
  processing: 'กำลังเตรียม/ผลิต',
  shipped: 'จัดส่งแล้ว',
  delivered: 'ส่งถึงแล้ว',
  cancelled: 'ยกเลิก',
}

export const PAYMENT_STATUS_LABEL: Record<string, string> = {
  unpaid: 'รอชำระเงิน',
  paid: 'ชำระแล้ว (ตรวจสอบแล้ว)',
  refunded: 'คืนเงินแล้ว',
}

export const PAYMENT_METHOD_LABEL: Record<string, string> = {
  bank_transfer: 'โอนเงินผ่านธนาคาร',
  cod: 'ชำระเงินปลายทาง',
}

export const QUOTE_STATUS_LABEL: Record<string, string> = {
  new: 'คำขอใหม่',
  contacted: 'ติดต่อลูกค้าแล้ว',
  quoted: 'เสนอราคาแล้ว',
  in_production: 'กำลังผลิต',
  closed: 'ปิดคำขอ',
}
