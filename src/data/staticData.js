// src/data/staticData.js - COMPLETE FILE

// SVG Icons as React components
const ICON_DEFINITIONS = {
  plane: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
    </svg>
  ),
  tripLogo: (props) => (
    <svg {...props} width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="56" height="56" rx="14" fill="#4C7DC5"/>
      <rect x="16" y="18" width="32" height="28" rx="4" fill="#FFFFFF"/>
      <path d="M22 24h14" stroke="#4C7DC5" strokeWidth="2" strokeLinecap="round"/>
      <path d="M22 30h14" stroke="#4C7DC5" strokeWidth="2" strokeLinecap="round"/>
      <path d="M22 36h10" stroke="#4C7DC5" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 18v28" stroke="#1B3D73" strokeWidth="2"/>
      <path d="M38 22l10 5-10 22" stroke="#1B3D73" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="26" cy="26" r="3" fill="#7AC27D"/>
    </svg>
  ),
  clock: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  ),
  sun: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/>
    </svg>
  ),
  cloud: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
    </svg>
  ),
  cloudRain: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>
    </svg>
  ),
  utensils: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z"/>
    </svg>
  ),
  ferrisWheel: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2"/><path d="M12 2v4"/><path d="m6.8 15.2.9 2.5"/><path d="m20.1 10.3-3-1.8"/><path d="M4.8 7.2 7.8 9"/><path d="M12 22v-4"/><path d="m17.2 8.8-.9-2.5"/><path d="m3.9 13.7 3 1.8"/><path d="m19.2 16.8-3-1.8"/>
    </svg>
  ),
  star: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  trash2: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  ),
  plusCircle: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
  calendar: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  checkSquare: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  ),
  moon: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  ),
  bookOpen: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  repeat: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>
    </svg>
  ),
  lightbulb: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
    </svg>
  ),
  flame: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
  chevronLeft: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  ),
  chevronRight: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
  chevronDown: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  alertTriangle: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  wallet: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
    </svg>
  ),
  wifi: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
    </svg>
  ),
  wifiOff: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
    </svg>
  ),
  square: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    </svg>
  ),
  x: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

const toPascalCase = (value) => value.charAt(0).toUpperCase() + value.slice(1);

export const Icons = Object.keys(ICON_DEFINITIONS).reduce((acc, key) => {
  acc[toPascalCase(key)] = ICON_DEFINITIONS[key];
  return acc;
}, {});

