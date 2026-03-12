import Link from 'next/link'
import {
  BellRing,
  Bookmark,
  CarFront,
  ClipboardList,
  Heart,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { getBookingsForUser } from '@/lib/data/bookings'
import { requireRole } from '@/lib/auth'

function getInitials(name: string | null | undefined) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 6) return 'Bonne nuit'
  if (hour < 12) return 'Bonjour'
  if (hour < 18) return 'Bon après-midi'
  return 'Bonsoir'
}

export default async function ClientDashboardPage() {
  const profile = await requireRole('client')
  const bookings = await getBookingsForUser(profile.id)

  const confirmed = bookings.filter((booking) => booking.status === 'confirmed').length
  const pending = bookings.filter((booking) => booking.status === 'pending').length
  const initials = getInitials(profile.full_name)
  const greeting = getGreeting()

  const services = [
    {
      icon: Heart,
      title: 'Mes favoris',
      description: 'Retrouvez rapidement les véhicules que vous avez sauvegardés.',
      count: 0,
      accent: 'text-rose-300',
      border: 'border-rose-900/30',
      glow: 'rgba(244,114,182,0.08)',
      cta: 'Explorer le stock',
      href: '/vente',
    },
    {
      icon: SearchCheck,
      title: 'Mes recherches',
      description: 'Consultez vos recherches personnalisées et vos critères enregistrés.',
      count: 0,
      accent: 'text-sky-300',
      border: 'border-sky-900/30',
      glow: 'rgba(56,189,248,0.08)',
      cta: 'Lancer une recherche',
      href: '/vente',
    },
    {
      icon: ClipboardList,
      title: 'Mes demandes',
      description: "Suivez l'état de vos demandes envoyées à Makan Luxury Motors.",
      count: bookings.length,
      accent: 'text-amber-300',
      border: 'border-amber-900/30',
      glow: 'rgba(251,191,36,0.08)',
      cta: 'Voir mes réservations',
      href: '/client/bookings',
    },
    {
      icon: BellRing,
      title: 'Mes notifications',
      description: 'Recevez les dernières disponibilités et nouveautés correspondant à vos préférences.',
      count: pending,
      accent: 'text-emerald-300',
      border: 'border-emerald-900/30',
      glow: 'rgba(52,211,153,0.08)',
      cta: 'Mettre a jour mon profil',
      href: '/client/profile',
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .dash-card { animation: fadeUp .45s ease both; }
        .dash-link { transition: all .25s ease; }
        .dash-link:hover { transform: translateY(-2px); }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to { opacity:1; transform:translateY(0); }
        }
        .top-line::before {
          content:''; position:absolute; left:0; right:0; top:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(148,163,184,.28),transparent);
        }
      `}</style>

      <div className="grid gap-5" style={{ fontFamily: "'DM Sans',sans-serif" }}>
        <div
          className="dash-card relative overflow-hidden rounded-[24px] border border-white/[0.07] p-1"
          style={{
            boxShadow:
              '0 0 0 1px rgba(255,255,255,.04),0 20px 56px -12px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.06)',
          }}
        >
          <div className="relative flex flex-col gap-6 overflow-hidden rounded-[20px] bg-[#070d18] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(148,163,184,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.6) 1px,transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle,rgba(56,189,248,.15) 0%,transparent 70%)' }}
            />

            <div className="relative flex items-center gap-5">
              <div className="relative shrink-0">
                <div
                  className="absolute -inset-[3px] rounded-full opacity-60"
                  style={{
                    background:
                      'conic-gradient(from 180deg,rgba(148,163,184,.2),rgba(255,255,255,.06),rgba(148,163,184,.2))',
                  }}
                />
                <div
                  className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] text-xl font-semibold text-white"
                  style={{
                    background: 'linear-gradient(135deg,#0f1e38 0%,#0a1220 100%)',
                    fontFamily: "'Playfair Display',serif",
                  }}
                >
                  {initials}
                </div>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{greeting}</p>
                <h1 className="mt-0.5 text-2xl text-white sm:text-3xl" style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500 }}>
                  {profile.full_name || 'Client'}
                </h1>
                <p className="mt-1 text-xs capitalize tracking-wide text-slate-500">{profile.role}</p>
              </div>
            </div>

            <div className="relative flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Réservations</span>
              <span className="mt-1 font-serif text-4xl text-white">{bookings.length}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              label: 'Confirmées',
              value: confirmed,
              color: 'text-emerald-300',
              border: 'border-emerald-900/30',
              glow: 'rgba(52,211,153,0.08)',
              icon: ShieldCheck,
            },
            {
              label: 'En attente',
              value: pending,
              color: 'text-amber-300',
              border: 'border-amber-900/30',
              glow: 'rgba(251,191,36,0.08)',
              icon: Sparkles,
            },
            {
              label: 'Total',
              value: bookings.length,
              color: 'text-sky-300',
              border: 'border-sky-900/30',
              glow: 'rgba(56,189,248,0.08)',
              icon: CarFront,
            },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`dash-card top-line relative overflow-hidden rounded-[20px] border ${stat.border} bg-[#070d18] p-5`}
                style={{
                  animationDelay: `${index * 80}ms`,
                  boxShadow: `0 8px 32px -8px ${stat.glow}`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                    <p className={`mt-2 font-serif text-4xl ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className={`rounded-xl border ${stat.border} bg-black/20 p-2`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <article
                key={service.title}
                className={`dash-card top-line relative overflow-hidden rounded-[24px] border ${service.border} bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6`}
                style={{
                  animationDelay: `${index * 90 + 240}ms`,
                  boxShadow: `0 18px 48px -18px ${service.glow}`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${service.border} bg-[#0a0f18] ${service.accent}`}>
                      <Icon size={24} />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Espace client</p>
                      <h2 className="mt-2 font-serif text-3xl text-white">{service.title}</h2>
                    </div>
                  </div>
                  <div className={`rounded-full border ${service.border} bg-black/20 px-3 py-1 text-xs font-medium ${service.accent}`}>
                    {service.count}
                  </div>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">{service.description}</p>

                <div className="mt-6">
                  <Link
                    href={service.href}
                    className="dash-link inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white transition hover:bg-white/[0.06]"
                  >
                    {service.cta}
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        <div
          className="dash-card relative overflow-hidden rounded-[24px] border border-white/[0.07] p-1"
          style={{
            boxShadow:
              '0 0 0 1px rgba(255,255,255,.04),0 20px 56px -12px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.05)',
            animationDelay: '640ms',
          }}
        >
          <div className="rounded-[20px] bg-[#070d18] p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Naviguer</p>
            <h2 className="mt-1 font-serif text-2xl text-white sm:text-3xl">Actions rapides</h2>

            <div
              className="my-6 h-px"
              style={{
                background:
                  'linear-gradient(90deg,transparent,rgba(255,255,255,.06) 30%,rgba(255,255,255,.06) 70%,transparent)',
              }}
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/location"
                className="dash-link group relative overflow-hidden rounded-2xl border border-sky-600/30 bg-sky-950/30 p-5"
                style={{ boxShadow: '0 8px 32px -8px rgba(14,165,233,.15)' }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(135deg,rgba(14,165,233,.08) 0%,transparent 60%)' }}
                />
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-600/30 bg-sky-950/50">
                    <CarFront className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sky-200">Reserver une voiture</p>
                    <p className="mt-0.5 text-[11px] text-sky-500">Parcourir le catalogue location</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/vente"
                className="dash-link group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#0d1728] to-[#080e1a] p-5"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(135deg,rgba(255,255,255,.03) 0%,transparent 60%)' }}
                />
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04]">
                    <Bookmark className="h-5 w-5 text-slate-300" />
                  </div>
                  <div>
                    <p className="font-medium text-white/80">Voitures en vente</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">Explorer les véhicules disponibles</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
