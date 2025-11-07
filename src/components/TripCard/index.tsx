// ──────────────────────────────────────────────────────────────────────────────
// TripCard Component
// Display trip summary with visa requirements badges
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { MultiCountryTrip, getCountriesInTrip, getTripDuration, getDaysPerCountry } from '../../types/trip';
import { getCountry } from '../../countries';
import { getVisaRequirement } from '../../services/visa';

interface TripCardProps {
  trip: MultiCountryTrip;
  onClick?: () => void;
  compact?: boolean;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onClick, compact = false }) => {
  const countries = getCountriesInTrip(trip);
  const duration = getTripDuration(trip);
  const daysPerCountry = getDaysPerCountry(trip);

  const getCountryFlag = (iso2: string) => {
    return String.fromCodePoint(
      ...iso2.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0))
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get visa summary for all travelers across all destinations
  const getVisaSummary = () => {
    const summary: {
      visaFree: number;
      eVisa: number;
      required: number;
      totalChecks: number;
    } = {
      visaFree: 0,
      eVisa: 0,
      required: 0,
      totalChecks: 0
    };

    trip.travelers.forEach(traveler => {
      countries.forEach(countryIso2 => {
        const visa = getVisaRequirement(traveler.nationality, countryIso2);
        summary.totalChecks++;

        if (visa) {
          if (visa.type === 'visa-free') {
            summary.visaFree++;
          } else if (visa.type === 'eVisa' || visa.type === 'eta') {
            summary.eVisa++;
          } else {
            summary.required++;
          }
        } else {
          // Unknown visa requirement - count as required for safety
          summary.required++;
        }
      });
    });

    return summary;
  };

  const visaSummary = getVisaSummary();

  // Get visa alerts (if any visas are required)
  const hasVisaRequirements = visaSummary.required > 0 || visaSummary.eVisa > 0;

  const firstSegment = trip.segments[0];
  const lastSegment = trip.segments[trip.segments.length - 1];

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow ${
        onClick ? 'cursor-pointer' : ''
      } overflow-hidden ${compact ? 'p-4' : 'p-6'}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={`font-bold text-gray-900 mb-1 ${compact ? 'text-lg' : 'text-xl'}`}>
            {trip.name}
          </h3>
          {trip.description && (
            <p className="text-sm text-gray-600 mb-2">{trip.description}</p>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>
              {formatDate(firstSegment.startDate)} - {formatDate(lastSegment.endDate)}
            </span>
            <span className="text-gray-400">•</span>
            <span>{duration} days</span>
          </div>
        </div>

        {/* Visa Alert Badge */}
        {hasVisaRequirements && (
          <div className="ml-4">
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-2 text-center">
              <svg className="w-5 h-5 text-yellow-600 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-xs font-semibold text-yellow-800">Visa Required</p>
            </div>
          </div>
        )}
      </div>

      {/* Countries Row */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {trip.segments.map(segment => {
            const country = getCountry(segment.countryIso2);
            const days = daysPerCountry[segment.countryIso2];

            return (
              <div
                key={segment.id}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
              >
                <span className="text-2xl">{getCountryFlag(segment.countryIso2)}</span>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{country.name}</div>
                  <div className="text-xs text-gray-500">{days} days</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visa Summary Section */}
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-gray-700">Visa Requirements</h4>
          <span className="text-xs text-gray-500">
            {trip.travelers.length} traveler{trip.travelers.length !== 1 ? 's' : ''} × {countries.length} countr{countries.length !== 1 ? 'ies' : 'y'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Visa-Free */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs font-medium text-green-900">Visa-Free</span>
            </div>
            <div className="text-2xl font-bold text-green-700">{visaSummary.visaFree}</div>
            <div className="text-xs text-green-600">
              {Math.round((visaSummary.visaFree / visaSummary.totalChecks) * 100)}%
            </div>
          </div>

          {/* eVisa/ETA */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs font-medium text-yellow-900">eVisa/ETA</span>
            </div>
            <div className="text-2xl font-bold text-yellow-700">{visaSummary.eVisa}</div>
            <div className="text-xs text-yellow-600">
              {Math.round((visaSummary.eVisa / visaSummary.totalChecks) * 100)}%
            </div>
          </div>

          {/* Visa Required */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs font-medium text-red-900">Required</span>
            </div>
            <div className="text-2xl font-bold text-red-700">{visaSummary.required}</div>
            <div className="text-xs text-red-600">
              {Math.round((visaSummary.required / visaSummary.totalChecks) * 100)}%
            </div>
          </div>
        </div>

        {/* Detailed Visa Breakdown by Traveler */}
        {!compact && (
          <div className="mt-3 space-y-2">
            {trip.travelers.map(traveler => {
              const travelerVisas = countries.map(countryIso2 => {
                const visa = getVisaRequirement(traveler.nationality, countryIso2);
                return { countryIso2, visa };
              });

              const hasIssues = travelerVisas.some(
                v => !v.visa || (v.visa.type !== 'visa-free')
              );

              return (
                <details
                  key={traveler.name}
                  className="bg-gray-50 rounded-lg"
                >
                  <summary className="cursor-pointer px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {traveler.name}
                      <span className="text-xs text-gray-500">({traveler.nationality})</span>
                    </span>
                    {hasIssues && (
                      <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                        Action needed
                      </span>
                    )}
                  </summary>
                  <div className="px-3 pb-3 pt-1 space-y-1">
                    {travelerVisas.map(({ countryIso2, visa }) => {
                      const country = getCountry(countryIso2);
                      const statusColor = visa?.type === 'visa-free' ? 'text-green-600' :
                                        visa?.type === 'eVisa' || visa?.type === 'eta' ? 'text-yellow-600' :
                                        'text-red-600';

                      return (
                        <div
                          key={countryIso2}
                          className="flex items-center justify-between text-xs py-1"
                        >
                          <span className="flex items-center gap-2">
                            <span>{getCountryFlag(countryIso2)}</span>
                            <span className="text-gray-700">{country.name}</span>
                          </span>
                          <span className={`font-medium ${statusColor}`}>
                            {visa?.type || 'Unknown'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer - Travelers & Budget */}
      <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-200 pt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span>{trip.travelers.length} traveler{trip.travelers.length !== 1 ? 's' : ''}</span>
          </div>

          {trip.budget && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              <span>
                {trip.budget.currency} {trip.budget.total.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {onClick && (
          <div className="text-blue-600 font-medium flex items-center gap-1">
            View Details
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripCard;
