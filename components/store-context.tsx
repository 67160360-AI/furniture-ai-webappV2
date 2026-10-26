'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  Category,
  Product,
  Order,
  OrderItem,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
} from '@/lib/store'

export interface CartItem {
  id: string
  productId: number
  name: string
  price: number
  quantity: number
  color: string
  material: string
  imageUrl: string
  customSpec?: any
}

export interface UserProfile {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
}

interface StoreContextType {
  products: Product[]
  categories: Category[]
  orders: Order[]
  cart: CartItem[]
  user: UserProfile | null
  cartCount: number
  cartSubtotal: number
  appliedPromo: string | null
  discountAmount: number
  applyPromo: (code: string) => { success: boolean; message: string; discount: number }
  removePromo: () => void
  // Cart Actions
  addToCart: (product: Product, quantity?: number, color?: string, material?: string, customSpec?: any) => void
  removeFromCart: (cartItemId: string) => void
  updateCartQuantity: (cartItemId: string, delta: number) => void
  clearCart: () => void
  // Order Actions
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => Order
  updateOrderStatus: (orderId: number, status: Order['status'], paymentStatus?: Order['paymentStatus']) => void
  // Product Admin Actions
  addProduct: (product: Omit<Product, 'id'>) => Product
  updateProduct: (id: number, product: Partial<Product>) => void
  deleteProduct: (id: number) => void
  // Category Admin Actions
  addCategory: (category: Omit<Category, 'id'>) => Category
  updateCategory: (id: number, category: Partial<Category>) => void
  deleteCategory: (id: number) => void
  // Auth Demo
  loginAs: (role: 'customer' | 'admin') => void
  logout: () => void
  // Reset demo data
  resetDemoData: () => void
}

