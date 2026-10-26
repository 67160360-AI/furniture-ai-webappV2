'use client'

import React, { useState, useEffect, useMemo, useCallback, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CapsuleNavbar } from '@/components/capsule-navbar'
import { Footer } from '@/components/footer'
import { useStore } from '@/components/store-context'
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronLeft,
  Tag,
  Copy,
  AlertCircle,
  Loader2,
  X,
  UploadCloud,
  FileCheck,
  Clock,
} from 'lucide-react'
import { toast } from 'sonner'

/* ── Isolated subcomponent: countdown timer ── */
/* Re-renders once/second WITHOUT re-rendering the entire CheckoutPage */
const PromptPayCountdownBadge = memo(function PromptPayCountdownBadge() {
  const [seconds, setSeconds] = useState(15 * 60) // 15 minutes

  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds <= 0]) // only re-subscribe when exhausted

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-medium tabular-nums">
      <Clock className="w-3.5 h-3.5 text-amber-600" />
      <span>
        หมดอายุใน {mins}:{String(secs).padStart(2, '0')} นาที
      </span>
    </div>
  )
})

/* ── Isolated subcomponent: credit card fields ── */
const CreditCardForm = memo(function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  return (
    <div className="mt-4 p-4 rounded-2xl bg-background border border-border space-y-3">
      <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
        <CreditCard className="w-4 h-4 text-primary" />
        <span>กรอกข้อมูลบัตรเครดิต / เดบิต (ระบบทดสอบปลอดภัย)</span>
      </div>
      <div>
        <label htmlFor="card-number" className="block text-xs font-medium text-foreground mb-1">
          หมายเลขบัตร 16 หลัก
        </label>
        <input
          id="card-number"
          type="text"
          maxLength={19}
          placeholder="4111 2222 3333 4444"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim())}
          className="w-full bg-card text-foreground text-xs px-3.5 py-2.5 rounded-xl border border-border focus:border-primary outline-none font-mono"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="card-expiry" className="block text-xs font-medium text-foreground mb-1">
            วันหมดอายุ (MM/YY)
          </label>
          <input
            id="card-expiry"
            type="text"
            maxLength={5}
            placeholder="12/28"
            value={cardExpiry}
            onChange={(e) => setCardExpiry(e.target.value)}
            className="w-full bg-card text-foreground text-xs px-3.5 py-2.5 rounded-xl border border-border focus:border-primary outline-none font-mono"
          />
        </div>
        <div>
          <label htmlFor="card-cvv" className="block text-xs font-medium text-foreground mb-1">
            CVV / CVC
          </label>
          <input
            id="card-cvv"
            type="password"
            maxLength={4}
            placeholder="123"
            value={cardCvv}
            onChange={(e) => setCardCvv(e.target.value)}
            className="w-full bg-card text-foreground text-xs px-3.5 py-2.5 rounded-xl border border-border focus:border-primary outline-none font-mono"
          />
        </div>
      </div>
    </div>
  )
})

