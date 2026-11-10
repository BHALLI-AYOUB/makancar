'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useBusiness } from '@/components/platform/showroom-context'
import { LanguageSwitcher } from '@/components/platform/language-switcher'
import { useCurrentLocale, useTranslations } from '@/lib/i18n/client'
import { getDirection, withLocalePath } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

export function SiteHeaderClient() {
  const business = useBusiness()
  const [openAt, setOpenAt] = useState<string | null>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const mobileOpen = openAt === pathname
  const locale = useCurrentLocale()
  const t = useTranslations()
  const labels = {
    fr: { open: 'Ouvrir le menu', close: 'Fermer le menu', navigation: 'Navigation principale' },
    en: { open: 'Open menu', close: 'Close menu', navigation: 'Main navigation' },
    ar: { open: 'فتح القائمة', close: 'إغلاق القائمة', navigation: 'التنقل الرئيسي' },
  }[locale]
  const primaryLinks = [
    { href: withLocalePath('/', locale), label: t('common.nav.home') },
    { href: withLocalePath('/vente', locale), label: t('common.nav.vente') },
    { href: withLocalePath('/location', locale), label: t('common.nav.location') },
  ]

  useEffect(() => {
    if (!mobileOpen) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenAt(null)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  function renderLinks(mobile = false) {
    return primaryLinks.map(({ href, label }) => {
      const active = pathname === href || (href !== `/${locale}` && pathname.startsWith(`${href}/`))
      return (
        <Link key={href} href={href} onClick={() => setOpenAt(null)} aria-current={active ? 'page' : undefined}
          className={cn('whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-white/5 hover:text-white',
            active ? 'bg-[#c9a96d]/10 text-[#e3c58e]' : 'text-slate-300', mobile && 'px-4 py-3')}>
          {label}
        </Link>
      )
    })
  }

  function renderAccount() {
    return <a className="makan-button makan-button-gold header-enquiry" href={business.whatsappLink} target="_blank" rel="noopener noreferrer">{{ fr: 'Parlons de votre projet', en: 'Enquire with Makan', ar: 'تواصل مع مكان' }[locale]}</a>
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#c9a96d]/15 bg-[#07090c]/95 backdrop-blur-xl">
      <div className="section-shell" dir="ltr">
        <div className="flex h-16 items-center gap-2 lg:h-[76px] lg:gap-6">
          <Link href={withLocalePath('/', locale)} aria-label="Makan Luxury Motors" onClick={() => setOpenAt(null)} className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <span className="relative block h-11 w-11 shrink-0 overflow-hidden" aria-hidden="true">
              <Image src="/logo.png" alt="" width={205} height={137} priority className="absolute -left-[80px] -top-[26px] h-[137px] w-[205px] max-w-none" />
            </span>
            <span className="text-[#e3c58e]">
              <span className="block text-base font-semibold leading-none tracking-[0.16em] sm:text-xl">MAKAN</span>
              <span className="mt-1.5 block text-[6px] uppercase tracking-[0.17em] sm:text-[8px]">Luxury Motors</span>
            </span>
          </Link>
          <nav aria-label={labels.navigation} className="hidden items-center gap-1 lg:flex" dir={getDirection(locale)}>{renderLinks()}</nav>
          <div className="ms-auto flex items-center gap-2 lg:gap-4">
            <div className="hidden lg:block" dir={getDirection(locale)}>{renderAccount()}</div>
            <LanguageSwitcher />
            <button ref={menuButton} type="button" onClick={() => setOpenAt(current => current === pathname ? null : pathname)} aria-label={mobileOpen ? labels.close : labels.open}
              aria-expanded={mobileOpen} aria-controls="mobile-navigation" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white transition hover:bg-white/5 lg:hidden">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div id="mobile-navigation" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 pb-5 pt-3 lg:hidden" dir={getDirection(locale)}>
            <nav aria-label={labels.navigation} className="mb-4 flex flex-col gap-1">{renderLinks(true)}</nav>
            {renderAccount()}
          </div>
        )}
      </div>
    </header>
  )
}
