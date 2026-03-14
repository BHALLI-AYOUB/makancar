'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { SearchCheck, ShieldCheck, Sparkles } from 'lucide-react'
import { business } from '@/lib/business'
import { useCurrentLocale } from '@/lib/i18n/client'

type FormState = {
  name: string
  phone: string
  email: string
  brand: string
  model: string
  budget: string
  minYear: string
  maxMileage: string
  fuel: string
  options: string
}

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  brand: '',
  model: '',
  budget: '',
  minYear: '',
  maxMileage: '',
  fuel: '',
  options: '',
}

const copy = {
  fr: {
    eyebrow: 'Recherche personnalisée',
    title: 'Recherche personnalisée de véhicule',
    description:
      'Vous ne trouvez pas le véhicule que vous recherchez dans notre stock ? Makan Luxury Motors peut le trouver pour vous parmi plusieurs pays européens selon vos critères.',
    labels: {
      name: 'Nom',
      phone: 'Téléphone / WhatsApp',
      email: 'Email',
      brand: 'Marque souhaitée',
      model: 'Modèle',
      budget: 'Budget maximum',
      minYear: 'Année minimum',
      maxMileage: 'Kilométrage maximum',
      fuel: 'Carburant',
      options: 'Options importantes (facultatif)',
    },
    fuels: ['Diesel', 'Essence', 'Hybride', 'Électrique'],
    submit: 'Envoyer ma demande',
    loading: 'Envoi en cours...',
    validation: 'Merci de renseigner les informations essentielles pour votre recherche.',
    success:
      'Merci pour votre demande. Notre équipe va analyser votre recherche et vous contacter rapidement sur WhatsApp.',
    sideTitle: 'Un accompagnement premium, clair et efficace',
    sidePoints: [
      'Analyse précise de votre besoin',
      'Recherche dans plusieurs pays européens',
      'Sélection qualifiée et présentation soignée',
    ],
  },
  en: {
    eyebrow: 'Tailored search',
    title: 'Personalized vehicle search',
    description:
      'Can’t find the vehicle you are looking for in our inventory? Makan Luxury Motors can source it for you across several European countries according to your criteria.',
    labels: {
      name: 'Name',
      phone: 'Phone / WhatsApp',
      email: 'Email',
      brand: 'Desired brand',
      model: 'Model',
      budget: 'Maximum budget',
      minYear: 'Minimum year',
      maxMileage: 'Maximum mileage',
      fuel: 'Fuel type',
      options: 'Important options (optional)',
    },
    fuels: ['Diesel', 'Petrol', 'Hybrid', 'Electric'],
    submit: 'Send my request',
    loading: 'Sending...',
    validation: 'Please complete the key fields for your search request.',
    success:
      'Thank you for your request. Our team will review your search and contact you quickly on WhatsApp.',
    sideTitle: 'Premium, clear and efficient support',
    sidePoints: [
      'Precise analysis of your requirements',
      'Sourcing across several European countries',
      'Qualified selection and curated presentation',
    ],
  },
  ar: {
    eyebrow: 'بحث مخصص',
    title: 'بحث مخصص عن سيارة',
    description:
      'هل لم تجد السيارة التي تبحث عنها ضمن مخزوننا؟ يمكن لـ Makan Luxury Motors العثور عليها لكم من عدة دول أوروبية وفق معاييركم.',
    labels: {
      name: 'الاسم',
      phone: 'الهاتف / واتساب',
      email: 'البريد الإلكتروني',
      brand: 'العلامة المطلوبة',
      model: 'الطراز',
      budget: 'الميزانية القصوى',
      minYear: 'الحد الأدنى للسنة',
      maxMileage: 'الحد الأقصى للكيلومترات',
      fuel: 'نوع الوقود',
      options: 'الخيارات المهمة (اختياري)',
    },
    fuels: ['ديزل', 'بنزين', 'هجين', 'كهربائي'],
    submit: 'إرسال طلبي',
    loading: 'جارٍ الإرسال...',
    validation: 'يرجى إدخال المعلومات الأساسية الخاصة ببحثكم.',
    success:
      'شكرًا على طلبكم. سيقوم فريقنا بدراسة بحثكم والتواصل معكم سريعًا عبر واتساب.',
    sideTitle: 'مرافقة راقية وواضحة وفعالة',
    sidePoints: [
      'تحليل دقيق لاحتياجكم',
      'بحث عبر عدة دول أوروبية',
      'اختيار مؤهل وعرض أنيق',
    ],
  },
} as const

