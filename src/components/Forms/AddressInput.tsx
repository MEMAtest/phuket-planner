// ──────────────────────────────────────────────────────────────────────────────
// AddressInput Component - Schema-driven address form
// Layout adapts based on country's addressSchema
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Address, getAddressFields } from '../../services/address';
import { useCountry } from '../../state/CountryContext';

export type AddressInputProps = {
  value: Address;
  onChange: (address: Address) => void;
  schemaKey?: string; // Override country schema
  className?: string;
};

export const AddressInput: React.FC<AddressInputProps> = ({
  value,
  onChange,
  schemaKey,
  className = ''
}) => {
  const { country } = useCountry();
  const effectiveSchema = schemaKey || country.forms.addressSchema;
  const fields = getAddressFields(effectiveSchema);

  const handleFieldChange = (fieldId: keyof Address, fieldValue: string) => {
    onChange({
      ...value,
      [fieldId]: fieldValue
    });
  };

  return (
    <div className={`grid gap-3 ${className}`}>
      {fields.map(field => (
        <label key={String(field.id)} className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </span>
          <input
            type="text"
            value={(value[field.id] as string) || ''}
            onChange={e => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      ))}
    </div>
  );
};

export default AddressInput;
