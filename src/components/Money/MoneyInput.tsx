// ──────────────────────────────────────────────────────────────────────────────
// MoneyInput Component - Currency input with validation
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { useCountry } from '../../state/CountryContext';

export type MoneyInputProps = {
  value: number;
  onChange: (value: number) => void;
  currency?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
};

export const MoneyInput: React.FC<MoneyInputProps> = ({
  value,
  onChange,
  currency,
  label,
  placeholder,
  className = '',
  required = false
}) => {
  const { country } = useCountry();
  const effectiveCurrency = currency || country.currency;
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);

    // Parse as number
    const parsed = parseFloat(rawValue);
    if (!isNaN(parsed)) {
      onChange(parsed);
    } else if (rawValue === '') {
      onChange(0);
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
          {effectiveCurrency}
        </span>
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder || '0.00'}
          required={required}
          min="0"
          step="0.01"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default MoneyInput;
