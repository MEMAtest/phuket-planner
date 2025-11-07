// ──────────────────────────────────────────────────────────────────────────────
// ItineraryView Component
// Display trip itinerary grouped by country with day-by-day activities
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { MultiCountryTrip, TripSegment, ItineraryItem } from '../../types/trip';
import { getCountry } from '../../countries';
import { formatMoney } from '../../services/currency';
import { getVisaRequirement } from '../../services/visa';

interface ItineraryViewProps {
  trip: MultiCountryTrip;
}

const ItineraryView: React.FC<ItineraryViewProps> = ({ trip }) => {
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>(
    trip.segments[0]?.id || ''
  );

  const selectedSegment = trip.segments.find(seg => seg.id === selectedSegmentId);

  const getCountryFlag = (iso2: string) => {
    return String.fromCodePoint(
      ...iso2.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0))
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysInSegment = (segment: TripSegment): string[] => {
    const days: string[] = [];
    const start = new Date(segment.startDate);
    const end = new Date(segment.endDate);

    let current = new Date(start);
    while (current <= end) {
      days.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const getItemsForDay = (items: ItineraryItem[] | undefined, day: string): ItineraryItem[] => {
    if (!items) return [];
    return items.filter(item => item.date === day).sort((a, b) => {
      if (!a.time) return 1;
      if (!b.time) return -1;
      return a.time.localeCompare(b.time);
    });
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'activity':
        return '🎯';
      case 'meal':
        return '🍽️';
      case 'transport':
        return '🚗';
      case 'accommodation':
        return '🏨';
      default:
        return '📌';
    }
  };

  if (!selectedSegment) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No itinerary segments found</p>
      </div>
    );
  }

  const country = getCountry(selectedSegment.countryIso2);
  const days = getDaysInSegment(selectedSegment);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Country Segment Navigation */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Trip Segments</h3>
        <div className="flex flex-wrap gap-2">
          {trip.segments.map(segment => {
            const segCountry = getCountry(segment.countryIso2);
            const isSelected = segment.id === selectedSegmentId;

            return (
              <button
                key={segment.id}
                onClick={() => setSelectedSegmentId(segment.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-2xl">{getCountryFlag(segment.countryIso2)}</span>
                <div className="text-left">
                  <div className="text-sm">{segCountry.name}</div>
                  <div className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                    {formatDate(segment.startDate)} - {formatDate(segment.endDate)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Country Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl">{getCountryFlag(selectedSegment.countryIso2)}</span>
              <div>
                <h2 className="text-3xl font-bold">{country.name}</h2>
                <p className="text-blue-100">
                  {formatDate(selectedSegment.startDate)} - {formatDate(selectedSegment.endDate)}
                  {' '}({days.length} days)
                </p>
              </div>
            </div>
            {selectedSegment.cities.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-100 text-sm">
                  Cities: {selectedSegment.cities.join(', ')}
                </span>
              </div>
            )}
          </div>

          {/* Visa Status for Each Traveler */}
          <div className="text-right">
            <p className="text-xs text-blue-200 mb-2">Visa Status</p>
            {trip.travelers.map(traveler => {
              const visa = getVisaRequirement(traveler.nationality, selectedSegment.countryIso2);
              const statusColor = visa?.type === 'visa-free' ? 'bg-green-500' :
                                 visa?.type === 'eVisa' || visa?.type === 'eta' ? 'bg-yellow-500' :
                                 'bg-red-500';

              return (
                <div key={traveler.name} className="flex items-center gap-2 mb-1 justify-end">
                  <span className="text-sm">{traveler.name}</span>
                  <span className={`${statusColor} text-white text-xs px-2 py-1 rounded`}>
                    {visa?.type || 'Unknown'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Country Quick Info */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Emergency Numbers */}
        {country.content.emergency && Object.keys(country.content.emergency).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Emergency Numbers
            </h4>
            <div className="space-y-1 text-sm">
              {country.content.emergency.police && (
                <div className="flex justify-between">
                  <span className="text-red-700">Police:</span>
                  <span className="font-mono font-semibold text-red-900">{country.content.emergency.police}</span>
                </div>
              )}
              {country.content.emergency.ambulance && (
                <div className="flex justify-between">
                  <span className="text-red-700">Ambulance:</span>
                  <span className="font-mono font-semibold text-red-900">{country.content.emergency.ambulance}</span>
                </div>
              )}
              {country.content.emergency.fire && (
                <div className="flex justify-between">
                  <span className="text-red-700">Fire:</span>
                  <span className="font-mono font-semibold text-red-900">{country.content.emergency.fire}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Transit Cards */}
        {country.content.transitCards && country.content.transitCards.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              Transit Cards
            </h4>
            <ul className="space-y-1 text-sm text-blue-800">
              {country.content.transitCards.map((card, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  {card}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Local Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Local Info
          </h4>
          <div className="space-y-1 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Currency:</span>
              <span className="font-semibold">{country.currency}</span>
            </div>
            <div className="flex justify-between">
              <span>Timezone:</span>
              <span className="font-semibold">{country.timeZones[0].split('/')[1]}</span>
            </div>
            <div className="flex justify-between">
              <span>Language:</span>
              <span className="font-semibold">{country.locales[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Etiquette Notes */}
      {country.content.etiquetteNotes && country.content.etiquetteNotes.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Local Etiquette & Tips
          </h4>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-purple-800">
            {country.content.etiquetteNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Day-by-Day Itinerary */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Daily Itinerary</h3>

        {days.map((day, dayIndex) => {
          const items = getItemsForDay(selectedSegment.itinerary, day);

          return (
            <div key={day} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Day Header */}
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-300">Day {dayIndex + 1}</div>
                    <div className="text-xl font-bold">{formatDate(day)}</div>
                  </div>
                  {items.length > 0 && (
                    <div className="text-right">
                      <div className="text-sm text-gray-300">{items.length} activities</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Activities */}
              <div className="p-6">
                {items.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">No activities scheduled</p>
                ) : (
                  <div className="space-y-4">
                    {items.map(item => (
                      <div
                        key={item.id}
                        className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <span className="text-2xl">{getItemIcon(item.type)}</span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {item.time && (
                                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
                                    {item.time}
                                  </span>
                                )}
                                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                  {item.type}
                                </span>
                              </div>

                              {item.description && (
                                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                              )}

                              {item.location && (
                                <div className="flex items-start gap-2 text-sm text-gray-600 mb-1">
                                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                  </svg>
                                  <div>
                                    <div className="font-medium">{item.location.name}</div>
                                    {item.location.address && (
                                      <div className="text-xs text-gray-500">{item.location.address}</div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {item.notes && (
                                <div className="text-xs text-gray-500 italic mt-1">
                                  Note: {item.notes}
                                </div>
                              )}

                              {item.bookingReference && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Booking: <span className="font-mono">{item.bookingReference}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {item.cost && (
                            <div className="text-right ml-4">
                              <div className="font-semibold text-gray-900">
                                {formatMoney(item.cost.amount, item.cost.currency, country.defaultLocale)}
                              </div>
                              {item.cost.currency !== trip.homeCurrency && (
                                <div className="text-xs text-gray-500">
                                  ≈ {trip.homeCurrency} (convert)
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Activity Placeholder */}
      <div className="mt-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <p className="text-gray-600 mb-2">Add activities to your itinerary</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          Add Activity
        </button>
      </div>
    </div>
  );
};

export default ItineraryView;
