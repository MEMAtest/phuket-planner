import React, { useMemo } from 'react';
import { useCountry } from '../state/CountryContext';

const CitySelector = ({ className = '' }) => {
  const { country, city, setCity } = useCountry();

  const cities = useMemo(() => {
    if (!country.cities) return [];
    return Object.values(country.cities);
  }, [country]);

  // Don't show if country has no cities configured
  if (cities.length === 0) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label className="text-sm font-medium text-slate-600">City:</label>
      <select
        value={city?.id || ''}
        onChange={(e) => setCity(e.target.value || null)}
        className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-sky-500"
      >
        <option value="">All {country.name}</option>
        {cities.map((cityConfig) => (
          <option key={cityConfig.id} value={cityConfig.id}>
            {cityConfig.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;