// Main Trip Data
export const TRIP_DATA = {
  hotel: { 
    name: "Anantara Mai Khao Phuket Villas" 
  },
  forecast: [
    { date: "2025-08-20", dow: "Wed", hi: 32, lo: 26, summary: "AM storms; PM cloudy" },
    { date: "2025-08-21", dow: "Thu", hi: 32, lo: 27, summary: "Cloudy; a little AM rain" },
    { date: "2025-08-22", dow: "Fri", hi: 33, lo: 27, summary: "Cloudy AM, brighter PM" },
    { date: "2025-08-23", dow: "Sat", hi: 32, lo: 27, summary: "Cloudy; isolated showers" },
    { date: "2025-08-24", dow: "Sun", hi: 31, lo: 25, summary: "Periods of rain" },
    { date: "2025-08-25", dow: "Mon", hi: 32, lo: 25, summary: "Rain; indoor day" },
    { date: "2025-08-26", dow: "Tue", hi: 32, lo: 26, summary: "Cloud + a little rain" },
    { date: "2025-08-27", dow: "Wed", hi: 29, lo: 25, summary: "Rainy/windy" },
    { date: "2025-08-28", dow: "Thu", hi: 29, lo: 25, summary: "Windy; showers" },
  ],
  recommendations: {
    maiKhao: [
      { 
        name: "Kin Dee Restaurant", 
        rating: 4.5, 
        type: "eat", 
        notes: "Excellent local Thai food, family-friendly.", 
        map: "https://maps.google.com/?q=Kin%20Dee%20Restaurant%20Mai%20Khao", 
        travelTime: "10-12 min drive" 
      },
      { 
        name: "Sea.Fire.Salt", 
        rating: 4.6, 
        type: "eat", 
        notes: "Upscale beachfront BBQ at Anantara.", 
        map: "https://maps.google.com/?q=Sea.Fire.Salt%20Anantara%20Mai%20Khao", 
        travelTime: "On-site" 
      },
      { 
        name: "Black Ginger", 
        rating: 4.7, 
        type: "eat", 
        notes: "Michelin-rated, unique dining experience.", 
        map: "https://maps.google.com/?q=Black%20Ginger%20Phuket", 
        travelTime: "20 min drive" 
      },
      { 
        name: "Soi Dog Foundation", 
        rating: 4.8, 
        type: "activity", 
        notes: "Visit the animal sanctuary (book tour).", 
        map: "https://maps.google.com/?q=Soi%20Dog%20Foundation%20Phuket", 
        travelTime: "10 min drive" 
      },
    ],
    oldTown: [
      { 
        name: "One Chun Cafe", 
        rating: 4.6, 
        type: "eat", 
        notes: "Famous for its crab curry; authentic cuisine.", 
        map: "https://maps.google.com/?q=One%20Chun%20Cafe%20%26%20Restaurant%20Phuket", 
        travelTime: "45-60 min drive" 
      },
      { 
        name: "Raya Restaurant", 
        rating: 4.4, 
        type: "eat", 
        notes: "A Phuket institution in a heritage house.", 
        map: "https://maps.google.com/?q=Raya%20Restaurant%20Phuket", 
        travelTime: "45-60 min drive" 
      },
      { 
        name: "The Torry's Ice Cream", 
        rating: 4.6, 
        type: "eat", 
        notes: "Boutique ice cream with local flavors.", 
        map: "https://maps.google.com/?q=The%20Torry%27s%20Ice%20Cream%20Phuket", 
        travelTime: "45-60 min drive" 
      },
      { 
        name: "Phuket 3D Museum", 
        rating: 4.2, 
        type: "activity", 
        notes: "Fun indoor trick-eye museum.", 
        map: "https://maps.google.com/?q=Phuket%203D%20Museum", 
        travelTime: "45-60 min drive" 
      },
    ]
  },
  initialPlan: [
    { 
      date: "2025-08-20", 
      dow: "Wed", 
      blocks: [
        { id: 1, time: "10:50", title: "Land at HKT", type: "travel" }, 
        { id: 2, time: "12:30", title: "Arrive at Anantara Mai Khao", type: "travel" },
        { id: 3, time: "16:00", title: "Jakka Kids' Club", type: "indoor" }, 
        { id: 4, time: "18:00", title: "Dinner at Kin Dee", type: "eat" },
      ], 
      location: "maiKhao" 
    },
    { 
      date: "2025-08-21", 
      dow: "Thu", 
      blocks: [
        { id: 5, time: "10:15", title: "Mai Khao Marine Turtle Foundation", type: "indoor" }, 
        { id: 6, time: "12:00", title: "Nap Time", type: "nap" },
        { id: 7, time: "16:00", title: "Resort Pool & Bikes", type: "outdoor" },
      ], 
      location: "maiKhao" 
    },
    { 
      date: "2025-08-22", 
      dow: "Fri", 
      blocks: [
        { id: 8, time: "10:00", title: "Splash Jungle Water Park", type: "mixed" }, 
        { id: 9, time: "12:30", title: "Nap Time", type: "nap" },
        { id: 10, time: "17:30", title: "Casual Seafood Dinner", type: "eat" },
      ], 
      location: "maiKhao" 
    },
    { 
      date: "2025-08-23", 
      dow: "Sat", 
      blocks: [
        { id: 11, time: "09:00", title: "Sirinat National Park / Nai Yang", type: "outdoor" }, 
        { id: 12, time: "12:00", title: "Nap Time", type: "nap" },
        { id: 13, time: "16:30", title: "Kids' Club Craft / Villa Pool", type: "indoor" },
      ], 
      location: "maiKhao" 
    },
    { 
      date: "2025-08-24", 
      dow: "Sun", 
      blocks: [
        { id: 14, time: "09:00", title: "Easy Villa Morning", type: "indoor" }, 
        { id: 15, time: "12:00", title: "Nap Time", type: "nap" },
        { id: 16, time: "16:30", title: "Phuket Old Town Sunday Walking St", type: "outdoor" },
      ], 
      location: "oldTown" 
    },
    { 
      date: "2025-08-25", 
      dow: "Mon", 
      blocks: [
        { id: 17, time: "09:30", title: "Blue Tree Adventure Village (Indoor)", type: "indoor" }, 
        { id: 18, time: "12:15", title: "Nap Time", type: "nap" },
        { id: 19, time: "16:00", title: "Turtle Village Stroll", type: "mixed" },
      ], 
      location: "maiKhao" 
    },
    { 
      date: "2025-08-26", 
      dow: "Tue", 
      blocks: [
        { id: 20, time: "10:00", title: "Aquaria Phuket", type: "indoor" }, 
        { id: 21, time: "13:30", title: "Nap Time", type: "nap" },
      ], 
      location: "oldTown" 
    },
    { 
      date: "2025-08-27", 
      dow: "Wed", 
      blocks: [
        { id: 22, time: "09:00", title: "Kids' Club / Indoor Play", type: "indoor" }, 
        { id: 23, time: "12:00", title: "Nap Time", type: "nap" },
        { id: 24, time: "16:00", title: "Pool when dry", type: "outdoor" },
      ], 
      location: "maiKhao" 
    },
    { 
      date: "2025-08-28", 
      dow: "Thu", 
      blocks: [
        { id: 25, time: "09:00", title: "Final Pool / Kids' Club", type: "indoor" }, 
        { id: 26, time: "11:30", title: "Short Nap", type: "nap" },
        { id: 27, time: "17:30", title: "Depart for HKT Airport", type: "travel" },
      ], 
      location: "maiKhao" 
    },
  ],
  foodData: {
    kidFriendly: [
      { 
        name: "Khao Pad", 
        thai: "ข้าวผัด", 
        desc: "Classic fried rice with egg, veg, and a choice of chicken, pork, or shrimp. A guaranteed winner.", 
        spice: 0 
      },
      { 
        name: "Gai Tod", 
        thai: "ไก่ทอด", 
        desc: "Thai-style fried chicken is crispy, juicy, and universally loved by kids.", 
        spice: 0 
      },
      { 
        name: "Chicken Satay", 
        thai: "สะเต๊ะไก่", 
        desc: "Grilled chicken skewers with a mild, sweet peanut dipping sauce.", 
        spice: 0 
      },
      { 
        name: "Pad See Ew", 
        thai: "ผัดซีอิ๊ว", 
        desc: "Wide rice noodles stir-fried in a sweet soy sauce with egg and greens. Not spicy.", 
        spice: 0 
      },
    ],
    phuketSpecialties: [
      { 
        name: "Moo Hong", 
        thai: "หมูฮ้อง", 
        desc: "A signature dish of Phuket, this is a sweet and savory stew of pork belly slow-cooked with garlic, pepper, and soy sauce.", 
        spice: 1 
      },
      { 
        name: "Gaeng Som Pla", 
        thai: "แกงส้มปลา", 
        desc: "A fiery and sour fish curry. It's a staple of Southern Thai cuisine, known for its bold, complex flavors.", 
        spice: 3 
      },
      { 
        name: "Nam Prik Goong Siap", 
        thai: "น้ำพริกกุ้งเสียบ", 
        desc: "A powerful chili dipping sauce made with smoked shrimp, served with a platter of fresh, crunchy vegetables.", 
        spice: 2 
      },
      { 
        name: "Hokkien Mee", 
        thai: "หมี่ฮกเกี้ยน", 
        desc: "A Phuket specialty with Chinese origins. Stir-fried yellow noodles with seafood, pork, and a savory broth.", 
        spice: 1 
      },
    ]
  },
  jetLagTasks: [
    { 
      id: 'jl1', 
      title: 'Pre-Flight Prep', 
      text: 'For 2-3 days before you fly, shift bedtime 30 mins earlier each night.', 
      nudge: 'Great start! A little prep goes a long way.' 
    },
    { 
      id: 'jl2', 
      title: 'On the Plane', 
      text: 'Keep kids awake for the first 90 mins. Aim for a main sleep block that aligns with Phuket\'s night (e.g., 19:00 - 05:00 Phuket time).', 
      nudge: 'You\'re on Phuket time now! Well done.' 
    },
    { 
      id: 'jl3', 
      title: 'Arrival Strategy', 
      text: 'Wake them 60-90 mins before landing in Singapore. Keep them awake on the short SIN-HKT flight. Aim for a short, early nap at the hotel (e.g., 12:30-14:00).', 
      nudge: 'Almost there! That short nap will be key.' 
    },
    { 
      id: 'jl4', 
      title: 'Embrace Local Time', 
      text: 'Immediately switch to Phuket time for meals and sleep.', 
      nudge: 'Perfect. Sticking to local time is the fastest way to adjust.' 
    },
    { 
      id: 'jl5', 
      title: 'Morning Light', 
      text: 'Get outside into the daylight as soon as possible after waking up. This is crucial for resetting body clocks.', 
      nudge: 'Yes! Sunlight is the best signal for your brain.' 
    },
    { 
      id: 'jl6', 
      title: 'Strategic Naps', 
      text: 'Stick to a consistent nap time (e.g., 12:00-14:00) and cap it at 2 hours to preserve nighttime sleep.', 
      nudge: 'Good discipline. This will help them sleep through the night.' 
    },
  ],
  phuketFacts: [
    "Phuket is Thailand's largest island, roughly the same size as Singapore.",
    "The name 'Phuket' is derived from the Malay word 'bukit,' which means 'hill.'",
    "Phuket was a major trading hub for tin, which brought Chinese and European influences still visible in the Old Town's architecture.",
    "The island was featured in the 1974 James Bond film 'The Man with the Golden Gun,' making 'James Bond Island' (Khao Phing Kan) a famous landmark.",
    "The annual Vegetarian Festival in October is a major cultural event, known for its elaborate ceremonies and extreme piercings.",
    "Mai Khao Beach, where your hotel is located, is the longest beach in Phuket, stretching for 11 kilometers.",
    "Sea turtles nest on several of Phuket's beaches, including Mai Khao, which is why conservation is so important here.",
    "The 'Big Buddha' of Phuket is 45 meters tall and made of Burmese white jade marble.",
    "Phuket's Old Town is famous for its Sino-Portuguese architecture, a blend of Chinese and European styles.",
    "The island was devastated by the 2004 Indian Ocean tsunami but has since made a remarkable recovery."
  ]
};

