export type RestaurantRecommendation = {
  name: string;
  location: string;
  rating: number;
  priceRange: string;
  highlights: string[];
  mustTry: string;
  kidFriendly: number;
  hours: string;
  notes: string;
};

export type FoodItem = {
  name: string;
  native?: string;
  desc: string;
  spice: number; // 0-3
  order: string;
};

export type FoodPhrase = {
  native: string;
  phonetic: string;
  english: string;
  usage: string;
};

export type FoodGuide = {
  restaurants: {
    breakfast: RestaurantRecommendation[];
    lunch: RestaurantRecommendation[];
    dinner: RestaurantRecommendation[];
  };
  dishes: {
    kidFriendly: FoodItem[];
    mustTry: FoodItem[];
    specialties: FoodItem[];
  };
  phrases: {
    essential: FoodPhrase[];
    dietary: FoodPhrase[];
  };
  quickTips: string[];
  emergencyEats: string[];
  dailySpecials: { day: string; special: string; dish: string }[];
};

export type ChecklistTemplateItem = {
  text: string;
  category: 'essential' | 'comfort' | 'entertainment' | 'safety';
};

export type KidChecklistGuide = {
  tip: string;
  extras?: ChecklistTemplateItem[];
};

export type EssentialApp = {
  name: string;
  desc: string;
  icon: string;
  link?: string;
};

export type EmergencyContact = {
  label: string;
  number: string;
  note?: string;
  icon?: string;
};

export type DestinationContacts = {
  local: EmergencyContact[];
  embassy: EmergencyContact[];
};

export const BASE_KID_CHECKLIST: ChecklistTemplateItem[] = [
  { text: 'Passports & travel documents', category: 'essential' },
  { text: 'Travel insurance documents', category: 'essential' },
  { text: 'Hotel booking confirmations', category: 'essential' },
  { text: 'Emergency contact list', category: 'essential' },
  { text: 'Travel car seat / booster', category: 'comfort' },
  { text: 'Lightweight stroller with rain cover', category: 'comfort' },
  { text: 'Portable blackout blind', category: 'comfort' },
  { text: 'Favorite blanket/comforter', category: 'comfort' },
  { text: 'Travel pillow', category: 'comfort' },
  { text: 'Tablet with downloaded content', category: 'entertainment' },
  { text: 'Headphones (kid-sized)', category: 'entertainment' },
  { text: 'Coloring books & crayons', category: 'entertainment' },
  { text: 'Favorite small toys', category: 'entertainment' },
  { text: 'Travel games/cards', category: 'entertainment' },
  { text: 'Kid-safe insect repellent', category: 'safety' },
  { text: 'SPF 50+ sunscreen', category: 'safety' },
  { text: 'First-aid kit (Calpol, plasters)', category: 'safety' },
  { text: 'Prescribed medications', category: 'safety' },
  { text: 'Thermometer', category: 'safety' },
  { text: 'Rehydration salts', category: 'safety' },
  { text: 'Floaties/armbands for pool', category: 'safety' },
  { text: 'UV swimwear/rash vests', category: 'safety' },
  { text: 'Sun hats & sunglasses', category: 'safety' },
  { text: 'Reusable water bottles', category: 'safety' }
];

export const KID_CHECKLISTS: Record<string, KidChecklistGuide> = {
  TH: {
    tip: 'Pack lightweight clothing plus reef-safe sunscreen. Thailand convenience stores carry nappies and snacks but insect repellent and rash vests go fast in peak season.',
    extras: [
      { text: 'Cool gel patches for heat relief', category: 'safety' },
      { text: 'Portable fan / misting bottle', category: 'comfort' }
    ]
  },
  HK: {
    tip: 'Hong Kong involves lots of walking and public transport. Bring Octopus cards, compact rain jackets, and layers for blasting A/C.',
    extras: [
      { text: 'Octopus travel cards for each traveler', category: 'essential' },
      { text: 'Lightweight rain jackets/umbrellas', category: 'comfort' },
      { text: 'Rechargeable clip-on stroller fan', category: 'comfort' }
    ]
  },
  CN: {
    tip: 'Carry translation cards for allergies, and download offline maps. Baby supplies are available in big cities but brands differ—pack trusted meds and snacks.',
    extras: [
      { text: 'Travel adapter (Type A/C/I)', category: 'essential' },
      { text: 'Mandarin food allergy cards', category: 'essential' },
      { text: 'Hand sanitizer packets + tissues', category: 'safety' }
    ]
  }
};

