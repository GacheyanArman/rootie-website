import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://rootie.am/sitemap.xml',
    host: 'https://rootie.am',
  }
}