// Thai Phrases - Organized by context
export const THAI_PHRASES = {
  greetings: [
    { thai: "สวัสดีครับ/ค่ะ", phonetic: "Sawadee krap/ka", english: "Hello", audio: "sawadee" },
    { thai: "ขอบคุณครับ/ค่ะ", phonetic: "Khob khun krap/ka", english: "Thank you", audio: "khobkhun" },
    { thai: "ขอโทษครับ/ค่ะ", phonetic: "Khor thot krap/ka", english: "Sorry/Excuse me", audio: "khorthot" },
    { thai: "ลาก่อน", phonetic: "Laa gorn", english: "Goodbye", audio: "laagorn" },
    { thai: "ไม่เป็นไร", phonetic: "Mai pen rai", english: "No problem/It's okay", audio: "maipenrai" }
  ],
  
  kidsNeeds: [
    { thai: "ห้องน้ำอยู่ที่ไหน", phonetic: "Hong nam yuu tee nai?", english: "Where is the bathroom?", audio: "hongnam" },
    { thai: "น้ำดื่ม", phonetic: "Nam deum", english: "Drinking water", audio: "namdeum" },
    { thai: "เด็กเล็ก", phonetic: "Dek lek", english: "Small child", audio: "deklek" },
    { thai: "นมสำหรับเด็ก", phonetic: "Nom sam-rap dek", english: "Milk for children", audio: "nom" },
    { thai: "ผ้าอ้อม", phonetic: "Paa om", english: "Diaper", audio: "paaom" },
    { thai: "เก้าอี้เด็ก", phonetic: "Gao-ee dek", english: "High chair", audio: "gaoeedek" },
    { thai: "อาหารเด็ก", phonetic: "Aa-haan dek", english: "Kids meal", audio: "ahaandek" }
  ],
  
  restaurant: [
    { thai: "ไม่เผ็ด", phonetic: "Mai phet", english: "Not spicy (MOST IMPORTANT!)", audio: "maiphet" },
    { thai: "ไม่ใส่พริก", phonetic: "Mai sai prik", english: "No chili please", audio: "maisaiprik" },
    { thai: "เช็คบิล", phonetic: "Check bin", english: "Bill please", audio: "checkbin" },
    { thai: "อร่อย", phonetic: "Aroy", english: "Delicious", audio: "aroy" },
    { thai: "น้ำเปล่า", phonetic: "Nam plao", english: "Plain water", audio: "namplao" },
    { thai: "ข้าวเปล่า", phonetic: "Khao plao", english: "Plain rice", audio: "khaoplao" },
    { thai: "ไก่", phonetic: "Gai", english: "Chicken", audio: "gai" },
    { thai: "หมู", phonetic: "Moo", english: "Pork", audio: "moo" },
    { thai: "ไม่ใส่ถั่ว", phonetic: "Mai sai tua", english: "No peanuts", audio: "maisaitua" }
  ],
  
  shopping: [
    { thai: "เท่าไหร่", phonetic: "Thao rai?", english: "How much?", audio: "thaorai" },
    { thai: "แพงไป", phonetic: "Phaeng pai", english: "Too expensive", audio: "phaengpai" },
    { thai: "ลดหน่อยได้ไหม", phonetic: "Lot noi dai mai?", english: "Can you reduce?", audio: "lotnoi" },
    { thai: "เอาอันนี้", phonetic: "Ao an nee", english: "I'll take this", audio: "aoannee" },
    { thai: "ไม่เอา", phonetic: "Mai ao", english: "I don't want it", audio: "maiao" },
    { thai: "ดูอย่างอื่น", phonetic: "Doo yang uen", english: "Looking at others", audio: "dooyanguen" }
  ],
  
  directions: [
    { thai: "ไปที่ไหน", phonetic: "Pai tee nai?", english: "Where to go?", audio: "paitienai" },
    { thai: "ตรงไป", phonetic: "Trong pai", english: "Go straight", audio: "trongpai" },
    { thai: "เลี้ยวซ้าย", phonetic: "Liao sai", english: "Turn left", audio: "liaosai" },
    { thai: "เลี้ยวขวา", phonetic: "Liao kwaa", english: "Turn right", audio: "liaokwaa" },
    { thai: "หยุดที่นี่", phonetic: "Yut tee nee", english: "Stop here", audio: "yuttienee" },
    { thai: "ไกลไหม", phonetic: "Glai mai?", english: "Is it far?", audio: "glaimai" }
  ],
  
  emergency: [
    { thai: "ช่วยด้วย", phonetic: "Chuay duay!", english: "Help!", audio: "chuayduay" },
    { thai: "หมอ", phonetic: "Mor", english: "Doctor", audio: "mor" },
    { thai: "โรงพยาบาล", phonetic: "Rong phayabaan", english: "Hospital", audio: "rongphayabaan" },
    { thai: "ตำรวจ", phonetic: "Tam-ruat", english: "Police", audio: "tamruat" },
    { thai: "เจ็บ", phonetic: "Jeb", english: "Hurt/Pain", audio: "jeb" },
    { thai: "แพ้", phonetic: "Phae", english: "Allergic", audio: "phae" }
  ],
  
  activities: [
    { thai: "ชายหาด", phonetic: "Chai haad", english: "Beach", audio: "chaihaad" },
    { thai: "สระว่ายน้ำ", phonetic: "Sa waai nam", english: "Swimming pool", audio: "sawaainam" },
    { thai: "ช้าง", phonetic: "Chang", english: "Elephant", audio: "chang" },
    { thai: "วัด", phonetic: "Wat", english: "Temple", audio: "wat" },
    { thai: "ตลาด", phonetic: "Talaat", english: "Market", audio: "talaat" }
  ]
};

