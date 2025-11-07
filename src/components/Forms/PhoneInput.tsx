// ──────────────────────────────────────────────────────────────────────────────
// PhoneInput Component - International phone number input
// Validates and stores in E.164 format
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { useCountry } from '../../state/CountryContext';
import { toE164, formatPhoneNumber, isValidPhoneNumber } from '../../services/phone';

export type PhoneInputProps = {
  value: string; // E.164 format (e.g., +85223456789)
  onChange: (e164: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  required = false,
  className = ''
}) => {
  const { country } = useCountry();
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Format the E.164 value for display
  useEffect(() => {
    if (value) {
      const formatted = formatPhoneNumber(value, 'NATIONAL');
      setInputValue(formatted);
    } else {
      setInputValue('');
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);

    // Validate and convert to E.164
    const valid = isValidPhoneNumber(raw, country.forms.dialingCountry);
    setIsValid(valid || raw === '');

    if (valid) {
      const e164 = toE164(raw, country.forms.dialingCountry);
      if (e164) {
        onChange(e164);
      }
    } else if (raw === '') {
      onChange('');
    }
  };

  const handleBlur = () => {
    // Re-format on blur
    if (value) {
      const formatted = formatPhoneNumber(value, 'NATIONAL');
      setInputValue(formatted);
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
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl">
          {getCountryFlag(country.iso2)}
        </span>
        <input
          type="tel"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder || 'Phone number'}
          required={required}
          className={`w-full border rounded-lg px-3 py-2 pl-12 focus:outline-none focus:ring-2 ${
            isValid ? 'border-gray-300 focus:ring-blue-500' : 'border-red-500 focus:ring-red-500'
          }`}
        />
        {!isValid && inputValue && (
          <span className="text-xs text-red-500 mt-1">Invalid phone number</span>
        )}
      </div>
    </div>
  );
};

// Helper to get country flag emoji
function getCountryFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default PhoneInput;