const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES)
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS)
  const [cart, setCart] = useState<CartItem[]>([])
  const [user, setUser] = useState<UserProfile | null>({
    id: 'u-demo-1',
    name: 'คุณพัชราภรณ์ วงศ์สว่าง',
    email: 'patcha@example.com',
    role: 'customer',
  })
  const [isHydrated, setIsHydrated] = useState(false)
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  // Hydrate from localStorage on client load
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('mf_products')
      const savedCategories = localStorage.getItem('mf_categories')
      const savedOrders = localStorage.getItem('mf_orders')
      const savedCart = localStorage.getItem('mf_cart')
      const savedUser = localStorage.getItem('mf_user')
      const savedPromo = localStorage.getItem('mf_promo')

      if (savedProducts) setProducts(JSON.parse(savedProducts))
      if (savedCategories) setCategories(JSON.parse(savedCategories))
      if (savedOrders) setOrders(JSON.parse(savedOrders))
      if (savedCart) setCart(JSON.parse(savedCart))
      if (savedUser) setUser(JSON.parse(savedUser))
      if (savedPromo) setAppliedPromo(savedPromo)
    } catch (e) {
      console.warn('Could not read from localStorage:', e)
    }
    setIsHydrated(true)
  }, [])

  // Sync back to localStorage
  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem('mf_products', JSON.stringify(products))
      localStorage.setItem('mf_categories', JSON.stringify(categories))
      localStorage.setItem('mf_orders', JSON.stringify(orders))
      localStorage.setItem('mf_cart', JSON.stringify(cart))
      if (user) localStorage.setItem('mf_user', JSON.stringify(user))
      else localStorage.removeItem('mf_user')
      if (appliedPromo) localStorage.setItem('mf_promo', appliedPromo)
      else localStorage.removeItem('mf_promo')
    } catch (e) {
      console.warn('Could not write to localStorage:', e)
    }
  }, [products, categories, orders, cart, user, appliedPromo, isHydrated])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Calculate dynamic discount based on current cart subtotal and active promo
  let discountAmount = 0
  if (cartSubtotal > 0 && appliedPromo) {
    if (appliedPromo === 'MAISON10' || appliedPromo === 'WELCOME10') {
      discountAmount = Math.round(cartSubtotal * 0.1)
    } else if (appliedPromo === 'VIP500') {
      discountAmount = Math.min(cartSubtotal, 500)
    }
  }

  const applyPromo = (code: string) => {
    const normalized = code.trim().toUpperCase()
    if (normalized === 'MAISON10' || normalized === 'WELCOME10') {
      const discount = Math.round(cartSubtotal * 0.1)
      setAppliedPromo(normalized)
      return { success: true, message: `ใช้โค้ด ${normalized} สำเร็จ! ลดทันที 10%`, discount }
    } else if (normalized === 'VIP500') {
      const discount = Math.min(cartSubtotal, 500)
      setAppliedPromo(normalized)
      return { success: true, message: `ใช้โค้ด ${normalized} สำเร็จ! ลดทันที ฿500`, discount }
    }
    return { success: false, message: 'โค้ดส่วนลดไม่ถูกต้องหรือหมดอายุแล้ว (ลองใช้: MAISON10)', discount: 0 }
  }

  const removePromo = () => {
    setAppliedPromo(null)
  }

  const addToCart = (
    product: Product,
    quantity = 1,
    color = product.colors?.[0] || 'Default',
    material = product.materials?.[0] || 'Standard',
    customSpec?: any
  ) => {
    setCart((prev) => {
      // Find if same item with same options already exists
      const existingIndex = prev.findIndex(
        (i) =>
          i.productId === product.id &&
          i.color === color &&
          i.material === material &&
          JSON.stringify(i.customSpec) === JSON.stringify(customSpec)
      )

      if (existingIndex > -1) {
        const next = [...prev]
        next[existingIndex].quantity += quantity
        return next
      }

      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        color,
        material,
        imageUrl: product.imageUrl,
        customSpec,
      }
      return [...prev, newItem]
    })
  }

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== cartItemId))
  }

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const clearCart = () => {
    setCart([])
    setAppliedPromo(null)
  }

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => {
    const nextId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 101
    const orderNumber = `MF-${new Date().getFullYear()}-${String(nextId).padStart(3, '0')}`
    const now = new Date().toISOString()

    const newOrder: Order = {
      ...orderData,
      id: nextId,
      orderNumber,
      createdAt: now,
      updatedAt: now,
    }

    setOrders((prev) => [newOrder, ...prev])
    clearCart()
    return newOrder
  }

  const updateOrderStatus = (
    orderId: number,
    status: Order['status'],
    paymentStatus?: Order['paymentStatus']
  ) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              paymentStatus: paymentStatus || o.paymentStatus,
              updatedAt: new Date().toISOString(),
            }
          : o
      )
    )
  }

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
    const newProduct: Product = {
      ...productData,
      id: nextId,
    }
    setProducts((prev) => [newProduct, ...prev])
    return newProduct
  }

  const updateProduct = (id: number, productData: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...productData } : p))
    )
  }

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const addCategory = (catData: Omit<Category, 'id'>) => {
    const nextId = categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1
    const newCat: Category = { ...catData, id: nextId }
    setCategories((prev) => [...prev, newCat])
    return newCat
  }

  const updateCategory = (id: number, catData: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...catData } : c))
    )
  }

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  const loginAs = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      setUser({
        id: 'admin-1',
        name: 'Maison Forme Admin',
        email: 'admin@maisonforme.co',
        role: 'admin',
      })
    } else {
      setUser({
        id: 'u-demo-1',
        name: 'คุณพัชราภรณ์ วงศ์สว่าง',
        email: 'patcha@example.com',
        role: 'customer',
      })
    }
  }

  const logout = () => {
    setUser(null)
  }

  const resetDemoData = () => {
    setProducts(INITIAL_PRODUCTS)
    setCategories(INITIAL_CATEGORIES)
    setOrders(INITIAL_ORDERS)
    setCart([])
    localStorage.clear()
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        orders,
        cart,
        user,
        cartCount,
        cartSubtotal,
        appliedPromo,
        discountAmount,
        applyPromo,
        removePromo,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        loginAs,
        logout,
        resetDemoData,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
