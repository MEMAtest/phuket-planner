// ──────────────────────────────────────────────────────────────────────────────
// Currency Service - FX rates and money formatting
// ──────────────────────────────────────────────────────────────────────────────

export type FxRate = {
  base: string;
  quote: string;
  rate: number;
  asOf: string;  // ISO date string
};

// Cache for FX rates (in-memory, per session)
const fxCache = new Map<string, FxRate>();

const FALLBACK_RATES: Record<string, number> = {
  'GBP-THB': 43.5,
  'THB-GBP': 1 / 43.5,
  'GBP-HKD': 10,
  'HKD-GBP': 0.1,
  'GBP-CNY': 9.2,
  'CNY-GBP': 1 / 9.2,
  'USD-THB': 36.5,
  'THB-USD': 1 / 36.5,
  'USD-HKD': 7.8,
  'HKD-USD': 1 / 7.8,
  'USD-CNY': 7.3,
  'CNY-USD': 1 / 7.3
};

/**
 * Fetch FX rate from serverless API with caching
 */
export async function getFxRate(base: string, quote: string): Promise<FxRate> {
  // Return 1:1 if same currency
  if (base === quote) {
    return {
      base,
      quote,
      rate: 1.0,
      asOf: new Date().toISOString()
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

  try {
    const url = `https://api.exchangerate.host/latest?base=${encodeURIComponent(
      base
    )}&symbols=${encodeURIComponent(quote)}&places=6`;
    const res = await fetch(url);

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
      asOf: data.date || new Date().toISOString()
    };
    fxCache.set(cacheKey, fx);
    return fx;
  } catch (error) {
    console.error('Error fetching FX rate:', error);

    if (cached) {
      console.warn('Using stale FX rate');
      return { ...cached, asOf: cached.asOf + ' (stale)' };
    }

    const fallback = FALLBACK_RATES[`${base}-${quote}`];
    if (fallback) {
      console.warn('Using fallback FX rate');
      return {
        base,
        quote,
        rate: fallback,
        asOf: new Date().toISOString() + ' (fallback)'
      };
    }

    return {
      base,
      quote,
      rate: 1.0,
      asOf: new Date().toISOString()
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
