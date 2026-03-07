'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Search } from 'lucide-react'
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
      const byText = `${car.model} ${car.package}`.toLowerCase().includes(search.toLowerCase())
      const byStatus = status === 'all' || car.status === status
      return byText && byStatus
    })
  }, [search, status])

  const openCar = (car: Car) => {
    setSelectedCar(car)
    setModalOpen(true)
  }

  return (
    <section id="stock" className="relative py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 soft-grid opacity-20" />
      <div className="section-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Stock disponible</p>
            <h2 className="mt-2 font-serif text-4xl text-white sm:text-5xl">Selection immediate</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Vehicules verifies, prepares et disponibles rapidement.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
            <Filter size={15} className="text-sky-200" />
            {filteredCars.length} vehicule{filteredCars.length > 1 ? 's' : ''}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel mb-8 rounded-2xl p-4 sm:p-5"
        >
          <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
            <label className="relative block">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher un modele ou un pack..."
                className="w-full rounded-xl border border-white/15 bg-[#070d14] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-sky-200/40 focus:outline-none"
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
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition ${
                    status === item.value
                      ? 'border-sky-200/45 bg-sky-200/20 text-white'
                      : 'border-white/15 bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {filteredCars.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <CarCard car={car} onInfoClick={openCar} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-10 text-center text-slate-300">
            Aucun vehicule ne correspond a la recherche actuelle.
          </div>
        )}
      </div>

      <CarModal car={selectedCar} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
