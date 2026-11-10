import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.makanluxurymotors.com'
export function pageMetadata(locale: Locale, path: string, title: string, description: string, image = '/background.png'): Metadata {
  const url = `${siteUrl}/${locale}${path}`
  return { title, description, alternates: { canonical: url, languages: Object.fromEntries(['fr','en','ar'].map(l=>[l,`${siteUrl}/${l}${path}`]).concat([['x-default',`${siteUrl}/fr${path}`]])) }, openGraph: { title, description, url, locale, type: 'website', images: [{ url: `${siteUrl}${image}`, width: 1200, height: 900, alt: title }] }, twitter: { card: 'summary_large_image', title, description, images: [`${siteUrl}${image}`] } }
}
