import { asc, eq, isNull } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { hasAdminAccess } from '@/lib/admin-api'
import { db } from '@/lib/db'
import { categories, products } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

const productSchema = z.object({
  slug: z.string().trim().min(1).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(1).max(240),
  description: z.string().default(''),
  categoryId: z.number().int().positive(),
  price: z.number().int().nonnegative(),
  compareAtPrice: z.number().int().nonnegative().nullable(),
  stock: z.number().int().nonnegative(),
  status: z.enum(['active', 'draft', 'archived']).default('active'),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(false),
  madeToOrder: z.boolean().default(false),
  leadTimeDays: z.number().int().positive().default(3),
  style: z.string().default(''),
  materials: z.array(z.string()),
  colors: z.array(z.string()),
  widthCm: z.number().nonnegative(),
  depthCm: z.number().nonnegative(),
  heightCm: z.number().nonnegative(),
  weightKg: z.number().nonnegative(),
  imageUrl: z.string().default(''),
})

function toClientProduct(product: typeof products.$inferSelect) {
  return {
    ...product,
    categoryId: product.categoryId ?? 0,
    price: Number(product.price),
    compareAtPrice: product.compareAtPrice == null ? null : Number(product.compareAtPrice),
    stock: Number(product.stock),
    leadTimeDays: Number(product.leadTimeDays),
    widthCm: Number(product.widthCm ?? 0),
    depthCm: Number(product.depthCm ?? 0),
    heightCm: Number(product.heightCm ?? 0),
    weightKg: Number(product.weightKg ?? 0),
    style: product.style ?? '',
    imageUrl: product.imageUrl ?? '',
  }
}

export async function GET() {
  if (!(await hasAdminAccess())) return NextResponse.json({ error: 'ไม่มีสิทธิ์เข้าถึง' }, { status: 403 })
  try {
    const rows = await db
      .select()
      .from(products)
      .where(isNull(products.deletedAt))
      .orderBy(asc(products.name), asc(products.id))
    return NextResponse.json({ products: rows.map(toClientProduct) }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Could not load admin products:', error)
    return NextResponse.json({ error: 'ไม่สามารถโหลดรายการสินค้าได้' }, { status: 503 })
  }
}

export async function POST(request: NextRequest) {
  if (!(await hasAdminAccess())) return NextResponse.json({ error: 'ไม่มีสิทธิ์เข้าถึง' }, { status: 403 })
  const parsed = productSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'ข้อมูลสินค้าไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง' }, { status: 400 })

  try {
    const input = parsed.data
    const [category] = await db.select({ id: categories.id }).from(categories).where(eq(categories.id, input.categoryId)).limit(1)
    if (!category) return NextResponse.json({ error: 'ไม่พบหมวดหมู่สินค้าที่เลือก' }, { status: 400 })

    const [created] = await db.insert(products).values(input).returning()
    return NextResponse.json({ product: toClientProduct(created) }, { status: 201 })
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === '23505') {
      return NextResponse.json({ error: 'รหัส URL (Slug) นี้มีสินค้าแล้ว กรุณาเปลี่ยนรหัส' }, { status: 409 })
    }
    console.error('Could not create product:', error)
    return NextResponse.json({ error: 'บันทึกสินค้าไม่สำเร็จ กรุณาลองใหม่' }, { status: 503 })
  }
}
