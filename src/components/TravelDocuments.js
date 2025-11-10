import React, { useState, useEffect, useMemo } from 'react';
import { useCountry } from '../state/CountryContext';
import { getDestinationContacts } from '../data/countryContent';

const TravelDocuments = () => {
  const { country } = useCountry();
  // Demo Mode Control - SET THIS TO true FOR DEMOS
  const [isDemoMode, setIsDemoMode] = useState(true); // Toggle this for demo/real use
  const [showDemoPassword, setShowDemoPassword] = useState(false);
  const [password, setPassword] = useState('');
  const ADMIN_PASSWORD = 'Pk$2025#Om0s@nya!Tr4v3l'; // Very strong password
  
  // Your existing state variables
  const [showPassports, setShowPassports] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [showPolicy, setShowPolicy] = useState(false);

  // Function to unlock full access
  const unlockFullAccess = () => {
    if (password === ADMIN_PASSWORD) {
      setIsDemoMode(false);
      setShowDemoPassword(false);
      setPassword('');
    }
  };

  // Function to mask sensitive data
  const maskData = (data, type) => {
    if (!isDemoMode) return data;
    
    switch(type) {
      case 'passport':
        return '••••••••••';
      case 'dob':
        return '••/••/••••';
      case 'phone':
        return data ? data.substring(0, 7) + '••••' : '••••';
      case 'policy':
        return 'DEMO-XXXX-XXXX';
      case 'partial':
        return data ? data.substring(0, 3) + '•••' : '•••';
      default:
        return data;
    }
  };

  // Calculate age
  const calculateAge = (birthDate) => {
    if (isDemoMode) return { years: 0, months: 0 }; // Hide in demo
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    if (today.getDate() < birth.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }
    
    return { years, months };
  };

  const formatAge = (birthDate) => {
    if (isDemoMode) return 'Hidden';
    const age = calculateAge(birthDate);
    if (age.years === 0) {
      return `${age.months} month${age.months !== 1 ? 's' : ''}`;
    } else if (age.months === 0) {
      return `${age.years} year${age.years !== 1 ? 's' : ''}`;
    } else {
      return `${age.years}y ${age.months}m`;
    }
  };

  // Demo-safe traveler data
  const defaultTravelers = useMemo(() => ([
    {
      id: 1,
      name: "Amari Goziem Omosanya",
      role: "Child 1",
      passport: {
        number: "C4YM97W3P",
        nationality: "German",
        dateOfBirth: "2020-12-22",
        placeOfBirth: "Berlin",
        dateOfIssue: "2024-04-09",
        issuingAuthority: "Botschaft London",
        expiryDate: "2030-04-08"
      },
      medical: {
        bloodType: "O+",
        allergies: "None",
        medications: "None",
        dietaryRestrictions: "None",
        emergencyNotes: "Speaks German and English"
      },
      vaccinations: {
        lastUpdated: "2024-05-01",
        routine: "All current",
        covid19: "Age-appropriate doses",
        hepatitisA: "Completed",
        typhoid: "Not required",
        yellowFever: "Not required"
      },
      seat: "12C"
    },
    {
      id: 2,
      name: "Askia Anuoluwa Kwame Omosanya",
      role: "Child 2",
      passport: {
        number: "147253507",
        nationality: "British",
        dateOfBirth: "2023-10-16",
        placeOfBirth: "London",
        dateOfIssue: "2024-05-07",
        issuingAuthority: "HMPO",
        expiryDate: "2029-05-07"
      },
      medical: {
        bloodType: "A+",
        allergies: "None",
        medications: "None",
        dietaryRestrictions: "Formula/milk",
        emergencyNotes: "Youngest traveler"
      },
      vaccinations: {
        lastUpdated: "2024-06-01",
        routine: "6-month schedule",
        covid19: "Too young",
        hepatitisA: "First dose",
        typhoid: "Not required",
        yellowFever: "Not required"
      },
      seat: "12D"
    },
    {
      id: 3,
      name: "Ademola Edward Omosanya",
      role: "Parent 1",
      passport: {
        number: "144693769",
        nationality: "British",
        dateOfBirth: "1987-08-22",
        placeOfBirth: "Lagos",
        dateOfIssue: "2023-12-13",
        issuingAuthority: "HMPO",
        expiryDate: "2033-12-13"
      },
      medical: {
        bloodType: "O+",
        allergies: "None",
        medications: "None",
        dietaryRestrictions: "None",
        emergencyNotes: "Primary contact"
      },
      vaccinations: {
        lastUpdated: "2024-06-01",
        routine: "All current",
        covid19: "Fully + booster",
        hepatitisA: "Valid to 2030",
        typhoid: "Valid to 2027",
        yellowFever: "Lifetime"
      },
      seat: "12A"
    },
    {
      id: 4,
      name: "Angela Oppong Omosanya",
      role: "Parent 2",
      passport: {
        number: "C3FHL3LVT",
        nationality: "German",
        dateOfBirth: "1987-12-21",
        placeOfBirth: "Bottrop",
        dateOfIssue: "2022-06-22",
        issuingAuthority: "BA Mitte BÜA 1",
        expiryDate: "2032-06-21"
      },
      medical: {
        bloodType: "B+",
        allergies: "Penicillin",
        medications: "None",
        dietaryRestrictions: "None",
        emergencyNotes: "ALLERGIC TO PENICILLIN"
      },
      vaccinations: {
        lastUpdated: "2024-06-01",
        routine: "All current",
        covid19: "Fully + booster",
        hepatitisA: "Valid to 2029",
        typhoid: "Valid to 2026",
        yellowFever: "Lifetime"
      },
      seat: "12B"
    }
  ]), []);

  const destinationContacts = getDestinationContacts(country.iso2);
  const travelerStorageKey = useMemo(() => `travelers_${country.iso2}`, [country.iso2]);
  const emergencyNumbers = country.content?.emergency || {};

  const [travelers, setTravelers] = useState(defaultTravelers);

  const insuranceInfo = {
    provider: "Nationwide FlexPlus",
    policyNumber: localStorage.getItem('insurance_policy') || "Enter policy number",
    emergencyPhone: "+44 1603 605 159",
    claimsPhone: "+44 800 051 3355",
    coverage: {
      medical: "Up to £10 million per person",
      cancellation: "Up to £5,000 per person",
      baggage: "Up to £2,500 per person",
      personalMoney: "Up to £750 per person",
      excess: "£75 per person per claim"
    },
    documents: [
      "Policy certificate",
      "European Health Insurance Card (EHIC)",
      "Receipts for claims",
      "Police report (if theft)"
    ],
    claimProcess: [
      "Call emergency number immediately for medical emergencies",
      "Keep all receipts and documentation",
      "Report theft to local police within 24 hours",
      "Submit claim within 31 days of return",
      "Email claims to: travel.claims@nationwide.co.uk"
    ]
  };

  useEffect(() => {
    const saved = localStorage.getItem(travelerStorageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTravelers(parsed);
          return;
        }
      } catch (error) {
        console.error('Failed to parse traveler data', error);
      }
    }
    setTravelers(defaultTravelers);
  }, [travelerStorageKey, defaultTravelers]);

  useEffect(() => {
    if (!isDemoMode) {
      localStorage.setItem(travelerStorageKey, JSON.stringify(travelers));
    }
  }, [travelers, isDemoMode, travelerStorageKey]);

  const copyToClipboard = (text, fieldId) => {
    if (isDemoMode) {
      alert("Copy function disabled in demo mode");
      return;
    }
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getExpiryWarning = (expiryDate) => {
    if (isDemoMode) return 'text-slate-400';
    const expiry = new Date(expiryDate);
    const today = new Date();
    const monthsToExpiry = (expiry.getFullYear() - today.getFullYear()) * 12 + 
                          (expiry.getMonth() - today.getMonth());
    
    if (monthsToExpiry < 6) return 'text-red-600 font-bold';
    if (monthsToExpiry < 12) return 'text-amber-600';
    return 'text-green-600';
  };


  return (
    <div className="space-y-6">
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-amber-600 font-bold">🔒 DEMO MODE</span>
              <span className="text-sm text-amber-700">Sensitive information is hidden</span>
            </div>
            {!showDemoPassword ? (
              <button
                onClick={() => setShowDemoPassword(true)}
                className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200"
              >
                Admin Access
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && unlockFullAccess()}
                  placeholder="Admin password"
                  className="text-xs px-2 py-1 border rounded"
                />
                <button
                  onClick={unlockFullAccess}
                  className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Unlock
                </button>
                <button
                  onClick={() => setShowDemoPassword(false)}
                  className="text-xs px-2 py-1 bg-slate-200 rounded hover:bg-slate-300"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions Bar */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setShowPassports(!showPassports)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              showPassports 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            } ${isDemoMode ? 'opacity-50' : ''}`}
            disabled={isDemoMode}
          >
            {showPassports ? '🔒 Hide' : '🔓 Show'} Details
          </button>
          
          <button
            onClick={() => setSelectedSection(selectedSection === 'emergency' ? null : 'emergency')}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200"
          >
            🚨 Emergency
          </button>
          
          <button
            onClick={() => {
              if (!isDemoMode) {
                const allInfo = travelers.map(t => {
                  const age = formatAge(t.passport.dateOfBirth);
                  return `${t.name}\nPassport: ${t.passport.number}\nDOB: ${t.passport.dateOfBirth} (${age})\nSeat: ${t.seat}\nBlood Type: ${t.medical.bloodType}\n---`;
                }).join('\n');
                copyToClipboard(allInfo, 'all-travelers');
              }
            }}
            className={`px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 ${isDemoMode ? 'opacity-50' : ''}`}
            disabled={isDemoMode}
          >
            {copiedField === 'all-travelers' ? '✓ Copied!' : '📋 Copy All'}
          </button>
          
          <button
            onClick={() => !isDemoMode && window.print()}
            className={`px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 ${isDemoMode ? 'opacity-50' : ''}`}
            disabled={isDemoMode}
          >
            🖨️ Print
          </button>
        </div>
      </div>

      {/* Insurance Section */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-lg text-blue-800 mb-4 flex items-center justify-between">
          <span>🏥 Travel Insurance - Nationwide</span>
          <button
            onClick={() => !isDemoMode && setShowPolicy(!showPolicy)}
            className={`text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 ${isDemoMode ? 'opacity-50' : ''}`}
            disabled={isDemoMode}
          >
            {showPolicy ? 'Hide' : 'Show'} Details
          </button>
        </h3>

        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <div className="bg-white p-3 rounded-lg">
            <p className="text-xs text-slate-600 mb-1">24/7 Emergency Medical</p>
            <p className="font-mono text-lg font-bold text-red-600">
              {maskData(insuranceInfo.emergencyPhone, 'phone')}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-xs text-slate-600 mb-1">Claims Hotline</p>
            <p className="font-mono text-lg font-bold text-blue-600">
              {maskData(insuranceInfo.claimsPhone, 'phone')}
            </p>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg">
          <label className="text-xs text-slate-600 block mb-1">Policy Number</label>
          <p className="font-mono text-sm">{maskData(insuranceInfo.policyNumber, 'policy')}</p>
        </div>
      </div>

      {/* Emergency Contacts Section */}
      {selectedSection === 'emergency' && (
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <h3 className="font-bold text-lg text-red-800 mb-4">🚨 Emergency Contacts — {country.name}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-red-700 mb-2">Local Services</h4>
              <div className="space-y-2">
                {Object.entries(emergencyNumbers).map(([label, number]) => (
                  <div key={label} className="bg-white p-2 rounded">
                    <p className="font-medium text-sm text-slate-800">
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </p>
                    <p className="font-mono text-sm font-bold text-red-600">{number}</p>
                    <p className="text-xs text-slate-500">Direct emergency line</p>
                  </div>
                ))}
                {destinationContacts.local.map(contact => (
                  <div key={contact.label} className="bg-white p-2 rounded">
                    <p className="font-medium text-sm">{contact.label}</p>
                    <p className="font-mono text-sm font-bold text-red-600">{contact.number}</p>
                    {contact.note && <p className="text-xs text-slate-600">{contact.note}</p>}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm text-red-700 mb-2">Embassy Support</h4>
              <div className="space-y-2">
                {destinationContacts.embassy.map(contact => (
                  <div key={contact.label} className="bg-white p-2 rounded">
                    <p className="font-medium text-sm">{contact.label}</p>
                    <p className="font-mono text-xs text-slate-700">{contact.number}</p>
                    {contact.note && <p className="text-xs text-slate-600">{contact.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Travelers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {travelers.map(traveler => (
          <div key={traveler.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className={`p-4 ${traveler.role.includes('Child') ? 'bg-blue-50' : 'bg-slate-50'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{traveler.name}</h3>
                  <p className="text-sm text-slate-600">
                    {traveler.role} • {traveler.passport.nationality}
                    {!isDemoMode && ` • Age: ${formatAge(traveler.passport.dateOfBirth)}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  {isDemoMode && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                      Demo
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Passport</span>
                <span className="font-mono text-sm text-slate-800">
                  {maskData(traveler.passport.number, 'passport')}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">DOB</span>
                <span className="text-sm text-slate-800">
                  {maskData(traveler.passport.dateOfBirth, 'dob')}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Expiry</span>
                <span className={`text-sm font-medium ${getExpiryWarning(traveler.passport.expiryDate)}`}>
                  {isDemoMode ? '••/••/••••' : new Date(traveler.passport.expiryDate).toLocaleDateString('en-GB')}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Seat</span>
                <span className="text-sm font-bold text-slate-800">
                  {isDemoMode ? '••' : traveler.seat}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Blood Type</span>
                <span className="text-sm font-medium text-red-600">
                  {isDemoMode ? '••' : traveler.medical.bloodType}
                </span>
              </div>

              {!isDemoMode && showPassports && (
                <div className="pt-3 mt-3 border-t border-slate-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Allergies</span>
                    <span className="text-xs text-slate-800">{traveler.medical.allergies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Place of Birth</span>
                    <span className="text-xs text-slate-800">{traveler.passport.placeOfBirth}</span>
                  </div>
                  {traveler.medical.emergencyNotes && (
                    <div className="text-xs text-amber-700 bg-amber-50 p-2 rounded">
                      ⚠️ {traveler.medical.emergencyNotes}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelDocuments;
