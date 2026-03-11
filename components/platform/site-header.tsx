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
        <div className="relative flex min-h-[118px] items-center justify-between gap-6 py-4 max-md:flex-col max-md:gap-4">
          <div className="flex flex-1 items-center justify-start gap-2 max-md:w-full max-md:justify-center">
            {leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium uppercase tracking-[0.12em] text-white/82 transition hover:bg-white/8 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/"
            aria-label="Makan Luxury Motors"
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center max-md:static max-md:translate-x-0 max-md:translate-y-0"
          >
            <Image
              src="/logo.png"
              alt="Makan Luxury Motors"
              width={280}
              height={70}
              priority
              className="h-[70px] w-auto object-contain"
            />
          </Link>

          <div className="flex flex-1 items-center justify-end gap-2 max-md:w-full max-md:flex-wrap max-md:justify-center">
            {rightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium uppercase tracking-[0.12em] text-white/82 transition hover:bg-white/8 hover:text-white"
              >
                {link.label}
              </Link>
            ))}

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
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                >
                  Connexion
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-full border border-white bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#e8e8e8]"
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
