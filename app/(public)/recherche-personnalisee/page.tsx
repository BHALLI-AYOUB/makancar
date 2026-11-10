import { VehicleSearchRequest } from '@/components/platform/vehicle-search-request'
import { getServerLocale } from '@/lib/i18n/server'
import { pageMetadata } from '@/lib/seo'
export async function generateMetadata(){const locale=await getServerLocale();const title={fr:'Votre recherche personnalisée',en:'Your personalized vehicle search',ar:'البحث المخصص عن سيارتك'}[locale];return pageMetadata(locale,'/recherche-personnalisee',`${title} | Makan Luxury Motors`,title)}
export default function VehicleSearchPage(){return <main><VehicleSearchRequest/></main>}
