import { CountryIso2 } from '../countries';

export type TripBlock = {
  id: string;
  time: string;
  title: string;
  type: string;
  note?: string;
};

export type DayPlan = {
  date: string;
  dow: string;
  location: string;
  focus?: string;
  blocks: TripBlock[];
};

export type LocalRecommendation = {
  name: string;
  rating: number;
  type: 'eat' | 'activity' | 'shopping';
  notes: string;
  map: string;
  travelTime: string;
};

export type TripPreset = {
  hotel: { name: string };
  forecast: { date: string; dow: string; hi: number; lo: number; summary: string }[];
  recommendations: Record<string, LocalRecommendation[]>;
  facts: string[];
  initialPlan: DayPlan[];
};

const createBlocks = (blocks: Omit<TripBlock, 'id'>[], prefix: string): TripBlock[] => {
  return blocks.map((block, index) => ({
    ...block,
    id: `${prefix}-${index + 1}`
  }));
};

const TH_PLAN: TripPreset = {
  hotel: { name: 'Anantara Mai Khao Phuket Villas' },
  forecast: [
    { date: '2025-08-20', dow: 'Wed', hi: 32, lo: 26, summary: 'AM storms; PM cloudy' },
    { date: '2025-08-21', dow: 'Thu', hi: 32, lo: 27, summary: 'Cloudy; a little AM rain' },
    { date: '2025-08-22', dow: 'Fri', hi: 33, lo: 27, summary: 'Cloudy AM, brighter PM' },
    { date: '2025-08-23', dow: 'Sat', hi: 32, lo: 27, summary: 'Cloudy; isolated showers' },
    { date: '2025-08-24', dow: 'Sun', hi: 31, lo: 25, summary: 'Periods of rain' }
  ],
  recommendations: {
    maiKhao: [
      {
        name: 'Kin Dee Restaurant',
        rating: 4.5,
        type: 'eat',
        notes: 'Beloved southern Thai, breezy deck, kid-approved curries.',
        map: 'https://maps.google.com/?q=Kin%20Dee%20Restaurant%20Mai%20Khao',
        travelTime: '10 min drive'
      },
      {
        name: 'Sea.Fire.Salt',
        rating: 4.6,
        type: 'eat',
        notes: 'Sunset seafood grill steps from the villas.',
        map: 'https://maps.google.com/?q=Sea.Fire.Salt%20Anantara%20Mai%20Khao',
        travelTime: 'On-site'
      },
      {
        name: 'Soi Dog Foundation',
        rating: 4.9,
        type: 'activity',
        notes: 'Ethical dog & cat sanctuary tour, perfect for kids.',
        map: 'https://maps.google.com/?q=Soi%20Dog%20Foundation%20Phuket',
        travelTime: '10 min drive'
      }
    ],
    oldTown: [
      {
        name: 'One Chun Cafe',
        rating: 4.6,
        type: 'eat',
        notes: 'Michelin Bib noodle house with mild options for little ones.',
        map: 'https://maps.google.com/?q=One%20Chun%20Cafe%20%26%20Restaurant%20Phuket',
        travelTime: '50 min drive'
      },
      {
        name: 'Raya Restaurant',
        rating: 4.4,
        type: 'eat',
        notes: 'Sino-Portuguese mansion serving Phuket classics.',
        map: 'https://maps.google.com/?q=Raya%20Restaurant%20Phuket',
        travelTime: '50 min drive'
      },
      {
        name: 'Phuket 3D Museum',
        rating: 4.2,
        type: 'activity',
        notes: 'Indoor trick-eye museum for rainy afternoons.',
        map: 'https://maps.google.com/?q=Phuket%203D%20Museum',
        travelTime: '45 min drive'
      }
    ]
  },
  facts: [
    'Mai Khao Beach sits inside Sirinat National Park and is a nesting ground for leatherback turtles.',
    'Phuket’s Old Town reflects the tin-boom era with bright Sino-Portuguese shophouses.',
    'Longtail boat captains expect cash—keep smaller THB notes handy.',
    'Mai Khao’s sands stay quiet because it is part of a protected conservation zone.'
  ],
  initialPlan: [
    {
      date: '2025-08-20',
      dow: 'Wed',
      location: 'maiKhao',
      focus: 'Arrival + settle in',
      blocks: createBlocks(
        [
          { time: '10:50', title: 'Land at HKT + immigration fast track', type: 'travel' },
          { time: '12:30', title: 'Check in at Anantara & villa lunch', type: 'travel' },
          { time: '16:00', title: 'Jakka Kids’ Club welcome session', type: 'indoor' },
          { time: '18:00', title: 'Dinner at Kin Dee', type: 'eat' }
        ],
        'th-d1'
      )
    },
    {
      date: '2025-08-21',
      dow: 'Thu',
      location: 'maiKhao',
      focus: 'Low-key resort day',
      blocks: createBlocks(
        [
          { time: '09:30', title: 'Mai Khao Marine Turtle Foundation', type: 'indoor' },
          { time: '12:30', title: 'Villa siesta / quiet time', type: 'nap' },
          { time: '16:00', title: 'Family bike loop + beach shell hunt', type: 'outdoor' }
        ],
        'th-d2'
      )
    },
    {
      date: '2025-08-22',
      dow: 'Fri',
      location: 'maiKhao',
      focus: 'Water fun',
      blocks: createBlocks(
        [
          { time: '10:00', title: 'Splash Jungle Water Park cabana day', type: 'mixed' },
          { time: '13:30', title: 'Nap drive back to villa', type: 'nap' },
          { time: '17:30', title: 'Sea.Fire.Salt sunset dinner', type: 'eat' }
        ],
        'th-d3'
      )
    },
    {
      date: '2025-08-23',
      dow: 'Sat',
      location: 'oldTown',
      focus: 'Culture + snacks',
      blocks: createBlocks(
        [
          { time: '09:00', title: 'Old Town street art stroll', type: 'outdoor' },
          { time: '12:00', title: 'Lunch at One Chun (order mild)', type: 'eat' },
          { time: '15:30', title: 'Torry’s Ice Cream tasting flight', type: 'eat' }
        ],
        'th-d4'
      )
    },
    {
      date: '2025-08-24',
      dow: 'Sun',
      location: 'maiKhao',
      focus: 'Rain plan / reset',
      blocks: createBlocks(
        [
          { time: '09:00', title: 'Villa brunch + sensory bins', type: 'indoor' },
          { time: '12:30', title: 'Nap window', type: 'nap' },
          { time: '16:30', title: 'Kids’ spa + movie night', type: 'indoor' }
        ],
        'th-d5'
      )
    }
  ]
};

