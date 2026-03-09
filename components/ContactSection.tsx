'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { business } from '@/lib/business'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Merci de remplir tous les champs.')
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))

    const message = `Bonjour,%0A%0ANom: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0ATel: ${encodeURIComponent(formData.phone)}%0A%0AMessage: ${encodeURIComponent(formData.message)}`
    window.open(`https://wa.me/212641389898?text=${message}`, '_blank')

    toast.success('Message prepare sur WhatsApp.')
    setFormData({ name: '', email: '', phone: '', message: '' })
    setLoading(false)
  }

  return (
    <section id="contact" className="bg-black py-16 text-white sm:py-20">
      <div className="section-shell">
        <div className="mb-10 text-center sm:mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Contact</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-6xl">Parlons de votre projet</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-white/20 bg-[#0f0f0f] p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nom"
                className="rounded-md border border-white/25 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white"
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="rounded-md border border-white/25 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white"
              />
            </div>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Telephone"
              className="mt-4 w-full rounded-md border border-white/25 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Votre demande"
              rows={6}
              className="mt-4 w-full resize-none rounded-md border border-white/25 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-blue mt-4 w-full rounded-md px-5 py-3 text-sm uppercase tracking-[0.14em] disabled:opacity-60"
            >
              {loading ? 'Envoi...' : 'Envoyer le message'}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <a
              href={business.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-white/25 bg-[#0f0f0f] p-4 transition hover:bg-white/10"
            >
              <MessageCircle size={18} className="text-white" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">WhatsApp</p>
                <p>{business.phone}</p>
              </div>
            </a>
            <a href={business.emailLink} className="flex items-center gap-3 rounded-lg border border-white/25 bg-[#0f0f0f] p-4 transition hover:bg-white/10">
              <Mail size={18} className="text-white" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Email</p>
                <p className="break-all">{business.email}</p>
              </div>
            </a>
            <a href={`tel:${business.phone}`} className="flex items-center gap-3 rounded-lg border border-white/25 bg-[#0f0f0f] p-4 transition hover:bg-white/10">
              <Phone size={18} className="text-white" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Telephone</p>
                <p>{business.phone}</p>
              </div>
            </a>
            <a
              href={business.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-white/25 bg-[#0f0f0f] p-4 transition hover:bg-white/10"
            >
              <MapPin size={18} className="text-white" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Localisation</p>
                <p>{business.location}</p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
