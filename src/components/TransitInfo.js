import React from 'react';
import { useCountry } from '../state/CountryContext';
import { Icons } from '../data/staticData';

const TransitInfo = () => {
  const { country, city } = useCountry();

  // Get transit systems from city or country
  const transitSystems = city?.transit?.systems || [];
  const transitCards = country.content?.transitCards || [];

  // Don't show if no transit info available
  if (transitSystems.length === 0 && transitCards.length === 0) return null;

  const getTransitIcon = (type) => {
    switch (type) {
      case 'metro':
        return '🚇';
      case 'bus':
        return '🚌';
      case 'rail':
        return '🚄';
      case 'ferry':
        return '⛴️';
      default:
        return '🚊';
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
        <Icons.Navigation className="w-6 h-6 text-sky-600" />
        {city ? `${city.name} Transit` : 'Local Transit'}
      </h3>

      {/* City-specific transit systems */}
      {transitSystems.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Transit Systems</h4>
          <div className="space-y-3">
            {transitSystems.map((system, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-lg p-4 hover:border-sky-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getTransitIcon(system.type)}</span>
                  <div className="flex-1">
                    <h5 className="font-semibold text-slate-800">{system.name}</h5>
                    <p className="text-sm text-slate-600 mt-1">{system.notes}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {system.website && (
                        <a
                          href={system.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-1 bg-sky-50 text-sky-700 rounded hover:bg-sky-100 transition-colors"
                        >
                          🌐 Website
                        </a>
                      )}
                      {system.app && (
                        <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">
                          📱 {system.app}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transit cards */}
      {transitCards.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Payment Cards</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {transitCards.map((card, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200"
              >
                <span className="text-lg">💳</span>
                <span className="text-sm text-slate-700">{card}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick tips */}
      <div className="mt-4 p-3 bg-sky-50 rounded-lg border border-sky-200">
        <p className="text-xs text-sky-800">
          <strong>💡 Tip:</strong> Download transport apps and add payment methods before your trip
          for seamless travel.
        </p>
      </div>
    </div>
  );
};

export default TransitInfo;
