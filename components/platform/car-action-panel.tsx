'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Car } from '@/types/database'

export function CarActionPanel({ car }: { car: Car }) {
  const router = useRouter()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleBooking() {
    setLoading(true)
    setError(null)
    setMessage(null)

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        carId: car.id,
        startDate,
        endDate,
      }),
    })

    if (response.status === 401) {
      router.push('/auth/login?redirectedFrom=/cars/' + car.id)
      return
    }

    const result = await response.json()

    if (!response.ok) {
      setError(result.error ?? 'Reservation impossible.')
      setLoading(false)
      return
    }

    setMessage('Reservation enregistree avec succes.')
    setLoading(false)
    router.refresh()
  }

  async function handleSaleRequest() {
    setLoading(true)
    setError(null)
    setMessage(null)

    const response = await fetch('/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        carId: car.id,
      }),
    })

    if (response.status === 401) {
      router.push('/auth/login?redirectedFrom=/cars/' + car.id)
      return
    }

    const result = await response.json()

    if (!response.ok) {
      setError(result.error ?? 'Demande impossible.')
      setLoading(false)
      return
    }

    setMessage('Demande d achat enregistree.')
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.3em] text-sky-300">
        {car.type === 'location' ? 'Reserver maintenant' : 'Demande d achat'}
      </p>
      <h3 className="mt-3 font-serif text-3xl text-white">
        {car.type === 'location' ? 'Planifier votre location' : 'Recevoir une offre'}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        {car.type === 'location'
          ? 'Choisissez vos dates et envoyez une demande de reservation.'
          : 'Envoyez votre demande. Notre equipe vous recontacte pour finaliser la vente.'}
      </p>

      {car.type === 'location' ? (
        <div className="mt-6 space-y-4">
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white"
          />
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white"
          />
          <button onClick={handleBooking} disabled={loading || !startDate || !endDate} className="btn-blue w-full rounded-2xl py-3 disabled:opacity-50">
            {loading ? 'Envoi...' : 'Confirmer la reservation'}
          </button>
        </div>
      ) : (
        <button onClick={handleSaleRequest} disabled={loading} className="btn-blue mt-6 w-full rounded-2xl py-3 disabled:opacity-50">
          {loading ? 'Envoi...' : 'Envoyer ma demande'}
        </button>
      )}

      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
      {message ? <p className="mt-4 text-sm text-emerald-300">{message}</p> : null}
    </div>
  )
}
