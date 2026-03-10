'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck, ShoppingCart, Truck } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Choix du vehicule',
    description: 'Selection du modele, options, finition et budget finalises avec un conseiller.',
    icon: ShoppingCart,
  },
  {
    number: '02',
    title: 'Import et dedouanement',
    description: 'Gestion de la logistique, des formalites douanieres et des documents legaux.',
    icon: Truck,
  },
  {
    number: '03',
    title: 'Livraison et immatriculation',
    description: 'Remise du vehicule et support administratif jusqu a la mise en circulation.',
    icon: ClipboardCheck,
  },
]

export function OrderSection() {
  return (
    <section id="order" className="bg-white py-16 sm:py-20">
      <div className="section-shell">
        <div className="mb-10 text-center sm:mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Sur commande</p>
          <h2 className="mt-3 font-serif text-4xl text-black sm:text-6xl">Un process premium en 3 etapes</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="rounded-xl border border-black/15 bg-white p-6 text-black shadow-[0_16px_40px_-28px_rgba(0,0,0,0.22)]"
              >
                <p className="text-5xl font-serif text-black/55">{step.number}</p>
                <div className="mt-4 inline-flex rounded-md border border-black/15 bg-[#f5f5f5] p-2 text-black">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{step.description}</p>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <a href="#contact" className="btn-blue rounded-md px-8 py-3 text-sm uppercase tracking-[0.14em]">
            Demander un devis personnalise
          </a>
        </div>
      </div>
    </section>
  )
}
