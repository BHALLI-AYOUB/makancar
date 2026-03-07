'use client'

import { motion } from 'framer-motion'
import { MessageCircle, ShoppingCart, ClipboardList, Mail } from 'lucide-react'
import { business } from '@/lib/business'
import { useMediaQuery } from '@/hooks/use-media-query'

export function MobileQuickBar() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (!isMobile) return null

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const items = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: business.whatsappLink,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20 hover:bg-green-500/40',
      isExternal: true,
    },
    {
      icon: ShoppingCart,
      label: 'Stock',
      onClick: () => scrollToSection('stock'),
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20 hover:bg-amber-500/40',
    },
    {
      icon: ClipboardList,
      label: 'Commande',
      onClick: () => scrollToSection('order'),
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20 hover:bg-blue-500/40',
    },
    {
      icon: Mail,
      label: 'Email',
      href: business.emailLink,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20 hover:bg-red-500/40',
      isExternal: true,
    },
  ]

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-amber-400/20 z-40"
    >
      <div className="max-w-6xl mx-auto px-2 py-2">
        <div className="grid grid-cols-4 gap-2">
          {items.map((item) => {
            const Icon = item.icon
            const isHref = 'href' in item

            return (
              <motion.a
                key={item.label}
                href={isHref ? item.href : '#'}
                onClick={(e) => {
                  if (!isHref) {
                    e.preventDefault()
                    item.onClick?.()
                  }
                }}
                target={isHref && item.isExternal ? '_blank' : undefined}
                rel={isHref && item.isExternal ? 'noopener noreferrer' : undefined}
                className={`flex flex-col items-center gap-1 py-3 rounded-lg transition-all ${item.bgColor}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} className={item.color} />
                <span className={`text-xs font-bold ${item.color}`}>{item.label}</span>
              </motion.a>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