/* ── Isolated subcomponent: bank transfer details ── */
function BankTransferForm({
  copiedAccount,
  onCopy,
}: {
  copiedAccount: boolean
  onCopy: (text: string, label: string) => void
}) {
  const [slipFile, setSlipFile] = useState<string | null>(null)

  return (
    <div className="mt-4 p-4 rounded-2xl bg-background border border-border space-y-3">
      <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
        <Building2 className="w-4 h-4 text-purple-700" />
        <span>โอนเงินเข้าบัญชีบริษัท (พร้อมส่งสลิป)</span>
      </div>
      <div className="bg-card p-3.5 rounded-2xl border border-border flex items-center justify-between text-xs transition-colors">
        <div>
          <div className="font-bold text-foreground">ธนาคารกสิกรไทย (KBANK)</div>
          <div className="text-muted-foreground">ชื่อบัญชี: บจก. เมซง ฟอร์ม จำกัด</div>
          <div className="font-mono font-semibold text-foreground text-sm mt-0.5 tracking-wide">099-2-84912-3</div>
        </div>
        <button
          type="button"
          onClick={() => onCopy('0992849123', 'เลขบัญชี')}
          className={`min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 touch-manipulation ${
            copiedAccount
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300'
              : 'bg-primary/20 text-foreground hover:bg-primary/40 border border-transparent'
          }`}
        >
          {copiedAccount ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>คัดลอกแล้ว</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>คัดลอก</span>
            </>
          )}
        </button>
      </div>

      <div className="text-xs text-muted-foreground pt-1">
        <label htmlFor="slip-upload" className="block font-medium text-foreground mb-1">
          แนบสลิปการโอนเงิน (ไม่บังคับ สามารถแจ้งภายหลังได้):
        </label>
        <input
          id="slip-upload"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) setSlipFile(file.name)
          }}
          className="text-xs text-muted-foreground file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-foreground hover:file:opacity-90"
        />
        {slipFile && (
          <div className="text-xs text-emerald-700 flex items-center gap-1 mt-1 font-medium">
            <FileCheck className="w-3.5 h-3.5" />
            <span>แนบไฟล์ {slipFile} เรียบร้อย</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const {
    cart,
    cartSubtotal,
    user,
    createOrder,
    appliedPromo,
    discountAmount,
    applyPromo,
    removePromo,
  } = useStore()

  // Shipping Form State
  const [recipientName, setRecipientName] = useState(user?.name || '')
  const [phone, setPhone] = useState('089-123-4567')
  const [email, setEmail] = useState(user?.email || '')
  const [address, setAddress] = useState('99/12 หมู่บ้านศุภาลัยการ์เด้น ซอยสุขุมวิท 39')
  const [city, setCity] = useState('กรุงเทพมหานคร')
  const [postalCode, setPostalCode] = useState('10110')
  const [note, setNote] = useState('กรุณาโทรแจ้งก่อนส่ง 30 นาที')

  // Validation Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})

  // Shipping & Payment Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'pickup'>('express')
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'bank_transfer' | 'credit_card' | 'cod'>('promptpay')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // PromptPay Modal State
  const [showPromptPayModal, setShowPromptPayModal] = useState(false)
  const [copiedAccount, setCopiedAccount] = useState(false)

  // In-checkout Promo Input
  const [promoInput, setPromoInput] = useState('')
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  // Memoized Shipping Calculation
  const FREE_SHIPPING_THRESHOLD = 30000
  const shippingFee = useMemo(() => {
    if (shippingMethod === 'standard') {
      return cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 500
    } else if (shippingMethod === 'express') {
      return 1200
    } else if (shippingMethod === 'pickup') {
      return 0
    }
    return 0
  }, [shippingMethod, cartSubtotal])

  const grandTotal = useMemo(() => {
    return Math.max(0, cartSubtotal - discountAmount + shippingFee)
  }, [cartSubtotal, discountAmount, shippingFee])

  const validateField = useCallback((field: string, value: string): string => {
    switch (field) {
      case 'recipientName':
        if (!value.trim()) return 'กรุณากรอกชื่อ-นามสกุลผู้รับ'
        if (value.trim().length < 2) return 'ชื่อผู้รับต้องมีอย่างน้อย 2 ตัวอักษร'
        return ''
      case 'phone':
        if (!value.trim()) return 'กรุณากรอกเบอร์โทรศัพท์ติดต่อ'
        const cleanPhone = value.replace(/[-\s]/g, '')
        if (!/^0\d{8,9}$/.test(cleanPhone)) return 'รูปแบบเบอร์โทรไม่ถูกต้อง (เช่น 0891234567)'
        return ''
      case 'email':
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'รูปแบบอีเมลไม่ถูกต้อง'
        }
        return ''
      case 'address':
        if (!value.trim()) return 'กรุณากรอกที่อยู่จัดส่ง'
        if (value.trim().length < 8) return 'กรุณากรอกที่อยู่ให้ชัดเจน (บ้านเลขที่, ถนน/ซอย)'
        return ''
      case 'city':
        if (!value.trim()) return 'กรุณากรอกจังหวัด / อำเภอ'
        return ''
      case 'postalCode':
        if (!value.trim()) return 'กรุณากรอกรหัสไปรษณีย์'
        if (!/^\d{5}$/.test(value.trim())) return 'รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก'
        return ''
      default:
        return ''
    }
  }, [])

  const handleBlur = useCallback((field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const errorMsg = validateField(field, value)
    setErrors((prev) => ({ ...prev, [field]: errorMsg }))
  }, [validateField])

  const validateAll = useCallback((): boolean => {
    const newErrors: { [key: string]: string } = {
      recipientName: validateField('recipientName', recipientName),
      phone: validateField('phone', phone),
      email: validateField('email', email),
      address: validateField('address', address),
      city: validateField('city', city),
      postalCode: validateField('postalCode', postalCode),
    }

    setTouched({
      recipientName: true,
      phone: true,
      email: true,
      address: true,
      city: true,
      postalCode: true,
    })
    setErrors(newErrors)

    return !Object.values(newErrors).some((err) => Boolean(err))
  }, [validateField, recipientName, phone, email, address, city, postalCode])

  const handleApplyPromoCode = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!promoInput.trim()) return
    setIsApplyingPromo(true)
    const res = applyPromo(promoInput)
    if (res.success) {
      toast.success(res.message)
      setPromoInput('')
    } else {
      toast.error(res.message)
    }
    setIsApplyingPromo(false)
  }, [promoInput, applyPromo])

  // Memoize formatted grand total to avoid repeated toLocaleString calls in render
  const formattedGrandTotal = useMemo(() => grandTotal.toLocaleString(), [grandTotal])

  const processOrderCreation = useCallback(() => {
    setIsSubmitting(true)

    try {
      const orderItems = cart.map((item, idx) => ({
        id: idx + 1,
        productId: item.productId,
        productName: item.name,
        unitPrice: item.price,
        quantity: item.quantity,
        color: item.color,
        material: item.material,
        lineTotal: item.price * item.quantity,
        imageUrl: item.imageUrl,
        customSpec: item.customSpec,
      }))

      const created = createOrder({
        userId: user?.id,
        recipientName: recipientName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        note: note.trim(),
        shippingMethod,
        paymentMethod,
        subtotal: cartSubtotal,
        discount: discountAmount,
        promoCode: appliedPromo || undefined,
        shippingFee,
        total: grandTotal,
        status: paymentMethod === 'cod' ? 'pending' : 'paid',
        paymentStatus: paymentMethod === 'cod' ? 'unpaid' : 'paid',
        items: orderItems,
      })

      toast.success(`สั่งซื้อสำเร็จ! หมายเลขคำสั่งซื้อ ${created.orderNumber}`, {
        description: 'ขอบพระคุณที่ไว้วางใจ Maison Forme เรากำลังจัดเตรียมสินค้าให้คุณ',
      })

      setShowPromptPayModal(false)
      router.push('/orders')
    } catch (err) {
      toast.error('เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ กรุณาลองใหม่อีกครั้ง')
      setIsSubmitting(false)
    }
  }, [cart, createOrder, user?.id, recipientName, phone, email, address, city, postalCode, note, shippingMethod, paymentMethod, cartSubtotal, discountAmount, appliedPromo, shippingFee, grandTotal, router])

  const handleSubmitOrder = useCallback((e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAll()) {
      toast.error('กรุณากรอกข้อมูลที่อยู่จัดส่งให้ถูกต้องครบถ้วน')
      return
    }

    if (cart.length === 0) {
      toast.error('ไม่มีสินค้าในตะกร้า')
      router.push('/products')
      return
    }

    // If PromptPay is selected, open the modal for user verification
    if (paymentMethod === 'promptpay') {
      setShowPromptPayModal(true)
      return
    }

    processOrderCreation()
  }, [validateAll, cart.length, paymentMethod, processOrderCreation, router])

  const copyToClipboard = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAccount(true)
    setTimeout(() => setCopiedAccount(false), 2200)
    toast.success(`คัดลอก${label}แล้ว: ${text}`)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/25 selection:text-foreground">
      <CapsuleNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        {/* Breadcrumb & Title */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground mb-2 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>ย้อนกลับไปตะกร้าสินค้า</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-heading text-balance leading-tight">
            สั่งซื้อสินค้า & จัดส่ง
          </h1>
        </nav>

        {cart.length === 0 ? (
          <div className="bg-card rounded-[32px] p-10 text-center border border-border clay-sm max-w-md mx-auto my-12">
            <h2 className="text-lg font-bold text-foreground mb-2 font-heading">ไม่มีสินค้าในตะกร้า</h2>
            <p className="text-xs text-muted-foreground mb-6">
              คุณยังไม่มีรายการเฟอร์นิเจอร์ที่จะชำระเงิน กรุณาเลือกสินค้าก่อนดำเนินการต่อ
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-foreground text-xs font-bold clay-sm hover:opacity-90 transition"
            >
              เลือกชมสินค้า
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20 lg:pb-0">
            {/* Left Column: Form Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Shipping Address */}
              <section aria-labelledby="shipping-heading" className="bg-card rounded-[32px] p-6 sm:p-8 border border-border clay space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <div className="w-7 h-7 rounded-full bg-primary text-foreground font-bold text-xs flex items-center justify-center clay-sm">
                    1
                  </div>
                  <h2 id="shipping-heading" className="font-bold text-lg text-foreground font-heading text-balance leading-snug">
                    ที่อยู่สำหรับจัดส่งเฟอร์นิเจอร์
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="recipient-name" className="block text-xs font-semibold text-foreground mb-1">
                      ชื่อ-นามสกุล ผู้รับ <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="recipient-name"
                        name="recipientName"
                        type="text"
                        autoComplete="name"
                        required
                        aria-required="true"
                        aria-invalid={touched.recipientName && !!errors.recipientName}
                        aria-describedby={errors.recipientName ? 'recipient-name-error' : undefined}
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        onBlur={(e) => handleBlur('recipientName', e.target.value)}
                        className={`w-full bg-background text-foreground caret-primary text-base sm:text-xs px-4 py-2.5 pr-10 rounded-2xl border transition-all outline-none focus:bg-card ${
                          touched.recipientName && errors.recipientName
                            ? 'border-rose-400 focus:ring-2 focus:ring-rose-300'
                            : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/40'
                        }`}
                      />
                      {touched.recipientName && !errors.recipientName && recipientName.trim() && (
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600">
                          <CheckCircle2 className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                    {touched.recipientName && errors.recipientName && (
                      <p id="recipient-name-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.recipientName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="recipient-phone" className="block text-xs font-semibold text-foreground mb-1">
                      เบอร์โทรศัพท์ติดต่อ <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="recipient-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        aria-required="true"
                        aria-invalid={touched.phone && !!errors.phone}
                        aria-describedby={errors.phone ? 'recipient-phone-error' : undefined}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={(e) => handleBlur('phone', e.target.value)}
                        className={`w-full bg-background text-foreground caret-primary text-base sm:text-xs px-4 py-2.5 pr-10 rounded-2xl border transition-all outline-none focus:bg-card ${
                          touched.phone && errors.phone
                            ? 'border-rose-400 focus:ring-2 focus:ring-rose-300'
                            : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/40'
                        }`}
                      />
                      {touched.phone && !errors.phone && phone.trim() && (
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600">
                          <CheckCircle2 className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                    {touched.phone && errors.phone && (
                      <p id="recipient-phone-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="recipient-email" className="block text-xs font-semibold text-foreground mb-1">
                    อีเมลสำหรับรับใบเสร็จและสถานะการผลิต
                  </label>
                  <div className="relative">
                    <input
                      id="recipient-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby={errors.email ? 'recipient-email-error' : undefined}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={(e) => handleBlur('email', e.target.value)}
                      className={`w-full bg-background text-foreground caret-primary text-base sm:text-xs px-4 py-2.5 pr-10 rounded-2xl border transition-colors outline-none focus:bg-card ${
                        touched.email && errors.email
                          ? 'border-rose-400 focus:ring-2 focus:ring-rose-300'
                          : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/40'
                      }`}
                    />
                    {touched.email && !errors.email && email.trim() && (
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  {touched.email && errors.email && (
                    <p id="recipient-email-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="shipping-address" className="block text-xs font-semibold text-foreground mb-1">
                    ที่อยู่จัดส่ง (บ้านเลขที่, อาคาร, หมู่บ้าน, ซอย, ถนน) <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="shipping-address"
                    name="address"
                    autoComplete="street-address"
                    required
                    aria-required="true"
                    rows={2}
                    aria-invalid={touched.address && !!errors.address}
                    aria-describedby={errors.address ? 'shipping-address-error' : undefined}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onBlur={(e) => handleBlur('address', e.target.value)}
                    className={`w-full bg-background text-foreground caret-primary text-base sm:text-xs px-4 py-2 rounded-2xl border transition-colors outline-none focus:bg-card ${
                      touched.address && errors.address
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-300'
                        : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/40'
                    }`}
                  />
                  {touched.address && errors.address && (
                    <p id="shipping-address-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.address}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="shipping-city" className="block text-xs font-semibold text-foreground mb-1">
                      จังหวัด / อำเภอ <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="shipping-city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        required
                        aria-required="true"
                        aria-invalid={touched.city && !!errors.city}
                        aria-describedby={errors.city ? 'shipping-city-error' : undefined}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onBlur={(e) => handleBlur('city', e.target.value)}
                        className={`w-full bg-background text-foreground caret-primary text-base sm:text-xs px-4 py-2.5 pr-10 rounded-2xl border transition-colors outline-none focus:bg-card ${
                          touched.city && errors.city
                            ? 'border-rose-400 focus:ring-2 focus:ring-rose-300'
                            : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/40'
                        }`}
                      />
                      {touched.city && !errors.city && city.trim() && (
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600">
                          <CheckCircle2 className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                    {touched.city && errors.city && (
                      <p id="shipping-city-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.city}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="shipping-postal" className="block text-xs font-semibold text-foreground mb-1">
                      รหัสไปรษณีย์ <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="shipping-postal"
                        name="postalCode"
                        type="text"
                        autoComplete="postal-code"
                        required
                        aria-required="true"
                        maxLength={5}
                        aria-invalid={touched.postalCode && !!errors.postalCode}
                        aria-describedby={errors.postalCode ? 'shipping-postal-error' : undefined}
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        onBlur={(e) => handleBlur('postalCode', e.target.value)}
                        className={`w-full bg-background text-foreground caret-primary text-base sm:text-xs px-4 py-2.5 pr-10 rounded-2xl border transition-colors outline-none focus:bg-card ${
                          touched.postalCode && errors.postalCode
                            ? 'border-rose-400 focus:ring-2 focus:ring-rose-300'
                            : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/40'
                        }`}
                      />
                      {touched.postalCode && !errors.postalCode && postalCode.trim() && (
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600">
                          <CheckCircle2 className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                    {touched.postalCode && errors.postalCode && (
                      <p id="shipping-postal-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.postalCode}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="shipping-note" className="block text-xs font-semibold text-foreground mb-1">
                    หมายเหตุสำหรับเจ้าหน้าที่จัดส่ง (เช่น ชั้นคอนโด, ลิฟต์, วันที่สะดวก)
                  </label>
                  <input
                    id="shipping-note"
                    name="note"
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="กรุณาโทรแจ้งก่อนส่ง 30 นาที"
                    className="w-full bg-background text-foreground text-base sm:text-xs px-4 py-2.5 rounded-2xl border border-border focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/40 outline-none transition"
                  />
                </div>
              </section>

              {/* 2. Shipping Method */}
              <fieldset className="bg-card rounded-[32px] p-6 sm:p-8 border border-border clay space-y-4">
                <legend className="flex items-center gap-2 pb-3 border-b border-border w-full">
                  <div className="w-7 h-7 rounded-full bg-accent text-foreground font-bold text-xs flex items-center justify-center clay-sm">
                    2
                  </div>
                  <span className="font-bold text-lg text-foreground font-heading text-balance leading-snug">
                    วิธีและบริการจัดส่ง
                  </span>
                </legend>

                <div className="space-y-3">
                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary ${
                      shippingMethod === 'standard'
                        ? 'bg-secondary/30 border-emerald-400 font-semibold shadow-sm'
                        : 'bg-background border-border hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          shippingMethod === 'standard'
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950'
                            : 'border-muted-foreground/40 bg-card'
                        }`}
                        aria-hidden="true"
                      >
                        {shippingMethod === 'standard' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-sm animate-in zoom-in-75 duration-150" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">จัดส่งมาตรฐาน (Standard Delivery)</div>
                        <div className="text-xs text-muted-foreground">ระยะเวลา 3–7 วันทำการ (ส่งฟรีเมื่อครบ ฿30,000)</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-foreground tabular-nums">
                      {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? (
                        <span className="text-emerald-700">ฟรี</span>
                      ) : (
                        '฿500'
                      )}
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary ${
                      shippingMethod === 'express'
                        ? 'bg-secondary/30 border-emerald-400 font-semibold shadow-sm'
                        : 'bg-background border-border hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          shippingMethod === 'express'
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950'
                            : 'border-muted-foreground/40 bg-card'
                        }`}
                        aria-hidden="true"
                      >
                        {shippingMethod === 'express' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-sm animate-in zoom-in-75 duration-150" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">
                          จัดส่งด่วนพร้อมประกอบและติดตั้ง (White-Glove Express)
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ระยะเวลา 1–3 วันทำการ ทีมช่างยกขึ้นห้องและประกอบให้พร้อมใช้งาน
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-foreground tabular-nums">฿1,200</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary ${
                      shippingMethod === 'pickup'
                        ? 'bg-secondary/30 border-emerald-400 font-semibold shadow-sm'
                        : 'bg-background border-border hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="pickup"
                        checked={shippingMethod === 'pickup'}
                        onChange={() => setShippingMethod('pickup')}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          shippingMethod === 'pickup'
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950'
                            : 'border-muted-foreground/40 bg-card'
                        }`}
                        aria-hidden="true"
                      >
                        {shippingMethod === 'pickup' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-sm animate-in zoom-in-75 duration-150" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">รับเองที่โชว์รูมทองหล่อ (Self Pickup)</div>
                        <div className="text-xs text-muted-foreground">โชว์รูมสุขุมวิท 55 เปิดทุกวัน 10:00 - 19:00 น.</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">ฟรี</span>
                  </label>
                </div>
              </fieldset>

              {/* 3. Payment Method */}
              <fieldset className="bg-card rounded-[32px] p-6 sm:p-8 border border-border clay space-y-4">
                <legend className="flex items-center gap-2 pb-3 border-b border-border w-full">
                  <div className="w-7 h-7 rounded-full bg-yellow text-amber-900 font-bold text-xs flex items-center justify-center clay-sm">
                    3
                  </div>
                  <span className="font-bold text-lg text-foreground font-heading text-balance leading-snug">
                    วิธีชำระเงิน
                  </span>
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary ${
                      paymentMethod === 'promptpay'
                        ? 'bg-accent/40 border-purple-400 font-semibold shadow-sm'
                        : 'bg-background border-border hover:bg-muted/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="promptpay"
                      checked={paymentMethod === 'promptpay'}
                      onChange={() => setPaymentMethod('promptpay')}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        paymentMethod === 'promptpay'
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-950'
                          : 'border-muted-foreground/40 bg-card'
                      }`}
                      aria-hidden="true"
                    >
                      {paymentMethod === 'promptpay' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600 shadow-sm animate-in zoom-in-75 duration-150" />
                      )}
                    </div>
                    <QrCode className="w-5 h-5 text-purple-700 shrink-0" />
                    <div className="text-xs">
                      <div className="font-bold text-foreground">PromptPay QR Code</div>
                      <div className="text-xs text-muted-foreground">สแกนชำระผ่านทุกแอปธนาคาร</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary ${
                      paymentMethod === 'credit_card'
                        ? 'bg-accent/40 border-purple-400 font-semibold shadow-sm'
                        : 'bg-background border-border hover:bg-muted/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={paymentMethod === 'credit_card'}
                      onChange={() => setPaymentMethod('credit_card')}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        paymentMethod === 'credit_card'
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-950'
                          : 'border-muted-foreground/40 bg-card'
                      }`}
                      aria-hidden="true"
                    >
                      {paymentMethod === 'credit_card' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600 shadow-sm animate-in zoom-in-75 duration-150" />
                      )}
                    </div>
                    <CreditCard className="w-5 h-5 text-purple-700 shrink-0" />
                    <div className="text-xs">
                      <div className="font-bold text-foreground">บัตรเครดิต / เดบิต</div>
                      <div className="text-xs text-muted-foreground">Visa, Mastercard, JCB</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary ${
                      paymentMethod === 'bank_transfer'
                        ? 'bg-accent/40 border-purple-400 font-semibold shadow-sm'
                        : 'bg-background border-border hover:bg-muted/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        paymentMethod === 'bank_transfer'
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-950'
                          : 'border-muted-foreground/40 bg-card'
                      }`}
                      aria-hidden="true"
                    >
                      {paymentMethod === 'bank_transfer' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600 shadow-sm animate-in zoom-in-75 duration-150" />
                      )}
                    </div>
                    <Building2 className="w-5 h-5 text-purple-700 shrink-0" />
                    <div className="text-xs">
                      <div className="font-bold text-foreground">โอนเงินธนาคาร</div>
                      <div className="text-xs text-muted-foreground">กสิกรไทย / ไทยพาณิชย์</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary ${
                      paymentMethod === 'cod'
                        ? 'bg-accent/40 border-purple-400 font-semibold shadow-sm'
                        : 'bg-background border-border hover:bg-muted/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-950'
                          : 'border-muted-foreground/40 bg-card'
                      }`}
                      aria-hidden="true"
                    >
                      {paymentMethod === 'cod' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600 shadow-sm animate-in zoom-in-75 duration-150" />
                      )}
                    </div>
                    <Banknote className="w-5 h-5 text-purple-700 shrink-0" />
                    <div className="text-xs">
                      <div className="font-bold text-foreground">เก็บเงินปลายทาง (COD)</div>
                      <div className="text-xs text-muted-foreground">ชำระเงินเมื่อได้รับสินค้า</div>
                    </div>
                  </label>
                </div>

                {/* Sub-form based on Payment Method */}
                {paymentMethod === 'credit_card' && <CreditCardForm />}

                {paymentMethod === 'bank_transfer' && (
                  <BankTransferForm copiedAccount={copiedAccount} onCopy={copyToClipboard} />
                )}
              </fieldset>
            </div>

            {/* Right Column: Order Summary & Place Order */}
            <div className="lg:col-span-5 bg-card rounded-[32px] p-6 sm:p-8 border border-border clay space-y-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold text-foreground pb-3 border-b border-border font-heading text-balance leading-snug">
                รายการสินค้าที่จะสั่งซื้อ ({cart.length})
              </h2>

              {/* Items List Mini */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1.5 [scrollbar-width:thin] [scrollbar-color:rgba(116,100,140,0.25)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border/60 hover:[&::-webkit-scrollbar-thumb]:bg-border">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-xs">
                    <div className="relative w-12 h-12 rounded-xl bg-background border border-border/50 overflow-hidden shrink-0 flex items-center justify-center">
                      <Image
                        src={item.imageUrl || '/images/placeholder.svg'}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-foreground truncate">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.color} | จำนวน: {item.quantity}
                      </div>
                    </div>
                    <div className="font-bold text-foreground shrink-0 tabular-nums">
                      ฿{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input in Checkout */}
              <div className="pt-2 border-t border-border">
                {appliedPromo ? (
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>
                        ใช้โค้ด <strong>{appliedPromo}</strong> (-฿{discountAmount.toLocaleString()})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removePromo}
                      className="text-xs text-muted-foreground hover:text-rose-600 transition"
                    >
                      ยกเลิก
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromoCode} className="space-y-1.5">
                    <label htmlFor="checkout-promo" className="block text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-primary" />
                      <span>โค้ดส่วนลด (Promo Code)</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="checkout-promo"
                        type="text"
                        placeholder="เช่น MAISON10"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="flex-1 bg-background text-foreground text-xs px-3.5 py-2 rounded-full border border-border focus:border-primary focus:bg-card outline-none uppercase"
                      />
                      <button
                        type="submit"
                        disabled={isApplyingPromo}
                        className="px-4 py-2 bg-foreground text-background text-xs font-bold rounded-full hover:opacity-90 transition disabled:opacity-50 shrink-0"
                      >
                        {isApplyingPromo ? 'กำลังตรวจ...' : 'ใช้โค้ด'}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Cost Calculation */}
              <div className="space-y-2.5 text-xs text-muted-foreground pt-3 border-t border-border">
                <div className="flex justify-between">
                  <span>ราคาสินค้ารวม (Subtotal)</span>
                  <span className="font-semibold text-foreground tabular-nums">฿{cartSubtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>ส่วนลดโปรโมชั่น ({appliedPromo})</span>
                    <span className="tabular-nums">-฿{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>ค่าบริการจัดส่ง</span>
                  <span className="font-semibold text-foreground tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">ฟรี</span>
                    ) : (
                      `฿${shippingFee.toLocaleString()}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-border flex justify-between items-baseline">
                  <span className="text-sm font-bold text-foreground">ยอดชำระสุทธิ</span>
                  <span className="text-3xl font-black text-foreground font-heading tabular-nums tracking-tight">
                    ฿{formattedGrandTotal}
                  </span>
                </div>
              </div>

              {/* Submit Button (Desktop) */}
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="w-full py-4 rounded-full bg-primary text-foreground font-bold text-sm clay-sm clay-press hover:opacity-90 active:scale-98 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>กำลังประมวลผลคำสั่งซื้อ...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {paymentMethod === 'promptpay'
                        ? `เปิด QR ชำระเงิน (฿${formattedGrandTotal})`
                        : `ยืนยันการสั่งซื้อ (฿${formattedGrandTotal})`}
                    </span>
                  </>
                )}
              </button>

              <div className="text-xs text-muted-foreground text-center space-y-1 text-pretty leading-relaxed">
                <div className="flex items-center justify-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>การสั่งซื้อปลอดภัยตามมาตรฐานความปลอดภัย SSL</span>
                </div>
                <div>สามารถแก้ไขแบบสั่งผลิตได้ภายใน 24 ชม. หลังจากยืนยันคำสั่งซื้อ</div>
              </div>
            </div>

            {/* Mobile Sticky Bottom Summary Dock with Safe Area */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-card/95 backdrop-blur-md border-t border-border px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(91,79,115,0.08)] z-40 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-muted-foreground">ยอดชำระสุทธิ</div>
                <div className="text-xl font-black text-foreground font-heading tabular-nums tracking-tight">
                  ฿{formattedGrandTotal}
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="min-h-[44px] px-6 py-2.5 rounded-full bg-primary text-foreground font-bold text-xs clay-sm hover:opacity-90 active:scale-98 transition flex items-center justify-center gap-1.5 disabled:opacity-50 shrink-0 touch-manipulation select-none"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Lock className="w-3.5 h-3.5" />
                )}
                <span>{paymentMethod === 'promptpay' ? 'เปิด QR ชำระ' : 'ยืนยันสั่งซื้อ'}</span>
              </button>
            </div>
          </form>
        )}
      </main>

      {/* PromptPay QR Interactive Payment Modal */}
      {showPromptPayModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="promptpay-title"
          className="fixed inset-0 z-50 bg-[#383139]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <div className="bg-card rounded-[32px] border border-border p-6 sm:p-8 max-w-sm w-full max-h-[85dvh] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(116,100,140,0.25)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border/60 clay space-y-5 text-center relative">
            <button
              type="button"
              onClick={() => setShowPromptPayModal(false)}
              className="absolute top-3 right-3 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition touch-manipulation focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="ปิดหน้าต่าง PromptPay"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 text-xs font-bold">
                <QrCode className="w-3.5 h-3.5" />
                <span>PromptPay QR</span>
              </div>
              <h3 id="promptpay-title" className="text-lg font-bold text-foreground font-heading">
                สแกนชำระเงิน
              </h3>
              <PromptPayCountdownBadge />
              <p className="text-xs text-muted-foreground pt-1">
                เปิดแอปธนาคารใดก็ได้เพื่อสแกน QR Code นี้
              </p>
            </div>

            {/* QR Visual */}
            <div className="bg-white p-4 rounded-2xl border border-border shadow-inner max-w-[220px] mx-auto flex flex-col items-center">
              <div className="w-full flex items-center justify-center bg-[#003D6B] py-1 px-3 rounded-lg text-white font-bold text-xs mb-2">
                พร้อมเพย์ PromptPay
              </div>
              {/* Synthetic Vector QR Code */}
              <div className="w-44 h-44 bg-neutral-900 p-2 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                  {/* Top-Left Finder */}
                  <rect x="5" y="5" width="28" height="28" fill="white" />
                  <rect x="9" y="9" width="20" height="20" fill="black" />
                  <rect x="13" y="13" width="12" height="12" fill="white" />
                  {/* Top-Right Finder */}
                  <rect x="67" y="5" width="28" height="28" fill="white" />
                  <rect x="71" y="9" width="20" height="20" fill="black" />
                  <rect x="75" y="13" width="12" height="12" fill="white" />
                  {/* Bottom-Left Finder */}
                  <rect x="5" y="67" width="28" height="28" fill="white" />
                  <rect x="9" y="71" width="20" height="20" fill="black" />
                  <rect x="13" y="75" width="12" height="12" fill="white" />
                  {/* Data Matrix Dots Mock */}
                  <rect x="38" y="10" width="6" height="6" />
                  <rect x="48" y="10" width="6" height="6" />
                  <rect x="58" y="10" width="6" height="6" />
                  <rect x="38" y="24" width="6" height="6" />
                  <rect x="48" y="32" width="6" height="6" />
                  <rect x="58" y="24" width="6" height="6" />
                  <rect x="10" y="38" width="6" height="6" />
                  <rect x="22" y="44" width="6" height="6" />
                  <rect x="38" y="48" width="8" height="8" />
                  <rect x="52" y="48" width="8" height="8" />
                  <rect x="70" y="38" width="6" height="6" />
                  <rect x="82" y="44" width="6" height="6" />
                  <rect x="38" y="65" width="6" height="6" />
                  <rect x="48" y="72" width="6" height="6" />
                  <rect x="58" y="65" width="6" height="6" />
                  <rect x="70" y="70" width="6" height="6" />
                  <rect x="82" y="80" width="6" height="6" />
                  <rect x="68" y="82" width="6" height="6" />
                </svg>
              </div>
              <div className="text-xs text-neutral-800 font-semibold mt-2">
                บจก. เมซง ฟอร์ม จำกัด
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">ยอดเงินที่ต้องชำระ</div>
              <div className="text-2xl font-black text-foreground font-heading">
                ฿{formattedGrandTotal}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={processOrderCreation}
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-primary text-foreground font-bold text-xs clay-sm hover:opacity-90 active:scale-98 transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                )}
                <span>ชำระเงินเรียบร้อยแล้ว (ยืนยันคำสั่งซื้อ)</span>
              </button>

              <button
                type="button"
                onClick={() => setShowPromptPayModal(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition block mx-auto"
              >
                เปลี่ยนวิธีชำระเงิน
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
