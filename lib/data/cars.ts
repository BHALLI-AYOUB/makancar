import type { Car } from '@/types/database'
import type { CarFormValues } from '@/types/forms'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export interface CarsQueryOptions {
  type?: Car['type']
  search?: string
  brand?: string
  page?: number
  pageSize?: number
}

export interface CarsQueryResult {
  cars: Car[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  brands: string[]
}

const fallbackCars: Car[] = [
  {
    id: 'fallback-1',
    title: 'Mercedes GLC Coupe AMG',
    brand: 'Mercedes-Benz',
    model: 'GLC Coupe',
    price: 69900,
    type: 'vente',
    image_url: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1600&q=80',
    description: 'SUV coupe premium avec configuration AMG Black Night et finition haut de gamme.',
    available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-2',
    title: 'BMW X7 M60i',
    brand: 'BMW',
    model: 'X7 M60i',
    price: 95000,
    type: 'vente',
    image_url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80',
    description: 'SUV de prestige avec finition sportive et technologies de conduite avancees.',
    available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-3',
    title: 'Porsche 911 Carrera',
    brand: 'Porsche',
    model: '911 Carrera',
    price: 1250,
    type: 'location',
    image_url: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1600&q=80',
    description: 'Location journaliere d une sportive iconique pour weekend ou evenement premium.',
    available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-4',
    title: 'Range Rover Velar',
    brand: 'Land Rover',
    model: 'Velar',
    price: 890,
    type: 'location',
    image_url: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1600&q=80',
    description: 'SUV luxe disponible en location avec interieur raffine et conduite confortable.',
    available: true,
    created_at: new Date().toISOString(),
  },
]

function shouldUseFallback(message: string) {
  return message.includes("Could not find the table 'public.cars'") || message.includes('relation "public.cars" does not exist')
}

function getFallbackCars(type?: Car['type']) {
  return type ? fallbackCars.filter((car) => car.type === type) : fallbackCars
}

function normalizePage(value?: number) {
  return !value || Number.isNaN(value) || value < 1 ? 1 : Math.floor(value)
}

function buildBrands(brands: string[]) {
  return Array.from(new Set(brands.filter(Boolean))).sort((a, b) => a.localeCompare(b))
}

export async function getCars(type?: Car['type']) {
  const supabase = await createSupabaseServerClient()
  let query = supabase.from('cars').select('*').order('created_at', { ascending: false })

  if (type) {
    query = query.eq('type', type)
  }

  const { data, error } = await query

  if (error) {
    if (shouldUseFallback(error.message)) {
      return getFallbackCars(type)
    }

    throw new Error(error.message)
  }

  return data ?? []
}

export async function getAvailableCars(type?: Car['type']) {
  const supabase = await createSupabaseServerClient()
  let query = supabase.from('cars').select('*').eq('available', true).order('created_at', { ascending: false })

  if (type) {
    query = query.eq('type', type)
  }

  const { data, error } = await query

  if (error) {
    if (shouldUseFallback(error.message)) {
      return getFallbackCars(type).filter((car) => car.available)
    }

    throw new Error(error.message)
  }

  return data ?? []
}

export async function getCarsCatalog(options: CarsQueryOptions = {}): Promise<CarsQueryResult> {
  const type = options.type
  const search = options.search?.trim() ?? ''
  const brand = options.brand?.trim() ?? ''
  const pageSize = options.pageSize ?? 6
  const requestedPage = normalizePage(options.page)
  const from = (requestedPage - 1) * pageSize
  const to = from + pageSize - 1
  const supabase = await createSupabaseServerClient()

  let brandsQuery = supabase.from('cars').select('brand').eq('available', true)
  let dataQuery = supabase.from('cars').select('*', { count: 'exact' }).eq('available', true).order('created_at', { ascending: false })

  if (type) {
    brandsQuery = brandsQuery.eq('type', type)
    dataQuery = dataQuery.eq('type', type)
  }

  if (brand) {
    dataQuery = dataQuery.eq('brand', brand)
  }

  if (search) {
    const searchFilter = `title.ilike.%${search}%,brand.ilike.%${search}%,model.ilike.%${search}%`
    dataQuery = dataQuery.or(searchFilter)
    brandsQuery = brandsQuery.or(searchFilter)
  }

  const [{ data, error, count }, brandsResult] = await Promise.all([
    dataQuery.range(from, to),
    brandsQuery.order('brand', { ascending: true }),
  ])

  if (error) {
    if (shouldUseFallback(error.message)) {
      let items = getFallbackCars(type).filter((car) => car.available)

      if (brand) {
        items = items.filter((car) => car.brand === brand)
      }

      if (search) {
        const lowerSearch = search.toLowerCase()
        items = items.filter((car) =>
          [car.title, car.brand, car.model].some((value) => value.toLowerCase().includes(lowerSearch))
        )
      }

      const total = items.length
      const totalPages = Math.max(1, Math.ceil(total / pageSize))
      const page = Math.min(requestedPage, totalPages)

      return {
        cars: items.slice((page - 1) * pageSize, page * pageSize),
        total,
        page,
        pageSize,
        totalPages,
        brands: buildBrands(getFallbackCars(type).filter((car) => car.available).map((car) => car.brand)),
      }
    }

    throw new Error(error.message)
  }

  const total = count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const page = Math.min(requestedPage, totalPages)

  return {
    cars: data ?? [],
    total,
    page,
    pageSize,
    totalPages,
    brands: buildBrands((brandsResult.data ?? []).map((item) => item.brand)),
  }
}

export async function getCarById(id: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('cars').select('*').eq('id', id).maybeSingle()

  if (error) {
    if (shouldUseFallback(error.message)) {
      return fallbackCars.find((car) => car.id === id) ?? null
    }

    throw new Error(error.message)
  }

  return data
}

export async function addCar(values: CarFormValues) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('cars').insert(values).select('*').single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateCar(id: string, values: Partial<CarFormValues>) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('cars').update(values).eq('id', id).select('*').single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function deleteCar(id: string) {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('cars').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}