const thaiRestaurants: FoodGuide['restaurants'] = {
  breakfast: [
    {
      name: 'Gallery Cafe (Anantara)',
      location: 'Mai Khao',
      rating: 4.6,
      priceRange: '£££',
      highlights: ['Kids eat free buffet', 'Beach views', 'Live cooking stations'],
      mustTry: 'Thai rice porridge, tropical fruit, egg station',
      kidFriendly: 5,
      hours: '6:30-10:30',
      notes: 'On-property, perfect first meal'
    },
    {
      name: 'Wow Wow Cafe',
      location: 'Mai Khao',
      rating: 4.7,
      priceRange: '££',
      highlights: ['Smoothie bowls', 'Healthy plates', 'Quiet garden'],
      mustTry: 'Acai bowl, banana pancakes',
      kidFriendly: 4,
      hours: '8:00-14:00',
      notes: '10 min from resort'
    },
    {
      name: "Robinson's Cafe",
      location: 'Old Town',
      rating: 4.5,
      priceRange: '£',
      highlights: ['Local dim sum', 'Strong coffee', 'Historic stop'],
      mustTry: 'Pa thong ko + Thai milk tea',
      kidFriendly: 3,
      hours: '7:00-12:00',
      notes: 'Cash only, authentic experience'
    }
  ],
  lunch: [
    {
      name: 'Kin Dee Restaurant',
      location: 'Mai Khao',
      rating: 4.5,
      priceRange: '££',
      highlights: ['Beachfront', 'Covered seating', 'Fast service'],
      mustTry: 'Pad Thai, mango sticky rice',
      kidFriendly: 5,
      hours: '11:00-22:00',
      notes: 'Go post-beach'
    },
    {
      name: 'One Chun Cafe',
      location: 'Old Town',
      rating: 4.6,
      priceRange: '££',
      highlights: ['Michelin Bib Gourmand', 'Crab curry'],
      mustTry: 'Moo hong, Hokkien noodles',
      kidFriendly: 3,
      hours: '11:00-21:00',
      notes: 'Ask for mild spice'
    }
  ],
  dinner: [
    {
      name: 'Sea.Fire.Salt',
      location: 'Mai Khao',
      rating: 4.6,
      priceRange: '££££',
      highlights: ['Sunset views', 'Seafood grill'],
      mustTry: 'Seafood platter, Wagyu beef',
      kidFriendly: 4,
      hours: '18:00-22:30',
      notes: 'Reserve for sunset'
    },
    {
      name: 'Black Ginger',
      location: 'Mai Khao',
      rating: 4.7,
      priceRange: '££££',
      highlights: ['Floating arrival', 'Royal Thai menu'],
      mustTry: 'Tasting menu, Tom Kha Gai',
      kidFriendly: 2,
      hours: '18:30-22:30',
      notes: 'Best for parents night'
    }
  ]
};

const hongKongRestaurants: FoodGuide['restaurants'] = {
  breakfast: [
    {
      name: 'Australian Dairy Company',
      location: 'Jordan',
      rating: 4.5,
      priceRange: 'HK$$',
      highlights: ['Cha chaan teng classic', 'Lightning fast'],
      mustTry: 'Scrambled eggs on toast, macaroni soup',
      kidFriendly: 3,
      hours: '7:30-23:00',
      notes: 'Queue moves fast, cash only'
    },
    {
      name: 'Elephant Grounds',
      location: 'Causeway Bay',
      rating: 4.4,
      priceRange: 'HK$$$',
      highlights: ['Specialty coffee', 'Brunch plates'],
      mustTry: 'PB&J pancakes, cold brew',
      kidFriendly: 4,
      hours: '8:00-18:00',
      notes: 'Great for late breakfast'
    }
  ],
  lunch: [
    {
      name: 'Tim Ho Wan',
      location: 'Sham Shui Po',
      rating: 4.6,
      priceRange: 'HK$$',
      highlights: ['Michelin dim sum', 'Casual seating'],
      mustTry: 'BBQ pork buns, shrimp dumplings',
      kidFriendly: 4,
      hours: '10:00-21:30',
      notes: 'Grab a ticket, cash only'
    },
    {
      name: 'Mak’s Noodle',
      location: 'Central',
      rating: 4.3,
      priceRange: 'HK$',
      highlights: ['Tiny bowls', 'Historic brand'],
      mustTry: 'Wonton noodle soup',
      kidFriendly: 3,
      hours: '11:00-21:00',
      notes: 'Order two bowls per adult'
    }
  ],
  dinner: [
    {
      name: 'Ho Lee Fook',
      location: 'SoHo',
      rating: 4.6,
      priceRange: 'HK$$$'
      ,
      highlights: ['Modern Cantonese', 'Lively vibe'],
      mustTry: 'Char siu, fried rice',
      kidFriendly: 3,
      hours: '17:30-23:00',
      notes: 'Book ahead, ask for booth'
    },
    {
      name: 'Tai O Heritage Hotel Café',
      location: 'Lantau',
      rating: 4.4,
      priceRange: 'HK$$',
      highlights: ['Village views', 'Ferry day-trip'],
      mustTry: 'Egg waffles, seafood fried rice',
      kidFriendly: 4,
      hours: '11:00-21:00',
      notes: 'Combine with Big Buddha visit'
    }
  ]
};

