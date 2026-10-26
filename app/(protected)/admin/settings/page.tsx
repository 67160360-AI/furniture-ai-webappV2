'use client'

import React, { useState } from 'react'
import { Settings, Save, Store, Truck, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState('Maison Forme')
  const [tagline, setTagline] = useState('เฟอร์นิเจอร์ที่ออกแบบมาเพื่อพื้นที่ของคุณ')
  const [phone, setPhone] = useState('02-000-0000 / 089-123-4567')
  const [email, setEmail] = useState('hello@maisonforme.co')
  const [address, setAddress] = useState('99/55 ซอยสุขุมวิท 55 ทองหล่อ ซอย 13 กรุงเทพฯ 10110')
  const [lineId, setLineId] = useState('@maisonforme')

  const [standardFee, setStandardFee] = useState(500)
  const [expressFee, setExpressFee] = useState(1200)
  const [freeThreshold, setFreeThreshold] = useState(30000)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('บันทึกการตั้งค่าร้านค้าเรียบร้อยแล้ว')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div>
        <h1 className="text-3xl font-extrabold text-[#383139] tracking-tight font-heading">
          ตั้งค่าร้านค้า (Store Settings)
        </h1>
        <p className="text-xs sm:text-sm text-[#706A76] mt-1">
          กำหนดข้อมูลร้านค้า อัตราค่าจัดส่ง และเงื่อนไขการส่งฟรี
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-[#FFFDF7] rounded-[38px] p-6 sm:p-8 border border-[#E5DFEB] shadow-sm space-y-6">
        
        {/* Store Profile */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-purple-900 uppercase tracking-wider pb-2 border-b border-[#E5DFEB] flex items-center gap-1.5">
            <Store className="w-4 h-4" />
            <span>1. ข้อมูลร้านค้าและช่องทางติดต่อ</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">ชื่อร้านค้า (Store Name)</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">สโลแกนร้าน (Tagline)</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">เบอร์โทรศัพท์ติดต่อ</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">อีเมลติดต่อร้านค้า</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#383139] mb-1">ที่ตั้งโชว์รูมและสำนักงาน</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Shipping Rates */}
        <div className="space-y-4 pt-4 border-t border-[#E5DFEB]">
          <h2 className="text-sm font-bold text-purple-900 uppercase tracking-wider pb-2 border-b border-[#E5DFEB] flex items-center gap-1.5">
            <Truck className="w-4 h-4" />
            <span>2. การตั้งค่าอัตราค่าจัดส่ง (Delivery Fees)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">ค่าจัดส่งมาตรฐาน (บาท)</label>
              <input
                type="number"
                value={standardFee}
                onChange={(e) => setStandardFee(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">ค่าจัดส่งด่วนพร้อมติดตั้ง (บาท)</label>
              <input
                type="number"
                value={expressFee}
                onChange={(e) => setExpressFee(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">ยอดสั่งซื้อขั้นต่ำเพื่อส่งฟรี (บาท)</label>
              <input
                type="number"
                value={freeThreshold}
                onChange={(e) => setFreeThreshold(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none font-bold"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>บันทึกการตั้งค่าร้านค้า</span>
        </button>

      </form>

    </div>
  )
}
