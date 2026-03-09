'use client'

import { motion } from 'framer-motion'
import { FileCheck2, Globe2, ShieldCheck, Truck } from 'lucide-react'
import { business } from '@/lib/business'

const services = [
  {
    title: 'Sourcing international',
    description: 'Recherche de vehicules en Europe, GCC et Amerique selon votre cahier des charges.',
    icon: Globe2,
  },
  {
    title: 'Conformite legale',
    description: 'Verification documentaire, normes d importation et process reglementaire complet.',
    icon: FileCheck2,
  },
  {
    title: 'Transport securise',
    description: 'Acheminement assure et suivi du vehicule de la commande jusqu a la livraison.',
    icon: Truck,
  },
  {
    title: 'Garantie et support',
    description: 'Accompagnement apres livraison pour une experience client fluide et durable.',
    icon: ShieldCheck,
  },
]

export function ImportExportSection() {
  return (
    <section id="import" className="section-light py-16 sm:py-20">
      <div className="section-shell">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Import / Export</p>
            <h2 className="mt-3 font-serif text-4xl text-black sm:text-6xl">Un service de bout en bout</h2>
            <p className="mt-4 max-w-2xl text-slate-700">
              Makan pilote chaque etape: sourcing, inspection, transport, dedouanement et remise finale.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-black/15 bg-black">
            <img
              src="https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1400&q=80"
              alt="Car transport and import"
              className="h-72 w-full object-cover opacity-80"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-xl border border-black/15 bg-white p-6"
              >
                <div className="inline-flex rounded-md border border-black/20 p-2 text-black">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-black">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{service.description}</p>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#contact" className="btn-blue rounded-md px-6 py-3 text-sm uppercase tracking-[0.14em]">
            Demander un devis
          </a>
          <a
            href={business.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-black/30 px-6 py-3 text-sm uppercase tracking-[0.14em] text-black transition hover:bg-black hover:text-white"
          >
            Ouvrir WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
