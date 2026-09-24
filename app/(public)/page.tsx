import { ShowroomHero } from '@/components/platform/showroom-hero'
import { HomeCollection } from '@/components/platform/home-collection'
import { HomeExperience } from '@/components/platform/home-experience'
import { HomeReviews } from '@/components/platform/home-reviews'
import { ContactSection } from '@/components/ContactSection'
import { getShowroomCars } from '@/lib/data/showroom-stock'

export default function HomePage() {
  const cars = getShowroomCars()
  const isSold = (car: (typeof cars)[number]) => car.badges.some(badge => badge.toLowerCase().includes('vendu'))
  const available = cars.filter(car => !isSold(car))
  const sold = cars.filter(isSold)
  const heroCars = [available[0], available.find(car => car.id === 'volkswagen-tiguan-r-line-exclusive-2022'), available.find(car => car.brand === 'Mercedes-Benz')].filter((car): car is (typeof cars)[number] => Boolean(car?.gallery.length))

  return (
    <main className="makan-home">
      <ShowroomHero cars={heroCars} />
      <HomeCollection cars={available} />
      <HomeExperience soldCars={sold} />
      <HomeReviews />
      <div className="home-contact"><ContactSection /></div>
    </main>
  )
}
