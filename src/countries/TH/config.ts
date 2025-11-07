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
