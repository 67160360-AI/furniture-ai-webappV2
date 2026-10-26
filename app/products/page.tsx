'use client'

import React, { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CapsuleNavbar } from '@/components/capsule-navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { useStore } from '@/components/store-context'
import {
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  RotateCcw,
  PackageOpen,
} from 'lucide-react'

function ProductsContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  const initialQuery = searchParams.get('q') || ''

  const { products, categories } = useStore()

  const [search, setSearch] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [maxPrice, setMaxPrice] = useState<number>(50000)
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest')

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (search.trim()) {
          const q = search.toLowerCase()
          const matchName = p.name.toLowerCase().includes(q)
          const matchDesc = p.description.toLowerCase().includes(q)
          const matchMaterial = p.materials.some((m) => m.toLowerCase().includes(q))
          if (!matchName && !matchDesc && !matchMaterial) return false
        }
        // Category
        if (selectedCategory !== 'all') {
          const targetCat = categories.find((c) => c.slug === selectedCategory)
          if (targetCat && p.categoryId !== targetCat.id) return false
        }
        // In Stock only
        if (inStockOnly && p.stock <= 0 && !p.madeToOrder) return false
        // Max Price
        if (p.price > maxPrice) return false

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        return 0
      })
  }, [products, categories, search, selectedCategory, inStockOnly, maxPrice, sortBy])

  const handleResetFilters = () => {
    setSearch('')
    setSelectedCategory('all')
    setInStockOnly(false)
    setMaxPrice(50000)
    setSortBy('newest')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F2FA]">
      <CapsuleNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        
        {/* Header Banner */}
        <div className="bg-[#FFFDF7] rounded-[36px] p-6 sm:p-10 border border-[#E5DFEB] shadow-[12px_16px_36px_rgba(91,79,115,0.06),-8px_-8px_20px_rgba(255,255,255,0.85)] mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DED0F9]/50 text-xs font-bold text-purple-900 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>Maison Forme Catalog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#383139] tracking-tight font-heading">
              รายการเฟอร์นิเจอร์ทั้งหมด
            </h1>
            <p className="text-sm text-[#706A76] mt-1">
              ค้นพบเฟอร์นิเจอร์สั่งทำและพร้อมส่งที่ออกแบบอย่างประณีต สำหรับทุกพื้นที่ในบ้านคุณ
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#706A76]">
              แสดง {filteredProducts.length} จากทั้งหมด {products.length} รายการ
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#FFFDF7] rounded-[30px] p-4 sm:p-6 border border-[#E5DFEB] shadow-[8px_12px_24px_rgba(91,79,115,0.05)] mb-8 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <input
                type="text"
                placeholder="ค้นหาชื่อสินค้า, สไตล์, หรือวัสดุ (เช่น ไม้โอ๊ค, บูเคล่)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#F1F2FA] text-[#383139] text-sm pl-10 pr-4 py-2.5 rounded-full border border-transparent focus:border-[#F6A3CA] focus:bg-white focus:outline-none transition shadow-[inset_2px_2px_4px_rgba(91,79,115,0.06)]"
              />
              <Search className="w-4 h-4 text-[#706A76] absolute left-3.5 top-3.5" />
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-4 flex items-center gap-2">
              <span className="text-xs text-[#706A76] shrink-0 font-medium">เรียงตาม:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-[#F1F2FA] text-[#383139] text-xs sm:text-sm px-4 py-2 rounded-full border border-[#E5DFEB] focus:outline-none focus:border-[#F6A3CA]"
              >
                <option value="newest">สินค้ามาใหม่ / แนะนำ</option>
                <option value="price-asc">ราคา: ต่ำ &rarr; สูง</option>
                <option value="price-desc">ราคา: สูง &rarr; ต่ำ</option>
              </select>
            </div>

            {/* In stock toggle & Reset */}
            <div className="md:col-span-3 flex items-center justify-between sm:justify-end gap-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#383139] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#F6A3CA] focus:ring-[#F6A3CA] w-4 h-4"
                />
                <span>เฉพาะมีสินค้า</span>
              </label>

              <button
                type="button"
                onClick={handleResetFilters}
                className="p-2 text-xs text-[#706A76] hover:text-[#383139] flex items-center gap-1 rounded-full hover:bg-[#F1F2FA] transition"
                title="ล้างตัวกรอง"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">รีเซ็ต</span>
              </button>
            </div>

          </div>

          {/* Category Filter Horizontal Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-[#E5DFEB]/60">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === 'all'
                  ? 'bg-[#383139] text-white shadow-sm'
                  : 'bg-[#F1F2FA] text-[#706A76] hover:bg-gray-200'
              }`}
            >
              ทุกหมวดหมู่
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat.slug
                    ? 'bg-[#F6A3CA] text-white shadow-sm'
                    : 'bg-[#F1F2FA] text-[#706A76] hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Price Range Slider */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#706A76]">
            <div className="flex items-center gap-3">
              <span>ราคาสูงสุด:</span>
              <input
                type="range"
                min="3000"
                max="50000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-32 sm:w-48 accent-[#F6A3CA]"
              />
              <span className="font-bold text-[#383139]">฿{maxPrice.toLocaleString()}</span>
            </div>

            <div className="text-[11px] text-[#706A76]">
              * ทุกชิ้นสามารถกดปุ่ม AI เพื่อปรับขนาดและคำนวณชิ้นส่วนการผลิตใหม่ได้
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-[#FFFDF7] rounded-[36px] p-12 text-center border border-[#E5DFEB] shadow-sm max-w-lg mx-auto">
            <PackageOpen className="w-12 h-12 text-[#706A76] mx-auto mb-3 opacity-60" />
            <h3 className="font-bold text-lg text-[#383139] mb-1 font-heading">
              ไม่พบสินค้าตามเงื่อนไขที่ค้นหา
            </h3>
            <p className="text-xs text-[#706A76] mb-5">
              ลองเปลี่ยนคำค้นหา ปรับช่วงราคา หรือรีเซ็ตตัวกรองเพื่อดูสินค้าทั้งหมด
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full bg-[#F6A3CA] text-white text-xs font-bold shadow-sm"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">กำลังโหลดแคตตาล็อก...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
