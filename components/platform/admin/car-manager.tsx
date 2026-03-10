'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Car } from '@/types/database'
import type { CarFormValues } from '@/types/forms'

const emptyForm: CarFormValues = {
  title: '',
  brand: '',
  model: '',
  price: 0,
  type: 'vente',
  image_url: '',
  description: '',
  available: true,
}

export function AdminCarManager({ initialCars }: { initialCars: Car[] }) {
  const router = useRouter()
  const [cars, setCars] = useState(initialCars)
  const [form, setForm] = useState<CarFormValues>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function updateField<K extends keyof CarFormValues>(key: K, value: CarFormValues[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const method = editingId ? 'PATCH' : 'POST'
    const url = editingId ? `/api/cars/${editingId}` : '/api/cars'
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const result = await response.json()

    if (!response.ok) {
      setError(result.error ?? 'Operation impossible.')
      setLoading(false)
      return
    }

    const nextCar = result as Car
    setCars((current) =>
      editingId ? current.map((car) => (car.id === editingId ? nextCar : car)) : [nextCar, ...current]
    )
    setMessage(editingId ? 'Voiture mise a jour.' : 'Voiture ajoutee.')
    setForm(emptyForm)
    setEditingId(null)
    setLoading(false)
    router.refresh()
  }

  function startEdit(car: Car) {
    setEditingId(car.id)
    setForm({
      title: car.title,
      brand: car.brand,
      model: car.model,
      price: car.price,
      type: car.type,
      image_url: car.image_url ?? '',
      description: car.description ?? '',
      available: car.available,
    })
  }

  async function removeCar(id: string) {
    setLoading(true)
    setError(null)
    setMessage(null)
    const response = await fetch(`/api/cars/${id}`, { method: 'DELETE' })

    if (!response.ok) {
      setError('Suppression impossible.')
      setLoading(false)
      return
    }

    setCars((current) => current.filter((car) => car.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setForm(emptyForm)
    }
    setMessage('Voiture supprimee.')
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <input value={form.title} onChange={(event) => updateField('title', event.target.value)} placeholder="Titre" className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white" required />
          <input value={form.brand} onChange={(event) => updateField('brand', event.target.value)} placeholder="Marque" className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white" required />
          <input value={form.model} onChange={(event) => updateField('model', event.target.value)} placeholder="Modele" className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white" required />
          <input type="number" value={form.price} onChange={(event) => updateField('price', Number(event.target.value))} placeholder="Prix" className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white" required />
          <select value={form.type} onChange={(event) => updateField('type', event.target.value as Car['type'])} className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white">
            <option value="vente">Vente</option>
            <option value="location">Location</option>
          </select>
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-slate-200">
            <input type="checkbox" checked={form.available} onChange={(event) => updateField('available', event.target.checked)} />
            Disponible
          </label>
        </div>
        <input value={form.image_url} onChange={(event) => updateField('image_url', event.target.value)} placeholder="Image URL" className="mt-4 w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white" required />
        <textarea value={form.description} onChange={(event) => updateField('description', event.target.value)} placeholder="Description" rows={4} className="mt-4 w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white" required />
        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
        {message ? <p className="mt-4 text-sm text-emerald-300">{message}</p> : null}
        <div className="mt-4 flex gap-3">
          <button type="submit" disabled={loading} className="btn-blue rounded-2xl px-5 py-3 disabled:opacity-60">
            {loading ? 'Envoi...' : editingId ? 'Mettre a jour' : 'Ajouter une voiture'}
          </button>
          {editingId ? (
            <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm) }} className="rounded-2xl border border-white/15 px-5 py-3 text-white">
              Annuler
            </button>
          ) : null}
        </div>
      </form>

      <div className="grid gap-4 lg:grid-cols-2">
        {cars.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-white/5 p-8 text-slate-300">
            Aucune voiture disponible pour le moment.
          </div>
        ) : null}
        {cars.map((car) => (
          <div key={car.id} className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{car.type}</p>
                <h3 className="mt-2 font-serif text-3xl text-white">{car.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{car.brand} {car.model}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs ${car.available ? 'bg-emerald-500/20 text-emerald-200' : 'bg-rose-500/20 text-rose-200'}`}>
                {car.available ? 'Disponible' : 'Off'}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{car.description}</p>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => startEdit(car)} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10">
                Modifier
              </button>
              <button type="button" onClick={() => removeCar(car.id)} disabled={loading} className="rounded-full border border-rose-400/25 px-4 py-2 text-sm text-rose-200 hover:bg-rose-500/10 disabled:opacity-60">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
