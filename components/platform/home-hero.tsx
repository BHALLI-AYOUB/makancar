import Link from 'next/link'
import type { Car } from '@/types/database'

export function HomeHero({
  featuredSale,
  featuredRental,
}: {
  featuredSale?: Car | null
  featuredRental?: Car | null
}) {
  const heroImage =
    featuredSale?.image_url ??
    'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1800&q=80'

  return (
    <section className="relative overflow-hidden bg-[#04070d]">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Makan fleet" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(64,125,255,0.22),transparent_30%),linear-gradient(180deg,rgba(4,7,13,0.75)_0%,rgba(4,7,13,0.9)_45%,rgba(4,7,13,1)_100%)]" />
      </div>
      <div className="section-shell relative z-10 py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.4em] text-sky-300">Plateforme professionnelle</p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.95] text-white sm:text-7xl">
              Vente et location de voitures premium.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Un catalogue moderne, une reservation en ligne, un espace client complet et une administration
              centralisee pour gerer ventes, locations et stocks.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/vente" className="btn-blue rounded-full px-7 py-3.5">
                Voir les voitures en vente
              </Link>
              <Link
                href="/location"
                className="rounded-full border border-white/15 px-7 py-3.5 text-sm text-white transition hover:bg-white/10"
              >
                Explorer la location
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {[featuredSale, featuredRental].filter(Boolean).map((car) => (
              <div
                key={car!.id}
                className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-5 backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {car!.type === 'vente' ? 'Voiture en vente' : 'Location recommandee'}
                </p>
                <h3 className="mt-3 font-serif text-3xl text-white">{car!.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{car!.description}</p>
                <Link href={`/cars/${car!.id}`} className="mt-4 inline-flex text-sm text-sky-300 hover:text-sky-200">
                  Voir la fiche
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
