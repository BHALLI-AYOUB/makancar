import Link from 'next/link'
import { getBookingsForUser } from '@/lib/data/bookings'
import { requireRole } from '@/lib/auth'

function getInitials(name: string | null | undefined) {
  if (!name) return '?'
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 6)  return 'Bonne nuit'
  if (h < 12) return 'Bonjour'
  if (h < 18) return 'Bon après-midi'
  return 'Bonsoir'
}

export default async function ClientDashboardPage() {
  const profile = await requireRole('client')
  const bookings = await getBookingsForUser(profile.id)

  const confirmed = bookings.filter((b) => b.status === 'confirmed').length
  const pending   = bookings.filter((b) => b.status === 'pending').length
  const initials  = getInitials(profile.full_name)
  const greeting  = getGreeting()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .dash-card  { animation: fadeUp .45s ease both; }
        .dash-link  { transition: all .25s ease; }
        .dash-link:hover { transform: translateY(-2px); }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .shimmer-hover::after {
          content:''; position:absolute; inset:0; border-radius:inherit;
          background:linear-gradient(135deg,rgba(255,255,255,.04) 0%,transparent 60%);
          opacity:0; transition:opacity .4s;
        }
        .shimmer-hover:hover::after { opacity:1; }
        .top-line::before {
          content:''; position:absolute; left:0; right:0; top:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(148,163,184,.28),transparent);
        }
      `}</style>

      <div className="grid gap-5" style={{ fontFamily:"'DM Sans',sans-serif" }}>

        {/* ── Welcome banner ─────────────────────────────────────── */}
        <div
          className="dash-card relative overflow-hidden rounded-[24px] border border-white/[0.07] p-1"
          style={{
            boxShadow:'0 0 0 1px rgba(255,255,255,.04),0 20px 56px -12px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.06)',
            animationDelay:'0ms',
          }}
        >
          <div
            className="relative flex flex-col gap-6 overflow-hidden rounded-[20px] bg-[#070d18] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            {/* Background subtle grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:'linear-gradient(rgba(148,163,184,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.6) 1px,transparent 1px)',
                backgroundSize:'40px 40px',
              }}
            />
            {/* Radial glow */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20"
              style={{ background:'radial-gradient(circle,rgba(56,189,248,.15) 0%,transparent 70%)' }}
            />

            <div className="relative flex items-center gap-5">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="absolute -inset-[3px] rounded-full opacity-60"
                  style={{ background:'conic-gradient(from 180deg,rgba(148,163,184,.2),rgba(255,255,255,.06),rgba(148,163,184,.2))' }}
                />
                <div
                  className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] text-xl font-semibold text-white"
                  style={{ background:'linear-gradient(135deg,#0f1e38 0%,#0a1220 100%)', fontFamily:"'Playfair Display',serif" }}
                >
                  {initials}
                </div>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-600">{greeting}</p>
                <h1
                  className="mt-0.5 text-2xl text-white sm:text-3xl"
                  style={{ fontFamily:"'Playfair Display',serif", fontWeight:500 }}
                >
                  {profile.full_name || 'Client'}
                </h1>
                <p className="mt-1 text-xs capitalize tracking-wide text-slate-600">{profile.role}</p>
              </div>
            </div>

            {/* Total booking pill */}
            <div className="relative flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600">Réservations</span>
              <span
                className="mt-1 text-4xl text-white"
                style={{ fontFamily:"'Playfair Display',serif" }}
              >
                {bookings.length}
              </span>
            </div>
          </div>
        </div>

        {/* ── Stats row ──────────────────────────────────────────── */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              delay:'80ms',
              label:'Confirmées',
              value: confirmed,
              color:'text-emerald-300',
              border:'border-emerald-900/30',
              bg:'from-emerald-950/20',
              glow:'rgba(52,211,153,.08)',
              icon:(
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              ),
            },
            {
              delay:'160ms',
              label:'En attente',
              value: pending,
              color:'text-amber-300',
              border:'border-amber-900/30',
              bg:'from-amber-950/20',
              glow:'rgba(251,191,36,.08)',
              icon:(
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              ),
            },
            {
              delay:'240ms',
              label:'Total',
              value: bookings.length,
              color:'text-sky-300',
              border:'border-sky-900/30',
              bg:'from-sky-950/20',
              glow:'rgba(56,189,248,.08)',
              icon:(
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
              ),
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`dash-card shimmer-hover top-line relative overflow-hidden rounded-[20px] border ${s.border} bg-gradient-to-br ${s.bg} to-[#070d18] p-5`}
              style={{
                animationDelay: s.delay,
                boxShadow:`0 8px 32px -8px ${s.glow}`,
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600">{s.label}</p>
                  <p
                    className={`mt-2 text-4xl ${s.color}`}
                    style={{ fontFamily:"'Playfair Display',serif" }}
                  >
                    {s.value}
                  </p>
                </div>
                <div className={`rounded-xl border ${s.border} bg-black/20 p-2`}>
                  <svg className={`h-5 w-5 ${s.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {s.icon}
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Quick actions ──────────────────────────────────────── */}
        <div
          className="dash-card relative overflow-hidden rounded-[24px] border border-white/[0.07] p-1"
          style={{
            boxShadow:'0 0 0 1px rgba(255,255,255,.04),0 20px 56px -12px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.05)',
            animationDelay:'320ms',
          }}
        >
          <div className="rounded-[20px] bg-[#070d18] p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-600">Naviguer</p>
            <h2
              className="mt-1 text-2xl text-white sm:text-3xl"
              style={{ fontFamily:"'Playfair Display',serif", fontWeight:500 }}
            >
              Actions rapides
            </h2>

            <div
              className="my-6 h-px"
              style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,.06) 30%,rgba(255,255,255,.06) 70%,transparent)' }}
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {/* Primary CTA */}
              <Link
                href="/location"
                className="dash-link group relative overflow-hidden rounded-2xl border border-sky-600/30 bg-sky-950/30 p-5"
                style={{ boxShadow:'0 8px 32px -8px rgba(14,165,233,.15)' }}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background:'linear-gradient(135deg,rgba(14,165,233,.08) 0%,transparent 60%)' }} />
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-600/30 bg-sky-950/50">
                    <svg className="h-5 w-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-sky-200">Réserver une voiture</p>
                    <p className="mt-0.5 text-[11px] text-sky-600">Parcourir le catalogue location</p>
                  </div>
                  <svg className="ml-auto h-4 w-4 text-sky-600 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/vente"
                className="dash-link group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#0d1728] to-[#080e1a] p-5"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background:'linear-gradient(135deg,rgba(255,255,255,.03) 0%,transparent 60%)' }} />
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04]">
                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3.284 14.253A8.959 8.959 0 013 12c0-.778.099-1.533.284-2.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white/80">Voitures en vente</p>
                    <p className="mt-0.5 text-[11px] text-slate-600">Explorer les véhicules disponibles</p>
                  </div>
                  <svg className="ml-auto h-4 w-4 text-slate-700 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}