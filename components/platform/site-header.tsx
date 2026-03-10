import Link from 'next/link'
import { CarFront, LayoutDashboard, ShieldCheck } from 'lucide-react'
import { getCurrentProfile } from '@/lib/auth'
import { LogoutButton } from '@/components/platform/logout-button'

const links = [
  { href: '/', label: 'Home' },
  { href: '/vente', label: 'Vente' },
  { href: '/location', label: 'Location' },
]

export async function SiteHeader() {
  const profile = await getCurrentProfile()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070b12]/85 backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black shadow-[0_10px_35px_-15px_rgba(255,255,255,0.6)]">
              <CarFront size={22} />
            </span>
            <span>
              <span className="block font-serif text-2xl tracking-[0.12em] text-white">MAKAN</span>
              <span className="block text-[11px] uppercase tracking-[0.34em] text-slate-400">Cars Platform</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {profile ? (
            <>
              <Link
                href={profile.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                {profile.role === 'admin' ? <ShieldCheck size={16} /> : <LayoutDashboard size={16} />}
                Dashboard
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
              >
                Connexion
              </Link>
              <Link href="/auth/register" className="btn-blue rounded-full px-5 py-2.5 text-sm">
                Creer un compte
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
