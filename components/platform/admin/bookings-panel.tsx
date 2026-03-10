'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Booking, Sale } from '@/types/database'

export function AdminBookingsPanel({ bookings, sales }: { bookings: Booking[]; sales: Sale[] }) {
  const router = useRouter()
  const [bookingItems, setBookingItems] = useState(bookings)
  const [saleItems, setSaleItems] = useState(sales)
  const [error, setError] = useState<string | null>(null)

  async function changeStatus(id: string, status: Booking['status']) {
    setError(null)
    const response = await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    const result = await response.json()

    if (!response.ok) {
      setError(result.error ?? 'Mise a jour impossible.')
      return
    }

    setBookingItems((current) =>
      current.map((booking) => (booking.id === id ? { ...booking, status: result.status } : booking))
    )
    router.refresh()
  }

  async function changeSaleStatus(id: string, status: Sale['status']) {
    setError(null)
    const response = await fetch('/api/sales', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    const result = await response.json()

    if (!response.ok) {
      setError(result.error ?? 'Mise a jour impossible.')
      return
    }

    setSaleItems((current) => current.map((sale) => (sale.id === id ? { ...sale, status: result.status } : sale)))
    router.refresh()
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="font-serif text-3xl text-white">Reservations</h2>
        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
        <div className="mt-5 space-y-4">
          {bookingItems.length === 0 ? <p className="text-sm text-slate-400">Aucune reservation pour le moment.</p> : null}
          {bookingItems.map((booking) => (
            <div key={booking.id} className="rounded-2xl border border-white/10 bg-[#0b1220] p-4">
              <p className="text-sm text-white">{booking.cars?.title ?? 'Voiture'}</p>
              <p className="mt-1 text-xs text-slate-400">{booking.start_date} {'->'} {booking.end_date}</p>
              <div className="mt-3 flex gap-2">
                {(['pending', 'confirmed', 'cancelled'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => changeStatus(booking.id, status)}
                    className={`rounded-full px-3 py-1 text-xs ${booking.status === status ? 'bg-sky-500 text-white' : 'bg-white/5 text-slate-300'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="font-serif text-3xl text-white">Demandes de vente</h2>
        <div className="mt-5 space-y-4">
          {saleItems.length === 0 ? <p className="text-sm text-slate-400">Aucune demande de vente pour le moment.</p> : null}
          {saleItems.map((sale) => (
            <div key={sale.id} className="rounded-2xl border border-white/10 bg-[#0b1220] p-4">
              <p className="text-sm text-white">{sale.cars?.title ?? 'Voiture'}</p>
              <p className="mt-1 text-xs uppercase text-slate-400">status: {sale.status}</p>
              <div className="mt-3 flex gap-2">
                {(['pending', 'approved', 'rejected'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => changeSaleStatus(sale.id, status)}
                    className={`rounded-full px-3 py-1 text-xs ${sale.status === status ? 'bg-sky-500 text-white' : 'bg-white/5 text-slate-300'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
