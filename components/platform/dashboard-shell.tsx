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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(29,78,216,0.14),transparent_26%),#05070c]">
      <div className="section-shell grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="border-b border-white/10 pb-5">
            <p className="font-serif text-3xl text-white">MAKAN</p>
            <p className="mt-1 text-xs uppercase tracking-[0.32em] text-slate-400">{role} portal</p>
          </div>

          <nav className="mt-5 grid gap-2">
            {navByRole[role].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10"
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
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.34em] text-sky-300">{role}</p>
            <h1 className="mt-3 font-serif text-4xl text-white">{title}</h1>
            <p className="mt-2 text-base text-slate-300">{subtitle}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
