'use client'

import Link from 'next/link'
import { ArrowUpRight, Check, MapPin } from 'lucide-react'
import { useCurrentLocale } from '@/lib/i18n/client'
import { withLocalePath } from '@/lib/i18n/config'
import { Reveal } from '@/components/platform/reveal'
import { ShowroomImage } from '@/components/platform/showroom-image'
import type { ShowroomCar } from '@/types/showroom'

const copy = {
  fr: { eyebrow: '02 — L’esprit Makan', title: 'Plus qu’une voiture.', accent: 'Une relation de confiance.', text: 'Le bon véhicule se reconnaît dans les détails. Chez Makan Luxury Motors, nous prenons le temps de comprendre votre projet et de vous accompagner dans chaque décision.', pillars: ['Des configurations choisies avec soin', 'Des informations claires sur chaque véhicule', 'Un interlocuteur, du premier échange à la livraison'], visit: 'Rencontrons-nous à Oujda', detail: 'Le luxe se vit dans les détails.', sourcing: '03 — Votre recherche, notre engagement', sourcingTitle: 'Vous l’imaginez.', sourcingAccent: 'Nous la recherchons.', sourcingText: 'Un modèle précis, une finition rare, une envie particulière. Confiez-nous vos critères et découvrez notre service de recherche personnalisée en Europe.', sourcingCta: 'Créer ma recherche', sold: 'Ils ont trouvé leur prochain départ.', soldLabel: 'Déjà confiés à leurs nouveaux propriétaires', soldTag: 'Vendu' },
  en: { eyebrow: '02 — The Makan spirit', title: 'More than a car.', accent: 'A relationship built on trust.', text: 'The right car reveals itself in the details. At Makan Luxury Motors, we take the time to understand your project and guide you through every decision.', pillars: ['Carefully chosen configurations', 'Clear information on every vehicle', 'Personal support from first contact to handover'], visit: 'Meet us in Oujda', detail: 'Luxury lives in the details.', sourcing: '03 — Your search, our commitment', sourcingTitle: 'You imagine it.', sourcingAccent: 'We find it.', sourcingText: 'A particular model, a rare specification, a personal ambition. Share your criteria and discover our bespoke vehicle sourcing service in Europe.', sourcingCta: 'Start my search', sold: 'Their next chapter has begun.', soldLabel: 'Already with their new owners', soldTag: 'Sold' },
  ar: { eyebrow: '02 — روح مكان', title: 'أكثر من سيارة.', accent: 'علاقة مبنية على الثقة.', text: 'السيارة المناسبة تتميز بتفاصيلها. في مكان لاكجري موتورز، نأخذ الوقت لفهم مشروعك ومرافقتك في كل قرار.', pillars: ['تجهيزات مختارة بعناية', 'معلومات واضحة حول كل سيارة', 'مرافقة شخصية من أول تواصل إلى التسليم'], visit: 'نلتقي بكم في وجدة', detail: 'الفخامة تكمن في التفاصيل.', sourcing: '03 — بحثك، التزامنا', sourcingTitle: 'تتخيلها.', sourcingAccent: 'ونبحث عنها.', sourcingText: 'طراز محدد أو تجهيزات نادرة أو رغبة خاصة. شاركنا معاييرك واكتشف خدمة البحث المخصص عن السيارات في أوروبا.', sourcingCta: 'ابدأ البحث', sold: 'بدأت رحلتهم الجديدة.', soldLabel: 'سيارات انتقلت إلى أصحابها الجدد', soldTag: 'مباعة' },
}

export function HomeExperience({ soldCars }: { soldCars: ShowroomCar[] }) {
  const locale = useCurrentLocale()
  const c = copy[locale]
  return <>
    <section className="home-experience" aria-labelledby="experience-title">
      <div className="section-shell experience-layout">
        <Reveal className="experience-copy">
          <p className="makan-eyebrow">{c.eyebrow}</p>
          <h2 id="experience-title" className="makan-heading">{c.title}<br /><em>{c.accent}</em></h2>
          <p className="experience-description">{c.text}</p>
          <ul>{c.pillars.map(pillar => <li key={pillar}><Check size={16} /><span>{pillar}</span></li>)}</ul>
          <a href="#contact" className="makan-text-link">{c.visit}<ArrowUpRight size={18} /></a>
        </Reveal>
        <Reveal className="experience-visual" delay={100}>
          <ShowroomImage src="/vehicles/tiguan-elegance-2022/interior.webp" alt={locale === 'ar' ? 'مقصورة فولكس فاغن تيغوان' : 'Volkswagen Tiguan — intérieur Alcantara'} loading="lazy" className="experience-image" />
          <div className="experience-caption"><span>MAKAN</span><p>{c.detail}</p></div>
          <span className="experience-frame" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
    <section className="home-sourcing section-shell">
      <Reveal className="sourcing-panel">
        <img src="/background.png" alt="" loading="lazy" className="sourcing-background" />
        <div className="sourcing-shade" />
        <div className="sourcing-content"><p className="makan-eyebrow">{c.sourcing}</p><h2 className="makan-heading">{c.sourcingTitle}<br /><em>{c.sourcingAccent}</em></h2><p>{c.sourcingText}</p><Link href={withLocalePath('/recherche-personnalisee', locale)} className="makan-button makan-button-gold">{c.sourcingCta}<ArrowUpRight size={18} /></Link></div>
        <span className="sourcing-location"><MapPin size={15} /> Oujda · Europe</span>
      </Reveal>
    </section>
    {soldCars.length > 0 && <section className="home-delivered section-shell">
      <Reveal><p className="makan-eyebrow">{c.soldLabel}</p><h2 className="makan-heading">{c.sold}</h2></Reveal>
      <div className="delivered-grid">{soldCars.map(car => <Reveal key={car.id}><Link href={withLocalePath(`/cars/${car.id}`, locale)} className="delivered-card"><div><ShowroomImage src={car.gallery[0]} alt={car.name} loading="lazy" /><span>{c.soldTag}</span></div><h3>{car.name}<ArrowUpRight size={20} /></h3></Link></Reveal>)}</div>
    </section>}
  </>
}
