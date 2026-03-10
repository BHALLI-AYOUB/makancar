'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Car } from '@/types/database'
import type { CarFormValues } from '@/types/forms'
import { uploadCarImage } from '@/lib/supabase/storage'

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
  const [uploadingImage, setUploadingImage] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    type: '',
    availability: '',
    minPrice: '',
    maxPrice: '',
  })

  function updateField<K extends keyof CarFormValues>(key: K, value: CarFormValues[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function updateFilter(key: keyof typeof filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setUploadingImage(true)
    setError(null)
    setMessage(null)

    try {
      const publicUrl = await uploadCarImage(file)
      updateField('image_url', publicUrl)
      setMessage('Image envoyee sur Supabase Storage.')
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? `${uploadError.message}. Cree le bucket public 'cars' dans Supabase Storage si besoin.`
          : "Upload impossible. Cree le bucket public 'cars' dans Supabase Storage."
      )
    } finally {
      setUploadingImage(false)
      event.target.value = ''
    }
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

  const brands = useMemo(
    () => Array.from(new Set(cars.map((car) => car.brand))).sort((a, b) => a.localeCompare(b)),
    [cars]
  )

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch =
        !filters.search ||
        [car.title, car.brand, car.model].some((value) =>
          value.toLowerCase().includes(filters.search.toLowerCase())
        )
      const matchesBrand = !filters.brand || car.brand === filters.brand
      const matchesType = !filters.type || car.type === filters.type
      const matchesAvailability =
        !filters.availability ||
        (filters.availability === 'available' ? car.available : !car.available)
      const matchesMinPrice = !filters.minPrice || car.price >= Number(filters.minPrice)
      const matchesMaxPrice = !filters.maxPrice || car.price <= Number(filters.maxPrice)

      return (
        matchesSearch &&
        matchesBrand &&
        matchesType &&
        matchesAvailability &&
        matchesMinPrice &&
        matchesMaxPrice
      )
    })
  }, [cars, filters])

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
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_0.9fr]">
          <input
            value={form.image_url}
            onChange={(event) => updateField('image_url', event.target.value)}
            placeholder="Image URL"
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white"
            required
          />
          <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/20 bg-[#0b1220] px-4 py-3 text-sm text-slate-300">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            {uploadingImage ? 'Upload image...' : 'Uploader vers Supabase Storage'}
          </label>
        </div>
        {form.image_url ? (
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220]">
            <img src={form.image_url} alt="Preview" className="h-44 w-full object-cover" />
          </div>
        ) : null}
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

      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Filtres admin</p>
            <h2 className="mt-2 font-serif text-3xl text-white">Trouver rapidement une voiture</h2>
          </div>
          <p className="text-sm text-slate-400">{filteredCars.length} resultat(s)</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
          <input value={filters.search} onChange={(event) => updateFilter('search', event.target.value)} placeholder="Recherche" className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white" />
          <select value={filters.brand} onChange={(event) => updateFilter('brand', event.target.value)} className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white">
            <option value="">Toutes les marques</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <select value={filters.type} onChange={(event) => updateFilter('type', event.target.value)} className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white">
            <option value="">Tous les types</option>
            <option value="vente">Vente</option>
            <option value="location">Location</option>
          </select>
          <select value={filters.availability} onChange={(event) => updateFilter('availability', event.target.value)} className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white">
            <option value="">Disponibilite</option>
            <option value="available">Disponible</option>
            <option value="unavailable">Indisponible</option>
          </select>
          <input type="number" value={filters.minPrice} onChange={(event) => updateFilter('minPrice', event.target.value)} placeholder="Prix min" className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white" />
          <input type="number" value={filters.maxPrice} onChange={(event) => updateFilter('maxPrice', event.target.value)} placeholder="Prix max" className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white" />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {filteredCars.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-white/5 p-8 text-slate-300">
            Aucune voiture ne correspond aux filtres.
          </div>
        ) : null}
        {filteredCars.map((car) => (
          <div key={car.id} className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            {car.image_url ? (
              <img src={car.image_url} alt={car.title} className="mb-4 h-44 w-full rounded-2xl object-cover" />
            ) : null}
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
