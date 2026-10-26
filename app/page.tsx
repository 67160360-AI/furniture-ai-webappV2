'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CapsuleNavbar } from '@/components/capsule-navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { useStore } from '@/components/store-context'
import {
  Sparkles,
  ArrowRight,
  Armchair,
  Table,
  CheckCircle2,
  Sliders,
  Maximize2,
  Hammer,
  Layers,
  ChevronRight,
  Star,
} from 'lucide-react'

export default function HomePage() {
  const { products, categories } = useStore()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4)
  const newArrivals = products
    .filter((p) => p.isNew && !featuredProducts.some((featured) => featured.id === p.id))
    .slice(0, 4)

  const displayedProducts =
    selectedCategory === 'all'
      ? featuredProducts
      : products.filter(
          (p) =>
            p.categoryId ===
            categories.find((c) => c.slug === selectedCategory)?.id
        )

  const categoryIcons: Record<string, string> = {
    sofas: '🛋️',
    desks: '💻',
    'dining-tables': '🍽️',
    chairs: '🪑',
    bedroom: '🛏️',
    storage: '🗄️',
    living: '☕',
    office: '🏢',
    custom: '✨',
  }

  const categoryPastels = [
    'from-[#F6A3CA]/30 to-[#F6A3CA]/10 text-pink-900 border-[#F6A3CA]/40',
    'from-[#C0EFDC]/40 to-[#C0EFDC]/10 text-emerald-900 border-[#C0EFDC]/50',
    'from-[#DED0F9]/40 to-[#DED0F9]/10 text-purple-900 border-[#DED0F9]/50',
    'from-[#F9E7A8]/40 to-[#F9E7A8]/10 text-amber-900 border-[#F9E7A8]/50',
    'from-[#C5E5FB]/40 to-[#C5E5FB]/10 text-blue-900 border-[#C5E5FB]/50',
    'from-[#FFFDF7] to-[#F1F2FA] text-[#383139] border-[#E5DFEB]',
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F2FA]">
      <CapsuleNavbar />

      <main className="flex-1">
        {/* HERO SECTION - EDITORIAL CLAYMORPHISM */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-16">
          <div className="bg-[#FFFDF7] rounded-[44px] md:rounded-[60px] p-6 md:p-12 lg:p-16 border border-[#E5DFEB] shadow-[16px_24px_48px_rgba(91,79,115,0.09),-10px_-10px_28px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(255,255,255,0.85)] relative overflow-hidden">
            
            {/* Background Pastel Blobs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#DED0F9]/30 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-[#C0EFDC]/30 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              
              {/* Left Column: Brand Message */}
              <div className="lg:col-span-6 space-y-6">
                
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DED0F9]/40 border border-[#DED0F9] text-xs font-semibold text-purple-900 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>The New Era of Furniture Craft & AI Production</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#383139] tracking-tight leading-[1.15] font-heading">
                  Make Space for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e77ba9] via-[#9f85d6] to-[#4ab993]">
                    Better Living.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-[#706A76] leading-relaxed max-w-lg">
                  เฟอร์นิเจอร์สไตล์ Claymorphism Pastel ที่ออกแบบมาเพื่อพื้นที่และไลฟ์สไตล์ในแบบของคุณ 
                  พร้อมระบบ AI คำนวณชิ้นส่วนและวางแผนการผลิตจริง แม่นยำ สวยงาม และคุ้มค่าที่สุด
                </p>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#F6A3CA] hover:bg-[#f08bb9] text-white font-bold text-sm shadow-[6px_8px_20px_rgba(246,163,202,0.4),inset_1px_1px_2px_rgba(255,255,255,0.7)] active:scale-95 transition-all"
                  >
                    <span>เลือกชมเฟอร์นิเจอร์</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/furniture-designer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#DED0F9] hover:bg-[#d0beee] text-[#383139] font-bold text-sm shadow-[6px_8px_20px_rgba(222,208,249,0.5),inset_1px_1px_2px_rgba(255,255,255,0.8)] active:scale-95 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-purple-700" />
                    <span>ออกแบบพื้นที่ด้วย AI</span>
                  </Link>
                </div>

                {/* Quick Trust Highlights */}
                <div className="pt-6 border-t border-[#E5DFEB] grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xl font-extrabold text-[#383139]">100%</div>
                    <div className="text-xs text-[#706A76]">ไม้แท้มาตรฐานสูง</div>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-[#383139]">AI Engine</div>
                    <div className="text-xs text-[#706A76]">ถอดแบบ BOM อัตโนมัติ</div>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-[#383139]">10 ปี</div>
                    <div className="text-xs text-[#706A76]">รับประกันโครงสร้าง</div>
                  </div>
                </div>

              </div>

              {/* Right Column: Hero Visual Showcase */}
              <div className="lg:col-span-6 relative">
                <div className="relative w-full aspect-[4/3] rounded-[36px] overflow-hidden bg-gradient-to-tr from-[#F1F2FA] to-[#FFFDF7] border-2 border-white/80 shadow-[18px_24px_44px_rgba(91,79,115,0.12),-10px_-10px_24px_rgba(255,255,255,0.9)]">
                  <Image
                    src="/images/hero-living.png"
                    alt="Maison Forme Editorial Living Room"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  />

                  {/* Floating Highlight Card */}
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#FFFDF7]/95 backdrop-blur-md p-4 rounded-3xl border border-[#E5DFEB] shadow-[10px_14px_28px_rgba(91,79,115,0.15)] flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#C0EFDC] flex items-center justify-center text-xl shrink-0">
                      🛋️
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#383139]">Cloud Curve Sofa</div>
                      <div className="text-[11px] text-[#706A76]">ผ้าบูเคล่ ขอบมน 220 ซม.</div>
                      <div className="text-xs font-bold text-[#F6A3CA] mt-0.5">฿32,900</div>
                    </div>
                    <Link
                      href="/products/cloud-curve-sofa"
                      className="ml-auto p-2 rounded-full bg-[#F1F2FA] hover:bg-[#F6A3CA] hover:text-white transition"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURED CATEGORIES SECTION */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold tracking-wider text-[#F6A3CA] uppercase mb-1">
                Explore Our Collection
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#383139] font-heading">
                หมวดหมู่เฟอร์นิเจอร์ยอดนิยม
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-semibold text-[#706A76] hover:text-[#383139] flex items-center gap-1 group"
            >
              <span>ดูหมวดหมู่ทั้งหมด</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className={`group p-5 rounded-[32px] bg-gradient-to-b ${
                  categoryPastels[idx % categoryPastels.length]
                } border shadow-[8px_12px_24px_rgba(91,79,115,0.06),-6px_-6px_16px_rgba(255,255,255,0.85)] hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center`}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {categoryIcons[cat.slug] || '🪑'}
                </div>
                <h3 className="font-bold text-sm text-[#383139] mb-1 font-heading">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-[#706A76] opacity-80 group-hover:opacity-100">
                  เลือกชมสินค้า &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED PRODUCTS SECTION */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold tracking-wider text-[#F6A3CA] uppercase mb-1">
                Handcrafted for Comfort
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#383139] font-heading">
                สินค้าแนะนำประจำสัปดาห์
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === 'all'
                    ? 'bg-[#383139] text-white shadow-sm'
                    : 'bg-[#FFFDF7] text-[#706A76] border border-[#E5DFEB] hover:bg-white'
                }`}
              >
                ทั้งหมด
              </button>
              {categories.slice(0, 4).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === c.slug
                      ? 'bg-[#F6A3CA] text-white shadow-sm'
                      : 'bg-[#FFFDF7] text-[#706A76] border border-[#E5DFEB] hover:bg-white'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#FFFDF7] hover:bg-white text-[#383139] font-bold text-sm border border-[#E5DFEB] shadow-[6px_8px_18px_rgba(91,79,115,0.06),-4px_-4px_12px_rgba(255,255,255,0.9)] active:scale-95 transition"
            >
              <span>ดูแคตตาล็อกสินค้าทั้งหมด ({products.length} รายการ)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {newArrivals.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="text-xs font-bold tracking-wider text-purple-700 uppercase mb-1">
                  Just Arrived
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#383139] font-heading">
                  สินค้าใหม่ล่าสุด
                </h2>
              </div>
              <Link href="/products" className="text-sm font-bold text-purple-700 hover:underline">
                ดูสินค้าทั้งหมด <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* AI DESIGNER & PRODUCTION SOLVER PROMO BANNER */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="rounded-[44px] md:rounded-[56px] bg-gradient-to-br from-[#DED0F9] via-[#C0EFDC] to-[#C5E5FB] p-8 md:p-14 border border-white/60 shadow-[16px_24px_48px_rgba(91,79,115,0.12),-8px_-8px_24px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(255,255,255,0.7)] relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-white/80 text-xs font-bold text-[#383139] shadow-sm">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>AI Production Problem Solver</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#383139] tracking-tight leading-tight font-heading">
                  ออกแบบเฟอร์นิเจอร์จริง <br className="hidden sm:inline" />
                  คำนวณชิ้นส่วนและตัดวัสดุด้วย AI
                </h2>

                <p className="text-sm sm:text-base text-[#383139]/80 leading-relaxed max-w-xl">
                  หมดปัญหาแบบไม่ตรงกับหน้างานหรือเศษไม้เหลือทิ้ง! AI ของ Maison Forme 
                  ช่วยถอดชิ้นส่วน (BOM), วางแผนการตัดแผ่น 2D (Cutting Optimization), 
                  คำนวณต้นทุนวัสดุและค่าแรงอย่างละเอียด และสั่งผลิตได้ทันที
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white/75 backdrop-blur-sm p-3 rounded-2xl border border-white/80">
                    <div className="font-bold text-xs text-[#383139]">ถอดชิ้นส่วน BOM</div>
                    <div className="text-[11px] text-[#706A76]">แยกแผ่นข้าง แผ่นบน ชั้นวาง</div>
                  </div>
                  <div className="bg-white/75 backdrop-blur-sm p-3 rounded-2xl border border-white/80">
                    <div className="font-bold text-xs text-[#383139]">2D Bin Packing</div>
                    <div className="text-[11px] text-[#706A76]">วางแผนตัดลดเศษเหลือทิ้ง</div>
                  </div>
                  <div className="bg-white/75 backdrop-blur-sm p-3 rounded-2xl border border-white/80">
                    <div className="font-bold text-xs text-[#383139]">ประมาณต้นทุนจริง</div>
                    <div className="text-[11px] text-[#706A76]">แยกค่าไม้ ค่าตัด ค่าแรง</div>
                  </div>
                </div>

                <div className="pt-3">
                  <Link
                    href="/furniture-designer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#383139] hover:bg-[#201b21] text-white font-bold text-sm shadow-[8px_12px_24px_rgba(56,49,57,0.25)] active:scale-95 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-[#F6A3CA]" />
                    <span>เริ่มใช้งาน AI Furniture Designer ทันที</span>
                  </Link>
                </div>
              </div>

              {/* Graphic Preview */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-md bg-[#FFFDF7] rounded-[36px] p-6 border border-white shadow-[12px_16px_36px_rgba(91,79,115,0.15)] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5DFEB]">
                    <div className="font-bold text-sm text-[#383139]">ตัวอย่าง: ตู้เก็บของ 120×40×180 cm</div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#C0EFDC] font-bold text-emerald-900">
                      Feasible 98%
                    </span>
                  </div>

                  {/* 2D Cut Layout Mini Mockup */}
                  <div className="bg-[#F1F2FA] rounded-2xl p-3 border border-[#E5DFEB]">
                    <div className="text-[11px] font-semibold text-[#706A76] mb-2 flex justify-between">
                      <span>แผนผังตัดแผ่นไม้ 1220×2440 mm (MDF 18mm)</span>
                      <span className="text-emerald-700 font-bold">Waste 11.4%</span>
                    </div>
                    <div className="w-full h-32 rounded-xl bg-amber-100/70 border border-amber-300 relative overflow-hidden flex flex-wrap gap-1 p-1">
                      <div className="h-full w-1/3 bg-amber-300/80 rounded border border-amber-400 flex items-center justify-center text-[9px] font-bold text-amber-900">
                        แผ่นข้างซ้าย
                      </div>
                      <div className="h-full w-1/3 bg-amber-300/80 rounded border border-amber-400 flex items-center justify-center text-[9px] font-bold text-amber-900">
                        แผ่นข้างขวา
                      </div>
                      <div className="h-1/2 w-1/4 bg-amber-200/90 rounded border border-amber-400 flex items-center justify-center text-[8px] font-bold text-amber-900">
                        แผ่นท็อป
                      </div>
                      <div className="h-1/3 w-1/4 bg-rose-200/90 rounded border border-rose-300 flex items-center justify-center text-[8px] font-bold text-rose-800">
                        เศษตัด
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-[#F1F2FA] p-2 rounded-xl">
                      <div className="text-[10px] text-[#706A76]">จำนวนแผ่น</div>
                      <div className="font-bold text-[#383139]">3 แผ่น</div>
                    </div>
                    <div className="bg-[#F1F2FA] p-2 rounded-xl">
                      <div className="text-[10px] text-[#706A76]">ต้นทุน/ตัว</div>
                      <div className="font-bold text-[#383139]">฿3,850</div>
                    </div>
                    <div className="bg-[#F1F2FA] p-2 rounded-xl">
                      <div className="text-[10px] text-[#706A76]">เวลาก่อสร้าง</div>
                      <div className="font-bold text-[#383139]">5-7 วัน</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* CUSTOMER TESTIMONIALS & INSPIRATION */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 mb-10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-xs font-bold tracking-wider text-[#F6A3CA] uppercase mb-1">
              Customer Voices
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#383139] font-heading">
              ความประทับใจจากลูกค้าตัวจริง
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#FFFDF7] p-6 rounded-[36px] border border-[#E5DFEB] shadow-[10px_14px_28px_rgba(91,79,115,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#706A76] leading-relaxed mb-4">
                  "ชอบโซฟา Cloud Curve มากค่ะ สีครีมพาสเทลละมุนตา เบาะนุ่มแน่น นั่งทำงานหรือนอนดูหนังฟินมาก บริการส่งและประกอบถึงคอนโดตรงเวลาประทับใจค่ะ"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#E5DFEB]">
                <div className="w-9 h-9 rounded-full bg-[#F6A3CA]/30 flex items-center justify-center font-bold text-xs text-[#383139]">
                  KW
                </div>
                <div>
                  <div className="text-xs font-bold text-[#383139]">คุณกานดา วรารมย์</div>
                  <div className="text-[10px] text-[#706A76]">สุขุมวิท 39 &bull; สั่งซื้อ Cloud Curve Sofa</div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFDF7] p-6 rounded-[36px] border border-[#E5DFEB] shadow-[10px_14px_28px_rgba(91,79,115,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#706A76] leading-relaxed mb-4">
                  "ระบบ AI Furniture Designer ใช้งานดีเกินคาด! กรอกขนาดตู้ที่อยากได้แล้วระบบคำนวณแผ่นไม้และค่าแรงออกมาให้เลย สั่งผลิตแล้วงานเนียนขอบมนปลอดภัยกับลูกเล็กมาก"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#E5DFEB]">
                <div className="w-9 h-9 rounded-full bg-[#C0EFDC]/50 flex items-center justify-center font-bold text-xs text-[#383139]">
                  PT
                </div>
                <div>
                  <div className="text-xs font-bold text-[#383139]">คุณภาณุพันธ์ ตันติวิโรจน์</div>
                  <div className="text-[10px] text-[#706A76]">ราชพฤกษ์ &bull; สั่งผลิตตู้ผ่าน AI Designer</div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFDF7] p-6 rounded-[36px] border border-[#E5DFEB] shadow-[10px_14px_28px_rgba(91,79,115,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#706A76] leading-relaxed mb-4">
                  "โต๊ะทำงาน Lift Pro ปรับระดับไฟฟ้าลื่นมาก จำความสูงได้เป๊ะ ไม้ท็อปขอบมนไม่บาดแขนเวลาทำงานนานๆ สีไม้ตัดกับขาขาวพรีเมียมสมราคาค่ะ"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#E5DFEB]">
                <div className="w-9 h-9 rounded-full bg-[#DED0F9]/50 flex items-center justify-center font-bold text-xs text-[#383139]">
                  NL
                </div>
                <div>
                  <div className="text-xs font-bold text-[#383139]">คุณนลิน รัตนเดชา</div>
                  <div className="text-[10px] text-[#706A76]">อารีย์ &bull; สั่งซื้อ Lift Pro Standing Desk</div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
