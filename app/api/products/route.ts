import { and, asc, desc, eq, isNull } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { categories, products } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const [rows, categoryRows] = await Promise.all([
      db
        .select()
        .from(products)
        .where(and(eq(products.status, 'active'), isNull(products.deletedAt)))
        .orderBy(desc(products.createdAt), desc(products.id)),
      db
        .select()
        .from(categories)
        .where(eq(categories.isActive, true))
        .orderBy(asc(categories.sortOrder), asc(categories.name)),
    ])

    return NextResponse.json({
      products: rows.map((product) => ({
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
      })),
      categories: categoryRows,
    }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Could not load product catalog:', error)
    return NextResponse.json({ error: 'ไม่สามารถโหลดรายการสินค้าได้' }, { status: 503 })
  }
}
