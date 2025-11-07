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
