'use client'

import React, { useState } from 'react'
import { Cpu, Save, Scissors, Sparkles, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminAiSettingsPage() {
  const [kerfWidthMm, setKerfWidthMm] = useState(3.0)
  const [trimMarginMm, setTrimMarginMm] = useState(10.0)
  const [cncCostPerSheet, setCncCostPerSheet] = useState(220)
  const [edgeBandingRatePerM2, setEdgeBandingRatePerM2] = useState(140)
  const [retailMarginPercent, setRetailMarginPercent] = useState(55)
  const [aiSystemPrompt, setAiSystemPrompt] = useState(
    'คุณคือ AI Furniture Production Engineer ผู้เชี่ยวชาญด้านการถอดชิ้นส่วนเฟอร์นิเจอร์ BOM, การวางแผนตัดวัสดุ 2D แบบ Guillotine Bin Packing, และการคำนวณต้นทุนการผลิตจริงตามมาตรฐานวิศวกรรมช่างไม้ Maison Forme'
  )

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('บันทึกค่าพารามิเตอร์การผลิตและ AI Engine สำเร็จ')
  }

  return (
    <div className="space-y-6 max-w-4xl">

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#383139] tracking-tight font-heading">
          ตั้งค่าระบบ AI และเครื่องยนต์คำนวณการผลิต
        </h1>
        <p className="text-xs sm:text-sm text-[#706A76] mt-1">
          ปรับแต่งพารามิเตอร์ของ 2D Cutting Optimizer, คลองเลื่อย (Kerf), ค่าแรงตัด, และมาร์จินราคาแนะนำ
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-[#FFFDF7] rounded-[28px] sm:rounded-[38px] p-4 sm:p-6 md:p-8 border border-[#E5DFEB] shadow-sm space-y-6">

        {/* CNC & Cutting Parameters */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-purple-900 uppercase tracking-wider pb-2 border-b border-[#E5DFEB] flex items-center gap-1.5">
            <Scissors className="w-4 h-4" />
            <span>1. พารามิเตอร์การตัดแผ่นวัสดุ (Cutting & Kerf Parameters)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">
                ความหนาคลองเลื่อยใบตัด (Saw Blade Kerf) - mm
              </label>
              <input
                type="number"
                step="0.1"
                value={kerfWidthMm}
                onChange={(e) => setKerfWidthMm(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-sm md:text-xs px-4 py-3 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none font-bold min-h-[44px]"
              />
              <span className="text-[10px] text-[#706A76] mt-0.5 block">
                * ใบเลื่อย CNC ทั่วไปหนา 3.0 - 3.2 มม.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">
                ระยะเผื่อตัดขอบแผ่นไม้ (Trim Margin) - mm
              </label>
              <input
                type="number"
                step="0.5"
                value={trimMarginMm}
                onChange={(e) => setTrimMarginMm(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-sm md:text-xs px-4 py-3 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none font-bold min-h-[44px]"
              />
              <span className="text-[10px] text-[#706A76] mt-0.5 block">
                * ระยะล้างขอบรอบแผ่นไม้ก่อนซอยตัดชิ้นงาน
              </span>
            </div>
          </div>
        </div>

        {/* Costing Rates */}
        <div className="space-y-4 pt-4 border-t border-[#E5DFEB]">
          <h2 className="text-sm font-bold text-purple-900 uppercase tracking-wider pb-2 border-b border-[#E5DFEB] flex items-center gap-1.5">
            <Cpu className="w-4 h-4" />
            <span>2. อัตราค่าบริการและมาร์จินราคาแนะนำ</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">
                ค่าบริการตัด CNC ต่อแผ่น (บาท)
              </label>
              <input
                type="number"
                value={cncCostPerSheet}
                onChange={(e) => setCncCostPerSheet(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-sm md:text-xs px-4 py-3 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none font-bold min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">
                ค่าปิดขอบ PVC Edge Banding (บาท/ตร.ม.)
              </label>
              <input
                type="number"
                value={edgeBandingRatePerM2}
                onChange={(e) => setEdgeBandingRatePerM2(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-sm md:text-xs px-4 py-3 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none font-bold min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">
                มาร์จินราคาขายปลีกแนะนำ (%)
              </label>
              <input
                type="number"
                value={retailMarginPercent}
                onChange={(e) => setRetailMarginPercent(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-sm md:text-xs px-4 py-3 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none font-bold min-h-[44px]"
              />
            </div>
          </div>
        </div>

        {/* AI Prompt Configuration */}
        <div className="space-y-4 pt-4 border-t border-[#E5DFEB]">
          <h2 className="text-sm font-bold text-purple-900 uppercase tracking-wider pb-2 border-b border-[#E5DFEB] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>3. System Prompt ของผู้ช่วย AI Assistant</span>
          </h2>

          <div>
            <label className="block text-xs font-bold text-[#383139] mb-1">
              คำสั่งควบคุมพฤติกรรมของ AI (System Instruction)
            </label>
            <textarea
              rows={6}
              value={aiSystemPrompt}
              onChange={(e) => setAiSystemPrompt(e.target.value)}
              className="w-full bg-[#F1F2FA] text-[#383139] text-sm md:text-xs px-4 py-3 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-purple-700 hover:bg-purple-800 active:scale-[0.97] text-white font-bold text-sm md:text-xs shadow-sm transition flex items-center justify-center gap-2 min-h-[48px]"
        >
          <Save className="w-4 h-4" />
          <span>บันทึกพารามิเตอร์ AI ทั้งหมด</span>
        </button>

      </form>

    </div>
  )
}
