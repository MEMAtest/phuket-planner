# Global Multi-Country Architecture

This document describes the global expansion architecture for the Trip Planner app, transforming it from a Phuket-focused application to a scalable 50+ country platform.

## 🌍 Architecture Overview

### Config-First Design
All country-specific behavior is driven by configuration files in `/src/countries/`, eliminating hard-coded country logic.

### Key Features
- **50+ Countries**: Easily extensible configuration system
- **Multiple Map Providers**: Google Maps, Mapbox, AMap (China), Baidu
- **Coordinate Systems**: Automatic WGS84/GCJ-02 handling
- **Currency Conversion**: Real-time FX rates with local/home currency display
- **Internationalization**: Multi-language support with react-i18next
- **Phone & Address**: Country-specific validation and formatting
- **Offline-First**: PWA with per-country resource packing

## 📁 Project Structure

```
src/
├── countries/          # Country configuration packs
│   ├── types.ts       # TypeScript types
│   ├── index.ts       # Country registry
│   ├── TH/config.ts   # Thailand
│   ├── HK/config.ts   # Hong Kong
│   ├── CN/config.ts   # Mainland China
│   └── ...            # Other countries
├── state/
│   └── CountryContext.tsx   # Global country state
├── services/
│   ├── currency.ts    # FX rates & formatting
│   ├── phone.ts       # International phone handling
│   ├── address.ts     # Schema-driven address forms
│   └── maps/          # Map provider abstractions
├── components/
│   ├── CountrySwitcher/    # Country selection modal
│   ├── MapView/            # Map provider abstraction
│   │   └── providers/      # Google, AMap, Mapbox, Baidu
│   ├── Money/              # Currency components
│   │   ├── Price.tsx       # Dual currency display
│   │   └── MoneyInput.tsx  # Currency input
│   └── Forms/              # Country-aware forms
│       ├── AddressInput.tsx
│       └── PhoneInput.tsx
└── i18n/              # Internationalization
    ├── i18n.ts        # i18next config
    └── locales/       # Translation files
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Keys

Copy `.env.example` to `.env` and add your API keys:

```bash
cp .env.example .env
```

Required keys:
- `REACT_APP_MAPS_GOOGLE_KEY` - For most countries
- `REACT_APP_MAPS_AMAP_KEY` - For mainland China
- (Optional) `REACT_APP_MAPS_MAPBOX_TOKEN` - Alternative provider
- (Optional) `REACT_APP_MAPS_BAIDU_AK` - Alternative for China

### 3. Generate Country Packs

To add more countries from the CSV:

```bash
npm run generate:countries
```

This reads `scripts/countries.csv` and generates configuration files.

### 4. Start Development Server

```bash
npm start
```

## 🗺️ Map Providers

### Google Maps (Default)
- Used for: Most countries
- Coordinate system: WGS84
- API: Google Maps JavaScript API

### AMap (高德地图)
- Used for: Mainland China
- Coordinate system: GCJ-02 (Mars Coordinates)
- Required by Chinese regulations
- API: AMap Web API v2.0

### Mapbox (Optional)
- Alternative to Google Maps
- Coordinate system: WGS84
- API: Mapbox GL JS

### Baidu Maps (百度地图)
- Alternative for China
- Coordinate system: BD-09
- API: Baidu Maps JavaScript API v3.0

## 💱 Currency System

### Dual Currency Display
All prices show:
1. **Local currency** (primary, bold)
2. **Home currency** (secondary, muted) with FX rate tooltip

### Exchange Rates
- Source: European Central Bank (ECB) daily rates
- Caching: 4-hour client cache, 12-hour server cache
- Stale indicator: Warning if rate >48 hours old
- API: `/api/fx?base=THB&quote=GBP`

### Usage Example

```tsx
import { Price } from './components/Money/Price';

