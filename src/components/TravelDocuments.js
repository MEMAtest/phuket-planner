import React, { useState } from 'react';

const defaultTravelers = [
  { id: 1, name: 'Traveler One', age: '34', nationality: 'Canadian' },
  { id: 2, name: 'Traveler Two', age: '32', nationality: 'British' },
  { id: 3, name: 'Traveler Three', age: '8', nationality: 'Canadian' },
  { id: 4, name: 'Traveler Four', age: '5', nationality: 'British' },
];

const TravelDocuments = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [showPolicy, setShowPolicy] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [copiedInsurance, setCopiedInsurance] = useState(null);

  const travelers = defaultTravelers;

  const policyNumber = typeof window !== 'undefined'
    ? localStorage.getItem('insurance_policy') || 'Enter policy number'
    : 'Enter policy number';

  const insuranceInfo = {
    provider: 'Nationwide FlexPlus',
    policyNumber,
    emergencyPhone: '+44 1603 605 159',
    claimsPhone: '+44 800 051 3355',
    coverage: {
      medical: 'Up to £10 million per person',
      cancellation: 'Up to £5,000 per person',
      baggage: 'Up to £2,500 per person',
      personalMoney: 'Up to £750 per person',
      excess: '£75 per person per claim',
    },
    documents: [
      'Policy certificate',
      'European Health Insurance Card (EHIC)',
      'Receipts for claims',
      'Police report (if theft)',
    ],
    claimProcess: [
      'Call emergency number immediately for medical emergencies',
      'Keep all receipts and documentation',
      'Report theft to local police within 24 hours',
      'Submit claim within 31 days of return',
      'Email claims to: travel.claims@nationwide.co.uk',
    ],
  };

  const copyToClipboard = (text, fieldId) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const copyInsuranceInfo = (text, field) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedInsurance(field);
      setTimeout(() => setCopiedInsurance(null), 2000);
    }
  };

  const updatePolicyNumber = (value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('insurance_policy', value);
    }
  };

  const emergencyContacts = {
    thailand: [
      { name: 'Tourist Police', number: '1155', note: '24/7 English support' },
      { name: 'Phuket Hospital', number: '+66 76 361 234', note: 'Government hospital' },
      { name: 'Bangkok Hospital Phuket', number: '+66 76 254 425', note: 'Private - Best for emergencies' },
      { name: 'Anantara Mai Khao Hotel', number: '+66 76 336 100', note: 'Your accommodation' },
    ],
    embassies: [
      { country: 'UK Embassy Bangkok', number: '+66 2 305 8333', note: 'Emergency: +66 2 305 8333' },
      { country: 'German Embassy Bangkok', number: '+66 2 287 9000', note: 'Emergency: +66 81 845 6224' },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setSelectedSection(selectedSection === 'emergency' ? null : 'emergency')}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200"
          >
            🚨 Emergency
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200"
          >
            🖨️ Print
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-3">
          Traveler profiles are intentionally limited to summary information.
        </p>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-lg text-blue-800 mb-4 flex items-center justify-between">
          <span>🏥 Travel Insurance - Nationwide</span>
          <button
            onClick={() => setShowPolicy(!showPolicy)}
            className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          >
            {showPolicy ? 'Hide' : 'Show'} Details
          </button>
        </h3>

        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <div className="bg-white p-3 rounded-lg">
            <p className="text-xs text-slate-600 mb-1">24/7 Emergency Medical</p>
            <button
              onClick={() => copyInsuranceInfo(insuranceInfo.emergencyPhone, 'emergency')}
              className="font-mono text-lg font-bold text-red-600 hover:text-red-800"
            >
              {insuranceInfo.emergencyPhone}
              {copiedInsurance === 'emergency' && <span className="ml-2 text-sm">✓</span>}
            </button>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-xs text-slate-600 mb-1">Claims Hotline (UK Hours)</p>
            <button
              onClick={() => copyInsuranceInfo(insuranceInfo.claimsPhone, 'claims')}
              className="font-mono text-lg font-bold text-blue-600 hover:text-blue-800"
            >
              {insuranceInfo.claimsPhone}
              {copiedInsurance === 'claims' && <span className="ml-2 text-sm">✓</span>}
            </button>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg mb-4">
          <label className="text-xs text-slate-600 block mb-1">Policy Number</label>
          <input
            type="text"
            defaultValue={insuranceInfo.policyNumber}
            onChange={(e) => updatePolicyNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded-md font-mono text-sm"
            placeholder="Enter your policy number"
          />
        </div>

        {showPolicy && (
          <div className="space-y-4 mt-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-sm text-blue-800 mb-3">Coverage Limits</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(insuranceInfo.coverage).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="font-medium text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-sm text-blue-800 mb-3">
                Required Documents for Claims
              </h4>
              <ul className="space-y-1">
                {insuranceInfo.documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="text-green-600 mt-0.5">✓</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-sm text-blue-800 mb-3">
                How to Make a Claim
              </h4>
              <ol className="space-y-2">
                {insuranceInfo.claimProcess.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-xs">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
              <p className="text-xs text-amber-800">
                <strong>⚠️ Important:</strong> Always call the emergency number BEFORE
                incurring major medical expenses. Pre-authorization may be required for
                expensive treatments.
              </p>
            </div>
          </div>
        )}
      </div>

      {selectedSection === 'emergency' && (
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <h3 className="font-bold text-lg text-red-800 mb-4">🚨 Emergency Contacts</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-red-700 mb-2">Thailand Emergency</h4>
              <div className="space-y-2">
                {emergencyContacts.thailand.map((contact) => (
                  <div key={contact.name} className="bg-white p-2 rounded">
                    <p className="font-medium text-sm">{contact.name}</p>
                    <button
                      onClick={() => copyToClipboard(contact.number, contact.name)}
                      className="font-mono text-sm font-bold text-red-600"
                    >
                      {contact.number} {copiedField === contact.name && '✓'}
                    </button>
                    <p className="text-xs text-slate-600">{contact.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-red-700 mb-2">Embassy Support</h4>
              <div className="space-y-2">
                {emergencyContacts.embassies.map((contact) => (
                  <div key={contact.country} className="bg-white p-2 rounded">
                    <p className="font-medium text-sm">{contact.country}</p>
                    <button
                      onClick={() => copyToClipboard(contact.number, contact.country)}
                      className="font-mono text-xs text-slate-700"
                    >
                      {contact.number} {copiedField === contact.country && '✓'}
                    </button>
                    <p className="text-xs text-slate-600">{contact.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {travelers.map((traveler) => (
          <div key={traveler.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">{traveler.name}</h3>
              <p className="text-sm text-slate-600">Age: {traveler.age}</p>
              <p className="text-sm text-slate-600">Nationality: {traveler.nationality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelDocuments;
