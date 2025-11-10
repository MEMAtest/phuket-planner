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
  cities: {
    foshan: {
      id: 'foshan',
      name: 'Foshan',
      weather: {
        lat: 23.0216,
        lon: 113.1219
      },
      highlights: {
        localOptions: [
          {
            name: 'Foshan Ancestral Temple',
            type: 'activity',
            notes: 'Ancient temple complex showcasing traditional Lingnan architecture and martial arts.',
            rating: 4.6,
            travelTime: 'City Center',
            map: 'https://maps.google.com/?q=Foshan%20Ancestral%20Temple',
            website: 'http://www.fsancetemp.com/'
          },
          {
            name: 'Nanfeng Ancient Kiln',
            type: 'activity',
            notes: 'Working pottery kiln dating back 500 years. Hands-on workshops for families.',
            rating: 4.5,
            travelTime: 'Shiwan District',
            map: 'https://maps.google.com/?q=Nanfeng%20Ancient%20Kiln%20Foshan'
          },
          {
            name: 'Lingnan Tiandi',
            type: 'eat',
            notes: 'Restored Qing-era street with Cantonese restaurants and tea houses.',
            rating: 4.4,
            travelTime: 'Chancheng District',
            map: 'https://maps.google.com/?q=Lingnan%20Tiandi%20Foshan'
          },
          {
            name: 'Qinghui Garden',
            type: 'activity',
            notes: 'Classical Chinese garden with ponds, pavilions, and bonsai displays.',
            rating: 4.7,
            travelTime: 'Shunde District',
            map: 'https://maps.google.com/?q=Qinghui%20Garden%20Foshan'
          }
        ],
        facts: [
          'Foshan is the birthplace of Bruce Lee and renowned for Wing Chun kung fu.',
          'The city is famous for traditional ceramics—over 60% of China\'s ceramic tiles are made here.',
          'Foshan\'s Cantonese cuisine features "Shunde cooking," celebrated for fresh seafood and double-boiled soups.',
          'The Foshan Metro connects to Guangzhou, making intercity travel seamless.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Foshan Metro',
            type: 'metro',
            notes: '4 lines connecting to Guangzhou Metro. Use Alipay or Yangchengtong card.',
            website: 'http://www.fmetro.net/',
            app: 'Foshan Metro App (支付宝 Alipay accepted)'
          },
          {
            name: 'Guangfo Line',
            type: 'rail',
            notes: 'Intercity metro line linking Foshan and Guangzhou (35 min journey).',
            website: 'http://www.fmetro.net/'
          }
        ]
      }
    },
    guangzhou: {
      id: 'guangzhou',
      name: 'Guangzhou',
      weather: {
        lat: 23.1291,
        lon: 113.2644
      },
      highlights: {
        localOptions: [
          {
            name: 'Canton Tower',
            type: 'activity',
            notes: 'Iconic 600m tower with observation decks, sky drop, and night light shows.',
            rating: 4.7,
            travelTime: 'Haizhu District',
            map: 'https://maps.google.com/?q=Canton%20Tower%20Guangzhou',
            website: 'https://www.cantontower.com/'
          },
          {
            name: 'Chen Clan Ancestral Hall',
            type: 'activity',
            notes: 'Elaborate 19th-century complex with wood carvings, pottery, and folk art museum.',
            rating: 4.8,
            travelTime: 'Liwan District',
            map: 'https://maps.google.com/?q=Chen%20Clan%20Ancestral%20Hall%20Guangzhou'
          },
          {
            name: 'Dim sum at Taotao Ju',
            type: 'eat',
            notes: 'Historic tea house since 1880. Try shrimp dumplings and char siu bao.',
            rating: 4.6,
            travelTime: 'Shangxiajiu Pedestrian Street',
            map: 'https://maps.google.com/?q=Taotao%20Ju%20Guangzhou'
          },
          {
            name: 'Chimelong Paradise',
            type: 'activity',
            notes: 'Massive theme park with roller coasters, safari, and circus shows—great for families.',
            rating: 4.8,
            travelTime: 'Panyu District',
            map: 'https://maps.google.com/?q=Chimelong%20Paradise%20Guangzhou',
            website: 'https://www.chimelong.com/'
          }
        ],
        facts: [
          'Guangzhou is the birthplace of Cantonese cuisine and dim sum culture.',
          'The Pearl River divides the city and offers evening light cruises.',
          'Guangzhou hosted the first Canton Fair in 1957, now the world\'s largest trade fair.',
          'The city\'s metro is the 3rd largest in the world by ridership.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Guangzhou Metro',
            type: 'metro',
            notes: '18+ lines covering the entire city. Use Yangchengtong card or Alipay.',
            website: 'http://www.gzmtr.com/',
            app: 'Guangzhou Metro App / Alipay / WeChat Pay'
          },
          {
            name: 'Pearl River Water Bus',
            type: 'ferry',
            notes: 'Scenic river transport with routes along the Pearl River.',
            website: 'http://www.gzwxkj.com/'
          }
        ]
      }
    }
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
        map: 'https://maps.google.com/?q=Din%20Tai%20Fung%20Shanghai',
        website: 'https://www.dintaifung.com.cn/'
      },
      {
        name: 'Lost Heaven',
        type: 'eat',
        notes: 'Yunnan cuisine in the French Concession—spacious tables for families.',
        rating: 4.6,
        travelTime: 'Xuhui District',
        map: 'https://maps.google.com/?q=Lost%20Heaven%20Shanghai',
        website: 'https://lostheaven.com.cn/'
      },
      {
        name: 'Shanghai Disneyland',
        type: 'activity',
        notes: 'Tron coaster + world’s largest castle. Buy Premier Access during holidays.',
        rating: 4.8,
        travelTime: 'Pudong',
        map: 'https://maps.google.com/?q=Shanghai%20Disneyland',
        website: 'https://www.shanghaidisneyresort.com/'
      },
      {
        name: 'Chengdu Research Base of Giant Panda Breeding',
        type: 'activity',
        notes: 'Arrive 8am feeding time for playful cubs.',
        rating: 4.9,
        travelTime: 'Chengdu',
        map: 'https://maps.google.com/?q=Chengdu%20Research%20Base%20of%20Giant%20Panda',
        website: 'https://www.panda.org.cn/'
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
