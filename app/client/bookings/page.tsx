import { getBookingsForUser } from '@/lib/data/bookings'
import { requireRole } from '@/lib/auth'

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; glow: string; dot: string }
> = {
  confirmed: {
    label: 'Confirmée',
    color: 'text-emerald-300',
    glow: 'shadow-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  pending: {
    label: 'En attente',
    color: 'text-amber-300',
    glow: 'shadow-amber-500/20',
    dot: 'bg-amber-400',
  },
  cancelled: {
    label: 'Annulée',
    color: 'text-rose-400',
    glow: 'shadow-rose-500/20',
    dot: 'bg-rose-400',
  },
  completed: {
    label: 'Terminée',
    color: 'text-sky-300',
    glow: 'shadow-sky-500/20',
    dot: 'bg-sky-400',
  },
}

function formatDate(raw: string) {
  return new Date(raw).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function calcDays(start: string, end: string) {
  const diff =
    (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)
  return Math.max(1, Math.round(diff))
}

// ─── Booking Card ─────────────────────────────────────────────────────────────
function BookingCard({ booking, index }: { booking: any; index: number }) {
  const status = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG['pending']
  const days = calcDays(booking.start_date, booking.end_date)

  return (
    <div
      className="booking-card group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#0d1728] to-[#080e1a] p-0 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.15]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Shimmer edge */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute left-0 right-0 top-0 h-px opacity-60"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(148,163,184,0.4), transparent)',
        }}
      />

      <div className="flex items-stretch">
        {/* Left color stripe */}
        <div
          className={`w-1 shrink-0 rounded-l-2xl ${status.dot} opacity-70`}
          style={{ minHeight: '100%' }}
        />

        <div className="flex flex-1 flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Car info */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {/* Mini car icon */}
              <svg
                className="h-4 w-4 shrink-0 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              <span className="font-['Playfair_Display',serif] text-base font-medium tracking-wide text-white/90">
                {booking.cars?.title ?? 'Véhicule'}
              </span>
            </div>

            {/* Date range */}
            <div className="ml-6 flex items-center gap-2 text-xs text-slate-500">
              <span>{formatDate(booking.start_date)}</span>
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <span>{formatDate(booking.end_date)}</span>
            </div>
          </div>

          {/* Right meta */}
          <div className="ml-6 flex items-center gap-6 sm:ml-0">
            {/* Duration pill */}
            <div className="flex flex-col items-center">
              <span className="font-['Playfair_Display',serif] text-xl font-semibold leading-none text-white">
                {days}
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-slate-600">
                {days > 1 ? 'jours' : 'jour'}
              </span>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-white/5" />

            {/* Status badge */}
            <div
              className={`flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 shadow-lg ${status.glow}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot} animate-pulse`} />
              <span className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${status.color}`}>
                {status.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-slate-700/20 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03]">
          <svg
            className="h-9 w-9 text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"
            />
          </svg>
        </div>
      </div>
      <div className="text-center">
        <p className="font-['Playfair_Display',serif] text-lg text-slate-400">
          Aucune réservation
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Vos futures réservations apparaîtront ici.
        </p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ClientBookingsPage() {
  const profile = await requireRole('client')
  const bookings = await getBookingsForUser(profile.id)

  const confirmed = bookings.filter((b) => b.status === 'confirmed').length
  const pending = bookings.filter((b) => b.status === 'pending').length

  return (
    <>
      {/* Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .booking-card { animation: fadeSlideUp 0.4s ease both; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="relative overflow-hidden rounded-[28px] border border-white/[0.07] p-1"
        style={{
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, transparent 60%)',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.04), 0 24px 64px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="rounded-[22px] bg-[#070d18] p-6 sm:p-8">
          {/* ── Header ── */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-600">
                Espace client
              </p>
              <h2
                className="mt-1 text-3xl text-white sm:text-4xl"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
              >
                Mes réservations
              </h2>
            </div>

            {/* Stats row */}
            {bookings.length > 0 && (
              <div className="flex gap-3">
                <div className="flex flex-col items-center rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                  <span className="font-['Playfair_Display',serif] text-2xl text-white">
                    {bookings.length}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-slate-600">
                    Total
                  </span>
                </div>
                {confirmed > 0 && (
                  <div className="flex flex-col items-center rounded-xl border border-emerald-900/30 bg-emerald-950/20 px-4 py-3">
                    <span className="font-['Playfair_Display',serif] text-2xl text-emerald-300">
                      {confirmed}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-emerald-700">
                      Conf.
                    </span>
                  </div>
                )}
                {pending > 0 && (
                  <div className="flex flex-col items-center rounded-xl border border-amber-900/30 bg-amber-950/20 px-4 py-3">
                    <span className="font-['Playfair_Display',serif] text-2xl text-amber-300">
                      {pending}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-amber-700">
                      Attente
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Divider ── */}
          <div
            className="my-6 h-px w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)',
            }}
          />

          {/* ── List ── */}
          <div className="space-y-3">
            {bookings.length > 0
              ? bookings.map((booking, i) => (
                  <BookingCard key={booking.id} booking={booking} index={i} />
                ))
              : <EmptyState />}
          </div>

          {/* ── Footer note ── */}
          {bookings.length > 0 && (
            <p className="mt-6 text-center text-[11px] text-slate-700">
              {bookings.length} réservation{bookings.length > 1 ? 's' : ''} au total
            </p>
          )}
        </div>
      </div>
    </>
  )
}
