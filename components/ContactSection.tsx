'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useShowroomContent } from '@/components/platform/showroom-context'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { useBusiness } from '@/components/platform/showroom-context'


export function ContactSection() {
  const business = useBusiness()
  const copy = useShowroomContent('contact')
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
    window.open(`https://wa.me/${business.whatsapp}?text=${message}`, '_blank', 'noopener,noreferrer')

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
          <form
            onSubmit={handleSubmit}
            className="rounded-[24px] border border-white/20 bg-[#0f0f0f] p-5 sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name" aria-label={copy.fieldLabels.name} required
                value={formData.name}
                onChange={handleChange}
                placeholder={copy.placeholders.name}
                className="rounded-xl border border-white/25 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white"
              />
              <input
                name="email" aria-label={copy.fieldLabels.email} required
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={copy.placeholders.email}
                className="rounded-xl border border-white/25 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white"
              />
            </div>
            <input
              name="phone" aria-label={copy.fieldLabels.phone} required
              value={formData.phone}
              onChange={handleChange}
              placeholder={copy.placeholders.phone}
              className="mt-4 w-full rounded-xl border border-white/25 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white"
            />
            <textarea
              name="message" aria-label={copy.fieldLabels.message} required
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
          </form>

          <div
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
          </div>
        </div>
      </div>
    </section>
  )
}
