// ──────────────────────────────────────────────────────────────────────────────
// Currency Service - FX rates and money formatting
// ──────────────────────────────────────────────────────────────────────────────

export type FxRate = {
  base: string;
  quote: string;
  rate: number;
  asOf: string;  // ISO date string
  status?: 'live' | 'stale' | 'fallback' | 'unavailable';
};

// Cache for FX rates (in-memory, per session)
const fxCache = new Map<string, FxRate>();

const FALLBACK_RATES: Record<string, number> = {
  'GBP-THB': 43.5,
  'THB-GBP': 1 / 43.5,
  'GBP-HKD': 9.7,
  'HKD-GBP': 1 / 9.7,
  'GBP-CNY': 9.2,
  'CNY-GBP': 1 / 9.2,
  'GBP-EUR': 1.17,
  'EUR-GBP': 1 / 1.17,
  'USD-THB': 36.5,
  'THB-USD': 1 / 36.5,
  'USD-HKD': 7.8,
  'HKD-USD': 1 / 7.8,
  'USD-CNY': 7.3,
  'CNY-USD': 1 / 7.3,
  'USD-EUR': 0.92,
  'EUR-USD': 1 / 0.92
};

/**
 * Try fetching rate from Frankfurter API (backup #1)
 */
async function tryFrankfurterAPI(base: string, quote: string): Promise<FxRate | null> {
  try {
    const url = `https://api.frankfurter.app/latest?from=${encodeURIComponent(
      base
    )}&to=${encodeURIComponent(quote)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });

    if (!res.ok) {
      throw new Error(`Frankfurter API failed: ${res.status}`);
    }

    const data = await res.json();
    const rate = data?.rates?.[quote];
    if (!rate) {
      throw new Error('Rate not found in Frankfurter response');
    }

    return {
      base,
      quote,
      rate: Number(rate),
      asOf: data.date ? `${data.date}T00:00:00.000Z` : new Date().toISOString(),
      status: 'live'
    };
  } catch (error) {
    console.warn('Frankfurter API failed:', error);
    return null;
  }
}

/**
 * Try fetching rate from ExchangeRate-API (backup #2)
 */
async function tryExchangeRateAPI(base: string, quote: string): Promise<FxRate | null> {
  try {
    const url = `https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });

    if (!res.ok) {
      throw new Error(`ExchangeRate-API failed: ${res.status}`);
    }

    const data = await res.json();
    const rate = data?.rates?.[quote];
    if (!rate) {
      throw new Error('Rate not found in ExchangeRate-API response');
    }

    return {
      base,
      quote,
      rate: Number(rate),
      asOf: data.time_last_update_utc
        ? new Date(data.time_last_update_utc).toISOString()
        : new Date().toISOString(),
      status: 'live'
    };
  } catch (error) {
    console.warn('ExchangeRate-API failed:', error);
    return null;
  }
}

/**
 * Fetch FX rate from primary and backup APIs with caching
 */
export async function getFxRate(base: string, quote: string): Promise<FxRate> {
  // Return 1:1 if same currency
  if (base === quote) {
    return {
      base,
      quote,
      rate: 1.0,
      asOf: new Date().toISOString(),
      status: 'live'
    };
  }

  const cacheKey = `${base}-${quote}`;

  // Check cache first
  const cached = fxCache.get(cacheKey);
  if (cached) {
    const age = Date.now() - new Date(cached.asOf).getTime();
    // Cache valid for 4 hours
    if (age < 4 * 60 * 60 * 1000) {
      return cached;
    }
  }

  // Try primary API
  try {
    const url = `https://api.exchangerate.host/latest?base=${encodeURIComponent(
      base
    )}&symbols=${encodeURIComponent(quote)}&places=6`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });

    if (!res.ok) {
      throw new Error(`FX fetch failed: ${res.status}`);
    }

    const data = await res.json();
    const rate = data?.rates?.[quote];
    if (!rate) {
      throw new Error('Rate not found in response');
    }

    const fx: FxRate = {
      base,
      quote,
      rate: Number(rate),
      asOf: data.date ? `${data.date}T00:00:00.000Z` : new Date().toISOString(),
      status: 'live'
    };
    fxCache.set(cacheKey, fx);
    return fx;
  } catch (error) {
    console.error('Primary FX API failed:', error);

    // Try backup API #1: Frankfurter
    const frankfurterResult = await tryFrankfurterAPI(base, quote);
    if (frankfurterResult) {
      fxCache.set(cacheKey, frankfurterResult);
      return frankfurterResult;
    }

    // Try backup API #2: ExchangeRate-API
    const exchangeRateResult = await tryExchangeRateAPI(base, quote);
    if (exchangeRateResult) {
      fxCache.set(cacheKey, exchangeRateResult);
      return exchangeRateResult;
    }

    // Fall back to stale cache if available
    if (cached) {
      console.warn('All APIs failed, using stale FX rate');
      return { ...cached, status: 'stale' };
    }

    // Use hardcoded fallback rates
    const fallback = FALLBACK_RATES[`${base}-${quote}`];
    if (fallback) {
      console.warn('Using hardcoded fallback FX rate');
      return {
        base,
        quote,
        rate: fallback,
        asOf: new Date().toISOString(),
        status: 'fallback'
      };
    }

    // Last resort: 1:1 rate
    console.warn('No FX rate available, using 1:1');
    return {
      base,
      quote,
      rate: 1.0,
      asOf: new Date().toISOString(),
      status: 'unavailable'
    };
  }
}

/**
 * Format money using Intl.NumberFormat
 */
export function formatMoney(
  amount: number,
  currency: string,
  locale: string = 'en-GB'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
    console.error('Error formatting money:', error);
    return `${currency} ${amount.toFixed(2)}`;
  }
}

/**
 * Convert amount from one currency to another
 */
export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<{ amount: number; rate: FxRate }> {
  const rate = await getFxRate(fromCurrency, toCurrency);
  return {
    amount: amount * rate.rate,
    rate
  };
}

/**
 * Check if FX rate is stale (>48 hours old)
 */
export function isRateStale(asOf: string): boolean {
  const age = Date.now() - new Date(asOf).getTime();
  return age > 48 * 60 * 60 * 1000;
}
