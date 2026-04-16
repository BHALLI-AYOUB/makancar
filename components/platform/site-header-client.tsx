'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { LayoutDashboard, Menu, ShieldCheck, X } from 'lucide-react'
import type { Profile } from '@/types/database'
import { LogoutButton } from '@/components/platform/logout-button'
import { LanguageSwitcher } from '@/components/platform/language-switcher'
import { useCurrentLocale, useTranslations } from '@/lib/i18n/client'
import { withLocalePath } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

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

function NavbarLogo({ mobile = false }: { mobile?: boolean }) {
  return (
    <span
      className={cn(
        'relative block overflow-hidden rounded-[999px] border border-[#d4a743]/18 bg-[linear-gradient(180deg,rgba(11,14,20,0.98),rgba(5,7,11,1))] shadow-[0_24px_52px_-32px_rgba(0,0,0,0.96)]',
        mobile ? 'h-[3.35rem] w-[9rem]' : 'h-[3.7rem] w-[10rem] lg:h-[3.95rem] lg:w-[10.8rem]',
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-[1px] rounded-[999px] border border-white/7" />
      <span className="absolute inset-[6px] rounded-[999px] border border-[#d4a743]/18" />
      <Image
        src="/logo.png"
        alt="Makan Luxury Motors"
        fill
        priority
        sizes={mobile ? '(max-width: 767px) 144px' : '(max-width: 1279px) 160px, 172px'}
        className={cn(
          'object-contain opacity-[0.98] drop-shadow-[0_10px_28px_rgba(0,0,0,0.45)]',
          mobile ? 'scale-[1.18] p-[0.15rem]' : 'scale-[1.14] p-[0.2rem]',
        )}
      />
    </span>
  )
}

export function SiteHeaderClient({ profile }: SiteHeaderClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const locale = useCurrentLocale()
  const t = useTranslations()
  const primaryLinks = [
    { href: withLocalePath('/', locale), label: t('common.nav.home') },
    { href: withLocalePath('/vente', locale), label: t('common.nav.vente') },
    { href: withLocalePath('/location', locale), label: t('common.nav.location') },
  ]

  const dashboardHref = withLocalePath(profile?.role === 'admin' ? '/admin/dashboard' : '/client/dashboard', locale)

  function closeMenu() {
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#d4a743]/12 bg-[linear-gradient(180deg,rgba(5,7,10,0.96),rgba(6,9,14,0.88))] pt-1 sm:pt-2 backdrop-blur-2xl">
      <div className="section-shell md:hidden" dir="ltr">
        <div className="relative flex min-h-[5.85rem] items-center justify-center py-2">
          <Link
            href={withLocalePath('/', locale)}
            aria-label="Makan Luxury Motors"
            className="relative z-10 flex max-w-[calc(100%-4.75rem)] items-center justify-center"
            onClick={closeMenu}
          >
            <NavbarLogo mobile />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            className="absolute right-0 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4a743]/18 bg-[rgba(255,255,255,0.04)] text-white shadow-[0_16px_36px_-20px_rgba(0,0,0,0.9)] transition hover:bg-white/10"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-[520px] pb-4 opacity-100' : 'max-h-0 pb-0 opacity-0'
          }`}
        >
          <div className="rounded-[26px] border border-[#d4a743]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(9,12,18,0.78))] p-3 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.92)] backdrop-blur-xl">
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
                    {t('common.nav.dashboard')}
                  </Link>
                  <div className="px-1 pt-2">
                    <LogoutButton className="w-full justify-center rounded-2xl py-3" />
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href={withLocalePath('/auth/login', locale)}
                    onClick={closeMenu}
                    className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.14em] text-white/82 transition hover:bg-white/8 hover:text-white"
                  >
                    {t('common.nav.login')}
                  </Link>
                  <Link
                    href={withLocalePath('/auth/register', locale)}
                    onClick={closeMenu}
                    className="mt-2 inline-flex items-center justify-center rounded-2xl border border-white bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#e8e8e8]"
                  >
                    {t('common.nav.register')}
                  </Link>
                </>
              )}
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="section-shell hidden md:block" dir="ltr">
        <div className="md:grid md:min-h-[5.5rem] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-6 md:py-3">
          <div className="hidden items-center gap-1 sm:gap-1.5 md:flex md:min-w-0 md:justify-start">
            {primaryLinks.slice(0, 2).map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          <Link
            href={withLocalePath('/', locale)}
            aria-label="Makan Luxury Motors"
            className="mx-auto flex items-center justify-center md:justify-self-center"
            onClick={closeMenu}
          >
            <NavbarLogo />
          </Link>

          <div className="hidden items-center gap-1 sm:gap-2 md:flex md:min-w-0 md:flex-wrap md:justify-end">
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
                  {t('common.nav.dashboard')}
                </Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <NavLink href={withLocalePath('/auth/login', locale)} label={t('common.nav.login')} />
                <Link
                  href={withLocalePath('/auth/register', locale)}
                  className="rounded-full border border-white bg-white px-4 py-2.5 text-[11px] font-semibold text-black transition hover:bg-[#e8e8e8] sm:px-5 sm:text-sm"
                >
                  {t('common.nav.register')}
                </Link>
              </>
            )}
            <LanguageSwitcher />
          </div>

        </div>
      </div>
    </header>
  )
}
