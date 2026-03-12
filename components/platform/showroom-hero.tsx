'use client'

import Link from 'next/link'
import type { ShowroomCar } from '@/types/showroom'
import { getWhatsAppHref } from '@/lib/data/showroom-stock'
import { useCurrentLocale, useTranslations } from '@/lib/i18n/client'

export function ShowroomHero({ car }: { car: ShowroomCar }) {
  const locale = useCurrentLocale()
  const t = useTranslations()
  const title = car.heroTitle ?? car.name
  const subtitle = car.heroSubtitle ?? car.subtitle
  const description = car.heroDescription ?? t('home.hero.descriptionFallback')

  return (
    <section className="relative overflow-hidden bg-[#040507]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,109,0.12),transparent_28%),linear-gradient(180deg,rgba(4,5,7,0.76)_0%,rgba(4,5,7,0.9)_54%,rgba(4,5,7,1)_100%)]" />
      <div className="section-shell relative z-10 py-10 sm:py-14 lg:py-18">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.36em] text-[#e3c58e]">{t('home.hero.eyebrow')}</p>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-[0.92] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            {subtitle ? <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-300 sm:mt-5 sm:text-sm">{subtitle}</p> : null}
            {car.price ? <p className="mt-5 text-2xl font-semibold text-[#e3c58e] sm:mt-6 sm:text-4xl">{car.price}</p> : null}
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
              {description}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href={`/${locale}/vente`}
                className="inline-flex items-center justify-center rounded-full border border-white bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#ececec] sm:px-6"
              >
                {t('common.actions.viewStock')}
              </Link>
              <a
                href={getWhatsAppHref(car.whatsapp, car.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#c9a96d]/35 bg-[#c9a96d] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d8b97e] sm:px-6"
              >
                {t('common.actions.contactWhatsapp')}
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-2.5 shadow-[0_35px_120px_-55px_rgba(0,0,0,0.95)] sm:rounded-[34px] sm:p-3">
            <div className="flex min-h-[260px] items-center justify-center rounded-[22px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%),linear-gradient(180deg,#0a0d14_0%,#05070c_100%)] px-3 py-4 sm:min-h-[420px] sm:rounded-[28px] sm:px-6 sm:py-8 lg:min-h-[580px] lg:px-8">
              <img
                src={car.gallery[0]}
                alt={car.name}
                className="h-full max-h-[220px] w-full rounded-[22px] object-contain object-center sm:max-h-[360px] sm:rounded-[28px] lg:max-h-[520px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
