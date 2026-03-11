'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  BadgeCheck,
  CarFront,
  CircleDot,
  Eye,
  Gauge,
  MapPin,
  PencilLine,
  Plus,
  ShieldCheck,
  Trash2,
} from 'lucide-react'
import type { AdminInventoryCar, AdminInventoryCategory, AdminInventoryStatus } from '@/lib/data/admin-inventory'

interface AdminInventoryFormValues {
  title: string
  subtitle: string
  brand: string
  model: string
  year: string
  price: string
  mileage: string
  transmission: string
  fuel: string
  power: string
  status: AdminInventoryStatus
  category: AdminInventoryCategory
  available: boolean
  location: string
  registration: string
  customs: string
  description: string
  features: string
  sellingPoints: string
  badges: string
  whatsapp: string
  gallery: string
}

const emptyForm: AdminInventoryFormValues = {
  title: '',
  subtitle: '',
  brand: '',
  model: '',
  year: '',
  price: '',
  mileage: '',
  transmission: '',
  fuel: '',
  power: '',
  status: 'Disponible',
  category: 'vente',
  available: true,
  location: '',
  registration: '',
  customs: '',
  description: '',
  features: '',
  sellingPoints: '',
  badges: '',
  whatsapp: '06 41 38 98 98',
  gallery: '',
}

function toMultiline(items: string[]) {
  return items.join('\n')
}

function fromCarToForm(car: AdminInventoryCar): AdminInventoryFormValues {
  return {
    title: car.title,
    subtitle: car.subtitle,
    brand: car.brand,
    model: car.model,
    year: car.year,
    price: car.price,
    mileage: car.mileage,
    transmission: car.transmission,
    fuel: car.fuel,
    power: car.power,
    status: car.status,
    category: car.category,
    available: car.available,
    location: car.location,
    registration: car.registration,
    customs: car.customs,
    description: car.description,
    features: toMultiline(car.features),
    sellingPoints: toMultiline(car.sellingPoints),
    badges: toMultiline(car.badges),
    whatsapp: car.whatsapp,
    gallery: toMultiline(car.gallery),
  }
}

function fromFormToCar(form: AdminInventoryFormValues, id: string): AdminInventoryCar {
  const splitLines = (value: string) =>
    value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)

  return {
    id,
    title: form.title,
    subtitle: form.subtitle,
    brand: form.brand,
    model: form.model,
    year: form.year,
    price: form.price,
    mileage: form.mileage,
    transmission: form.transmission,
    fuel: form.fuel,
    power: form.power,
    status: form.status,
    category: form.category,
    available: form.available,
    location: form.location,
    registration: form.registration,
    customs: form.customs,
    description: form.description,
    features: splitLines(form.features),
    sellingPoints: splitLines(form.sellingPoints),
    badges: splitLines(form.badges),
    whatsapp: form.whatsapp,
    gallery: splitLines(form.gallery),
  }
}

function parseDhPrice(value: string) {
  return Number.parseInt(value.replace(/[^\d]/g, ''), 10) || 0
}

function getStatusClasses(status: AdminInventoryStatus) {
  if (status === 'Disponible') return 'border-emerald-400/20 bg-emerald-500/12 text-emerald-200'
  if (status === 'Disponible prochainement') return 'border-amber-400/20 bg-amber-500/12 text-amber-100'
  return 'border-white/10 bg-white/6 text-slate-300'
}

