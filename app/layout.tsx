import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import { LINKS, STORE } from '@/lib/links'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const archivo = Archivo({ subsets: ['latin'], weight: ['600', '700', '800', '900'], variable: '--font-archivo' })

const siteUrl = 'https://rootie.am'
const title = 'rootie'
const description = 'rootie — магазин оригинальных кроссовок, стритвира и коллекционных аксессуаров по адресу Сарьяна 4 в Ереване. Ежедневно 11:00–22:00.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: 'rootie',
  category: 'shopping',
  keywords: ['sneakers Yerevan', 'sneaker store Yerevan', 'streetwear Armenia', 'original sneakers Armenia', 'Rootie Yerevan', 'кроссовки Ереван', 'магазин кроссовок Ереван', 'оригинальные кроссовки Армения', 'streetwear Ереван'],
  alternates: { canonical: '/', languages: { 'ru-AM': '/', 'x-default': '/' } },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'rootie',
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
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: STORE.name,
      inLanguage: ['ru-AM', 'en-AM', 'hy-AM'],
      publisher: { '@id': `${siteUrl}/#store` },
    },
    {
      '@type': ['LocalBusiness', 'ClothingStore', 'ShoeStore'],
      '@id': `${siteUrl}/#store`,
      name: STORE.name,
      legalName: STORE.legalName,
      description: STORE.description,
      url: siteUrl,
      image: [
        `${siteUrl}/images/storefront-night.png`,
        `${siteUrl}/images/sneaker-wall-full.jpg`,
      ],
      telephone: STORE.phone,
      priceRange: STORE.priceRange,
      currenciesAccepted: STORE.currency,
      address: {
        '@type': 'PostalAddress',
        streetAddress: STORE.streetAddress,
        addressLocality: STORE.addressLocality,
        addressRegion: STORE.addressRegion,
        postalCode: STORE.postalCode,
        addressCountry: STORE.addressCountry,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: STORE.latitude,
        longitude: STORE.longitude,
      },
      hasMap: LINKS.maps,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: STORE.opens,
          closes: STORE.closes,
        },
      ],
      sameAs: [LINKS.instagram, LINKS.facebook, LINKS.telegramChannel],
      areaServed: {
        '@type': 'City',
        name: 'Yerevan',
        sameAs: 'https://www.wikidata.org/wiki/Q1953',
      },
      paymentAccepted: 'Cash, Credit Card',
    },
  ],
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
