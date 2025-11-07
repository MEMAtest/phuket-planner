// ──────────────────────────────────────────────────────────────────────────────
// Price Component - Dual currency display with FX rates
// Shows local currency prominently, home currency as secondary
// ──────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useState } from 'react';
import { useCountry } from '../../state/CountryContext';
import { formatMoney, getFxRate, isRateStale, FxRate } from '../../services/currency';

export type PriceProps = {
  amountLocal: number;
  localCurrency?: string;  // Override if different from trip currency
  showSecondary?: boolean; // Show home currency conversion
  className?: string;
};

export const Price: React.FC<PriceProps> = ({
  amountLocal,
  localCurrency,
  showSecondary = true,
  className = ''
}) => {
  const { country, language, homeCurrency } = useCountry();
  const [fx, setFx] = useState<FxRate | null>(null);
  const [loading, setLoading] = useState(false);

  const effectiveCurrency = localCurrency || country.currency;

  // Fetch FX rate if showing secondary currency
  useEffect(() => {
    if (!showSecondary || effectiveCurrency === homeCurrency) {
      setFx(null);
      return;
    }

    let cancelled = false;
    setLoading(true);

    getFxRate(effectiveCurrency, homeCurrency)
      .then(rate => {
        if (!cancelled) {
          setFx(rate);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching FX rate:', error);
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [effectiveCurrency, homeCurrency, showSecondary]);

  const primaryAmount = formatMoney(amountLocal, effectiveCurrency, language);
  const secondaryAmount = fx ? formatMoney(amountLocal * fx.rate, homeCurrency, language) : null;

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Primary (local) currency */}
      <span className="text-lg font-semibold text-gray-900">{primaryAmount}</span>

      {/* Secondary (home) currency */}
      {showSecondary && secondaryAmount && fx && (
        <span
          className="text-xs text-gray-500 mt-0.5"
          title={`Exchange rate from ${fx.base} to ${fx.quote} · Updated ${new Date(fx.asOf).toLocaleDateString()}`}
        >
          ≈ {secondaryAmount}
          {isRateStale(fx.asOf) && (
            <span className="ml-1 text-amber-600" title="Exchange rate is more than 48 hours old">
              ⚠️
            </span>
          )}
        </span>
      )}

      {loading && showSecondary && (
        <span className="text-xs text-gray-400 mt-0.5">Loading rate...</span>
      )}
    </div>
  );
};

export default Price;