const chinaRestaurants: FoodGuide['restaurants'] = {
  breakfast: [
    {
      name: 'Jing-A Café',
      location: 'Beijing',
      rating: 4.5,
      priceRange: '¥¥',
      highlights: ['Western breakfast', 'Great coffee'],
      mustTry: 'Avocado toast, kids pancake set',
      kidFriendly: 4,
      hours: '8:00-14:00',
      notes: 'English menu available'
    },
    {
      name: 'Fuchun Teahouse',
      location: 'Shanghai',
      rating: 4.4,
      priceRange: '¥',
      highlights: ['Traditional sweets', 'Ningbo rice cakes'],
      mustTry: 'Sesame buns, soy milk',
      kidFriendly: 3,
      hours: '6:30-12:00',
      notes: 'Great cultural start'
    }
  ],
  lunch: [
    {
      name: 'Din Tai Fung',
      location: 'Shanghai',
      rating: 4.7,
      priceRange: '¥¥¥',
      highlights: ['Legendary soup dumplings', 'Pram-friendly'],
      mustTry: 'Xiao long bao, cold cucumber',
      kidFriendly: 5,
      hours: '11:00-22:00',
      notes: 'Request coloring sheets'
    },
    {
      name: 'Grandma’s Home',
      location: 'Hangzhou / Shanghai',
      rating: 4.4,
      priceRange: '¥¥',
      highlights: ['Comfort Chinese plates', 'Huge menu'],
      mustTry: 'Honey lotus root, fried shrimp',
      kidFriendly: 4,
      hours: '10:30-21:30',
      notes: 'Expect queue weekends'
    }
  ],
  dinner: [
    {
      name: 'Haidilao Hot Pot',
      location: 'Nationwide',
      rating: 4.8,
      priceRange: '¥¥¥',
      highlights: ['Kids playroom', 'Custom broth'],
      mustTry: 'Dual broth hotpot with noodle dance show',
      kidFriendly: 5,
      hours: '10:00-2:00',
      notes: 'Ask for mild broth + aprons'
    },
    {
      name: 'Lost Heaven',
      location: 'Shanghai',
      rating: 4.6,
      priceRange: '¥¥¥'
      ,
      highlights: ['Yunnan cuisine', 'Decor wow factor'],
      mustTry: 'Tea leaf salad, soft shell crab',
      kidFriendly: 3,
      hours: '17:30-23:00',
      notes: 'Reserve upstairs booth'
    }
  ]
};

const thaiDishes: FoodGuide['dishes'] = {
  kidFriendly: [
    { name: 'Khao Pad', native: 'ข้าวผัด', desc: 'Fried rice with egg, veggies, and protein of choice', spice: 0, order: 'Mai phet (not spicy)' },
    { name: 'Gai Tod', native: 'ไก่ทอด', desc: 'Crispy Thai fried chicken', spice: 0, order: 'Serve with sticky rice' },
    { name: 'Pad See Ew', native: 'ผัดซีอิ๊ว', desc: 'Sweet soy wide noodles', spice: 0, order: 'No chili flakes' }
  ],
  mustTry: [
    { name: 'Pad Thai', native: 'ผัดไทย', desc: 'Iconic stir-fried noodles', spice: 1, order: 'With prawns, less chili' },
    { name: 'Tom Yum Goong', native: 'ต้มยำกุ้ง', desc: 'Hot & sour prawn soup', spice: 2, order: 'Nam sai (clear) for milder' }
  ],
  specialties: [
    { name: 'Moo Hong', native: ' หมูฮ้อง', desc: 'Phuket braised pork belly', spice: 1, order: 'Great with steamed rice' },
    { name: 'Hokkien Mee', native: 'หมี่ฮกเกี้ยน', desc: 'Yellow noodles with seafood', spice: 1, order: 'Soup or dry version' }
  ]
};

