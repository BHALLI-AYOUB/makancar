import type { Car } from '@/types/database'
import { PlatformCarCard } from '@/components/platform/car-card'

export function CarGrid({ cars }: { cars: Car[] }) {
  if (!cars.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-white/15 bg-white/5 p-12 text-center text-slate-400">
        Aucune voiture disponible pour le moment.
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cars.map((car) => (
        <PlatformCarCard key={car.id} car={car} />
      ))}
    </div>
  )
}
