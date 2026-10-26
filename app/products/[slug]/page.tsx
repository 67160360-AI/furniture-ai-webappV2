'use client'

import React, { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CapsuleNavbar } from '@/components/capsule-navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { useStore } from '@/components/store-context'
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  Weight,
  Layers,
  Palette,
  Check,
  ChevronRight,
} from 'lucide-react'
import { toast } from 'sonner'

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { products, categories, addToCart } = useStore()

  const product = products.find((p) => p.slug === resolvedParams.slug)

  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Default')
  const [selectedMaterial, setSelectedMaterial] = useState(product?.materials?.[0] || 'Standard')

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F1F2FA]">
        <CapsuleNavbar />
        <div className="flex-1 max-w-xl mx-auto px-4 py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto mb-4 text-2xl">
            ⚠️
          </div>
          <h1 className="text-2xl font-bold text-[#383139] mb-2 font-heading">
            ไม่พบสินค้ารายการนี้
          </h1>
          <p className="text-sm text-[#706A76] mb-6">
            สินค้าอาจถูกลบหรือเปลี่ยนเส้นทาง กรุณาเลือกชมสินค้าชิ้นอื่นจากหน้าหลัก
          </p>
          <Link
            href="/products"
            className="px-6 py-3 rounded-full bg-[#F6A3CA] text-white font-bold text-sm shadow-sm"
          >
            กลับสู่หน้ารวมสินค้า
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const category = categories.find((c) => c.id === product.categoryId)
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4)

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedMaterial)
    toast.success(`เพิ่ม "${product.name}" ลงในตะกร้าแล้ว (${quantity} ชิ้น)`, {
      description: `สี: ${selectedColor} | วัสดุ: ${selectedMaterial}`,
    })
  }

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedMaterial)
    router.push('/cart')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F2FA]">
      <CapsuleNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-6 w-full">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#706A76] mb-6">
          <Link href="/" className="hover:text-[#383139]">หน้าแรก</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-[#383139]">เฟอร์นิเจอร์</Link>
          {category && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href={`/products?category=${category.slug}`} className="hover:text-[#383139]">
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#383139] font-medium truncate">{product.name}</span>
        </nav>

        {/* Main Product Container */}
        <div className="bg-[#FFFDF7] rounded-[44px] md:rounded-[56px] p-6 sm:p-10 lg:p-12 border border-[#E5DFEB] shadow-[16px_24px_48px_rgba(91,79,115,0.08),-10px_-10px_28px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(255,255,255,0.85)] mb-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left: Product Images Showcase */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative w-full aspect-square rounded-[36px] bg-[#F1F2FA] overflow-hidden border border-[#E5DFEB] shadow-[inset_2px_2px_6px_rgba(91,79,115,0.06)] flex items-center justify-center p-6">
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.isNew && (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#C0EFDC] text-emerald-900 shadow-sm">
                      NEW ARRIVAL
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#F6A3CA] text-white shadow-sm">
                      ลดทันที {discountPercent}%
                    </span>
                  )}
                </div>

                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain p-4 hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Thumbnails & AI Action Banner */}
              <div className="p-4 rounded-3xl bg-gradient-to-r from-[#DED0F9]/40 to-[#C0EFDC]/40 border border-[#DED0F9] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-white shadow-sm flex items-center justify-center text-purple-700">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#383139]">ต้องการปรับขนาดหรือสเปกการผลิต?</div>
                    <div className="text-[11px] text-[#706A76]">AI จะคำนวณการตัดแผ่นไม้และต้นทุนให้ใหม่ทันที</div>
                  </div>
                </div>

                <Link
                  href={`/furniture-designer?product=${product.slug}`}
                  className="px-4 py-2 rounded-full bg-[#383139] text-white text-xs font-bold shrink-0 shadow-sm hover:bg-black transition active:scale-95"
                >
                  เปิดใน AI Designer
                </Link>
              </div>
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              
              <div className="space-y-6">
                
                {/* Title & SKU */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F1F2FA] text-[#706A76]">
                      รหัสสินค้า: MF-{String(product.id).padStart(4, '0')}
                    </span>
                    <span className="text-xs font-semibold text-[#F6A3CA]">
                      {category?.name}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-extrabold text-[#383139] tracking-tight font-heading">
                    {product.name}
                  </h1>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pb-4 border-b border-[#E5DFEB]">
                  <span className="text-3xl sm:text-4xl font-black text-[#383139] font-heading">
                    ฿{product.price.toLocaleString()}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-lg text-[#706A76] line-through">
                      ฿{product.compareAtPrice.toLocaleString()}
                    </span>
                  )}
                  <span className={`ml-auto text-xs font-bold px-3 py-1 rounded-full ${
                    product.stock > 0
                      ? 'bg-[#C0EFDC] text-emerald-900'
                      : product.madeToOrder
                      ? 'bg-[#DED0F9] text-purple-900'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {product.stock > 0
                      ? `พร้อมส่ง (${product.stock} ชิ้นในสต็อก)`
                      : product.madeToOrder
                      ? `สั่งผลิต (${product.leadTimeDays} วัน)`
                      : 'สินค้าหมด'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-[#706A76] leading-relaxed">
                  {product.description}
                </p>

                {/* Color Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#383139] mb-2 flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-[#F6A3CA]" />
                    <span>เลือกโทนสี (Color Options):</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-2xl text-xs font-semibold border transition flex items-center gap-1.5 ${
                          selectedColor === color
                            ? 'bg-[#383139] text-white border-[#383139] shadow-sm'
                            : 'bg-[#F1F2FA] text-[#383139] border-[#E5DFEB] hover:bg-gray-200'
                        }`}
                      >
                        {selectedColor === color && <Check className="w-3.5 h-3.5" />}
                        <span>{color}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#383139] mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#F6A3CA]" />
                    <span>เลือกวัสดุ (Material):</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((mat) => (
                      <button
                        key={mat}
                        type="button"
                        onClick={() => setSelectedMaterial(mat)}
                        className={`px-4 py-2 rounded-2xl text-xs font-semibold border transition flex items-center gap-1.5 ${
                          selectedMaterial === mat
                            ? 'bg-[#F6A3CA] text-white border-[#F6A3CA] shadow-sm'
                            : 'bg-[#F1F2FA] text-[#383139] border-[#E5DFEB] hover:bg-gray-200'
                        }`}
                      >
                        {selectedMaterial === mat && <Check className="w-3.5 h-3.5" />}
                        <span>{mat}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Technical Specs Strip */}
                <div className="p-4 rounded-3xl bg-[#F1F2FA] border border-[#E5DFEB] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <div className="text-[11px] text-[#706A76] flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5 text-[#F6A3CA]" />
                      <span>กว้าง × ลึก × สูง</span>
                    </div>
                    <div className="font-bold text-[#383139] mt-0.5">
                      {product.widthCm}×{product.depthCm}×{product.heightCm} cm
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-[#706A76] flex items-center gap-1">
                      <Weight className="w-3.5 h-3.5 text-[#F6A3CA]" />
                      <span>น้ำหนัก</span>
                    </div>
                    <div className="font-bold text-[#383139] mt-0.5">{product.weightKg} kg</div>
                  </div>

                  <div>
                    <div className="text-[11px] text-[#706A76] flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#F6A3CA]" />
                      <span>ระยะเวลาส่ง</span>
                    </div>
                    <div className="font-bold text-[#383139] mt-0.5">{product.leadTimeDays} วันทำการ</div>
                  </div>

                  <div>
                    <div className="text-[11px] text-[#706A76] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#F6A3CA]" />
                      <span>การรับประกัน</span>
                    </div>
                    <div className="font-bold text-[#383139] mt-0.5">10 ปีเต็ม</div>
                  </div>
                </div>

              </div>

              {/* Purchase Buttons & Quantity Counter */}
              <div className="pt-8 border-t border-[#E5DFEB] space-y-4">
                
                <div className="flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-[#F1F2FA] rounded-full p-1 border border-[#E5DFEB]">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-full bg-white text-[#383139] font-bold text-base flex items-center justify-center hover:bg-gray-100 shadow-sm"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold text-sm text-[#383139]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-full bg-white text-[#383139] font-bold text-base flex items-center justify-center hover:bg-gray-100 shadow-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#F6A3CA] hover:bg-[#f08bb9] text-white font-bold text-sm shadow-[6px_8px_20px_rgba(246,163,202,0.4)] active:scale-98 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ใส่ตะกร้าสินค้า (฿{(product.price * quantity).toLocaleString()})</span>
                  </button>

                  {/* Buy Now Button */}
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="py-3.5 px-6 rounded-full bg-[#383139] hover:bg-black text-white font-bold text-sm shadow-sm active:scale-98 transition hidden sm:inline-flex"
                  >
                    สั่งซื้อทันที
                  </button>
                </div>

                <div className="flex items-center justify-center gap-6 text-xs text-[#706A76] pt-2">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    ส่งฟรีเมื่อครบ ฿30,000
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    สินค้าลิขสิทธิ์แท้ 100%
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-blue-600" />
                    เปลี่ยนคืนใน 14 วัน
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-[#383139] mb-6 font-heading">
              เฟอร์นิเจอร์ที่คุณอาจสนใจในหมวดนี้
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}
