'use client'

import { motion } from 'framer-motion'
import { Globe, Package, FileCheck, Zap, Shield, Users } from 'lucide-react'
import { business } from '@/lib/business'

const services = [
  {
    title: 'Importation complète',
    description: 'Gestion complète du processus d\'importation de votre véhicule de luxe',
    icon: Globe,
  },
  {
    title: 'Dédouanement',
    description: 'Services complets de dédouanement et documentation administrative',
    icon: Package,
  },
  {
    title: 'Conformité légale',
    description: 'Assurance de la conformité aux normes nationales et internationales',
    icon: FileCheck,
  },
  {
    title: 'Livraison rapide',
    description: 'Transport sécurisé et livraison rapide à votre adresse',
    icon: Zap,
  },
  {
    title: 'Garantie & Support',
    description: 'Garantie complète et support technique après-vente professionnel',
    icon: Shield,
  },
  {
    title: 'Assistance personnalisée',
    description: 'Équipe dédiée pour répondre à tous vos besoins et questions',
    icon: Users,
  },
]

export function ImportExportSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="import" className="py-24 bg-gradient-to-b from-black via-black to-black relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>

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
            Services Complets
          </span>
          <h2 className="text-5xl font-serif font-bold text-white mt-4 mb-6">
            Import & Export de Luxe
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Services professionnels d\'importation et d\'exportation de véhicules haut de gamme
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-black/40 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8 hover:border-amber-400/50 transition-all"
              >
                <motion.div
                  className="w-14 h-14 bg-amber-400/10 rounded-xl flex items-center justify-center mb-6 border border-amber-400/30"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <Icon size={28} className="text-amber-400" />
                </motion.div>

                <h3 className="text-xl font-serif font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  {service.description}
                </p>
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToContact()
                  }}
                  className="text-amber-400 font-semibold text-sm hover:text-amber-300 transition-colors inline-flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  En savoir plus
                  <span>→</span>
                </motion.a>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-400/10 to-amber-600/5 border border-amber-400/30 rounded-2xl p-12 text-center"
        >
          <h3 className="text-3xl font-serif font-bold text-white mb-4">
            Besoin d\'un devis ?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Nos experts sont prêts à vous proposer une solution personnalisée pour l\'importation ou l\'exportation de votre véhicule
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={scrollToContact}
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold rounded-xl shadow-lg shadow-amber-400/50 hover:shadow-amber-400/80 transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Demander un devis d\'importation
            </motion.button>
            <motion.a
              href={business.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-amber-400 text-amber-400 font-bold rounded-xl hover:bg-amber-400/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Chat WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
