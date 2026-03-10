'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const featuredGlcImage =
  'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1600&q=80'

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#03050a] pb-28 pt-24 text-white sm:pb-32 sm:pt-28"
    >
      <div className="absolute inset-0">
        <img
          src={featuredGlcImage}
          alt="Mercedes GLC Coupe"
          className="h-full w-full object-cover opacity-22"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(104,130,172,0.16),transparent_28%),linear-gradient(180deg,rgba(3,5,10,0.84)_0%,rgba(3,5,10,0.92)_42%,rgba(3,5,10,1)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(3,5,10,0.88)_0%,rgba(3,5,10,0.7)_48%,rgba(3,5,10,0.2)_100%)]" />
      </div>

      <div className="section-shell relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.22em] text-slate-200 backdrop-blur-xl sm:w-fit">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40">
              <img src="/logo.png" alt="Makan" className="h-5 w-5 object-contain" />
            </span>
            <span>MAKAN LUXURY MOTORS</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <p className="mb-4 text-[11px] uppercase tracking-[0.45em] text-slate-300">
                MAKAN LUXURY MOTORS
              </p>
              <h1 className="font-serif text-5xl leading-[0.94] tracking-[-0.03em] text-white sm:text-7xl">
                L&apos;experience automobile haut de gamme.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-2xl sm:leading-10">
                Stock immediat, import sur mesure et accompagnement complet. Un style sobre, precis et premium
                pour chaque projet client.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#stock"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-8 py-4 text-sm uppercase tracking-[0.22em] text-white transition hover:bg-white/14"
                >
                  Voir le stock
                  <ArrowRight size={17} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-white/20 px-8 py-4 text-sm uppercase tracking-[0.22em] text-white transition hover:bg-white/10"
                >
                  Demander un devis
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="hidden lg:block"
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-3 shadow-[0_30px_90px_-35px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                <img
                  src={featuredGlcImage}
                  alt="Mercedes GLC Coupe"
                  className="h-[430px] w-full rounded-[1.4rem] object-cover"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] p-5 shadow-[0_30px_90px_-35px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:p-7"
          >
            <p className="text-xs uppercase tracking-[0.38em] text-slate-300">Selection du mois</p>
            <h2 className="mt-3 font-serif text-4xl leading-none text-white sm:text-6xl">Mercedes GLC Coupe</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-xl sm:leading-8">
              Pack AMG Black Night. Configuration complete et livraison rapide avec dedouanement inclus.
            </p>
            <div className="mt-6 rounded-full border border-white/10 bg-white/6 px-5 py-4">
              <div className="flex items-center gap-3 text-sm text-slate-100 sm:text-lg">
                <Sparkles size={18} className="text-sky-200" />
                <span>Selection controlee avant livraison</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
