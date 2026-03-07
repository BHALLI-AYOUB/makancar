'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Truck, ClipboardCheck } from 'lucide-react'
import { business } from '@/lib/business'

const steps = [
  {
    number: '01',
    title: 'Choix du véhicule',
    description: 'Sélectionnez le modèle et les options qui correspondent à vos besoins',
    icon: ShoppingCart,
  },
  {
    number: '02',
    title: 'Import & Dédouanement',
    description: 'Nous gérons l\'importation, la douane et tous les documents administratifs',
    icon: Truck,
  },
  {
    number: '03',
    title: 'Livraison & Immatriculation',
    description: 'Réception du véhicule et assistance pour l\'immatriculation locale',
    icon: ClipboardCheck,
  },
]

export function OrderSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="order" className="py-24 bg-gradient-to-b from-black to-black relative">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm font-bold tracking-widest uppercase">
            Processus Simplifié
          </span>
          <h2 className="text-5xl font-serif font-bold text-white mt-4 mb-6">
            Commander Votre Véhicule
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Trois étapes simples pour obtenir le véhicule de vos rêves
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-24 left-[55%] w-[calc(100%+2rem)] h-0.5 bg-gradient-to-r from-amber-400 to-amber-400/0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    style={{ originX: 0 }}
                  />
                )}

                <motion.div
                  className="bg-gradient-to-br from-amber-400/10 to-amber-600/5 border border-amber-400/30 rounded-2xl p-8 h-full hover:border-amber-400/60 transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Step number */}
                  <div className="text-6xl font-serif font-bold text-amber-400/30 mb-4">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 bg-amber-400/10 rounded-xl flex items-center justify-center mb-6 border border-amber-400/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon size={32} className="text-amber-400" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-serif font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            onClick={scrollToContact}
            className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-lg rounded-xl shadow-lg shadow-amber-400/50 hover:shadow-amber-400/80 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Demander un devis personnalisé
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
