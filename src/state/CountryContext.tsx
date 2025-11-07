// ──────────────────────────────────────────────────────────────────────────────
// Country Context - Global state for country, language, and currency
// Persists to localStorage; reads browser hints as defaults
// ──────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode, useCallback } from 'react';
import { COUNTRIES, CountryConfig, CountryIso2 } from '../countries';

export type CountryState = {
  country: CountryConfig;
  language: string;           // Active language/locale (e.g., 'en-GB')
  homeCurrency: string;       // User's home currency for conversions (e.g., 'GBP')
  setCountry: (iso2: CountryIso2) => void;
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
    setCountryState(cfg);
    localStorage.setItem('global_country', iso2);

    // Switch to country's default locale if current language not supported
    if (!cfg.locales.includes(language)) {
      setLanguageState(cfg.defaultLocale);
      localStorage.setItem('global_language', cfg.defaultLocale);
    }
  }, [language]);

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
      language,
      homeCurrency,
      setCountry,
      setLanguage,
      setHomeCurrency
    }),
    [country, language, homeCurrency, setCountry, setLanguage, setHomeCurrency]
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
