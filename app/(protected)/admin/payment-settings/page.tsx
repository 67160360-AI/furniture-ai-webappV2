'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Banknote, Building2, CreditCard, QrCode, Save } from 'lucide-react'
import { toast } from 'sonner'
import { DEFAULT_PAYMENT_SETTINGS, type PaymentSettings } from '@/lib/payment-settings'

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}) {
  return (
    <label className="inline-flex min-h-11 items-center gap-2.5 cursor-pointer text-sm font-semibold text-[#383139]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-purple-700"
      />
      {label}
    </label>
  )
}

export default function AdminPaymentSettingsPage() {
  const [payment, setPayment] = useState<PaymentSettings>(DEFAULT_PAYMENT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let active = true
    fetch('/api/admin/payment-settings', { cache: 'no-store' })
      .then(async (response) => {
        const result = await response.json().catch(() => null)
        if (!response.ok) throw new Error(result?.error || 'โหลดการตั้งค่าไม่สำเร็จ')
        if (active && result?.payment) {
          setPayment({
            ...DEFAULT_PAYMENT_SETTINGS,
            ...result.payment,
            promptpay: { ...DEFAULT_PAYMENT_SETTINGS.promptpay, ...result.payment.promptpay },
            creditCard: { ...DEFAULT_PAYMENT_SETTINGS.creditCard, ...result.payment.creditCard },
            bankTransfer: { ...DEFAULT_PAYMENT_SETTINGS.bankTransfer, ...result.payment.bankTransfer },
            cod: { ...DEFAULT_PAYMENT_SETTINGS.cod, ...result.payment.cod },
          })
        }
      })
      .catch((error) => {
        if (active) toast.error(error instanceof Error ? error.message : 'โหลดการตั้งค่าไม่สำเร็จ')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  const update = <K extends keyof PaymentSettings>(key: K, value: Partial<PaymentSettings[K]>) => {
    setPayment((current) => ({ ...current, [key]: { ...current[key], ...value } }))
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (![payment.promptpay.enabled, payment.creditCard.enabled, payment.bankTransfer.enabled, payment.cod.enabled].some(Boolean)) {
      toast.error('ต้องเปิดวิธีชำระเงินอย่างน้อย 1 ช่องทาง')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/admin/payment-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok) throw new Error(result?.error || 'บันทึกไม่สำเร็จ')
      toast.success('บันทึกวิธีชำระเงินแล้ว')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'บันทึกไม่สำเร็จ')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'w-full rounded-2xl border border-transparent bg-[#F1F2FA] px-4 py-3 text-sm text-[#383139] outline-none focus:border-purple-600 focus:bg-white'

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#383139] font-heading">วิธีชำระเงิน</h1>
        <p className="mt-1 text-sm text-[#706A76]">เลือกช่องทางที่แสดงในหน้า Checkout และแก้ไขรายละเอียดบัญชีรับโอน</p>
      </div>

      <form onSubmit={save} className="space-y-5 rounded-[32px] border border-[#E5DFEB] bg-[#FFFDF7] p-5 shadow-sm sm:p-8">
        <section className="space-y-4 rounded-2xl border border-[#E5DFEB] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <QrCode className="mt-0.5 h-5 w-5 shrink-0 text-purple-700" />
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-[#383139]">PromptPay QR</h2>
              <p className="mt-1 text-xs text-[#706A76]">เปิด/ปิดช่องทาง และกำหนดรูป QR ที่ลูกค้าจะเห็นในหน้าชำระเงิน</p>
              <Toggle checked={payment.promptpay.enabled} onChange={(enabled) => update('promptpay', { enabled })} label="เปิดให้ชำระผ่าน PromptPay" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-bold text-[#383139]">ชื่อบัญชี PromptPay
              <input className={`${inputClass} mt-1 font-normal`} value={payment.promptpay.accountName} onChange={(event) => update('promptpay', { accountName: event.target.value })} />
            </label>
            <label className="block text-xs font-bold text-[#383139]">หมายเลข PromptPay (แสดงให้ลูกค้า)
              <input className={`${inputClass} mt-1 font-normal`} value={payment.promptpay.promptpayId} onChange={(event) => update('promptpay', { promptpayId: event.target.value })} placeholder="เบอร์โทรหรือเลขประจำตัวผู้เสียภาษี" />
            </label>
            <label className="block text-xs font-bold text-[#383139] sm:col-span-2">ลิงก์รูป QR สำหรับรับเงิน (ไม่บังคับ)
              <input className={`${inputClass} mt-1 font-normal`} value={payment.promptpay.qrImageUrl} onChange={(event) => update('promptpay', { qrImageUrl: event.target.value })} placeholder="https://... หรือ /images/payment/promptpay.png" />
            </label>
          </div>
          <p className="text-xs text-amber-800">ต้องใส่ลิงก์รูป QR PromptPay ที่ใช้รับเงินจริง ลูกค้าจึงจะสแกนชำระได้</p>
        </section>

        <section className="space-y-3 rounded-2xl border border-[#E5DFEB] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-purple-700" />
            <div>
              <h2 className="font-bold text-[#383139]">บัตรเครดิต / เดบิต</h2>
              <Toggle checked={payment.creditCard.enabled} onChange={(enabled) => update('creditCard', { enabled })} label="แสดงช่องทางบัตรเครดิตใน Checkout" />
              <p className="text-xs text-amber-800">แบบฟอร์มบัตรปัจจุบันเป็นโหมดตัวอย่าง ยังไม่ได้เชื่อม Payment Gateway และไม่ควรกรอกข้อมูลบัตรจริง</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-[#E5DFEB] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-purple-700" />
            <div>
              <h2 className="font-bold text-[#383139]">โอนเงินผ่านธนาคาร</h2>
              <Toggle checked={payment.bankTransfer.enabled} onChange={(enabled) => update('bankTransfer', { enabled })} label="เปิดให้ชำระด้วยการโอนเงิน" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-xs font-bold text-[#383139]">ธนาคาร
              <input className={`${inputClass} mt-1 font-normal`} value={payment.bankTransfer.bankName} onChange={(event) => update('bankTransfer', { bankName: event.target.value })} />
            </label>
            <label className="block text-xs font-bold text-[#383139]">ชื่อบัญชี
              <input className={`${inputClass} mt-1 font-normal`} value={payment.bankTransfer.accountName} onChange={(event) => update('bankTransfer', { accountName: event.target.value })} />
            </label>
            <label className="block text-xs font-bold text-[#383139]">เลขที่บัญชี
              <input className={`${inputClass} mt-1 font-normal`} value={payment.bankTransfer.accountNumber} onChange={(event) => update('bankTransfer', { accountNumber: event.target.value })} />
            </label>
          </div>
        </section>

        <section className="space-y-3 rounded-2xl border border-[#E5DFEB] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <Banknote className="mt-0.5 h-5 w-5 shrink-0 text-purple-700" />
            <div>
              <h2 className="font-bold text-[#383139]">เก็บเงินปลายทาง (COD)</h2>
              <Toggle checked={payment.cod.enabled} onChange={(enabled) => update('cod', { enabled })} label="เปิดให้ชำระเงินเมื่อได้รับสินค้า" />
            </div>
          </div>
        </section>

        <button type="submit" disabled={loading || saving} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-purple-700 px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-purple-800 disabled:opacity-60">
          <Save className="h-4 w-4" />
          {loading ? 'กำลังโหลด…' : saving ? 'กำลังบันทึก…' : 'บันทึกวิธีชำระเงิน'}
        </button>
      </form>
    </div>
  )
}
