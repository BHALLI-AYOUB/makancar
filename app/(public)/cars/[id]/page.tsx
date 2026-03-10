import { notFound } from 'next/navigation'
import { CarActionPanel } from '@/components/platform/car-action-panel'
import { getCarById } from '@/lib/data/cars'

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const car = await getCarById(id)

  if (!car) {
    notFound()
  }

  return (
    <section className="section-shell py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl">
          <img
            src={car.image_url ?? 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80'}
            alt={car.title}
            className="h-[420px] w-full object-cover"
          />
          <div className="space-y-5 p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-sky-300">{car.type}</p>
              <h1 className="mt-3 font-serif text-5xl text-white">{car.title}</h1>
              <p className="mt-3 text-base text-slate-300">{car.brand} • {car.model}</p>
            </div>
            <p className="text-lg leading-8 text-slate-200">{car.description}</p>
            <div className="rounded-[24px] border border-white/10 bg-[#0b1220] p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Prix</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(car.price)}
              </p>
            </div>
          </div>
        </article>
        <CarActionPanel car={car} />
      </div>
    </section>
  )
}
