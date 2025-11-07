// ──────────────────────────────────────────────────────────────────────────────
// Test Features Page
// Demo page to test Multi-Country Trips, Visa Checker, and Offline Manager
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import MultiCountryTripBuilder from '../components/TripBuilder/MultiCountryTripBuilder';
import VisaChecker from '../components/VisaChecker';
import OfflineManager from '../components/OfflineManager';
import ItineraryView from '../components/ItineraryView';
import TripCard from '../components/TripCard';
import ExpenseTracker from '../components/ExpenseTracker';
import { MultiCountryTrip, Expense } from '../types/trip';

type ActiveTest = 'trip-builder' | 'visa-checker' | 'offline-manager' | 'itinerary-view' | 'trip-cards' | 'expense-tracker' | null;

export const TestFeaturesPage: React.FC = () => {
  const [activeTest, setActiveTest] = useState<ActiveTest>(null);
  const [savedTrip, setSavedTrip] = useState<MultiCountryTrip | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Sample trip data with itinerary for testing
  const sampleTripWithItinerary: MultiCountryTrip = {
    id: 'trip_sample_001',
    name: 'Southeast Asia Adventure',
    description: 'A 14-day journey through Thailand, Hong Kong, and Japan',
    segments: [
      {
        id: 'segment_th_001',
        countryIso2: 'TH',
        startDate: '2025-06-01',
        endDate: '2025-06-07',
        cities: ['Bangkok', 'Phuket'],
        itinerary: [
          {
            id: 'item_001',
            date: '2025-06-01',
            time: '14:00',
            type: 'activity',
            title: 'Visit Grand Palace',
            description: 'Explore the stunning architecture and history',
            location: {
              name: 'Grand Palace',
              address: 'Na Phra Lan Rd, Phra Borom Maha Ratchawang, Phra Nakhon, Bangkok'
            },
            cost: { amount: 500, currency: 'THB' }
          },
          {
            id: 'item_002',
            date: '2025-06-01',
            time: '19:00',
            type: 'meal',
            title: 'Dinner at Street Market',
            location: { name: 'Chatuchak Weekend Market' },
            cost: { amount: 300, currency: 'THB' }
          },
          {
            id: 'item_003',
            date: '2025-06-02',
            time: '10:00',
            type: 'activity',
            title: 'Wat Pho Temple Tour',
            cost: { amount: 200, currency: 'THB' }
          }
        ]
      },
      {
        id: 'segment_hk_001',
        countryIso2: 'HK',
        startDate: '2025-06-08',
        endDate: '2025-06-10',
        cities: ['Hong Kong'],
        itinerary: [
          {
            id: 'item_004',
            date: '2025-06-08',
            time: '15:00',
            type: 'activity',
            title: 'Victoria Peak Tram',
            cost: { amount: 99, currency: 'HKD' }
          }
        ]
      },
      {
        id: 'segment_jp_001',
        countryIso2: 'JP',
        startDate: '2025-06-11',
        endDate: '2025-06-15',
        cities: ['Tokyo', 'Kyoto'],
        itinerary: [
          {
            id: 'item_005',
            date: '2025-06-11',
            time: '09:00',
            type: 'transport',
            title: 'Shinkansen to Kyoto',
            cost: { amount: 13320, currency: 'JPY' }
          }
        ]
      }
    ],
    travelers: [
      {
        name: 'Alice Smith',
        nationality: 'GB',
        passportNumber: 'GB123456789',
        passportExpiry: '2030-12-31'
      },
      {
        name: 'Bob Jones',
        nationality: 'US',
        passportNumber: 'US987654321',
        passportExpiry: '2029-06-15'
      }
    ],
    homeCurrency: 'GBP',
    budget: {
      total: 5000,
      currency: 'GBP'
    },
    created: '2025-01-01T00:00:00Z',
    updated: '2025-01-01T00:00:00Z'
  };

  const handleTripSave = (trip: MultiCountryTrip) => {
    console.log('Trip saved:', trip);
    setSavedTrip(trip);
    setActiveTest(null);
    alert('Trip saved successfully! Check console for details.');
  };

  const handleTripCancel = () => {
    setActiveTest(null);
  };

  const handleAddExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses(expenses.filter(e => e.id !== expenseId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">🧪 Feature Testing Lab</h1>
          <p className="text-blue-100">
            Test Phase 2 & Phase 3 features: Multi-Country Trips, Itinerary View, Expense Tracker, and more
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!activeTest && (
          <>
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Multi-Country Trip Builder */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🌍</div>
                <h2 className="text-2xl font-bold mb-2">Multi-Country Trips</h2>
                <p className="text-gray-600 mb-4">
                  Create complex itineraries spanning multiple countries with automatic visa checks.
                </p>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  <li>✅ Unlimited countries per trip</li>
                  <li>✅ Traveler management</li>
                  <li>✅ Automatic visa checking</li>
                  <li>✅ Date range tracking</li>
                </ul>
                <button
                  onClick={() => setActiveTest('trip-builder')}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Test Trip Builder
                </button>
              </div>

              {/* Visa Checker */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">📋</div>
                <h2 className="text-2xl font-bold mb-2">Visa Checker</h2>
                <p className="text-gray-600 mb-4">
                  Check visa requirements with traffic light indicators and deadlines.
                </p>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  <li>🟢 Visa-free destinations</li>
                  <li>🟡 eVisa / ETA required</li>
                  <li>🔴 Embassy visa needed</li>
                  <li>✅ Cost & deadline info</li>
                </ul>
                <button
                  onClick={() => setActiveTest('visa-checker')}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                >
                  Test Visa Checker
                </button>
              </div>

              {/* Offline Manager */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🔌</div>
                <h2 className="text-2xl font-bold mb-2">Offline PWA</h2>
                <p className="text-gray-600 mb-4">
                  Download country packs for offline use. Works without internet!
                </p>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  <li>✅ Download country packs</li>
                  <li>✅ 100% offline support</li>
                  <li>✅ Storage management</li>
                  <li>✅ Auto-updates</li>
                </ul>
                <button
                  onClick={() => setActiveTest('offline-manager')}
                  className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors"
                >
                  Test Offline Manager
                </button>
              </div>
            </div>

            {/* Phase 3 Feature Cards */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Phase 3 Features</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Itinerary View */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">📅</div>
                <h2 className="text-2xl font-bold mb-2">Itinerary View</h2>
                <p className="text-gray-600 mb-4">
                  Day-by-day itinerary organized by country with activities and details.
                </p>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  <li>✅ Grouped by country</li>
                  <li>✅ Daily activities timeline</li>
                  <li>✅ Country quick info</li>
                  <li>✅ Emergency contacts</li>
                </ul>
                <button
                  onClick={() => setActiveTest('itinerary-view')}
                  className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                >
                  Test Itinerary View
                </button>
              </div>

              {/* Trip Cards */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🎫</div>
                <h2 className="text-2xl font-bold mb-2">Trip Cards</h2>
                <p className="text-gray-600 mb-4">
                  Trip summaries with integrated visa status badges and warnings.
                </p>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  <li>✅ Visa summary badges</li>
                  <li>✅ Country breakdown</li>
                  <li>✅ Traveler visa details</li>
                  <li>✅ Budget display</li>
                </ul>
                <button
                  onClick={() => setActiveTest('trip-cards')}
                  className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors"
                >
                  Test Trip Cards
                </button>
              </div>

              {/* Expense Tracker */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">💰</div>
                <h2 className="text-2xl font-bold mb-2">Expense Tracker</h2>
                <p className="text-gray-600 mb-4">
                  Multi-currency expense tracking with automatic conversion to home currency.
                </p>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  <li>✅ Multi-currency support</li>
                  <li>✅ Auto FX conversion</li>
                  <li>✅ Category & country views</li>
                  <li>✅ Budget tracking</li>
                </ul>
                <button
                  onClick={() => setActiveTest('expense-tracker')}
                  className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors"
                >
                  Test Expense Tracker
                </button>
              </div>
            </div>

            {/* Saved Trip Display */}
            {savedTrip && (
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-green-900 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Last Saved Trip
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Name:</span> {savedTrip.name}
                  </div>
                  <div>
                    <span className="font-medium">Countries:</span> {savedTrip.segments.length}
                  </div>
                  <div>
                    <span className="font-medium">Travelers:</span> {savedTrip.travelers.length}
                  </div>
                  <div>
                    <span className="font-medium">Home Currency:</span> {savedTrip.homeCurrency}
                  </div>
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer font-medium text-green-900 hover:text-green-700">
                    View JSON
                  </summary>
                  <pre className="mt-2 bg-white p-4 rounded border overflow-auto text-xs">
                    {JSON.stringify(savedTrip, null, 2)}
                  </pre>
                </details>
              </div>
            )}

            {/* Testing Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">📝 Testing Instructions</h3>
              <div className="space-y-4 text-sm text-blue-800">
                <div>
                  <h4 className="font-semibold mb-1">1. Multi-Country Trip Builder</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Create a trip with 2-3 countries (e.g., Thailand → Hong Kong → Japan)</li>
                    <li>Add travelers with different nationalities</li>
                    <li>Check visa requirements automatically in step 4</li>
                    <li>Save and verify the trip appears above</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">2. Visa Checker</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Test different nationalities (GB, US, AU)</li>
                    <li>Try destinations that require visas (China) vs visa-free (Thailand)</li>
                    <li>Check if costs and deadlines display correctly</li>
                    <li>Verify "Apply" links work</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">3. Offline Manager</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Download 1-2 country packs (note: service worker must be active)</li>
                    <li>Watch storage usage bar update</li>
                    <li>Remove a pack and see storage decrease</li>
                    <li>Test offline: DevTools → Network → Offline, then reload</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">4. PWA Features (Production Build Only)</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Run: <code className="bg-blue-100 px-1 rounded">npm run build</code></li>
                    <li>Run: <code className="bg-blue-100 px-1 rounded">npx serve -s build</code></li>
                    <li>Open in browser, check service worker in DevTools</li>
                    <li>Test "Add to Home Screen" on mobile</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Active Test Views */}
        {activeTest === 'trip-builder' && (
          <div>
            <button
              onClick={() => setActiveTest(null)}
              className="mb-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              ← Back to Menu
            </button>
            <MultiCountryTripBuilder
              onSave={handleTripSave}
              onCancel={handleTripCancel}
            />
          </div>
        )}

        {activeTest === 'visa-checker' && (
          <div>
            <button
              onClick={() => setActiveTest(null)}
              className="mb-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              ← Back to Menu
            </button>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Visa Checker Demo</h2>

              <div className="space-y-8">
                {/* Example 1: British to Asia */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Example 1: British Passport → Southeast Asia Tour
                  </h3>
                  <VisaChecker
                    nationality="GB"
                    destinations={['TH', 'HK', 'CN', 'JP']}
                    departureDate="2025-06-01"
                  />
                </div>

                <hr className="border-gray-200" />

                {/* Example 2: American to Asia */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Example 2: US Passport → Asia Trip
                  </h3>
                  <VisaChecker
                    nationality="US"
                    destinations={['TH', 'HK', 'CN', 'JP']}
                    departureDate="2025-07-15"
                  />
                </div>

                <hr className="border-gray-200" />

                {/* Example 3: Australian */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Example 3: Australian Passport → Quick China Visit
                  </h3>
                  <VisaChecker
                    nationality="AU"
                    destinations={['HK', 'CN']}
                    departureDate="2025-08-01"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTest === 'offline-manager' && (
          <div>
            <button
              onClick={() => setActiveTest(null)}
              className="mb-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              ← Back to Menu
            </button>
            <OfflineManager />
          </div>
        )}

        {activeTest === 'itinerary-view' && (
          <div>
            <button
              onClick={() => setActiveTest(null)}
              className="mb-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              ← Back to Menu
            </button>
            <ItineraryView trip={sampleTripWithItinerary} />
          </div>
        )}

        {activeTest === 'trip-cards' && (
          <div>
            <button
              onClick={() => setActiveTest(null)}
              className="mb-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              ← Back to Menu
            </button>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Trip Cards with Visa Summary</h2>
              <p className="text-gray-600 mb-6">
                Each trip card shows a comprehensive visa summary with traffic light indicators
                for all travelers across all destinations.
              </p>

              <TripCard
                trip={sampleTripWithItinerary}
                onClick={() => alert('Trip clicked! In real app, this would navigate to trip details.')}
              />

              {savedTrip && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Saved Trip</h3>
                  <TripCard
                    trip={savedTrip}
                    onClick={() => alert('Viewing your saved trip')}
                  />
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-2">Features Demonstrated:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                  <li>Traffic light visa status (🟢 visa-free, 🟡 eVisa, 🔴 required)</li>
                  <li>Percentage breakdown of visa requirements</li>
                  <li>Expandable per-traveler visa details</li>
                  <li>Visual warning badge if any visas are required</li>
                  <li>Country flags and duration display</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTest === 'expense-tracker' && (
          <div>
            <button
              onClick={() => setActiveTest(null)}
              className="mb-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              ← Back to Menu
            </button>
            <ExpenseTracker
              trip={sampleTripWithItinerary}
              expenses={expenses}
              onAddExpense={handleAddExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestFeaturesPage;
