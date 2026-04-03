import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { FloatingChatbot } from '@/components/platform/floating-chatbot'
import { getServerDirection, getServerLocale } from '@/lib/i18n/server'
import './globals.css'
const manrope = Manrope({ subsets: ['latin'], variable: '--font-ui' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
})

async function getMetadataBase() {
  const headerList = await headers()
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (configuredSiteUrl) {
    return new URL(configuredSiteUrl)
  }

  const host = headerList.get('x-forwarded-host') ?? headerList.get('host') ?? 'example.com'
  const protocol = headerList.get('x-forwarded-proto') ?? (host.includes('localhost') ? 'http' : 'https')

  return new URL(`${protocol}://${host}`)
}

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = await getMetadataBase()
  const title = 'Makan Luxury Motors'
  const description = 'Showroom premium, stock reel et accompagnement personnalise pour vos vehicules de prestige.'
  const url = new URL('/', metadataBase).toString()
  const ogImage = new URL('/background.png', metadataBase).toString()

  return {
    metadataBase,
    title,
    description,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Makan Luxury Motors showroom preview',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    icons: {
      icon: [{ url: '/favoris.ico?v=3', type: 'image/x-icon' }],
      shortcut: '/favoris.ico?v=3',
      apple: '/logo.png?v=3',
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getServerLocale()
  const direction = await getServerDirection()

  return (
    <html lang={locale} dir={direction} data-scroll-behavior="smooth" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-[#040507] pb-28 font-sans text-white antialiased sm:pb-32 lg:pb-0">
        {children}
        <FloatingChatbot />
        <Analytics />
      </body>
    </html>
  )
}
