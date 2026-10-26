import 'server-only'
import { randomUUID } from 'node:crypto'
import { cookies } from 'next/headers'
import { and, eq, sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { cartItems, categories, products } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/session'

export const GUEST_COOKIE = 'mf_guest'
export const MAX_QTY_PER_PRODUCT = 20

const cookieOptions = {
  httpOnly: true,
  path: '/',
  maxAge: 60 * 60 * 24 * 30,
  ...(process.env.NODE_ENV === 'development'
    ? { sameSite: 'none' as const, secure: true }
    : { sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production' }),
}

function isValidGuestId(value: string | undefined): value is string {
  return !!value && /^[0-9a-f-]{36}$/i.test(value)
}

export async function getGuestId(create = false) {
  const store = await cookies()
  const existing = store.get(GUEST_COOKIE)?.value
  if (isValidGuestId(existing)) return existing
  if (!create) return null
  const id = randomUUID()
  store.set(GUEST_COOKIE, id, cookieOptions)
  return id
}

/**
 * Resolves the cart owner. Mutating callers (route handlers) pass create=true so a guest
 * cookie is issued; signed-in users absorb any guest cart they built before logging in.
 */
export async function getCartOwner(options: { create?: boolean; merge?: boolean } = {}) {
  const current = await getCurrentUser()
  if (current) {
    const ownerKey = `u:${current.id}`
    if (options.merge) {
      const guestId = await getGuestId(false)
      if (guestId) await mergeCarts(`g:${guestId}`, ownerKey)
    }
    return { ownerKey, userId: current.id, guestId: null as string | null }
  }
  const guestId = await getGuestId(options.create)
  return { ownerKey: guestId ? `g:${guestId}` : null, userId: null as string | null, guestId }
}

async function mergeCarts(from: string, to: string) {
  await db.transaction(async (tx) => {
    const guestRows = await tx.select().from(cartItems).where(eq(cartItems.ownerKey, from))
    if (guestRows.length === 0) return
    for (const row of guestRows) {
      await tx
        .insert(cartItems)
        .values({ ownerKey: to, productId: row.productId, quantity: row.quantity, color: row.color, material: row.material })
        .onConflictDoUpdate({
          target: [cartItems.ownerKey, cartItems.productId, cartItems.color, cartItems.material],
          set: { quantity: sql`LEAST(${cartItems.quantity} + ${row.quantity}, ${MAX_QTY_PER_PRODUCT})` },
        })
    }
    await tx.delete(cartItems).where(eq(cartItems.ownerKey, from))
  })
}

export type CartLine = {
  id: number
  productId: number
  slug: string
  name: string
  imageUrl: string | null
  categoryName: string | null
  unitPrice: number
  compareAtPrice: number | null
  quantity: number
  color: string
  material: string
  stock: number
  madeToOrder: boolean
  leadTimeDays: number
  lineTotal: number
  issue: string | null
}

export async function readCart(ownerKey: string | null) {
  if (!ownerKey) return { lines: [] as CartLine[], subtotal: 0, count: 0, hasIssues: false }
  const rows = await db
    .select({
      id: cartItems.id,
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      color: cartItems.color,
      material: cartItems.material,
      slug: products.slug,
      name: products.name,
      imageUrl: products.imageUrl,
      price: products.price,
      compareAtPrice: products.compareAtPrice,
      stock: products.stock,
      status: products.status,
      deletedAt: products.deletedAt,
      madeToOrder: products.madeToOrder,
      leadTimeDays: products.leadTimeDays,
      categoryName: categories.name,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(cartItems.ownerKey, ownerKey))
    .orderBy(cartItems.createdAt)

  const lines: CartLine[] = rows.map((r) => {
    let issue: string | null = null
    if (r.status !== 'active' || r.deletedAt) issue = 'สินค้านี้ไม่พร้อมจำหน่ายแล้ว'
    else if (!r.madeToOrder && r.stock <= 0) issue = 'สินค้าหมดชั่วคราว'
    else if (!r.madeToOrder && r.quantity > r.stock) issue = `มีสินค้าคงเหลือเพียง ${r.stock} ชิ้น`
    return {
      id: r.id,
      productId: r.productId,
      slug: r.slug,
      name: r.name,
      imageUrl: r.imageUrl,
      categoryName: r.categoryName,
      unitPrice: r.price,
      compareAtPrice: r.compareAtPrice,
      quantity: r.quantity,
      color: r.color,
      material: r.material,
      stock: r.stock,
      madeToOrder: r.madeToOrder,
      leadTimeDays: r.leadTimeDays,
      lineTotal: r.price * r.quantity,
      issue,
    }
  })
  const valid = lines.filter((l) => !l.issue)
  return {
    lines,
    subtotal: valid.reduce((s, l) => s + l.lineTotal, 0),
    count: lines.reduce((s, l) => s + l.quantity, 0),
    hasIssues: lines.some((l) => l.issue),
  }
}

export async function cartLineBelongsTo(lineId: number, ownerKey: string) {
  const [row] = await db
    .select({ id: cartItems.id })
    .from(cartItems)
    .where(and(eq(cartItems.id, lineId), eq(cartItems.ownerKey, ownerKey)))
    .limit(1)
  return !!row
}
