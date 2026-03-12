import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { getMessages } from '@/lib/i18n/dictionaries'
import { isLocale, locales, withLocalePath } from '@/lib/i18n/config'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const seo = getMessages(locale).seo

  return {
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    alternates: {
      canonical: withLocalePath('/', locale),
      languages: {
        fr: '/fr',
        en: '/en',
        ar: '/ar',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return children
}
