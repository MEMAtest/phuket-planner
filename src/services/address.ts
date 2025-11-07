// ──────────────────────────────────────────────────────────────────────────────
// Address Service - Schema-driven address forms
// Different countries have different address layouts
// ──────────────────────────────────────────────────────────────────────────────

export type Address = {
  line1: string;
  line2?: string;
  city?: string;
  province?: string;
  district?: string;
  postalCode?: string;
  country: string;
};

export type AddressField = {
  id: keyof Address;
  label: string;
  required?: boolean;
  placeholder?: string;
};

/**
 * Get address fields for a specific country schema
 * This drives the form layout and validation
 */
export function getAddressFields(schemaKey: string): AddressField[] {
  switch (schemaKey) {
    case 'HK':
      return [
        {
          id: 'line1',
          label: 'Flat/Floor/Building',
          required: true,
          placeholder: 'Flat A, 10/F, Example Building'
        },
        {
          id: 'line2',
          label: 'Street Address',
          placeholder: '123 Nathan Road'
        },
        {
          id: 'district',
          label: 'District',
          required: true,
          placeholder: 'Tsim Sha Tsui'
        },
        {
          id: 'city',
          label: 'Area',
          placeholder: 'Kowloon'
        }
      ];

    case 'CN':
      return [
        {
          id: 'province',
          label: 'Province',
          required: true,
          placeholder: 'Beijing'
        },
        {
          id: 'city',
          label: 'City',
          required: true,
          placeholder: 'Beijing'
        },
        {
          id: 'district',
          label: 'District',
          required: true,
          placeholder: 'Chaoyang District'
        },
        {
          id: 'line1',
          label: 'Street Address',
          required: true,
          placeholder: 'No. 1 Chang\'an Avenue'
        },
        {
          id: 'line2',
          label: 'Building/Apartment',
          placeholder: 'Building 2, Unit 301'
        },
        {
          id: 'postalCode',
          label: 'Postal Code',
          placeholder: '100000'
        }
      ];

    case 'TH':
      return [
        {
          id: 'line1',
          label: 'House/Building Number',
          required: true,
          placeholder: '123/45'
        },
        {
          id: 'line2',
          label: 'Street/Soi',
          placeholder: 'Soi Bangla, Patong Beach'
        },
        {
          id: 'district',
          label: 'District (Tambon)',
          required: true,
          placeholder: 'Patong'
        },
        {
          id: 'city',
          label: 'City (Amphoe)',
          required: true,
          placeholder: 'Kathu'
        },
        {
          id: 'province',
          label: 'Province (Changwat)',
          required: true,
          placeholder: 'Phuket'
        },
        {
          id: 'postalCode',
          label: 'Postal Code',
          required: true,
          placeholder: '83150'
        }
      ];

    default:
      // Generic international address format
      return [
        {
          id: 'line1',
          label: 'Address Line 1',
          required: true,
          placeholder: 'Street address'
        },
        {
          id: 'line2',
          label: 'Address Line 2',
          placeholder: 'Apartment, suite, etc.'
        },
        {
          id: 'city',
          label: 'City',
          required: true,
          placeholder: 'City'
        },
        {
          id: 'province',
          label: 'State/Province',
          placeholder: 'State or province'
        },
        {
          id: 'postalCode',
          label: 'Postal Code',
          placeholder: 'Postal code'
        }
      ];
  }
}

/**
 * Format address for display (single line)
 */
export function formatAddress(address: Address): string {
  const parts: string[] = [];

  if (address.line1) parts.push(address.line1);
  if (address.line2) parts.push(address.line2);
  if (address.district) parts.push(address.district);
  if (address.city) parts.push(address.city);
  if (address.province) parts.push(address.province);
  if (address.postalCode) parts.push(address.postalCode);
  if (address.country) parts.push(address.country);

  return parts.join(', ');
}

/**
 * Validate address completeness
 */
export function validateAddress(address: Address, schemaKey: string): string[] {
  const errors: string[] = [];
  const fields = getAddressFields(schemaKey);

  fields.forEach(field => {
    if (field.required && !address[field.id]) {
      errors.push(`${field.label} is required`);
    }
  });

  return errors;
}