const CANTONESE_PHRASES = {
  greetings: [
    { native: "你好", phonetic: "néih hóu", english: "Hello" },
    { native: "唔該", phonetic: "m̀hgōi", english: "Please / thank you (service)" },
    { native: "多謝晒", phonetic: "dō jeh saai", english: "Thank you very much" },
    { native: "早晨", phonetic: "jóu sàn", english: "Good morning" }
  ],
  kidsNeeds: [
    { native: "兒童餐有冇呀？", phonetic: "yìh tùhng chāan yáuh móuh a?", english: "Do you have a kids meal?" },
    { native: "可唔可以比張兒童椅?", phonetic: "hó m̀h hó yí béi jēung yìh tùhng yí?", english: "Can we get a high chair?" },
    { native: "要暖水沖奶", phonetic: "yiu nyuhn séui chūng náaih", english: "We need warm water for milk" }
  ],
  restaurant: [
    { native: "唔好辣", phonetic: "m̀h hóu laat", english: "Not spicy, please" },
    { native: "唔該要中文餐牌", phonetic: "m̀hgōi yiu jūngmàhn chāan pàaih", english: "Can I see the Chinese menu?" },
    { native: "埋單", phonetic: "màaih dāan", english: "Bill, please" },
    { native: "好味", phonetic: "hóu méih", english: "It's delicious" }
  ],
  shopping: [
    { native: "幾錢呀？", phonetic: "géi chín a?", english: "How much is it?" },
    { native: "平啲啦", phonetic: "pèng dī lā", english: "Cheaper, please" },
    { native: "可以刷卡嗎？", phonetic: "hó yí saat kāat maa?", english: "Can I pay by card?" }
  ],
  directions: [
    { native: "點樣去地鐵站？", phonetic: "dím yéung heui deih tit jaahm?", english: "How do I get to the MTR?" },
    { native: "喺邊度落車？", phonetic: "háai bīn dou lohk chē?", english: "Where should we get off?" },
    { native: "車返酒店", phonetic: "chē fāan jáu dim", english: "Drive us back to the hotel" }
  ],
  emergency: [
    { native: "我個小朋友唔見咗", phonetic: "ngóh go síu pàhng yáuh m̀h gin jó", english: "I've lost my child" },
    { native: "可唔可以幫我搵醫生？", phonetic: "hó m̀h hó yí bōng ngóh wán yīsāng?", english: "Can you call a doctor?" },
    { native: "報警", phonetic: "bou gíng", english: "Call the police" }
  ],
  activities: [
    { native: "我哋想去迪士尼", phonetic: "ngóh deih séung heui dihk sì nèih", english: "We want to go to Disneyland" },
    { native: "想坐纜車", phonetic: "séung chó laahm chē", english: "We want to take the cable car" },
    { native: "影相得唔得？", phonetic: "yíng séung dāk m̀h dāk?", english: "Can we take a photo?" }
  ]
};

const MANDARIN_PHRASES = {
  greetings: [
    { native: "你好", phonetic: "nǐ hǎo", english: "Hello" },
    { native: "谢谢", phonetic: "xièxie", english: "Thank you" },
    { native: "不好意思", phonetic: "bù hǎo yìsi", english: "Excuse me / sorry" },
    { native: "再见", phonetic: "zàijiàn", english: "Goodbye" }
  ],
  kidsNeeds: [
    { native: "请问有儿童餐吗？", phonetic: "qǐngwèn yǒu értóng cān ma?", english: "Do you have a kids meal?" },
    { native: "可以给我儿童座椅吗？", phonetic: "kěyǐ gěi wǒ értóng zuòyǐ ma?", english: "Can we get a high chair?" },
    { native: "能不能帮我加热奶？", phonetic: "néng bù néng bāng wǒ jiārè nǎi?", english: "Could you warm the milk?" }
  ],
  restaurant: [
    { native: "不要辣", phonetic: "bú yào là", english: "Not spicy, please" },
    { native: "请给我中文菜单", phonetic: "qǐng gěi wǒ zhōngwén càidān", english: "Chinese menu, please" },
    { native: "买单", phonetic: "mǎidān", english: "Bill, please" },
    { native: "很好吃", phonetic: "hěn hǎo chī", english: "It's delicious" }
  ],
  shopping: [
    { native: "这个多少钱？", phonetic: "zhège duōshǎo qián?", english: "How much is this?" },
    { native: "可以便宜一点吗？", phonetic: "kěyǐ piányí yīdiǎn ma?", english: "Can it be cheaper?" },
    { native: "可以刷卡吗？", phonetic: "kěyǐ shuākǎ ma?", english: "Can I pay by card?" }
  ],
  directions: [
    { native: "地铁站在哪里？", phonetic: "dìtiě zhàn zài nǎlǐ?", english: "Where is the subway station?" },
    { native: "请在这儿停车", phonetic: "qǐng zài zhèr tíngchē", english: "Please stop here" },
    { native: "离这里远吗？", phonetic: "lí zhèlǐ yuǎn ma?", english: "Is it far from here?" }
  ],
  emergency: [
    { native: "我孩子不见了", phonetic: "wǒ háizi bújiàn le", english: "My child is missing" },
    { native: "请帮我叫医生", phonetic: "qǐng bāng wǒ jiào yīshēng", english: "Please call a doctor" },
    { native: "报警", phonetic: "bàojǐng", english: "Call the police" }
  ],
  activities: [
    { native: "我们想去长城", phonetic: "wǒmen xiǎng qù chángchéng", english: "We want to visit the Great Wall" },
    { native: "可以预约导游吗？", phonetic: "kěyǐ yùyuē dǎoyóu ma?", english: "Can we book a guide?" },
    { native: "儿童票有优惠吗？", phonetic: "értóng piào yǒu yōuhuì ma?", english: "Is there a kids' ticket price?" }
  ]
};

