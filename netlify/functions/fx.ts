// ──────────────────────────────────────────────────────────────────────────────
// Currency Exchange Rate API (Serverless Function)
// Fetches daily rates from European Central Bank (ECB) and caches them
// ──────────────────────────────────────────────────────────────────────────────

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

type FxRate = {
  base: string;
  quote: string;
  rate: number;
  asOf: string;
};

// In-memory cache (persists for the lifetime of the serverless function)
let ratesCache: { [key: string]: number } | null = null;
let cacheTimestamp: string | null = null;
let cacheDate: number = 0;

/**
 * Fetch latest rates from ECB
 * ECB provides rates with EUR as base
 */
async function fetchECBRates(): Promise<{ [key: string]: number }> {
  const ECB_URL = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';

  try {
    const response = await fetch(ECB_URL);
    const xml = await response.text();

    // Parse XML (simplified - in production, use a proper XML parser)
    const rates: { [key: string]: number } = { EUR: 1.0 };

    // Extract rates using regex (basic parsing)
    const matches = xml.matchAll(/currency='([A-Z]{3})' rate='([0-9.]+)'/g);
    for (const match of matches) {
      const [, currency, rate] = match;
      rates[currency] = parseFloat(rate);
    }

    // Extract date
    const dateMatch = xml.match(/time='([0-9-]+)'/);
    const dateStr = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];

    cacheTimestamp = new Date(dateStr).toISOString();
    cacheDate = Date.now();
    ratesCache = rates;

    console.log(`✅ Fetched ${Object.keys(rates).length} rates from ECB (${dateStr})`);

    return rates;
  } catch (error) {
    console.error('Error fetching ECB rates:', error);

    // Return fallback rates if ECB fails
    return {
      EUR: 1.0,
      USD: 1.08,
      GBP: 0.86,
      JPY: 160.0,
      CHF: 0.94,
      CAD: 1.47,
      AUD: 1.66,
      NZD: 1.79,
      CNY: 7.84,
      HKD: 8.47,
      SGD: 1.45,
      THB: 37.5,
      MYR: 4.95,
      INR: 90.0,
      KRW: 1440.0
    };
  }
}

/**
 * Get exchange rate between two currencies
 */
async function getRate(base: string, quote: string): Promise<FxRate> {
  // Check if cache is stale (>12 hours)
  const cacheAge = Date.now() - cacheDate;
  if (!ratesCache || cacheAge > 12 * 60 * 60 * 1000) {
    ratesCache = await fetchECBRates();
  }

  if (!ratesCache || !cacheTimestamp) {
    throw new Error('Failed to load exchange rates');
  }

  // All rates are EUR-based, so we need to convert
  const baseRate = ratesCache[base];
  const quoteRate = ratesCache[quote];

  if (!baseRate || !quoteRate) {
    throw new Error(`Unsupported currency: ${!baseRate ? base : quote}`);
  }

  // Convert: base -> EUR -> quote
  const rate = quoteRate / baseRate;

  return {
    base,
    quote,
    rate,
    asOf: cacheTimestamp
  };
}

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  try {
    const base = (event.queryStringParameters?.base || 'EUR').toUpperCase();
    const quote = (event.queryStringParameters?.quote || 'USD').toUpperCase();

    const result = await getRate(base, quote);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error('FX API error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch exchange rate',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};
