// ──────────────────────────────────────────────────────────────────────────────
// Visa Requirements Database
// Static data - can be replaced with API in production
// ──────────────────────────────────────────────────────────────────────────────

import { VisaRequirement } from '../types/trip';

// Visa requirements matrix: [nationality][destination]
// This is a sample - in production, use an API like Sherpa° or VisaHQ
export const VISA_REQUIREMENTS: Record<string, Record<string, VisaRequirement>> = {
  // British passport holders
  GB: {
    TH: {
      destination: 'TH',
      nationality: 'GB',
      required: false,
      type: 'visa-free',
      maxStay: 30,
      notes: 'Can extend for additional 30 days at immigration office'
    },
    HK: {
      destination: 'HK',
      nationality: 'GB',
      required: false,
      type: 'visa-free',
      maxStay: 180,
      notes: 'British passport holders can stay up to 6 months'
    },
    CN: {
      destination: 'CN',
      nationality: 'GB',
      required: true,
      type: 'embassy-visa',
      maxStay: 30,
      cost: { amount: 151, currency: 'GBP' },
      processingTime: 4,
      validityPeriod: 90,
      requirements: [
        'Valid passport (6 months validity)',
        'Completed application form',
        'Passport photo',
        'Proof of accommodation',
        'Flight bookings'
      ],
      applyUrl: 'https://www.visaforchina.org',
      notes: '144-hour visa-free transit available for some cities'
    },
    JP: {
      destination: 'JP',
      nationality: 'GB',
      required: false,
      type: 'visa-free',
      maxStay: 90,
      notes: 'Tourist activities only'
    },
    US: {
      destination: 'US',
      nationality: 'GB',
      required: true,
      type: 'eta',
      maxStay: 90,
      cost: { amount: 21, currency: 'USD' },
      processingTime: 0,
      validityPeriod: 730,
      requirements: ['Valid passport', 'ESTA application online'],
      applyUrl: 'https://esta.cbp.dhs.gov',
      notes: 'ESTA valid for 2 years, multiple entries'
    }
  },

  // US passport holders
  US: {
    TH: {
      destination: 'TH',
      nationality: 'US',
      required: false,
      type: 'visa-free',
      maxStay: 30,
      notes: 'By air: 30 days, by land: 15 days'
    },
    HK: {
      destination: 'HK',
      nationality: 'US',
      required: false,
      type: 'visa-free',
      maxStay: 90
    },
    CN: {
      destination: 'CN',
      nationality: 'US',
      required: true,
      type: 'embassy-visa',
      maxStay: 30,
      cost: { amount: 140, currency: 'USD' },
      processingTime: 4,
      requirements: [
        'Valid passport (6 months validity)',
        'Visa application form',
        'Passport photo',
        'Proof of travel arrangements'
      ],
      applyUrl: 'http://www.china-embassy.org'
    },
    JP: {
      destination: 'JP',
      nationality: 'US',
      required: false,
      type: 'visa-free',
      maxStay: 90
    }
  },

  // Add more nationalities as needed
  AU: {
    TH: {
      destination: 'TH',
      nationality: 'AU',
      required: false,
      type: 'visa-free',
      maxStay: 30
    },
    HK: {
      destination: 'HK',
      nationality: 'AU',
      required: false,
      type: 'visa-free',
      maxStay: 90
    },
    CN: {
      destination: 'CN',
      nationality: 'AU',
      required: true,
      type: 'eVisa',
      maxStay: 30,
      cost: { amount: 140, currency: 'AUD' },
      processingTime: 4,
      applyUrl: 'http://www.visaforchina.org'
    }
  }
};

/**
 * Get visa requirement for a traveler going to a destination
 */
export function getVisaRequirement(
  nationality: string,
  destination: string
): VisaRequirement | null {
  // Same country - no visa needed
  if (nationality === destination) {
    return {
      destination,
      nationality,
      required: false,
      type: 'visa-free',
      notes: 'National of destination country'
    };
  }

  const nationalityReqs = VISA_REQUIREMENTS[nationality];
  if (!nationalityReqs) {
    return null; // Unknown nationality
  }

  return nationalityReqs[destination] || null;
}

/**
 * Get all visa requirements for a multi-country trip
 */
export function getAllVisaRequirements(
  nationality: string,
  destinations: string[]
): VisaRequirement[] {
  return destinations
    .map(dest => getVisaRequirement(nationality, dest))
    .filter((req): req is VisaRequirement => req !== null);
}

/**
 * Calculate recommended visa application date
 */
export function getVisaApplicationDeadline(
  requirement: VisaRequirement,
  departureDate: string
): Date | null {
  if (!requirement.required || !requirement.processingTime) {
    return null;
  }

  const departure = new Date(departureDate);
  const daysBuffer = 7; // Extra buffer for safety
  const totalDays = requirement.processingTime + daysBuffer;

  const deadline = new Date(departure);
  deadline.setDate(deadline.getDate() - totalDays);

  return deadline;
}