const HK_PLAN: TripPreset = {
  hotel: { name: 'Rosewood Hong Kong' },
  forecast: [
    { date: '2025-09-02', dow: 'Tue', hi: 31, lo: 27, summary: 'Humid with passing showers' },
    { date: '2025-09-03', dow: 'Wed', hi: 32, lo: 27, summary: 'Bright morning, stormy PM' },
    { date: '2025-09-04', dow: 'Thu', hi: 31, lo: 26, summary: 'Thunderstorms likely' },
    { date: '2025-09-05', dow: 'Fri', hi: 30, lo: 26, summary: 'Cloudy with sunny breaks' },
    { date: '2025-09-06', dow: 'Sat', hi: 30, lo: 26, summary: 'Showers, turn drier late' }
  ],
  recommendations: {
    hongKongIsland: [
      {
        name: 'Mak’s Noodle (Central)',
        rating: 4.5,
        type: 'eat',
        notes: 'Legendary wonton noodles served fast—tiny bowls perfect for kids.',
        map: 'https://maps.google.com/?q=Mak%27s%20Noodle%20Central',
        travelTime: 'Central, walkable'
      },
      {
        name: 'The Peak Tram & Sky Terrace',
        rating: 4.7,
        type: 'activity',
        notes: 'Iconic funicular + skyline views, best early morning.',
        map: 'https://maps.google.com/?q=Peak%20Tram%20Hong%20Kong',
        travelTime: '10 min taxi'
      }
    ],
    kowloon: [
      {
        name: 'Tim Ho Wan (Sham Shui Po)',
        rating: 4.6,
        type: 'eat',
        notes: 'Michelin-star dim sum where you tick the menu sheet.',
        map: 'https://maps.google.com/?q=Tim%20Ho%20Wan%20Sham%20Shui%20Po',
        travelTime: 'MTR 15 min'
      },
      {
        name: 'PMQ Night Market',
        rating: 4.4,
        type: 'shopping',
        notes: 'Indie designers + AC indoor respite.',
        map: 'https://maps.google.com/?q=PMQ%20Hong%20Kong',
        travelTime: 'Sheung Wan'
      }
    ],
    lantau: [
      {
        name: 'Ngong Ping 360 + Big Buddha',
        rating: 4.7,
        type: 'activity',
        notes: 'Crystal cabin cable car with stroller-friendly boardwalks.',
        map: 'https://maps.google.com/?q=Ngong%20Ping%20360',
        travelTime: '35 min Airport Express + cable car'
      },
      {
        name: 'Tai O Heritage Walk',
        rating: 4.5,
        type: 'activity',
        notes: 'Stilt village, egg waffles, short boat ride for pink dolphins.',
        map: 'https://maps.google.com/?q=Tai%20O',
        travelTime: '15 min from Ngong Ping'
      }
    ]
  },
  facts: [
    'Hong Kong counts more than 260 islands yet 70% of the territory is green space.',
    'Use Octopus cards on ferries, convenience stores, even Starbucks.',
    'English, Cantonese, and Mandarin signage are side-by-side citywide.',
    'Red taxis serve Hong Kong Island + Kowloon; green taxis stay in New Territories.'
  ],
  initialPlan: [
    {
      date: '2025-09-02',
      dow: 'Tue',
      location: 'hongKongIsland',
      focus: 'Arrival & Victoria Harbour',
      blocks: createBlocks(
        [
          { time: '11:00', title: 'Airport Express to Kowloon + hotel check-in', type: 'travel' },
          { time: '16:30', title: 'Star Ferry sunset round trip', type: 'travel' },
          { time: '18:30', title: 'Mak’s Noodle + egg waffles dessert', type: 'eat' }
        ],
        'hk-d1'
      )
    },
    {
      date: '2025-09-03',
      dow: 'Wed',
      location: 'hongKongIsland',
      focus: 'Peak morning & museum afternoon',
      blocks: createBlocks(
        [
          { time: '09:00', title: 'Peak Tram + Sky Terrace 428', type: 'outdoor' },
          { time: '13:00', title: 'Hong Kong Park playground & aviary', type: 'outdoor' },
          { time: '15:00', title: 'Hong Kong Museum of Art kids’ studio', type: 'indoor' }
        ],
        'hk-d2'
      )
    },
    {
      date: '2025-09-04',
      dow: 'Thu',
      location: 'lantau',
      focus: 'Cable car adventure',
      blocks: createBlocks(
        [
          { time: '09:30', title: 'Ngong Ping 360 glass cabin ride', type: 'outdoor' },
          { time: '12:00', title: 'Vegetarian lunch near Big Buddha', type: 'eat' },
          { time: '15:30', title: 'Tai O boat village exploration', type: 'mixed' }
        ],
        'hk-d3'
      )
    },
    {
      date: '2025-09-05',
      dow: 'Fri',
      location: 'kowloon',
      focus: 'Rain-day Kowloon',
      blocks: createBlocks(
        [
          { time: '10:00', title: 'K11 Musea playhouse & LEGO Certified Store', type: 'indoor' },
          { time: '13:00', title: 'Tim Ho Wan dim sum tasting', type: 'eat' },
          { time: '17:00', title: 'Symphony of Lights viewing from Tsim Sha Tsui', type: 'outdoor' }
        ],
        'hk-d4'
      )
    }
  ]
};

