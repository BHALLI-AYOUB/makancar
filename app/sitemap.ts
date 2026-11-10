import type { MetadataRoute } from 'next'
import { getCatalogue } from '@/lib/catalogue'
import { siteUrl } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export default function sitemap(): MetadataRoute.Sitemap {
  const catalogue = getCatalogue()
  const paths = ['', '/vente', '/location', '/recherche-personnalisee', ...catalogue.vehicles.filter(v=>v.visibility==='public').map(v=>`/cars/${v.slug}`)]
  return paths.flatMap(path=>['fr','en','ar'].map(locale=>({ url:`${siteUrl}/${locale}${path}`, lastModified: catalogue.updatedAt, alternates:{ languages:Object.fromEntries(['fr','en','ar'].map(l=>[l,`${siteUrl}/${l}${path}`])) } })))
}
