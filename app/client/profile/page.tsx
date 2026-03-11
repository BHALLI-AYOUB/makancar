import { requireRole } from '@/lib/auth'

function getInitials(name: string | null | undefined) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatMemberDate(raw: string) {
  return new Date(raw).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function getMembershipDuration(raw: string) {
  const months = Math.floor(
    (Date.now() - new Date(raw).getTime()) / (1000 * 60 * 60 * 24 * 30)
  )
  if (months < 1) return 'Nouveau membre'
  if (months < 12) return `${months} mois`
  const years = Math.floor(months / 12)
  return `${years} an${years > 1 ? 's' : ''}`
}

const ROLE_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  client: {
    label: 'Client',
    color: 'text-sky-300',
    bg: 'bg-sky-950/30',
    border: 'border-sky-900/40',
  },
  admin: {
    label: 'Administrateur',
    color: 'text-violet-300',
    bg: 'bg-violet-950/30',
    border: 'border-violet-900/40',
  },
}

export default async function ClientProfilePage() {
  const profile = await requireRole('client')
  const role = ROLE_CONFIG[profile.role] ?? ROLE_CONFIG['client']
  const initials = getInitials(profile.full_name)
  const duration = getMembershipDuration(profile.created_at)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .profile-field { animation: fadeSlideUp 0.4s ease both; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .avatar-ring {
          background: conic-gradient(
            from 180deg,
            rgba(148,163,184,0.15),
            rgba(255,255,255,0.08),
            rgba(148,163,184,0.15)
          );
        }
      `}</style>

      <div
        className="relative overflow-hidden rounded-[28px] border border-white/[0.07] p-1"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, transparent 60%)',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.04), 0 24px 64px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="rounded-[22px] bg-[#070d18] p-6 sm:p-8">

          {/* ── Header label ── */}
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-600">
            Espace client
          </p>
          <h2
            className="mt-1 text-3xl text-white sm:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
          >
            Mon profil
          </h2>

          {/* ── Divider ── */}
          <div
            className="my-6 h-px w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)',
            }}
          />

          {/* ── Avatar + Identity hero ── */}
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-7">
            {/* Avatar */}
            <div className="relative shrink-0">
              {/* Outer glow ring */}
              <div className="avatar-ring absolute -inset-[3px] rounded-full" />
              <div
                className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/[0.08] text-2xl font-semibold text-white"
                style={{
                  background: 'linear-gradient(135deg, #0f1e38 0%, #0a1220 100%)',
                  fontFamily: "'Playfair Display', serif",
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                {initials}
              </div>
            </div>

            {/* Name + role + duration */}
            <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
              <h3
                className="text-2xl text-white sm:text-3xl"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
              >
                {profile.full_name || 'Utilisateur'}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                {/* Role badge */}
                <span
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${role.color} ${role.bg} ${role.border}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
                  {role.label}
                </span>
                {/* Duration badge */}
                <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-slate-500">
                  {duration}
                </span>
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div
            className="my-7 h-px w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent)',
            }}
          />

          {/* ── Fields grid ── */}
          <dl className="grid gap-3 sm:grid-cols-2">
            {/* Full name */}
            <div
              className="profile-field group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0d1728] to-[#080e1a] p-5 transition-all duration-300 hover:border-white/[0.12]"
              style={{ animationDelay: '0ms' }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
              <div className="absolute left-0 top-0 h-px w-full opacity-50"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.25), transparent)' }} />
              <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-600">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Nom complet
              </dt>
              <dd
                className="mt-3 text-lg text-white/90"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {profile.full_name || (
                  <span className="text-slate-600 italic text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Non renseigné
                  </span>
                )}
              </dd>
            </div>

            {/* Email */}
            <div
              className="profile-field group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0d1728] to-[#080e1a] p-5 transition-all duration-300 hover:border-white/[0.12]"
              style={{ animationDelay: '80ms' }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
              <div className="absolute left-0 top-0 h-px w-full opacity-50"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.25), transparent)' }} />
              <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-600">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Adresse email
              </dt>
              <dd className="mt-3 truncate text-base text-white/90 font-light tracking-wide">
                {profile.email}
              </dd>
            </div>

            {/* Role */}
            <div
              className="profile-field group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0d1728] to-[#080e1a] p-5 transition-all duration-300 hover:border-white/[0.12]"
              style={{ animationDelay: '160ms' }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
              <div className="absolute left-0 top-0 h-px w-full opacity-50"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.25), transparent)' }} />
              <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-600">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Rôle
              </dt>
              <dd className="mt-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${role.color} ${role.bg} ${role.border}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
                  {role.label}
                </span>
              </dd>
            </div>

            {/* Member since */}
            <div
              className="profile-field group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0d1728] to-[#080e1a] p-5 transition-all duration-300 hover:border-white/[0.12]"
              style={{ animationDelay: '240ms' }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
              <div className="absolute left-0 top-0 h-px w-full opacity-50"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.25), transparent)' }} />
              <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-600">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                </svg>
                Membre depuis
              </dt>
              <dd className="mt-3 flex flex-col gap-0.5">
                <span
                  className="text-lg text-white/90"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {formatMemberDate(profile.created_at)}
                </span>
                <span className="text-[11px] uppercase tracking-[0.12em] text-slate-600">
                  {duration}
                </span>
              </dd>
            </div>
          </dl>

        </div>
      </div>
    </>
  )
}