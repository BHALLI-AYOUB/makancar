import { NextResponse } from 'next/server'
import { createBooking, getAllBookings, getBookingsForUser } from '@/lib/data/bookings'
import { getCurrentProfile } from '@/lib/auth'

export async function GET() {
  const profile = await getCurrentProfile()

  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = profile.role === 'admin' ? await getAllBookings() : await getBookingsForUser(profile.id)
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const profile = await getCurrentProfile()

  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await request.json()
    const booking = await createBooking(payload, profile.id)
    return NextResponse.json(booking)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
