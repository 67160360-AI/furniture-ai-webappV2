'use client'

import React, { useState } from 'react'
import { useStore } from '@/components/store-context'
import { FolderTree, PlusCircle, Trash2, Edit2, Save, X } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useStore()
  const [newCatName, setNewCatName] = useState('')
  const [newCatSlug, setNewCatSlug] = useState('')
  const [newCatDesc, setNewCatDesc] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editDesc, setEditDesc] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName.trim()) return

    const slug = newCatSlug.trim() || newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    addCategory({
      name: newCatName,
      slug,
      description: newCatDesc,
      sortOrder: categories.length + 1,
      isActive: true,
    })

    setNewCatName('')
    setNewCatSlug('')
    setNewCatDesc('')
    toast.success('เพิ่มหมวดหมู่ใหม่สำเร็จ')
  }

  const handleStartEdit = (cat: any) => {
    setEditingId(cat.id)
    setEditName(cat.name)
    setEditDesc(cat.description || '')
  }

  const handleSaveEdit = (id: number) => {
    updateCategory(id, { name: editName, description: editDesc })
    setEditingId(null)
    toast.success('อัปเดตหมวดหมู่เรียบร้อย')
  }

  const handleDelete = (id: number, name: string) => {
    if (confirm(`คุณต้องการลบหมวดหมู่ "${name}" หรือไม่?`)) {
      deleteCategory(id)
      toast.success('ลบหมวดหมู่เรียบร้อย')
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div>
        <h1 className="text-3xl font-extrabold text-[#383139] tracking-tight font-heading">
          จัดการหมวดหมู่สินค้า (Categories)
        </h1>
        <p className="text-xs sm:text-sm text-[#706A76] mt-1">
          เพิ่มและจัดระเบียบหมวดหมู่เฟอร์นิเจอร์สำหรับหน้าเว็บไซต์
        </p>
      </div>

      {/* Add New Category Box */}
      <form onSubmit={handleAdd} className="bg-[#FFFDF7] rounded-3xl p-6 border border-[#E5DFEB] shadow-sm space-y-4">
        <h2 className="font-bold text-sm text-[#383139] flex items-center gap-1.5">
          <PlusCircle className="w-4 h-4 text-purple-700" />
          <span>เพิ่มหมวดหมู่ใหม่</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#383139] mb-1">ชื่อหมวดหมู่ (ไทย) *</label>
            <input
              type="text"
              required
              value={newCatName}
              onChange={(e) => {
                setNewCatName(e.target.value)
                if (!newCatSlug) {
                  setNewCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
                }
              }}
              placeholder="เช่น เก้าอี้พักผ่อน"
              className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-3.5 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#383139] mb-1">รหัส Slug (URL) *</label>
            <input
              type="text"
              required
              value={newCatSlug}
              onChange={(e) => setNewCatSlug(e.target.value)}
              placeholder="lounge-chairs"
              className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-3.5 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#383139] mb-1">คำอธิบายสั้น</label>
            <input
              type="text"
              value={newCatDesc}
              onChange={(e) => setNewCatDesc(e.target.value)}
              placeholder="รายละเอียดหมวดหมู่นี้..."
              className="w-full bg-[#F1F2FA] text-[#383139] text-xs px-3.5 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm transition active:scale-95"
        >
          เพิ่มหมวดหมู่นี้
        </button>
      </form>

      {/* Categories List */}
      <div className="bg-[#FFFDF7] rounded-3xl border border-[#E5DFEB] shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F1F2FA] border-b border-[#E5DFEB] text-[#706A76]">
            <tr>
              <th className="py-3 px-4">ลำดับ</th>
              <th className="py-3 px-4">ชื่อหมวดหมู่</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">คำอธิบาย</th>
              <th className="py-3 px-4 text-right">การจัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5DFEB]/60">
            {categories.map((c, idx) => {
              const isCurrentEdit = editingId === c.id
              return (
                <tr key={c.id} className="hover:bg-[#F1F2FA]/50 transition">
                  <td className="py-3 px-4 font-mono text-[#706A76]">{idx + 1}</td>
                  <td className="py-3 px-4 font-bold text-[#383139]">
                    {isCurrentEdit ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-white border px-2 py-1 rounded text-xs"
                      />
                    ) : (
                      c.name
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#706A76]">
                    {c.slug}
                  </td>
                  <td className="py-3 px-4 text-[#706A76]">
                    {isCurrentEdit ? (
                      <input
                        type="text"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="bg-white border px-2 py-1 rounded text-xs w-full"
                      />
                    ) : (
                      c.description || '-'
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {isCurrentEdit ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(c.id)}
                          className="p-1 rounded text-emerald-700 hover:bg-emerald-50"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="p-1 rounded text-gray-500 hover:bg-gray-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(c)}
                          className="p-1.5 rounded-lg text-purple-700 hover:bg-purple-50"
                          title="แก้ไข"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(c.id, c.name)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                          title="ลบ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}
