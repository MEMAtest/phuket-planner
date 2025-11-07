// ──────────────────────────────────────────────────────────────────────────────
// VisaChecker Component
// Shows visa requirements for all trip destinations
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { getAllVisaRequirements, getVisaApplicationDeadline } from '../../services/visa';
import { VisaRequirement } from '../../types/trip';
import { COUNTRIES } from '../../countries';

export type VisaCheckerProps = {
  nationality: string;
  destinations: string[];
  departureDate?: string;
  className?: string;
};

export const VisaChecker: React.FC<VisaCheckerProps> = ({
  nationality,
  destinations,
  departureDate,
  className = ''
}) => {
  const [requirements, setRequirements] = useState<VisaRequirement[]>([]);

  useEffect(() => {
    const reqs = getAllVisaRequirements(nationality, destinations);
    setRequirements(reqs);
  }, [nationality, destinations]);

  const getStatusColor = (req: VisaRequirement) => {
    if (!req.required) return 'bg-green-50 border-green-200 text-green-800';
    if (req.type === 'eVisa' || req.type === 'eta') return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    return 'bg-red-50 border-red-200 text-red-800';
  };

  const getCostSummary = () => {
    const totals: Record<string, number> = {};
    requirements
      .filter(r => r.cost)
      .forEach(req => {
        if (req.cost) {
          totals[req.cost.currency] = (totals[req.cost.currency] || 0) + req.cost.amount;
        }
      });
    return totals;
  };

  const getStatusIcon = (req: VisaRequirement) => {
    if (!req.required) return '✓';
    if (req.type === 'eVisa' || req.type === 'eta') return '⚠';
    return '⚠';
  };

  const getStatusLabel = (req: VisaRequirement) => {
    if (!req.required) return 'Visa-Free';
    if (req.type === 'eVisa') return 'eVisa Required';
    if (req.type === 'eta') return 'ETA Required';
    if (req.type === 'visa-on-arrival') return 'Visa on Arrival';
    return 'Visa Required';
  };

  const formatCost = (cost?: { amount: number; currency: string }) => {
    if (!cost) return 'Free';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: cost.currency
    }).format(cost.amount);
  };

  const getNationalityName = (iso2: string) => {
    const country = COUNTRIES[iso2 as keyof typeof COUNTRIES];
    return country?.name || iso2;
  };

  if (requirements.length === 0) {
    return (
      <div className={`p-4 bg-gray-50 rounded-lg ${className}`}>
        <p className="text-gray-600 text-sm">
          Select your nationality and destinations to check visa requirements
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900">
          Visa Requirements for {getNationalityName(nationality)} Passport
        </h3>
      </div>

      {requirements.map((req, index) => {
        const deadline = departureDate && req.required
          ? getVisaApplicationDeadline(req, departureDate)
          : null;
        const isUrgent = deadline && deadline < new Date();

        return (
          <div
            key={index}
            className={`border-2 rounded-lg p-4 ${getStatusColor(req)} ${
              isUrgent ? 'ring-2 ring-red-500' : ''
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {COUNTRIES[req.destination as keyof typeof COUNTRIES]?.iso2
                    ? String.fromCodePoint(
                        ...req.destination.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0))
                      )
                    : '🌍'}
                </span>
                <div>
                  <h4 className="font-semibold text-lg">
                    {COUNTRIES[req.destination as keyof typeof COUNTRIES]?.name || req.destination}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl">{getStatusIcon(req)}</span>
                    <span className="font-medium">{getStatusLabel(req)}</span>
                  </div>
                </div>
              </div>

              {/* Cost */}
              {req.cost && (
                <div className="text-right">
                  <div className="text-sm text-gray-600">Cost</div>
                  <div className="font-bold text-lg">{formatCost(req.cost)}</div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              {req.maxStay && (
                <div>
                  <span className="text-gray-600">Max Stay:</span>
                  <span className="ml-2 font-medium">{req.maxStay} days</span>
                </div>
              )}
              {req.processingTime && (
                <div>
                  <span className="text-gray-600">Processing:</span>
                  <span className="ml-2 font-medium">{req.processingTime} days</span>
                </div>
              )}
              {req.validityPeriod && (
                <div>
                  <span className="text-gray-600">Validity:</span>
                  <span className="ml-2 font-medium">{req.validityPeriod} days</span>
                </div>
              )}
            </div>

            {/* Deadline Warning */}
            {deadline && (
              <div className={`p-3 rounded-lg mb-3 ${
                isUrgent ? 'bg-red-100 border border-red-300' : 'bg-blue-50 border border-blue-200'
              }`}>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">
                    {isUrgent ? 'URGENT: ' : 'Recommended: '}
                    Apply by {deadline.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            )}

            {/* Requirements */}
            {req.requirements && req.requirements.length > 0 && (
              <div className="mb-3">
                <div className="font-medium text-sm mb-2">Requirements:</div>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {req.requirements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notes */}
            {req.notes && (
              <div className="text-sm bg-white/50 p-2 rounded">
                <span className="font-medium">Note:</span> {req.notes}
              </div>
            )}

            {/* Apply Button */}
            {req.applyUrl && (
              <a
                href={req.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Apply for Visa
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        );
      })}

      {/* Summary */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold text-blue-900">Summary</span>
        </div>
        <div className="text-sm text-blue-800">
          <p>
            {requirements.filter(r => !r.required).length} visa-free destinations,{' '}
            {requirements.filter(r => r.required).length} requiring visas
          </p>
          {(() => {
            const totals = getCostSummary();
            const currencies = Object.keys(totals);
            if (currencies.length === 0) {
              return null;
            }
            return (
              <p className="mt-1 font-medium">
                Estimated visa costs:{' '}
                {currencies
                  .map(currency => formatCost({ amount: totals[currency], currency }))
                  .join(' + ')}
              </p>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default VisaChecker;
