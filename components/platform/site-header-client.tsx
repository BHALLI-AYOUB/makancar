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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06080d]/92 pt-2 sm:pt-3 backdrop-blur-2xl">
      <div className="section-shell md:hidden" dir="ltr">
        <div className="relative flex min-h-[9.75rem] items-center justify-center py-6">
          <div className="pointer-events-none absolute inset-x-6 inset-y-2 rounded-[32px] bg-[radial-gradient(circle_at_center,rgba(201,169,109,0.18),rgba(201,169,109,0.05)_38%,transparent_75%)] opacity-90" />

          <Link
            href={withLocalePath('/', locale)}
            aria-label="Makan Luxury Motors"
            className="relative z-10 flex items-center justify-center pt-1"
            onClick={closeMenu}
          >
            <span className="relative block h-[7.5rem] w-[15.5rem] max-w-full">
              <Image
                src="/logo.png"
                alt="Makan Luxury Motors"
                fill
                priority
                className="object-contain object-center"
                sizes="248px"
              />
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            className="absolute right-0 top-1/2 z-10 inline-flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-white/[0.035] text-white shadow-[0_20px_50px_-28px_rgba(0,0,0,0.95)] transition hover:bg-white/10"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
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
        <div className="md:grid md:min-h-[7.5rem] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-6 md:py-5">
          <div className="hidden items-center gap-1 sm:gap-1.5 md:flex md:min-w-0 md:justify-start">
            {primaryLinks.slice(0, 2).map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          <Link
            href={withLocalePath('/', locale)}
            aria-label="Makan Luxury Motors"
            className="mx-auto flex items-center justify-center pt-1 md:justify-self-center"
            onClick={closeMenu}
          >
            <span className="relative block h-[4.875rem] w-[12.5rem] max-w-full sm:h-[5.5rem] sm:w-[14.5rem] md:h-[6.25rem] md:w-[16.5rem] lg:h-[6.75rem] lg:w-[18rem]">
              <Image
                src="/logo.png"
                alt="Makan Luxury Motors"
                fill
                priority
                className="object-contain object-center"
                sizes="(max-width: 639px) 200px, (max-width: 767px) 232px, (max-width: 1023px) 264px, 288px"
              />
            </span>
          </Link>

          <div className="hidden items-center gap-1 sm:gap-1.5 md:flex md:min-w-0 md:flex-wrap md:justify-end">
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
