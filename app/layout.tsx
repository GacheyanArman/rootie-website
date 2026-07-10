import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-archivo',
})

export const metadata: Metadata = {
  title: 'ROOTIE — Original Sneakers & Streetwear | Yerevan',
  description: 'Оригинальные кроссовки, streetwear и редкие коллекционные вещи в центре Еревана. Saryan 4, ежедневно 11:00–22:00.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#111210',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`bg-background ${inter.variable} ${archivo.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
