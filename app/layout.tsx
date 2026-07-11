import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import { LINKS, STORE } from '@/lib/links'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const archivo = Archivo({ subsets: ['latin'], weight: ['600', '700', '800', '900'], variable: '--font-archivo' })

const siteUrl = 'https://rootie.am'
const title = 'ROOTIE — Original Sneakers & Streetwear in Yerevan'
const description = 'Original sneakers, streetwear and collectible accessories at Saryan 4 in central Yerevan. Open daily 11:00–22:00.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ['sneakers Yerevan', 'streetwear Armenia', 'original sneakers', 'Rootie Yerevan', 'кроссовки Ереван', 'streetwear Ереван'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'ROOTIE',
    title,
    description,
    locale: 'ru_AM',
    alternateLocale: ['en_US', 'hy_AM'],
    images: [{ url: '/images/sneaker-wall-full.jpg', width: 1200, height: 630, alt: 'Sneaker wall inside the Rootie concept store in Yerevan' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/sneaker-wall-full.jpg'] },
  robots: { index: true, follow: true },
  generator: 'v0.app',
}

export const viewport: Viewport = { themeColor: '#111210', width: 'device-width', initialScale: 1, userScalable: true }

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  '@id': `${siteUrl}/#store`,
  name: 'ROOTIE',
  url: siteUrl,
  image: `${siteUrl}/images/storefront-night.png`,
  telephone: STORE.phone,
  priceRange: '$$',
  address: { '@type': 'PostalAddress', streetAddress: '4 Martiros Saryan St', addressLocality: 'Yerevan', postalCode: '0002', addressCountry: 'AM' },
  geo: { '@type': 'GeoCoordinates', latitude: 40.1844, longitude: 44.5065 },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '11:00', closes: '22:00' }],
  sameAs: [LINKS.instagram, LINKS.facebook, LINKS.telegramChannel],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`bg-background ${inter.variable} ${archivo.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
