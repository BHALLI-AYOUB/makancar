import { getBookingsForUser } from '@/lib/data/bookings'
import { requireRole } from '@/lib/auth'

export default async function ClientBookingsPage() {
  const profile = await requireRole('client')
  const bookings = await getBookingsForUser(profile.id)

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="font-serif text-3xl text-white">Mes reservations</h2>
      <div className="mt-6 space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="rounded-2xl border border-white/10 bg-[#0b1220] p-4">
            <p className="text-lg text-white">{booking.cars?.title ?? 'Voiture'}</p>
            <p className="mt-1 text-sm text-slate-300">
              {booking.start_date} {'->'} {booking.end_date}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-sky-300">{booking.status}</p>
          </div>
        ))}
        {!bookings.length ? <p className="text-slate-400">Aucune reservation pour le moment.</p> : null}
      </div>
    </div>
  )
}
