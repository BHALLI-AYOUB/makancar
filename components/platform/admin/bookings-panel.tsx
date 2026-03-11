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
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.92)] backdrop-blur-xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#e3c58e]">Reservations</p>
            <h2 className="mt-2 font-serif text-3xl text-white">Demandes de location</h2>
          </div>
          <span className="rounded-full border border-white/10 bg-[#0b0f16] px-3 py-1 text-xs text-slate-300">
            {bookingItems.length} element(s)
          </span>
        </div>
        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
        <div className="mt-5 space-y-4">
          {bookingItems.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-white/10 bg-[#0b0f16] p-8 text-center text-sm text-slate-400">
              Aucune reservation pour le moment.
            </div>
          ) : null}
          {bookingItems.map((booking) => (
            <div key={booking.id} className="rounded-[24px] border border-white/10 bg-[#0b1220] p-4">
              <p className="text-sm text-white">{booking.cars?.title ?? 'Voiture'}</p>
              <p className="mt-1 text-xs text-slate-400">{booking.start_date} {'->'} {booking.end_date}</p>
              <div className="mt-3 flex gap-2">
                {(['pending', 'confirmed', 'cancelled'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => changeStatus(booking.id, status)}
                    className={`rounded-full px-3 py-1 text-xs transition ${booking.status === status ? 'bg-[#c9a96d] text-black' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.92)] backdrop-blur-xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#e3c58e]">Ventes</p>
            <h2 className="mt-2 font-serif text-3xl text-white">Demandes d achat</h2>
          </div>
          <span className="rounded-full border border-white/10 bg-[#0b0f16] px-3 py-1 text-xs text-slate-300">
            {saleItems.length} element(s)
          </span>
        </div>
        <div className="mt-5 space-y-4">
          {saleItems.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-white/10 bg-[#0b0f16] p-8 text-center text-sm text-slate-400">
              Aucune demande de vente pour le moment.
            </div>
          ) : null}
          {saleItems.map((sale) => (
            <div key={sale.id} className="rounded-[24px] border border-white/10 bg-[#0b1220] p-4">
              <p className="text-sm text-white">{sale.cars?.title ?? 'Voiture'}</p>
              <p className="mt-1 text-xs uppercase text-slate-400">status: {sale.status}</p>
              <div className="mt-3 flex gap-2">
                {(['pending', 'approved', 'rejected'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => changeSaleStatus(sale.id, status)}
                    className={`rounded-full px-3 py-1 text-xs transition ${sale.status === status ? 'bg-[#c9a96d] text-black' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
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
