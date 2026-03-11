import Image from 'next/image'
import Link from 'next/link'
import { LayoutDashboard, ShieldCheck } from 'lucide-react'
import { getCurrentProfile } from '@/lib/auth'
import { LogoutButton } from '@/components/platform/logout-button'

const leftLinks = [
  { href: '/', label: 'Home' },
  { href: '/vente', label: 'Vente' },
]

const rightLinks = [{ href: '/location', label: 'Location' }]

export async function SiteHeader() {
  const profile = await getCurrentProfile()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06080d]/92 backdrop-blur-2xl">
      <div className="section-shell">
        <div className="relative grid min-h-[96px] grid-cols-1 items-center gap-4 py-3 md:min-h-[110px] md:grid-cols-[1fr_auto_1fr] md:gap-6 md:py-4">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:flex-1 md:justify-start">
            {leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/82 transition hover:bg-white/8 hover:text-white sm:px-4 sm:text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/"
            aria-label="Makan Luxury Motors"
            className="flex items-center justify-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
          >
            <Image
              src="/logo.png"
              alt="Makan Luxury Motors"
              width={280}
              height={70}
              priority
              className="h-[52px] w-auto object-contain sm:h-[62px] md:h-[70px]"
            />
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:flex-1 md:justify-end">
            {rightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/82 transition hover:bg-white/8 hover:text-white sm:px-4 sm:text-sm"
              >
                {link.label}
              </Link>
            ))}

            {profile ? (
              <>
                <Link
                  href={profile.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[11px] text-white transition hover:bg-white/10 sm:px-4 sm:text-sm"
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
                  className="rounded-full border border-white/15 px-3 py-2 text-[11px] text-white transition hover:bg-white/10 sm:px-4 sm:text-sm"
                >
                  Connexion
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-full border border-white bg-white px-4 py-2.5 text-[11px] font-semibold text-black transition hover:bg-[#e8e8e8] sm:px-5 sm:text-sm"
                >
                  Creer un compte
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
