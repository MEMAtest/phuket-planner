// ──────────────────────────────────────────────────────────────────────────────
// Country Configuration Types
// Single source of truth for all country-specific configuration
// ──────────────────────────────────────────────────────────────────────────────

export type MapProvider = 'google' | 'mapbox' | 'amap' | 'baidu';
export type CoordSystem = 'WGS84' | 'GCJ-02';

export type CountryConfig = {
  iso2: string;                 // ISO 3166-1 alpha-2 code, e.g., "HK"
  name: string;                 // Display name, e.g., "Hong Kong"
  defaultLocale: string;        // BCP 47 locale, e.g., "zh-HK"
  locales: string[];            // Supported locales for this country
  currency: string;             // ISO 4217 currency code, e.g., "HKD"
  timeZones: string[];          // IANA time zone identifiers
  map: {
    provider: MapProvider;      // Map provider to use
    coordSystem: CoordSystem;   // Coordinate system for accuracy
  };
  forms: {
    addressSchema: string;      // Key that selects address layout/validation
    dialingCountry: string;     // For libphonenumber-js validation
  };
  weather?: {
    city: string;               // Default city label for weather widgets
    lat: number;
    lon: number;
  };
  news?: {
    query: string;              // RSS search query
    region?: string;            // Region code for Google News (e.g., "HK", "TH")
    staticAlerts?: {
      id: string;
      type: 'event' | 'warning' | 'tip' | 'news';
      title: string;
      description: string;
      priority: 'low' | 'medium' | 'high';
      icon: string;
      months?: number[];        // Active months (1-12)
      daysOfWeek?: number[];    // Active weekdays (0 = Sunday)
    }[];
  };
  highlights?: {
    localOptions?: {
      name: string;
      type: 'eat' | 'activity' | 'shopping';
      notes: string;
      rating: number;
      travelTime?: string;
      map?: string;
      website?: string;
    }[];
    facts?: string[];
  };
  content: {
    emergency: {
      police?: string;
      ambulance?: string;
      fire?: string;
    };
    transitCards?: string[];    // Local transit payment cards
    sockets?: string;           // Electrical socket info
    etiquetteNotes?: string[];  // Cultural tips for travelers
    quickStarts?: {             // Pre-configured itinerary suggestions
      title: string;
      tags: string[];
    }[];
  };
  features: {
    showJetLagTools?: boolean;
    supportsEsimAdvice?: boolean;
    mapTrafficLayer?: boolean;
  };
};
