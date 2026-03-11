import type { ShowroomCar } from '@/types/showroom'
import { ShowroomCard } from '@/components/platform/showroom-card'

export function ShowroomGrid({ cars }: { cars: ShowroomCar[] }) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {cars.map((car) => (
        <ShowroomCard key={car.id} car={car} />
      ))}
    </div>
  )
}
