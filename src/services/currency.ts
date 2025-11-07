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
    const res = await fetch(
      `/api/fx?base=${encodeURIComponent(base)}&quote=${encodeURIComponent(quote)}`
    );

    if (!res.ok) {
      throw new Error(`FX fetch failed: ${res.status}`);
    }

    const data: FxRate = await res.json();
    fxCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching FX rate:', error);

    // If we have stale cached data, return it with a warning
    if (cached) {
      console.warn('Using stale FX rate');
      return { ...cached, asOf: cached.asOf + ' (stale)' };
    }

    // Fallback to 1:1 if all else fails
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
