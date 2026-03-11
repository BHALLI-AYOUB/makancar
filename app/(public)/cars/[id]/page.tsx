import { notFound } from 'next/navigation'
import { CheckCircle2, MessageCircleMore } from 'lucide-react'
import { ShowroomGallery } from '@/components/platform/showroom-gallery'
import { getShowroomCarById, getWhatsAppHref } from '@/lib/data/showroom-stock'

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const car = getShowroomCarById(id)

  if (!car) {
    notFound()
  }

  return (
    <section className="section-shell py-10 sm:py-20">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
        <article className="space-y-6 rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:space-y-8 sm:rounded-[32px] sm:p-7">
          <ShowroomGallery images={car.gallery} alt={car.name} />

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {car.badges.map((badge) => (
                <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  {badge}
                </span>
              ))}
            </div>

            <div>
              <h1 className="font-serif text-3xl font-medium tracking-[-0.03em] text-white sm:text-6xl">{car.name}</h1>
              {car.subtitle ? <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate-400 sm:text-sm sm:tracking-[0.18em]">{car.subtitle}</p> : null}
              {car.price ? <p className="mt-4 text-2xl font-semibold text-[#e3c58e] sm:mt-5 sm:text-3xl">{car.price}</p> : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {car.summary.map((item) => (
                <div key={item.label} className="rounded-[22px] border border-white/10 bg-[#080b12] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                  <p className="mt-2 text-base text-white">{item.value}</p>
                </div>
              ))}
            </div>

            {car.featureGroups.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {car.featureGroups.map((group) => (
                  <div key={group.title} className="rounded-[24px] border border-white/10 bg-[#080b12] p-5">
                    <h2 className="font-serif text-3xl text-white">{group.title}</h2>
                    <ul className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#c9a96d]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </article>

        <aside className="space-y-6 rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:rounded-[32px] sm:p-7">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#e3c58e]">Contact showroom</p>
            <h2 className="mt-3 font-serif text-2xl text-white sm:text-3xl">Demander plus d informations</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Contactez Makan Luxury Motors pour organiser une visite, demander plus de photos ou reserver un
              rendez-vous au showroom.
            </p>
          </div>

          <a
            href={getWhatsAppHref(car.whatsapp, car.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c9a96d] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d8b97e]"
          >
            <MessageCircleMore size={18} />
            WhatsApp {car.whatsapp}
          </a>

          <div className="rounded-[24px] border border-white/10 bg-[#080b12] p-5">
            <h3 className="font-serif text-3xl text-white">Points forts</h3>
            <ul className="mt-4 space-y-3">
              {car.sellingPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-slate-300">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#c9a96d]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
