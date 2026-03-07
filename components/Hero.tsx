'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, TimerReset } from 'lucide-react'

const heroStats = [
  { label: 'Vehicules premium', value: '40+' },
  { label: 'Pays de sourcing', value: '12' },
  { label: 'Delai moyen', value: '21 jours' },
]

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(3,5,9,0.92)_0%,rgba(3,5,9,0.76)_45%,rgba(3,5,9,0.2)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_24%,rgba(173,196,221,0.16),transparent_34%)]" />
      </div>

      <div className="section-shell relative z-10 flex min-h-[calc(100svh-7rem)] flex-col justify-end pb-12 sm:pb-16">
        <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-slate-300">Makan Luxury Motors</p>
            <h1 className="max-w-3xl font-serif text-4xl leading-[1.02] text-white sm:text-6xl xl:text-7xl">
              L&apos;experience automobile haut de gamme.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-slate-200/90 sm:text-lg">
              Stock immediat, import sur mesure et accompagnement complet. Un style sobre, precis et premium pour
              chaque projet client.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#stock"
                className="inline-flex items-center gap-2 rounded-full border border-sky-200/40 bg-sky-100/10 px-6 py-3 text-sm uppercase tracking-[0.18em] text-sky-100 transition hover:bg-sky-100/20"
              >
                Voir le stock
                <ArrowRight size={15} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
              >
                Demander un devis
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="glass-panel rounded-3xl p-6 sm:p-8"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Selection du mois</p>
            <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">Mercedes GLC Coupe</h2>
            <p className="mt-3 text-sm text-slate-200">
              Pack AMG Black Night. Configuration complete et livraison rapide avec dedouanement inclus.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Sparkles size={16} className="text-sky-200" />
                <span className="text-sm text-slate-100">Selection controlee avant livraison</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <ShieldCheck size={16} className="text-sky-200" />
                <span className="text-sm text-slate-100">Conformite administrative et garantie</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <TimerReset size={16} className="text-sky-200" />
                <span className="text-sm text-slate-100">Processus optimise de la commande a la remise</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-10 grid gap-3 sm:grid-cols-3"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="glass-panel rounded-2xl px-5 py-4">
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.17em] text-slate-300">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
