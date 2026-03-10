import Link from 'next/link'
import { getBookingsForUser } from '@/lib/data/bookings'
import { requireRole } from '@/lib/auth'

export default async function ClientDashboardPage() {
  const profile = await requireRole('client')
  const bookings = await getBookingsForUser(profile.id)

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Nom</p>
          <p className="mt-2 text-2xl text-white">{profile.full_name || 'Client'}</p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Reservations</p>
          <p className="mt-2 text-2xl text-white">{bookings.length}</p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Role</p>
          <p className="mt-2 text-2xl text-white capitalize">{profile.role}</p>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <h2 className="font-serif text-3xl text-white">Actions rapides</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/location" className="btn-blue rounded-full px-5 py-3">
            Reserver une voiture
          </Link>
          <Link href="/vente" className="rounded-full border border-white/15 px-5 py-3 text-white hover:bg-white/10">
            Voir les voitures en vente
          </Link>
        </div>
      </div>
    </div>
  )
}
