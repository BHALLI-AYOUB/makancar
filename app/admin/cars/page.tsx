import { AdminCarManager } from '@/components/platform/admin/car-manager'
import { getCars } from '@/lib/data/cars'
import { requireRole } from '@/lib/auth'

export default async function AdminCarsPage() {
  await requireRole('admin')
  const cars = await getCars()

  return <AdminCarManager initialCars={cars} />
}
