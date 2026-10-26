// Central data store for Maison Forme.
// Provides both client and server access with seamless fallback so the site
// runs out-of-the-box in local dev, browser, or serverless environments.

export interface Category {
  id: number
  slug: string
  name: string
  description?: string
  sortOrder: number
  isActive: boolean
}

export interface Product {
  id: number
  slug: string
  name: string
  description: string
  categoryId: number
  price: number
  compareAtPrice: number | null
  stock: number
  status: 'active' | 'draft' | 'archived'
  isFeatured: boolean
  isNew: boolean
  madeToOrder: boolean
  leadTimeDays: number
  style: string
  materials: string[]
  colors: string[]
  widthCm: number
  depthCm: number
  heightCm: number
  weightKg: number
  imageUrl: string
}

export interface OrderItem {
  id: number
  productId: number
  productName: string
  unitPrice: number
  quantity: number
  color: string
  material: string
  lineTotal: number
  imageUrl?: string
  customSpec?: any
}

export interface Order {
  id: number
  orderNumber: string
  userId?: string
  guestKey?: string
  recipientName: string
  phone: string
  email: string
  address: string
  city: string
  postalCode: string
  note?: string
  shippingMethod: 'standard' | 'express' | 'pickup'
  paymentMethod: 'promptpay' | 'bank_transfer' | 'credit_card' | 'cod'
  subtotal: number
  discount?: number
  promoCode?: string
  shippingFee: number
  total: number
  status: 'pending' | 'paid' | 'manufacturing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'unpaid' | 'paid' | 'refunded'
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export const INITIAL_CATEGORIES: Category[] = [
  { id: 1, slug: 'sofas', name: 'โซฟาและอาร์มแชร์', description: 'โซฟา อาร์มแชร์ และที่นั่งพักผ่อนสำหรับห้องนั่งเล่น', sortOrder: 1, isActive: true },
  { id: 2, slug: 'desks', name: 'โต๊ะทำงาน', description: 'โต๊ะทำงานและโต๊ะปรับระดับสำหรับบ้านและออฟฟิศ', sortOrder: 2, isActive: true },
  { id: 3, slug: 'dining-tables', name: 'โต๊ะรับประทานอาหาร', description: 'โต๊ะอาหารสำหรับครอบครัวทุกขนาด', sortOrder: 3, isActive: true },
  { id: 4, slug: 'chairs', name: 'เก้าอี้', description: 'เก้าอี้รับประทานอาหารและเก้าอี้อเนกประสงค์', sortOrder: 4, isActive: true },
  { id: 5, slug: 'bedroom', name: 'เตียงและห้องนอน', description: 'เตียง หัวเตียง และเฟอร์นิเจอร์ห้องนอน', sortOrder: 5, isActive: true },
  { id: 6, slug: 'storage', name: 'ตู้และชั้นวางของ', description: 'ตู้ ชั้นวาง และระบบจัดเก็บ', sortOrder: 6, isActive: true },
  { id: 7, slug: 'living', name: 'โต๊ะกลางและห้องนั่งเล่น', description: 'โต๊ะกลาง โต๊ะข้าง และของตกแต่งห้องนั่งเล่น', sortOrder: 7, isActive: true },
  { id: 8, slug: 'office', name: 'เฟอร์นิเจอร์สำนักงาน', description: 'เก้าอี้และอุปกรณ์สำหรับสำนักงาน', sortOrder: 8, isActive: true },
  { id: 9, slug: 'custom', name: 'เฟอร์นิเจอร์สั่งทำ AI', description: 'เฟอร์นิเจอร์คำนวณและผลิตตามแบบ AI', sortOrder: 9, isActive: true },
]

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'cloud-curve-sofa',
    name: 'Cloud Curve Sofa',
    description: 'โซฟา 3 ที่นั่งทรงโค้งนุ่ม เบาะโฟมความหนาแน่นสูงหุ้มผ้าบูเคล่ ถอดซักได้ เหมาะกับห้องนั่งเล่นที่ต้องการความอบอุ่นและผ่อนคลาย ขอบมนสวยละมุนในสไตล์ Claymorphism Pastel',
    categoryId: 1,
    price: 32900,
    compareAtPrice: 38900,
    stock: 6,
    status: 'active',
    isFeatured: true,
    isNew: false,
    madeToOrder: false,
    leadTimeDays: 5,
    style: 'Soft Pastel',
    materials: ['ผ้าบูเคล่', 'ไม้เนื้อแข็ง'],
    colors: ['ครีม', 'ชมพูอ่อน', 'เขียวมิ้นต์'],
    widthCm: 220,
    depthCm: 95,
    heightCm: 78,
    weightKg: 48,
    imageUrl: '/images/products/cloud-curve-sofa.png',
  },
  {
    id: 2,
    slug: 'pebble-armchair',
    name: 'Pebble Armchair',
    description: 'อาร์มแชร์ทรงก้อนกรวด นั่งสบาย ขนาดกะทัดรัด ดีไซน์โค้งมน นุ่มละมุน เหมาะกับมุมอ่านหนังสือหรือห้องขนาดเล็ก',
    categoryId: 1,
    price: 12900,
    compareAtPrice: null,
    stock: 10,
    status: 'active',
    isFeatured: true,
    isNew: true,
    madeToOrder: false,
    leadTimeDays: 3,
    style: 'Modern',
    materials: ['ผ้ากำมะหยี่', 'ไม้เนื้อแข็ง'],
    colors: ['เขียวมิ้นต์', 'ครีม', 'ม่วงลาเวนเดอร์'],
    widthCm: 82,
    depthCm: 80,
    heightCm: 74,
    weightKg: 16,
    imageUrl: '/images/products/pebble-armchair.png',
  },
  {
    id: 3,
    slug: 'atelier-oak-desk',
    name: 'Atelier Oak Desk',
    description: 'โต๊ะทำงานไม้โอ๊คแท้ พร้อมลิ้นชักซ่อนและช่องร้อยสายไฟ ขอบมนปลอดภัย แข็งแรงทนทาน ผิวสัมผัสเนื้อไม้ธรรมชาติ',
    categoryId: 2,
    price: 15900,
    compareAtPrice: null,
    stock: 8,
    status: 'active',
    isFeatured: false,
    isNew: false,
    madeToOrder: false,
    leadTimeDays: 4,
    style: 'Japandi',
    materials: ['ไม้โอ๊ค', 'เหล็กพ่นสี'],
    colors: ['ไม้ธรรมชาติ', 'โอ๊คเข้ม'],
    widthCm: 140,
    depthCm: 65,
    heightCm: 75,
    weightKg: 32,
    imageUrl: '/images/products/atelier-oak-desk.png',
  },
  {
    id: 4,
    slug: 'lift-pro-standing-desk',
    name: 'Lift Pro Standing Desk',
    description: 'โต๊ะปรับระดับไฟฟ้ามอเตอร์คู่ ปรับความสูง 65–128 ซม. จำตำแหน่งได้ 4 ระดับ พร้อมถาดจัดสายไฟ ท็อปรังผึ้งขอบมนกันกระแทก',
    categoryId: 2,
    price: 18900,
    compareAtPrice: 21900,
    stock: 3,
    status: 'active',
    isFeatured: true,
    isNew: true,
    madeToOrder: false,
    leadTimeDays: 5,
    style: 'Minimal',
    materials: ['ไม้อัด MDF', 'เหล็ก'],
    colors: ['ขาว', 'ไม้ธรรมชาติ', 'ชมพูพาสเทล'],
    widthCm: 160,
    depthCm: 75,
    heightCm: 128,
    weightKg: 41,
    imageUrl: '/images/products/lift-pro-standing-desk.png',
  },
  {
    id: 5,
    slug: 'soleil-dining-table',
    name: 'Soleil Dining Table',
    description: 'โต๊ะอาหารทรงรีสำหรับ 6 ที่นั่ง ท็อปไม้แอชเคลือบด้าน ขาทรงกระบอกมน ไร้เหลี่ยมคม ปลอดภัยสำหรับครอบครัว',
    categoryId: 3,
    price: 24500,
    compareAtPrice: null,
    stock: 4,
    status: 'active',
    isFeatured: true,
    isNew: false,
    madeToOrder: false,
    leadTimeDays: 7,
    style: 'Scandinavian',
    materials: ['ไม้แอช'],
    colors: ['ไม้ธรรมชาติ', 'ครีมวานิลลา'],
    widthCm: 180,
    depthCm: 95,
    heightCm: 75,
    weightKg: 45,
    imageUrl: '/images/products/soleil-dining-table.png',
  },
  {
    id: 6,
    slug: 'mochi-dining-chair',
    name: 'Mochi Dining Chair',
    description: 'เก้าอี้รับประทานอาหารเบาะนุ่มทรงมน โครงไม้บีช ซ้อนเก็บได้ประหยัดพื้นที่ หุ้มผ้าบูเคล่ทำความสะอาดง่าย',
    categoryId: 4,
    price: 3900,
    compareAtPrice: 4500,
    stock: 24,
    status: 'active',
    isFeatured: false,
    isNew: true,
    madeToOrder: false,
    leadTimeDays: 3,
    style: 'Soft Pastel',
    materials: ['ไม้บีช', 'ผ้าบูเคล่'],
    colors: ['ชมพูอ่อน', 'ครีม', 'เหลืองบัตเตอร์'],
    widthCm: 48,
    depthCm: 52,
    heightCm: 80,
    weightKg: 6,
    imageUrl: '/images/products/mochi-dining-chair.png',
  },
  {
    id: 7,
    slug: 'dune-upholstered-bed',
    name: 'Dune Upholstered Bed',
    description: 'เตียงหุ้มผ้าขนาด 6 ฟุต หัวเตียงบุนวมทรงโค้ง พร้อมลิ้นชักเก็บของใต้เตียงแบบ Soft-close สั่งผลิตตามสีและขนาดห้องได้',
    categoryId: 5,
    price: 29900,
    compareAtPrice: null,
    stock: 0,
    status: 'active',
    isFeatured: false,
    isNew: false,
    madeToOrder: true,
    leadTimeDays: 21,
    style: 'Contemporary',
    materials: ['ผ้าลินิน', 'ไม้อัด'],
    colors: ['เบจ', 'ฟ้าพาสเทล', 'ชมพูหม่น'],
    widthCm: 190,
    depthCm: 215,
    heightCm: 110,
    weightKg: 70,
    imageUrl: '/images/products/dune-upholstered-bed.png',
  },
  {
    id: 8,
    slug: 'arc-oak-bookshelf',
    name: 'Arc Oak Bookshelf',
    description: 'ชั้นวางหนังสือทรงโค้งด้านบน 5 ชั้น ไม้โอ๊ควีเนียร์ ยึดผนังได้เพื่อความปลอดภัย สวยงามสไตล์มินิมอลญี่ปุ่น',
    categoryId: 6,
    price: 9900,
    compareAtPrice: null,
    stock: 12,
    status: 'active',
    isFeatured: false,
    isNew: true,
    madeToOrder: false,
    leadTimeDays: 4,
    style: 'Japandi',
    materials: ['ไม้โอ๊ควีเนียร์', 'ไม้อัด'],
    colors: ['ไม้ธรรมชาติ', 'ขาวนวล'],
    widthCm: 90,
    depthCm: 32,
    heightCm: 190,
    weightKg: 38,
    imageUrl: '/images/products/arc-oak-bookshelf.png',
  },
  {
    id: 9,
    slug: 'pebble-coffee-table',
    name: 'Pebble Coffee Table',
    description: 'โต๊ะกลางทรงก้อนกรวด ผิวลายหินทราเวอร์ทีน ขอบมนทุกด้าน เหมาะกับบ้านที่มีเด็ก สวยหรูทนต่อรอยขีดข่วน',
    categoryId: 7,
    price: 8900,
    compareAtPrice: 10500,
    stock: 2,
    status: 'active',
    isFeatured: true,
    isNew: false,
    madeToOrder: false,
    leadTimeDays: 3,
    style: 'Modern',
    materials: ['ไฟเบอร์กลาส', 'เรซิน'],
    colors: ['ครีม', 'หินอ่อนขาว'],
    widthCm: 110,
    depthCm: 70,
    heightCm: 38,
    weightKg: 22,
    imageUrl: '/images/products/pebble-coffee-table.png',
  },
  {
    id: 10,
    slug: 'halo-ergonomic-chair',
    name: 'Halo Ergonomic Chair',
    description: 'เก้าอี้สำนักงานเพื่อสุขภาพ รองรับหลังส่วนล่าง ปรับความสูง พนักพิง และที่วางแขน 3D ได้ ผ้าตาข่ายระบายอากาศดีเยี่ยม',
    categoryId: 8,
    price: 11900,
    compareAtPrice: null,
    stock: 15,
    status: 'active',
    isFeatured: false,
    isNew: true,
    madeToOrder: false,
    leadTimeDays: 3,
    style: 'Modern',
    materials: ['ผ้าตาข่าย', 'อะลูมิเนียม'],
    colors: ['ชมพูอ่อน', 'ขาว', 'เทาอ่อน'],
    widthCm: 66,
    depthCm: 66,
    heightCm: 118,
    weightKg: 17,
    imageUrl: '/images/products/halo-ergonomic-chair.png',
  },
]

