import Link from 'next/link'
import type { Car } from '@/types/database'

export function HomeHero({
  featuredSale,
  featuredRental,
}: {
  featuredSale?: Car | null
  featuredRental?: Car | null
}) {
  const heroImage = 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=2200&q=80'

  return (
    <section className="relative overflow-hidden bg-[#04070d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%),linear-gradient(180deg,rgba(4,7,13,0.85)_0%,rgba(4,7,13,0.96)_55%,rgba(4,7,13,1)_100%)]" />

      <div className="section-shell relative z-10 py-14 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.38em] text-slate-300">Selection du moment</p>
          <h1 className="mt-4 font-serif text-5xl font-medium leading-[0.94] tracking-[-0.035em] text-white sm:text-7xl">
            Mercedes GLC Full Black 2025.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            Silhouette plus agressive, finition noire integrale et presence premium pour une mise en avant
            plus forte sur la page d accueil de Makan Luxury Motors.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_35px_120px_-55px_rgba(0,0,0,0.95)]">
          <div className="relative min-h-[360px] sm:min-h-[500px] lg:min-h-[620px]">
            <img
              src={heroImage}
              alt="Mercedes GLC Full Black 2025"
              className="absolute inset-0 h-full w-full object-cover object-[68%_center] brightness-[0.65] contrast-125 saturate-60"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,7,13,0.88)_0%,rgba(4,7,13,0.42)_38%,rgba(4,7,13,0.08)_62%,rgba(4,7,13,0.18)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,13,0.08)_0%,rgba(4,7,13,0.02)_55%,rgba(4,7,13,0.4)_100%)]" />

            <div className="absolute bottom-[16%] left-[9%] z-10 max-w-xl rounded-[28px] border border-white/10 bg-[#070b12]/65 p-5 backdrop-blur-xl sm:p-7">
              <p className="text-xs uppercase tracking-[0.34em] text-slate-300">Voiture en vedette</p>
              <h2 className="mt-3 font-serif text-3xl font-medium text-white sm:text-5xl">
                Mercedes GLC Full Black 2025
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-200 sm:text-base">
                Une configuration full black sobre et haut de gamme, ideale pour presenter une image plus luxe
                et plus impactante de la marque Makan Luxury Motors.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={featuredSale ? `/cars/${featuredSale.id}` : '/vente'} className="btn-blue rounded-full px-6 py-3">
                  Voir la GLC
                </Link>
                <Link
                  href="/vente"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm text-white transition hover:bg-white/8"
                >
                  Voir le stock
                </Link>
              </div>
            </div>

            <div className="absolute bottom-[14%] left-[24%] h-10 w-28 rounded-md bg-[#05070c]/95 sm:h-12 sm:w-32" />
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {[featuredSale, featuredRental].filter(Boolean).map((car) => (
            <div
              key={car!.id}
              className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {car!.type === 'vente' ? 'Voiture en vente' : 'Location recommandee'}
              </p>
              <h3 className="mt-3 font-serif text-3xl font-medium text-white">{car!.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{car!.description}</p>
              <Link href={`/cars/${car!.id}`} className="mt-4 inline-flex text-sm text-white/90 underline-offset-4 hover:underline">
                Voir la fiche
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
