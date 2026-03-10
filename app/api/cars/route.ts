import { NextResponse } from 'next/server'
import { addCar, getCars } from '@/lib/data/cars'
import { getCurrentProfile } from '@/lib/auth'

export async function GET() {
  try {
    const cars = await getCars()
    return NextResponse.json(cars)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const profile = await getCurrentProfile()

  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (profile.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const payload = await request.json()
    const car = await addCar(payload)
    return NextResponse.json(car)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
