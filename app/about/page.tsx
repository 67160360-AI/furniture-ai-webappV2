'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CapsuleNavbar } from '@/components/capsule-navbar'
import { Footer } from '@/components/footer'
import { Sparkles, Heart, ShieldCheck, TreePine, Award, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F2FA]">
      <CapsuleNavbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 md:px-8 py-8 w-full space-y-12">
        
        {/* Hero Story Banner */}
        <div className="bg-[#FFFDF7] rounded-[48px] p-8 sm:p-14 border border-[#E5DFEB] shadow-[16px_24px_48px_rgba(91,79,115,0.08),-10px_-10px_28px_rgba(255,255,255,0.9)] text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6A3CA]/30 text-xs font-bold text-pink-900 mb-4">
            <Heart className="w-3.5 h-3.5 text-pink-600" />
            <span>Our Philosophy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#383139] tracking-tight mb-4 font-heading">
            เรื่องราวของ Maison Forme
          </h1>
          <p className="text-sm sm:text-base text-[#706A76] leading-relaxed max-w-2xl mx-auto">
            เราก่อตั้ง Maison Forme ขึ้นด้วยความเชื่อที่ว่า "เฟอร์นิเจอร์ที่ดีต้องทั้งนุ่มนวลต่อสายตา และแข็งแกร่งในการใช้งานจริง" 
            เราจึงผสานศิลปะ Claymorphism Pastel ที่มีเส้นสายโค้งมน เข้ากับเทคโนโลยี AI วิเคราะห์การผลิตระดับวิศวกรรม
          </p>
        </div>

        {/* Brand Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFDF7] p-8 rounded-[38px] border border-[#E5DFEB] shadow-sm text-center">
            <div className="w-14 h-14 rounded-3xl bg-[#C0EFDC] text-emerald-900 flex items-center justify-center mx-auto mb-4 text-2xl">
              <TreePine className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-[#383139] mb-2 font-heading">ไม้แท้จากป่าปลูกยั่งยืน</h3>
            <p className="text-xs text-[#706A76] leading-relaxed">
              เราคัดสรรเฉพาะไม้โอ๊ค ไม้แอช และไม้อัดเกรด E0 ที่ปล่อยสารฟอร์มาลดีไฮด์ต่ำ ปลอดภัยต่อสุขภาพของทุกคนในบ้าน
            </p>
          </div>

          <div className="bg-[#FFFDF7] p-8 rounded-[38px] border border-[#E5DFEB] shadow-sm text-center">
            <div className="w-14 h-14 rounded-3xl bg-[#DED0F9] text-purple-900 flex items-center justify-center mx-auto mb-4 text-2xl">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-[#383139] mb-2 font-heading">AI Production Engine</h3>
            <p className="text-xs text-[#706A76] leading-relaxed">
              ระบบอัลกอริทึม 2D Cutting Optimization ช่วยลดเศษไม้เหลือทิ้งให้เหลือน้อยกว่า 10% ประหยัดทรัพยากรและต้นทุนจริง
            </p>
          </div>

          <div className="bg-[#FFFDF7] p-8 rounded-[38px] border border-[#E5DFEB] shadow-sm text-center">
            <div className="w-14 h-14 rounded-3xl bg-[#F9E7A8] text-amber-900 flex items-center justify-center mx-auto mb-4 text-2xl">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-[#383139] mb-2 font-heading">รับประกันโครงสร้าง 10 ปี</h3>
            <p className="text-xs text-[#706A76] leading-relaxed">
              เรามั่นใจในคุณภาพการเข้าเดือยและโครงสร้างเฟอร์นิเจอร์ทุกชิ้น จึงมอบการรับประกันพร้อมช่างดูแลตลอดอายุการใช้งาน
            </p>
          </div>
        </div>

        {/* Workshop & Craftsmanship */}
        <div className="bg-gradient-to-r from-[#DED0F9]/30 to-[#C0EFDC]/30 rounded-[44px] p-8 sm:p-12 border border-[#E5DFEB] flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#383139] font-heading">
              สตูดิโอและโรงงานช่างไม้ Maison Forme
            </h2>
            <p className="text-xs sm:text-sm text-[#706A76] leading-relaxed">
              โรงงานช่างไม้ของเราตั้งอยู่ชานเมืองกรุงเทพฯ พร้อมเครื่องตัด CNC ความแม่นยำสูง และช่างไม้ฝีมือดีที่มีประสบการณ์กว่า 25 ปี 
              ทุกชิ้นงานผ่านการขัดแต่งขอบมนด้วยมืออย่างประณีต เพื่อให้สัมผัสเรียบเนียน ปราศจากมุมคมที่เป็นอันตราย
            </p>
            <div>
              <Link
                href="/products"
                className="inline-block px-6 py-3 rounded-full bg-[#383139] hover:bg-black text-white text-xs font-bold transition"
              >
                เลือกชมผลงานของเรา
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
