'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CapsuleNavbar } from '@/components/capsule-navbar'
import { Footer } from '@/components/footer'
import { useStore } from '@/components/store-context'
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  Sparkles,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react'

export default function OrdersPage() {
  const { orders } = useStore()

  const statusBadges: Record<string, { label: string; color: string; icon: any }> = {
    pending: { label: 'รอชำระเงิน', color: 'bg-amber-100 text-amber-800 border-amber-200', icon: Clock },
    paid: { label: 'ชำระเงินแล้ว', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle2 },
    manufacturing: { label: 'กำลังผลิตตามแบบ', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Sparkles },
    shipped: { label: 'กำลังจัดส่ง', color: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: Truck },
    delivered: { label: 'จัดส่งสำเร็จแล้ว', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: CheckCircle2 },
    cancelled: { label: 'ยกเลิกแล้ว', color: 'bg-rose-100 text-rose-800 border-rose-200', icon: Clock },
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F2FA]">
      <CapsuleNavbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 md:px-8 py-8 w-full">
        
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DED0F9]/50 text-xs font-bold text-purple-900 mb-2">
            <Package className="w-3.5 h-3.5" />
            <span>Order History & Tracking</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#383139] tracking-tight font-heading">
            ประวัติคำสั่งซื้อและการผลิต
          </h1>
          <p className="text-sm text-[#706A76] mt-1">
            ติดตามสถานะการตัดวัสดุ การประกอบ และกำหนดการจัดส่งของเฟอร์นิเจอร์คุณ
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-[#FFFDF7] rounded-[36px] p-12 text-center border border-[#E5DFEB] shadow-sm max-w-md mx-auto my-12">
            <Package className="w-16 h-16 text-[#706A76] mx-auto mb-3 opacity-60" />
            <h2 className="text-lg font-bold text-[#383139] mb-1">ยังไม่มีประวัติคำสั่งซื้อ</h2>
            <p className="text-xs text-[#706A76] mb-6">
              คุณยังไม่เคยทำการสั่งซื้อเฟอร์นิเจอร์กับ Maison Forme
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-2.5 rounded-full bg-[#F6A3CA] text-white text-xs font-bold"
            >
              เลือกชมสินค้า
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusInfo = statusBadges[order.status] || statusBadges.pending
              const StatusIcon = statusInfo.icon

              return (
                <div
                  key={order.id}
                  className="bg-[#FFFDF7] rounded-[36px] p-6 sm:p-8 border border-[#E5DFEB] shadow-[12px_16px_36px_rgba(91,79,115,0.06),-6px_-6px_18px_rgba(255,255,255,0.85)] space-y-6"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5DFEB]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base text-[#383139] font-heading">
                          คำสั่งซื้อ #{order.orderNumber}
                        </span>
                        <span
                          className={`text-xs px-3 py-0.5 rounded-full font-bold border flex items-center gap-1 ${statusInfo.color}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span>{statusInfo.label}</span>
                        </span>
                      </div>
                      <div className="text-xs text-[#706A76] mt-0.5">
                        วันที่สั่ง: {new Date(order.createdAt).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-[#706A76]">ยอดรวมคำสั่งซื้อ</div>
                      <div className="text-xl font-black text-[#383139] font-heading">
                        ฿{order.total.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Production Timeline Visual */}
                  <div className="bg-[#F1F2FA] rounded-2xl p-4 border border-[#E5DFEB]">
                    <div className="text-xs font-bold text-[#383139] mb-3">สถานะความคืบหน้า (Production Pipeline)</div>
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                      <div className={`p-2 rounded-xl ${['paid', 'manufacturing', 'shipped', 'delivered'].includes(order.status) ? 'bg-emerald-100 text-emerald-900 font-bold' : 'bg-white text-gray-500'}`}>
                        1. รับคำสั่งซื้อ
                      </div>
                      <div className={`p-2 rounded-xl ${['manufacturing', 'shipped', 'delivered'].includes(order.status) ? 'bg-purple-100 text-purple-900 font-bold' : 'bg-white text-gray-500'}`}>
                        2. AI ตัดไม้ & ประกอบ
                      </div>
                      <div className={`p-2 rounded-xl ${['shipped', 'delivered'].includes(order.status) ? 'bg-indigo-100 text-indigo-900 font-bold' : 'bg-white text-gray-500'}`}>
                        3. ตรวจ QC & ขนส่ง
                      </div>
                      <div className={`p-2 rounded-xl ${order.status === 'delivered' ? 'bg-emerald-200 text-emerald-900 font-bold' : 'bg-white text-gray-500'}`}>
                        4. จัดส่งสำเร็จ
                      </div>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-[#383139]">รายการสินค้าในคำสั่งซื้อ:</div>
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-[#E5DFEB]"
                      >
                        <div className="relative w-14 h-14 rounded-xl bg-[#F1F2FA] overflow-hidden shrink-0 flex items-center justify-center">
                          <Image
                            src={item.imageUrl || '/images/placeholder.svg'}
                            alt={item.productName}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-xs text-[#383139]">{item.productName}</div>
                          <div className="text-[11px] text-[#706A76]">
                            สี: {item.color} | วัสดุ: {item.material} | จำนวน: {item.quantity} ชิ้น
                          </div>
                          {item.customSpec && (
                            <div className="text-[10px] text-purple-700 font-medium">
                              * ผลิตตามขนาด AI: {item.customSpec.width}×{item.customSpec.depth}×{item.customSpec.height} cm
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xs text-[#383139]">
                            ฿{item.lineTotal.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-[#706A76]">
                            (฿{item.unitPrice.toLocaleString()}/ชิ้น)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping & Recipient Details */}
                  <div className="pt-2 border-t border-[#E5DFEB] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#706A76]">
                    <div>
                      <strong className="text-[#383139] block mb-0.5">สถานที่จัดส่ง:</strong>
                      <div>{order.recipientName} ({order.phone})</div>
                      <div>{order.address}, {order.city} {order.postalCode}</div>
                      {order.note && <div className="text-[11px] italic mt-0.5">หมายเหตุ: {order.note}</div>}
                    </div>

                    <div>
                      <strong className="text-[#383139] block mb-0.5">วิธีชำระและขนส่ง:</strong>
                      <div>การชำระเงิน: {order.paymentMethod.toUpperCase()} ({order.paymentStatus})</div>
                      <div>วิธีจัดส่ง: {order.shippingMethod} (ค่าส่ง: ฿{order.shippingFee.toLocaleString()})</div>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}
