import { AboutMakan } from '@/components/platform/about-makan'
import { StatsSection } from '@/components/platform/stats-section'
import { ShowroomHero } from '@/components/platform/showroom-hero'
import { ShowroomGrid } from '@/components/platform/showroom-grid'
import { SectionHeading } from '@/components/platform/section-heading'
import { TestimonialsSection } from '@/components/platform/testimonials-section'
import { MapSection } from '@/components/platform/map-section'
import { ContactSection } from '@/components/ContactSection'
import { getFeaturedShowroomCars, getShowroomCars } from '@/lib/data/showroom-stock'

export default async function HomePage() {
  const cars = getShowroomCars()
  const { hero } = getFeaturedShowroomCars()

  return (
    <>
      <ShowroomHero car={hero} />
      <AboutMakan />
      <StatsSection />
      <section className="section-shell py-16 sm:py-20">
        <SectionHeading
          eyebrow="Stock disponible"
          title="Selection reelle du showroom"
          description="Uniquement les vehicules actuellement disponibles chez Makan Luxury Motors, avec galeries detaillees et presentation premium."
        />
        <div className="mt-10">
          <ShowroomGrid cars={cars} />
        </div>
      </section>
      <TestimonialsSection />
      <MapSection />
      <ContactSection />
    </>
  )
}
