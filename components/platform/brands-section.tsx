'use client'

import { useTranslations } from '@/lib/i18n/client'

type Brand = {
  name: string
  logoUrl: string
  logoClassName: string
}

type BrandGroup = {
  title: string
  description: string
  className: string
  brands: Brand[]
}

const brandGroups: BrandGroup[] = [
  {
    title: 'Marques iconiques',
    description: 'Mercedes-Benz, BMW et Audi pour une selection executive et elegante.',
    className: 'lg:col-span-7 lg:row-span-2',
    brands: [
      { name: 'Mercedes-Benz', logoUrl: 'https://logo-teka.com/wp-content/uploads/2025/06/mercedes-benz-logo.svg', logoClassName: 'h-11 sm:h-12 brightness-0 invert' },
      { name: 'BMW', logoUrl: 'https://cdn.simpleicons.org/bmw/FFFFFF', logoClassName: 'h-9 sm:h-10' },
      { name: 'Audi', logoUrl: 'https://cdn.simpleicons.org/audi/FFFFFF', logoClassName: 'h-8 sm:h-9' },
    ],
  },
  {
    title: 'SUV & polyvalence',
    description: 'Volkswagen, Skoda et Seat pour des vehicules fiables, pratiques et valorisants.',
    className: 'lg:col-span-5',
    brands: [
      { name: 'Volkswagen', logoUrl: 'https://cdn.simpleicons.org/volkswagen/FFFFFF', logoClassName: 'h-9 sm:h-10' },
      { name: 'Skoda', logoUrl: 'https://cdn.simpleicons.org/skoda/FFFFFF', logoClassName: 'h-9 sm:h-10' },
      { name: 'Seat', logoUrl: 'https://cdn.simpleicons.org/seat/FFFFFF', logoClassName: 'h-9 sm:h-10' },
    ],
  },
  {
    title: 'Prestige & caractere',
    description: 'Porsche et Range Rover pour une selection plus exclusive et emotionnelle.',
    className: 'lg:col-span-5',
    brands: [
      { name: 'Porsche', logoUrl: 'https://cdn.simpleicons.org/porsche/FFFFFF', logoClassName: 'h-9 sm:h-10' },
      { name: 'Range Rover', logoUrl: 'https://logo-teka.com/wp-content/uploads/2025/06/land-rover-logo.svg', logoClassName: 'h-11 sm:h-12 brightness-0 invert' },
    ],
  },
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

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          {brandGroups.map((group) => (
            <article
              key={group.title}
              className={`group rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] px-5 py-6 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.92)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#c9a96d]/35 sm:px-6 sm:py-7 ${group.className}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-md">
                  <h3 className="font-serif text-2xl text-white sm:text-3xl">{group.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{group.description}</p>
                </div>
                <span className="hidden h-10 w-10 shrink-0 rounded-full border border-[#c9a96d]/20 bg-[#0f131b] lg:block" />
              </div>

              <div className={`mt-6 grid gap-3 ${group.brands.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
                {group.brands.map((brand) => (
                  <div
                    key={brand.name}
                    className="rounded-[24px] border border-white/8 bg-white/[0.03] px-3 py-4 text-center transition duration-500 group-hover:border-white/12"
                  >
                    <div className="flex h-14 items-center justify-center sm:h-16">
                      <img
                        src={brand.logoUrl}
                        alt={`${brand.name} logo`}
                        className={`w-auto max-w-full object-contain opacity-90 transition duration-500 group-hover:opacity-100 ${brand.logoClassName}`}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium text-white sm:text-base">{brand.name}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