export function AdminCarManager({ initialCars }: { initialCars: AdminInventoryCar[] }) {
  const [cars, setCars] = useState(initialCars)
  const [form, setForm] = useState<AdminInventoryFormValues>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    model: '',
    status: '',
    category: '',
    availability: '',
    minPrice: '',
    maxPrice: '',
  })

  const brands = useMemo(
    () => Array.from(new Set(cars.map((car) => car.brand).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [cars]
  )
  const models = useMemo(
    () => Array.from(new Set(cars.map((car) => car.model).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [cars]
  )

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch =
        !filters.search ||
        [car.title, car.subtitle, car.brand, car.model].some((value) =>
          value.toLowerCase().includes(filters.search.toLowerCase())
        )
      const matchesBrand = !filters.brand || car.brand === filters.brand
      const matchesModel = !filters.model || car.model === filters.model
      const matchesStatus = !filters.status || car.status === filters.status
      const matchesCategory = !filters.category || car.category === filters.category
      const matchesAvailability =
        !filters.availability ||
        (filters.availability === 'available' ? car.available : !car.available)
      const carPrice = parseDhPrice(car.price)
      const matchesMinPrice = !filters.minPrice || carPrice >= Number(filters.minPrice)
      const matchesMaxPrice = !filters.maxPrice || carPrice <= Number(filters.maxPrice)

      return (
        matchesSearch &&
        matchesBrand &&
        matchesModel &&
        matchesStatus &&
        matchesCategory &&
        matchesAvailability &&
        matchesMinPrice &&
        matchesMaxPrice
      )
    })
  }, [cars, filters])

  const stats = useMemo(
    () => [
      { label: 'Stock total', value: cars.length.toString(), tone: 'text-white' },
      {
        label: 'Disponibles',
        value: cars.filter((car) => car.available).length.toString(),
        tone: 'text-emerald-200',
      },
      {
        label: 'Prochainement',
        value: cars.filter((car) => car.status === 'Disponible prochainement').length.toString(),
        tone: 'text-amber-100',
      },
      { label: 'Resultats filtres', value: filteredCars.length.toString(), tone: 'text-[#e3c58e]' },
    ],
    [cars, filteredCars.length]
  )

  function updateField<K extends keyof AdminInventoryFormValues>(key: K, value: AdminInventoryFormValues[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function updateFilter(key: keyof typeof filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  function resetForm() {
    setEditingId(null)
    setForm(emptyForm)
  }

  function startEdit(car: AdminInventoryCar) {
    setEditingId(car.id)
    setForm(fromCarToForm(car))
    setMessage(`Edition ouverte pour ${car.title}.`)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const id = editingId ?? `${form.brand}-${form.model}-${Date.now()}`.toLowerCase().replace(/\s+/g, '-')
    const nextCar = fromFormToCar(form, id)

    setCars((current) =>
      editingId ? current.map((car) => (car.id === editingId ? nextCar : car)) : [nextCar, ...current]
    )
    setMessage(editingId ? 'Vehicule mis a jour dans le stock admin.' : 'Vehicule ajoute au stock admin.')
    resetForm()
  }

  function removeCar(id: string) {
    setCars((current) => current.filter((car) => car.id !== id))
    if (editingId === id) resetForm()
    setMessage('Vehicule retire de la liste admin.')
  }

  function toggleAvailability(id: string) {
    setCars((current) =>
      current.map((car) =>
        car.id === id
          ? {
              ...car,
              available: !car.available,
              status: car.available ? 'Indisponible' : 'Disponible',
            }
          : car
      )
    )
    setMessage('Disponibilite du vehicule mise a jour.')
  }

  return (
    <div className="space-y-7">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.95)]"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{stat.label}</p>
            <p className={`mt-3 font-serif text-5xl ${stat.tone}`}>{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_28px_90px_-48px_rgba(0,0,0,0.92)] backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-[#e3c58e]">Gestion du stock</p>
              <h2 className="mt-2 font-serif text-4xl text-white">Ajouter ou modifier un vehicule</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Le formulaire admin utilise la meme structure premium que le stock public: galerie multiple,
                caracteristiques, badges, informations de vente et presentation showroom.
              </p>
            </div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c9a96d]/30 bg-[#0a0d14] text-[#e3c58e]">
              <Plus size={18} />
            </span>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <input value={form.title} onChange={(event) => updateField('title', event.target.value)} placeholder="Titre" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" required />
              <input value={form.subtitle} onChange={(event) => updateField('subtitle', event.target.value)} placeholder="Sous-titre / version" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" />
              <input value={form.brand} onChange={(event) => updateField('brand', event.target.value)} placeholder="Marque" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" required />
              <input value={form.model} onChange={(event) => updateField('model', event.target.value)} placeholder="Modele" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" required />
              <input value={form.year} onChange={(event) => updateField('year', event.target.value)} placeholder="Annee / date immatriculation" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" />
              <input value={form.price} onChange={(event) => updateField('price', event.target.value)} placeholder="Prix (ex: 273.000 DH)" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" />
              <input value={form.mileage} onChange={(event) => updateField('mileage', event.target.value)} placeholder="Kilometrage" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" />
              <input value={form.transmission} onChange={(event) => updateField('transmission', event.target.value)} placeholder="Transmission" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" />
              <input value={form.fuel} onChange={(event) => updateField('fuel', event.target.value)} placeholder="Carburant" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" />
              <input value={form.power} onChange={(event) => updateField('power', event.target.value)} placeholder="Puissance" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" />
              <select value={form.status} onChange={(event) => updateField('status', event.target.value as AdminInventoryStatus)} className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white">
                <option value="Disponible">Disponible</option>
                <option value="Disponible prochainement">Disponible prochainement</option>
                <option value="Indisponible">Indisponible</option>
              </select>
              <select value={form.category} onChange={(event) => updateField('category', event.target.value as AdminInventoryCategory)} className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white">
                <option value="vente">Vente</option>
                <option value="location">Location</option>
              </select>
              <input value={form.location} onChange={(event) => updateField('location', event.target.value)} placeholder="Localisation" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" />
              <input value={form.registration} onChange={(event) => updateField('registration', event.target.value)} placeholder="Immatriculation" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" />
              <input value={form.customs} onChange={(event) => updateField('customs', event.target.value)} placeholder="Douane / diwana" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" />
              <input value={form.whatsapp} onChange={(event) => updateField('whatsapp', event.target.value)} placeholder="WhatsApp" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" />
            </div>

            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-sm text-slate-200">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(event) => updateField('available', event.target.checked)}
              />
              Vehicule disponible immediatement
            </label>

            <textarea value={form.description} onChange={(event) => updateField('description', event.target.value)} rows={4} placeholder="Description premium du vehicule" className="w-full rounded-3xl border border-white/10 bg-[#0b0f16] px-4 py-4 text-white placeholder:text-slate-500" />

            <div className="grid gap-4 xl:grid-cols-2">
              <textarea value={form.features} onChange={(event) => updateField('features', event.target.value)} rows={6} placeholder="Equipements, un par ligne" className="w-full rounded-3xl border border-white/10 bg-[#0b0f16] px-4 py-4 text-white placeholder:text-slate-500" />
              <div className="grid gap-4">
                <textarea value={form.sellingPoints} onChange={(event) => updateField('sellingPoints', event.target.value)} rows={3} placeholder="Arguments de vente, un par ligne" className="w-full rounded-3xl border border-white/10 bg-[#0b0f16] px-4 py-4 text-white placeholder:text-slate-500" />
                <textarea value={form.badges} onChange={(event) => updateField('badges', event.target.value)} rows={3} placeholder="Badges admin / publics, un par ligne" className="w-full rounded-3xl border border-white/10 bg-[#0b0f16] px-4 py-4 text-white placeholder:text-slate-500" />
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <textarea value={form.gallery} onChange={(event) => updateField('gallery', event.target.value)} rows={6} placeholder="Galerie d images /public, une image par ligne" className="w-full rounded-3xl border border-white/10 bg-[#0b0f16] px-4 py-4 text-white placeholder:text-slate-500" />
              <div className="rounded-[28px] border border-white/10 bg-[#0b0f16] p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Apercu galerie</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {form.gallery
                    .split('\n')
                    .map((item) => item.trim())
                    .filter(Boolean)
                    .slice(0, 4)
                    .map((image) => (
                      <div key={image} className="overflow-hidden rounded-2xl border border-white/10 bg-[#06080d]">
                        <img src={image} alt="Apercu galerie" className="h-24 w-full object-cover" />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {message ? <p className="text-sm text-[#e3c58e]">{message}</p> : null}

            <div className="flex flex-wrap gap-3">
              <button type="submit" className="inline-flex items-center justify-center rounded-full bg-[#c9a96d] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d8b97e]">
                {editingId ? 'Mettre a jour le vehicule' : 'Ajouter au stock'}
              </button>
              {editingId ? (
                <button type="button" onClick={resetForm} className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm text-white transition hover:bg-white/7">
                  Annuler
                </button>
              ) : null}
            </div>
          </form>
        </div>

        <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_28px_90px_-48px_rgba(0,0,0,0.92)] backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.34em] text-[#e3c58e]">Filtres dynamiques</p>
          <h2 className="mt-2 font-serif text-4xl text-white">Piloter l inventaire</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Recherche par titre, marque, modele, statut, categorie, disponibilite et fourchette de prix.
          </p>

          <div className="mt-6 grid gap-3">
            <input value={filters.search} onChange={(event) => updateFilter('search', event.target.value)} placeholder="Rechercher un vehicule" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" />
            <div className="grid gap-3 md:grid-cols-2">
              <select value={filters.brand} onChange={(event) => updateFilter('brand', event.target.value)} className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white">
                <option value="">Toutes les marques</option>
                {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
              </select>
              <select value={filters.model} onChange={(event) => updateFilter('model', event.target.value)} className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white">
                <option value="">Tous les modeles</option>
                {models.map((model) => <option key={model} value={model}>{model}</option>)}
              </select>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <select value={filters.status} onChange={(event) => updateFilter('status', event.target.value)} className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white">
                <option value="">Tous les statuts</option>
                <option value="Disponible">Disponible</option>
                <option value="Disponible prochainement">Disponible prochainement</option>
                <option value="Indisponible">Indisponible</option>
              </select>
              <select value={filters.category} onChange={(event) => updateFilter('category', event.target.value)} className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white">
                <option value="">Toutes les categories</option>
                <option value="vente">Vente</option>
                <option value="location">Location</option>
              </select>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <select value={filters.availability} onChange={(event) => updateFilter('availability', event.target.value)} className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white">
                <option value="">Disponibilite</option>
                <option value="available">Disponible</option>
                <option value="unavailable">Indisponible</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={filters.minPrice} onChange={(event) => updateFilter('minPrice', event.target.value)} placeholder="Prix min" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" />
                <input type="number" value={filters.maxPrice} onChange={(event) => updateFilter('maxPrice', event.target.value)} placeholder="Prix max" className="rounded-2xl border border-white/10 bg-[#0b0f16] px-4 py-3 text-white placeholder:text-slate-500" />
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0b0f16] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Resultats</p>
              <p className="mt-3 font-serif text-5xl text-white">{filteredCars.length}</p>
              <p className="mt-2 text-sm text-slate-400">vehicule(s) correspondent aux filtres actifs</p>
            </div>
          </div>
        </section>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[#e3c58e]">Stock reel admin</p>
            <h2 className="mt-2 font-serif text-4xl text-white">Inventaire Makan Luxury Motors</h2>
          </div>
        </div>

        {filteredCars.length === 0 ? (
          <div className="rounded-[32px] border border-dashed border-white/10 bg-white/4 p-10 text-center text-slate-300">
            Aucun vehicule ne correspond aux filtres actifs.
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {filteredCars.map((car) => (
              <article
                key={car.id}
                className="group overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_28px_110px_-60px_rgba(0,0,0,0.95)] transition duration-500 hover:-translate-y-1 hover:border-[#c9a96d]/35"
              >
                <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_52%),linear-gradient(180deg,#131821_0%,#090c12_100%)]">
                  {car.gallery[0] ? (
                    <img src={car.gallery[0]} alt={car.title} className="h-72 w-full object-contain px-4 py-5" />
                  ) : null}
                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs ${getStatusClasses(car.status)}`}>{car.status}</span>
                    <span className="rounded-full border border-white/10 bg-[#0b0f16]/85 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
                      {car.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-4xl text-white">{car.title}</h3>
                      {car.subtitle ? <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-400">{car.subtitle}</p> : null}
                      <p className="mt-4 text-2xl font-semibold text-[#e3c58e]">{car.price}</p>
                    </div>
                    <div className="grid gap-2 text-right">
                      <span className="text-xs uppercase tracking-[0.24em] text-slate-500">{car.brand}</span>
                      <span className="text-sm text-slate-300">{car.model}</span>
                    </div>
                  </div>

                  <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#080b12] px-4 py-3">
                      <CircleDot size={15} className="text-[#e3c58e]" />
                      <span>{car.year || 'Sur demande'}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#080b12] px-4 py-3">
                      <Gauge size={15} className="text-[#e3c58e]" />
                      <span>{car.mileage || 'Kilometrage sur demande'}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#080b12] px-4 py-3">
                      <CarFront size={15} className="text-[#e3c58e]" />
                      <span>{car.transmission || 'Transmission sur demande'}</span>
                    </div>
                  </div>

                  <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#080b12] px-4 py-3">
                      <MapPin size={15} className="text-[#e3c58e]" />
                      <span>{car.location || 'Localisation sur demande'}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#080b12] px-4 py-3">
                      <ShieldCheck size={15} className="text-[#e3c58e]" />
                      <span>{car.registration || 'Immatriculation sur demande'}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#080b12] px-4 py-3">
                      <BadgeCheck size={15} className="text-[#e3c58e]" />
                      <span>{car.customs || 'Diwana sur demande'}</span>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-slate-300">{car.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {car.badges.slice(0, 4).map((badge) => (
                      <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                    {car.features.slice(0, 6).map((feature) => (
                      <div key={feature} className="rounded-2xl border border-white/8 bg-[#0b0f16] px-4 py-3">
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={() => startEdit(car)} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm text-white transition hover:bg-white/8">
                      <PencilLine size={15} />
                      Modifier
                    </button>
                    <button type="button" onClick={() => removeCar(car.id)} className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 px-4 py-2.5 text-sm text-rose-200 transition hover:bg-rose-500/10">
                      <Trash2 size={15} />
                      Supprimer
                    </button>
                    <Link href={`/cars/${car.id}`} className="inline-flex items-center gap-2 rounded-full border border-[#c9a96d]/28 px-4 py-2.5 text-sm text-[#f0dfba] transition hover:bg-[#c9a96d]/10">
                      <Eye size={15} />
                      Voir details
                    </Link>
                    <button type="button" onClick={() => toggleAvailability(car.id)} className="inline-flex items-center gap-2 rounded-full bg-[#c9a96d] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#d8b97e]">
                      {car.available ? 'Marquer indisponible' : 'Marquer disponible'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
