import type { BookingStatus, CarType, SaleStatus, UserRole } from '@/types/database'

export interface AuthFormValues {
  email: string
  password: string
  fullName?: string
}

export interface CarFormValues {
  title: string
  brand: string
  model: string
  price: number
  type: CarType
  image_url: string
  description: string
  available: boolean
}

export interface BookingFormValues {
  carId: string
  startDate: string
  endDate: string
  status?: BookingStatus
}

export interface SaleFormValues {
  carId: string
  status?: SaleStatus
}
