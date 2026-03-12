import { SectionHeading } from '@/components/platform/section-heading'
import { SourcingRequestSection } from '@/components/platform/sourcing-request-section'
import { getFeaturedShowroomCars, getWhatsAppHref } from '@/lib/data/showroom-stock'

export default function LocationPage() {
  const { hero } = getFeaturedShowroomCars()

  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Import & sourcing"
              title="Un accompagnement premium sur mesure"
              description="Makan Luxury Motors ne se limite pas au stock disponible. Nous accompagnons aussi le sourcing, l’import et la présentation de véhicules premium selon votre besoin."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#sourcing-form"
                className="inline-flex items-center justify-center rounded-full bg-[#c9a96d] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d7b77c]"
              >
                Demander un sourcing
              </a>
              <a
                href={getWhatsAppHref(hero.whatsapp, 'votre futur véhicule')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm text-white transition hover:bg-white/8"
              >
                Parler à un expert
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-3">
            <img src={hero.gallery[0]} alt={hero.name} className="h-[320px] w-full rounded-[28px] object-cover sm:h-[480px]" />
          </div>
        </div>
      </section>

      <SourcingRequestSection />
    </>
  )
}
