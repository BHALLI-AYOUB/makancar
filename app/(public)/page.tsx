import { AboutMakan } from '@/components/platform/about-makan'
import { StatsSection } from '@/components/platform/stats-section'
import { ShowroomHero } from '@/components/platform/showroom-hero'
import { ShowroomGrid } from '@/components/platform/showroom-grid'
import { SectionHeading } from '@/components/platform/section-heading'
import { TestimonialsSection } from '@/components/platform/testimonials-section'
import { ReassuranceSection } from '@/components/platform/reassurance-section'
import { BrandsSection } from '@/components/platform/brands-section'
import { MapSection } from '@/components/platform/map-section'
import { ContactSection } from '@/components/ContactSection'
import { getFeaturedShowroomCars, getShowroomCars } from '@/lib/data/showroom-stock'
import { getMessages } from '@/lib/i18n/dictionaries'
import { getServerLocale } from '@/lib/i18n/server'
import { getLocalizedCar } from '@/lib/showroom-i18n'

export default async function HomePage() {
  const locale = await getServerLocale()
  const messages = getMessages(locale)
  const cars = getShowroomCars().map((car) => getLocalizedCar(car, locale))
  const { hero } = getFeaturedShowroomCars()
  const localizedHero = getLocalizedCar(hero, locale)

  return (
    <>
      <ShowroomHero car={localizedHero} />
      <section className="section-shell py-16 sm:py-20">
        <SectionHeading
          eyebrow={messages.home.stock.eyebrow}
          title={messages.home.stock.title}
          description={messages.home.stock.description}
        />
        <div className="mt-10">
          <ShowroomGrid cars={cars} />
        </div>
      </section>
      <ReassuranceSection />
      <AboutMakan />
      <StatsSection />
      <TestimonialsSection />
      <BrandsSection />
      <MapSection />
      <ContactSection />
    </>
  )
}
