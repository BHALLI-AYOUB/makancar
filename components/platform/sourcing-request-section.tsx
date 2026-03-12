'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { FileSearch, SearchCheck, ShieldCheck, Truck } from 'lucide-react'
import { business } from '@/lib/business'

const steps = [
  {
    icon: FileSearch,
    title: 'Vous envoyez votre demande',
    description: 'Décrivez la configuration recherchée, votre budget et vos critères prioritaires.',
  },
  {
    icon: SearchCheck,
    title: 'Nous recherchons le véhicule idéal en Europe',
    description: 'Nous activons notre réseau de partenaires pour identifier les meilleures opportunités.',
  },
  {
    icon: ShieldCheck,
    title: 'Nous vérifions l’historique et l’état du véhicule',
    description: 'Chaque proposition est étudiée avec exigence avant de vous être présentée.',
  },
  {
    icon: Truck,
    title: 'Nous organisons l’import et la livraison',
    description: 'Nous coordonnons les formalités, le transport et la remise du véhicule dans les meilleures conditions.',
  },
]

type SourcingFormData = {
  brand: string
  model: string
  minYear: string
  budget: string
  maxMileage: string
  options: string
  name: string
  phone: string
}

const initialFormData: SourcingFormData = {
  brand: '',
  model: '',
  minYear: '',
  budget: '',
  maxMileage: '',
  options: '',
  name: '',
  phone: '',
}

export function SourcingRequestSection() {
  const [formData, setFormData] = useState<SourcingFormData>(initialFormData)
  const [loading, setLoading] = useState(false)

  function updateField(name: keyof SourcingFormData, value: string) {
    setFormData((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!formData.brand || !formData.model || !formData.name || !formData.phone) {
      toast.error('Merci de renseigner au minimum la marque, le modèle, votre nom et votre téléphone.')
      return
    }

    setLoading(true)

    const lines = [
      'Bonjour Makan Luxury Motors,',
      '',
      'Je souhaite effectuer une demande de sourcing :',
      `Marque : ${formData.brand}`,
      `Modèle : ${formData.model}`,
      `Année minimum : ${formData.minYear || 'Non précisée'}`,
      `Budget : ${formData.budget || 'Non précisé'}`,
      `Kilométrage max : ${formData.maxMileage || 'Non précisé'}`,
      `Options importantes : ${formData.options || 'Non précisées'}`,
      '',
      `Nom : ${formData.name}`,
      `Téléphone : ${formData.phone}`,
    ]

    const subject = encodeURIComponent('Demande de sourcing - Makan Luxury Motors')
    const body = encodeURIComponent(lines.join('\n'))

    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`
    toast.success('Votre demande de sourcing est prête à être envoyée.')
    setLoading(false)
  }

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(201,169,109,0.08),transparent_30%),linear-gradient(180deg,#040507_0%,#070b12_100%)] py-16 sm:py-20">
      <div className="section-shell relative z-10 space-y-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#e3c58e]">Sourcing sur mesure</p>
          <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.03em] text-white sm:text-6xl">
            Demandez votre recherche personnalisée
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
            Confiez-nous votre recherche et recevez une proposition précise, qualifiée et cohérente avec vos critères.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <form
            id="sourcing-form"
            onSubmit={handleSubmit}
            className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-7"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={formData.brand}
                onChange={(event) => updateField('brand', event.target.value)}
                placeholder="Marque"
                className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45"
              />
              <input
                value={formData.model}
                onChange={(event) => updateField('model', event.target.value)}
                placeholder="Modèle"
                className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45"
              />
              <input
                value={formData.minYear}
                onChange={(event) => updateField('minYear', event.target.value)}
                placeholder="Année minimum"
                className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45"
              />
              <input
                value={formData.budget}
                onChange={(event) => updateField('budget', event.target.value)}
                placeholder="Budget"
                className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45"
              />
              <input
                value={formData.maxMileage}
                onChange={(event) => updateField('maxMileage', event.target.value)}
                placeholder="Kilométrage max"
                className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45"
              />
              <input
                value={formData.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="Nom"
                className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45"
              />
              <input
                value={formData.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                placeholder="Téléphone"
                className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45 md:col-span-2"
              />
              <textarea
                value={formData.options}
                onChange={(event) => updateField('options', event.target.value)}
                rows={5}
                placeholder="Options importantes"
                className="rounded-3xl border border-white/10 bg-[#0b1220] px-4 py-4 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45 md:col-span-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#c9a96d] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d8b97e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Préparation en cours...' : 'Envoyer ma demande'}
            </button>
          </form>

          <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-7">
            <p className="text-xs uppercase tracking-[0.35em] text-[#e3c58e]">Comment ça marche</p>
            <h3 className="mt-3 font-serif text-3xl text-white sm:text-4xl">Comment fonctionne notre sourcing</h3>

            <div className="mt-6 space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon

                return (
                  <article
                    key={step.title}
                    className="rounded-[24px] border border-white/10 bg-[#0b1017] p-4 transition hover:border-[#c9a96d]/35"
                  >
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#c9a96d]/30 bg-[#0f141b] text-[#e3c58e]">
                        <Icon size={20} />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Étape {index + 1}</p>
                        <h4 className="mt-2 font-serif text-2xl text-white">{step.title}</h4>
                        <p className="mt-2 text-sm leading-7 text-slate-300">{step.description}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