const CN_PLAN: TripPreset = {
  hotel: { name: 'The Middle House Shanghai' },
  forecast: [
    { date: '2025-10-10', dow: 'Fri', hi: 25, lo: 18, summary: 'Crisp autumn sun' },
    { date: '2025-10-11', dow: 'Sat', hi: 24, lo: 17, summary: 'Partly cloudy' },
    { date: '2025-10-12', dow: 'Sun', hi: 23, lo: 16, summary: 'Light showers late' },
    { date: '2025-10-13', dow: 'Mon', hi: 24, lo: 18, summary: 'Clear with haze' }
  ],
  recommendations: {
    shanghaiCenter: [
      {
        name: 'Din Tai Fung (Shanghai Centre)',
        rating: 4.7,
        type: 'eat',
        notes: 'Soup dumplings with kids’ menu + coloring sheets.',
        map: 'https://maps.google.com/?q=Din%20Tai%20Fung%20Shanghai%20Centre',
        travelTime: 'Jing’an, 10 min taxi'
      },
      {
        name: 'Shanghai Natural History Museum',
        rating: 4.8,
        type: 'activity',
        notes: 'Immersive dinosaur hall and toddlers’ discovery room.',
        map: 'https://maps.google.com/?q=Shanghai%20Natural%20History%20Museum',
        travelTime: '10 min subway'
      }
    ],
    pudong: [
      {
        name: 'Shanghai Ocean Aquarium',
        rating: 4.6,
        type: 'activity',
        notes: 'Longest underwater tunnel + stroller rentals.',
        map: 'https://maps.google.com/?q=Shanghai%20Ocean%20Aquarium',
        travelTime: 'Lujiazui 15 min taxi'
      },
      {
        name: 'Gu Yi (Pudong)',
        rating: 4.5,
        type: 'eat',
        notes: 'Modern Jiangnan dishes; private rooms for families.',
        map: 'https://maps.google.com/?q=Gu%20Yi%20Pudong',
        travelTime: 'Near IFC Mall'
      }
    ],
    dayTrip: [
      {
        name: 'Zhujiajiao Water Town',
        rating: 4.4,
        type: 'activity',
        notes: 'Gondola ride + old stone bridges, 45 min from city.',
        map: 'https://maps.google.com/?q=Zhujiajiao%20Water%20Town',
        travelTime: '45 min private car'
      },
      {
        name: 'Suzhou Rail Day Trip',
        rating: 4.5,
        type: 'activity',
        notes: 'High-speed train + Humble Administrator’s Garden stroll.',
        map: 'https://maps.google.com/?q=Suzhou%20Railway%20Station',
        travelTime: '30 min G-train'
      }
    ]
  },
  facts: [
    'Shanghai’s metro is the world’s longest—every station has family priority security lanes.',
    'DiDi has an English toggle (“DiDi International”) for card payments.',
    'Tap water is not potable; hotels supply daily bottled water for brushing teeth.',
    'Download Baidu Maps for reliable Chinese-language walking directions offline.'
  ],
  initialPlan: [
    {
      date: '2025-10-10',
      dow: 'Fri',
      location: 'shanghaiCenter',
      focus: 'Bund + xiaolongbao welcome',
      blocks: createBlocks(
        [
          { time: '09:30', title: 'Bund stroller walk & skyline photos', type: 'outdoor' },
          { time: '12:00', title: 'Din Tai Fung lunch (bubble tea treat)', type: 'eat' },
          { time: '15:00', title: 'People’s Park carousel & naps grab', type: 'outdoor' }
        ],
        'cn-d1'
      )
    },
    {
      date: '2025-10-11',
      dow: 'Sat',
      location: 'pudong',
      focus: 'Pudong explorer',
      blocks: createBlocks(
        [
          { time: '10:00', title: 'Shanghai Ocean Aquarium', type: 'indoor' },
          { time: '13:30', title: 'IFC Mall indoor playground', type: 'indoor' },
          { time: '17:30', title: 'Gu Yi family dinner', type: 'eat' }
        ],
        'cn-d2'
      )
    },
    {
      date: '2025-10-12',
      dow: 'Sun',
      location: 'shanghaiCenter',
      focus: 'Culture + rainy backup',
      blocks: createBlocks(
        [
          { time: '10:00', title: 'Natural History Museum', type: 'indoor' },
          { time: '13:00', title: 'Nap & room service movie', type: 'nap' },
          { time: '16:00', title: 'M50 art warehouses craft crawl', type: 'indoor' }
        ],
        'cn-d3'
      )
    },
    {
      date: '2025-10-13',
      dow: 'Mon',
      location: 'dayTrip',
      focus: 'Water town day trip',
      blocks: createBlocks(
        [
          { time: '09:00', title: 'Private van to Zhujiajiao', type: 'travel' },
          { time: '11:00', title: 'Boat ride + snack street', type: 'mixed' },
          { time: '15:00', title: 'Return to Shanghai / naps on ride', type: 'travel' }
        ],
        'cn-d4'
      )
    }
  ]
};

const TRIP_PRESETS: Record<CountryIso2, TripPreset> = {
  TH: TH_PLAN,
  HK: HK_PLAN,
  CN: CN_PLAN
};

export const getTripPreset = (iso2: CountryIso2): TripPreset => {
  return TRIP_PRESETS[iso2] || TRIP_PRESETS.TH;
};
