'use client'

import { motion } from 'framer-motion'
import { Mail, MessageCircle, Search, SquareStack } from 'lucide-react'
import { business } from '@/lib/business'
import { useMediaQuery } from '@/hooks/use-media-query'

export function MobileQuickBar() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  if (!isMobile) return null

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/20 bg-black/95 px-2 py-2 backdrop-blur-md"
    >
      <div className="grid grid-cols-4 gap-2">
        <a
          href={business.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 rounded-md border border-white/20 py-2 text-white"
        >
          <MessageCircle size={17} />
          <span className="text-[10px] uppercase tracking-[0.12em]">WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={() => scrollToSection('stock')}
          className="flex flex-col items-center gap-1 rounded-md border border-white/20 py-2 text-white"
        >
          <Search size={17} />
          <span className="text-[10px] uppercase tracking-[0.12em]">Stock</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('order')}
          className="flex flex-col items-center gap-1 rounded-md border border-blue-500 bg-blue-600/20 py-2 text-white"
        >
          <SquareStack size={17} />
          <span className="text-[10px] uppercase tracking-[0.12em]">Commande</span>
        </button>
        <a href={business.emailLink} className="flex flex-col items-center gap-1 rounded-md border border-white/20 py-2 text-white">
          <Mail size={17} />
          <span className="text-[10px] uppercase tracking-[0.12em]">Email</span>
        </a>
      </div>
    </motion.div>
  )
}
