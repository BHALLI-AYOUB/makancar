import type { ShowroomCar } from '@/types/showroom'

const WHATSAPP = '06 41 38 98 98'

export const showroomCars: ShowroomCar[] = [
  {
    id: 'skoda-karoq-sportline-2020',
    name: 'Skoda Karoq Sportline 2020',
    brand: 'Skoda',
    model: 'Karoq',
    version: 'Sportline 2020',
    subtitle: 'Serie Sport - Pack Black Night',
    price: '273.000 DH',
    whatsapp: WHATSAPP,
    gallery: ['/skoda1.png', '/skoda2.png', '/skoda3.png', '/skoda4.png', '/skoda5.png'],
    badges: ['Vendu', 'Vendu a un client', 'Vehicule tres propre'],
    summary: [
      { label: 'Annee', value: '2020' },
      { label: 'Transmission', value: 'Boite manuelle 6 rapports' },
      { label: 'Kilometrage', value: "185 000 km d'origine" },
      { label: 'Historique', value: "Historique d'entretien complet chez Skoda" },
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
    sellingPoints: ['Vehicule tres propre', 'Aucun frais a prevoir', 'Visite uniquement sur rendez-vous', 'Vendu a un client'],
    availabilityLabel: 'Vendu a un client',
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
    badges: ['Vendu', 'Vendu a un client', 'Vehicule en parfait etat'],
    summary: [
      { label: 'Modele', value: '10/2020 (Facelift modele 2021)' },
      { label: 'Dedouanement', value: '11/2025' },
      { label: 'Kilometrage', value: "139.000 km d'origine" },
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
    sellingPoints: ['Kilometrage certifie', 'Vehicule en parfait etat', 'Vendu a un client'],
    availabilityLabel: 'Vendu a un client',
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
    badges: ['Disponible', 'Vehicule en parfait etat', 'SUV fiable'],
    summary: [
      { label: "Date d'immatriculation", value: '08/2020' },
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
          "Freinage d'urgence",
          'Jantes aluminium',
          'Retroviseurs electriques',
          'Antibrouillards',
          'Coffre electrique',
        ],
      },
    ],
    sellingPoints: ['Vehicule en parfait etat', 'Soigneusement entretenu', 'SUV puissant, confortable et fiable', 'Ideal ville & longue distance'],
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
    badges: ['Disponible immediatement', 'Vehicule en parfait etat', 'Opportunite a saisir'],
    summary: [
      { label: "Date d'immatriculation", value: '04/2019' },
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
          "Freinage d'urgence",
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
    id: 'volkswagen-t-roc-modele-2020',
    name: 'Volkswagen T-Roc modele 2020',
    brand: 'Volkswagen',
    model: 'T-Roc',
    version: 'Modele 2020',
    subtitle: 'Diwana 11/2025',
    price: 'Prix sur demande',
    whatsapp: WHATSAPP,
    gallery: ['/trog1.png', '/trog2.png', '/trog3.png'],
    badges: ['Disponible', 'Modele 2020', 'Diwana 11/2025'],
    summary: [
      { label: 'Modele', value: '2020' },
      { label: 'Dedouanement', value: '11/2025' },
      { label: 'Marque', value: 'Volkswagen T-Roc' },
    ],
    featureGroups: [
      {
        title: 'Presentation',
        items: ['3 photos disponibles', 'Showroom premium', 'Vehicule disponible sur demande'],
      },
    ],
    sellingPoints: ['Modele 2020', 'Diwana 11/2025', 'Galerie photo disponible'],
    availabilityLabel: 'Disponible',
    availabilityNote: 'Disponible sur demande.',
  },
  {
    id: 'mercedes-classe-a200-pack-amg-full-options',
    name: 'Mercedes Classe A200 Pack AMG - Full Options',
    heroTitle: 'Mercedes Classe A200 Pack AMG',
    brand: 'Mercedes-Benz',
    model: 'Classe A200',
    version: 'Pack AMG / Full Options',
    subtitle: 'Pack AMG / Full Options',
    price: '375.000 DH',
    whatsapp: WHATSAPP,
    gallery: ['/CLA1.png', '/CLA2.png', '/CLA3.png', '/CLA4.png', '/CLA5.png', '/CLA6.png', '/CLA7.png', '/CLA8.png', '/CLA9.png'],
    badges: ['Disponible tres bientot', 'Full Options', 'Pack AMG'],
    summary: [
      { label: 'Marque', value: 'Mercedes-Benz' },
      { label: 'Modele', value: 'Classe A200' },
      { label: 'Version', value: 'Pack AMG / Full Options' },
      { label: 'Date modele', value: '27/02/2020' },
      { label: 'Diwana', value: '04/2026' },
      { label: 'Kilometrage', value: "166 000 km d'origine" },
      { label: 'Historique', value: "Carnet d'entretien a jour" },
      { label: 'Disponibilite', value: 'Disponible tres bientot' },
      { label: 'Localisation', value: 'Oujda / Berkane' },
      { label: 'Visite', value: 'Sur rendez-vous' },
    ],
    featureGroups: [
      {
        title: 'Exterieur',
        items: [
          'Pack AMG Line avec boucliers sportifs, jantes AMG et look plus agressif',
          'Jantes alliage AMG noires multi-branches',
          'Toit ouvrant panoramique en verre',
          'Vitres arriere surteintees',
          'Projecteurs LED',
          'Calandre diamant Mercedes avec etoile centrale',
          'Capteurs de stationnement integres au pare-chocs',
          "Double sortie d'echappement integree",
          'Barres de toit noires',
          'Couleur carrosserie gris metallise',
        ],
      },
      {
        title: 'Interieur et technologie',
        items: [
          'Double ecran digital Mercedes MBUX pour instrumentation et multimedia',
          "Navigation GPS integree sur l'ecran central",
          'Sono Burmester',
          'Demarrage sans cle',
          'Apple CarPlay / Android Auto',
          'Retroviseurs rabattables electriquement',
          "Eclairage d'ambiance",
          'Pack conduite semi-autonome avec Distronic et maintien dans la voie',
          'Systeme MBUX avec commande vocale Hey Mercedes',
          'Commandes tactiles au volant',
          'Touchpad central de commande',
          "Eclairage d'ambiance LED multicolore 64 couleurs",
          "Buses d'aeration type turbine",
          'Climatisation automatique bi-zone Thermotronic',
          'Sellerie sport mixte cuir / microfibre avec surpiqures rouges',
          'Volant sport multifonctions',
          'Pedalier sport aluminium',
        ],
      },
      {
        title: 'Confort et habitacle',
        items: ['Sieges sport', 'Accoudoir central', 'Banquette arriere rabattable', "Eclairage interieur d'ambiance sur tableau de bord et portes"],
      },
    ],
    sellingPoints: [
      'Disponible tres bientot a Oujda et Berkane sur rendez-vous',
      "Carnet d'entretien a jour",
      'Selection rigoureuse et presentation premium',
      "Plus d'informations sur demande via WhatsApp",
    ],
    availabilityLabel: 'Disponible tres bientot',
    description: 'Chez Makan Luxury Motors, chaque vehicule est selectionne avec rigueur afin de garantir qualite, transparence et excellence.',
    presentation: [
      "Makan Luxury Motors est specialise dans la selection et la commercialisation de vehicules de prestige. Notre approche repose sur des valeurs simples : exigence, transparence et discretion.",
      "Nous proposons a notre clientele une selection rigoureuse de vehicules haut de gamme disponibles immediatement, ainsi qu'un service d'importation sur mesure permettant de trouver la configuration ideale selon des criteres precis.",
      "Grace a un reseau de partenaires professionnels a travers l'Europe, nous sommes en mesure d'acceder a des vehicules soigneusement selectionnes et parfaitement suivis.",
      "Chaque automobile proposee par Makan Luxury Motors fait l'objet d'une verification attentive afin de garantir qualite, fiabilite et conformite.",
    ],
    availabilityNote: 'Disponible tres bientot a Oujda et Berkane sur rendez-vous.',
    heroSubtitle: 'Luxury • Performance • Excellence',
    heroDescription: 'Stock reel, presentation haut de gamme et accompagnement personnalise pour chaque vehicule selectionne par Makan Luxury Motors.',
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