const DEFAULT_PHRASE_ORDER = [
  'greetings',
  'restaurant',
  'kidsNeeds',
  'shopping',
  'directions',
  'emergency',
  'activities'
];

export const PHRASE_PACKS = {
  TH: {
    title: 'Thai Phrases',
    subtitle: 'Essential Thai for Phuket adventures',
    flag: '🇹🇭',
    language: 'Thai',
    categoryOrder: DEFAULT_PHRASE_ORDER,
    phrases: THAI_PHRASES,
    tips: [
      'Add "krub" (men) or "ka" (women) for politeness.',
      'Speak slowly and smile—Thais appreciate the effort.',
      '"Mai pen rai" means "no worries" and is used constantly.'
    ]
  },
  HK: {
    title: 'Cantonese Phrases',
    subtitle: 'Handy Cantonese for Hong Kong outings',
    flag: '🇭🇰',
    language: 'Cantonese',
    categoryOrder: DEFAULT_PHRASE_ORDER,
    phrases: CANTONESE_PHRASES,
    tips: [
      'Use "m̀hgōi" for please/thank you with service staff; "dō jeh" for gifts.',
      'Tone matters, but clear slow speech is appreciated.',
      'Most locals also speak English, but trying Cantonese wins smiles.'
    ]
  },
  CN: {
    title: 'Mandarin Phrases',
    subtitle: 'Key Mandarin phrases for Mainland China',
    flag: '🇨🇳',
    language: 'Mandarin',
    categoryOrder: DEFAULT_PHRASE_ORDER,
    phrases: MANDARIN_PHRASES,
    tips: [
      'Use "qǐng" to soften requests (please).',
      'Most signage is bilingual in tourist areas, but Mandarin works best.',
      'Carry hotel cards written in Chinese for taxi drivers.'
    ]
  }
};

export const getPhrasePackForCountry = (iso2) => PHRASE_PACKS[iso2] || PHRASE_PACKS.TH;

// Price Guide for Phuket
export const PRICE_GUIDE = {
  food: {
    title: "Food & Drinks",
    items: [
      { 
        name: "Street Food Meal", 
        thb: { min: 40, max: 80, typical: 60 }, 
        gbp: { min: 0.9, max: 1.8, typical: 1.4 },
        note: "Pad Thai, fried rice, etc.",
        icon: "🍜"
      },
      { 
        name: "Local Restaurant", 
        thb: { min: 150, max: 300, typical: 200 }, 
        gbp: { min: 3.4, max: 6.8, typical: 4.5 },
        note: "Air-con, Thai menu",
        icon: "🍽️"
      },
      { 
        name: "Hotel Restaurant", 
        thb: { min: 400, max: 800, typical: 600 }, 
        gbp: { min: 9, max: 18, typical: 14 },
        note: "International cuisine",
        icon: "🏨"
      },
      { 
        name: "Kids Meal", 
        thb: { min: 100, max: 200, typical: 150 }, 
        gbp: { min: 2.3, max: 4.5, typical: 3.4 },
        note: "Most restaurants",
        icon: "🧒"
      },
      { 
        name: "Beer (Restaurant)", 
        thb: { min: 80, max: 150, typical: 100 }, 
        gbp: { min: 1.8, max: 3.4, typical: 2.3 },
        note: "Local beer",
        icon: "🍺"
      },
      { 
        name: "Fresh Coconut", 
        thb: { min: 30, max: 50, typical: 40 }, 
        gbp: { min: 0.7, max: 1.1, typical: 0.9 },
        note: "Beach/street vendor",
        icon: "🥥"
      },
      { 
        name: "Coffee", 
        thb: { min: 40, max: 120, typical: 60 }, 
        gbp: { min: 0.9, max: 2.7, typical: 1.4 },
        note: "Local cafe to Starbucks",
        icon: "☕"
      },
      { 
        name: "Ice Cream", 
        thb: { min: 25, max: 80, typical: 50 }, 
        gbp: { min: 0.6, max: 1.8, typical: 1.1 },
        note: "Street to shop",
        icon: "🍦"
      }
    ]
  },
  
  activities: {
    title: "Activities & Attractions",
    items: [
      { 
        name: "Splash Jungle Water Park", 
        thb: { adult: 1295, child: 750 }, 
        gbp: { adult: 29, child: 17 },
        note: "Full day pass",
        icon: "🏊"
      },
      { 
        name: "Phuket Aquarium", 
        thb: { adult: 180, child: 100 }, 
        gbp: { adult: 4, child: 2.3 },
        note: "Entry tickets",
        icon: "🐠"
      },
      { 
        name: "Elephant Sanctuary", 
        thb: { adult: 3000, child: 1500 }, 
        gbp: { adult: 68, child: 34 },
        note: "Half-day ethical tour",
        icon: "🐘"
      },
      { 
        name: "Beach Chair Rental", 
        thb: { typical: 100 }, 
        gbp: { typical: 2.3 },
        note: "Per chair per day",
        icon: "🏖️"
      },
      { 
        name: "Longtail Boat", 
        thb: { min: 300, max: 1500 }, 
        gbp: { min: 6.8, max: 34 },
        note: "Per hour, negotiable",
        icon: "⛵"
      },
      { 
        name: "Thai Massage (1hr)", 
        thb: { min: 300, max: 500, typical: 400 }, 
        gbp: { min: 6.8, max: 11.4, typical: 9 },
        note: "Beach vs spa",
        icon: "💆"
      },
      { 
        name: "Parasailing", 
        thb: { typical: 1500 }, 
        gbp: { typical: 34 },
        note: "10-15 minutes",
        icon: "🪂"
      },
      { 
        name: "Jet Ski Rental", 
        thb: { typical: 1500 }, 
        gbp: { typical: 34 },
        note: "30 minutes",
        icon: "🚤"
      }
    ]
  },
  
  transport: {
    title: "Transportation",
    items: [
      { 
        name: "Airport Taxi", 
        thb: { min: 600, max: 800, typical: 700 }, 
        gbp: { min: 14, max: 18, typical: 16 },
        note: "HKT to Mai Khao",
        icon: "🚕"
      },
      { 
        name: "Grab/Bolt (10km)", 
        thb: { min: 150, max: 250, typical: 200 }, 
        gbp: { min: 3.4, max: 5.7, typical: 4.5 },
        note: "App-based taxi",
        icon: "📱"
      },
      { 
        name: "Tuk-Tuk (Short)", 
        thb: { min: 200, max: 400, typical: 300 }, 
        gbp: { min: 4.5, max: 9, typical: 6.8 },
        note: "Negotiate first!",
        icon: "🛺"
      },
      { 
        name: "Songthaew", 
        thb: { typical: 30 }, 
        gbp: { typical: 0.7 },
        note: "Shared pickup truck",
        icon: "🚐"
      },
      { 
        name: "Motorbike Rental", 
        thb: { typical: 250 }, 
        gbp: { typical: 5.7 },
        note: "Per day",
        icon: "🏍️"
      },
      { 
        name: "Car Rental", 
        thb: { min: 1200, max: 2000 }, 
        gbp: { min: 27, max: 45 },
        note: "Per day with insurance",
        icon: "🚗"
      }
    ]
  },
  
  shopping: {
    title: "Shopping & Essentials",
    items: [
      { 
        name: "Sunscreen", 
        thb: { min: 300, max: 500, typical: 400 }, 
        gbp: { min: 6.8, max: 11.4, typical: 9 },
        note: "SPF 50+",
        icon: "🧴"
      },
      { 
        name: "T-Shirt (Market)", 
        thb: { min: 150, max: 250, typical: 200 }, 
        gbp: { min: 3.4, max: 5.7, typical: 4.5 },
        note: "Bargain hard!",
        icon: "👕"
      },
      { 
        name: "Diapers (Pack)", 
        thb: { min: 300, max: 400, typical: 350 }, 
        gbp: { min: 6.8, max: 9, typical: 8 },
        note: "7-Eleven/Tesco",
        icon: "👶"
      },
      { 
        name: "Water (1.5L)", 
        thb: { typical: 15 }, 
        gbp: { typical: 0.3 },
        note: "7-Eleven",
        icon: "💧"
      },
      { 
        name: "SIM Card", 
        thb: { typical: 299 }, 
        gbp: { typical: 6.8 },
        note: "7 days unlimited",
        icon: "📱"
      },
      { 
        name: "Mosquito Repellent", 
        thb: { typical: 150 }, 
        gbp: { typical: 3.4 },
        note: "DEET spray",
        icon: "🦟"
      },
      { 
        name: "Beach Toys", 
        thb: { min: 100, max: 300 }, 
        gbp: { min: 2.3, max: 6.8 },
        note: "Bucket, spade set",
        icon: "🏖️"
      },
      { 
        name: "Souvenir Magnet", 
        thb: { min: 50, max: 100 }, 
        gbp: { min: 1.1, max: 2.3 },
        note: "Night market",
        icon: "🧲"
      }
    ]
  },
  
  tips: {
    title: "Money Tips",
    items: [
      "ATMs charge 220฿ fee - withdraw larger amounts",
      "Always have cash - many places don't take cards",
      "Night markets are cheaper than day markets",
      "Bargain 30-50% off initial price at markets",
      "7-Eleven has fixed prices - no bargaining",
      "Tipping: 20-50฿ at restaurants, 20฿ for hotel staff",
      "Grab/Bolt apps show fixed prices - no negotiation needed",
      "Big C and Tesco Lotus are cheapest for supplies"
    ]
  }
};

