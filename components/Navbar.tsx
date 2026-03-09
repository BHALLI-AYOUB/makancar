'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Globe, Heart, Menu, UserCircle, X } from 'lucide-react'

const links = [
  { label: 'Accueil', href: '#home' },
  { label: 'Stock', href: '#stock' },
  { label: 'Sur commande', href: '#order' },
  { label: 'Import / Export', href: '#import' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-black text-white">
      <div className="section-shell">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Menu"
              className="rounded-md p-2 transition hover:bg-white/10"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button type="button" aria-label="Langue" className="rounded-md p-2 transition hover:bg-white/10">
              <Globe size={22} />
            </button>
          </div>

          <Link href="#home" className="relative h-14 w-14">
            <Image src="/logo.png" alt="Makan logo" fill className="object-contain" priority />
          </Link>

          <div className="flex items-center gap-2">
            <button type="button" aria-label="Favoris" className="rounded-md p-2 transition hover:bg-white/10">
              <Heart size={22} />
            </button>
            <button type="button" aria-label="Profil" className="rounded-md p-2 transition hover:bg-white/10">
              <UserCircle size={24} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/15 bg-black"
          >
            <div className="section-shell py-3">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.16em] text-slate-100 transition hover:border-white/25 hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
