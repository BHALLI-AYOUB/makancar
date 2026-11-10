import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MessageCircleMore } from 'lucide-react'
import { ShowroomGallery } from '@/components/platform/showroom-gallery'
import { getShowroomCarById } from '@/lib/data/showroom-stock'
import { getWhatsAppHref } from '@/lib/contact'
import { getServerLocale } from '@/lib/i18n/server'
import { getCatalogue } from '@/lib/catalogue'
import { pageMetadata, siteUrl } from '@/lib/seo'
type Props={params:Promise<{id:string}>}
const copy={
  fr:{collection:'La collection',specs:'En détail',equipment:'Équipements',highlights:'Les points forts',enquiry:'Cette voiture vous ressemble ?',text:'Parlons de ce véhicule. Notre équipe vous accompagne, de votre première question à la remise des clés.',cta:'En savoir plus sur ce véhicule',sold:'Ce véhicule a trouvé son nouveau propriétaire. Contactez-nous pour trouver un modèle similaire.',year:'Année / immatriculation',mileage:'Kilométrage',trim:'Finition',presentation:'La présentation Makan',call:'Appeler le showroom',email:'Envoyer un email'},
  en:{collection:'The collection',specs:'At a glance',equipment:'Equipment & features',highlights:'What makes it special',enquiry:'Your next great drive?',text:'Let’s talk about this vehicle. Personal advice, from your first question to the handover.',cta:'Enquire about this vehicle',sold:'This vehicle has found its new owner. Contact us to find a similar model.',year:'Year / registration',mileage:'Mileage',trim:'Trim',presentation:'The Makan presentation',call:'Call the showroom',email:'Send an email'},
  ar:{collection:'مجموعة السيارات',specs:'المواصفات',equipment:'التجهيزات',highlights:'أبرز المميزات',enquiry:'هل هذه سيارتك القادمة؟',text:'لنتحدث عن هذه السيارة. فريقنا يرافقك من أول سؤال إلى استلام المفاتيح.',cta:'استفسر عن هذه السيارة',sold:'انتقلت هذه السيارة إلى مالكها الجديد. تواصل معنا للعثور على طراز مماثل.',year:'السنة / التسجيل',mileage:'المسافة المقطوعة',trim:'الفئة',presentation:'تقديم مكان',call:'اتصل بالمعرض',email:'راسلنا'}
}
export async function generateMetadata({params}:Props){const {id}=await params,locale=await getServerLocale(),car=getShowroomCarById(id,locale);if(!car)return{title:'Vehicle unavailable | Makan Luxury Motors',robots:{index:false,follow:false}};return pageMetadata(locale,`/cars/${car.slug}`,`${car.name} | Makan Luxury Motors`,`${car.name} · ${car.price} · ${car.availabilityLabel}. ${car.description||''}`,car.gallery[0])}
export default async function CarDetailsPage({params}:Props){
  const {id}=await params,locale=await getServerLocale(),car=getShowroomCarById(id,locale);if(!car)notFound()
  const c=copy[locale],contact=getCatalogue().contact,enquiry=getWhatsAppHref(contact.whatsapp,car.name,locale)
  const specs=[{label:c.year,value:car.registrationDate||String(car.year||'—')},{label:c.mileage,value:car.mileageKm==null?'—':`${new Intl.NumberFormat(locale).format(car.mileageKm)} ${locale==='ar'?'كم':'km'}`},{label:c.trim,value:car.version||'—'},...car.summary.filter(s=>!/(kilom|mileage|mod[eè]le|ann[eé]e|registration|year|version|date d|الكيلومترات|الطراز)/i.test(s.label))]
  const ld={ '@context':'https://schema.org', '@type':'Car', name:car.name, description:car.description||car.subtitle, image:car.gallery.map(p=>`${siteUrl}${p}`), brand:{'@type':'Brand',name:car.brand}, model:car.model, vehicleModelDate:car.year, ...(car.mileageKm!=null?{mileageFromOdometer:{'@type':'QuantitativeValue',value:car.mileageKm,unitCode:'KMT'}}:{}), ...(car.priceMAD!=null?{offers:{'@type':'Offer',price:car.priceMAD,priceCurrency:'MAD',availability:`https://schema.org/${car.status==='sold'?'SoldOut':car.status==='unavailable'?'OutOfStock':car.status==='coming-soon'?'PreOrder':'InStock'}`,url:`${siteUrl}/${locale}/cars/${car.slug}`}}:{}) }
  return <main className="detail-page section-shell"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld).replace(/</g,'\u003c')}}/>
    <nav className="detail-breadcrumb" aria-label={c.collection}><Link href={`/${locale}/vente`}>{c.collection}</Link><span>/</span><span>{car.name}</span></nav>
    <div className="detail-heading"><div><span className="detail-badge">{car.availabilityLabel}</span><h1>{car.name}</h1><p className="detail-subtitle">{car.subtitle||car.version}</p></div><p className="detail-price">{car.price}</p></div>
    <div className="detail-layout"><article className="detail-main"><ShowroomGallery images={car.gallery} photos={car.photos} alt={car.name} illustrative={car.illustrativeImages}/>
      {car.description&&<section className="detail-section"><p className="detail-description">{car.description}</p></section>}
      <section className="detail-section"><h2>{c.specs}</h2><dl className="detail-specs">{specs.map((s,n)=><div key={`${s.label}-${n}`}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}</dl></section>
      <section className="detail-section"><h2>{c.equipment}</h2><div className="equipment-groups">{car.featureGroups.map((g,n)=><div key={n}><h3>{g.title}</h3><ul>{g.items.map((item,i)=><li key={i}>{item}</li>)}</ul></div>)}</div></section>
      {!!car.sellingPoints.length&&<section className="detail-section"><h2>{c.highlights}</h2><ul className="detail-highlights">{car.sellingPoints.map((p,n)=><li key={n}>{p}</li>)}</ul></section>}
      {!!car.presentation?.length&&<section className="detail-section"><h2>{c.presentation}</h2>{car.presentation.map((p,n)=><p className="detail-description" key={n}>{p}</p>)}</section>}
    </article><aside className="detail-enquiry"><p className="makan-eyebrow">Makan Luxury Motors</p><h2>{c.enquiry}</h2><p>{car.status==='sold'?c.sold:c.text}</p>{car.availabilityNote&&<p className="availability-note">{car.availabilityNote}</p>}<a href={enquiry} target="_blank" rel="noopener noreferrer" className="makan-button makan-button-gold"><MessageCircleMore size={18}/>{c.cta}</a><div className="detail-contact-links"><a href={`tel:${contact.phone.replace(/[^+0-9]/g,'')}`}>{c.call}</a><a href={`mailto:${contact.email}?subject=${encodeURIComponent(car.name)}`}>{c.email}</a></div></aside></div>
  </main>
}
