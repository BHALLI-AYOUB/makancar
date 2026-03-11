import { Award, Clock3, ShieldCheck, Sparkles } from 'lucide-react'

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Confiance',
    copy: 'Selection rigoureuse, verification des vehicules et accompagnement transparent du premier contact a la livraison.',
    tone: 'text-white',
    ring: 'border-white/20',
    badge: 'bg-white/8 text-white',
  },
  {
    icon: Award,
    title: 'Excellence',
    copy: 'Une selection premium de modeles Mercedes-Benz, SUV de prestige et configurations haut de gamme pour une clientele exigeante.',
    tone: 'text-white',
    ring: 'border-white/20',
    badge: 'bg-white/8 text-white',
  },
  {
    icon: Clock3,
    title: 'Accompagnement',
    copy: "Stock disponible, import sur mesure et suivi administratif complet pour reduire les delais et securiser chaque projet.",
    tone: 'text-white',
    ring: 'border-white/20',
    badge: 'bg-white/8 text-white',
  },
  {
    icon: Sparkles,
    title: 'Experience premium',
    copy: 'Conseil personnalise, sourcing international et presentation soignee pour transformer une simple recherche en experience luxe.',
    tone: 'text-white',
    ring: 'border-white/20',
    badge: 'bg-white/8 text-white',
  },
]

export function AboutMakan() {
  return (
    <section className="relative overflow-hidden bg-[#05080e] py-16 sm:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px] opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_38%)]" />

      <div className="section-shell relative z-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.34em] text-slate-300">A propos de nous</p>
          <h2 className="mt-4 font-serif text-4xl font-medium text-white sm:text-6xl">MAKAN Luxury Motors</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            Votre partenaire premium pour l achat, la location et l import de voitures de prestige au Maroc.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_0_90px_-45px_rgba(255,255,255,0.18)] backdrop-blur-xl sm:p-10">
          <p className="text-base leading-8 text-slate-200">
            Depuis sa creation, Makan Luxury Motors developpe une approche sobre, precise et haut de gamme
            autour de la vente automobile, du stock immediat et de l import sur commande. Notre objectif est
            simple: proposer a chaque client une experience fiable, elegante et parfaitement maitrisee, qu il
            recherche un vehicule de luxe pret a rouler ou une configuration personnalisee importee selon ses
            exigences.
          </p>

          <div className="mt-8 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/6 text-white">
                <Award size={22} />
              </span>
              <div>
                <p className="text-3xl font-semibold text-white">Notre mission</p>
                <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-base">
                  Offrir une experience automobile premium fondee sur la confiance, la rapidite de traitement,
                  la qualite des vehicules et un accompagnement complet, du sourcing jusqu a la mise a
                  disposition finale.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon

            return (
              <article
                key={pillar.title}
                className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-6 backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${pillar.ring} bg-[#090d14] ${pillar.tone}`}>
                    <Icon size={24} />
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${pillar.badge}`}>{index + 1}</span>
                </div>
                <h3 className="mt-6 text-3xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{pillar.copy}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
