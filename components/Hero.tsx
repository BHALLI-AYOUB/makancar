'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section id="home" className="bg-black pb-10 pt-16 text-white sm:pt-20">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-none border border-white/15 sm:rounded-xl"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Mercedes-AMG_GLS_63_4MATIC%2B_%28X167%29_front.jpg"
            alt="Mercedes-AMG GLS 63"
            className="h-[320px] w-full object-cover sm:h-[520px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mx-auto mt-6 max-w-4xl text-center"
        >
          <h1 className="font-serif text-4xl leading-tight sm:text-6xl">Mercedes GLS Sport.</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-200 sm:text-2xl">
            Puissance AMG, design sportif et confort premium pour une experience de conduite exceptionnelle.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#stock"
              className="btn-blue gap-2 rounded-none border border-blue-500 text-sm uppercase tracking-[0.14em] sm:rounded-md"
            >
              En savoir plus
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-none border border-white/30 px-6 py-3 text-sm uppercase tracking-[0.14em] transition hover:bg-white/10 sm:rounded-md"
            >
              Nous contacter
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
