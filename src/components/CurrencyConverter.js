import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Icons } from '../data/staticData';
import { useCountry } from '../state/CountryContext';
import { getFxRate } from '../services/currency';
import { formatMoney } from '../services/currency';

const COMMON_CURRENCIES = [
  ['USD', 'US Dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'British Pound'],
  ['THB', 'Thai Baht'],
  ['HKD', 'Hong Kong Dollar'],
  ['CNY', 'Chinese Yuan'],
  ['JPY', 'Japanese Yen'],
  ['AUD', 'Australian Dollar'],
  ['NZD', 'New Zealand Dollar'],
  ['CAD', 'Canadian Dollar'],
  ['SGD', 'Singapore Dollar'],
  ['MYR', 'Malaysian Ringgit'],
  ['KRW', 'South Korean Won'],
  ['IDR', 'Indonesian Rupiah'],
  ['INR', 'Indian Rupee'],
  ['TWD', 'New Taiwan Dollar'],
  ['VND', 'Vietnamese Dong'],
  ['PHP', 'Philippine Peso'],
  ['AED', 'Emirati Dirham'],
  ['SAR', 'Saudi Riyal'],
  ['CHF', 'Swiss Franc'],
  ['SEK', 'Swedish Krona'],
  ['NOK', 'Norwegian Krone'],
  ['DKK', 'Danish Krone'],
  ['ZAR', 'South African Rand'],
  ['BRL', 'Brazilian Real'],
  ['MXN', 'Mexican Peso'],
  ['ARS', 'Argentine Peso'],
  ['CLP', 'Chilean Peso'],
  ['PEN', 'Peruvian Sol'],
  ['COP', 'Colombian Peso'],
  ['EGP', 'Egyptian Pound'],
  ['TRY', 'Turkish Lira'],
  ['PLN', 'Polish Zloty'],
  ['CZK', 'Czech Koruna'],
  ['HUF', 'Hungarian Forint'],
  ['ILS', 'Israeli Shekel'],
  ['NGN', 'Nigerian Naira'],
  ['KES', 'Kenyan Shilling'],
  ['PKR', 'Pakistani Rupee'],
  ['BDT', 'Bangladeshi Taka'],
  ['MAD', 'Moroccan Dirham'],
  ['RUB', 'Russian Ruble'],
  ['UAH', 'Ukrainian Hryvnia']
];

const QUICK_AMOUNTS = [10, 50, 100, 250, 500];

const CurrencyConverter = () => {
  const { country, homeCurrency, language } = useCountry();
  const [fromCurrency, setFromCurrency] = useState(homeCurrency || 'USD');
  const [toCurrency, setToCurrency] = useState(country.currency);
  const [amountFrom, setAmountFrom] = useState(100);
  const [amountTo, setAmountTo] = useState(0);
  const [rate, setRate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFromCurrency(homeCurrency || 'USD');
    setToCurrency(country.currency);
  }, [homeCurrency, country.currency]);

  const locale = language || 'en-GB';

  const currencyOptions = useMemo(() => {
    const set = new Map(COMMON_CURRENCIES);
    if (!set.has(homeCurrency)) {
      set.set(homeCurrency, `${homeCurrency} (Home)`);
    }
    if (!set.has(country.currency)) {
      set.set(country.currency, `${country.currency} (Local)`);
    }
    return Array.from(set.entries()).map(([code, label]) => ({ code, label }));
  }, [homeCurrency, country.currency]);

  const computeToAmount = useCallback(
    (value, currentRate = rate) => {
      if (!currentRate) return 0;
      return Number((value * currentRate.rate).toFixed(2));
    },
    [rate]
  );

  const computeFromAmount = useCallback(
    (value, currentRate = rate) => {
      if (!currentRate || currentRate.rate === 0) return 0;
      return Number((value / currentRate.rate).toFixed(2));
    },
    [rate]
  );

  const fetchRate = useCallback(async () => {
    if (!fromCurrency || !toCurrency) return;
    setLoading(true);
    setError(null);
    try {
      const fx = await getFxRate(fromCurrency, toCurrency);
      setRate(fx);
      setLastUpdated(fx.asOf);
      setAmountTo(computeToAmount(amountFrom, fx));
    } catch (err) {
      console.error('FX error', err);
      setError('Unable to fetch the latest rate. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [fromCurrency, toCurrency, amountFrom, computeToAmount]);

  useEffect(() => {
    void fetchRate();
  }, [fetchRate]);

  const handleAmountFromChange = (value) => {
    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
      setAmountFrom(0);
      setAmountTo(0);
      return;
    }
    setAmountFrom(numeric);
    setAmountTo(computeToAmount(numeric));
  };

  const handleAmountToChange = (value) => {
    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
      setAmountTo(0);
      setAmountFrom(0);
      return;
    }
    setAmountTo(numeric);
    setAmountFrom(computeFromAmount(numeric));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmountFrom(amountTo);
    setAmountTo(amountFrom);
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch {
      return timestamp;
    }
  };

  const rateText = rate
    ? `1 ${rate.base} = ${rate.rate.toFixed(4)} ${rate.quote}`
    : 'Fetching rate...';

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
          <Icons.Repeat className="w-6 h-6 text-sky-600" />
          Multi-Currency Converter
        </h3>
        <button
          onClick={fetchRate}
          className="self-start sm:self-auto px-3 py-1.5 text-sm bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Updating…' : 'Update Rate'}
        </button>
      </div>

      {error && (
        <div className="mb-3 p-2 text-sm bg-red-50 text-red-700 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            From
          </label>
          <div className="flex gap-2">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-40 border border-slate-300 rounded-lg px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-sky-500"
            >
              {currencyOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.code} · {option.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={amountFrom}
              onChange={(e) => handleAmountFromChange(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-lg font-semibold focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <button
            onClick={swapCurrencies}
            className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            title="Swap currencies"
          >
            ⇅
          </button>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            To
          </label>
          <div className="flex gap-2">
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-40 border border-slate-300 rounded-lg px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-sky-500"
            >
              {currencyOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.code} · {option.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={amountTo}
              onChange={(e) => handleAmountToChange(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-lg font-semibold focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-600 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span>{rateText}</span>
        {lastUpdated && (
          <span className="text-xs text-slate-500">
            Updated: {formatTimestamp(lastUpdated)}
          </span>
        )}
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Quick Reference</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUICK_AMOUNTS.map((amount) => (
            <div
              key={amount}
              className="rounded-lg border border-slate-200 p-3 bg-slate-50 flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-slate-500">
                  {formatMoney(amount, fromCurrency, locale)} →
                </p>
                <p className="text-lg font-semibold text-slate-800">
                  {rate
                    ? formatMoney(amount * rate.rate, toCurrency, locale)
                    : '…'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">
                  {formatMoney(amount, toCurrency, locale)} →
                </p>
                <p className="text-lg font-semibold text-slate-800">
                  {rate
                    ? formatMoney(amount / rate.rate, fromCurrency, locale)
                    : '…'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
