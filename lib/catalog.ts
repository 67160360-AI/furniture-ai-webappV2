import 'server-only'
import { and, arrayContains, asc, desc, eq, gt, gte, ilike, inArray, isNotNull, isNull, lte, ne, or, sql, type SQL } from 'drizzle-orm'
import { db } from '@/lib/db'
import { categories, productImages, products } from '@/lib/db/schema'

export const PAGE_SIZE = 12

export type ProductFilters = {
  q?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  material?: string
  color?: string
  inStock?: boolean
  isNew?: boolean
  sale?: boolean
  sort?: 'newest' | 'oldest' | 'price-asc' | 'price-desc'
  page?: number
}

export const productCard = {
  id: products.id,
  slug: products.slug,
  name: products.name,
  price: products.price,
  compareAtPrice: products.compareAtPrice,
  stock: products.stock,
  isFeatured: products.isFeatured,
  isNew: products.isNew,
  madeToOrder: products.madeToOrder,
  imageUrl: products.imageUrl,
  categoryName: categories.name,
  categorySlug: categories.slug,
}

export type ProductCardData = {
  id: number
  slug: string
  name: string
  price: number
  compareAtPrice: number | null
  stock: number
  isFeatured: boolean
  isNew: boolean
  madeToOrder: boolean
  imageUrl: string | null
  categoryName: string | null
  categorySlug: string | null
}

export function sellable() {
  return and(eq(products.status, 'active'), isNull(products.deletedAt))
}

export async function listCategories() {
  return db
    .select()
    .from(categories)
    .where(eq(categories.isActive, true))
    .orderBy(asc(categories.sortOrder), asc(categories.name))
}

export async function listProducts(filters: ProductFilters) {
  const conditions: (SQL | undefined)[] = [sellable()]
  if (filters.q) {
    const term = `%${filters.q.replace(/[%_\\]/g, (c) => `\\${c}`)}%`
    conditions.push(or(ilike(products.name, term), ilike(products.description, term)))
  }
  if (filters.category) conditions.push(eq(categories.slug, filters.category))
  if (filters.minPrice != null) conditions.push(gte(products.price, filters.minPrice))
  if (filters.maxPrice != null) conditions.push(lte(products.price, filters.maxPrice))
  if (filters.material) conditions.push(arrayContains(products.materials, [filters.material]))
  if (filters.color) conditions.push(arrayContains(products.colors, [filters.color]))
  if (filters.inStock) conditions.push(or(gt(products.stock, 0), eq(products.madeToOrder, true)))
  if (filters.isNew) conditions.push(eq(products.isNew, true))
  if (filters.sale)
    conditions.push(and(isNotNull(products.compareAtPrice), gt(products.compareAtPrice, products.price)))

  const where = and(...conditions)
  const order =
    filters.sort === 'price-asc'
      ? [asc(products.price)]
      : filters.sort === 'price-desc'
        ? [desc(products.price)]
        : filters.sort === 'oldest'
          ? [asc(products.createdAt), asc(products.id)]
          : [desc(products.createdAt), desc(products.id)]
  const page = Math.max(1, filters.page ?? 1)

  const [items, [{ count }]] = await Promise.all([
    db
      .select(productCard)
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(where)
      .orderBy(...order)
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(where),
  ])
  return { items, total: count, page, pageCount: Math.max(1, Math.ceil(count / PAGE_SIZE)) }
}

export async function getFacets() {
  const rows = await db
    .select({ materials: products.materials, colors: products.colors })
    .from(products)
    .where(sellable())
  const materials = new Set<string>()
  const colors = new Set<string>()
  for (const r of rows) {
    r.materials.forEach((m) => materials.add(m))
    r.colors.forEach((c) => colors.add(c))
  }
  return { materials: [...materials].sort(), colors: [...colors].sort() }
}

export async function getHighlights() {
  const [featured, latest] = await Promise.all([
    db
      .select(productCard)
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(and(sellable(), eq(products.isFeatured, true)))
      .orderBy(desc(products.updatedAt))
      .limit(4),
    db
      .select(productCard)
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(sellable())
      .orderBy(desc(products.createdAt))
      .limit(4),
  ])
  return { featured, latest }
}

export async function getProductBySlug(slug: string) {
  const [row] = await db
    .select({ product: products, categoryName: categories.name, categorySlug: categories.slug })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(and(eq(products.slug, slug), sellable()))
    .limit(1)
  if (!row) return null
  const gallery = await db
    .select({ id: productImages.id, url: productImages.url, alt: productImages.alt })
    .from(productImages)
    .where(eq(productImages.productId, row.product.id))
    .orderBy(asc(productImages.sortOrder), asc(productImages.id))
  return { ...row, gallery }
}

export async function getRelated(productId: number, categoryId: number | null) {
  return db
    .select(productCard)
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(and(sellable(), ne(products.id, productId), categoryId ? eq(products.categoryId, categoryId) : undefined))
    .orderBy(desc(products.isFeatured), desc(products.createdAt))
    .limit(4)
}

export async function getProductsByIds(ids: number[]) {
  if (ids.length === 0) return []
  return db
    .select(productCard)
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(and(sellable(), inArray(products.id, ids)))
}

export function stockLabel(p: { stock: number; madeToOrder: boolean }) {
  if (p.stock > 0) return { label: p.stock <= 3 ? `เหลือ ${p.stock} ชิ้น` : 'พร้อมส่ง', tone: 'mint' as const }
  if (p.madeToOrder) return { label: 'สั่งผลิต', tone: 'lavender' as const }
  return { label: 'สินค้าหมด', tone: 'muted' as const }
}