export function VehicleSearchRequest() {
  const locale = useCurrentLocale()
  const section = copy[locale]
  const [form, setForm] = useState<FormState>(initialState)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function updateField(name: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.name || !form.phone || !form.email || !form.brand || !form.model || !form.budget) {
      toast.error(section.validation)
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 600))

    const lines = [
      section.title,
      '',
      `${section.labels.name}: ${form.name}`,
      `${section.labels.phone}: ${form.phone}`,
      `${section.labels.email}: ${form.email}`,
      `${section.labels.brand}: ${form.brand}`,
      `${section.labels.model}: ${form.model}`,
      `${section.labels.budget}: ${form.budget}`,
      `${section.labels.minYear}: ${form.minYear || '-'}`,
      `${section.labels.maxMileage}: ${form.maxMileage || '-'}`,
      `${section.labels.fuel}: ${form.fuel || '-'}`,
      `${section.labels.options}: ${form.options || '-'}`,
    ]

    const subject = encodeURIComponent('Recherche personnalisée de véhicule - Makan Luxury Motors')
    const body = encodeURIComponent(lines.join('\n'))
    window.open(`mailto:${business.email}?subject=${subject}&body=${body}`, '_blank')

    setSubmitted(true)
    setForm(initialState)
    setLoading(false)
    toast.success(section.success)
  }

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(201,169,109,0.08),transparent_30%),linear-gradient(180deg,#040507_0%,#070b12_100%)] py-16 sm:py-20">
      <div className="section-shell relative z-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#e3c58e]">{section.eyebrow}</p>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-[-0.03em] text-white sm:text-6xl">{section.title}</h1>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{section.description}</p>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-7"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder={section.labels.name} className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45" />
              <input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder={section.labels.phone} className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45" />
              <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder={section.labels.email} className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45" />
              <input value={form.brand} onChange={(event) => updateField('brand', event.target.value)} placeholder={section.labels.brand} className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45" />
              <input value={form.model} onChange={(event) => updateField('model', event.target.value)} placeholder={section.labels.model} className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45" />
              <input value={form.budget} onChange={(event) => updateField('budget', event.target.value)} placeholder={section.labels.budget} className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45" />
              <input value={form.minYear} onChange={(event) => updateField('minYear', event.target.value)} placeholder={section.labels.minYear} className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45" />
              <input value={form.maxMileage} onChange={(event) => updateField('maxMileage', event.target.value)} placeholder={section.labels.maxMileage} className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45" />
              <select value={form.fuel} onChange={(event) => updateField('fuel', event.target.value)} className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-[#c9a96d]/45 md:col-span-2">
                <option value="" className="bg-[#0b1220] text-slate-400">
                  {section.labels.fuel}
                </option>
                {section.fuels.map((fuel) => (
                  <option key={fuel} value={fuel} className="bg-[#0b1220] text-white">
                    {fuel}
                  </option>
                ))}
              </select>
              <textarea value={form.options} onChange={(event) => updateField('options', event.target.value)} rows={5} placeholder={section.labels.options} className="rounded-3xl border border-white/10 bg-[#0b1220] px-4 py-4 text-white placeholder:text-slate-500 outline-none focus:border-[#c9a96d]/45 md:col-span-2" />
            </div>

            <button type="submit" disabled={loading} className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#c9a96d] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d8b97e] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? section.loading : section.submit}
            </button>

            {submitted ? (
              <div className="mt-4 rounded-[24px] border border-[#c9a96d]/25 bg-[#0b1017] p-4 text-sm leading-7 text-slate-200">
                {section.success}
              </div>
            ) : null}
          </form>

          <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-7">
            <p className="text-xs uppercase tracking-[0.35em] text-[#e3c58e]">{section.eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">{section.sideTitle}</h2>

            <div className="mt-6 space-y-4">
              {[SearchCheck, ShieldCheck, Sparkles].map((Icon, index) => (
                <article key={section.sidePoints[index]} className="rounded-[24px] border border-white/10 bg-[#0b1017] p-4 transition hover:border-[#c9a96d]/35">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#c9a96d]/30 bg-[#0f141b] text-[#e3c58e]">
                      <Icon size={20} />
                    </span>
                    <p className="pt-1 text-sm leading-7 text-slate-300">{section.sidePoints[index]}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
