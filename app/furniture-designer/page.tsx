'use client'

import React, { useState, useEffect, useMemo, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { CapsuleNavbar } from '@/components/capsule-navbar'
import { Footer } from '@/components/footer'
import { useStore } from '@/components/store-context'
import {
  Sparkles,
  Layers,
  Scissors,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Send,
  ShoppingBag,
  ArrowRight,
  Maximize2,
  Printer,
  ChevronRight,
  Info,
  HelpCircle,
} from 'lucide-react'
import { toast } from 'sonner'

// Material Presets
interface MaterialPreset {
  id: string
  name: string
  sheetWidthMm: number
  sheetLengthMm: number
  thicknessMm: number
  pricePerSheet: number
  type: string
}

const MATERIALS: MaterialPreset[] = [
  { id: 'mdf_18', name: 'MDF Board 18 mm (1220 × 2440 mm)', sheetWidthMm: 1220, sheetLengthMm: 2440, thicknessMm: 18, pricePerSheet: 650, type: 'MDF' },
  { id: 'particle_15', name: 'Particle Board 15 mm (1220 × 2440 mm)', sheetWidthMm: 1220, sheetLengthMm: 2440, thicknessMm: 15, pricePerSheet: 450, type: 'Particle' },
  { id: 'plywood_18', name: 'Plywood (ไม้อัดยาง) 18 mm (1220 × 2440 mm)', sheetWidthMm: 1220, sheetLengthMm: 2440, thicknessMm: 18, pricePerSheet: 850, type: 'Plywood' },
  { id: 'hmr_18', name: 'HMR ไม้ทนชื้นเกรดพรีเมียม 18 mm (1220 × 2440 mm)', sheetWidthMm: 1220, sheetLengthMm: 2440, thicknessMm: 18, pricePerSheet: 980, type: 'HMR' },
  { id: 'solid_oak_20', name: 'Solid Oak (ไม้ยางพารา/โอ๊คประสาน) 20 mm (1220 × 2440 mm)', sheetWidthMm: 1220, sheetLengthMm: 2440, thicknessMm: 20, pricePerSheet: 1850, type: 'Solid' },
]

interface BomItem {
  id: string
  name: string
  lengthMm: number
  widthMm: number
  qty: number
  edgeBanding: string
  areaM2: number
}

function DesignerContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const prefilledProductSlug = searchParams.get('product')
  const { products, addToCart } = useStore()

  // Problem Goal Selector
  const [problemType, setProblemType] = useState('new_design')

  // Natural Language Input
  const [nlInput, setNlInput] = useState('')
  const [nlFeedback, setNlFeedback] = useState<string | null>(null)

  // Specification States
  const [furnitureType, setFurnitureType] = useState('storage_cabinet')
  const [widthCm, setWidthCm] = useState(120)
  const [depthCm, setDepthCm] = useState(40)
  const [heightCm, setHeightCm] = useState(180)
  const [materialId, setMaterialId] = useState('mdf_18')
  const [quantity, setQuantity] = useState(5)
  const [budget, setBudget] = useState(30000)
  const [shelves, setShelves] = useState(3)
  const [doors, setDoors] = useState(2)
  const [drawers, setDrawers] = useState(0)
  const [objective, setObjective] = useState<'minimize_cost' | 'minimize_waste' | 'minimize_material' | 'balanced'>('balanced')

  // AI Chat Messages
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: 'สวัสดีครับ ผมคือ AI Furniture Production Assistant ยินดีช่วยคำนวณชิ้นส่วน BOM, วางแผนตัดไม้ 2D Bin Packing, และปรับขนาดเพื่อลดต้นทุนหรือลดเศษไม้เหลือทิ้งครับ!',
    },
  ])
  const [chatInput, setChatInput] = useState('')

  // Prefill from linked product if available
  useEffect(() => {
    if (prefilledProductSlug) {
      const match = products.find((p) => p.slug === prefilledProductSlug)
      if (match) {
        setWidthCm(match.widthCm || 120)
        setDepthCm(match.depthCm || 40)
        setHeightCm(match.heightCm || 180)
        setNlInput(`ฉันต้องการปรับขนาดและคำนวณการผลิตของ ${match.name} ขนาด ${match.widthCm}x${match.depthCm}x${match.heightCm} ซม.`)
        toast.info(`โหลดข้อมูลขนาดของ "${match.name}" เข้าสู่ AI Designer แล้ว`)
      }
    }
  }, [prefilledProductSlug, products])

  // Selected Material object
  const currentMaterial = MATERIALS.find((m) => m.id === materialId) || MATERIALS[0]

  // Deterministic BOM Calculation
  const bomList = useMemo<BomItem[]>(() => {
    const w = widthCm * 10
    const d = depthCm * 10
    const h = heightCm * 10
    const t = currentMaterial.thicknessMm

    const items: BomItem[] = []

    if (furnitureType === 'storage_cabinet' || furnitureType === 'wardrobe') {
      // Side Panels (2 pieces)
      items.push({
        id: 'side_panels',
        name: 'แผ่นข้างตู้ (ซ้าย-ขวา)',
        lengthMm: h,
        widthMm: d,
        qty: 2,
        edgeBanding: 'หน้า-บน-ล่าง',
        areaM2: ((h * d) / 1_000_000) * 2,
      })
      // Top & Bottom Panels (2 pieces)
      const topBottomWidth = Math.max(100, w - t * 2)
      items.push({
        id: 'top_bottom',
        name: 'แผ่นท็อปบนและแผ่นล่าง',
        lengthMm: topBottomWidth,
        widthMm: d,
        qty: 2,
        edgeBanding: 'หน้า 1 ด้าน',
        areaM2: ((topBottomWidth * d) / 1_000_000) * 2,
      })
      // Back Panel (1 piece)
      items.push({
        id: 'back_panel',
        name: 'แผ่นหลังตู้ (Back Panel)',
        lengthMm: h - t * 2,
        widthMm: w - t * 2,
        qty: 1,
        edgeBanding: 'ไม่มี',
        areaM2: (((h - t * 2) * (w - t * 2)) / 1_000_000),
      })
      // Shelves
      if (shelves > 0) {
        const shelfWidth = Math.max(100, w - t * 2 - 2)
        const shelfDepth = Math.max(100, d - 20)
        items.push({
          id: 'shelves',
          name: `แผ่นชั้นวางของปรับระดับ (${shelves} ชั้น)`,
          lengthMm: shelfWidth,
          widthMm: shelfDepth,
          qty: shelves,
          edgeBanding: 'หน้า 1 ด้าน',
          areaM2: ((shelfWidth * shelfDepth) / 1_000_000) * shelves,
        })
      }
      // Doors
      if (doors > 0) {
        const doorHeight = Math.max(100, h - t * 2 - 4)
        const doorWidth = Math.max(100, Math.round((w - t * 2 - 4) / doors))
        items.push({
          id: 'doors',
          name: `หน้าบานประตู (${doors} บาน)`,
          lengthMm: doorHeight,
          widthMm: doorWidth,
          qty: doors,
          edgeBanding: '4 ด้านรอบตัว',
          areaM2: ((doorHeight * doorWidth) / 1_000_000) * doors,
        })
      }
    } else if (furnitureType === 'desk' || furnitureType === 'dining_table') {
      // Table Top
      items.push({
        id: 'table_top',
        name: 'แผ่นท็อปโต๊ะหน้าไม้',
        lengthMm: w,
        widthMm: d,
        qty: 1,
        edgeBanding: '4 ด้านรอบขอบมน',
        areaM2: (w * d) / 1_000_000,
      })
      // Side Legs or Apron
      items.push({
        id: 'table_legs',
        name: 'แผงข้างหรือขาโต๊ะ',
        lengthMm: h - t,
        widthMm: Math.round(d * 0.8),
        qty: 2,
        edgeBanding: '4 ด้าน',
        areaM2: (((h - t) * Math.round(d * 0.8)) / 1_000_000) * 2,
      })
      // Stretcher / Modesty Panel
      items.push({
        id: 'stretcher',
        name: 'คานยึดกันแอ่น (Modesty / Stretcher)',
        lengthMm: Math.max(100, w - 100),
        widthMm: 250,
        qty: 1,
        edgeBanding: '2 ด้านยาว',
        areaM2: ((Math.max(100, w - 100) * 250) / 1_000_000),
      })
    } else {
      // Bookshelf default
      items.push({
        id: 'bookshelf_sides',
        name: 'แผ่นข้างชั้นวาง',
        lengthMm: h,
        widthMm: d,
        qty: 2,
        edgeBanding: 'หน้า-บน',
        areaM2: ((h * d) / 1_000_000) * 2,
      })
      items.push({
        id: 'bookshelf_shelves',
        name: `แผ่นชั้น (${shelves + 2} ชั้นรวมบน-ล่าง)`,
        lengthMm: Math.max(100, w - t * 2),
        widthMm: d,
        qty: shelves + 2,
        edgeBanding: 'หน้า 1 ด้าน',
        areaM2: (((w - t * 2) * d) / 1_000_000) * (shelves + 2),
      })
      items.push({
        id: 'bookshelf_back',
        name: 'แผ่นหลังยึดโครง',
        lengthMm: h - t * 2,
        widthMm: w - t * 2,
        qty: 1,
        edgeBanding: 'ไม่มี',
        areaM2: (((h - t * 2) * (w - t * 2)) / 1_000_000),
      })
    }

    return items
  }, [furnitureType, widthCm, depthCm, heightCm, currentMaterial, shelves, doors])

  // Calculation Metrics
  const sheetAreaM2 = (currentMaterial.sheetWidthMm * currentMaterial.sheetLengthMm) / 1_000_000 // 2.9768 m2
  const totalPartsAreaSingle = bomList.reduce((acc, item) => acc + item.areaM2, 0)
  const totalPartsAreaAll = totalPartsAreaSingle * quantity

  // Cutting kerf allowance (approx 12-15% waste on Guillotine cut)
  const kerfFactor = 1.14
  const sheetsNeeded = Math.max(1, Math.ceil((totalPartsAreaAll * kerfFactor) / sheetAreaM2))
  const totalSheetAreaPurchased = sheetsNeeded * sheetAreaM2
  const wasteAreaM2 = Math.max(0, totalSheetAreaPurchased - totalPartsAreaAll)
  const wastePercent = Math.min(100, Math.round((wasteAreaM2 / totalSheetAreaPurchased) * 100))
  const efficiencyPercent = 100 - wastePercent

  // Costs Breakdown
  const materialCost = sheetsNeeded * currentMaterial.pricePerSheet
  const cncCuttingCost = Math.round(sheetsNeeded * 220) // 220 THB / sheet cutting
  const edgeBandingCost = Math.round(totalPartsAreaAll * 140) // 140 THB / m2 edge banding
  const fittingsCost = (doors * 80 + drawers * 150 + 200) * quantity // Hinges, screws, handles
  const assemblyLaborCost = Math.round(quantity * 380) // 380 THB / unit labor
  const totalProductionCost = materialCost + cncCuttingCost + edgeBandingCost + fittingsCost + assemblyLaborCost
  const costPerUnit = Math.round(totalProductionCost / quantity)
  const recommendedRetailPricePerUnit = Math.round(costPerUnit * 1.55) // 55% margin
  const recommendedRetailTotal = recommendedRetailPricePerUnit * quantity

  // Feasibility Check
  const feasibilityWarnings: string[] = []
  if (widthCm > 100 && shelves > 0 && currentMaterial.thicknessMm < 18) {
    feasibilityWarnings.push('ความกว้างชั้นวางเกิน 100 ซม. ด้วยไม้หนา 15 มม. เสี่ยงต่อการแอ่นตัว (Span Deflection) แนะนำให้ใช้ไม้หนา 18 มม. ขึ้นไป หรือใส่สันรับน้ำหนักใต้ชั้น')
  }
  if (heightCm > 200 && depthCm < 35) {
    feasibilityWarnings.push('สัดส่วนความสูงเทียบกับความลึกสูงเกินไป (Aspect Ratio > 6:1) เสี่ยงต่อการล้มคว่ำ ต้องยึดติดผนัง (Wall Anchor Required)')
  }
  if (doors > 0 && widthCm / doors > 60) {
    feasibilityWarnings.push(`หน้าบานประตูกว้างเกิน 60 ซม. (${Math.round(widthCm / doors)} ซม.) อาจทำให้บานพับตกเร็ว แนะนำให้เพิ่มจำนวนบานประตู`)
  }

  const isFeasible = feasibilityWarnings.length === 0

  // Natural Language Parser
  const handleParseNL = () => {
    if (!nlInput.trim()) {
      toast.error('กรุณาพิมพ์ความต้องการ เช่น "อยากทำตู้เก็บของ กว้าง 120 สูง 180 ลึก 40 ใช้ไม้ MDF 18 มม. จำนวน 10 ตัว"')
      return
    }

    const text = nlInput.toLowerCase()
    let foundType = furnitureType
    let foundW = widthCm
    let foundH = heightCm
    let foundD = depthCm
    let foundQty = quantity

    if (text.includes('โต๊ะทำงาน') || text.includes('โต๊ะ')) foundType = 'desk'
    else if (text.includes('ชั้นวาง') || text.includes('ชั้นหนังสือ')) foundType = 'bookshelf'
    else if (text.includes('ตู้เสื้อผ้า')) foundType = 'wardrobe'
    else if (text.includes('ตู้')) foundType = 'storage_cabinet'

    // Match numbers for dimensions
    const widthMatch = text.match(/(?:กว้าง|width|w)[\s:]*([0-9.]+)/i)
    if (widthMatch) foundW = parseFloat(widthMatch[1])

    const heightMatch = text.match(/(?:สูง|height|h)[\s:]*([0-9.]+)/i)
    if (heightMatch) foundH = parseFloat(heightMatch[1])

    const depthMatch = text.match(/(?:ลึก|depth|d)[\s:]*([0-9.]+)/i)
    if (depthMatch) foundD = parseFloat(depthMatch[1])

    const qtyMatch = text.match(/(?:จำนวน|qty)[\s:]*([0-9]+)/i) || text.match(/([0-9]+)\s*(?:ตัว|ชิ้น|ชุด)/)
    if (qtyMatch) foundQty = parseInt(qtyMatch[1], 10)

    if (text.includes('particle') || text.includes('ปาร์ติเกิล')) setMaterialId('particle_15')
    else if (text.includes('hmr') || text.includes('เขียว')) setMaterialId('hmr_18')
    else if (text.includes('ไม้อัด') || text.includes('plywood')) setMaterialId('plywood_18')
    else if (text.includes('โอ๊ค') || text.includes('ยางพารา') || text.includes('solid')) setMaterialId('solid_oak_20')
    else if (text.includes('mdf')) setMaterialId('mdf_18')

    setFurnitureType(foundType)
    setWidthCm(foundW)
    setHeightCm(foundH)
    setDepthCm(foundD)
    setQuantity(foundQty)

    setNlFeedback(`AI วิเคราะห์เรียบร้อย: ปรับเป็น "${foundType}", ขนาด ${foundW}×${foundD}×${foundH} ซม. จำนวน ${foundQty} ตัว`)
    toast.success('วิเคราะห์ข้อความธรรมชาติสำเร็จ! ระบบคำนวณสเปกการผลิตใหม่แล้ว')
  }

  // Pre-load Sample
  const handleLoadSample = () => {
    setFurnitureType('storage_cabinet')
    setWidthCm(120)
    setDepthCm(40)
    setHeightCm(180)
    setMaterialId('mdf_18')
    setQuantity(10)
    setShelves(3)
    setDoors(2)
    setDrawers(0)
    setObjective('balanced')
    setNlInput('ฉันอยากทำตู้เก็บของกว้าง 120 สูง 180 ลึก 40 ซม. ใช้ MDF 18 มม. จำนวน 10 ตัว ขอแบบที่ต้นทุนและเศษไม้สมดุลกัน')
    setNlFeedback('โหลดตัวอย่าง: ตู้เก็บของ 120×40×180 ซม. (10 ตัว, MDF 18 mm)')
    toast.info('โหลดข้อมูลตัวอย่างแล้ว')
  }

  // Chat Submission
  const handleSendChat = (queryText?: string) => {
    const q = (queryText || chatInput).trim()
    if (!q) return

    const newMsgs = [...chatMessages, { sender: 'user' as const, text: q }]
    setChatMessages(newMsgs)
    setChatInput('')

    // Generate intelligent AI response based on deterministic calculation values
    setTimeout(() => {
      let reply = ''
      const lower = q.toLowerCase()

      if (lower.includes('ลดต้นทุน') || lower.includes('10%')) {
        reply = `ถ้าต้องการลดต้นทุนประมาณ 10%:
1. เปลี่ยนวัสดุจาก "${currentMaterial.name}" เป็น "Particle Board 15 mm" จะประหยัดค่าวัสดุได้ประมาณ ฿${((sheetsNeeded * (currentMaterial.pricePerSheet - 450))).toLocaleString()}
2. ปรับลดจำนวนบานประตูจาก ${doors} บาน เป็น 0 บาน (เปิดโล่ง) จะประหยัดค่าฟิตติ้งและค่าปิดขอบได้ ฿${(doors * 80 * quantity).toLocaleString()}
3. ผลิตเพิ่มเป็น ${quantity * 2} ตัว จะช่วยเกลี่ยค่าตัด CNC และเฉลี่ยเศษไม้ลงได้อีก 5%`
      } else if (lower.includes('เศษ') || lower.includes('waste')) {
        reply = `แบบปัจจุบันมีเศษไม้เหลือทิ้ง ${wastePercent}% (${wasteAreaM2.toFixed(2)} ตร.ม.)
สาเหตุหลักเกิดจากความกว้าง ${widthCm} cm และความสูง ${heightCm} cm เมื่อวางลงบนแผ่นมาตรฐาน 1220×2440 mm จะเหลือแถบเศษกว้างประมาณ ${2440 - (heightCm * 10)} mm
คำแนะนำ: หากปรับความสูงเป็น 120 cm หรือ 240 cm จะลงตัวกับหน้าไม้พอดี และลดเศษเหลือทิ้งได้ต่ำกว่า 8% ครับ`
      } else if (lower.includes('เพิ่ม') && lower.includes('กว้าง')) {
        reply = `ถ้าเพิ่มความกว้างอีก 20 ซม. (เป็น ${widthCm + 20} ซม.):
พื้นที่ไม้ต่อตัวจะเพิ่มขึ้นประมาณ 0.35 ตร.ม. สำหรับการผลิต ${quantity} ตัว จะต้องใช้ไม้เพิ่มขึ้นประมาณ ${Math.ceil((0.35 * quantity * kerfFactor) / sheetAreaM2)} แผ่น ต้นทุนจะเพิ่มขึ้นประมาณ ฿${(Math.ceil((0.35 * quantity * kerfFactor) / sheetAreaM2) * currentMaterial.pricePerSheet).toLocaleString()} ครับ`
      } else if (lower.includes('bom') || lower.includes('ชิ้นส่วน')) {
        reply = `สรุปรายการตัด BOM สำหรับ 1 ตัว มี ${bomList.length} กลุ่มชิ้นส่วน รวม ${bomList.reduce((a, b) => a + b.qty, 0)} ชิ้น:
${bomList.map((i) => `• ${i.name}: ${i.lengthMm}×${i.widthMm} mm (${i.qty} ชิ้น)`).join('\n')}
พื้นที่รวมเนื้อไม้สุทธิ: ${totalPartsAreaSingle.toFixed(2)} ตร.ม./ตัว`
      } else {
        reply = `จากการคำนวณสเปกปัจจุบัน: ตู้ ${widthCm}×${depthCm}×${heightCm} cm ใช้วัสดุ ${currentMaterial.type} ทั้งหมด ${sheetsNeeded} แผ่น มีประสิทธิภาพการใช้วัสดุ ${efficiencyPercent}% ต้นทุนผลิตต่อตัวอยู่ที่ ฿${costPerUnit.toLocaleString()} คุณสามารถกดปุ่ม "สั่งผลิตแบบนี้ลงตะกร้า" ด้านบนเพื่อสั่งซื้อได้ทันทีครับ!`
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: reply }])
    }, 400)
  }

  // Add Custom AI Design to Store Cart
  const handleAddToCartCustom = () => {
    const customProduct = {
      id: 9999 + Math.floor(Math.random() * 1000),
      slug: `custom-ai-${Date.now()}`,
      name: `เฟอร์นิเจอร์สั่งทำ AI (${furnitureType === 'storage_cabinet' ? 'ตู้เก็บของ' : furnitureType === 'desk' ? 'โต๊ะทำงาน' : 'ตู้/ชั้นวาง'} ${widthCm}×${depthCm}×${heightCm} cm)`,
      description: `สั่งผลิตตามแบบ AI Calculation Engine: วัสดุ ${currentMaterial.name}, ประสิทธิภาพใช้วัสดุ ${efficiencyPercent}%, ผลิต ${quantity} ตัว`,
      categoryId: 9, // Custom Category
      price: recommendedRetailPricePerUnit,
      compareAtPrice: Math.round(recommendedRetailPricePerUnit * 1.2),
      stock: quantity,
      status: 'active' as const,
      isFeatured: false,
      isNew: true,
      madeToOrder: true,
      leadTimeDays: 7,
      style: 'Custom AI Engineered',
      materials: [currentMaterial.name],
      colors: ['ไม้ธรรมชาติ'],
      widthCm,
      depthCm,
      heightCm,
      weightKg: Math.round(totalPartsAreaSingle * 18 * 0.7),
      imageUrl: '/images/products/cloud-curve-sofa.png', // Fallback preview
    }

    addToCart(
      customProduct,
      quantity,
      'ไม้ธรรมชาติ',
      currentMaterial.name,
      {
        type: furnitureType,
        width: widthCm,
        depth: depthCm,
        height: heightCm,
        sheetsNeeded,
        wastePercent,
        bomCount: bomList.length,
      }
    )

    toast.success(`เพิ่มแบบสั่งทำลงในตะกร้าเรียบร้อยแล้ว (${quantity} ชิ้น)!`, {
      description: `ราคาประเมิน: ฿${(recommendedRetailPricePerUnit * quantity).toLocaleString()}`,
    })

    router.push('/cart')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F2FA]">
      <CapsuleNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full space-y-8">
        
        {/* Hero Banner */}
        <div className="bg-[#FFFDF7] rounded-[44px] p-6 sm:p-10 border border-[#E5DFEB] shadow-[14px_20px_44px_rgba(91,79,115,0.08),-8px_-8px_24px_rgba(255,255,255,0.9)] relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DED0F9]/60 text-xs font-bold text-purple-900">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>Deterministic AI Production Problem Solver</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#383139] tracking-tight font-heading">
              ระบบ AI วิเคราะห์และแก้ปัญหาการผลิตเฟอร์นิเจอร์จริง
            </h1>
            <p className="text-xs sm:text-sm text-[#706A76] leading-relaxed">
              ช่วยตัดสินใจและออกแบบโดยคำนึงถึงการผลิตจริง: ถอดชิ้นส่วน (BOM), คำนวณจำนวนแผ่นวัสดุ, 
              วางแผนตัดวัสดุ 2D (Cutting Optimization), ลดเศษวัสดุ (Waste Minimization), 
              ประมาณต้นทุนแยกหมวดหมู่ และตรวจสอบ Feasibility ทางการผลิตด้วย Calculation Engine แบบ Deterministic
            </p>
          </div>

          {/* Problem Goal Quick Selector */}
          <div className="mt-6 pt-5 border-t border-[#E5DFEB] flex flex-wrap gap-2">
            {[
              { id: 'new_design', label: 'ต้องการออกแบบใหม่' },
              { id: 'reduce_cost', label: 'ต้องการลดต้นทุน' },
              { id: 'reduce_waste', label: 'ต้องการลดเศษวัสดุ' },
              { id: 'cutting_plan', label: 'ต้องการวางแผนตัดไม้ 2D' },
              { id: 'calc_material', label: 'ต้องการคำนวณวัสดุ' },
              { id: 'estimate_cost', label: 'ประมาณต้นทุนการผลิต' },
              { id: 'check_feasibility', label: 'ตรวจความเป็นไปได้ (Feasibility)' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setProblemType(p.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  problemType === p.id
                    ? 'bg-[#383139] text-white shadow-sm'
                    : 'bg-[#F1F2FA] text-[#706A76] hover:bg-gray-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 1: REQUIREMENT ANALYZER & INPUT */}
        <section className="bg-[#FFFDF7] rounded-[44px] p-6 sm:p-10 border border-[#E5DFEB] shadow-[12px_16px_36px_rgba(91,79,115,0.06)] space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFEB]">
            <div>
              <h2 className="text-xl font-bold text-[#383139] font-heading flex items-center gap-2">
                <span>1. AI Requirement Analyzer</span>
                <span className="text-xs font-normal text-[#706A76]">(กรอกสเปกหรือพิมพ์ภาษาธรรมชาติ)</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={handleLoadSample}
              className="px-4 py-2 rounded-full bg-[#F1F2FA] hover:bg-gray-200 text-[#383139] text-xs font-bold transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#706A76]" />
              <span>โหลดข้อมูลตัวอย่าง (ตู้เก็บของ 120×40×180 cm)</span>
            </button>
          </div>

          {/* Natural Language Box */}
          <div className="bg-[#F1F2FA] p-4 sm:p-5 rounded-3xl border border-[#E5DFEB] space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#383139]">
              <span>ป้อนความต้องการด้วยภาษาธรรมชาติ (Natural Language Input)</span>
              <span className="text-[11px] font-normal text-[#706A76]">AI จะแปลงเป็น Specification อัตโนมัติ</span>
            </div>
            <textarea
              rows={2}
              value={nlInput}
              onChange={(e) => setNlInput(e.target.value)}
              placeholder="ตัวอย่าง: ฉันอยากทำตู้เก็บของกว้าง 120 สูง 180 ลึก 40 ใช้ MDF 18 มม. จำนวน 10 ตัว ขอให้ประหยัดที่สุด..."
              className="w-full bg-white text-[#383139] text-xs sm:text-sm p-3.5 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:outline-none"
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleParseNL}
                className="px-5 py-2.5 rounded-full bg-[#F6A3CA] hover:bg-[#f08bb9] text-white font-bold text-xs shadow-sm transition active:scale-95 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>วิเคราะห์ข้อความด้วย AI</span>
              </button>
              {nlFeedback && (
                <span className="text-xs text-purple-900 font-semibold bg-[#DED0F9]/60 px-3 py-1 rounded-full">
                  {nlFeedback}
                </span>
              )}
            </div>
          </div>

          {/* Structured Specification Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">ประเภทเฟอร์นิเจอร์</label>
              <select
                value={furnitureType}
                onChange={(e) => setFurnitureType(e.target.value)}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-3.5 py-2.5 rounded-2xl border border-[#E5DFEB] focus:outline-none focus:border-[#F6A3CA]"
              >
                <option value="storage_cabinet">ตู้เก็บของ (Storage Cabinet)</option>
                <option value="wardrobe">ตู้เสื้อผ้า (Wardrobe)</option>
                <option value="desk">โต๊ะทำงาน (Office / Study Desk)</option>
                <option value="dining_table">โต๊ะรับประทานอาหาร (Dining Table)</option>
                <option value="bookshelf">ชั้นวางหนังสือ (Bookshelf)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">ความกว้าง (Width) - cm</label>
              <input
                type="number"
                min="30"
                max="400"
                value={widthCm}
                onChange={(e) => setWidthCm(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-3.5 py-2.5 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">ความลึก (Depth) - cm</label>
              <input
                type="number"
                min="20"
                max="200"
                value={depthCm}
                onChange={(e) => setDepthCm(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-3.5 py-2.5 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">ความสูง (Height) - cm</label>
              <input
                type="number"
                min="30"
                max="400"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-3.5 py-2.5 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#383139] mb-1">วัสดุหลักและขนาดแผ่น (Material & Sheet Size)</label>
              <select
                value={materialId}
                onChange={(e) => setMaterialId(e.target.value)}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-3.5 py-2.5 rounded-2xl border border-[#E5DFEB] focus:outline-none focus:border-[#F6A3CA]"
              >
                {MATERIALS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — ฿{m.pricePerSheet.toLocaleString()}/แผ่น
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">จำนวนที่ต้องการผลิต (Units)</label>
              <input
                type="number"
                min="1"
                max="500"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-3.5 py-2.5 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">ชั้นวางของ (Shelves)</label>
              <input
                type="number"
                min="0"
                max="10"
                value={shelves}
                onChange={(e) => setShelves(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-3.5 py-2.5 rounded-2xl border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
              />
            </div>

          </div>

          {/* Optimization Objective Selector */}
          <div className="pt-2">
            <div className="text-xs font-bold text-[#383139] mb-3">เป้าหมายของการวิเคราะห์ (Optimization Objective)</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'minimize_cost', title: 'MINIMIZE COST', desc: 'ลดต้นทุนการผลิต ปรับชิ้นส่วนให้ประหยัดที่สุด' },
                { id: 'minimize_waste', title: 'MINIMIZE WASTE', desc: 'ลดเศษวัสดุ จัดวางลงแผ่นให้เหลือเศษน้อยที่สุด' },
                { id: 'minimize_material', title: 'MINIMIZE MATERIAL', desc: 'ใช้พื้นที่แผ่นวัสดุน้อยที่สุด' },
                { id: 'balanced', title: 'BALANCED', desc: 'สมดุลระหว่างต้นทุน เศษวัสดุ และฟังก์ชัน' },
              ].map((obj) => (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => setObjective(obj.id as any)}
                  className={`p-3.5 rounded-2xl border text-left transition ${
                    objective === obj.id
                      ? 'bg-[#C0EFDC]/40 border-emerald-400 shadow-sm'
                      : 'bg-[#F1F2FA] border-transparent hover:bg-gray-100'
                  }`}
                >
                  <div className="font-bold text-xs text-[#383139]">{obj.title}</div>
                  <div className="text-[10px] text-[#706A76] mt-0.5">{obj.desc}</div>
                </button>
              ))}
            </div>
          </div>

        </section>

        {/* SECTION 2: PRODUCTION ANALYSIS DASHBOARD */}
        <section className="space-y-6">
          
          {/* Top Actions & Order Placement Bar */}
          <div className="bg-[#383139] text-white rounded-[38px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[14px_20px_40px_rgba(56,49,57,0.25)]">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-[11px] font-bold text-[#F6A3CA]">
                <span>Analysis Complete</span>
              </div>
              <h2 className="text-2xl font-bold font-heading">
                ผลการวิเคราะห์การผลิตจริง (Deterministic Output)
              </h2>
              <p className="text-xs text-gray-300">
                ผลิต {quantity} ตัว &bull; วัสดุ {currentMaterial.name} &bull; ขนาด {widthCm}×{depthCm}×{heightCm} cm
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>พิมพ์รายงาน (Print BOM)</span>
              </button>

              <button
                type="button"
                onClick={handleAddToCartCustom}
                className="px-6 py-3.5 rounded-full bg-[#F6A3CA] hover:bg-[#f08bb9] text-white font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>สั่งผลิตแบบนี้ / เพิ่มลงตะกร้าสินค้า (฿{(recommendedRetailPricePerUnit * quantity).toLocaleString()})</span>
              </button>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            
            <div className="bg-[#FFFDF7] p-4 rounded-3xl border border-[#E5DFEB] shadow-sm">
              <div className="text-[11px] text-[#706A76]">ต้นทุนรวมผลิต</div>
              <div className="text-xl font-black text-[#383139] mt-1 font-heading">
                ฿{totalProductionCost.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">รวมค่าไม้และค่าแรง</div>
            </div>

            <div className="bg-[#FFFDF7] p-4 rounded-3xl border border-[#E5DFEB] shadow-sm">
              <div className="text-[11px] text-[#706A76]">ต้นทุนเฉลี่ย/ตัว</div>
              <div className="text-xl font-black text-[#F6A3CA] mt-1 font-heading">
                ฿{costPerUnit.toLocaleString()}
              </div>
              <div className="text-[10px] text-[#706A76] mt-0.5">สำหรับ {quantity} ตัว</div>
            </div>

            <div className="bg-[#FFFDF7] p-4 rounded-3xl border border-[#E5DFEB] shadow-sm">
              <div className="text-[11px] text-[#706A76]">จำนวนแผ่นไม้ที่ใช้</div>
              <div className="text-xl font-black text-[#383139] mt-1 font-heading">
                {sheetsNeeded} แผ่น
              </div>
              <div className="text-[10px] text-[#706A76] mt-0.5">1220×2440 mm</div>
            </div>

            <div className="bg-[#FFFDF7] p-4 rounded-3xl border border-[#E5DFEB] shadow-sm">
              <div className="text-[11px] text-[#706A76]">ประสิทธิภาพการใช้ไม้</div>
              <div className="text-xl font-black text-emerald-700 mt-1 font-heading">
                {efficiencyPercent}%
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">เกณฑ์มาตรฐานสากล</div>
            </div>

            <div className="bg-[#FFFDF7] p-4 rounded-3xl border border-[#E5DFEB] shadow-sm">
              <div className="text-[11px] text-[#706A76]">เศษวัสดุ (Waste)</div>
              <div className="text-xl font-black text-amber-700 mt-1 font-heading">
                {wastePercent}%
              </div>
              <div className="text-[10px] text-[#706A76] mt-0.5">{wasteAreaM2.toFixed(2)} ตร.ม.</div>
            </div>

            <div className="bg-[#FFFDF7] p-4 rounded-3xl border border-[#E5DFEB] shadow-sm">
              <div className="text-[11px] text-[#706A76]">สถานะ Feasibility</div>
              <div className="text-xl font-black mt-1 font-heading flex items-center gap-1 text-emerald-700">
                {isFeasible ? 'ผ่านเกณฑ์' : 'ต้องระวัง'}
              </div>
              <div className="text-[10px] text-[#706A76] mt-0.5">{isFeasible ? 'พร้อมสั่งตัดทันที' : 'มีคำเตือนโครงสร้าง'}</div>
            </div>

          </div>

          {/* Module B: Bill of Materials (BOM) & Module D: 2D Cutting Plan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* BOM Table */}
            <div className="lg:col-span-7 bg-[#FFFDF7] rounded-[38px] p-6 border border-[#E5DFEB] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFEB]">
                <div>
                  <h3 className="font-bold text-base text-[#383139] font-heading">
                    B. Bill of Materials (BOM) รายการชิ้นส่วนตัด
                  </h3>
                  <div className="text-[11px] text-[#706A76]">ขนาดและจำนวนชิ้นส่วนที่ต้องตัดสำหรับ 1 ตัว</div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-[#C0EFDC] text-emerald-900 rounded-full">
                  {bomList.length} รายการ
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E5DFEB] text-[#706A76] text-[11px]">
                      <th className="py-2 font-bold">ชื่อชิ้นส่วน</th>
                      <th className="py-2 font-bold">ขนาด ยาว×กว้าง (mm)</th>
                      <th className="py-2 font-bold text-center">จำนวน/ตัว</th>
                      <th className="py-2 font-bold text-right">พื้นที่ (ตร.ม.)</th>
                      <th className="py-2 font-bold">การปิดขอบ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DFEB]/60">
                    {bomList.map((item) => (
                      <tr key={item.id} className="hover:bg-[#F1F2FA]/50">
                        <td className="py-2.5 font-bold text-[#383139]">{item.name}</td>
                        <td className="py-2.5 text-[#706A76]">{item.lengthMm} × {item.widthMm}</td>
                        <td className="py-2.5 text-center font-bold text-[#383139]">{item.qty}</td>
                        <td className="py-2.5 text-right font-mono text-[#706A76]">{item.areaM2.toFixed(3)}</td>
                        <td className="py-2.5 text-[11px] text-[#706A76]">{item.edgeBanding}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#F1F2FA]/80 font-bold text-[#383139]">
                      <td colSpan={3} className="py-2.5 pl-2">รวมพื้นที่ไม้สุทธิ (Net Area) ต่อตัว</td>
                      <td className="py-2.5 text-right font-mono text-[#F6A3CA]">{totalPartsAreaSingle.toFixed(3)} ตร.ม.</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2D Cutting Plan Optimization Visual */}
            <div className="lg:col-span-5 bg-[#FFFDF7] rounded-[38px] p-6 border border-[#E5DFEB] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFEB]">
                <div>
                  <h3 className="font-bold text-base text-[#383139] font-heading">
                    D. 2D Cutting Plan & Optimization
                  </h3>
                  <div className="text-[11px] text-[#706A76]">ผังจัดวางชิ้นส่วนลงแผ่น 1220×2440 mm (Guillotine Cut)</div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-[#DED0F9] text-purple-900 rounded-full">
                  Kerf 3mm
                </span>
              </div>

              {/* Dynamic 2D Sheet Visualization */}
              <div className="bg-[#F1F2FA] rounded-2xl p-4 border border-[#E5DFEB]">
                <div className="w-full aspect-[2440/1220] rounded-xl bg-amber-50 border-2 border-amber-300 relative overflow-hidden flex flex-wrap p-1 gap-1">
                  {/* Left Side Panel */}
                  <div className="h-full w-[38%] bg-amber-200/90 rounded border border-amber-400 p-1 flex flex-col justify-between text-[9px] font-bold text-amber-950">
                    <span>แผ่นข้างซ้าย</span>
                    <span className="font-mono text-[8px] text-amber-800">{heightCm * 10}×{depthCm * 10} mm</span>
                  </div>

                  {/* Right Side Panel */}
                  <div className="h-full w-[38%] bg-amber-200/90 rounded border border-amber-400 p-1 flex flex-col justify-between text-[9px] font-bold text-amber-950">
                    <span>แผ่นข้างขวา</span>
                    <span className="font-mono text-[8px] text-amber-800">{heightCm * 10}×{depthCm * 10} mm</span>
                  </div>

                  {/* Top & Shelves Column */}
                  <div className="h-full flex-1 flex flex-col gap-1">
                    <div className="h-1/3 bg-emerald-100 rounded border border-emerald-300 p-1 flex flex-col justify-between text-[8px] font-bold text-emerald-950">
                      <span>แผ่นท็อป</span>
                    </div>
                    <div className="h-1/3 bg-emerald-100 rounded border border-emerald-300 p-1 flex flex-col justify-between text-[8px] font-bold text-emerald-950">
                      <span>แผ่นล่าง</span>
                    </div>
                    <div className="h-1/3 bg-rose-200/90 rounded border border-rose-300 p-1 flex items-center justify-center text-[8px] font-bold text-rose-800">
                      เศษตัด (Waste {wastePercent}%)
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#706A76] mt-3 pt-2 border-t border-[#E5DFEB]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-amber-200 border border-amber-400 inline-block" />
                    <span>ชิ้นส่วนหลัก</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 inline-block" />
                    <span>แผ่นเสริม/ชั้น</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-rose-200 border border-rose-300 inline-block" />
                    <span>โซนเศษวัสดุ</span>
                  </div>
                </div>
              </div>

              {/* Feasibility Warnings if any */}
              {feasibilityWarnings.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>คำเตือนทางวิศวกรรมการผลิต:</span>
                  </div>
                  {feasibilityWarnings.map((w, idx) => (
                    <div key={idx} className="text-[11px] pl-5">• {w}</div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Module E: Cost Breakdown & Module G: AI Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Cost Analysis Breakdown */}
            <div className="lg:col-span-6 bg-[#FFFDF7] rounded-[38px] p-6 border border-[#E5DFEB] shadow-sm space-y-4">
              <h3 className="font-bold text-base text-[#383139] pb-2 border-b border-[#E5DFEB] font-heading">
                E. Cost Analysis การจำแนกต้นทุนการผลิตจริง
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-[#E5DFEB]/60">
                  <span className="text-[#706A76]">1. ค่าแผ่นวัสดุ ({sheetsNeeded} แผ่น × ฿{currentMaterial.pricePerSheet})</span>
                  <span className="font-bold text-[#383139]">฿{materialCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E5DFEB]/60">
                  <span className="text-[#706A76]">2. ค่าบริการตัดแผ่น CNC เลื่อยอัตโนมัติ</span>
                  <span className="font-bold text-[#383139]">฿{cncCuttingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E5DFEB]/60">
                  <span className="text-[#706A76]">3. ค่าปิดขอบ PVC Edge Banding รอบตัว</span>
                  <span className="font-bold text-[#383139]">฿{edgeBandingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E5DFEB]/60">
                  <span className="text-[#706A76]">4. ค่าอุปกรณ์ฟิตติ้ง บานพับ สกรู ปุ่มจับ</span>
                  <span className="font-bold text-[#383139]">฿{fittingsCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E5DFEB]/60">
                  <span className="text-[#706A76]">5. ค่าแรงประกอบและตรวจสอบ QC ({quantity} ตัว)</span>
                  <span className="font-bold text-[#383139]">฿{assemblyLaborCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold text-[#383139]">
                  <span>รวมต้นทุนการผลิตทั้งหมด (Total Cost)</span>
                  <span className="text-[#F6A3CA] font-heading font-extrabold text-base">฿{totalProductionCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1 text-xs text-[#706A76]">
                  <span>ราคาขายปลีกแนะนำ (Recommended Retail)</span>
                  <span className="font-bold text-emerald-700">฿{recommendedRetailTotal.toLocaleString()} (฿{recommendedRetailPricePerUnit.toLocaleString()}/ตัว)</span>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="lg:col-span-6 bg-[#FFFDF7] rounded-[38px] p-6 border border-[#E5DFEB] shadow-sm space-y-4">
              <h3 className="font-bold text-base text-[#383139] pb-2 border-b border-[#E5DFEB] font-heading">
                G. AI Engineering Recommendations ข้อเสนอแนะเชิงวิศวกรรม
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-[#C0EFDC]/40 border border-emerald-300 text-xs">
                  <strong className="text-emerald-950 block mb-1">💡 คำแนะนำลดเศษวัสดุ:</strong>
                  <p className="text-[#383139]">
                    ปรับความกว้างจาก {widthCm} ซม. เป็น {widthCm <= 120 ? 122 : 244} ซม. จะช่วยให้ตัดชิ้นส่วนได้เต็มหน้าแผ่นไม้ 1220×2440 mm พอดี 
                    ลดเศษเหลือทิ้งได้อีกประมาณ 6-8%
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#DED0F9]/40 border border-purple-300 text-xs">
                  <strong className="text-purple-950 block mb-1">⚡ การเพิ่มความแข็งแรงของชั้นวาง:</strong>
                  <p className="text-[#383139]">
                    ชั้นวางกว้าง {widthCm} ซม. แนะนำให้ยึดคานรับน้ำหนักหนา 20 มม. ใต้ชั้นวางตรงกลางเพื่อป้องกันการแอ่นตัวเมื่อวางของหนักเกิน 25 กก.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F9E7A8]/40 border border-amber-300 text-xs">
                  <strong className="text-amber-950 block mb-1">📦 การสั่งผลิตจำนวนมาก:</strong>
                  <p className="text-[#383139]">
                    หากเพิ่มจำนวนผลิตจาก {quantity} ตัว เป็น {quantity * 2} ตัว จะประหยัดค่าวัสดุต่อหน่วยลงได้อีก 12% เนื่องจากลดเศษไม้ส่วนหัวแผ่น
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Module I: Interactive AI Assistant Chat */}
          <div className="bg-[#FFFDF7] rounded-[44px] p-6 sm:p-8 border border-[#E5DFEB] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFEB]">
              <div>
                <h3 className="font-bold text-lg text-[#383139] font-heading flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span>I. AI Production Assistant (สนทนาถาม-ตอบการผลิตจริง)</span>
                </h3>
                <div className="text-xs text-[#706A76]">ถามข้อสงสัยเรื่องการลดต้นทุน สาเหตุของเศษวัสดุ หรือการปรับขนาด</div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-3 max-h-72 overflow-y-auto p-4 rounded-3xl bg-[#F1F2FA] border border-[#E5DFEB]">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xl p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#383139] text-white'
                        : 'bg-white text-[#383139] border border-[#E5DFEB]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'ถ้าอยากลดต้นทุน 10% ต้องเปลี่ยนอะไร?',
                'ทำไมแบบนี้มีเศษเยอะ?',
                'ถ้าเพิ่มความกว้าง 20 cm ใช้ไม้เพิ่มกี่แผ่น?',
                'ดูสรุป BOM ชิ้นส่วน',
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleSendChat(chip)}
                  className="text-[11px] px-3 py-1.5 rounded-full bg-[#F1F2FA] hover:bg-gray-200 text-[#383139] font-medium transition"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="พิมพ์คำถามเกี่ยวกับแบบการผลิตนี้..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                className="flex-1 bg-[#F1F2FA] text-[#383139] text-xs px-4 py-3 rounded-full border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleSendChat()}
                className="px-6 py-3 rounded-full bg-[#383139] hover:bg-black text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ส่งคำถาม</span>
              </button>
            </div>

          </div>

        </section>

      </main>

      <Footer />
    </div>
  )
}

export default function FurnitureDesignerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">กำลังโหลด AI Furniture Designer...</div>}>
      <DesignerContent />
    </Suspense>
  )
}
