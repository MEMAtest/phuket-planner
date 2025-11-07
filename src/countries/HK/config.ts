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
