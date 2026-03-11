import { getAllBookings, getSalesForAdmin } from '@/lib/data/bookings'
import { getAdminInventoryCars } from '@/lib/data/admin-inventory'
import { getAllProfiles } from '@/lib/data/profiles'
import { requireRole } from '@/lib/auth'

export default async function AdminDashboardPage() {
  await requireRole('admin')
  const [cars, bookings, users, sales] = await Promise.all([
    Promise.resolve(getAdminInventoryCars()),
    getAllBookings(),
    getAllProfiles(),
    getSalesForAdmin(),
  ])

  const stats = [
    {
      label: 'Cars',
      value: cars.length,
      note: 'Inventaire public et admin unifie',
      tone: 'text-white',
    },
    {
      label: 'Bookings',
      value: bookings.length,
      note: bookings.length ? 'Reservations chargees depuis la base' : 'Aucune reservation enregistree',
      tone: 'text-emerald-200',
    },
    {
      label: 'Users',
      value: users.length,
      note: `${users.filter((user) => user.role === 'admin').length} admin / ${users.filter((user) => user.role === 'client').length} client`,
      tone: 'text-[#e3c58e]',
    },
    {
      label: 'Sales requests',
      value: sales.length,
      note: sales.length ? 'Demandes d achat chargees depuis la base' : 'Aucune demande pour le moment',
      tone: 'text-sky-200',
    },
  ]

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.95)]"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{stat.label}</p>
            <p className={`mt-3 font-serif text-5xl ${stat.tone}`}>{stat.value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">{stat.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
