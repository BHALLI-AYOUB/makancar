export type UserRole = 'admin' | 'client'
export type CarType = 'vente' | 'location'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'
export type SaleStatus = 'pending' | 'approved' | 'rejected'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  created_at: string
}

export interface Car {
  id: string
  title: string
  brand: string
  model: string
  price: number
  type: CarType
  image_url: string | null
  description: string | null
  available: boolean
  created_at: string
}

export interface Booking {
  id: string
  user_id: string
  car_id: string
  start_date: string
  end_date: string
  status: BookingStatus
  created_at: string
  cars?: Car | null
}

export interface Sale {
  id: string
  user_id: string
  car_id: string
  status: SaleStatus
  created_at: string
  cars?: Car | null
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at'>
        Update: Partial<Omit<Profile, 'created_at'>>
      }
      cars: {
        Row: Car
        Insert: Omit<Car, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Car, 'id' | 'created_at'>>
      }
      bookings: {
        Row: Booking
        Insert: Omit<Booking, 'id' | 'created_at' | 'cars'> & { id?: string; created_at?: string; cars?: Car | null }
        Update: Partial<Omit<Booking, 'id' | 'created_at' | 'cars'>>
      }
      sales: {
        Row: Sale
        Insert: Omit<Sale, 'id' | 'created_at' | 'cars'> & { id?: string; created_at?: string; cars?: Car | null }
        Update: Partial<Omit<Sale, 'id' | 'created_at' | 'cars'>>
      }
    }
  }
}
