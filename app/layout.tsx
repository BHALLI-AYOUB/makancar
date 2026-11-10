import type { Metadata } from 'next'
import { pageMetadata, siteUrl } from '@/lib/seo'
import { getCatalogue } from '@/lib/catalogue'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { getServerDirection, getServerLocale } from '@/lib/i18n/server'
import './globals.css'
import './home.css'
import './showroom.css'
const manrope = Manrope({ subsets: ['latin'], variable: '--font-ui' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
})

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const catalogue = getCatalogue()
  const car = catalogue.vehicles.find(v => v.id === catalogue.featuredIds[0] && v.visibility === 'public')
  const description = catalogue.showroom.hero[locale].text
  return { ...pageMetadata(locale, '', 'Makan Luxury Motors', description, car?.photos[0]?.path), metadataBase: new URL(siteUrl), icons: { icon: '/favoris.ico', apple: '/logo.png' } }
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
      <body className="min-h-screen overflow-x-hidden bg-[#040507] font-sans text-white antialiased ">
        {children}
        <Toaster richColors theme="dark" />
        <Analytics />
      </body>
    </html>
  )
}
