'use client'

import { useTranslations } from '@/lib/i18n/client'

export function MapSection() {
  const t = useTranslations()

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(201,169,109,0.08),transparent_30%),linear-gradient(180deg,#040507_0%,#070b12_100%)] py-16 sm:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
      <div className="section-shell relative z-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.34em] text-[#e3c58e]">{t('home.map.eyebrow')}</p>
          <h2 className="mt-3 font-serif text-4xl text-white sm:text-6xl">{t('home.map.title')}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-lg">{t('home.map.description')}</p>
        </div>

        <div className="mt-10 grid gap-5 xl:grid-cols-[0.38fr_0.62fr]">
          <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:rounded-[30px] sm:p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[#e3c58e]">Makan Luxury Motors</p>
            <h3 className="mt-3 font-serif text-2xl text-white sm:text-3xl">{t('home.map.city')}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {t('home.map.description')}
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-sm text-slate-200">{t('home.map.city')}</div>
              <div className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-sm text-slate-200">{t('home.map.showroomByAppointment')}</div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#ececec]"
              >
                {t('common.actions.contactUs')}
              </a>
              <a
                href="https://www.google.com/maps?q=Bruxelles,+Belgique"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#c9a96d]/35 bg-[#c9a96d] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d8b97e]"
              >
                {t('common.actions.viewRoute')}
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-2.5 shadow-[0_28px_90px_-48px_rgba(0,0,0,0.92)] backdrop-blur-xl sm:rounded-[32px] sm:p-3">
            <div className="overflow-hidden rounded-[22px] border border-white/10 sm:rounded-[26px]">
              <iframe
                title={t('home.map.city')}
                src="https://www.openstreetmap.org/export/embed.html?bbox=4.287%2C50.805%2C4.421%2C50.885&layer=mapnik&marker=50.8466%2C4.3528"
                className="h-[300px] w-full sm:h-[400px] lg:h-[460px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
