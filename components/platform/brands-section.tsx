'use client'

import { useTranslations } from '@/lib/i18n/client'

const brands = [
  { name: 'Mercedes-Benz', logoUrl: 'https://logo-teka.com/wp-content/uploads/2025/06/mercedes-benz-logo.svg', logoClassName: 'h-11 sm:h-12 brightness-0 invert' },
  { name: 'BMW', logoUrl: 'https://cdn.simpleicons.org/bmw/FFFFFF', logoClassName: 'h-9 sm:h-10' },
  { name: 'Audi', logoUrl: 'https://cdn.simpleicons.org/audi/FFFFFF', logoClassName: 'h-8 sm:h-9' },
  { name: 'Volkswagen', logoUrl: 'https://cdn.simpleicons.org/volkswagen/FFFFFF', logoClassName: 'h-9 sm:h-10' },
  { name: 'Skoda', logoUrl: 'https://cdn.simpleicons.org/skoda/FFFFFF', logoClassName: 'h-9 sm:h-10' },
  { name: 'Seat', logoUrl: 'https://cdn.simpleicons.org/seat/FFFFFF', logoClassName: 'h-9 sm:h-10' },
  { name: 'Porsche', logoUrl: 'https://cdn.simpleicons.org/porsche/FFFFFF', logoClassName: 'h-9 sm:h-10' },
  { name: 'Range Rover', logoUrl: 'https://logo-teka.com/wp-content/uploads/2025/06/land-rover-logo.svg', logoClassName: 'h-11 sm:h-12 brightness-0 invert' },
]

export function BrandsSection() {
  const t = useTranslations()

  return (
    <section className="relative overflow-hidden bg-[#040507] py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_36%)]" />
      <div className="section-shell relative z-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#e3c58e]">{t('home.brands.eyebrow')}</p>
          <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.03em] text-white sm:text-6xl">{t('home.brands.title')}</h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{t('home.brands.description')}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand) => (
            <article
              key={brand.name}
              className="group rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] px-6 py-7 text-center shadow-[0_24px_80px_-44px_rgba(0,0,0,0.92)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#c9a96d]/35"
            >
              <p className="text-[11px] uppercase tracking-[0.34em] text-slate-400">{t('common.labels.selectionPremium')}</p>
              <div className="mt-6 flex h-16 items-center justify-center sm:h-20">
                <div className="flex min-h-[60px] w-full max-w-[168px] items-center justify-center rounded-full border border-white/8 bg-white/[0.03] px-5 py-3">
                  <img
                    src={brand.logoUrl}
                    alt={`${brand.name} logo`}
                    className={`w-auto max-w-full object-contain opacity-90 transition duration-500 group-hover:opacity-100 ${brand.logoClassName}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <h3 className="mt-5 font-serif text-3xl text-white">{brand.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
