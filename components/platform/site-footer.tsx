'use client'

import Link from 'next/link'
import { LockKeyhole } from 'lucide-react'
import { useShowroomContent, useBusiness } from '@/components/platform/showroom-context'
import { useCurrentLocale, useTranslations } from '@/lib/i18n/client'
import { withLocalePath } from '@/lib/i18n/config'

const adminLoginUrl = '/admin'

export function SiteFooter() {
  const business = useBusiness()
  const description = useShowroomContent('footer')
  const year = new Date().getFullYear()
  const locale = useCurrentLocale()
  const t = useTranslations()

  return (
    <footer className="border-t border-white/10 bg-[#05070c]">
      <div className="section-shell grid gap-8 py-10 sm:py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-white sm:text-3xl">{business.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">{description}</p>
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
        </div>

        <div className="space-y-2 text-sm text-slate-300">
          <p className="font-serif text-2xl text-white">{business.name}</p>
          <a className="block" href={`tel:${business.phone.replace(/[^+0-9]/g, '')}`}>{business.phone}</a>
          <a className="block" href={business.emailLink}>{business.email}</a>
          <p>{business.location}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col items-center justify-center gap-3 py-4 text-center text-xs text-slate-500 sm:flex-row sm:gap-5">
          <span>Copyright {year} Makan Cars. {t('common.footer.copyright')}</span>
          <a
            href={adminLoginUrl}
            rel="nofollow"
            title={t('common.footer.admin')}
            className="inline-flex items-center gap-2 rounded-full border border-[#d3b17a]/40 px-3 py-1.5 text-[#d3b17a] transition-colors hover:border-[#d3b17a] hover:bg-[#d3b17a] hover:text-[#05070c]"
          >
            <LockKeyhole className="size-3.5" aria-hidden="true" />
            <span>{t('common.footer.admin')}</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
