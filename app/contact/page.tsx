'use client'

import React, { useState } from 'react'
import { CapsuleNavbar } from '@/components/capsule-navbar'
import { Footer } from '@/components/footer'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone || !message) {
      toast.error('กรุณากรอกข้อมูลและข้อความที่ต้องการติดต่อ')
      return
    }

    setSubmitted(true)
    toast.success('ส่งข้อความเรียบร้อยแล้ว ทีมงานจะติดต่อกลับภายใน 24 ชม.')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F2FA]">
      <CapsuleNavbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 md:px-8 py-8 w-full">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5E5FB]/50 text-xs font-bold text-blue-950 mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Showroom & Customer Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#383139] tracking-tight font-heading">
            ติดต่อ Maison Forme
          </h1>
          <p className="text-sm text-[#706A76] mt-2">
            แวะสัมผัสเฟอร์นิเจอร์จริงที่โชว์รูม หรือส่งข้อความปรึกษาเรื่องการออกแบบกับเราได้ทันที
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Showroom & Contact Details */}
          <div className="md:col-span-5 bg-[#FFFDF7] rounded-[40px] p-8 border border-[#E5DFEB] shadow-[12px_16px_36px_rgba(91,79,115,0.06)] space-y-6">
            <h2 className="text-xl font-bold text-[#383139] pb-3 border-b border-[#E5DFEB] font-heading">
              โชว์รูมและสำนักงานใหญ่
            </h2>

            <div className="space-y-4 text-xs text-[#706A76]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F6A3CA] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#383139] block text-sm">Maison Forme Thonglor</strong>
                  <span>99/55 ซอยสุขุมวิท 55 (ทองหล่อ ซอย 13), แขวงคลองตันเหนือ, เขตวัฒนา, กรุงเทพฯ 10110</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#F6A3CA] shrink-0" />
                <div>
                  <strong className="text-[#383139] block">เวลาทำการ:</strong>
                  <span>เปิดบริการทุกวัน 10:00 - 19:00 น. (มีที่จอดรถ)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F6A3CA] shrink-0" />
                <div>
                  <strong className="text-[#383139] block">เบอร์โทรศัพท์:</strong>
                  <span>02-000-0000 / 089-123-4567</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#F6A3CA] shrink-0" />
                <div>
                  <strong className="text-[#383139] block">อีเมลและ LINE:</strong>
                  <span>hello@maisonforme.co (LINE: @maisonforme)</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-[#F1F2FA] border border-[#E5DFEB] text-center">
                <div className="font-bold text-xs text-[#383139] mb-1">ต้องการนัดพบ Interior Designer?</div>
                <div className="text-[11px] text-[#706A76]">สามารถโทรนัดล่วงหน้าเพื่อจัดเตรียมแบบตัวอย่างวัสดุไม้และผ้าบูเคล่ได้ฟรี</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7 bg-[#FFFDF7] rounded-[40px] p-8 border border-[#E5DFEB] shadow-[12px_16px_36px_rgba(91,79,115,0.06)] space-y-4">
            <h2 className="text-xl font-bold text-[#383139] pb-3 border-b border-[#E5DFEB] font-heading">
              ส่งข้อความสอบถาม
            </h2>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-3xl border border-emerald-200 text-emerald-900 space-y-2">
                <div className="text-3xl">✅</div>
                <h3 className="font-bold text-base">ขอบคุณสำหรับข้อความ!</h3>
                <p className="text-xs">
                  ทีมงานผู้เชี่ยวชาญของ Maison Forme ได้รับข้อความแล้ว และจะติดต่อกลับไปยังเบอร์โทรศัพท์ของคุณโดยเร็วที่สุด
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 rounded-full bg-emerald-700 text-white text-xs font-bold"
                >
                  ส่งข้อความอื่นเพิ่มเติม
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#383139] mb-1">
                    ชื่อ-นามสกุล *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น คุณกานดา สุขสมบูรณ์"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#383139] mb-1">
                      เบอร์โทรศัพท์ *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="08x-xxx-xxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#383139] mb-1">
                      อีเมล (Email)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#383139] mb-1">
                    ข้อความที่ต้องการสอบถาม หรือรายละเอียดห้อง *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="เช่น สนใจสั่งผลิตตู้เก็บของขนาด 150 ซม. อยากทราบระยะเวลาและขอตัวอย่างสีไม้..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#F6A3CA] hover:bg-[#f08bb9] text-white font-bold text-sm shadow-[6px_8px_20px_rgba(246,163,202,0.4)] active:scale-98 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>ส่งข้อความถึงทีมงาน</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  )
}
