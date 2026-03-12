import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Makan Luxury Motors',
  description: 'Luxury vehicle selection, real inventory, and personalized support.',
  openGraph: {
    title: 'Makan Cars',
    description: 'Vente, location et reservation de voitures premium.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getServerLocale()
  const direction = await getServerDirection()

  return (
    <html lang={locale} dir={direction} className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-[#040507] pb-28 font-sans text-white antialiased scroll-smooth sm:pb-32 lg:pb-0">
        {children}
        <FloatingChatbot />
        <Analytics />
      </body>
    </html>
  )
}
