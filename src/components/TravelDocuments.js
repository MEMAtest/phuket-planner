import React, { useState, useEffect } from 'react';
import { Icons } from '../data/staticData';

const TravelDocuments = () => {
  const [showPassports, setShowPassports] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [checklistItems, setChecklistItems] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingTraveler, setEditingTraveler] = useState(null);
  const [showPolicy, setShowPolicy] = useState(false);
  const [copiedInsurance, setCopiedInsurance] = useState(null);

  // Calculate age in years and months
  const calculateAge = (birthDate) => {
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

  // Format age display
  const formatAge = (birthDate) => {
    const age = calculateAge(birthDate);
    if (age.years === 0) {
      return `${age.months} month${age.months !== 1 ? 's' : ''}`;
    } else if (age.months === 0) {
      return `${age.years} year${age.years !== 1 ? 's' : ''}`;
    } else {
      return `${age.years}y ${age.months}m`;
    }
  };

  // Initial traveler data - load from localStorage or use defaults
  const defaultTravelers = [
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
  ];

  const [travelers, setTravelers] = useState(() => {
    const saved = localStorage.getItem('phuket_travelers');
    return saved ? JSON.parse(saved) : defaultTravelers;
  });

  // Insurance information
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

  // Save travelers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('phuket_travelers', JSON.stringify(travelers));
  }, [travelers]);

  // Load checklist state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('phuket_checklist');
    if (saved) {
      setChecklistItems(JSON.parse(saved));
    }
  }, []);

  // Save checklist state
  const toggleChecklistItem = (id) => {
    const updated = { ...checklistItems, [id]: !checklistItems[id] };
    setChecklistItems(updated);
    localStorage.setItem('phuket_checklist', JSON.stringify(updated));
  };

  // Edit traveler function
  const handleEditTraveler = (travelerId) => {
    setEditingTraveler(travelerId);
    setEditMode(true);
  };

  // Save traveler edits
  const saveTravelerEdits = (travelerId, updatedData) => {
    const updatedTravelers = travelers.map(t => 
      t.id === travelerId ? { ...t, ...updatedData } : t
    );
    setTravelers(updatedTravelers);
    setEditMode(false);
    setEditingTraveler(null);
  };

  // Copy functions
  const copyToClipboard = (text, fieldId) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyInsuranceInfo = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedInsurance(field);
    setTimeout(() => setCopiedInsurance(null), 2000);
  };

  const updatePolicyNumber = (value) => {
    localStorage.setItem('insurance_policy', value);
  };

  const copyAllPassportInfo = (traveler) => {
    const age = formatAge(traveler.passport.dateOfBirth);
    const info = `Name: ${traveler.name}
Passport Number: ${traveler.passport.number}
Date of Birth: ${traveler.passport.dateOfBirth} (Age: ${age})
Place of Birth: ${traveler.passport.placeOfBirth}
Date of Issue: ${traveler.passport.dateOfIssue}
Issuing Authority: ${traveler.passport.issuingAuthority}
Expiry Date: ${traveler.passport.expiryDate}
Nationality: ${traveler.passport.nationality}
Seat: ${traveler.seat}
Blood Type: ${traveler.medical.bloodType}`;
    
    copyToClipboard(info, `all-${traveler.id}`);
  };

  // Calculate passport expiry warning
  const getExpiryWarning = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const monthsToExpiry = (expiry.getFullYear() - today.getFullYear()) * 12 + 
                          (expiry.getMonth() - today.getMonth());
    
    if (monthsToExpiry < 6) return 'text-red-600 font-bold';
    if (monthsToExpiry < 12) return 'text-amber-600';
    return 'text-green-600';
  };

  // Edit Form Component
  const EditTravelerForm = ({ traveler, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      ...traveler,
      passport: { ...traveler.passport },
      medical: { ...traveler.medical },
      vaccinations: { ...traveler.vaccinations }
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(traveler.id, formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
          <h3 className="text-xl font-bold mb-4">Edit Traveler Information</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Seat</label>
                <input
                  type="text"
                  value={formData.seat}
                  onChange={(e) => setFormData({...formData, seat: e.target.value})}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  placeholder="e.g., 12A"
                />
              </div>
            </div>

            {/* Passport Info */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Passport Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Passport Number</label>
                  <input
                    type="text"
                    value={formData.passport.number}
                    onChange={(e) => setFormData({
                      ...formData, 
                      passport: {...formData.passport, number: e.target.value}
                    })}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.passport.dateOfBirth}
                    onChange={(e) => setFormData({
                      ...formData, 
                      passport: {...formData.passport, dateOfBirth: e.target.value}
                    })}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.passport.expiryDate}
                    onChange={(e) => setFormData({
                      ...formData, 
                      passport: {...formData.passport, expiryDate: e.target.value}
                    })}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Nationality</label>
                  <input
                    type="text"
                    value={formData.passport.nationality}
                    onChange={(e) => setFormData({
                      ...formData, 
                      passport: {...formData.passport, nationality: e.target.value}
                    })}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Medical Info */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Medical Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Blood Type</label>
                  <select
                    value={formData.medical.bloodType}
                    onChange={(e) => setFormData({
                      ...formData, 
                      medical: {...formData.medical, bloodType: e.target.value}
                    })}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                  >
                    <option>O+</option>
                    <option>O-</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Allergies</label>
                  <input
                    type="text"
                    value={formData.medical.allergies}
                    onChange={(e) => setFormData({
                      ...formData, 
                      medical: {...formData.medical, allergies: e.target.value}
                    })}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Emergency contacts
  const emergencyContacts = {
    thailand: [
      { name: "Tourist Police", number: "1155", note: "24/7 English support" },
      { name: "Phuket Hospital", number: "+66 76 361 234", note: "Government hospital" },
      { name: "Bangkok Hospital Phuket", number: "+66 76 254 425", note: "Private - Best for emergencies" },
      { name: "Anantara Mai Khao Hotel", number: "+66 76 336 100", note: "Your accommodation" }
    ],
    embassies: [
      { country: "UK Embassy Bangkok", number: "+66 2 305 8333", note: "Emergency: +66 2 305 8333" },
      { country: "German Embassy Bangkok", number: "+66 2 287 9000", note: "Emergency: +66 81 845 6224" }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Edit Mode Form */}
      {editMode && editingTraveler && (
        <EditTravelerForm
          traveler={travelers.find(t => t.id === editingTraveler)}
          onSave={saveTravelerEdits}
          onCancel={() => {
            setEditMode(false);
            setEditingTraveler(null);
          }}
        />
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
            }`}
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
              const allInfo = travelers.map(t => {
                const age = formatAge(t.passport.dateOfBirth);
                return `${t.name}
Passport: ${t.passport.number}
DOB: ${t.passport.dateOfBirth} (${age})
Seat: ${t.seat}
Blood Type: ${t.medical.bloodType}
---`;
              }).join('\n');
              copyToClipboard(allInfo, 'all-travelers');
            }}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200"
          >
            {copiedField === 'all-travelers' ? '✓ Copied!' : '📋 Copy All'}
          </button>
          
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200"
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
            onClick={() => setShowPolicy(!showPolicy)}
            className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          >
            {showPolicy ? 'Hide' : 'Show'} Details
          </button>
        </h3>

        {/* Quick Access Emergency Numbers */}
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

        {/* Policy Number */}
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

        {/* Detailed Coverage - Show/Hide */}
        {showPolicy && (
          <div className="space-y-4 mt-4">
            {/* Coverage Details */}
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

            {/* Required Documents */}
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

            {/* Claim Process */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-sm text-blue-800 mb-3">
                How to Make a Claim
              </h4>
              <ol className="space-y-2">
                {insuranceInfo.claimProcess.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-800 
                                 rounded-full flex items-center justify-center font-bold text-xs">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Important Notes */}
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

      {/* Emergency Contacts Section */}
      {selectedSection === 'emergency' && (
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <h3 className="font-bold text-lg text-red-800 mb-4">🚨 Emergency Contacts</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-red-700 mb-2">Thailand Emergency</h4>
              <div className="space-y-2">
                {emergencyContacts.thailand.map(contact => (
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
                {emergencyContacts.embassies.map(contact => (
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

      {/* Travelers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {travelers.map(traveler => {
          const age = formatAge(traveler.passport.dateOfBirth);
          
          return (
            <div key={traveler.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className={`p-4 ${traveler.role.includes('Child') ? 'bg-blue-50' : 'bg-slate-50'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{traveler.name}</h3>
                    <p className="text-sm text-slate-600">
                      {traveler.role} • Age: {age} • {traveler.passport.nationality}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditTraveler(traveler.id)}
                      className="p-2 bg-white rounded-lg hover:bg-slate-100 transition-colors"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => copyAllPassportInfo(traveler)}
                      className="p-2 bg-white rounded-lg hover:bg-slate-100 transition-colors"
                      title="Copy all info"
                    >
                      {copiedField === `all-${traveler.id}` ? '✓' : '📋'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Passport</span>
                  <span className={`font-mono text-sm ${showPassports ? 'text-slate-800' : 'text-slate-400'}`}>
                    {showPassports ? traveler.passport.number : '•••••••••'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">DOB</span>
                  <span className="text-sm text-slate-800">
                    {new Date(traveler.passport.dateOfBirth).toLocaleDateString('en-GB')}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Expiry</span>
                  <span className={`text-sm font-medium ${getExpiryWarning(traveler.passport.expiryDate)}`}>
                    {new Date(traveler.passport.expiryDate).toLocaleDateString('en-GB')}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Seat</span>
                  <span className="text-sm font-bold text-slate-800">{traveler.seat}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Blood Type</span>
                  <span className="text-sm font-medium text-red-600">{traveler.medical.bloodType}</span>
                </div>

                {/* Show more details when expanded */}
                {showPassports && (
                  <div className="pt-3 mt-3 border-t border-slate-200 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-600">Allergies</span>
                      <span className="text-xs text-slate-800">{traveler.medical.allergies}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-600">Vaccines Updated</span>
                      <span className="text-xs text-slate-800">
                        {new Date(traveler.vaccinations.lastUpdated).toLocaleDateString('en-GB')}
                      </span>
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
          );
        })}
      </div>
    </div>
  );
};

export default TravelDocuments;
