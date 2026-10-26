'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CapsuleNavbar } from '@/components/capsule-navbar'
import { Footer } from '@/components/footer'
import { useStore } from '@/components/store-context'
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  Truck,
  Sparkles,
  Tag,
  CheckCircle2,
  ChevronLeft,
} from 'lucide-react'
import { toast } from 'sonner'

export default function CartPage() {
  const router = useRouter()
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    clearCart,
    appliedPromo,
    discountAmount,
    applyPromo,
    removePromo,
  } = useStore()
  const [promoCode, setPromoCode] = useState('')

  const FREE_SHIPPING_THRESHOLD = 30000
  const STANDARD_SHIPPING_FEE = 500

  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal)
  const shippingProgress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100))

  const shippingFee = cartSubtotal > 0 ? (isFreeShipping ? 0 : STANDARD_SHIPPING_FEE) : 0
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee)

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!promoCode.trim()) return

    const res = applyPromo(promoCode)
    if (res.success) {
      toast.success(res.message)
      setPromoCode('')
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/25 selection:text-foreground">
      <CapsuleNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        
        {/* Page Title */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-heading">
              ตะกร้าสินค้าของคุณ
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              ตรวจสอบรายการสินค้า คำนวณค่าจัดส่ง และยืนยันคำสั่งซื้อ
            </p>
          </div>

          {cart.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>ล้างตะกร้าทั้งหมด</span>
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-card rounded-[44px] p-8 sm:p-12 text-center border border-border clay max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-foreground flex items-center justify-center mx-auto mb-4 clay-sm">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2 font-heading">
              ไม่มีสินค้าในตะกร้า
            </h2>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              คุณยังไม่ได้เลือกเฟอร์นิเจอร์ลงตะกร้า เลือกชมสินค้าที่ออกแบบอย่างประณีต หรือลองให้ AI ช่วยออกแบบพื้นที่ได้เลย
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/products"
                className="px-6 py-3 rounded-full bg-primary text-foreground font-bold text-xs clay-sm clay-press hover:opacity-90 transition"
              >
                เลือกชมเฟอร์นิเจอร์
              </Link>
              <Link
                href="/furniture-designer"
                className="px-6 py-3 rounded-full bg-accent text-foreground font-bold text-xs clay-sm clay-press hover:opacity-90 transition"
              >
                คำนวณแบบสั่งทำด้วย AI
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Table & Order Summary Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20 lg:pb-0">
            
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Progress Strip */}
              <div className="bg-card rounded-3xl p-4 sm:p-5 border border-border clay-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs font-semibold mb-2">
                  <div className="flex items-center gap-1.5 text-foreground min-w-0">
                    <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate sm:overflow-visible sm:whitespace-normal">
                      {isFreeShipping ? (
                        <strong className="text-emerald-700 dark:text-emerald-400">ยินดีด้วย! คุณได้รับสิทธิ์จัดส่งฟรีทั่วประเทศ</strong>
                      ) : (
                        <>ซื้อเพิ่มอีก <strong className="text-foreground underline decoration-primary decoration-2">฿{remainingForFreeShipping.toLocaleString()}</strong> เพื่อรับสิทธิ์ส่งฟรี!</>
                      )}
                    </span>
                  </div>
                  <span className="text-muted-foreground font-medium tabular-nums self-end sm:self-auto shrink-0">{shippingProgress}%</span>
                </div>
                <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card rounded-[32px] p-4 sm:p-5 border border-border clay flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-6 transition-all"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 flex-1 min-w-0">
                      {/* Item Image */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-background border border-border/50 overflow-hidden shrink-0 flex items-center justify-center p-2">
                        <Image
                          src={item.imageUrl || '/images/placeholder.svg'}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 80px, 96px"
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 text-left">
                        <h3 className="font-bold text-sm sm:text-base text-foreground font-heading truncate">
                          {item.name}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                          {item.color && (
                            <span className="bg-background px-2.5 py-0.5 rounded-full border border-border/60">
                              สี: {item.color}
                            </span>
                          )}
                          {item.material && (
                            <span className="bg-background px-2.5 py-0.5 rounded-full border border-border/60">
                              วัสดุ: {item.material}
                            </span>
                          )}
                          {item.customSpec && (
                            <span className="bg-accent/60 text-foreground font-bold px-2.5 py-0.5 rounded-full border border-purple-200/50 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-purple-700 shrink-0" />
                              <span>AI Custom ({item.customSpec.width}×{item.customSpec.depth}×{item.customSpec.height} cm)</span>
                            </span>
                          )}
                        </div>

                        <div className="text-sm font-bold text-foreground mt-1.5 tabular-nums">
                          ฿{item.price.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">/ ชิ้น</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper & Actions */}
                    <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-border/40">
                      
                      <div className="flex items-center bg-muted/60 rounded-full p-1 border border-border">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-card text-foreground font-bold text-sm flex items-center justify-center hover:bg-muted active:scale-95 transition clay-sm touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          aria-label={`ลดจำนวน ${item.name}`}
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-xs text-foreground tabular-nums select-none" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-card text-foreground font-bold text-sm flex items-center justify-center hover:bg-muted active:scale-95 transition clay-sm touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          aria-label={`เพิ่มจำนวน ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-right sm:w-24">
                        <div className="font-extrabold text-base text-foreground font-heading tabular-nums">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-muted-foreground hover:text-rose-600 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/40 transition touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                        title="ลบรายการนี้"
                        aria-label={`ลบรายการ ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />
                      </button>

                    </div>

                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full px-2 py-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>เลือกชมสินค้าเพิ่มเติม</span>
                </Link>
              </div>

            </div>

            {/* Right: Order Summary Card */}
            <div className="lg:col-span-4 bg-card rounded-[38px] p-6 sm:p-7 border border-border clay space-y-6 lg:sticky lg:top-24">
              
              <h2 className="text-xl font-bold text-foreground pb-3 border-b border-border font-heading">
                สรุปคำสั่งซื้อ
              </h2>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label htmlFor="cart-promo-input" className="block text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-primary" />
                  <span>โค้ดส่วนลด (Promo Code):</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="cart-promo-input"
                    type="text"
                    placeholder="พิมพ์ MAISON10"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-background text-foreground text-base sm:text-xs px-3.5 py-2.5 rounded-full border border-border focus:border-primary focus:bg-card outline-none uppercase transition"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-foreground text-background text-xs font-bold rounded-full hover:opacity-90 transition shrink-0 active:scale-95"
                  >
                    ใช้โค้ด
                  </button>
                </div>
                {appliedPromo && (
                  <div className="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-full flex items-center justify-between font-medium">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>ใช้โค้ด <strong>{appliedPromo}</strong> (-฿{discountAmount.toLocaleString()})</span>
                    </div>
                    <button
                      type="button"
                      onClick={removePromo}
                      className="text-xs text-muted-foreground hover:text-rose-600 transition"
                      title="ยกเลิกโค้ดส่วนลด"
                      aria-label="ยกเลิกโค้ดส่วนลด"
                    >
                      ยกเลิก
                    </button>
                  </div>
                )}
              </form>

              {/* Totals Breakdown */}
              <div className="space-y-3 text-xs text-muted-foreground pt-2 border-t border-border">
                <div className="flex justify-between">
                  <span>ยอดรวมสินค้า (Subtotal)</span>
                  <span className="font-semibold text-foreground tabular-nums">฿{cartSubtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>ส่วนลดโปรโมชั่น</span>
                    <span className="tabular-nums">-฿{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>ค่าจัดส่ง</span>
                  <span className="font-semibold text-foreground tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">ส่งฟรี</span>
                    ) : (
                      `฿${shippingFee.toLocaleString()}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-border flex justify-between items-baseline">
                  <span className="text-sm font-bold text-foreground">ยอดชำระสุทธิ</span>
                  <span className="text-2xl sm:text-3xl font-black text-foreground font-heading tabular-nums tracking-tight">
                    ฿{finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => router.push('/checkout')}
                className="w-full py-4 rounded-full bg-primary text-foreground font-bold text-sm clay-sm clay-press hover:opacity-90 active:scale-98 transition flex items-center justify-center gap-2"
              >
                <span>ดำเนินการสั่งซื้อ (Checkout)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-xs text-muted-foreground text-center space-y-1">
                <div>* มีบริการประกอบติดตั้งและเก็บขยะบรรจุภัณฑ์</div>
                <div>* รองรับการชำระผ่าน PromptPay QR, บัตรเครดิต, และเก็บเงินปลายทาง</div>
              </div>

            </div>

            {/* Mobile Sticky Bottom Summary Dock with Safe Area */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-card/95 backdrop-blur-md border-t border-border px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(91,79,115,0.08)] z-40 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-muted-foreground">ยอดชำระสุทธิ</div>
                <div className="text-xl font-black text-foreground font-heading tabular-nums tracking-tight">
                  ฿{finalTotal.toLocaleString()}
                </div>
              </div>
              <button
                type="button"
                onClick={() => router.push('/checkout')}
                className="min-h-[44px] px-6 py-2.5 rounded-full bg-primary text-foreground font-bold text-xs clay-sm hover:opacity-90 active:scale-98 transition flex items-center justify-center gap-1.5 shrink-0 touch-manipulation select-none"
              >
                <span>สั่งซื้อสินค้า</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}
