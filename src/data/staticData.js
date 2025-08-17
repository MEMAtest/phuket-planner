// src/data/staticData.js - FIXED VERSION
// Remove TypeScript imports and syntax, add missing icons

// NO TYPESCRIPT IMPORTS - Remove this line:
// import { TripData } from '../types';

// SVG Icons as React components - WITHOUT TypeScript syntax
export const Icons = {
  plane: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
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
  // ADD THIS MISSING ICON:
  x: (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

// NO TYPE ANNOTATION - Just export the object
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
