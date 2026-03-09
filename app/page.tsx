'use client'

import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { StockSection } from '@/components/StockSection'
import { OrderSection } from '@/components/OrderSection'
import { ImportExportSection } from '@/components/ImportExportSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { MobileQuickBar } from '@/components/MobileQuickBar'
import { Toaster } from 'sonner'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <Hero />
      <StockSection />
      <OrderSection />
      <ImportExportSection />
      <ContactSection />
      <Footer />
      <MobileQuickBar />
      <Toaster position="top-center" theme="dark" />
    </main>
  )
}
