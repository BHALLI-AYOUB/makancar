import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: 'Makan Cars | Vente et Location de Voitures Premium',
  description: 'Plateforme professionnelle de vente et location de voitures avec espace client, espace admin et reservation en ligne.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans antialiased bg-[#0a0d14] text-slate-50 scroll-smooth">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
