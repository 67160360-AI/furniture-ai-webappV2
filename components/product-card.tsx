'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/store'
import { useStore } from '@/components/store-context'
import { ShoppingBag, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    toast.success(`เพิ่ม "${product.name}" ลงในตะกร้าแล้ว!`, {
      description: `฿${product.price.toLocaleString()}`,
    })
  }

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <div className="group relative bg-[#FFFDF7] rounded-[32px] p-4 border border-[#E5DFEB] shadow-[12px_16px_32px_rgba(91,79,115,0.08),-8px_-8px_20px_rgba(255,255,255,0.85),inset_1px_1px_3px_rgba(255,255,255,0.85)] hover:-translate-y-1.5 hover:shadow-[14px_20px_36px_rgba(91,79,115,0.12),-8px_-8px_24px_rgba(255,255,255,0.95)] transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Badges */}
      <div className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-[#F1F2FA] flex items-center justify-center p-3 mb-4">
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-2.5 py-0.5 text-[11px] font-bold tracking-wide rounded-full bg-[#C0EFDC] text-emerald-900 shadow-sm">
              NEW
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 text-[11px] font-bold tracking-wide rounded-full bg-[#F6A3CA] text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${
            product.stock > 0
              ? 'bg-white/90 text-[#383139] border border-[#E5DFEB]'
              : product.madeToOrder
              ? 'bg-[#DED0F9] text-purple-900'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {product.stock > 0 ? `พร้อมส่ง (${product.stock})` : product.madeToOrder ? 'สั่งผลิต' : 'สินค้าหมด'}
          </span>
        </div>

        {/* Product Image */}
        <Link href={`/products/${product.slug}`} className="w-full h-full relative block">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-[11px] text-[#706A76] mb-1 font-medium">
          <span>{product.style}</span>
          <span>•</span>
          <span>{product.materials.join(', ')}</span>
        </div>

        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="font-bold text-base text-[#383139] group-hover:text-[#F6A3CA] transition-colors line-clamp-1 mb-1 font-heading">
            {product.name}
          </h3>
        </Link>

        {/* Dimensions */}
        <div className="text-[11px] text-[#706A76] mb-3">
          ขนาด: {product.widthCm} × {product.depthCm} × {product.heightCm} ซม.
        </div>

        {/* Price & Action */}
        <div className="mt-auto pt-2 border-t border-[#E5DFEB]/60 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#383139] font-heading">
                ฿{product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-[#706A76] line-through">
                  ฿{product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* AI Designer Shortcut */}
            <Link
              href={`/furniture-designer?product=${product.slug}`}
              className="p-2 rounded-full bg-[#DED0F9]/50 hover:bg-[#DED0F9] text-[#383139] transition active:scale-90"
              title="คำนวณและวิเคราะห์การผลิตด้วย AI"
            >
              <Sparkles className="w-4 h-4 text-purple-700" />
            </Link>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#F6A3CA] hover:bg-[#f38fb9] text-white text-xs font-bold shadow-sm active:scale-95 transition"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>ใส่ตะกร้า</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
