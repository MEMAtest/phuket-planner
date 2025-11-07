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
