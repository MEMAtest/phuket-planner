# Multi-Country Trip Support, Offline PWA & Visa Checker

This document describes the three major features added in v2.0: Multi-Country Trip Support, Progressive Web App (PWA) with Offline Mode, and Visa Requirements Checker.

---

## 1. 🌍 Multi-Country Trip Support

### Overview
Plan complex itineraries spanning multiple countries with automatic visa checks, currency conversion, and country-specific features.

### Features

#### Trip Segments
- **Multiple destinations** in one trip
- **Date ranges** for each country
- **City tracking** within each segment
- **Automatic duration** calculation
- **Border crossing** visualization

#### Trip Builder UI
- **4-step wizard:**
  1. Basic Info (name, description, home currency)
  2. Segments (add countries with dates)
  3. Travelers (names, nationalities, passport info)
  4. Visa Requirements (automatic check)

#### Data Model
```typescript
type MultiCountryTrip = {
  id: string;
  name: string;
  description?: string;
  segments: TripSegment[];
  travelers: Traveler[];
  homeCurrency: string;
  budget?: Budget;
};

type TripSegment = {
  id: string;
  countryIso2: string;
  startDate: string;
  endDate: string;
  cities: string[];
  accommodation?: Accommodation[];
  transportation?: Transportation;
};
```

### Usage

```tsx
import { MultiCountryTripBuilder } from './components/TripBuilder/MultiCountryTripBuilder';

<MultiCountryTripBuilder
  trip={existingTrip}
  onSave={(trip) => console.log('Trip saved:', trip)}
  onCancel={() => console.log('Cancelled')}
/>
```

### Helper Functions

```typescript
import { getTripDuration, getCountriesInTrip, getDaysPerCountry } from './types/trip';

const duration = getTripDuration(trip); // Total days
const countries = getCountriesInTrip(trip); // ['TH', 'HK', 'JP']
const daysMap = getDaysPerCountry(trip); // { TH: 7, HK: 3, JP: 5 }
```

---

## 2. 🔌 Offline PWA with Country Packs

### Overview
Download country-specific data for offline use. Works completely offline once country packs are downloaded.

### Features

#### Service Worker
- **Cache-first** strategy for static assets
- **Network-first** with fallback for dynamic content
- **Country pack** caching with 7-day TTL
- **Automatic updates** when online

#### Country Pack Contents
Each pack includes:
- ✅ Country configuration (emergency numbers, etiquette, transit info)
- ✅ Translation files for country's languages
- ✅ Currency exchange rates (cached for 7 days)
- ✅ Map provider configuration
- ❌ Map tiles (download separately from provider)

#### Storage Management
- **Usage tracking** with visual progress bar
- **Per-country** download/delete
- **Storage quota** monitoring
- **Cache cleanup** for old versions

### Usage

#### Registering Service Worker
```typescript
// Automatically registered in src/index.js
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

serviceWorkerRegistration.register({
  onSuccess: () => console.log('Ready for offline'),
  onUpdate: (reg) => console.log('Update available')
});
```

#### Downloading Country Packs
```tsx
import { OfflineManager } from './components/OfflineManager';

<OfflineManager />
```

#### Programmatic Download
```typescript
const messageChannel = new MessageChannel();

navigator.serviceWorker.controller.postMessage(
  { type: 'DOWNLOAD_COUNTRY_PACK', countryIso2: 'TH' },
  [messageChannel.port2]
);

messageChannel.port1.onmessage = (event) => {
  if (event.data.success) {
    console.log('Thailand pack downloaded');
  }
};
```

### PWA Manifest

```json
{
  "name": "Global Travel Trip Planner",
  "short_name": "Trip Planner",
  "display": "standalone",
  "theme_color": "#2563eb",
  "categories": ["travel", "lifestyle", "productivity"]
}
```

### Installation

The app can be installed on:
- **Android**: Chrome → Menu → "Add to Home screen"
- **iOS**: Safari → Share → "Add to Home Screen"
- **Desktop**: Chrome → Address bar → Install icon

---

## 3. 📋 Visa Requirements Checker

### Overview
Automatically check visa requirements based on traveler nationality and destinations. Includes deadlines, costs, and application links.

### Features

#### Visa Data
- **Requirement type:** visa-free, eVisa, visa-on-arrival, embassy-visa, ETA
- **Max stay** duration
- **Processing time**
- **Cost** in local currency
- **Requirements** list (documents needed)
- **Application URL**
- **Notes** (special conditions)

#### Visual Indicators
- 🟢 **Green:** Visa-free
- 🟡 **Yellow:** eVisa or ETA (online application)
- 🔴 **Red:** Embassy visa required

#### Deadline Calculation
- Automatic **application deadline** based on departure date
- **Buffer time** included (7 days)
- **Urgent warnings** for overdue applications

### Usage

```tsx
import { VisaChecker } from './components/VisaChecker';

<VisaChecker
  nationality="GB"
  destinations={['TH', 'HK', 'CN', 'JP']}
  departureDate="2025-06-01"
/>
```

