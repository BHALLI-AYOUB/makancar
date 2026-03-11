import { AdminCarManager } from '@/components/platform/admin/car-manager'
import { requireRole } from '@/lib/auth'
import { getAdminInventoryCars } from '@/lib/data/admin-inventory'

export default async function AdminCarsPage() {
  await requireRole('admin')
  const cars = getAdminInventoryCars()

  return <AdminCarManager initialCars={cars} />
}
