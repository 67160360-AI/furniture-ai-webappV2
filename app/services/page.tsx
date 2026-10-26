'use client'

import React from 'react'
import Link from 'next/link'
import { CapsuleNavbar } from '@/components/capsule-navbar'
import { Footer } from '@/components/footer'
import {
  Sparkles,
  Ruler,
  Truck,
  Wrench,
  Building,
  CheckCircle2,
  ArrowRight,
  Shield,
} from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      icon: Sparkles,
      title: 'AI Custom Furniture Design & Solving',
      desc: 'ระบบช่วยออกแบบ ปรับขนาด ถอดแบบชิ้นส่วน BOM และคำนวณการตัดแผ่นไม้อัตโนมัติ เพื่อให้ได้เฟอร์นิเจอร์ที่ลงตัวกับพื้นที่และงบประมาณของคุณมากที่สุด',
      badge: 'Exclusive AI',
      color: 'from-[#DED0F9]/50 to-[#C0EFDC]/40 text-purple-900 border-[#DED0F9]',
      action: 'ทดลองใช้งาน AI Designer',
      href: '/furniture-designer',
    },
    {
      icon: Ruler,
      title: 'บริการวัดพื้นที่และให้คำปรึกษาถึงบ้าน (On-site Measuring)',
      desc: 'ทีมอินทีเรียร์และช่างผู้เชี่ยวชาญเข้าสำรวจหน้างานจริง วัดมิติห้องอย่างแม่นยำด้วยเลเซอร์ พร้อมให้คำแนะนำเรื่องการเลือกคู่สีและวัสดุ',
      badge: 'Free in BKK',
      color: 'from-[#C0EFDC]/50 to-[#FFFDF7] text-emerald-900 border-[#C0EFDC]',
      action: 'นัดหมายวัดพื้นที่',
      href: '/contact',
    },
    {
      icon: Truck,
      title: 'บริการจัดส่งและยกประกอบระดับพรีเมียม (White-Glove Delivery)',
      desc: 'ทีมงานมืออาชีพขนส่งด้วยรถปิดมิดชิด ป้องกันรอยขีดข่วน ยกขึ้นห้องและประกอบติดตั้งตามตำแหน่งที่ต้องการ พร้อมเก็บกวาดบรรจุภัณฑ์เรียบร้อย',
      badge: 'Guaranteed Care',
      color: 'from-[#F6A3CA]/30 to-[#FFFDF7] text-pink-900 border-[#F6A3CA]/50',
      action: 'ดูเงื่อนไขการส่ง',
      href: '/contact',
    },
    {
      icon: Wrench,
      title: 'บริการดูแล ซ่อมบำรุง และเปลี่ยนผ้าหุ้ม (Care & Restoration)',
      desc: 'บริการทำความสะอาดผ้าบูเคล่ หนังแท้ เคลือบออยล์ไม้ธรรมชาติ และซ่อมแซมรางลิ้นชัก บานพับตลอดอายุการใช้งาน 10 ปี',
      badge: '10-Year Warranty',
      color: 'from-[#F9E7A8]/40 to-[#FFFDF7] text-amber-900 border-[#F9E7A8]/60',
      action: 'สอบถามบริการซ่อมบำรุง',
      href: '/contact',
    },
    {
      icon: Building,
      title: 'เฟอร์นิเจอร์สำหรับโครงการและองค์กร (B2B & Commercial)',
      desc: 'รับผลิตเฟอร์นิเจอร์สำหรับคอนโดมิเนียม ออฟฟิศ คาเฟ่ โรงแรม พร้อมส่วนลดพิเศษตามปริมาณและการวางแผนกำลังผลิตล่วงหน้า',
      badge: 'Bulk Discount',
      color: 'from-[#C5E5FB]/50 to-[#FFFDF7] text-blue-900 border-[#C5E5FB]',
      action: 'ขอใบเสนอราคาโครงการ',
      href: '/contact',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F2FA]">
      <CapsuleNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DED0F9]/50 text-xs font-bold text-purple-900 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maison Forme Comprehensive Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#383139] tracking-tight font-heading">
            บริการครบวงจรเพื่อพื้นที่ในฝัน
          </h1>
          <p className="text-sm text-[#706A76] mt-2 leading-relaxed">
            ตั้งแต่การใช้ AI วิเคราะห์และคำนวณการผลิต การวัดพื้นที่หน้างาน การผลิตตามสั่ง 
            ไปจนถึงการประกอบติดตั้งและการรับประกันโครงสร้างยาวนานถึง 10 ปี
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon
            return (
              <div
                key={idx}
                className={`bg-gradient-to-b ${s.color} p-8 rounded-[40px] border shadow-[12px_16px_36px_rgba(91,79,115,0.06),-8px_-8px_20px_rgba(255,255,255,0.9)] flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#383139]" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/80 shadow-xs">
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#383139] mb-3 font-heading">
                    {s.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#706A76] leading-relaxed mb-6">
                    {s.desc}
                  </p>
                </div>

                <div>
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#383139] hover:text-[#F6A3CA] transition group"
                  >
                    <span>{s.action}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

      </main>

      <Footer />
    </div>
  )
}