export const INITIAL_ORDERS: Order[] = [
  {
    id: 101,
    orderNumber: 'MF-2026-001',
    recipientName: 'คุณพัชราภรณ์ วงศ์สว่าง',
    phone: '089-123-4567',
    email: 'patcha@example.com',
    address: '99/12 หมู่บ้านศุภาลัยการ์เด้น ซอยสุขุมวิท 39',
    city: 'กรุงเทพมหานคร',
    postalCode: '10110',
    shippingMethod: 'express',
    paymentMethod: 'promptpay',
    subtotal: 45800,
    shippingFee: 0,
    total: 45800,
    status: 'manufacturing',
    paymentStatus: 'paid',
    items: [
      {
        id: 1,
        productId: 1,
        productName: 'Cloud Curve Sofa',
        unitPrice: 32900,
        quantity: 1,
        color: 'ครีม',
        material: 'ผ้าบูเคล่',
        lineTotal: 32900,
        imageUrl: '/images/products/cloud-curve-sofa.png',
      },
      {
        id: 2,
        productId: 2,
        productName: 'Pebble Armchair',
        unitPrice: 12900,
        quantity: 1,
        color: 'เขียวมิ้นต์',
        material: 'ผ้ากำมะหยี่',
        lineTotal: 12900,
        imageUrl: '/images/products/pebble-armchair.png',
      },
    ],
    createdAt: '2026-10-24T10:15:00Z',
    updatedAt: '2026-10-24T11:00:00Z',
  },
  {
    id: 102,
    orderNumber: 'MF-2026-002',
    recipientName: 'นายธีรเดช สุขเกษม',
    phone: '081-987-6543',
    email: 'teeradej@example.com',
    address: '45/8 อาคารพร้อมพงษ์คอนโด ถนนพระราม 4',
    city: 'กรุงเทพมหานคร',
    postalCode: '10110',
    shippingMethod: 'standard',
    paymentMethod: 'credit_card',
    subtotal: 18900,
    shippingFee: 500,
    total: 19400,
    status: 'shipped',
    paymentStatus: 'paid',
    items: [
      {
        id: 3,
        productId: 4,
        productName: 'Lift Pro Standing Desk',
        unitPrice: 18900,
        quantity: 1,
        color: 'ไม้ธรรมชาติ',
        material: 'ไม้อัด MDF',
        lineTotal: 18900,
        imageUrl: '/images/products/lift-pro-standing-desk.png',
      },
    ],
    createdAt: '2026-10-25T14:20:00Z',
    updatedAt: '2026-10-25T16:00:00Z',
  },
]
