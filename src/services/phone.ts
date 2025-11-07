// ──────────────────────────────────────────────────────────────────────────────
// Phone Service - International phone number handling
// Uses libphonenumber-js for validation and formatting
// ──────────────────────────────────────────────────────────────────────────────

import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

/**
 * Convert phone number to E.164 format (e.g., +85223456789)
 * @param input Raw phone number input
 * @param defaultCountry ISO 3166-1 alpha-2 country code
 * @returns E.164 formatted number or null if invalid
 */
export function toE164(input: string, defaultCountry: string): string | null {
  try {
    const phoneNumber = parsePhoneNumberFromString(input, defaultCountry as CountryCode);

    if (phoneNumber?.isValid()) {
      return phoneNumber.number;
    }

    return null;
  } catch (error) {
    console.error('Error parsing phone number:', error);
    return null;
  }
}

/**
 * Format phone number for display in local format
 * @param e164 E.164 formatted phone number
 * @param format Display format ('NATIONAL' or 'INTERNATIONAL')
 * @returns Formatted phone number
 */
export function formatPhoneNumber(
  e164: string,
  format: 'NATIONAL' | 'INTERNATIONAL' = 'NATIONAL'
): string {
  try {
    const phoneNumber = parsePhoneNumberFromString(e164);

    if (phoneNumber) {
      return phoneNumber.format(format);
    }

    return e164;
  } catch (error) {
    console.error('Error formatting phone number:', error);
    return e164;
  }
}

/**
 * Validate phone number
 * @param input Phone number to validate
 * @param defaultCountry ISO 3166-1 alpha-2 country code
 * @returns True if valid
 */
export function isValidPhoneNumber(input: string, defaultCountry: string): boolean {
  try {
    const phoneNumber = parsePhoneNumberFromString(input, defaultCountry as CountryCode);
    return phoneNumber?.isValid() ?? false;
  } catch (error) {
    return false;
  }
}

/**
 * Get country calling code (e.g., '852' for Hong Kong)
 * @param countryCode ISO 3166-1 alpha-2 country code
 * @returns Calling code or undefined
 */
export function getCountryCallingCode(countryCode: string): string | undefined {
  try {
    const phoneNumber = parsePhoneNumberFromString('+1', countryCode as CountryCode);
    return phoneNumber?.countryCallingCode;
  } catch (error) {
    return undefined;
  }
}
