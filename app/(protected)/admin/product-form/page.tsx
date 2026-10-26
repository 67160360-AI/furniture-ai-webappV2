'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useStore } from '@/components/store-context'
import { ChevronLeft, Save, Sparkles, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

function ProductFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  const { products, categories, refreshCatalog } = useStore()

  const isEdit = !!editId
  const existing = isEdit ? products.find((p) => p.id === Number(editId)) : null

  // Form States
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 1)
  const [price, setPrice] = useState<number>(9900)
  const [compareAtPrice, setCompareAtPrice] = useState<string>('')
  const [stock, setStock] = useState<number>(5)
  const [style, setStyle] = useState('Modern Claymorphism')
  const [materials, setMaterials] = useState('ไม้โอ๊ค, ผ้าบูเคล่')
  const [colors, setColors] = useState('ครีม, ชมพูอ่อน, เขียวมิ้นต์')
  const [widthCm, setWidthCm] = useState<number>(120)
  const [depthCm, setDepthCm] = useState<number>(60)
  const [heightCm, setHeightCm] = useState<number>(75)
  const [weightKg, setWeightKg] = useState<number>(20)
  const [leadTimeDays, setLeadTimeDays] = useState<number>(3)
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('/images/products/cloud-curve-sofa.png')
  const [isFeatured, setIsFeatured] = useState(false)
  const [isNew, setIsNew] = useState(true)
  const [madeToOrder, setMadeToOrder] = useState(false)
  const [pending, setPending] = useState(false)

  // Populate form if editing
  useEffect(() => {
    if (existing) {
      setName(existing.name)
      setSlug(existing.slug)
      setCategoryId(existing.categoryId)
      setPrice(existing.price)
      setCompareAtPrice(existing.compareAtPrice ? String(existing.compareAtPrice) : '')
      setStock(existing.stock)
      setStyle(existing.style || '')
      setMaterials(existing.materials.join(', '))
      setColors(existing.colors.join(', '))
      setWidthCm(existing.widthCm)
      setDepthCm(existing.depthCm)
      setHeightCm(existing.heightCm)
      setWeightKg(existing.weightKg)
      setLeadTimeDays(existing.leadTimeDays)
      setDescription(existing.description)
      setImageUrl(existing.imageUrl)
      setIsFeatured(existing.isFeatured)
      setIsNew(existing.isNew)
      setMadeToOrder(existing.madeToOrder)
    }
  }, [existing])

  const handleAutoSlug = (text: string) => {
    setName(text)
    if (!isEdit) {
      const generated = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
      if (generated) setSlug(generated)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !slug.trim()) {
      toast.error('กรุณากรอกชื่อสินค้าและ slug')
      return
    }
    if (isEdit && !existing) {
      toast.error('กำลังโหลดข้อมูลสินค้า กรุณารอสักครู่แล้วลองอีกครั้ง')
      return
    }

    const payload = {
      name,
      slug,
      categoryId: Number(categoryId),
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
      stock: Number(stock),
      status: 'active' as const,
      isFeatured,
      isNew,
      madeToOrder,
      leadTimeDays: Number(leadTimeDays),
      style,
      materials: materials.split(',').map((s) => s.trim()).filter(Boolean),
      colors: colors.split(',').map((s) => s.trim()).filter(Boolean),
      widthCm: Number(widthCm),
      depthCm: Number(depthCm),
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      description,
      imageUrl,
    }

    setPending(true)
    try {
      const response = await fetch(isEdit && existing ? `/api/admin/products/${existing.id}` : '/api/admin/products', {
        method: isEdit && existing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok) throw new Error(result?.error || 'บันทึกสินค้าไม่สำเร็จ')
      await refreshCatalog()
      toast.success(isEdit ? `อัปเดตข้อมูลสินค้า "${name}" สำเร็จ` : `เพิ่มสินค้าใหม่ "${name}" สำเร็จ`)
      router.push('/admin/products')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'บันทึกสินค้าไม่สำเร็จ')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-2xl bg-white border border-[#E5DFEB] hover:bg-gray-100 text-[#383139]"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#383139] tracking-tight font-heading">
              {isEdit ? `แก้ไขสินค้า: ${existing?.name}` : 'เพิ่มสินค้าใหม่ลงในระบบ'}
            </h1>
            <p className="text-xs text-[#706A76]">
              กรอกข้อมูล มิติขนาด สต็อก และรายละเอียดสำหรับการจำหน่าย
            </p>
          </div>
        </div>
      </div>

      {/* Product Form Card */}
      <form onSubmit={handleSubmit} className="bg-[#FFFDF7] rounded-[38px] p-6 sm:p-8 border border-[#E5DFEB] shadow-sm space-y-6">
        
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-purple-900 uppercase tracking-wider pb-2 border-b border-[#E5DFEB]">
            1. ข้อมูลพื้นฐานสินค้า
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">ชื่อสินค้า (Product Name) *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleAutoSlug(e.target.value)}
                placeholder="เช่น Cloud Curve Sofa"
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">รหัส URL (Slug) *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="cloud-curve-sofa"
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">หมวดหมู่สินค้า *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-[#E5DFEB] focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">สไตล์การออกแบบ</label>
              <input
                type="text"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                placeholder="เช่น Soft Pastel, Modern, Japandi"
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#383139] mb-1">คำอธิบายสินค้าอย่างละเอียด</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ระบุจุดเด่น วัสดุ และฟังก์ชันการใช้งาน..."
              className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="space-y-4 pt-4 border-t border-[#E5DFEB]">
          <h2 className="text-sm font-bold text-purple-900 uppercase tracking-wider pb-2 border-b border-[#E5DFEB]">
            2. ราคาและสต็อกสินค้า
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">ราคาขายจริง (บาท) *</label>
              <input
                type="number"
                min="0"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">ราคาเต็มก่อนลด (Compare at Price)</label>
              <input
                type="number"
                min="0"
                value={compareAtPrice}
                onChange={(e) => setCompareAtPrice(e.target.value)}
                placeholder="เว้นว่างถ้าไม่มีส่วนลด"
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">จำนวนสต็อก (ชิ้น) *</label>
              <input
                type="number"
                min="0"
                required
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none font-bold"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#383139] cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded text-purple-700 w-4 h-4"
              />
              <span>แสดงเป็นสินค้าแนะนำ (Featured)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-[#383139] cursor-pointer">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="rounded text-purple-700 w-4 h-4"
              />
              <span>ติดป้ายสินค้าใหม่ (New Arrival)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-[#383139] cursor-pointer">
              <input
                type="checkbox"
                checked={madeToOrder}
                onChange={(e) => setMadeToOrder(e.target.checked)}
                className="rounded text-purple-700 w-4 h-4"
              />
              <span>สินค้าสั่งผลิต (Made to Order)</span>
            </label>
          </div>
        </div>

        {/* Dimensions & Materials */}
        <div className="space-y-4 pt-4 border-t border-[#E5DFEB]">
          <h2 className="text-sm font-bold text-purple-900 uppercase tracking-wider pb-2 border-b border-[#E5DFEB]">
            3. ขนาด วัสดุ และการจัดส่ง
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">กว้าง (ซม.)</label>
              <input
                type="number"
                value={widthCm}
                onChange={(e) => setWidthCm(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-3 py-2 rounded-xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">ลึก (ซม.)</label>
              <input
                type="number"
                value={depthCm}
                onChange={(e) => setDepthCm(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-3 py-2 rounded-xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">สูง (ซม.)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-3 py-2 rounded-xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">น้ำหนัก (กก.)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-3 py-2 rounded-xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">วัสดุ (คั่นด้วยจุลภาค , )</label>
              <input
                type="text"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                placeholder="เช่น ไม้โอ๊คแท้, ผ้าบูเคล่"
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#383139] mb-1">สีที่มีให้เลือก (คั่นด้วยจุลภาค , )</label>
              <input
                type="text"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
                placeholder="เช่น ครีม, ชมพูอ่อน, เขียวมิ้นต์"
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#383139] mb-1">ลิงก์รูปภาพสินค้า (Image URL)</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/images/products/cloud-curve-sofa.png"
              className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Submit Bar */}
        <div className="pt-4 border-t border-[#E5DFEB] flex items-center justify-end gap-3">
          <Link
            href="/admin/products"
            className="px-6 py-3 rounded-full bg-[#F1F2FA] text-[#383139] text-xs font-bold hover:bg-gray-200 transition"
          >
            ยกเลิก
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="px-8 py-3 rounded-full bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-sm transition flex items-center gap-2 disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{pending ? 'กำลังบันทึก…' : isEdit ? 'บันทึกการแก้ไข' : 'บันทึกและเพิ่มสินค้าใหม่'}</span>
          </button>
        </div>

      </form>

    </div>
  )
}

export default function ProductFormPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">กำลังโหลดฟอร์มสินค้า...</div>}>
      <ProductFormContent />
    </Suspense>
  )
}
