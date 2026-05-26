// ──────────────────────────────────────────────────────────────────────────────
// Country Context - Global state for country, language, and currency
// Persists to localStorage; reads browser hints as defaults
// ──────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode, useCallback } from 'react';
import { COUNTRIES, CountryConfig, CountryIso2, CityConfig } from '../countries';

export type CountryState = {
  country: CountryConfig;
  city: CityConfig | null;    // Current city within the country (optional)
  language: string;           // Active language/locale (e.g., 'en-GB')
  homeCurrency: string;       // User's home currency for conversions (e.g., 'GBP')
  setCountry: (iso2: CountryIso2) => void;
  setCity: (cityId: string | null) => void;
  setLanguage: (locale: string) => void;
  setHomeCurrency: (code: string) => void;
};

const defaultCountry = COUNTRIES.TH;

const CountryContext = createContext<CountryState | null>(null);

export const CountryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from localStorage or defaults
  const [country, setCountryState] = useState<CountryConfig>(() => {
    const saved = localStorage.getItem('global_country');
    if (saved && (saved in COUNTRIES)) {
      return COUNTRIES[saved as CountryIso2];
    }
    return defaultCountry;
  });

  const [city, setCityState] = useState<CityConfig | null>(() => {
    const saved = localStorage.getItem(`city_${country.iso2}`);
    if (saved && country.cities && saved in country.cities) {
      return country.cities[saved];
    }
    return null;
  });

  const [language, setLanguageState] = useState<string>(() => {
    const saved = localStorage.getItem('global_language');
    if (saved) return saved;

    // Try to detect browser language
    const browserLang = navigator.language || 'en-GB';
    if (country.locales.includes(browserLang)) {
      return browserLang;
    }
    return country.defaultLocale;
  });

  const [homeCurrency, setHomeCurrencyState] = useState<string>(() => {
    const saved = localStorage.getItem('global_homeCurrency');
    return saved || 'GBP';
  });

  // Update language if it's not supported by new country
  useEffect(() => {
    if (!country.locales.includes(language)) {
      setLanguageState(country.defaultLocale);
      localStorage.setItem('global_language', country.defaultLocale);
    }
  }, [country, language]);

  const setCountry = useCallback((iso2: CountryIso2) => {
    const cfg = COUNTRIES[iso2];
    // Remove OLD country's city before switching
    localStorage.removeItem(`city_${country.iso2}`);

    setCountryState(cfg);
    localStorage.setItem('global_country', iso2);

    // Switch to country's default locale if current language not supported
    if (!cfg.locales.includes(language)) {
      setLanguageState(cfg.defaultLocale);
      localStorage.setItem('global_language', cfg.defaultLocale);
    }

    // Reset city when changing countries
    setCityState(null);
  }, [language, country]);

  const setCity = useCallback((cityId: string | null) => {
    if (!cityId) {
      setCityState(null);
      localStorage.removeItem(`city_${country.iso2}`);
      return;
    }

    if (country.cities && cityId in country.cities) {
      const cityConfig = country.cities[cityId];
      setCityState(cityConfig);
      localStorage.setItem(`city_${country.iso2}`, cityId);
    }
  }, [country]);

  const setLanguage = useCallback((locale: string) => {
    setLanguageState(locale);
    localStorage.setItem('global_language', locale);
  }, []);

  const setHomeCurrency = useCallback((code: string) => {
    setHomeCurrencyState(code);
    localStorage.setItem('global_homeCurrency', code);
  }, []);

  const value = useMemo(
    () => ({
      country,
      city,
      language,
      homeCurrency,
      setCountry,
      setCity,
      setLanguage,
      setHomeCurrency
    }),
    [country, city, language, homeCurrency, setCountry, setCity, setLanguage, setHomeCurrency]
  );

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
};

// Hook to use country context
export const useCountry = () => {
  const ctx = useContext(CountryContext);
  if (!ctx) {
    throw new Error('useCountry must be used within CountryProvider');
  }
  return ctx;
};
