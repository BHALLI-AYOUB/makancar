'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { business } from '@/lib/business'

const links = [
  { label: 'Accueil', href: '#home' },
  { label: 'Stock', href: '#stock' },
  { label: 'Sur commande', href: '#order' },
  { label: 'Import / Export', href: '#import' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto mt-3 w-[calc(100%-1rem)] max-w-7xl rounded-2xl border transition-all duration-300 sm:w-[calc(100%-2rem)] ${
          scrolled
            ? 'border-white/20 bg-[#05070d]/95 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)]'
            : 'border-white/10 bg-[#05070d]/75'
        } backdrop-blur-2xl`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-slate-300 sm:px-6">
          <span className="hidden sm:inline">Luxury mobility by Makan</span>
          <a
            href={`tel:${business.phone}`}
            className="inline-flex items-center gap-2 text-slate-200 transition hover:text-white"
          >
            <Phone size={13} />
            {business.phone}
          </a>
        </div>

        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <Link href="#home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/15 bg-black/60">
              <Image src="/logo.png" alt="Makan Luxury Motors" fill className="object-contain p-1.5" priority />
            </div>
            <div className="leading-none">
              <p className="font-serif text-lg tracking-[0.18em] text-white">MAKAN</p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-300">Luxury Motors</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-xs uppercase tracking-[0.2em] text-slate-300 transition hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-sky-300/80 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="rounded-xl border border-white/15 p-2 text-slate-200 transition hover:text-white lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/10 lg:hidden"
            >
              <div className="space-y-1 p-3">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl border border-transparent px-4 py-3 text-sm uppercase tracking-[0.16em] text-slate-200 transition hover:border-white/10 hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
