import { ShowroomHero } from '@/components/platform/showroom-hero'
import { HomeCollection } from '@/components/platform/home-collection'
import { HomeExperience } from '@/components/platform/home-experience'
import { HomeReviews } from '@/components/platform/home-reviews'
import { ContactSection } from '@/components/ContactSection'
import { getShowroomCars, getFeaturedShowroomCars } from '@/lib/data/showroom-stock'
import { getServerLocale } from '@/lib/i18n/server'
export default async function HomePage() {
  const locale = await getServerLocale(), cars = getShowroomCars(locale)
  const { featured, hero } = getFeaturedShowroomCars(locale)
  return <main className="makan-home"><ShowroomHero cars={featured.length ? featured : hero ? [hero] : []} />
    <HomeCollection cars={cars.filter(c => !['sold','unavailable'].includes(c.status!))} />
    <HomeExperience soldCars={cars.filter(c => c.status === 'sold')} />
    <HomeReviews /><div className="home-contact"><ContactSection /></div>
  </main>
}