const hongKongDishes: FoodGuide['dishes'] = {
  kidFriendly: [
    { name: 'Pineapple Bun', native: '菠蘿包', desc: 'Sweet bun with cookie crust', spice: 0, order: 'Add butter slice for snack' },
    { name: 'Egg Waffles', native: '雞蛋仔', desc: 'Crispy bubble waffles', spice: 0, order: 'Plain or chocolate' }
  ],
  mustTry: [
    { name: 'Char Siu', native: '叉燒', desc: 'Honey glazed BBQ pork', spice: 0, order: 'Over rice or noodles' },
    { name: 'Beef Brisket Noodles', native: '牛腩麵', desc: 'Rich broth with tender beef', spice: 1, order: 'Ask for mild chili oil' }
  ],
  specialties: [
    { name: 'Egg Tarts', native: '蛋撻', desc: 'Buttery pastry with custard', spice: 0, order: 'Best warm from bakery' },
    { name: 'Typhoon Shelter Crab', native: '避風塘炒蟹', desc: 'Garlic fried crab', spice: 2, order: 'Comes with chili/garlic crumbs' }
  ]
};

const chinaDishes: FoodGuide['dishes'] = {
  kidFriendly: [
    { name: 'Scallion Pancakes', native: '葱油饼', desc: 'Crispy layered flatbread', spice: 0, order: 'Cut into wedges for sharing' },
    { name: 'Tomato Egg Stir-fry', native: '番茄炒蛋', desc: 'Sweet-savory eggs', spice: 0, order: 'Comfort food for kids' }
  ],
  mustTry: [
    { name: 'Soup Dumplings', native: '小笼包', desc: 'Broth-filled dumplings', spice: 0, order: 'Dip in black vinegar + ginger' },
    { name: 'Mapo Tofu (mild)', native: '麻婆豆腐', desc: 'Silky tofu with peppercorn sauce', spice: 2, order: 'Request less spice, extra rice' }
  ],
  specialties: [
    { name: 'Peking Duck', native: '北京烤鸭', desc: 'Crispy duck carved tableside', spice: 0, order: 'Wrap with pancakes + hoisin' },
    { name: 'Hotpot Dessert Bar', native: '火锅甜品', desc: 'Hotpot restaurants with unlimited fruit/dessert', spice: 0, order: 'Pick mild broth for kids' }
  ]
};

const thaiPhrases: FoodGuide['phrases'] = {
  essential: [
    { native: 'ไม่เผ็ด', phonetic: 'Mai phet', english: 'Not spicy', usage: 'Magic words for kids' },
    { native: 'ไม่ใส่พริก', phonetic: 'Mai sai prik', english: 'No chili', usage: 'Use in all orders' },
    { native: 'อร่อย', phonetic: 'Aroy', english: 'Delicious', usage: 'Servers love hearing this' }
  ],
  dietary: [
    { native: 'ไม่กินหมู', phonetic: 'Mai gin moo', english: 'No pork', usage: 'Halal families' },
    { native: 'แพ้ถั่ว', phonetic: 'Pae tua', english: 'Peanut allergy', usage: 'Vital for satay dishes' }
  ]
};

const cantonesePhrases: FoodGuide['phrases'] = {
  essential: [
    { native: '唔好辣', phonetic: 'm̀h hóu laat', english: 'Not spicy please', usage: 'Say for every dish' },
    { native: '多謝晒', phonetic: 'dō jeh saai', english: 'Thanks very much', usage: 'Polite exit' }
  ],
  dietary: [
    { native: '我對花生敏感', phonetic: 'ngóh deui fāsāng máhngám', english: 'I am allergic to peanuts', usage: 'Show on phone' },
    { native: '唔好落豉油', phonetic: 'm̀h hóu lohk sihyàuh', english: 'No soy sauce', usage: 'For sodium-sensitive' }
  ]
};

