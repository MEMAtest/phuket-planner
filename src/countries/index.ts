// ──────────────────────────────────────────────────────────────────────────────
// Country Configuration Registry
// Import and export all country configurations
// ──────────────────────────────────────────────────────────────────────────────

import TH from './TH/config';
import HK from './HK/config';
import CN from './CN/config';

export * from './types';

// Registry of all supported countries
export const COUNTRIES = {
  TH,
  HK,
  CN
} as const;

export type CountryIso2 = keyof typeof COUNTRIES;

// Helper to get country by ISO2 code with fallback
export function getCountry(iso2: string) {
  return COUNTRIES[iso2 as CountryIso2] || COUNTRIES.TH;
}

// Get list of all countries for UI
export function getAllCountries() {
  return Object.values(COUNTRIES);
}

// Get all supported locales across all countries
export function getAllLocales() {
  const locales = new Set<string>();
  Object.values(COUNTRIES).forEach(country => {
    country.locales.forEach(locale => locales.add(locale));
  });
  return Array.from(locales);
}
