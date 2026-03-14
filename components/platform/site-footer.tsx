'use client'

import Link from 'next/link'
import { business } from '@/lib/business'
import { useCurrentLocale, useTranslations } from '@/lib/i18n/client'
import { withLocalePath } from '@/lib/i18n/config'

export function SiteFooter() {
  const year = new Date().getFullYear()
  const locale = useCurrentLocale()
  const t = useTranslations()

  return (
    <footer className="border-t border-white/10 bg-[#05070c]">
      <div className="section-shell grid gap-8 py-10 sm:py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-white sm:text-3xl">Makan Luxury Motors</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">{t('common.footer.description')}</p>
        </div>

        <div className="grid gap-2 text-sm text-slate-300">
          <Link href={withLocalePath('/', locale)} className="hover:text-white">
            {t('common.nav.home')}
          </Link>
          <Link href={withLocalePath('/vente', locale)} className="hover:text-white">
            {t('common.nav.vente')}
          </Link>
          <Link href={withLocalePath('/location', locale)} className="hover:text-white">
            {t('common.nav.location')}
          </Link>
          <Link href={withLocalePath('/auth/login', locale)} className="hover:text-white">
            {t('common.nav.login')}
          </Link>
        </div>

        <div className="space-y-2 text-sm text-slate-300">
          <p className="font-serif text-2xl text-white">Makan Luxury Motors</p>
          <p>{business.phone}</p>
          <p>{business.email}</p>
          <p>{business.location}</p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        Copyright {year} Makan Cars. {t('common.footer.copyright')}
      </div>
    </footer>
  )
}
