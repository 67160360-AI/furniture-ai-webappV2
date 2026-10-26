'use client'

import React from 'react'
import Link from 'next/link'
import { CapsuleNavbar } from '@/components/capsule-navbar'
import { Footer } from '@/components/footer'
import { Tag, Sparkles, Copy, CheckCircle2, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export default function PromoPage() {
  const promos = [
    {
      code: 'MAISON10',
      title: 'ส่วนลด 10% สำหรับทุกคำสั่งซื้อ',
      desc: 'ไม่มีขั้นต่ำ ใช้ได้กับเฟอร์นิเจอร์ทุกชิ้นในร้าน รวมถึงเฟอร์นิเจอร์สั่งทำผ่านระบบ AI',
      expiry: '31 ธันวาคม 2026',
      badge: 'HOT DEAL',
      color: 'bg-[#F6A3CA]/20 border-[#F6A3CA] text-pink-900',
    },
    {
      code: 'FREESHIP',
      title: 'ส่งฟรีทั่วกรุงเทพฯ และปริมณฑล',
      desc: 'เมื่อสั่งซื้อสินค้าครบ ฿30,000 ระบบคำนวณและลดค่าจัดส่งให้อัตโนมัติทันที',
      expiry: 'ใช้ได้ตลอดทั้งปี',
      badge: 'AUTOMATIC',
      color: 'bg-[#C0EFDC]/30 border-[#C0EFDC] text-emerald-900',
    },
    {
      code: 'VIP500',
      title: 'คูปองเงินสด ฿500 สำหรับลูกค้าใหม่',
      desc: 'เมื่อสมัครสมาชิกและสั่งซื้อครั้งแรก เพียงกรอกโค้ดในหน้าตะกร้าสินค้า',
      expiry: 'สำหรับสมาชิกใหม่',
      badge: 'NEW MEMBER',
      color: 'bg-[#DED0F9]/30 border-[#DED0F9] text-purple-900',
    },
  ]

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success(`คัดลอกโค้ด "${code}" แล้ว!`, {
      description: 'นำไปใส่ในช่องโค้ดส่วนลดที่หน้าตะกร้าสินค้าเพื่อรับส่วนลด',
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F2FA]">
      <CapsuleNavbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 md:px-8 py-8 w-full">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6A3CA]/30 text-xs font-bold text-pink-950 mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Special Offers & Coupons</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#383139] tracking-tight font-heading">
            โปรโมชั่นและสิทธิพิเศษ
          </h1>
          <p className="text-sm text-[#706A76] mt-2 leading-relaxed">
            เลือกรับคูปองส่วนลดพิเศษเพื่อนำไปใช้ในหน้าชำระเงิน หรือส่งต่อความคุ้มค่าให้คนที่คุณรัก
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-[36px] p-6 border ${p.color} bg-[#FFFDF7] shadow-[12px_16px_32px_rgba(91,79,115,0.06)] flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white shadow-xs">
                    {p.badge}
                  </span>
                  <span className="text-[11px] text-[#706A76]">{p.expiry}</span>
                </div>

                <h3 className="font-bold text-base text-[#383139] mb-2 font-heading">
                  {p.title}
                </h3>
                <p className="text-xs text-[#706A76] mb-6 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DFEB]/60">
                <div className="bg-[#F1F2FA] p-2.5 rounded-2xl flex items-center justify-between">
                  <span className="font-mono font-bold text-sm tracking-wider text-[#383139]">
                    {p.code}
                  </span>
                  <button
                    onClick={() => handleCopyCode(p.code)}
                    className="p-1.5 rounded-xl bg-white hover:bg-gray-100 text-[#383139] shadow-xs active:scale-95 transition"
                    title="คัดลอกโค้ด"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#DED0F9]/50 via-[#FFFDF7] to-[#C0EFDC]/50 rounded-[40px] p-8 text-center border border-[#E5DFEB] shadow-sm">
          <h2 className="text-2xl font-bold text-[#383139] mb-2 font-heading">
            สั่งซื้อเฟอร์นิเจอร์พร้อมใช้ส่วนลดวันนี้
          </h2>
          <p className="text-xs sm:text-sm text-[#706A76] max-w-md mx-auto mb-6">
            เลือกชมสินค้าดีไซน์ Claymorphism พรีเมียม หรือส่งมิติห้องให้ AI ช่วยคำนวณการผลิต
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/products"
              className="px-6 py-3 rounded-full bg-[#F6A3CA] hover:bg-[#f08bb9] text-white text-xs font-bold shadow-sm transition"
            >
              ไปยังหน้ารวมสินค้า
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