const mandarinPhrases: FoodGuide['phrases'] = {
  essential: [
    { native: '不辣', phonetic: 'bú là', english: 'Not spicy', usage: 'Key for kids plates' },
    { native: '谢谢', phonetic: 'xièxie', english: 'Thank you', usage: 'Always appreciated' }
  ],
  dietary: [
    { native: '我对花生过敏', phonetic: 'wǒ duì huāshēng guòmǐn', english: 'Peanut allergy', usage: 'Show card to staff' },
    { native: '不要味精', phonetic: 'bú yào wèijīng', english: 'No MSG', usage: 'For sensitive travelers' }
  ]
};

const thaiQuickTips = [
  'Order rice/noodles first for hungry kids',
  '"Mai phet" keeps dishes mild',
  'Street food peaks 5–8pm',
  '7-Eleven always has familiar snacks',
  'Hotel buffets are sanity savers'
];

const hkQuickTips = [
  'Most spots add 10% service—no extra tip needed',
  'Bring Octopus cards for MTR, trams, and 7-Eleven',
  'Ask for “siew lat” (less spicy) in Cantonese',
  'Tea restaurants move fast—order as soon as you sit',
  'Book Sunday dim sum early or expect queues'
];

const cnQuickTips = [
  'Scan QR menus often offer English toggles',
  'Keep tissues/napkins handy—restaurants rarely provide them',
  'Use translation cards for allergies',
  'Highchairs are available but limited—call ahead',
  'Carry cashless apps (Alipay/WeChat) for most payments'
];

const thaiEmergency = [
  '7-Eleven: toasties, yogurt, fruit',
  'McDonald’s: Central Festival + delivery',
  'Pizza Company delivers everywhere',
  'Hotel room service = reliable western food'
];

const hkEmergency = [
  'Pret / Starbucks: sandwiches + familiar snacks',
  'CitySuper food halls: sushi, pasta, salads',
  'PizzaExpress / Paisano’s for fast pizza',
  'Maxim’s MX for rice bowls + soup'
];

const cnEmergency = [
  'FamilyMart / Lawson for buns & fruit',
  'Element Fresh / Wagas for salads & pasta',
  'McDonald’s & KFC widely deliver via Meituan',
  'Hotel executive lounge for picky eaters'
];

const thaiSpecials = [
  { day: 'Monday', special: 'Malin Plaza street food crawl', dish: 'Moo ping (grilled pork skewers)' },
  { day: 'Wednesday', special: 'Locking Market breakfast', dish: 'Dim sum plus Thai donuts' },
  { day: 'Sunday', special: 'Old Town walking street', dish: 'Oh ew (oyster omelet)' }
];

const hkSpecials = [
  { day: 'Monday', special: 'Temple Street snacks at dusk', dish: 'Claypot rice + skewers' },
  { day: 'Friday', special: 'Central lunch set deals', dish: 'Roast goose at Yung Kee' },
  { day: 'Sunday', special: 'Tai O weekend trip', dish: 'Shrimp paste fried rice' }
];

const cnSpecials = [
  { day: 'Tuesday', special: 'Hotpot night (weekday promos)', dish: 'Mild tomato broth for kids' },
  { day: 'Thursday', special: 'Evening stroll on Nanjing Road', dish: 'Freshly made soup dumplings' },
  { day: 'Saturday', special: 'Family brunch at panda cafe', dish: 'Sichuan-less spicy set' }
];

export const FOOD_GUIDES: Record<string, FoodGuide> = {
  TH: {
    restaurants: thaiRestaurants,
    dishes: thaiDishes,
    phrases: thaiPhrases,
    quickTips: thaiQuickTips,
    emergencyEats: thaiEmergency,
    dailySpecials: thaiSpecials
  },
  HK: {
    restaurants: hongKongRestaurants,
    dishes: hongKongDishes,
    phrases: cantonesePhrases,
    quickTips: hkQuickTips,
    emergencyEats: hkEmergency,
    dailySpecials: hkSpecials
  },
  CN: {
    restaurants: chinaRestaurants,
    dishes: chinaDishes,
    phrases: mandarinPhrases,
    quickTips: cnQuickTips,
    emergencyEats: cnEmergency,
    dailySpecials: cnSpecials
  }
};

export const getFoodGuide = (iso2: string): FoodGuide => {
  return FOOD_GUIDES[iso2] || FOOD_GUIDES.TH;
};

export const getKidChecklistGuide = (iso2: string): KidChecklistGuide => {
  return KID_CHECKLISTS[iso2] || KID_CHECKLISTS.TH;
};

