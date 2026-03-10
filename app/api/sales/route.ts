import { NextResponse } from 'next/server'
import { createSale, getSalesForAdmin, updateSaleStatus } from '@/lib/data/bookings'
import { getCurrentProfile } from '@/lib/auth'

export async function GET() {
  const profile = await getCurrentProfile()

  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (profile.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const sales = await getSalesForAdmin()
  return NextResponse.json(sales)
}

export async function POST(request: Request) {
  const profile = await getCurrentProfile()

  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await request.json()
    const sale = await createSale(payload, profile.id)
    return NextResponse.json(sale)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const profile = await getCurrentProfile()

  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (profile.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { id, status } = await request.json()
    const sale = await updateSaleStatus(id, status)
    return NextResponse.json(sale)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
