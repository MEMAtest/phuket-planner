// ──────────────────────────────────────────────────────────────────────────────
// Multi-Country Trip Types
// Supports complex itineraries spanning multiple countries
// ──────────────────────────────────────────────────────────────────────────────

export type Expense = {
  id: string;
  tripId: string;
  segmentId?: string;       // Optional link to trip segment
  itineraryItemId?: string; // Optional link to itinerary item
  date: string;             // ISO date
  category: 'accommodation' | 'food' | 'transport' | 'activities' | 'shopping' | 'other';
  description: string;
  amount: number;
  currency: string;
  paymentMethod?: 'cash' | 'card' | 'digital';
  notes?: string;
  receipt?: string;         // URL or reference
  tags?: string[];
};

export type ExpenseSummary = {
  totalByCategory: Record<string, { amount: number; currency: string }[]>;
  totalByCountry: Record<string, { amount: number; currency: string }[]>;
  totalByCurrency: Record<string, number>;
  grandTotal: {
    homeCurrency: string;
    amount: number;         // Converted to home currency
  };
};

export type ItineraryItem = {
  id: string;
  date: string;             // ISO date
  time?: string;            // HH:MM format
  type: 'activity' | 'meal' | 'transport' | 'accommodation' | 'other';
  title: string;
  description?: string;
  location?: {
    name: string;
    address?: string;
    lat?: number;
    lng?: number;
  };
  cost?: {
    amount: number;
    currency: string;
  };
  bookingReference?: string;
  notes?: string;
};

export type TripSegment = {
  id: string;
  countryIso2: string;
  startDate: string;        // ISO date
  endDate: string;          // ISO date
  cities: string[];
  itinerary?: ItineraryItem[];
  accommodation?: {
    name: string;
    address: string;
    checkIn: string;
    checkOut: string;
    confirmationNumber?: string;
  }[];
  transportation?: {
    type: 'flight' | 'train' | 'bus' | 'ferry' | 'car';
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    confirmationNumber?: string;
  };
};

export type MultiCountryTrip = {
  id: string;
  name: string;
  description?: string;
  segments: TripSegment[];
  travelers: {
    name: string;
    nationality: string;      // ISO 3166-1 alpha-2
    passportNumber?: string;
    passportExpiry?: string;
  }[];
  homeCurrency: string;
  budget?: {
    total: number;
    currency: string;
    perDay?: number;
  };
  created: string;
  updated: string;
};

export type VisaRequirement = {
  destination: string;        // Country ISO2
  nationality: string;        // Traveler nationality ISO2
  required: boolean;
  type: 'visa-free' | 'eVisa' | 'visa-on-arrival' | 'embassy-visa' | 'eta';
  maxStay?: number;           // Days
  cost?: {
    amount: number;
    currency: string;
  };
  processingTime?: number;    // Days
  validityPeriod?: number;    // Days
  requirements?: string[];
  applyUrl?: string;
  notes?: string;
};

// Helper to calculate total trip duration
export function getTripDuration(trip: MultiCountryTrip): number {
  if (trip.segments.length === 0) return 0;

  const firstSegment = trip.segments[0];
  const lastSegment = trip.segments[trip.segments.length - 1];

  const start = new Date(firstSegment.startDate);
  const end = new Date(lastSegment.endDate);

  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

// Get all unique countries in trip
export function getCountriesInTrip(trip: MultiCountryTrip): string[] {
  return [...new Set(trip.segments.map(seg => seg.countryIso2))];
}

// Calculate days per country
export function getDaysPerCountry(trip: MultiCountryTrip): Record<string, number> {
  const daysMap: Record<string, number> = {};

  trip.segments.forEach(segment => {
    const start = new Date(segment.startDate);
    const end = new Date(segment.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    daysMap[segment.countryIso2] = (daysMap[segment.countryIso2] || 0) + days;
  });

  return daysMap;
}