<Price amountLocal={1000} showSecondary={true} />
// Displays: ฿1,000 / ≈ £25.50
```

## 📞 Phone & Address

### Phone Numbers
- Validation: `libphonenumber-js`
- Storage format: E.164 (e.g., `+85223456789`)
- Display: Country-specific formatting

### Addresses
- Schema-driven forms per country
- Different field orders (HK vs CN vs TH)
- Localized labels and placeholders

## 🌐 Adding a New Country

### Option 1: Via CSV (Bulk)

1. Add row to `scripts/countries.csv`:
```csv
JP,Japan,ja-JP,ja-JP;en-GB,JPY,Asia/Tokyo,google
```

2. Generate configs:
```bash
npm run generate:countries
```

3. Customize content in generated `src/countries/JP/config.ts`

### Option 2: Manual

1. Create `src/countries/JP/config.ts`:

```typescript
import { CountryConfig } from '../types';

const JP: CountryConfig = {
  iso2: 'JP',
  name: 'Japan',
  defaultLocale: 'ja-JP',
  locales: ['ja-JP', 'en-GB'],
  currency: 'JPY',
  timeZones: ['Asia/Tokyo'],
  map: { provider: 'google', coordSystem: 'WGS84' },
  forms: { addressSchema: 'JP', dialingCountry: 'JP' },
  content: {
    emergency: { police: '110', ambulance: '119', fire: '119' },
    transitCards: ['Suica', 'Pasmo'],
    etiquetteNotes: ['Bow when greeting', 'Remove shoes indoors']
  },
  features: { showJetLagTools: true, supportsEsimAdvice: true }
};

export default JP;
```

2. Add to `src/countries/index.ts`:

```typescript
import JP from './JP/config';
export const COUNTRIES = { TH, HK, CN, JP } as const;
```

3. Add address schema to `src/services/address.ts`

4. Add translations to `src/i18n/locales/`

## 📱 PWA & Offline

Country packs can be pre-cached for offline use:

1. Service worker caches:
   - Country config JSON
   - Locale translations
   - Map tiles (provider-specific)
   - Emergency info

2. IndexedDB stores:
   - User trips by country
   - Cached FX rates

## 🧪 Testing

### Test Country Switching
1. Click country flag in header
2. Search for "Hong Kong"
3. Select HK
4. Verify:
   - Currency changes to HKD
   - Language switches to zh-HK
   - Map loads correctly
   - Address form updates

### Test China Map
1. Switch to "China (Mainland)"
2. Verify:
   - Map uses AMap (not Google)
   - Map loads in Chinese
   - Coordinates are GCJ-02

## 🔒 Security

- API keys in environment variables only
- No PII in map queries
- E.164 phone storage
- Input validation on all forms

## 📊 Analytics

Track these events:
- `country_changed` - Country selection
- `language_changed` - Language preference
- `map_load_failed` - Provider issues
- `fx_rate_stale` - Old exchange rates

## 🤝 Contributing

### Adding Emergency Numbers
Update `content.emergency` in country config.

### Adding Transit Cards
Update `content.transitCards` array.

### Adding Quick Start Itineraries
Update `content.quickStarts` with pre-configured suggestions.

## 📚 Resources

- [Country Codes (ISO 3166-1)](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
- [Currency Codes (ISO 4217)](https://en.wikipedia.org/wiki/ISO_4217)
- [Time Zones (IANA)](https://www.iana.org/time-zones)
- [Phone Library Docs](https://github.com/catamphetamine/libphonenumber-js)
- [GCJ-02 Coordinate System](https://en.wikipedia.org/wiki/Restrictions_on_geographic_data_in_China)

## 🎯 Roadmap

- [ ] Add remaining 47+ countries from CSV
- [ ] Implement PWA offline caching per country
- [ ] Add visa requirement checker
- [ ] Multi-country trip support
- [ ] Budget calculator with auto-conversion
- [ ] Weather integration per city
- [ ] Local SIM/eSIM recommendations
- [ ] Public transit routing (per city)
