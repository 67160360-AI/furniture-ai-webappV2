'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useStore } from '@/components/store-context'
import { Order } from '@/lib/store'
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Truck,
  Eye,
  Filter,
} from 'lucide-react'
import { toast } from 'sonner'

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore()
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((o) => {
    if (filterStatus !== 'all' && o.status !== filterStatus) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      if (
        !o.orderNumber.toLowerCase().includes(q) &&
        !o.recipientName.toLowerCase().includes(q) &&
        !o.phone.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  const handleStatusChange = (orderId: number, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus)
    toast.success(`อัปเดตสถานะคำสั่งซื้อ #${orderId} เป็น "${newStatus}" เรียบร้อย`)
  }

  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Top Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#383139] tracking-tight font-heading">
          จัดการคำสั่งซื้อ (Orders Management)
        </h1>
        <p className="text-xs sm:text-sm text-[#706A76] mt-1">
          ตรวจสอบคำสั่งซื้อ อัปเดตสถานะการตัดวัสดุ และจัดการการจัดส่งสินค้า
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FFFDF7] rounded-3xl p-4 border border-[#E5DFEB] shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="ค้นหาเลขที่คำสั่งซื้อ, ชื่อผู้รับ, เบอร์โทร..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F1F2FA] text-[#383139] text-xs pl-9 pr-4 py-2.5 rounded-full border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
          />
          <Search className="w-4 h-4 text-[#706A76] absolute left-3 top-3" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#706A76] shrink-0">สถานะ:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#F1F2FA] text-[#383139] text-xs px-3 py-2 rounded-full border border-[#E5DFEB] focus:outline-none font-medium"
          >
            <option value="all">ทั้งหมด ({orders.length})</option>
            <option value="pending">รอชำระเงิน (Pending)</option>
            <option value="paid">ชำระแล้ว (Paid)</option>
            <option value="manufacturing">กำลังผลิต AI (Manufacturing)</option>
            <option value="shipped">กำลังจัดส่ง (Shipped)</option>
            <option value="delivered">ส่งสำเร็จ (Delivered)</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#FFFDF7] rounded-3xl border border-[#E5DFEB] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F1F2FA] border-b border-[#E5DFEB] text-[#706A76]">
              <tr>
                <th className="py-3 px-4">เลขที่คำสั่งซื้อ</th>
                <th className="py-3 px-4">วันที่สั่ง</th>
                <th className="py-3 px-4">ชื่อผู้รับ / เบอร์</th>
                <th className="py-3 px-4">ยอดชำระสุทธิ</th>
                <th className="py-3 px-4">การชำระเงิน</th>
                <th className="py-3 px-4">สถานะคำสั่งซื้อ</th>
                <th className="py-3 px-4 text-right">รายละเอียด</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DFEB]/60">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#F1F2FA]/50 transition">
                  <td className="py-3 px-4 font-bold text-[#383139]">
                    {order.orderNumber}
                  </td>
                  <td className="py-3 px-4 text-[#706A76]">
                    {new Date(order.createdAt).toLocaleDateString('th-TH', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#383139]">{order.recipientName}</div>
                    <div className="text-[10px] text-[#706A76]">{order.phone}</div>
                  </td>
                  <td className="py-3 px-4 font-extrabold text-[#383139]">
                    ฿{order.total.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.paymentStatus === 'paid' ? 'ชำระแล้ว' : 'ยังไม่ชำระ'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                      className={`text-xs font-bold py-1 px-2.5 rounded-xl border border-transparent focus:outline-none focus:border-purple-600 ${
                        order.status === 'manufacturing'
                          ? 'bg-purple-100 text-purple-900'
                          : order.status === 'shipped'
                          ? 'bg-indigo-100 text-indigo-900'
                          : order.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      <option value="pending">รอชำระเงิน (Pending)</option>
                      <option value="paid">ชำระแล้ว (Paid)</option>
                      <option value="manufacturing">กำลังผลิต (Manufacturing)</option>
                      <option value="shipped">กำลังจัดส่ง (Shipped)</option>
                      <option value="delivered">ส่งสำเร็จ (Delivered)</option>
                      <option value="cancelled">ยกเลิก (Cancelled)</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="px-3 py-1.5 rounded-xl bg-[#F1F2FA] hover:bg-purple-100 text-purple-900 font-semibold text-xs transition"
                    >
                      ดูใบสั่ง
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-[#FFFDF7] rounded-[36px] max-w-xl w-full p-6 sm:p-8 border border-[#E5DFEB] shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFEB]">
              <div>
                <h3 className="font-extrabold text-lg text-[#383139] font-heading">
                  ใบคำสั่งซื้อ #{selectedOrder.orderNumber}
                </h3>
                <div className="text-xs text-[#706A76]">
                  วันที่: {new Date(selectedOrder.createdAt).toLocaleString('th-TH')}
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-[#F1F2FA] text-[#383139] font-bold text-sm hover:bg-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Recipient and Address */}
            <div className="p-4 rounded-2xl bg-[#F1F2FA] text-xs space-y-1">
              <div className="font-bold text-[#383139] text-sm">{selectedOrder.recipientName} ({selectedOrder.phone})</div>
              <div className="text-[#706A76]">อีเมล: {selectedOrder.email}</div>
              <div className="text-[#383139]">{selectedOrder.address}, {selectedOrder.city} {selectedOrder.postalCode}</div>
              {selectedOrder.note && <div className="text-[11px] italic text-[#706A76]">หมายเหตุ: {selectedOrder.note}</div>}
            </div>

            {/* Items */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#383139]">รายการสินค้า ({selectedOrder.items.length})</div>
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E5DFEB] text-xs">
                  <div>
                    <div className="font-bold text-[#383139]">{item.productName}</div>
                    <div className="text-[11px] text-[#706A76]">สี: {item.color} | วัสดุ: {item.material} | {item.quantity} ชิ้น</div>
                  </div>
                  <div className="font-bold text-[#383139]">฿{item.lineTotal.toLocaleString()}</div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-2 border-t border-[#E5DFEB] space-y-1 text-xs">
              <div className="flex justify-between">
                <span>ราคาสินค้ารวม:</span>
                <span className="font-semibold">฿{selectedOrder.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าจัดส่ง:</span>
                <span className="font-semibold">฿{selectedOrder.shippingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#383139] pt-2 border-t">
                <span>ยอดรวมสุทธิ:</span>
                <span>฿{selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-3 rounded-full bg-[#383139] text-white text-xs font-bold"
            >
              ปิดหน้าต่าง
            </button>

          </div>
        </div>
      )}

    </div>
  )
}