const COUNTRY_APPS: Record<string, EssentialApp[]> = {
  TH: [
    { name: 'Grab', desc: 'Taxi & food delivery', icon: '🚕' },
    { name: 'Google Translate', desc: 'Thai & English voice', icon: '🗣️' },
    { name: 'XE Currency', desc: 'Live rates, offline mode', icon: '💱' },
    { name: 'LINE', desc: 'Messaging locals & vendors', icon: '💬' },
    { name: 'SRT Live', desc: 'Thai train tickets', icon: '🚆' },
    { name: 'Foodpanda', desc: 'Hotel food delivery', icon: '🍱' }
  ],
  HK: [
    { name: 'MTR Mobile', desc: 'Real-time transit info', icon: '🚇' },
    { name: 'Octopus', desc: 'Top up + card balance', icon: '💳' },
    { name: 'Citymapper', desc: 'Fastest routes & ferries', icon: '🗺️' },
    { name: 'Klook', desc: 'Attractions & queue jump', icon: '🎫' },
    { name: 'HK Weather', desc: 'HKO rain & typhoon alerts', icon: '🌧️' },
    { name: 'Foodpanda', desc: 'Hotel-friendly delivery', icon: '🍣' }
  ],
  CN: [
    { name: 'Didi', desc: 'Ride-hailing (English mode)', icon: '🚕' },
    { name: 'WeChat', desc: 'Messaging + payments', icon: '💬' },
    { name: 'Alipay TourPass', desc: 'Prepaid wallet for visitors', icon: '💳' },
    { name: 'Baidu Maps', desc: 'Offline maps + transit', icon: '🗺️' },
    { name: 'Pleco', desc: 'Chinese dictionary', icon: '📘' },
    { name: 'Trip.com', desc: 'Train tickets & attractions', icon: '🚄' }
  ]
};

export const getCountryApps = (iso2: string): EssentialApp[] => {
  return COUNTRY_APPS[iso2] || COUNTRY_APPS.TH;
};

const DESTINATION_CONTACTS: Record<string, DestinationContacts> = {
  TH: {
    local: [
      { label: 'Tourist Police', number: '1155', note: '24/7 English support', icon: '👮' },
      { label: 'Medical Hotline', number: '1669', note: 'Ambulance & paramedics', icon: '🚑' },
      { label: 'Marine Police', number: '1196', note: 'Boat & island incidents', icon: '🚤' },
      { label: 'Thai Traffic Hotline', number: '1197', note: 'Road updates, taxis', icon: '🚕' }
    ],
    embassy: [
      { label: 'UK Embassy Bangkok', number: '+66 2 305 8333', note: 'Emergency line 24/7' },
      { label: 'German Embassy Bangkok', number: '+66 2 287 9000', note: 'Emergency +66 81 845 6224' }
    ]
  },
  HK: {
    local: [
      { label: 'Emergency Services', number: '999', note: 'Police, fire, ambulance', icon: '🚨' },
      { label: 'Tourist Hotline', number: '+852 2508 1234', note: 'Hong Kong Tourism Board', icon: '📞' },
      { label: 'Octopus Customer Care', number: '+852 2266 2222', note: 'Lost cards, refunds', icon: '💳' },
      { label: 'HK Taxi Hotline', number: '+852 187 2920', note: '24/7 English assistance', icon: '🚕' }
    ],
    embassy: [
      { label: 'UK Consulate Hong Kong', number: '+852 2901 3000', note: '24/7 support for Brits' },
      { label: 'German Consulate HK', number: '+852 2105 8788', note: 'Emergency +852 2105 8799' }
    ]
  },
  CN: {
    local: [
      { label: 'Police', number: '110', note: 'Nationwide emergency', icon: '👮' },
      { label: 'Ambulance', number: '120', note: 'Medical emergencies', icon: '🚑' },
      { label: 'Fire Brigade', number: '119', note: 'Report fires', icon: '🚒' },
      { label: 'Tourist Hotline', number: '12301', note: 'Mandarin / limited English', icon: '🗣️' }
    ],
    embassy: [
      { label: 'UK Embassy Beijing', number: '+86 10 5192 4000', note: '24/7 consular support' },
      { label: 'German Embassy Beijing', number: '+86 10 8532 9000', note: 'Emergency +86 139 0107 6037' }
    ]
  }
};

export const getDestinationContacts = (iso2: string): DestinationContacts => {
  return DESTINATION_CONTACTS[iso2] || DESTINATION_CONTACTS.TH;
};
