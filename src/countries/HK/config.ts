// ──────────────────────────────────────────────────────────────────────────────
// Hong Kong Country Configuration
// ──────────────────────────────────────────────────────────────────────────────

import { CountryConfig } from '../types';

const HK: CountryConfig = {
  iso2: 'HK',
  name: 'Hong Kong',
  defaultLocale: 'zh-HK',
  locales: ['zh-HK', 'en-GB', 'zh-CN'],
  currency: 'HKD',
  timeZones: ['Asia/Hong_Kong'],
  map: {
    provider: 'google',
    coordSystem: 'WGS84'
  },
  forms: {
    addressSchema: 'HK',
    dialingCountry: 'HK'
  },
  weather: {
    city: 'Hong Kong Island',
    lat: 22.2783,
    lon: 114.1747
  },
  news: {
    query: 'Hong Kong family travel safety',
    region: 'HK',
    staticAlerts: [
      {
        id: 'hk_typhoon',
        type: 'warning',
        title: 'Typhoon Season (May–Oct)',
        description: 'Monitor the HK Observatory app when T1 or above is hoisted. Ferries and trams may pause.',
        priority: 'high',
        icon: '🌀',
        months: [5, 6, 7, 8, 9, 10]
      },
      {
        id: 'hk_air_quality',
        type: 'tip',
        title: 'Air Quality Reminder',
        description: 'Haze happens in winter—pack masks for sensitive kids.',
        priority: 'medium',
        icon: '🌫️',
        months: [11, 12, 1, 2]
      }
    ]
  },
  highlights: {
    localOptions: [
      {
        name: 'Mak’s Noodle (Central)',
        type: 'eat',
        notes: 'Legendary wonton noodle bowls—tiny portions, big flavor.',
        rating: 4.5,
        travelTime: 'Central Mid-Levels',
        map: 'https://maps.google.com/?q=Mak%27s%20Noodle%20Central'
      },
      {
        name: 'Tim Ho Wan (Sham Shui Po)',
        type: 'eat',
        notes: 'Michelin dim sum that’s affordable and kid-friendly.',
        rating: 4.6,
        travelTime: 'Sham Shui Po',
        map: 'https://maps.google.com/?q=Tim%20Ho%20Wan%20Sham%20Shui%20Po'
      },
      {
        name: 'Tai O Heritage Hotel',
        type: 'activity',
        notes: 'Combine Big Buddha with Tai O village + egg waffles.',
        rating: 4.7,
        travelTime: 'Lantau Island',
        map: 'https://maps.google.com/?q=Tai%20O'
      },
      {
        name: 'PMQ Design Market',
        type: 'shopping',
        notes: 'Indie Hong Kong designers—great rainy-day stroll.',
        rating: 4.4,
        travelTime: 'SoHo',
        map: 'https://maps.google.com/?q=PMQ%20Hong%20Kong'
      }
    ],
    facts: [
      'Hong Kong has over 260 islands, yet 70% of the territory is countryside and parkland.',
      'Octopus smart cards launched in 1997 and now work in 99% of convenience stores.',
      'The iconic Star Ferry has crossed Victoria Harbour since 1888.',
      'Ding Ding trams still use double-decker cars from the 1950s.'
    ]
  },
  content: {
    emergency: {
      police: '999',
      ambulance: '999',
      fire: '999'
    },
    transitCards: ['Octopus Card'],
    sockets: 'Type G (UK) · 220V',
    etiquetteNotes: [
      'Stand on the right on escalators; walk on the left',
      'No eating or drinking on the MTR (metro)',
      'Queue in an orderly fashion',
      'Tipping is not expected in most situations',
      'Cantonese is preferred; English is widely spoken'
    ],
    quickStarts: [
      {
        title: 'Peak Tram + Victoria Peak + Central-Mid-Levels',
        tags: ['views', 'iconic', 'urban']
      },
      {
        title: 'Temple Street Night Market & Symphony of Lights',
        tags: ['culture', 'shopping', 'evening']
      },
      {
        title: 'Lantau Island: Big Buddha & Tai O Fishing Village',
        tags: ['culture', 'scenic', 'day-trip']
      },
      {
        title: 'Dim Sum Crawl in Central & Sheung Wan',
        tags: ['food', 'culture', 'authentic']
      }
    ]
  },
  features: {
    showJetLagTools: true,
    supportsEsimAdvice: true,
    mapTrafficLayer: true
  }
};

export default HK;
