import Link from 'next/link'
import type { ReactNode } from 'react'
import { CalendarRange, CarFront, LayoutDashboard, Users } from 'lucide-react'
import type { UserRole } from '@/types/database'
import { LogoutButton } from '@/components/platform/logout-button'

const navByRole: Record<UserRole, { href: string; label: string; icon: ReactNode }[]> = {
  admin: [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { href: '/admin/cars', label: 'Cars', icon: <CarFront size={16} /> },
    { href: '/admin/bookings', label: 'Bookings', icon: <CalendarRange size={16} /> },
    { href: '/admin/users', label: 'Users', icon: <Users size={16} /> },
  ],
  client: [
    { href: '/client/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { href: '/client/bookings', label: 'Mes reservations', icon: <CalendarRange size={16} /> },
    { href: '/client/profile', label: 'Profil', icon: <Users size={16} /> },
  ],
}

export function DashboardShell({
  role,
  title,
  subtitle,
  children,
}: {
  role: UserRole
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(201,169,109,0.08),transparent_20%),radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_24%),#05070c]">
      <div className="section-shell grid gap-5 py-5 sm:gap-6 sm:py-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.92)] backdrop-blur-xl sm:rounded-[30px] sm:p-5">
          <div className="border-b border-white/10 pb-4 sm:pb-5">
            <p className="font-serif text-3xl text-white">MAKAN</p>
            <p className="mt-1 text-xs uppercase tracking-[0.32em] text-[#e3c58e]">{role} portal</p>
          </div>

          <nav className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {navByRole[role].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm text-slate-200 transition hover:border-white/10 hover:bg-white/7 hover:text-white"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            <LogoutButton className="w-full justify-center" />
          </div>
        </aside>

        <main className="space-y-6">
          <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.92)] backdrop-blur-xl sm:rounded-[30px] sm:p-6">
            <p className="text-xs uppercase tracking-[0.34em] text-[#e3c58e]">{role}</p>
            <h1 className="mt-3 font-serif text-3xl text-white sm:text-4xl">{title}</h1>
            <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-base">{subtitle}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
