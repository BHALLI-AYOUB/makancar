import { ShowroomGrid } from '@/components/platform/showroom-grid'
import { SectionHeading } from '@/components/platform/section-heading'
import { getShowroomCars } from '@/lib/data/showroom-stock'

export default function VentePage() {
  const cars = getShowroomCars()

  return (
    <section className="section-shell py-16 sm:py-20">
      <SectionHeading
        eyebrow="Catalogue premium"
        title="Stock disponible Makan Luxury Motors"
        description="Nos véhicules réels disponibles, dédouanés et présentés avec leurs galeries complètes."
      />
      <div className="mt-10">
        <ShowroomGrid cars={cars} />
      </div>
    </section>
  )
}
