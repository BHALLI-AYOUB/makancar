import { CatalogBrowser } from '@/components/platform/catalog-browser'
import { getCarsCatalog } from '@/lib/data/cars'

export default async function LocationPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; brand?: string; page?: string }>
}) {
  const params = await searchParams
  const q = params.q ?? ''
  const brand = params.brand ?? ''
  const page = Number(params.page ?? '1')
  const result = await getCarsCatalog({
    type: 'location',
    search: q,
    brand,
    page,
    pageSize: 6,
  })

  return (
    <CatalogBrowser
      cars={result.cars}
      brands={result.brands}
      total={result.total}
      page={result.page}
      totalPages={result.totalPages}
      pathname="/location"
      currentSearch={q}
      currentBrand={brand}
      heading="Catalogue location"
      description="Louer une voiture"
    />
  )
}
