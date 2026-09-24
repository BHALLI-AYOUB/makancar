'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, MapPin, Search, X } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { useCurrentLocale } from '@/lib/i18n/client'
import { withLocalePath } from '@/lib/i18n/config'

const storageKey = 'makan:first-visit-search:v1'

const copy = {
  fr: {
    eyebrow: 'Votre prochaine voiture commence ici', title: 'Quelle voiture cherchez-vous ?', description: 'Dites-nous ce que vous avez en tête. Nous vous aiderons à trouver le modèle qui vous correspond.',
    car: 'Marque et modèle souhaités', carPlaceholder: 'Ex. Volkswagen Tiguan R-Line', budget: 'Budget maximum (DH)', budgetPlaceholder: 'Ex. 400 000', year: 'Année minimum', yearPlaceholder: 'Ex. 2022',
    name: 'Votre nom', namePlaceholder: 'Comment vous appeler ?', phone: 'Téléphone / WhatsApp', phonePlaceholder: '06 00 00 00 00',
    submit: 'Continuer sur WhatsApp', later: 'Je regarderai d’abord', detail: 'Recherche plus détaillée', note: 'Votre message sera préparé dans WhatsApp. Vous pourrez le vérifier avant de l’envoyer.',
    imageCaption: 'Une recherche aussi unique que vous.', whatsappIntro: 'Bonjour Makan Luxury Motors, je recherche une voiture.', fields: { car: 'Véhicule', budget: 'Budget maximum', year: 'Année minimum', name: 'Nom', phone: 'Téléphone' }, close: 'Fermer',
  },
  en: {
    eyebrow: 'Your next car starts here', title: 'What car are you looking for?', description: 'Tell us what you have in mind. We will help you find the model that fits you.',
    car: 'Preferred make and model', carPlaceholder: 'E.g. Volkswagen Tiguan R-Line', budget: 'Maximum budget (MAD)', budgetPlaceholder: 'E.g. 400,000', year: 'Minimum year', yearPlaceholder: 'E.g. 2022',
    name: 'Your name', namePlaceholder: 'What should we call you?', phone: 'Phone / WhatsApp', phonePlaceholder: '06 00 00 00 00',
    submit: 'Continue on WhatsApp', later: 'Browse first', detail: 'More detailed search', note: 'Your message will be prepared in WhatsApp. You can review it before sending.',
    imageCaption: 'A search as unique as you.', whatsappIntro: 'Hello Makan Luxury Motors, I am looking for a car.', fields: { car: 'Vehicle', budget: 'Maximum budget', year: 'Minimum year', name: 'Name', phone: 'Phone' }, close: 'Close',
  },
  ar: {
    eyebrow: 'سيارتك القادمة تبدأ هنا', title: 'ما السيارة التي تبحث عنها؟', description: 'أخبرنا بما تتمناه، وسنساعدك في العثور على السيارة المناسبة لك.',
    car: 'العلامة والطراز المطلوبان', carPlaceholder: 'مثال: Volkswagen Tiguan R-Line', budget: 'الميزانية القصوى (درهم)', budgetPlaceholder: 'مثال: 400 000', year: 'الحد الأدنى للسنة', yearPlaceholder: 'مثال: 2022',
    name: 'اسمك', namePlaceholder: 'بماذا نناديك؟', phone: 'الهاتف / واتساب', phonePlaceholder: '06 00 00 00 00',
    submit: 'المتابعة عبر واتساب', later: 'سأتصفح أولاً', detail: 'بحث أكثر تفصيلاً', note: 'سنجهز رسالتك في واتساب، ويمكنك مراجعتها قبل إرسالها.',
    imageCaption: 'بحث مصمم خصيصاً لك.', whatsappIntro: 'مرحباً Makan Luxury Motors، أبحث عن سيارة.', fields: { car: 'السيارة', budget: 'الميزانية القصوى', year: 'الحد الأدنى للسنة', name: 'الاسم', phone: 'الهاتف' }, close: 'إغلاق',
  },
} as const

export function FirstVisitSearch() {
  const pathname = usePathname()
  const locale = useCurrentLocale()
  const c = copy[locale]
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (pathname.includes('/recherche-personnalisee')) return
    try {
      if (localStorage.getItem(storageKey)) return
    } catch { /* The dialog can still appear when storage is unavailable. */ }
    const timer = window.setTimeout(() => setOpen(true), 1100)
    return () => window.clearTimeout(timer)
  }, [pathname])

  function dismiss() {
    setOpen(false)
    try { localStorage.setItem(storageKey, '1') } catch { /* Browsing can continue without storage. */ }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const lines = [
      c.whatsappIntro,
      `${c.fields.car}: ${form.get('car')}`,
      form.get('budget') && `${c.fields.budget}: ${form.get('budget')} DH`,
      form.get('year') && `${c.fields.year}: ${form.get('year')}`,
      `${c.fields.name}: ${form.get('name')}`,
      `${c.fields.phone}: ${form.get('phone')}`,
    ].filter(Boolean)
    window.open(`https://wa.me/212641389898?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer')
    dismiss()
  }

  return (
    <Dialog open={open} onOpenChange={value => { if (!value) dismiss(); else setOpen(true) }}>
      <DialogContent showCloseButton={false} className="first-visit-dialog" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="first-visit-visual" aria-hidden="true">
          <img src="/vehicles/tiguan-elegance-2022/front-three-quarter.webp" alt="" />
          <div className="first-visit-visual-shade" />
          <span className="first-visit-mark">MAKAN <small>LUXURY MOTORS</small></span>
          <p>{c.imageCaption}</p>
          <span className="first-visit-location"><MapPin size={13} /> OUJDA · MAROC</span>
        </div>
        <div className="first-visit-content">
          <button type="button" className="first-visit-close" onClick={dismiss} aria-label={c.close}><X size={19} /></button>
          <div className="first-visit-kicker"><span />{c.eyebrow}</div>
          <DialogTitle className="first-visit-title">{c.title}</DialogTitle>
          <DialogDescription className="first-visit-description">{c.description}</DialogDescription>
          <form onSubmit={submit} className="first-visit-form">
            <label className="first-visit-field first-visit-field-wide">{c.car}<input name="car" type="text" placeholder={c.carPlaceholder} required autoComplete="off" /></label>
            <label className="first-visit-field">{c.budget}<input name="budget" type="text" inputMode="numeric" placeholder={c.budgetPlaceholder} /></label>
            <label className="first-visit-field">{c.year}<input name="year" type="number" inputMode="numeric" min="1980" max="2030" placeholder={c.yearPlaceholder} /></label>
            <label className="first-visit-field">{c.name}<input name="name" type="text" placeholder={c.namePlaceholder} required autoComplete="name" /></label>
            <label className="first-visit-field">{c.phone}<input name="phone" type="tel" placeholder={c.phonePlaceholder} required autoComplete="tel" /></label>
            <button type="submit" className="first-visit-submit"><Search size={17} />{c.submit}<ArrowUpRight size={18} /></button>
          </form>
          <p className="first-visit-note">{c.note}</p>
          <div className="first-visit-links">
            <button type="button" onClick={dismiss}>{c.later}</button>
            <Link href={withLocalePath('/recherche-personnalisee', locale)} onClick={dismiss}>{c.detail}<ArrowUpRight size={14} /></Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
