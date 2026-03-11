'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { LayoutDashboard, Menu, ShieldCheck, X } from 'lucide-react'
import type { Profile } from '@/types/database'
import { LogoutButton } from '@/components/platform/logout-button'

const primaryLinks = [
  { href: '/', label: 'Home' },
  { href: '/vente', label: 'Vente' },
  { href: '/location', label: 'Location' },
]

type SiteHeaderClientProps = {
  profile: Profile | null
}

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/82 transition hover:bg-white/8 hover:text-white sm:px-4 sm:text-sm"
    >
      {label}
    </Link>
  )
}

export function SiteHeaderClient({ profile }: SiteHeaderClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const dashboardHref = profile?.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'

  function closeMenu() {
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06080d]/92 backdrop-blur-2xl">
      <div className="section-shell">
        <div className="relative flex min-h-[88px] items-center justify-between gap-4 py-3 md:min-h-[110px] md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 md:py-4">
          <div className="hidden items-center gap-1.5 sm:gap-2 md:flex md:flex-1 md:justify-start">
            {primaryLinks.slice(0, 2).map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          <Link
            href="/"
            aria-label="Makan Luxury Motors"
            className="flex items-center justify-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
            onClick={closeMenu}
          >
            <Image
              src="/logo.png"
              alt="Makan Luxury Motors"
              width={280}
              height={70}
              priority
              className="h-[50px] w-auto object-contain sm:h-[58px] md:h-[70px]"
            />
          </Link>

          <div className="hidden items-center gap-1.5 sm:gap-2 md:flex md:flex-1 md:justify-end">
            {primaryLinks.slice(2).map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}

            {profile ? (
              <>
                <Link
                  href={dashboardHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[11px] text-white transition hover:bg-white/10 sm:px-4 sm:text-sm"
                >
                  {profile.role === 'admin' ? <ShieldCheck size={16} /> : <LayoutDashboard size={16} />}
                  Dashboard
                </Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <NavLink href="/auth/login" label="Connexion" />
                <Link
                  href="/auth/register"
                  className="rounded-full border border-white bg-white px-4 py-2.5 text-[11px] font-semibold text-black transition hover:bg-[#e8e8e8] sm:px-5 sm:text-sm"
                >
                  Creer un compte
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            mobileOpen ? 'max-h-[520px] pb-4 opacity-100' : 'max-h-0 pb-0 opacity-0'
          }`}
        >
          <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-3 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.92)] backdrop-blur-xl">
            <nav className="flex flex-col gap-1">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.14em] text-white/82 transition hover:bg-white/8 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              {profile ? (
                <>
                  <Link
                    href={dashboardHref}
                    onClick={closeMenu}
                    className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.1em] text-white/82 transition hover:bg-white/8 hover:text-white"
                  >
                    {profile.role === 'admin' ? <ShieldCheck size={16} /> : <LayoutDashboard size={16} />}
                    Dashboard
                  </Link>
                  <div className="px-1 pt-2">
                    <LogoutButton className="w-full justify-center rounded-2xl py-3" />
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={closeMenu}
                    className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.14em] text-white/82 transition hover:bg-white/8 hover:text-white"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={closeMenu}
                    className="mt-2 inline-flex items-center justify-center rounded-2xl border border-white bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#e8e8e8]"
                  >
                    Creer un compte
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
