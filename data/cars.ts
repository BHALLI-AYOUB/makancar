export interface Car {
  id: string
  model: string
  year: number
  package: string
  status: 'disponible' | 'sur-demande'
  images: string[]
  price?: string
}

export const cars: Car[] = [
  {
    id: '1',
    model: 'Mercedes GLC Coupe',
    year: 2026,
    package: 'Pack AMG Black Night',
    status: 'disponible',
    images: ['https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80'],
    price: '69 900 EUR',
  },
  {
    id: '2',
    model: 'Mercedes GLC Coupe',
    year: 2026,
    package: 'Pack AMG Black Night',
    status: 'disponible',
    images: ['https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80'],
    price: '69 900 EUR',
  },
  {
    id: '3',
    model: 'BMW X7 M60i',
    year: 2026,
    package: 'Prestige xDrive',
    status: 'disponible',
    images: ['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80'],
    price: '95 000 EUR',
  },
  {
    id: '4',
    model: 'Porsche 911 Carrera',
    year: 2026,
    package: 'Carrera S',
    status: 'sur-demande',
    images: ['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1400&q=80'],
    price: 'Sur devis',
  },
  {
    id: '5',
    model: 'Range Rover Velar',
    year: 2026,
    package: 'Dynamic SE',
    status: 'disponible',
    images: ['https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1400&q=80'],
    price: '84 000 EUR',
  },
  {
    id: '6',
    model: 'Audi Q8 e-tron',
    year: 2026,
    package: 'Premium Plus',
    status: 'disponible',
    images: ['https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=1400&q=80'],
    price: '79 000 EUR',
  },
]
