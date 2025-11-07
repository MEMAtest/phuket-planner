// ──────────────────────────────────────────────────────────────────────────────
// MultiCountryTripBuilder
// Interface for creating and editing multi-country trips
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { MultiCountryTrip, TripSegment, getTripDuration, getCountriesInTrip } from '../../types/trip';
import { COUNTRIES, getAllCountries } from '../../countries';
import VisaChecker from '../VisaChecker';

export type TripBuilderProps = {
  trip?: MultiCountryTrip;
  onSave: (trip: MultiCountryTrip) => void;
  onCancel: () => void;
};

export const MultiCountryTripBuilder: React.FC<TripBuilderProps> = ({
  trip: initialTrip,
  onSave,
  onCancel
}) => {
  const [trip, setTrip] = useState<MultiCountryTrip>(
    initialTrip || {
      id: `trip_${Date.now()}`,
      name: 'New Trip',
      segments: [],
      travelers: [],
      homeCurrency: 'GBP',
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    }
  );

  const [activeStep, setActiveStep] = useState<'basic' | 'segments' | 'travelers' | 'visa'>('basic');
  const allCountries = getAllCountries();

  // Add segment
  const addSegment = () => {
    const lastSegment = trip.segments[trip.segments.length - 1];
    const startDate = lastSegment
      ? new Date(new Date(lastSegment.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    const newSegment: TripSegment = {
      id: `segment_${Date.now()}`,
      countryIso2: 'TH',
      startDate,
      endDate: startDate,
      cities: []
    };

    setTrip({
      ...trip,
      segments: [...trip.segments, newSegment],
      updated: new Date().toISOString()
    });
  };

  // Update segment
  const updateSegment = (index: number, updates: Partial<TripSegment>) => {
    const newSegments = [...trip.segments];
    newSegments[index] = { ...newSegments[index], ...updates };

    setTrip({
      ...trip,
      segments: newSegments,
      updated: new Date().toISOString()
    });
  };

  // Remove segment
  const removeSegment = (index: number) => {
    setTrip({
      ...trip,
      segments: trip.segments.filter((_, i) => i !== index),
      updated: new Date().toISOString()
    });
  };

  // Add traveler
  const addTraveler = () => {
    setTrip({
      ...trip,
      travelers: [
        ...trip.travelers,
        {
          name: '',
          nationality: 'GB'
        }
      ],
      updated: new Date().toISOString()
    });
  };

  // Update traveler
  const updateTraveler = (index: number, updates: Partial<typeof trip.travelers[0]>) => {
    const newTravelers = [...trip.travelers];
    newTravelers[index] = { ...newTravelers[index], ...updates };

    setTrip({
      ...trip,
      travelers: newTravelers,
      updated: new Date().toISOString()
    });
  };

  // Remove traveler
  const removeTraveler = (index: number) => {
    setTrip({
      ...trip,
      travelers: trip.travelers.filter((_, i) => i !== index),
      updated: new Date().toISOString()
    });
  };

  const handleSave = () => {
    onSave(trip);
  };

  const getCountryFlag = (iso2: string) => {
    return String.fromCodePoint(...iso2.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {initialTrip ? 'Edit Trip' : 'Create New Trip'}
        </h2>
        <p className="text-gray-600">Plan your multi-country adventure</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {(['basic', 'segments', 'travelers', 'visa'] as const).map((step, index) => (
            <React.Fragment key={step}>
              <button
                onClick={() => setActiveStep(step)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeStep === step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 text-sm">
                  {index + 1}
                </span>
                {step.charAt(0).toUpperCase() + step.slice(1)}
              </button>
              {index < 3 && (
                <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 1: Basic Info */}
      {activeStep === 'basic' && (
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Name *
            </label>
            <input
              type="text"
              value={trip.name}
              onChange={e => setTrip({ ...trip, name: e.target.value })}
              placeholder="e.g., Southeast Asia Adventure"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={trip.description || ''}
              onChange={e => setTrip({ ...trip, description: e.target.value })}
              placeholder="Brief description of your trip..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Currency
            </label>
            <select
              value={trip.homeCurrency}
              onChange={e => setTrip({ ...trip, homeCurrency: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="GBP">GBP - British Pound</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>

          <button
            onClick={() => setActiveStep('segments')}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Next: Add Destinations
          </button>
        </div>
      )}

      {/* Step 2: Segments */}
      {activeStep === 'segments' && (
        <div className="space-y-4">
          {trip.segments.map((segment, index) => (
            <div key={segment.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Segment {index + 1}
                </h3>
                {trip.segments.length > 1 && (
                  <button
                    onClick={() => removeSegment(index)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <select
                    value={segment.countryIso2}
                    onChange={e => updateSegment(index, { countryIso2: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {allCountries.map(country => (
                      <option key={country.iso2} value={country.iso2}>
                        {getCountryFlag(country.iso2)} {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cities
                  </label>
                  <input
                    type="text"
                    value={segment.cities.join(', ')}
                    onChange={e => updateSegment(index, {
                      cities: e.target.value.split(',').map(c => c.trim()).filter(Boolean)
                    })}
                    placeholder="e.g., Bangkok, Phuket"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={segment.startDate}
                    onChange={e => updateSegment(index, { startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={segment.endDate}
                    onChange={e => updateSegment(index, { endDate: e.target.value })}
                    min={segment.startDate}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addSegment}
            className="w-full px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 font-medium transition-colors"
          >
            + Add Another Destination
          </button>

          {trip.segments.length > 0 && (
            <div className="flex gap-4">
              <button
                onClick={() => setActiveStep('basic')}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Back
              </button>
              <button
                onClick={() => setActiveStep('travelers')}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Next: Add Travelers
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Travelers */}
      {activeStep === 'travelers' && (
        <div className="space-y-4">
          {trip.travelers.map((traveler, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Traveler {index + 1}
                </h3>
                {trip.travelers.length > 1 && (
                  <button
                    onClick={() => removeTraveler(index)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={traveler.name}
                    onChange={e => updateTraveler(index, { name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality *
                  </label>
                  <select
                    value={traveler.nationality}
                    onChange={e => updateTraveler(index, { nationality: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {allCountries.map(country => (
                      <option key={country.iso2} value={country.iso2}>
                        {getCountryFlag(country.iso2)} {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passport Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={traveler.passportNumber || ''}
                    onChange={e => updateTraveler(index, { passportNumber: e.target.value })}
                    placeholder="123456789"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passport Expiry (Optional)
                  </label>
                  <input
                    type="date"
                    value={traveler.passportExpiry || ''}
                    onChange={e => updateTraveler(index, { passportExpiry: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addTraveler}
            className="w-full px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 font-medium transition-colors"
          >
            + Add Another Traveler
          </button>

          <div className="flex gap-4">
            <button
              onClick={() => setActiveStep('segments')}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Back
            </button>
            <button
              onClick={() => setActiveStep('visa')}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Next: Check Visas
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Visa Requirements */}
      {activeStep === 'visa' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Trip Summary
            </h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Duration:</span>
                <span className="ml-2 font-semibold">{getTripDuration(trip)} days</span>
              </div>
              <div>
                <span className="text-gray-600">Countries:</span>
                <span className="ml-2 font-semibold">{getCountriesInTrip(trip).length}</span>
              </div>
              <div>
                <span className="text-gray-600">Travelers:</span>
                <span className="ml-2 font-semibold">{trip.travelers.length}</span>
              </div>
            </div>
          </div>

          {trip.travelers.map((traveler, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Visa Requirements for {traveler.name || `Traveler ${index + 1}`}
              </h4>
              <VisaChecker
                nationality={traveler.nationality}
                destinations={getCountriesInTrip(trip)}
                departureDate={trip.segments[0]?.startDate}
              />
            </div>
          ))}

          <div className="flex gap-4">
            <button
              onClick={() => setActiveStep('travelers')}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Back
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              Save Trip
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiCountryTripBuilder;
