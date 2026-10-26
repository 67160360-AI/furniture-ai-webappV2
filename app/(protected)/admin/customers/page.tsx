'use client'

import React, { useState } from 'react'
import { useStore } from '@/components/store-context'
import { Users, Search, Shield, UserCheck } from 'lucide-react'

export default function AdminCustomersPage() {
  const { orders } = useStore()
  const [search, setSearch] = useState('')

  // Simulated customers list from real orders & registered accounts
  const customers = [
    {
      id: 'cust-1',
      name: 'คุณพัชราภรณ์ วงศ์สว่าง',
      email: 'patcha@example.com',
      phone: '089-123-4567',
      role: 'customer',
      ordersCount: 2,
      totalSpent: 45800,
      joined: '2026-08-15',
    },
    {
      id: 'cust-2',
      name: 'นายธีรเดช สุขเกษม',
      email: 'teeradej@example.com',
      phone: '081-987-6543',
      role: 'customer',
      ordersCount: 1,
      totalSpent: 19400,
      joined: '2026-09-02',
    },
    {
      id: 'cust-3',
      name: 'คุณกานดา วรารมย์',
      email: 'kanda@example.com',
      phone: '085-555-7890',
      role: 'customer',
      ordersCount: 1,
      totalSpent: 32900,
      joined: '2026-10-10',
    },
    {
      id: 'admin-1',
      name: 'Maison Forme Admin',
      email: 'admin@maisonforme.co',
      phone: '02-000-0000',
      role: 'admin',
      ordersCount: 0,
      totalSpent: 0,
      joined: '2026-01-01',
    },
  ]

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  )

  return (
    <div className="space-y-6 max-w-5xl">
      
      <div>
        <h1 className="text-3xl font-extrabold text-[#383139] tracking-tight font-heading">
          จัดการสมาชิกและลูกค้า (Customers Management)
        </h1>
        <p className="text-xs sm:text-sm text-[#706A76] mt-1">
          ตรวจสอบรายชื่อสมาชิก ประวัติการสั่งซื้อ และกำหนดสิทธิ์การเข้าถึงระบบ
        </p>
      </div>

      <div className="bg-[#FFFDF7] rounded-3xl p-4 border border-[#E5DFEB] shadow-sm flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="ค้นหาชื่อลูกค้า, อีเมล, หรือเบอร์โทร..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F1F2FA] text-[#383139] text-xs pl-9 pr-4 py-2.5 rounded-full border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
          />
          <Search className="w-4 h-4 text-[#706A76] absolute left-3 top-3" />
        </div>
      </div>

      <div className="bg-[#FFFDF7] rounded-3xl border border-[#E5DFEB] shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F1F2FA] border-b border-[#E5DFEB] text-[#706A76]">
            <tr>
              <th className="py-3 px-4">ชื่อสมาชิก</th>
              <th className="py-3 px-4">อีเมล / เบอร์โทร</th>
              <th className="py-3 px-4">สิทธิ์ (Role)</th>
              <th className="py-3 px-4 text-center">คำสั่งซื้อ</th>
              <th className="py-3 px-4 text-right">ยอดซื้อสะสม</th>
              <th className="py-3 px-4 text-right">วันที่สมัคร</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5DFEB]/60">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-[#F1F2FA]/50 transition">
                <td className="py-3 px-4 font-bold text-[#383139]">{c.name}</td>
                <td className="py-3 px-4 text-[#706A76]">
                  <div>{c.email}</div>
                  <div className="text-[10px]">{c.phone}</div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      c.role === 'admin'
                        ? 'bg-purple-100 text-purple-900 border border-purple-200'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {c.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-center font-bold text-[#383139]">{c.ordersCount} ครั้ง</td>
                <td className="py-3 px-4 text-right font-extrabold text-[#383139]">
                  {c.totalSpent > 0 ? `฿${c.totalSpent.toLocaleString()}` : '-'}
                </td>
                <td className="py-3 px-4 text-right text-[#706A76]">{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
