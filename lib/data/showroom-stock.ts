import type { ShowroomCar } from '@/types/showroom'

const WHATSAPP = '06 41 38 98 98'

export const showroomCars: ShowroomCar[] = [
  {
    id: 'skoda-karoq-sportline-2020',
    name: 'Skoda Karoq Sportline 2020',
    brand: 'Skoda',
    model: 'Karoq',
    version: 'Sportline 2020',
    subtitle: 'Série Sport - Pack Black Night',
    price: '273.000 DH',
    whatsapp: WHATSAPP,
    gallery: ['/skoda1.png', '/skoda2.png', '/skoda3.png', '/skoda4.png', '/skoda5.png'],
    badges: ['Disponible', 'Véhicule très propre', 'Aucun frais à prévoir'],
    summary: [
      { label: 'Année', value: '2020' },
      { label: 'Transmission', value: 'Boîte manuelle 6 rapports' },
      { label: 'Kilométrage', value: "185 000 km d'origine" },
      { label: 'Historique', value: "Historique d’entretien complet chez Skoda" },
      { label: 'Dédouanement', value: '26/11/2025' },
      { label: 'Localisation', value: 'Berkane' },
      { label: 'Immatriculation', value: 'Oujda 48' },
    ],
    featureGroups: [
      {
        title: 'Confort',
        items: ['Toit panoramique', 'Sièges pilote', 'Sièges chauffants', 'Démarrage sans clé', 'Chargeur sans fil', '2x USB'],
      },
      {
        title: 'Aides à la conduite',
        items: ['Distronic', 'Régulateur de vitesse', 'Limitateur', 'Lane Assist', 'Détection signalisation'],
      },
      {
        title: 'Stationnement',
        items: ['Caméra de recul', 'Radar de stationnement'],
      },
      {
        title: 'Extérieur et pratique',
        items: ['Jantes aluminium 19 pouces', 'Rétroviseurs rabattables', 'Antibrouillards', 'Coffre électrique', 'Attache remorque électrique'],
      },
    ],
    sellingPoints: [
      'Véhicule très propre',
      'Aucun frais à prévoir',
      'Visite uniquement sur rendez-vous',
      'Prix légèrement négociable devant le véhicule',
    ],
  },
  {
    id: 'seat-ateca-tdi-dsg-7',
    name: 'Seat Ateca 2.0 TDI 150 ch - DSG 7',
    brand: 'Seat',
    model: 'Ateca',
    version: '2.0 TDI 150 ch - DSG 7',
    price: '269.000 DH',
    whatsapp: WHATSAPP,
    gallery: ['/ateca1.png', '/ateca2.png', '/ateca3.png', '/ateca4.png', '/ateca5.png', '/ateca6.png', '/ateca7.png', '/ateca8.png'],
    badges: ['Kilométrage certifié', 'Véhicule en parfait état', 'Très bien équipée'],
    summary: [
      { label: 'Modèle', value: '10/2020 (Facelift modèle 2021)' },
      { label: 'Dédouanement', value: '11/2025' },
      { label: 'Kilométrage', value: "139.000 km d'origine" },
      { label: 'Moteur', value: 'Diesel 2.0 (150 CV)' },
      { label: 'Transmission', value: 'Boîte automatique DSG 7 rapports' },
      { label: 'Intérieur', value: 'Cuir & alcantara' },
    ],
    featureGroups: [
      {
        title: 'Équipements',
        items: ['Caméra', 'Aides au stationnement', 'Très bien équipée'],
      },
    ],
    sellingPoints: ['Kilométrage certifié', 'Véhicule en parfait état'],
  },
  {
    id: 'volkswagen-tiguan-confortline',
    name: 'Volkswagen Tiguan',
    brand: 'Volkswagen',
    model: 'Tiguan',
    version: 'Version Confortline',
    subtitle: 'Diwana 2026 - Version Confortline',
    price: '285.000 DH',
    whatsapp: WHATSAPP,
    gallery: ['/tiguan1.png', '/tiguan2.png', '/tiguan3.png', '/tiguan4.png', '/tiguan5.png', '/tiguan6.png', '/tiguan7.png', '/tiguan8.png'],
    badges: ['Disponible', 'Véhicule en parfait état', 'SUV fiable'],
    summary: [
      { label: "Date d'immatriculation", value: '08/2020' },
      { label: 'Dédouanement', value: '2026' },
      { label: 'Kilométrage', value: '148.000 km' },
      { label: 'Immatriculation', value: 'Temara Alif 4' },
    ],
    featureGroups: [
      {
        title: 'Équipements',
        items: [
          'Toit panoramique',
          'Intérieur Confortline',
          'Frein de stationnement',
          'Sièges confort',
          'Sièges chauffants',
          'Régulateur de vitesse + Distronic',
          'Lane Assist',
          "Freinage d'urgence",
          'Jantes aluminium',
          'Rétroviseurs électriques',
          'Antibrouillards',
          'Coffre électrique',
        ],
      },
    ],
    sellingPoints: [
      'Véhicule en parfait état',
      'Soigneusement entretenu',
      'SUV puissant, confortable et fiable',
      'Idéal ville & longue distance',
    ],
  },
  {
    id: 'volkswagen-tiguan-2-0-tdi-haut-de-gamme',
    name: 'Volkswagen Tiguan 2.0 TDI',
    brand: 'Volkswagen',
    model: 'Tiguan',
    version: 'Version Haut de Gamme',
    subtitle: 'Version Haut de Gamme',
    price: '289.000 DH',
    whatsapp: WHATSAPP,
    gallery: ['/tiguangris1.png', '/tiguangris2.png', '/tiguangris3.png', '/tiguangris4.png', '/tiguangris5.png', '/tiguangris6.png', '/tiguangris7.png'],
    badges: ['Disponible immédiatement', 'Véhicule en parfait état', 'Opportunité à saisir'],
    summary: [
      { label: "Date d'immatriculation", value: '04/2019' },
      { label: 'Dédouanement', value: '2026' },
      { label: 'Kilométrage', value: '117.000 km' },
      { label: 'Moteur', value: '2.0 TDI' },
    ],
    featureGroups: [
      {
        title: 'Équipements',
        items: [
          'Toit panoramique',
          'Intérieur cuir',
          'Stationnement automatique',
          'Sièges électriques',
          'Sièges chauffants',
          'Régulateur de vitesse + Distronic',
          'Lane Assist',
          "Freinage d'urgence",
          'Jantes aluminium',
          'Rétroviseurs électriques',
          'Antibrouillards',
          'Coffre électrique',
        ],
      },
    ],
    sellingPoints: [
      'Véhicule en parfait état',
      'Soigneusement entretenu',
      'SUV puissant, confortable et fiable',
      'Idéal ville & longue distance',
      'Véhicule disponible immédiatement',
      'Opportunité à saisir',
    ],
  },
  {
    id: 'mercedes-classe-a200-pack-amg-full-options',
    name: 'Mercedes Classe A200 Pack AMG - Full Options',
    heroTitle: 'Mercedes Classe A200 Pack AMG',
    brand: 'Mercedes-Benz',
    model: 'Classe A200',
    version: 'Pack AMG / Full Options',
    subtitle: 'Pack AMG / Full Options',
    price: 'Prix sur demande',
    whatsapp: WHATSAPP,
    gallery: ['/CLA1.png', '/CLA2.png', '/CLA3.png', '/CLA4.png', '/CLA5.png', '/CLA6.png', '/CLA7.png', '/CLA8.png', '/CLA9.png'],
    badges: ['Disponible très bientôt', 'Full Options', 'Pack AMG'],
    summary: [
      { label: 'Marque', value: 'Mercedes-Benz' },
      { label: 'Modèle', value: 'Classe A200' },
      { label: 'Version', value: 'Pack AMG / Full Options' },
      { label: 'Date modèle', value: '27/02/2020' },
      { label: 'Diwana', value: '04/2026' },
      { label: 'Kilométrage', value: "166 000 km d'origine" },
      { label: 'Historique', value: "Carnet d'entretien à jour" },
      { label: 'Disponibilité', value: 'Disponible très bientôt' },
      { label: 'Localisation', value: 'Oujda / Berkane' },
      { label: 'Visite', value: 'Sur rendez-vous' },
    ],
    featureGroups: [
      {
        title: 'Extérieur',
        items: [
          'Pack AMG Line avec boucliers sportifs, jantes AMG et look plus agressif',
          'Jantes alliage AMG noires multi-branches',
          'Toit ouvrant panoramique en verre',
          'Vitres arrière surteintées',
          'Projecteurs LED',
          'Calandre diamant Mercedes avec étoile centrale',
          'Capteurs de stationnement intégrés au pare-chocs',
          "Double sortie d'échappement intégrée",
          'Barres de toit noires',
          'Couleur carrosserie gris métallisé',
        ],
      },
      {
        title: 'Intérieur et technologie',
        items: [
          'Double écran digital Mercedes MBUX pour instrumentation et multimédia',
          "Navigation GPS intégrée sur l'écran central",
          'Sono Burmester',
          'Démarrage sans clé',
          'Apple CarPlay / Android Auto',
          'Rétroviseurs rabattables électriquement',
          "Éclairage d'ambiance",
          'Pack conduite semi-autonome avec Distronic et maintien dans la voie',
          'Système MBUX avec commande vocale Hey Mercedes',
          'Commandes tactiles au volant',
          'Touchpad central de commande',
          "Éclairage d'ambiance LED multicolore 64 couleurs",
          "Buses d'aération type turbine",
          'Climatisation automatique bi-zone Thermotronic',
          'Sellerie sport mixte cuir / microfibre avec surpiqûres rouges',
          'Volant sport multifonctions',
          'Pédalier sport aluminium',
        ],
      },
      {
        title: 'Confort et habitacle',
        items: [
          'Sièges sport',
          'Accoudoir central',
          'Banquette arrière rabattable',
          "Éclairage intérieur d'ambiance sur tableau de bord et portes",
        ],
      },
    ],
    sellingPoints: [
      'Disponible très bientôt à Oujda et Berkane sur rendez-vous',
      "Carnet d'entretien à jour",
      'Sélection rigoureuse et présentation premium',
      "Plus d'informations sur demande via WhatsApp",
    ],
    availabilityLabel: 'Disponible très bientôt',
    description:
      'Chez Makan Luxury Motors, chaque véhicule est sélectionné avec rigueur afin de garantir qualité, transparence et excellence.',
    presentation: [
      'Makan Luxury Motors est spécialisé dans la sélection et la commercialisation de véhicules de prestige. Notre approche repose sur des valeurs simples : exigence, transparence et discrétion.',
      'Nous proposons à notre clientèle une sélection rigoureuse de véhicules haut de gamme disponibles immédiatement, ainsi qu’un service d’importation sur mesure permettant de trouver la configuration idéale selon des critères précis.',
      "Grâce à un réseau de partenaires professionnels à travers l'Europe, nous sommes en mesure d'accéder à des véhicules soigneusement sélectionnés et parfaitement suivis.",
      'Chaque automobile proposée par Makan Luxury Motors fait l’objet d’une vérification attentive afin de garantir qualité, fiabilité et conformité.',
    ],
    availabilityNote: 'Disponible très bientôt à Oujda et Berkane sur rendez-vous.',
    heroSubtitle: 'Luxury \u2022 Performance \u2022 Excellence',
    heroDescription:
      'Stock réel, présentation haut de gamme et accompagnement personnalisé pour chaque véhicule sélectionné par Makan Luxury Motors.',
  },
]

export function getShowroomCars() {
  return showroomCars
}

export function getFeaturedShowroomCars() {
  const hero = showroomCars.find((car) => car.id === 'mercedes-classe-a200-pack-amg-full-options') ?? showroomCars[0]
  const secondary = showroomCars.filter((car) => car.id !== hero.id)

  return {
    hero,
    secondary,
  }
}

export function getShowroomCarById(id: string) {
  return showroomCars.find((car) => car.id === id) ?? null
}

export function getWhatsAppHref(number: string, carName: string) {
  const clean = '212641389898'
  const text = encodeURIComponent(`Bonjour, je souhaite plus d'informations concernant ${carName}.`)
  return `https://wa.me/${clean}?text=${text}`
}

