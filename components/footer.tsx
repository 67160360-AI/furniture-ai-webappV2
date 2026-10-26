import React from 'react'
import Link from 'next/link'
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[#E5DFEB] bg-[#FFFDF7]/80 backdrop-blur-sm pt-14 pb-10 text-[#383139]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Value Assurances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-[#E5DFEB]">
          <div className="flex items-center gap-4 p-4 rounded-3xl bg-[#F1F2FA]/70 border border-[#E5DFEB] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),4px_6px_16px_rgba(91,79,115,0.04)]">
            <div className="w-12 h-12 rounded-2xl bg-[#C0EFDC] flex items-center justify-center shrink-0 shadow-sm text-emerald-800">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#383139]">ส่งฟรีทั่วกรุงเทพฯ</h4>
              <p className="text-xs text-[#706A76]">เมื่อสั่งซื้อครบ ฿30,000 พร้อมบริการยกประกอบ</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-3xl bg-[#F1F2FA]/70 border border-[#E5DFEB] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),4px_6px_16px_rgba(91,79,115,0.04)]">
            <div className="w-12 h-12 rounded-2xl bg-[#DED0F9] flex items-center justify-center shrink-0 shadow-sm text-purple-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#383139]">รับประกันโครงสร้าง 10 ปี</h4>
              <p className="text-xs text-[#706A76]">ผลิตจากไม้แท้และวัสดุเกรดพรีเมียมตามมาตรฐานสากล</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-3xl bg-[#F1F2FA]/70 border border-[#E5DFEB] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),4px_6px_16px_rgba(91,79,115,0.04)]">
            <div className="w-12 h-12 rounded-2xl bg-[#F9E7A8] flex items-center justify-center shrink-0 shadow-sm text-amber-800">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#383139]">AI Production Calculation</h4>
              <p className="text-xs text-[#706A76]">คำนวณชิ้นส่วนและวางแผนตัดวัสดุล่วงหน้า ไร้เศษเหลือทิ้ง</p>
            </div>
          </div>
        </div>

        {/* Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F6A3CA] to-[#DED0F9] flex items-center justify-center text-white font-bold text-base shadow-sm">
                M
              </div>
              <span className="font-bold text-2xl tracking-tight text-[#383139] font-heading">
                Maison <span className="text-[#F6A3CA]">Forme</span>
              </span>
            </div>
            <p className="text-sm text-[#706A76] max-w-sm leading-relaxed">
              เฟอร์นิเจอร์สไตล์ Claymorphism Pastel ที่ออกแบบมาเพื่อยกระดับพื้นที่อยู่อาศัย 
              ผสานเทคโนโลยี AI วิเคราะห์การผลิตจริง สวยงาม อบอุ่น และสั่งตัดได้ตามขนาดพื้นที่ของคุณ
            </p>
            <div className="pt-2 text-xs text-[#706A76] space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F6A3CA]" />
                <span>โชว์รูมทองหล่อ สุขุมวิท 55, กรุงเทพฯ 10110</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F6A3CA]" />
                <span>02-000-0000 / 089-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F6A3CA]" />
                <span>hello@maisonforme.co (LINE: @maisonforme)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-[#383139]">เลือกชมสินค้า</h4>
            <ul className="space-y-2.5 text-xs text-[#706A76]">
              <li><Link href="/products?category=sofas" className="hover:text-[#F6A3CA] transition">โซฟาและอาร์มแชร์</Link></li>
              <li><Link href="/products?category=desks" className="hover:text-[#F6A3CA] transition">โต๊ะทำงาน</Link></li>
              <li><Link href="/products?category=dining-tables" className="hover:text-[#F6A3CA] transition">โต๊ะรับประทานอาหาร</Link></li>
              <li><Link href="/products?category=chairs" className="hover:text-[#F6A3CA] transition">เก้าอี้</Link></li>
              <li><Link href="/products?category=bedroom" className="hover:text-[#F6A3CA] transition">เตียงและห้องนอน</Link></li>
              <li><Link href="/products?category=storage" className="hover:text-[#F6A3CA] transition">ตู้และชั้นวางของ</Link></li>
            </ul>
          </div>

          {/* AI & Services */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-[#383139]">บริการและ AI</h4>
            <ul className="space-y-2.5 text-xs text-[#706A76]">
              <li>
                <Link href="/furniture-designer" className="hover:text-[#F6A3CA] flex items-center gap-1.5 transition">
                  <Sparkles className="w-3.5 h-3.5 text-[#F6A3CA]" />
                  <span>AI Production Solver</span>
                </Link>
              </li>
              <li><Link href="/services" className="hover:text-[#F6A3CA] transition">ออกแบบเฟอร์นิเจอร์สั่งทำ</Link></li>
              <li><Link href="/services" className="hover:text-[#F6A3CA] transition">วัดพื้นที่หน้างานฟรี</Link></li>
              <li><Link href="/promo" className="hover:text-[#F6A3CA] transition">โปรโมชั่นและดีลพิเศษ</Link></li>
              <li><Link href="/orders" className="hover:text-[#F6A3CA] transition">ติดตามสถานะคำสั่งซื้อ</Link></li>
            </ul>
          </div>

          {/* About & Policies */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-[#383139]">ข้อมูลบริษัท</h4>
            <ul className="space-y-2.5 text-xs text-[#706A76]">
              <li><Link href="/about" className="hover:text-[#F6A3CA] transition">เกี่ยวกับ Maison Forme</Link></li>
              <li><Link href="/contact" className="hover:text-[#F6A3CA] transition">ติดต่อเรา / แผนที่โชว์รูม</Link></li>
              <li><Link href="/about" className="hover:text-[#F6A3CA] transition">มาตรฐานความยั่งยืนของไม้</Link></li>
              <li><Link href="/contact" className="hover:text-[#F6A3CA] transition">นโยบายความเป็นส่วนตัว</Link></li>
              <li><Link href="/admin" className="hover:text-purple-600 transition font-medium">เข้าสู่ระบบแอดมิน</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E5DFEB] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#706A76]">
          <p>© 2026 Maison Forme Co., Ltd. สงวนลิขสิทธิ์ทั้งหมด ขับเคลื่อนด้วย AI Calculation Engine</p>
          <div className="flex gap-4">
            <span>เงื่อนไขการให้บริการ</span>
            <span>นโยบายความเป็นส่วนตัว</span>
            <span>Cookies</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
