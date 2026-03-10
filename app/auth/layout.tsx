import type { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.2),transparent_20%),#05070c]">
      <div className="section-shell flex min-h-screen items-center justify-center py-12">{children}</div>
    </div>
  )
}