const PRICE_GUIDE_HK = {
  food: {
    title: "Food & Drinks",
    items: [
      {
        name: "Street Stall Snack",
        hkd: { min: 25, max: 45, typical: 35 },
        gbp: { min: 2.5, max: 4.5, typical: 3.5 },
        note: "Egg waffles, fish balls",
        icon: "🥢"
      },
      {
        name: "Cha Chaan Teng Set",
        hkd: { min: 55, max: 90, typical: 70 },
        gbp: { min: 5.5, max: 9, typical: 7 },
        note: "Tea restaurant breakfast/lunch",
        icon: "🍳"
      },
      {
        name: "Dim Sum (2 people)",
        hkd: { min: 150, max: 250, typical: 200 },
        gbp: { min: 15, max: 25, typical: 20 },
        note: "Mid-range restaurant",
        icon: "🥟"
      },
      {
        name: "Specialty Coffee",
        hkd: { min: 40, max: 65, typical: 50 },
        gbp: { min: 4, max: 6.5, typical: 5 },
        note: "Central / Sheung Wan cafes",
        icon: "☕"
      },
      {
        name: "Kids Meal (Food Court)",
        hkd: { min: 50, max: 70, typical: 60 },
        gbp: { min: 5, max: 7, typical: 6 },
        note: "Mall dining levels",
        icon: "🧒"
      },
      {
        name: "Craft Beer",
        hkd: { min: 70, max: 110, typical: 90 },
        gbp: { min: 7, max: 11, typical: 9 },
        note: "Lan Kwai Fong / Central",
        icon: "🍺"
      }
    ]
  },
  activities: {
    title: "Activities & Attractions",
    items: [
      {
        name: "Peak Tram Return",
        hkd: { adult: 88, child: 44 },
        gbp: { adult: 8.8, child: 4.4 },
        note: "Includes Sky Terrace 428",
        icon: "🚋"
      },
      {
        name: "Ngong Ping Cable Car",
        hkd: { adult: 235, child: 110 },
        gbp: { adult: 23.5, child: 11 },
        note: "Crystal cabin round-trip",
        icon: "🚠"
      },
      {
        name: "Star Ferry Ride",
        hkd: { typical: 5 },
        gbp: { typical: 0.5 },
        note: "Tsim Sha Tsui ↔ Central",
        icon: "⛴️"
      },
      {
        name: "Disneyland 1-Day",
        hkd: { adult: 799, child: 589 },
        gbp: { adult: 79.9, child: 58.9 },
        note: "Standard season pricing",
        icon: "🏰"
      },
      {
        name: "sky100 Observation Deck",
        hkd: { adult: 198, child: 98 },
        gbp: { adult: 19.8, child: 9.8 },
        note: "Online advance ticket",
        icon: "🌆"
      },
      {
        name: "Museums (Joint Pass)",
        hkd: { typical: 30 },
        gbp: { typical: 3 },
        note: "Science + Space Museum combo",
        icon: "🧪"
      }
    ]
  },
  transport: {
    title: "Transportation",
    items: [
      {
        name: "Airport Express (to Central)",
        hkd: { typical: 120 },
        gbp: { typical: 12 },
        note: "Adult single journey",
        icon: "🚈"
      },
      {
        name: "MTR Ride",
        hkd: { min: 12, max: 25, typical: 18 },
        gbp: { min: 1.2, max: 2.5, typical: 1.8 },
        note: "Depends on distance",
        icon: "🚇"
      },
      {
        name: "Taxi (5km)",
        hkd: { typical: 80 },
        gbp: { typical: 8 },
        note: "Red urban taxi",
        icon: "🚕"
      },
      {
        name: "Tram Ride",
        hkd: { typical: 3 },
        gbp: { typical: 0.3 },
        note: "Hong Kong Island ding ding",
        icon: "🚊"
      },
      {
        name: "Ferry to Outlying Islands",
        hkd: { min: 18, max: 35, typical: 25 },
        gbp: { min: 1.8, max: 3.5, typical: 2.5 },
        note: "Central ⇄ Cheung Chau",
        icon: "🛥️"
      },
      {
        name: "Octopus Top-up",
        hkd: { typical: 100 },
        gbp: { typical: 10 },
        note: "Recommended starter value",
        icon: "💳"
      }
    ]
  },
  shopping: {
    title: "Shopping & Essentials",
    items: [
      {
        name: "Octopus Card Deposit",
        hkd: { typical: 50 },
        gbp: { typical: 5 },
        note: "Refundable when returned",
        icon: "🪪"
      },
      {
        name: "Prepaid SIM (5-7 days)",
        hkd: { typical: 88 },
        gbp: { typical: 8.8 },
        note: "Unlimited local data",
        icon: "📶"
      },
      {
        name: "Diapers (medium pack)",
        hkd: { typical: 130 },
        gbp: { typical: 13 },
        note: "CitySuper / ParknShop",
        icon: "🧷"
      },
      {
        name: "Bottled Water 1L",
        hkd: { typical: 10 },
        gbp: { typical: 1 },
        note: "Convenience stores",
        icon: "💧"
      },
      {
        name: "Souvenir Magnet",
        hkd: { min: 30, max: 60, typical: 45 },
        gbp: { min: 3, max: 6, typical: 4.5 },
        note: "Temple Street / Stanley",
        icon: "🧲"
      },
      {
        name: "USB Fan / Gadget",
        hkd: { min: 80, max: 120, typical: 100 },
        gbp: { min: 8, max: 12, typical: 10 },
        note: "Sham Shui Po gadget streets",
        icon: "💡"
      }
    ]
  },
  tips: {
    title: "Money Tips",
    items: [
      "Load an Octopus card for MTR, buses, ferries, and convenience stores.",
      "Free tap-water refills are rare—carry a bottle or buy at 7-Eleven.",
      "Most small shops accept cash or Octopus only—carry some HK$.",
      "Taxis accept cash only; bring coins for exact change.",
      "Bargaining works at street markets but not in malls.",
      "Weekday lunch sets are far cheaper than hotel buffets."
    ]
  }
};

