import { AdminBookingsPanel } from '@/components/platform/admin/bookings-panel'
import { getAllBookings, getSalesForAdmin } from '@/lib/data/bookings'
import { requireRole } from '@/lib/auth'

export default async function AdminBookingsPage() {
  await requireRole('admin')
  const [bookings, sales] = await Promise.all([getAllBookings(), getSalesForAdmin()])

  return <AdminBookingsPanel bookings={bookings} sales={sales} />
}
