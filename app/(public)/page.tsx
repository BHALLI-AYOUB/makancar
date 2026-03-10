import { HomeHero } from '@/components/platform/home-hero'
import { CarGrid } from '@/components/platform/car-grid'
import { SectionHeading } from '@/components/platform/section-heading'
import { getAvailableCars } from '@/lib/data/cars'

export default async function HomePage() {
  const saleCars = await getAvailableCars('vente')
  const rentalCars = await getAvailableCars('location')

  return (
    <>
      <HomeHero featuredSale={saleCars[0]} featuredRental={rentalCars[0]} />
      <section className="section-shell py-16 sm:py-20">
        <SectionHeading
          eyebrow="Vente"
          title="Voitures a vendre"
          description="Catalogue premium avec fiches detaillees, demande d'achat et espace client."
        />
        <div className="mt-10">
          <CarGrid cars={saleCars.slice(0, 6)} />
        </div>
      </section>
      <section className="bg-[#080d14] py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Location"
            title="Voitures disponibles en location"
            description="Reservation simple, suivi des dates et dashboard client pour gerer vos locations."
          />
          <div className="mt-10">
            <CarGrid cars={rentalCars.slice(0, 6)} />
          </div>
        </div>
      </section>
    </>
  )
}
