'use client'

import React from 'react'
import Link from 'next/link'
import { useStore } from '@/components/store-context'
import {
  DollarSign,
  ShoppingBag,
  Package,
  AlertCircle,
  PlusCircle,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react'

export default function AdminDashboardPage() {
  const { products, orders } = useStore()

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0)

  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 3)
  const outOfStockProducts = products.filter((p) => p.stock === 0 && !p.madeToOrder)

  return (
    <div className="space-y-8 max-w-6xl">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#383139] tracking-tight font-heading">
            แผงควบคุมหลัก (Admin Dashboard)
          </h1>
          <p className="text-xs sm:text-sm text-[#706A76] mt-1">
            สรุปภาพรวมยอดขาย คำสั่งซื้อ และสถานะสต็อกเฟอร์นิเจอร์ทั้งหมดของ Maison Forme
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/product-form"
            className="px-4 py-2.5 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>เพิ่มสินค้าใหม่</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#FFFDF7] p-5 rounded-3xl border border-[#E5DFEB] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#706A76] mb-2">
            <span>ยอดขายรวมทั้งหมด</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#383139] font-heading">
            ฿{totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>จาก {orders.length} คำสั่งซื้อ</span>
          </div>
        </div>

        <div className="bg-[#FFFDF7] p-5 rounded-3xl border border-[#E5DFEB] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#706A76] mb-2">
            <span>คำสั่งซื้อรอดำเนินการ</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-900 font-heading">
            {orders.filter((o) => o.status === 'manufacturing' || o.status === 'pending').length}
          </div>
          <div className="text-[11px] text-[#706A76] mt-1">
            กำลังผลิตหรือเตรียมส่ง
          </div>
        </div>

        <div className="bg-[#FFFDF7] p-5 rounded-3xl border border-[#E5DFEB] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#706A76] mb-2">
            <span>จำนวนสินค้าในระบบ</span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#383139] font-heading">
            {products.length} รายการ
          </div>
          <div className="text-[11px] text-blue-700 font-semibold mt-1">
            พร้อมส่ง {products.filter((p) => p.stock > 0).length} รายการ
          </div>
        </div>

        <div className="bg-[#FFFDF7] p-5 rounded-3xl border border-[#E5DFEB] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#706A76] mb-2">
            <span>เตือนสินค้าใกล้หมด</span>
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-600 font-heading">
            {lowStockProducts.length + outOfStockProducts.length}
          </div>
          <div className="text-[11px] text-rose-600 font-semibold mt-1">
            หมด {outOfStockProducts.length} | เหลือน้อย {lowStockProducts.length}
          </div>
        </div>

      </div>

      {/* Recent Orders & Stock Alert Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Orders List */}
        <div className="lg:col-span-8 bg-[#FFFDF7] rounded-3xl p-6 border border-[#E5DFEB] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5DFEB]">
            <div>
              <h2 className="font-bold text-base text-[#383139] font-heading">
                คำสั่งซื้อล่าสุด (Recent Orders)
              </h2>
              <div className="text-xs text-[#706A76]">รายการสั่งซื้อและสถานะการผลิต</div>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
            >
              <span>ดูทั้งหมด</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E5DFEB] text-[#706A76]">
                  <th className="py-2">เลขที่คำสั่งซื้อ</th>
                  <th className="py-2">ผู้รับ</th>
                  <th className="py-2">ยอดเงิน</th>
                  <th className="py-2">สถานะ</th>
                  <th className="py-2 text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFEB]/60">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-[#F1F2FA]/50">
                    <td className="py-3 font-bold text-[#383139]">{order.orderNumber}</td>
                    <td className="py-3 text-[#706A76]">{order.recipientName}</td>
                    <td className="py-3 font-bold text-[#383139]">฿{order.total.toLocaleString()}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 uppercase">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href="/admin/orders"
                        className="text-xs text-purple-700 font-semibold hover:underline"
                      >
                        อัปเดตสถานะ
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-4 bg-[#FFFDF7] rounded-3xl p-6 border border-[#E5DFEB] shadow-sm space-y-4">
          <div className="pb-3 border-b border-[#E5DFEB]">
            <h2 className="font-bold text-base text-[#383139] font-heading">
              เตือนสต็อกสินค้า
            </h2>
            <div className="text-xs text-[#706A76]">สินค้าที่ต้องเติมสต็อกหรือสั่งผลิต</div>
          </div>

          <div className="space-y-2.5">
            {[...lowStockProducts, ...outOfStockProducts].slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="p-3 bg-[#F1F2FA] rounded-2xl flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-[#383139] line-clamp-1">{p.name}</div>
                  <div className="text-[10px] text-[#706A76]">
                    คงเหลือ: <span className="font-bold text-rose-600">{p.stock} ชิ้น</span>
                  </div>
                </div>
                <Link
                  href={`/admin/product-form?id=${p.id}`}
                  className="px-3 py-1 rounded-full bg-white text-xs font-semibold text-[#383139] shadow-xs hover:bg-gray-100"
                >
                  แก้ไข
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
