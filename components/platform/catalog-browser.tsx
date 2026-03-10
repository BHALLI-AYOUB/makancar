import Link from 'next/link'
import { Search } from 'lucide-react'
import type { Car } from '@/types/database'
import { CarGrid } from '@/components/platform/car-grid'

interface CatalogBrowserProps {
  cars: Car[]
  brands: string[]
  total: number
  page: number
  totalPages: number
  pathname: string
  currentSearch: string
  currentBrand: string
  heading: string
  description: string
}

function makeHref(pathname: string, search: string, brand: string, page: number) {
  const params = new URLSearchParams()

  if (search) params.set('q', search)
  if (brand) params.set('brand', brand)
  if (page > 1) params.set('page', String(page))

  const query = params.toString()
  return query ? `${pathname}?${query}` : pathname
}

export function CatalogBrowser({
  cars,
  brands,
  total,
  page,
  totalPages,
  pathname,
  currentSearch,
  currentBrand,
  heading,
  description,
}: CatalogBrowserProps) {
  return (
    <section className="section-shell py-16 sm:py-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-sky-300">{heading}</p>
          <h1 className="mt-3 font-serif text-5xl text-white">{description}</h1>
          <p className="mt-4 text-sm text-slate-300">{total} vehicule(s) trouve(s)</p>
        </div>

        <form action={pathname} className="grid w-full gap-3 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl lg:max-w-3xl lg:grid-cols-[1.5fr_1fr_auto]">
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-slate-300">
            <Search size={16} className="text-slate-500" />
            <input
              type="search"
              name="q"
              defaultValue={currentSearch}
              placeholder="Rechercher par titre, marque ou modele"
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />
          </label>

          <select
            name="brand"
            defaultValue={currentBrand}
            className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none"
          >
            <option value="">Toutes les marques</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          <button type="submit" className="btn-blue rounded-2xl px-5 py-3">
            Filtrer
          </button>
        </form>
      </div>

      <div className="mt-10">
        <CarGrid cars={cars} />
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          Page {page} sur {totalPages}
        </p>
        <div className="flex items-center gap-3">
          <Link
            href={makeHref(pathname, currentSearch, currentBrand, Math.max(1, page - 1))}
            aria-disabled={page <= 1}
            className={`rounded-full px-4 py-2 text-sm ${page <= 1 ? 'pointer-events-none border border-white/10 text-slate-500' : 'border border-white/15 text-white hover:bg-white/10'}`}
          >
            Precedent
          </Link>
          <Link
            href={makeHref(pathname, currentSearch, currentBrand, Math.min(totalPages, page + 1))}
            aria-disabled={page >= totalPages}
            className={`rounded-full px-4 py-2 text-sm ${page >= totalPages ? 'pointer-events-none border border-white/10 text-slate-500' : 'btn-blue'}`}
          >
            Suivant
          </Link>
        </div>
      </div>
    </section>
  )
}