const PRICE_GUIDE_CN = {
  food: {
    title: "Food & Drinks",
    items: [
      {
        name: "Street Noodles",
        cny: { min: 12, max: 20, typical: 16 },
        gbp: { min: 1.3, max: 2.2, typical: 1.7 },
        note: "Breakfast stalls & night markets",
        icon: "🍜"
      },
      {
        name: "Hotpot Dinner (per person)",
        cny: { min: 120, max: 200, typical: 160 },
        gbp: { min: 13, max: 22, typical: 18 },
        note: "Chongqing / Sichuan style",
        icon: "🔥"
      },
      {
        name: "Dumpling Basket",
        cny: { min: 25, max: 40, typical: 30 },
        gbp: { min: 2.7, max: 4.3, typical: 3.3 },
        note: "Shanghai soup dumplings",
        icon: "🥟"
      },
      {
        name: "Specialty Coffee",
        cny: { min: 28, max: 38, typical: 32 },
        gbp: { min: 3, max: 4.1, typical: 3.5 },
        note: "Boutique cafes in Tier-1 cities",
        icon: "☕"
      },
      {
        name: "Kids Meal (Western chain)",
        cny: { min: 35, max: 50, typical: 45 },
        gbp: { min: 3.8, max: 5.4, typical: 4.8 },
        note: "McDonald's / KFC",
        icon: "🍔"
      },
      {
        name: "Bubble Tea",
        cny: { min: 15, max: 25, typical: 20 },
        gbp: { min: 1.6, max: 2.7, typical: 2.2 },
        note: "HeyTea / Mixue",
        icon: "🧋"
      }
    ]
  },
  activities: {
    title: "Activities & Attractions",
    items: [
      {
        name: "Forbidden City Ticket",
        cny: { adult: 60, child: 30 },
        gbp: { adult: 6.5, child: 3.2 },
        note: "Advance booking required",
        icon: "🏯"
      },
      {
        name: "Shanghai Tower Observation",
        cny: { adult: 180, child: 90 },
        gbp: { adult: 19.5, child: 9.8 },
        note: "118th floor view",
        icon: "🏙️"
      },
      {
        name: "Panda Research Base",
        cny: { adult: 55, child: 30 },
        gbp: { adult: 6, child: 3.2 },
        note: "Chengdu ticket",
        icon: "🐼"
      },
      {
        name: "High-Speed Rail (2h route)",
        cny: { typical: 550 },
        gbp: { typical: 60 },
        note: "Shanghai ⇄ Beijing second class",
        icon: "🚄"
      },
      {
        name: "Happy Valley Theme Park",
        cny: { adult: 320, child: 240 },
        gbp: { adult: 35, child: 26 },
        note: "Peak season price",
        icon: "🎢"
      },
      {
        name: "Major Museum",
        cny: { typical: 30 },
        gbp: { typical: 3.3 },
        note: "Capital Museum / Shanghai Museum",
        icon: "🏛️"
      }
    ]
  },
  transport: {
    title: "Transportation",
    items: [
      {
        name: "Metro Ride",
        cny: { min: 3, max: 7, typical: 4 },
        gbp: { min: 0.3, max: 0.8, typical: 0.4 },
        note: "Tap with transit card / QR",
        icon: "🚇"
      },
      {
        name: "Didi (8 km ride)",
        cny: { typical: 35 },
        gbp: { typical: 3.8 },
        note: "Includes basic tolls",
        icon: "🚕"
      },
      {
        name: "Airport Taxi (Tier-1 city)",
        cny: { min: 120, max: 180, typical: 150 },
        gbp: { min: 13, max: 20, typical: 16 },
        note: "Depends on tolls & traffic",
        icon: "✈️"
      },
      {
        name: "Maglev (Shanghai)",
        cny: { adult: 50, child: 25 },
        gbp: { adult: 5.4, child: 2.7 },
        note: "One-way economy class",
        icon: "⚡"
      },
      {
        name: "Long-Distance Coach (per seat)",
        cny: { typical: 160 },
        gbp: { typical: 17.4 },
        note: "2-3 hour intercity route",
        icon: "🚌"
      }
    ]
  },
  shopping: {
    title: "Shopping & Essentials",
    items: [
      {
        name: "SIM or eSIM (7 days)",
        cny: { typical: 60 },
        gbp: { typical: 6.5 },
        note: "Unlimited local data",
        icon: "📱"
      },
      {
        name: "Power Bank",
        cny: { min: 90, max: 150, typical: 110 },
        gbp: { min: 9.8, max: 16.3, typical: 12 },
        note: "Xiaomi / Anker 10000mAh",
        icon: "🔋"
      },
      {
        name: "Bottled Water 500ml",
        cny: { typical: 3 },
        gbp: { typical: 0.3 },
        note: "FamilyMart / Lawson",
        icon: "💧"
      },
      {
        name: "Diapers (medium pack)",
        cny: { typical: 90 },
        gbp: { typical: 9.8 },
        note: "Ole / Walmart",
        icon: "🍼"
      },
      {
        name: "Tea Gift Set",
        cny: { min: 160, max: 260, typical: 200 },
        gbp: { min: 17, max: 28, typical: 22 },
        note: "West Lake green tea",
        icon: "🍵"
      }
    ]
  },
  tips: {
    title: "Money Tips",
    items: [
      "Mobile payments dominate—set up Alipay/WeChat Pay or carry cash.",
      "Keep your passport handy for hotel check-in and SIM purchases.",
      "Taxi receipts (发票) help reclaim lost items or file complaints.",
      "Most attractions require advance real-name booking—plan ahead.",
      "Carry tissues; many public restrooms lack paper.",
      "Stick to bottled drinks for kids when outside major hotels."
    ]
  }
};

