import { and, eq, isNull } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { hasAdminAccess } from '@/lib/admin-api'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

const productPatchSchema = z.object({
  slug: z.string().trim().min(1).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  name: z.string().trim().min(1).max(240).optional(),
  description: z.string().optional(),
  categoryId: z.number().int().positive().optional(),
  price: z.number().int().nonnegative().optional(),
  compareAtPrice: z.number().int().nonnegative().nullable().optional(),
  stock: z.number().int().nonnegative().optional(),
  status: z.enum(['active', 'draft', 'archived']).optional(),
  isFeatured: z.boolean().optional(),
  isNew: z.boolean().optional(),
  madeToOrder: z.boolean().optional(),
  leadTimeDays: z.number().int().positive().optional(),
  style: z.string().optional(),
  materials: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  widthCm: z.number().nonnegative().optional(),
  depthCm: z.number().nonnegative().optional(),
  heightCm: z.number().nonnegative().optional(),
  weightKg: z.number().nonnegative().optional(),
  imageUrl: z.string().optional(),
}).refine((value) => Object.keys(value).length > 0, 'กรุณาระบุข้อมูลที่ต้องการแก้ไข')

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!(await hasAdminAccess())) return NextResponse.json({ error: 'ไม่มีสิทธิ์เข้าถึง' }, { status: 403 })
  const { id: rawId } = await context.params
  const id = Number(rawId)
  if (!Number.isSafeInteger(id) || id < 1) return NextResponse.json({ error: 'รหัสสินค้าไม่ถูกต้อง' }, { status: 400 })
  const parsed = productPatchSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'ข้อมูลสินค้าไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง' }, { status: 400 })

  try {
    const [updated] = await db.update(products)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning()
    if (!updated) return NextResponse.json({ error: 'ไม่พบสินค้านี้' }, { status: 404 })
    return NextResponse.json({ product: updated })
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === '23505') {
      return NextResponse.json({ error: 'รหัส URL (Slug) นี้มีสินค้าแล้ว กรุณาเปลี่ยนรหัส' }, { status: 409 })
    }
    console.error('Could not update product:', error)
    return NextResponse.json({ error: 'แก้ไขสินค้าไม่สำเร็จ กรุณาลองใหม่' }, { status: 503 })
  }
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!(await hasAdminAccess())) return NextResponse.json({ error: 'ไม่มีสิทธิ์เข้าถึง' }, { status: 403 })
  const { id: rawId } = await context.params
  const id = Number(rawId)
  if (!Number.isSafeInteger(id) || id < 1) return NextResponse.json({ error: 'รหัสสินค้าไม่ถูกต้อง' }, { status: 400 })

  try {
    const [deleted] = await db.update(products)
      .set({ status: 'archived', deletedAt: new Date(), updatedAt: new Date() })
      .where(and(eq(products.id, id), isNull(products.deletedAt)))
      .returning({ id: products.id })
    if (!deleted) return NextResponse.json({ error: 'ไม่พบสินค้านี้' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Could not delete product:', error)
    return NextResponse.json({ error: 'ลบสินค้าไม่สำเร็จ กรุณาลองใหม่' }, { status: 503 })
  }
}
