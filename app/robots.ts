import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent:'*', allow:'/', disallow:['/admin','/auth','/client','/api','/editor','/content','/*/admin','/*/auth','/*/client'] }], sitemap:`${siteUrl}/sitemap.xml` }
}