### Data Model

```typescript
type VisaRequirement = {
  destination: string;
  nationality: string;
  required: boolean;
  type: 'visa-free' | 'eVisa' | 'visa-on-arrival' | 'embassy-visa' | 'eta';
  maxStay?: number;
  cost?: { amount: number; currency: string };
  processingTime?: number;
  requirements?: string[];
  applyUrl?: string;
  notes?: string;
};
```

### Adding Visa Data

Edit `/src/services/visa.ts`:

```typescript
export const VISA_REQUIREMENTS = {
  GB: {  // British passport holders
    TH: {
      destination: 'TH',
      nationality: 'GB',
      required: false,
      type: 'visa-free',
      maxStay: 30,
      notes: 'Can extend for 30 days at immigration office'
    },
    CN: {
      destination: 'CN',
      nationality: 'GB',
      required: true,
      type: 'embassy-visa',
      maxStay: 30,
      cost: { amount: 151, currency: 'GBP' },
      processingTime: 4,
      applyUrl: 'https://www.visaforchina.org'
    }
  }
};
```

### API Integration (Future)

Replace static data with API:

```typescript
// Production: Use Sherpa° or VisaHQ API
export async function getVisaRequirement(nationality, destination) {
  const response = await fetch(
    `https://api.sherpa.com/v2/requirements?nationality=${nationality}&destination=${destination}`,
    { headers: { 'Authorization': `Bearer ${API_KEY}` } }
  );
  return response.json();
}
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Add your API keys
```

### 3. Test Features

#### Create a Multi-Country Trip
```typescript
import { MultiCountryTripBuilder } from './components/TripBuilder/MultiCountryTripBuilder';

const trip = {
  name: 'Southeast Asia Adventure',
  segments: [
    { countryIso2: 'TH', startDate: '2025-06-01', endDate: '2025-06-07', cities: ['Bangkok', 'Phuket'] },
    { countryIso2: 'HK', startDate: '2025-06-08', endDate: '2025-06-10', cities: ['Hong Kong'] },
    { countryIso2: 'JP', startDate: '2025-06-11', endDate: '2025-06-15', cities: ['Tokyo', 'Kyoto'] }
  ],
  travelers: [
    { name: 'John Doe', nationality: 'GB' }
  ],
  homeCurrency: 'GBP'
};
```

#### Download Offline Packs
```typescript
// From UI
<OfflineManager />

// Programmatically
downloadCountryPack('TH');
downloadCountryPack('HK');
downloadCountryPack('JP');
```

#### Check Visas
```tsx
<VisaChecker
  nationality="GB"
  destinations={['TH', 'HK', 'JP']}
  departureDate="2025-06-01"
/>
```

---

## 📊 File Structure

```
src/
├── types/
│   └── trip.ts                    # Multi-country trip types
├── services/
│   └── visa.ts                    # Visa requirements database
├── components/
│   ├── TripBuilder/
│   │   └── MultiCountryTripBuilder.tsx
│   ├── VisaChecker/
│   │   └── index.tsx
│   ├── OfflineManager/
│   │   └── index.tsx
│   └── UpdatePrompt/
│       └── index.tsx
├── serviceWorkerRegistration.ts   # SW lifecycle management
└── index.js                       # App entry + SW registration

public/
├── manifest.json                  # PWA manifest
└── service-worker.js              # Offline caching logic
```

---

## 🎯 Roadmap

### Phase 3 (Future)
- [ ] Real-time visa API integration
- [ ] Passport expiry warnings
- [ ] Multi-traveler visa summaries
- [ ] Budget tracking per country
- [ ] Itinerary optimization (reduce backtracking)
- [ ] Transit visa detection
- [ ] Vaccination requirements
- [ ] Travel insurance recommendations

---

## 🐛 Troubleshooting

### Service Worker Not Updating
1. Open DevTools → Application → Service Workers
2. Check "Update on reload"
3. Click "Unregister" and reload

### Country Pack Not Downloading
1. Check console for errors
2. Verify service worker is active
3. Ensure storage quota not exceeded
4. Try clearing cache: `caches.delete('country-packs-v2.0.0')`

### Visa Data Missing
1. Check nationality is in `VISA_REQUIREMENTS` object
2. Add missing combinations in `/src/services/visa.ts`
3. File GitHub issue for missing countries

---

## 📚 Resources

- [Service Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Cache Storage API](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage)
- [Visa Requirements (Sherpa°)](https://www.joinsherpa.com/api)
- [TIMATIC (IATA)](https://www.iatatravelcentre.com/)

---

## 💡 Tips

1. **Test offline mode** in DevTools → Network → Offline
2. **Monitor storage** to prevent quota issues
3. **Update visa data** regularly (every 3 months)
4. **Pre-download packs** for travelers before trips
5. **Use production build** to test PWA features (`npm run build && serve -s build`)
