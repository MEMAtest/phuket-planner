// ──────────────────────────────────────────────────────────────────────────────
// Thailand Country Configuration
// ──────────────────────────────────────────────────────────────────────────────

import { CountryConfig } from '../types';

const TH: CountryConfig = {
  iso2: 'TH',
  name: 'Thailand',
  defaultLocale: 'th-TH',
  locales: ['th-TH', 'en-GB'],
  currency: 'THB',
  timeZones: ['Asia/Bangkok'],
  map: {
    provider: 'google',
    coordSystem: 'WGS84'
  },
  forms: {
    addressSchema: 'TH',
    dialingCountry: 'TH'
  },
  weather: {
    city: 'Phuket (Mai Khao)',
    lat: 8.1707,
    lon: 98.2994
  },
  news: {
    query: 'Phuket travel family safety',
    region: 'TH',
    staticAlerts: [
      {
        id: 'th_jellyfish',
        type: 'warning',
        title: 'Jellyfish Season Advisory',
        description: 'Box jellyfish may appear June–September. Swim inside flagged areas and wear rash guards.',
        priority: 'high',
        icon: '⚠️',
        months: [6, 7, 8, 9]
      },
      {
        id: 'th_sunday_market',
        type: 'event',
        title: 'Old Town Sunday Walking Street',
        description: 'Every Sunday 4–10pm. Perfect for souvenirs and night bites.',
        priority: 'low',
        icon: '🎪',
        daysOfWeek: [0]
      }
    ]
  },
  highlights: {
    localOptions: [
      {
        name: 'Kin Dee Restaurant',
        type: 'eat',
        notes: 'Beloved southern Thai, great for families.',
        rating: 4.7,
        travelTime: '10–12 min drive',
        map: 'https://maps.google.com/?q=Kin%20Dee%20Restaurant%20Mai%20Khao'
      },
      {
        name: 'Sea.Fire.Salt',
        type: 'eat',
        notes: 'Upscale beachfront BBQ at Anantara.',
        rating: 4.6,
        travelTime: 'On-site',
        map: 'https://maps.google.com/?q=Sea.Fire.Salt%20Anantara%20Mai%20Khao'
      },
      {
        name: 'Black Ginger',
        type: 'eat',
        notes: 'Michelin-rated Thai fine dining with lagoon arrival.',
        rating: 4.8,
        travelTime: '20 min drive',
        map: 'https://maps.google.com/?q=Black%20Ginger%20Phuket'
      },
      {
        name: 'Soi Dog Foundation',
        type: 'activity',
        notes: 'Ethical sanctuary tour—book in advance.',
        rating: 4.9,
        travelTime: '10 min drive',
        map: 'https://maps.google.com/?q=Soi%20Dog%20Foundation%20Phuket'
      }
    ],
    facts: [
      'Phuket is Thailand’s largest island—roughly the size of Singapore.',
      'Mai Khao Beach is part of Sirinat National Park and is a nesting site for sea turtles.',
      'The island’s Sino-Portuguese architecture reflects its tin-trading history.',
      'The “Big Buddha” statue on Nakkerd Hill is 45 meters tall and clad in Burmese white jade.'
    ]
  },
  content: {
    emergency: {
      police: '191',
      ambulance: '1669',
      fire: '199'
    },
    transitCards: ['Rabbit Card'],
    sockets: 'Type A/B/C · 220V',
    etiquetteNotes: [
      'Dress modestly when visiting temples',
      'Remove shoes before entering homes and temples',
      'The head is sacred - never touch someone\'s head',
      'Feet are considered unclean - don\'t point them at people or Buddha images',
      'Show respect to the Royal Family'
    ],
    quickStarts: [
      {
        title: 'Big Buddha & Old Phuket Town',
        tags: ['family', 'culture', 'iconic']
      },
      {
        title: 'Island Hopping (Phi Phi, James Bond Island)',
        tags: ['adventure', 'beaches', 'scenic']
      },
      {
        title: 'Street Food & Night Markets',
        tags: ['food', 'culture', 'budget-friendly']
      },
      {
        title: 'Elephant Sanctuary & Zipline',
        tags: ['family', 'adventure', 'wildlife']
      }
    ]
  },
  features: {
    showJetLagTools: true,
    supportsEsimAdvice: true,
    mapTrafficLayer: true
  }
};

export default TH;
