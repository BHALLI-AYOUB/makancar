'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react'
import { business } from '@/lib/business'

export function Footer() {
  const navItems = [
    { label: 'Accueil', href: '#home' },
    { label: 'Stock disponible', href: '#stock' },
    { label: 'Sur commande', href: '#order' },
    { label: 'Import/Export', href: '#import' },
    { label: 'Contact', href: '#contact' },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-amber-400/20 relative">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        {/* Main Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-black font-bold">
                M
              </div>
              <span className="text-white font-serif font-bold">Makan</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre partenaire de confiance pour l'achat, l'importation et l'exportation de véhicules de luxe haut de gamme.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <motion.a
                    href={item.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><motion.a href="#stock" className="hover:text-amber-400 transition-colors" whileHover={{ x: 5 }}>Stock disponible</motion.a></li>
              <li><motion.a href="#order" className="hover:text-amber-400 transition-colors" whileHover={{ x: 5 }}>Sur commande</motion.a></li>
              <li><motion.a href="#import" className="hover:text-amber-400 transition-colors" whileHover={{ x: 5 }}>Import/Export</motion.a></li>
              <li><motion.a href="#contact" className="hover:text-amber-400 transition-colors" whileHover={{ x: 5 }}>Support client</motion.a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-amber-400" />
                <a href={`tel:${business.phone}`} className="hover:text-amber-400 transition-colors">
                  {business.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-amber-400" />
                <a href={business.emailLink} className="hover:text-amber-400 transition-colors text-xs break-all">
                  {business.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-amber-400" />
                <a href={business.googleMapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  {business.location}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 my-8"></div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {currentYear} Makan Luxury Motors. Tous droits réservés.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <motion.a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black/50 border border-amber-400/20 rounded-lg flex items-center justify-center text-amber-400 hover:border-amber-400/50 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Instagram size={18} />
            </motion.a>
            <motion.a
              href={business.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black/50 border border-amber-400/20 rounded-lg flex items-center justify-center text-amber-400 hover:border-amber-400/50 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Facebook size={18} />
            </motion.a>
            <motion.a
              href={business.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black/50 border border-amber-400/20 rounded-lg flex items-center justify-center text-amber-400 hover:border-amber-400/50 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-sm font-bold">wa</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