export const PRICE_GUIDES = {
  TH: {
    title: 'Phuket Price Guide',
    subtitle: 'Average prices for August 2025 • £1 ≈ ฿44',
    currency: 'THB',
    homeCurrency: 'GBP',
    localLabel: '฿ THB',
    homeLabel: '£ GBP',
    localKey: 'thb',
    homeKey: 'gbp',
    data: PRICE_GUIDE,
    quickReference: [
      { label: 'Street Food', local: '฿40-80', home: '£0.9-1.8' },
      { label: 'Taxi (10km)', local: '฿150-250', home: '£3.4-5.7' },
      { label: 'Massage (1hr)', local: '฿300-500', home: '£6.8-11.4' },
      { label: 'Beach Chair', local: '฿100', home: '£2.3' }
    ]
  },
  HK: {
    title: 'Hong Kong Price Guide',
    subtitle: 'Benchmarks for city travel • £1 ≈ HK$10',
    currency: 'HKD',
    homeCurrency: 'GBP',
    localLabel: 'HK$',
    homeLabel: '£ GBP',
    localKey: 'hkd',
    homeKey: 'gbp',
    data: PRICE_GUIDE_HK,
    quickReference: [
      { label: 'Street Snack', local: 'HK$25-45', home: '£2.5-4.5' },
      { label: 'Airport Express', local: 'HK$120', home: '£12' },
      { label: 'Peak Tram', local: 'HK$88', home: '£8.8' },
      { label: 'Octopus Top-up', local: 'HK$100', home: '£10' }
    ]
  },
  CN: {
    title: 'Mainland China Price Guide',
    subtitle: 'Typical Tier-1 city costs • £1 ≈ ¥9.2',
    currency: 'CNY',
    homeCurrency: 'GBP',
    localLabel: '¥ CNY',
    homeLabel: '£ GBP',
    localKey: 'cny',
    homeKey: 'gbp',
    data: PRICE_GUIDE_CN,
    quickReference: [
      { label: 'Metro Ride', local: '¥3-7', home: '£0.3-0.8' },
      { label: 'Bubble Tea', local: '¥15-25', home: '£1.6-2.7' },
      { label: 'Didi (8km)', local: '¥35', home: '£3.8' },
      { label: 'Panda Base', local: '¥55', home: '£6' }
    ]
  }
};

export const getPriceGuideForCountry = (iso2) => PRICE_GUIDES[iso2] || PRICE_GUIDES.TH;

// Daily Phrase Suggestions - Rotate based on activities
export const getDailyPhrases = (dayActivities, dayIndex, phraseSet = THAI_PHRASES) => {
  const phrases = [];
  const safeGet = (category, index = 0) => {
    const list = phraseSet[category]?.length ? phraseSet[category] : THAI_PHRASES[category] || [];
    if (!list.length) {
      return null;
    }
    return list[index % list.length];
  };
  
  const greeting = safeGet('greetings', dayIndex);
  if (greeting) {
    phrases.push(greeting);
  }
  
  if (dayActivities.some(a => a.type === 'eat')) {
    const notSpicy = safeGet('restaurant', 0);
    const tasty = safeGet('restaurant', 3);
    if (notSpicy) phrases.push(notSpicy);
    if (tasty) phrases.push(tasty);
  }
  
  if (dayActivities.some(a => a.title.toLowerCase().includes('market') || 
                             a.title.toLowerCase().includes('shopping'))) {
    const price = safeGet('shopping', 0);
    const discount = safeGet('shopping', 2);
    if (price) phrases.push(price);
    if (discount) phrases.push(discount);
  }
  
  if (dayActivities.some(a => a.title.toLowerCase().includes('beach'))) {
    const beach = safeGet('activities', 0);
    if (beach) phrases.push(beach);
  }
  
  if (dayActivities.some(a => a.title.toLowerCase().includes('elephant'))) {
    const elephant = safeGet('activities', 2);
    if (elephant) phrases.push(elephant);
  }
  
  const kids = safeGet('kidsNeeds', dayIndex);
  if (kids) phrases.push(kids);
  
  return phrases.filter(Boolean).slice(0, 5); // Return top 5 phrases for the day
};
