import type { ShowroomCar } from '@/types/showroom'

const WHATSAPP = '06 41 38 98 98'

export const showroomCars: ShowroomCar[] = [
  {
    id: 'skoda-karoq-sportline-2020',
    name: 'Skoda Karoq Sportline 2020',
    subtitle: 'Serie Sport - Pack Black Night',
    price: '273.000 DH',
    whatsapp: WHATSAPP,
    gallery: ['/skoda1.png', '/skoda2.png', '/skoda3.png', '/skoda4.png', '/skoda5.png'],
    badges: ['Disponible', 'Vehicule tres propre', 'Aucun frais a prevoir'],
    summary: [
      { label: 'Annee', value: '2020' },
      { label: 'Transmission', value: 'Boite manuelle 6 rapports' },
      { label: 'Kilometrage', value: '185 000 km d origine' },
      { label: 'Historique', value: "Entretien complet chez Skoda" },
      { label: 'Dedouanement', value: '26/11/2025' },
      { label: 'Localisation', value: 'Berkane' },
      { label: 'Immatriculation', value: 'Oujda 48' },
    ],
    featureGroups: [
      {
        title: 'Confort',
        items: ['Toit panoramique', 'Sieges pilote', 'Sieges chauffants', 'Demarrage sans cle', 'Chargeur sans fil', '2x USB'],
      },
      {
        title: 'Aides a la conduite',
        items: ['Distronic', 'Regulateur de vitesse', 'Limitateur', 'Lane Assist', 'Detection signalisation'],
      },
      {
        title: 'Stationnement',
        items: ['Camera de recul', 'Radar de stationnement'],
      },
      {
        title: 'Exterieur et pratique',
        items: ['Jantes aluminium 19 pouces', 'Retroviseurs rabattables', 'Antibrouillards', 'Coffre electrique', 'Attache remorque electrique'],
      },
    ],
    sellingPoints: [
      'Vehicule tres propre',
      'Aucun frais a prevoir',
      'Visite uniquement sur rendez-vous',
      'Prix legerement negociable devant le vehicule',
    ],
  },
  {
    id: 'seat-ateca-tdi-dsg-7',
    name: 'Seat Ateca 2.0 TDI 150 ch - DSG 7',
    price: '269.000 DH',
    whatsapp: WHATSAPP,
    gallery: ['/ateca1.png', '/ateca2.png', '/ateca3.png', '/ateca4.png', '/ateca5.png', '/ateca6.png', '/ateca7.png', '/ateca8.png'],
    badges: ['Kilometrage certifie', 'Vehicule en parfait etat', 'Tres bien equipee'],
    summary: [
      { label: 'Modele', value: '10/2020 (Facelift modele 2021)' },
      { label: 'Dedouanement', value: '11/2025' },
      { label: 'Kilometrage', value: '139.000 km d origine' },
      { label: 'Moteur', value: 'Diesel 2.0 (150 CV)' },
      { label: 'Transmission', value: 'Boite automatique DSG 7 rapports' },
      { label: 'Interieur', value: 'Cuir & alcantara' },
    ],
    featureGroups: [
      {
        title: 'Equipements',
        items: ['Camera', 'Aides au stationnement', 'Tres bien equipee'],
      },
    ],
    sellingPoints: ['Kilometrage certifie', 'Vehicule en parfait etat'],
  },
  {
    id: 'volkswagen-tiguan-confortline',
    name: 'Volkswagen Tiguan',
    subtitle: 'Diwana 2026 - Version Confortline',
    price: '285.000 DH',
    whatsapp: WHATSAPP,
    gallery: ['/tiguan1.png', '/tiguan2.png', '/tiguan3.png', '/tiguan4.png', '/tiguan5.png', '/tiguan6.png', '/tiguan7.png', '/tiguan8.png'],
    badges: ['Disponible', 'Vehicule en parfait etat', 'SUV fiable'],
    summary: [
      { label: 'Date immatriculation', value: '08/2020' },
      { label: 'Dedouanement', value: '2026' },
      { label: 'Kilometrage', value: '148.000 km' },
      { label: 'Immatriculation', value: 'Temara Alif 4' },
    ],
    featureGroups: [
      {
        title: 'Equipements',
        items: [
          'Toit panoramique',
          'Interieur Confortline',
          'Frein de stationnement',
          'Sieges confort',
          'Sieges chauffants',
          'Regulateur de vitesse + Distronic',
          'Lane Assist',
          'Freinage d urgence',
          'Jantes aluminium',
          'Retroviseurs electriques',
          'Antibrouillards',
          'Coffre electrique',
        ],
      },
    ],
    sellingPoints: [
      'Vehicule en parfait etat',
      'Soigneusement entretenu',
      'SUV puissant, confortable et fiable',
      'Ideal ville & longue distance',
    ],
  },
  {
    id: 'volkswagen-tiguan-2-0-tdi-haut-de-gamme',
    name: 'Volkswagen Tiguan 2.0 TDI',
    subtitle: 'Version Haut de Gamme',
    price: '289.000 DH',
    whatsapp: WHATSAPP,
    gallery: ['/tiguangris1.png', '/tiguangris2.png', '/tiguangris3.png', '/tiguangris4.png', '/tiguangris5.png', '/tiguangris6.png', '/tiguangris7.png'],
    badges: ['Disponible immediatement', 'Vehicule en parfait etat', 'Opportunite a saisir'],
    summary: [
      { label: 'Date immatriculation', value: '04/2019' },
      { label: 'Dedouanement', value: '2026' },
      { label: 'Kilometrage', value: '117.000 km' },
      { label: 'Moteur', value: '2.0 TDI' },
    ],
    featureGroups: [
      {
        title: 'Equipements',
        items: [
          'Toit panoramique',
          'Interieur cuir',
          'Stationnement automatique',
          'Sieges electriques',
          'Sieges chauffants',
          'Regulateur de vitesse + Distronic',
          'Lane Assist',
          'Freinage d urgence',
          'Jantes aluminium',
          'Retroviseurs electriques',
          'Antibrouillards',
          'Coffre electrique',
        ],
      },
    ],
    sellingPoints: [
      'Vehicule en parfait etat',
      'Soigneusement entretenu',
      'SUV puissant, confortable et fiable',
      'Ideal ville & longue distance',
      'Vehicule disponible immediatement',
      'Opportunite a saisir',
    ],
  },
  {
    id: 'mercedes-cla-amg',
    name: 'Mercedes CLA',
    subtitle: 'AMG / Luxury Performance Style',
    whatsapp: WHATSAPP,
    gallery: ['/CLA1.png', '/CLA2.png', '/CLA3.png', '/CLA4.png', '/CLA5.png', '/CLA6.png', '/CLA7.png', '/CLA8.png', '/CLA9.png'],
    badges: ['Disponible prochainement', 'Plus d informations sur demande'],
    summary: [
      { label: 'Statut', value: 'Disponible prochainement' },
      { label: 'Informations', value: 'Plus d informations sur demande' },
    ],
    featureGroups: [],
    sellingPoints: ['Design AMG premium', 'Presentation showroom', 'Informations complementaires sur demande'],
    availabilityLabel: 'Disponible prochainement',
  },
]

export function getShowroomCars() {
  return showroomCars
}

export function getFeaturedShowroomCars() {
  return {
    hero: showroomCars[4],
    secondary: showroomCars.slice(0, 4),
  }
}

export function getShowroomCarById(id: string) {
  return showroomCars.find((car) => car.id === id) ?? null
}

export function getWhatsAppHref(number: string, carName: string) {
  const clean = '212641389898'
  const text = encodeURIComponent(`Bonjour, je souhaite plus d informations concernant ${carName}.`)
  return `https://wa.me/${clean}?text=${text}`
}
