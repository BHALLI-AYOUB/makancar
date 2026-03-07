'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react'
import { business } from '@/lib/business'
import { toast } from 'sonner'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    setIsSubmitting(true)

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Show success message
    toast.success('Message envoyé avec succès!')

    // Offer options
    const whatsappMessage = `Bonjour,\n\nNom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}\n\nMessage: ${formData.message}`

    setTimeout(() => {
      toast.custom((t) => (
        <div className="bg-black border border-amber-400/30 rounded-lg p-4 space-y-3">
          <p className="text-white font-semibold">Comment voulez-vous envoyer votre message ?</p>
          <div className="flex gap-2">
            <motion.a
              href={`https://wa.me/212641389898?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 bg-green-500 text-white text-sm font-bold rounded hover:shadow-lg hover:shadow-green-500/50 transition-shadow flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={16} />
              WhatsApp
            </motion.a>
            <motion.a
              href={`mailto:${business.email}?subject=Demande de contact - Makan Luxury Motors&body=${encodeURIComponent(whatsappMessage)}`}
              className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm font-bold rounded hover:shadow-lg hover:shadow-blue-500/50 transition-shadow flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={16} />
              Email
            </motion.a>
          </div>
        </div>
      ))
    }, 500)

    setFormData({ name: '', email: '', phone: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black to-black relative">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-900 rounded-full blur-3xl"></div>
      </div>

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
            Restons en Contact
          </span>
          <h2 className="text-5xl font-serif font-bold text-white mt-4 mb-6">
            Nous Contacter
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-black/40 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 bg-black/50 border border-amber-400/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 bg-black/50 border border-amber-400/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+212 6XX XXX XXX"
                  className="w-full px-4 py-3 bg-black/50 border border-amber-400/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  rows={5}
                  className="w-full px-4 py-3 bg-black/50 border border-amber-400/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold rounded-lg shadow-lg shadow-amber-400/50 hover:shadow-amber-400/80 transition-shadow disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Envoi...' : 'Envoyer le message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* WhatsApp */}
            <motion.a
              href={business.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex gap-4 p-6 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl hover:border-green-500/60 transition-all group"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle size={24} className="text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">WhatsApp</p>
                <p className="text-white font-bold">{business.phone}</p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href={business.emailLink}
              whileHover={{ scale: 1.05 }}
              className="flex gap-4 p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl hover:border-blue-500/60 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail size={24} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white font-bold text-sm break-all">{business.email}</p>
              </div>
            </motion.a>

            {/* Phone */}
            <motion.a
              href={`tel:${business.phone}`}
              whileHover={{ scale: 1.05 }}
              className="flex gap-4 p-6 bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl hover:border-purple-500/60 transition-all group"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone size={24} className="text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Appel</p>
                <p className="text-white font-bold">{business.phone}</p>
              </div>
            </motion.a>

            {/* Location */}
            <motion.a
              href={business.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex gap-4 p-6 bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-xl hover:border-amber-500/60 transition-all group"
            >
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin size={24} className="text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Localisation</p>
                <p className="text-white font-bold">{business.location}</p>
              </div>
            </motion.a>

            {/* Social Links */}
            <div className="pt-4 border-t border-gray-700/50">
              <p className="text-xs text-gray-400 mb-4">Suivez-nous</p>
              <div className="flex gap-4">
                <motion.a
                  href={business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-400 hover:bg-pink-500/40 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="text-sm font-bold">ig</span>
                </motion.a>
                <motion.a
                  href={business.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-500/40 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="text-sm font-bold">f</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
