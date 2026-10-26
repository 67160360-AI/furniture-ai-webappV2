'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useStore } from '@/components/store-context'
import {
  Package,
  PlusCircle,
  Search,
  Trash2,
  Edit,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import { toast } from 'sonner'

export default function AdminProductsPage() {
  const { products, categories, updateProduct, deleteProduct } = useStore()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filteredProducts = products.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase()
      if (!p.name.toLowerCase().includes(q) && !p.slug.toLowerCase().includes(q)) return false
    }
    if (categoryFilter !== 'all') {
      const cat = categories.find((c) => c.slug === categoryFilter)
      if (cat && p.categoryId !== cat.id) return false
    }
    return true
  })

  const handleStockChange = (productId: number, newStock: number) => {
    updateProduct(productId, { stock: Math.max(0, newStock) })
    toast.success('อัปเดตจำนวนสต็อกแล้ว')
  }

  const handleDelete = (productId: number, name: string) => {
    if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบสินค้า "${name}"?`)) {
      deleteProduct(productId)
      toast.success(`ลบสินค้า "${name}" สำเร็จ`)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#383139] tracking-tight font-heading">
            จัดการสินค้า (Products Management)
          </h1>
          <p className="text-xs sm:text-sm text-[#706A76] mt-1">
            เพิ่ม แก้ไข ลบ ปรับสต็อก และตั้งค่าการขายเฟอร์นิเจอร์ทั้งหมด
          </p>
        </div>

        <Link
          href="/admin/product-form"
          className="px-5 py-3 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>เพิ่มสินค้าใหม่</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FFFDF7] rounded-3xl p-4 border border-[#E5DFEB] shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="ค้นหาชื่อสินค้า, รหัส (slug)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F1F2FA] text-[#383139] text-xs pl-9 pr-4 py-2.5 rounded-full border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
          />
          <Search className="w-4 h-4 text-[#706A76] absolute left-3 top-3" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#706A76] shrink-0">หมวดหมู่:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#F1F2FA] text-[#383139] text-xs px-3 py-2 rounded-full border border-[#E5DFEB] focus:outline-none"
          >
            <option value="all">ทั้งหมด ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-[#FFFDF7] rounded-3xl border border-[#E5DFEB] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F1F2FA] border-b border-[#E5DFEB] text-[#706A76]">
              <tr>
                <th className="py-3 px-4">รูปภาพ</th>
                <th className="py-3 px-4">ชื่อสินค้า</th>
                <th className="py-3 px-4">หมวดหมู่</th>
                <th className="py-3 px-4">ราคาขาย</th>
                <th className="py-3 px-4">สต็อก (ชิ้น)</th>
                <th className="py-3 px-4">สถานะ</th>
                <th className="py-3 px-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DFEB]/60">
              {filteredProducts.map((p) => {
                const cat = categories.find((c) => c.id === p.categoryId)
                return (
                  <tr key={p.id} className="hover:bg-[#F1F2FA]/50 transition">
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-12 rounded-xl bg-[#F1F2FA] overflow-hidden shrink-0 flex items-center justify-center">
                        <Image
                          src={p.imageUrl || '/images/placeholder.svg'}
                          alt={p.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#383139]">{p.name}</div>
                      <div className="text-[10px] text-[#706A76] font-mono">{p.slug}</div>
                    </td>
                    <td className="py-3 px-4 text-[#706A76]">
                      {cat?.name || 'ทั่วไป'}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#383139]">
                      ฿{p.price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min="0"
                        value={p.stock}
                        onChange={(e) => handleStockChange(p.id, Number(e.target.value))}
                        className="w-16 bg-[#F1F2FA] text-center font-bold text-[#383139] text-xs py-1 px-2 rounded-xl border border-[#E5DFEB]"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.stock > 0
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.madeToOrder
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {p.stock > 0 ? 'พร้อมส่ง' : p.madeToOrder ? 'สั่งผลิต' : 'หมด'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-[#706A76] hover:bg-gray-100"
                          title="ดูบนหน้าร้าน"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/product-form?id=${p.id}`}
                          className="p-1.5 rounded-lg text-purple-700 hover:bg-purple-50"
                          title="แก้ไขข้อมูล"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                          title="ลบสินค้านี้"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
