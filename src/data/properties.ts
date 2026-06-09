/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, Agent } from '../types';

const agentJean: Agent = {
  name: "Jean-Marc Aubry",
  role: "Directeur des Ventes",
  phone: "+33 6 12 34 56 78",
  email: "jm.aubry@agence-prestige.fr",
  avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300"
};

const agentSophie: Agent = {
  name: "Sophie Laurent",
  role: "Spécialiste Biens d'Exception",
  phone: "+33 6 98 76 54 32",
  email: "s.laurent@agence-prestige.fr",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
};

const agentThomas: Agent = {
  name: "Thomas Dubois",
  role: "Expert Immobilier Commercial & Terrains",
  phone: "+33 6 54 32 10 98",
  email: "t.dubois@agence-prestige.fr",
  avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
};

export const PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "Villa d'Exception Vue Mer",
    description: "Nichée sur les hauteurs de Nice, cette villa contemporaine offre des prestations de prestige inégalées. Avec sa piscine à débordement chauffée qui s'étend vers l'azur et son séjour baigné de lumière grâce à d'immenses baies vitrées, vous bénéficierez d'un cadre de vie serein et exclusif. Toutes les prestations ont été érigées avec des matériaux précieux et rares (marbre de Carrare, parquet en chêne massif noir, système domotique intégral de dernière génération).",
    price: 3450000,
    type: "Villa",
    city: "Nice",
    address: "24 Boulevard Franck Pilatte, 06300 Nice",
    surface: 320,
    bedrooms: 5,
    bathrooms: 4,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"
    ],
    features: ["Piscine à débordement", "Système Domotique", "Cave à vin", "Garage 4 voitures", "Climatisation gainable", "Caméras de surveillance", "Accès privé à la mer"],
    agent: agentSophie,
    featured: true,
    yearBuilt: 2022,
    energyClass: "A"
  },
  {
    id: "prop-2",
    title: "Penthouse Prestige sous les Toits",
    description: "Somptueux duplex situé au dernier étage d'un immeuble Haussmannien classé. Cet appartement unique dispose d'une verrière panoramique offrant une vue contemplative imprenable sur la Tour Eiffel et les toits de Paris. Rénové avec art par un designer de renom, le bien allie le charme intemporel de l'ancien (cheminées d'époque, moulures, parquet Point de Hongrie) et l'excellence du confort moderne.",
    price: 2890000,
    type: "Appartement",
    city: "Paris",
    address: "14 Avenue de la Bourdonnais, 75007 Paris",
    surface: 145,
    bedrooms: 3,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200"
    ],
    features: ["Vue Tour Eiffel", "Terrasse privative", "Ascenseur direct", "Moulures Haussmanniennes", "Climatisation intégrée", "Cheminées fonctionnelles", "Service de conciergerie 24/7"],
    agent: agentJean,
    featured: true,
    yearBuilt: 1890,
    energyClass: "C"
  },
  {
    id: "prop-3",
    title: "Maison d'Architecte Contemporaine",
    description: "À quelques minutes du centre de Bordeaux, découvrez cette maison d'architecte ultra-lumineuse et entourée d'un jardin intimiste arboré. Sa conception cubique audacieuse intègre des patios végétalisés intérieurs et un superbe espace de vie ouvert de plus de 90 m². Économe en énergie et respectueuse de l'environnement, elle s'inscrit au sommet des standards de l'architecture bio-climatique actuelle.",
    price: 1250000,
    type: "Maison",
    city: "Bordeaux",
    address: "88 Rue de l'École Normale, 33200 Bordeaux",
    surface: 210,
    bedrooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
    ],
    features: ["Isolation Haute Performance", "Pompe à chaleur", "Jardin paysager", "Patios intérieurs", "Grand Dressing", "Cuisine équipée italienne", "Garage double étanche"],
    agent: agentJean,
    featured: true,
    yearBuilt: 2023,
    energyClass: "A"
  },
  {
    id: "prop-4",
    title: "Suites de Bureaux Prestige - Centre d'Affaires",
    description: "Emplacement commercial exceptionnel au cœur de Lyon (Presqu'île). Ce plateau de bureaux haut de gamme, situé dans un immeuble de standing avec contrôle d'accès intelligent, comprend un grand espace de coworking, 5 salles de réunion privatives, des cabines d'isolement acoustique et un espace détente convivial avec cuisine équipée. Un investissement rare pour des bureaux d'entreprise représentatifs.",
    price: 1850000,
    type: "Bureau",
    city: "Lyon",
    address: "42 Rue de la République, 69002 Lyon",
    surface: 350,
    bedrooms: 0,
    bathrooms: 0,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200"
    ],
    features: ["Climatisation réversible", "Double vitrage phonique", "Fibre optique haut débit", "Contrôle d'accès par carte", "Salles de conférence", "Espace tisanerie chic", "Parking sous-sol réservé"],
    agent: agentThomas,
    featured: false,
    yearBuilt: 2018,
    energyClass: "B"
  },
  {
    id: "prop-5",
    title: "Terrain Constructible avec Permis Valide",
    description: "Opportunité unique à saisir sur l'un des collines les plus demandées à Nice. Ce magnifique terrain constructible plat de 1 500 m² surplombe la péninsule et la mer. Il dispose d'un permis de construire purgé de tout recours pour une villa moderne de 250 m² avec piscine. Viabilisation totale (eau, électricité, tout-à-l'égout, fibre) déjà réalisée en limite de propriété.",
    price: 950000,
    type: "Terrain",
    city: "Nice",
    address: "Chemin de la Costière, 06000 Nice",
    surface: 1500,
    bedrooms: 0,
    bathrooms: 0,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200"
    ],
    features: ["Vue mer imprenable", "Terrain viabilisé", "Permis accepté et purgé", "Accès routier facilité", "Zone calme et résidentielle", "Étude de sol G2 disponible"],
    agent: agentThomas,
    featured: false,
    energyClass: undefined
  },
  {
    id: "prop-6",
    title: "Appartement d'Artiste Loft Lumineux",
    description: "Proche de la Place des Vosges, ce superbe loft d'artiste d'une hauteur sous plafond spectaculaire de 4,5 mètres ravira les passionnés d'authenticité et de design contemporain. Éclairé par d'authentiques verrières industrielles d'époque orientées plein sud, cet espace propose un séjour spacieux, de superbes poutres métalliques apparentes et une mezzanine suspendue accueillant la suite parentale.",
    price: 1190000,
    type: "Appartement",
    city: "Paris",
    address: "29 Rue du Lycée, 75003 Paris",
    surface: 95,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200"
    ],
    features: ["Style Loft Industriel", "Grande Hauteur sous plafond (4.5m)", "Verrière métallique", "Parquet d'origine rénové", "Cuisine américaine", "Mezzanine de nuit"],
    agent: agentSophie,
    featured: false,
    yearBuilt: 1930,
    energyClass: "D"
  },
  {
    id: "prop-7",
    title: "Bastide Provençale Rénovée avec Charme",
    description: "Sous le soleil du Midi, magnifique bastide en pierres de taille du XVIIIe siècle entièrement restaurée dans le pur respect de sa tradition historique. Établie au cœur d'un parc de pins centenaires, d'oliviers et de lavandes de 5 000 m², elle allie le raffinement rustique (poutres patinées, carrelage en terre cuite authentique) au confort de premier plan.",
    price: 1980000,
    type: "Maison",
    city: "Nice",
    address: "152 Route de Bellet, 06200 Nice",
    surface: 260,
    bedrooms: 5,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200"
    ],
    features: ["Parc d'oliviers 5000m²", "Piscine au sel chauffée", "Pool house d'été", "Matières nobles & tommettes", "Puits naturel", "Terrain de pétanque"],
    agent: agentSophie,
    featured: true,
    yearBuilt: 1780,
    energyClass: "C"
  },
  {
    id: "prop-8",
    title: "Appartement Lumineux Face aux Quais",
    description: "Bénéficiant d'un emplacement unique sur les célèbres quais de Bordeaux, cet appartement rénové propose de superbes prestations intérieures. Un grand salon de réception avec cheminée, moulures soignées et une cuisine dînatoire haut de gamme s'ouvrent vers une vue panoramique inoubliable sur la Garonne.",
    price: 680000,
    type: "Appartement",
    city: "Bordeaux",
    address: "16 Quai des Chartrons, 33000 Bordeaux",
    surface: 88,
    bedrooms: 2,
    bathrooms: 1.5,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200"
    ],
    features: ["Vue Garonne", "Balcon filant", "Quartier recherché", "Cheminée ancienne", "Parquet d'époque", "Cave saine"],
    agent: agentJean,
    featured: false,
    yearBuilt: 1910,
    energyClass: "D"
  },
  {
    id: "prop-9",
    title: "Bureaux Business & High-Tech",
    description: "Idéalement situés dans un pôle économique dynamique à Paris, ces bureaux neufs de 180 m² prêts-à-travailler offrent une souplesse de division extraordinaire. Équipés des dernières normes éco-responsables, ils disposent de grands volumes ainsi que d'une excellente desserte par les transports en commun (métro et RER à 2 minutes).",
    price: 1150000,
    type: "Bureau",
    city: "Paris",
    address: "74 Boulevard Haussmann, 75009 Paris",
    surface: 180,
    bedrooms: 0,
    bathrooms: 0,
    images: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
    ],
    features: ["Normes RT2020", "Proximité Métro/RER", "Grand Open Space", "Baies de serveurs ventilées", "Cuisine d'équipe", "Ascenseur PMR"],
    agent: agentThomas,
    featured: false,
    yearBuilt: 2021,
    energyClass: "A"
  }
];
