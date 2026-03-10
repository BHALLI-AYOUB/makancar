import { getAllBookings, getSalesForAdmin } from '@/lib/data/bookings'
import { getCars } from '@/lib/data/cars'
import { getAllProfiles } from '@/lib/data/profiles'
import { requireRole } from '@/lib/auth'

export default async function AdminDashboardPage() {
  await requireRole('admin')
  const [cars, bookings, users, sales] = await Promise.all([
    getCars(),
    getAllBookings(),
    getAllProfiles(),
    getSalesForAdmin(),
  ])

  const stats = [
    { label: 'Cars', value: cars.length },
    { label: 'Bookings', value: bookings.length },
    { label: 'Users', value: users.length },
    { label: 'Sales requests', value: sales.length },
  ]

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-2 text-4xl text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
