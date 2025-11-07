// ──────────────────────────────────────────────────────────────────────────────
// CountrySwitcher - Modal to select country and language
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { useCountry } from '../../state/CountryContext';
import { getAllCountries } from '../../countries';

export const CountrySwitcher: React.FC = () => {
  const { country, language, setCountry, setLanguage } = useCountry();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const allCountries = getAllCountries();

  const filteredCountries = allCountries.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.iso2.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (iso2: string) => {
    setCountry(iso2 as any);
    setIsOpen(false);
    setSearchQuery('');
  };

  const getCountryFlag = (countryCode: string): string => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        aria-label="Change country"
      >
        <span className="text-2xl">{getCountryFlag(country.iso2)}</span>
        <span className="text-sm font-medium">{country.name}</span>
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Select Country</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Search */}
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search countries..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>

            {/* Country List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCountries.map(c => (
                  <button
                    key={c.iso2}
                    onClick={() => handleCountrySelect(c.iso2)}
                    className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      c.iso2 === country.iso2
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <span className="text-3xl">{getCountryFlag(c.iso2)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{c.name}</div>
                      <div className="text-xs text-gray-500">
                        {c.currency} · {c.timeZones[0].split('/')[1]}
                      </div>
                    </div>
                    {c.iso2 === country.iso2 && (
                      <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              {filteredCountries.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No countries found matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Language Selector */}
            {country.locales.length > 1 && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <label className="text-sm font-medium text-gray-700 block mb-2">Language</label>
                <div className="flex gap-2 flex-wrap">
                  {country.locales.map(locale => (
                    <button
                      key={locale}
                      onClick={() => setLanguage(locale)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        locale === language
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {locale}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CountrySwitcher;
