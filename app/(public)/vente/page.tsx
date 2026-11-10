import { CatalogueBrowser } from '@/components/platform/catalogue-browser'
import { getShowroomCars } from '@/lib/data/showroom-stock'
import { getServerLocale } from '@/lib/i18n/server'
import { pageMetadata } from '@/lib/seo'
export async function generateMetadata() {
  const locale = await getServerLocale()
  const titles = { fr:'La collection | Makan Luxury Motors', en:'The collection | Makan Luxury Motors', ar:'مجموعة السيارات | مكان لاكجري موتورز' }
  return pageMetadata(locale, '/vente', titles[locale], {fr:'Découvrez notre stock de véhicules sélectionnés à Oujda. Photos, prix en MAD et informations détaillées.',en:'Explore our selected vehicles in Oujda. Complete galleries, prices in MAD and clear vehicle details.',ar:'اكتشف سياراتنا المختارة في وجدة، مع الصور والأسعار بالدرهم والمعلومات المفصلة.'}[locale])
}
export default async function VentePage() { return <CatalogueBrowser cars={getShowroomCars(await getServerLocale())} /> }
