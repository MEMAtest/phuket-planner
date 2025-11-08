// ──────────────────────────────────────────────────────────────────────────────
// Mainland China Country Configuration
// IMPORTANT: Uses AMap for maps (GCJ-02 coordinate system)
// ──────────────────────────────────────────────────────────────────────────────

import { CountryConfig } from '../types';

const CN: CountryConfig = {
  iso2: 'CN',
  name: 'China (Mainland)',
  defaultLocale: 'zh-CN',
  locales: ['zh-CN', 'en-GB'],
  currency: 'CNY',
  timeZones: ['Asia/Shanghai', 'Asia/Urumqi'],
  map: {
    provider: 'amap',              // AMap (Gaode) for mainland China
    coordSystem: 'GCJ-02'          // GCJ-02 (Mars Coordinates) required by Chinese law
  },
  forms: {
    addressSchema: 'CN',
    dialingCountry: 'CN'
  },
  weather: {
    city: 'Shanghai',
    lat: 31.2304,
    lon: 121.4737
  },
  news: {
    query: 'China travel families safety updates',
    region: 'CN',
    staticAlerts: [
      {
        id: 'cn_real_name',
        type: 'tip',
        title: 'Real-Name Bookings',
        description: 'Many attractions require ID/passport numbers. Carry passports daily.',
        priority: 'medium',
        icon: '🪪'
      },
      {
        id: 'cn_air_quality',
        type: 'warning',
        title: 'Air Quality Swings',
        description: 'In winter, AQI can exceed 150. Pack N95 masks for kids with asthma.',
        priority: 'medium',
        icon: '🌫️',
        months: [11, 12, 1, 2]
      }
    ]
  },
  highlights: {
    localOptions: [
      {
        name: 'Din Tai Fung',
        type: 'eat',
        notes: 'Steamed soup dumplings kids love (reservations recommended).',
        rating: 4.7,
        travelTime: 'Multiple branches',
        map: 'https://maps.google.com/?q=Din%20Tai%20Fung%20Shanghai'
      },
      {
        name: 'Lost Heaven',
        type: 'eat',
        notes: 'Yunnan cuisine in the French Concession—spacious tables for families.',
        rating: 4.6,
        travelTime: 'Xuhui District',
        map: 'https://maps.google.com/?q=Lost%20Heaven%20Shanghai'
      },
      {
        name: 'Shanghai Disneyland',
        type: 'activity',
        notes: 'Tron coaster + world’s largest castle. Buy Premier Access during holidays.',
        rating: 4.8,
        travelTime: 'Pudong',
        map: 'https://maps.google.com/?q=Shanghai%20Disneyland'
      },
      {
        name: 'Chengdu Research Base of Giant Panda Breeding',
        type: 'activity',
        notes: 'Arrive 8am feeding time for playful cubs.',
        rating: 4.9,
        travelTime: 'Chengdu',
        map: 'https://maps.google.com/?q=Chengdu%20Research%20Base%20of%20Giant%20Panda'
      }
    ],
    facts: [
      'China’s high-speed rail network spans 42,000 km—long enough to circle the Earth.',
      'Shanghai Tower’s observation deck is the world’s highest indoor deck.',
      'Beijing’s Forbidden City holds more than 8,700 rooms across 180 acres.',
      'Chengdu is nicknamed the “City of Gastronomy” by UNESCO.'
    ]
  },
  content: {
    emergency: {
      police: '110',
      ambulance: '120',
      fire: '119'
    },
    transitCards: [
      'Beijing Yikatong',
      'Shanghai Public Transportation Card',
      'Shenzhen Tong',
      'Guangzhou Yangchengtong'
    ],
    sockets: 'Type A/C/I · 220V',
    etiquetteNotes: [
      'Mobile payments (WeChat Pay, Alipay) are essential',
      'VPN may be required for some international apps',
      'Download maps and translation apps before arrival',
      'Mandarin is the primary language; English less common outside major cities',
      'Tipping is not customary',
      'Respect for elders and hierarchy is important'
    ],
    quickStarts: [
      {
        title: 'Beijing: Forbidden City, Temple of Heaven & Jingshan Park',
        tags: ['culture', 'history', 'iconic']
      },
      {
        title: 'Shanghai: The Bund, Yu Garden & French Concession',
        tags: ['urban', 'culture', 'architecture']
      },
      {
        title: 'Xi\'an: Terracotta Warriors & Ancient City Wall',
        tags: ['history', 'culture', 'UNESCO']
      },
      {
        title: 'Chengdu: Giant Pandas & Sichuan Cuisine',
        tags: ['wildlife', 'food', 'family']
      }
    ]
  },
  features: {
    showJetLagTools: true,
    supportsEsimAdvice: false,      // eSIM support is limited in mainland China
    mapTrafficLayer: true
  }
};

export default CN;
