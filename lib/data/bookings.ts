import type { Booking, Sale } from '@/types/database'
import type { BookingFormValues, SaleFormValues } from '@/types/forms'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isMissingBookingsTableError, isMissingSalesTableError } from '@/lib/supabase/errors'

export async function createBooking(values: BookingFormValues, userId?: string) {
  const supabase = await createSupabaseServerClient()
  const authUser = await supabase.auth.getUser()
  const currentUserId = userId ?? authUser.data.user?.id

  if (!currentUserId) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      user_id: currentUserId,
      car_id: values.carId,
      start_date: values.startDate,
      end_date: values.endDate,
      status: values.status ?? 'pending',
    })
    .select('*')
    .single()

  if (error && !isMissingBookingsTableError(error)) {
    throw new Error(error.message)
  }

  if (!data) {
    return {
      id: '',
      user_id: currentUserId,
      car_id: values.carId,
      start_date: values.startDate,
      end_date: values.endDate,
      status: values.status ?? 'pending',
      created_at: new Date(0).toISOString(),
    }
  }

  return data
}

export async function getBookingsForUser(userId?: string): Promise<Booking[]> {
  const supabase = await createSupabaseServerClient()
  const authUser = await supabase.auth.getUser()
  const currentUserId = userId ?? authUser.data.user?.id

  if (!currentUserId) {
    return []
  }

  const { data, error } = await supabase
    .from('bookings')
    .select('*, cars(*)')
    .eq('user_id', currentUserId)
    .order('created_at', { ascending: false })

  if (error && !isMissingBookingsTableError(error)) {
    throw new Error(error.message)
  }

  return data ?? []
}

export async function getAllBookings(): Promise<Booking[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cars(*)')
    .order('created_at', { ascending: false })

  if (error && !isMissingBookingsTableError(error)) {
    throw new Error(error.message)
  }

  return data ?? []
}

export async function updateBookingStatus(id: string, status: Booking['status']) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('bookings').update({ status }).eq('id', id).select('*').single()

  if (error && !isMissingBookingsTableError(error)) {
    throw new Error(error.message)
  }

  if (!data) {
    return {
      id,
      user_id: '',
      car_id: '',
      start_date: '',
      end_date: '',
      status,
      created_at: new Date(0).toISOString(),
    }
  }

  return data
}

export async function createSale(values: SaleFormValues, userId?: string) {
  const supabase = await createSupabaseServerClient()
  const authUser = await supabase.auth.getUser()
  const currentUserId = userId ?? authUser.data.user?.id

  if (!currentUserId) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('sales')
    .insert({
      user_id: currentUserId,
      car_id: values.carId,
      status: values.status ?? 'pending',
    })
    .select('*')
    .single()

  if (error && !isMissingSalesTableError(error)) {
    throw new Error(error.message)
  }

  if (!data) {
    return {
      id: '',
      user_id: currentUserId,
      car_id: values.carId,
      status: values.status ?? 'pending',
      created_at: new Date(0).toISOString(),
    }
  }

  return data
}

export async function getSalesForAdmin(): Promise<Sale[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('sales')
    .select('*, cars(*)')
    .order('created_at', { ascending: false })

  if (error && !isMissingSalesTableError(error)) {
    throw new Error(error.message)
  }

  return data ?? []
}

export async function updateSaleStatus(id: string, status: Sale['status']) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('sales').update({ status }).eq('id', id).select('*').single()

  if (error && !isMissingSalesTableError(error)) {
    throw new Error(error.message)
  }

  if (!data) {
    return {
      id,
      user_id: '',
      car_id: '',
      status,
      created_at: new Date(0).toISOString(),
    }
  }

  return data
}
