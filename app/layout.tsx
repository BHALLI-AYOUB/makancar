import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: 'Makan Luxury Motors - Véhicules de Luxe',
  description: 'Découvrez notre sélection exclusive de véhicules de luxe haut de gamme. Import/Export, vente et location de Mercedes, BMW, Porsche et plus.',
  generator: 'v0.app',
  openGraph: {
    title: 'Makan Luxury Motors',
    description: 'Votre partenaire de confiance pour les véhicules de luxe',
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
      <body className="font-sans antialiased bg-black text-white scroll-smooth">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
