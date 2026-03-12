'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { business } from '@/lib/business'
import { useCurrentLocale } from '@/lib/i18n/client'

const contactCopy = {
  fr: {
    eyebrow: 'Contact',
    title: 'Parlons de votre projet',
    placeholders: {
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      message: 'Votre demande',
    },
    errors: {
      required: 'Merci de remplir tous les champs.',
      prepared: 'Message préparé sur WhatsApp.',
    },
    actions: {
      sending: 'Envoi...',
      send: 'Envoyer le message',
    },
    labels: {
      whatsapp: 'WhatsApp',
      email: 'Email',
      phone: 'Téléphone',
      location: 'Localisation',
    },
    greeting: 'Bonjour',
    fieldLabels: {
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      message: 'Message',
    },
  },
  en: {
    eyebrow: 'Contact',
    title: 'Let’s discuss your project',
    placeholders: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Your request',
    },
    errors: {
      required: 'Please fill in all fields.',
      prepared: 'Message prepared on WhatsApp.',
    },
    actions: {
      sending: 'Sending...',
      send: 'Send message',
    },
    labels: {
      whatsapp: 'WhatsApp',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
    },
    greeting: 'Hello',
    fieldLabels: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
    },
  },
  ar: {
    eyebrow: 'اتصال',
    title: 'لنتحدث عن مشروعكم',
    placeholders: {
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      message: 'طلبكم',
    },
    errors: {
      required: 'يرجى ملء جميع الحقول.',
      prepared: 'تم إعداد الرسالة على واتساب.',
    },
    actions: {
      sending: 'جارٍ الإرسال...',
      send: 'إرسال الرسالة',
    },
    labels: {
      whatsapp: 'واتساب',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      location: 'الموقع',
    },
    greeting: 'مرحبًا',
    fieldLabels: {
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      message: 'الرسالة',
    },
  },
} as const

export function ContactSection() {
  const locale = useCurrentLocale()
  const copy = contactCopy[locale]
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
      toast.error(copy.errors.required)
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))

    const message = `${copy.greeting},%0A%0A${copy.fieldLabels.name} : ${encodeURIComponent(formData.name)}%0A${copy.fieldLabels.email} : ${encodeURIComponent(formData.email)}%0A${copy.fieldLabels.phone} : ${encodeURIComponent(formData.phone)}%0A%0A${copy.fieldLabels.message} : ${encodeURIComponent(formData.message)}`
    window.open(`https://wa.me/212641389898?text=${message}`, '_blank')

    toast.success(copy.errors.prepared)
    setFormData({ name: '', email: '', phone: '', message: '' })
    setLoading(false)
  }

  return (
    <section id="contact" className="bg-black py-16 text-white sm:py-20">
      <div className="section-shell">
        <div className="mb-10 text-center sm:mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{copy.eyebrow}</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-6xl">{copy.title}</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[24px] border border-white/20 bg-[#0f0f0f] p-5 sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={copy.placeholders.name}
                className="rounded-xl border border-white/25 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white"
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={copy.placeholders.email}
                className="rounded-xl border border-white/25 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white"
              />
            </div>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={copy.placeholders.phone}
              className="mt-4 w-full rounded-xl border border-white/25 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={copy.placeholders.message}
              rows={6}
              className="mt-4 w-full resize-none rounded-xl border border-white/25 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-blue mt-4 w-full rounded-xl px-5 py-3 text-sm uppercase tracking-[0.14em] disabled:opacity-60"
            >
              {loading ? copy.actions.sending : copy.actions.send}
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
              className="flex items-center gap-3 rounded-[22px] border border-white/25 bg-[#0f0f0f] p-4 transition hover:bg-white/10"
            >
              <MessageCircle size={18} className="text-white" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{copy.labels.whatsapp}</p>
                <p>{business.phone}</p>
              </div>
            </a>
            <a href={business.emailLink} className="flex items-center gap-3 rounded-[22px] border border-white/25 bg-[#0f0f0f] p-4 transition hover:bg-white/10">
              <Mail size={18} className="text-white" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{copy.labels.email}</p>
                <p className="break-all">{business.email}</p>
              </div>
            </a>
            <a href={`tel:${business.phone}`} className="flex items-center gap-3 rounded-[22px] border border-white/25 bg-[#0f0f0f] p-4 transition hover:bg-white/10">
              <Phone size={18} className="text-white" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{copy.labels.phone}</p>
                <p>{business.phone}</p>
              </div>
            </a>
            <a
              href={business.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-[22px] border border-white/25 bg-[#0f0f0f] p-4 transition hover:bg-white/10"
            >
              <MapPin size={18} className="text-white" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{copy.labels.location}</p>
                <p>{business.location}</p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
