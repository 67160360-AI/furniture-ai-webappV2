import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Kanit } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-kanit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Maison Forme — เฟอร์นิเจอร์และ AI Furniture Designer',
    template: '%s | Maison Forme',
  },
  description:
    'ร้านเฟอร์นิเจอร์ออนไลน์ Maison Forme ค้นพบเฟอร์นิเจอร์ที่ใช่ หรือให้ AI ช่วยออกแบบพื้นที่และเฟอร์นิเจอร์ให้เหมาะกับไลฟ์สไตล์ของคุณ',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F1F2FA',
}

import { StoreProvider } from '@/components/store-context'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={`${inter.variable} ${kanit.variable} bg-background`}>
      <body className="antialiased min-h-screen flex flex-col text-foreground bg-[#F1F2FA]">
        <StoreProvider>
          {children}
          <Toaster position="top-center" richColors />
        </StoreProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
