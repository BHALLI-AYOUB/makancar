'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { type Car, cars } from '@/data/cars'
import { CarCard } from '@/components/CarCard'
import { CarModal } from '@/components/CarModal'

export function StockSection() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'all' | 'disponible' | 'sur-demande'>('all')
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const bySearch = `${car.model} ${car.package}`.toLowerCase().includes(search.toLowerCase())
      const byStatus = status === 'all' || car.status === status
      return bySearch && byStatus
    })
  }, [search, status])

  const openCar = (car: Car) => {
    setSelectedCar(car)
    setModalOpen(true)
  }

  return (
    <section id="stock" className="section-light py-16 sm:py-20">
      <div className="section-shell">
        <div className="mb-8 grid gap-4 sm:mb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="font-serif text-4xl leading-tight text-black sm:text-6xl">Selection de vehicules</h2>
            <p className="mt-3 max-w-2xl text-base text-slate-700 sm:text-lg">
              Le luxe, le caractere sportif et la performance se marient a la perfection.
            </p>
          </div>
          <div className="grid grid-cols-3 overflow-hidden rounded-md border border-black/20 text-center text-sm font-semibold">
            <button type="button" className="bg-black px-6 py-3 text-white">
              Mercedes-Benz
            </button>
            <button type="button" className="bg-white px-6 py-3 text-black">
              AMG
            </button>
            <button type="button" className="bg-white px-6 py-3 text-black">
              Maybach
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-lg border border-black/15 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block w-full max-w-md">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un modele..."
              className="w-full rounded-md border border-black/20 px-10 py-2.5 text-sm text-black outline-none focus:border-black"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all' as const, label: 'Tous' },
              { value: 'disponible' as const, label: 'Disponible' },
              { value: 'sur-demande' as const, label: 'Sur demande' },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setStatus(item.value)}
                className={`rounded-md border px-4 py-2 text-xs uppercase tracking-[0.14em] transition ${
                  status === item.value
                    ? 'border-black bg-black text-white'
                    : 'border-black/20 bg-white text-black hover:border-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {filteredCars.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <CarCard car={car} onInfoClick={openCar} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-black/20 bg-white p-10 text-center text-slate-700">
            Aucun vehicule ne correspond a votre recherche.
          </div>
        )}
      </div>

      <CarModal car={selectedCar} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
