import React, { useState, useEffect } from 'react';
import { Icons } from '../data/staticData';

const TravelDocuments = () => {
  const [showPassports, setShowPassports] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [checklistItems, setChecklistItems] = useState({});
  const [uploadedDocs, setUploadedDocs] = useState({});

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

  // Traveler data
  const travelers = [
    {
      id: 1,
      name: "Amari Goziem Omosanya",
      role: "Child 1",
      age: 4,
      passport: {
        number: "C4YM97W3P",
        nationality: "German",
        dateOfBirth: "22 Dec 2020",
        placeOfBirth: "Berlin",
        dateOfIssue: "09 Apr 2024",
        issuingAuthority: "Botschaft London",
        expiryDate: "08 Apr 2030",
        monthsToExpiry: 53
      },
      medical: {
        bloodType: "O+",
        allergies: "None known",
        medications: "None",
        dietaryRestrictions: "None",
        emergencyNotes: "Speaks German and English"
      },
      vaccinations: {
        routine: "MMR, DPT, Polio - All current",
        covid19: "Age-appropriate doses completed",
        hepatitisA: "Completed",
        typhoid: "Not required for age",
        yellowFever: "Not required for Thailand",
        lastUpdated: "May 2024"
      },
      seat: "12C"
    },
    {
      id: 2,
      name: "Askia Anuoluwa Kwame Omosanya",
      role: "Child 2",
      age: 1,
      passport: {
        number: "147253507",
        nationality: "British",
        dateOfBirth: "16 Oct 2023",
        placeOfBirth: "London",
        dateOfIssue: "07 May 2024",
        issuingAuthority: "HMPO",
        expiryDate: "07 May 2029",
        monthsToExpiry: 45
      },
      medical: {
        bloodType: "A+",
        allergies: "None known",
        medications: "None",
        dietaryRestrictions: "Still on formula/milk",
        emergencyNotes: "Youngest traveler - bring formula"
      },
      vaccinations: {
        routine: "6-month schedule current",
        covid19: "Too young - not required",
        hepatitisA: "First dose completed",
        typhoid: "Not required for age",
        yellowFever: "Not required for Thailand",
        lastUpdated: "June 2024"
      },
      seat: "12D"
    },
    {
      id: 3,
      name: "Ademola Edward Omosanya",
      role: "Parent 1",
      age: 37,
      passport: {
        number: "144693769",
        nationality: "British",
        dateOfBirth: "22 Aug 1987",
        placeOfBirth: "Lagos",
        dateOfIssue: "13 Dec 2023",
        issuingAuthority: "HMPO",
        expiryDate: "13 Dec 2033",
        monthsToExpiry: 101
      },
      medical: {
        bloodType: "O+",
        allergies: "None",
        medications: "None",
        dietaryRestrictions: "None",
        emergencyNotes: "Primary contact"
      },
      vaccinations: {
        routine: "All current",
        covid19: "Fully vaccinated + booster",
        hepatitisA: "Valid until 2030",
        hepatitisB: "Valid until 2028",
        typhoid: "Valid until 2027",
        yellowFever: "Lifetime certificate",
        lastUpdated: "June 2024"
      },
      seat: "12A"
    },
    {
      id: 4,
      name: "Angela Oppong Omosanya",
      role: "Parent 2",
      age: 36,
      passport: {
        number: "C3FHL3LVT",
        nationality: "German",
        dateOfBirth: "21 Dec 1987",
        placeOfBirth: "Bottrop",
        dateOfIssue: "22 Jun 2022",
        issuingAuthority: "BA Mitte BÜA 1",
        expiryDate: "21 Jun 2032",
        monthsToExpiry: 83
      },
      medical: {
        bloodType: "B+",
        allergies: "Penicillin",
        medications: "None regular",
        dietaryRestrictions: "None",
        emergencyNotes: "⚠️ ALLERGIC TO PENICILLIN"
      },
      vaccinations: {
        routine: "All current",
        covid19: "Fully vaccinated + booster",
        hepatitisA: "Valid until 2029",
        hepatitisB: "Valid until 2027",
        typhoid: "Valid until 2026",
        yellowFever: "Lifetime certificate",
        lastUpdated: "June 2024"
      },
      seat: "12B"
    }
  ];

  // Accommodation details
  const accommodationInfo = {
    hotel: {
      name: "Anantara Mai Khao Phuket Villas",
      address: "888 Moo 3, Mai Khao, Thalang District, Phuket 83110",
      phone: "+66 76 336 100",
      email: "maikhao@anantara.com",
      confirmation: "ANT2025082045",
      roomType: "Two Bedroom Pool Villa",
      checkIn: "20 Aug 2025, 14:00",
      checkOut: "28 Aug 2025, 12:00",
      requests: "Crib for 1yr old, high chair, early check-in confirmed",
      gpsCoordinates: "8.1673° N, 98.2994° E",
      googleMaps: "https://goo.gl/maps/XYZ123"
    },
    location: {
      area: "Mai Khao Beach",
      district: "Thalang",
      fromAirport: "15 minutes drive",
      nearestHospital: "Bangkok Hospital Phuket (25 min)",
      nearest711: "500m (Turtle Village)",
      nearestATM: "Turtle Village Shopping (500m)",
      beachAccess: "Direct beach access - 50m walk"
    }
  };

  // Thailand Arrival Checklist
  const arrivalChecklist = [
    { id: 'passport', text: 'Passports (all family members)', required: true },
    { id: 'return', text: 'Return flight tickets printed/phone', required: true },
    { id: 'accommodation', text: 'Hotel confirmation (Anantara)', required: true },
    { id: 'tm6', text: 'TM6 arrival card filled (given on plane)', required: true },
    { id: 'cash', text: 'Cash for taxi/tips (THB or GBP to exchange)', required: false },
    { id: 'simcard', text: 'Buy SIM card at airport (AIS/TrueMove)', required: false },
    { id: 'transfer', text: 'Hotel transfer booking confirmed', required: false },
    { id: 'insurance', text: 'Travel insurance documents', required: true },
    { id: 'vaccination', text: 'Vaccination records (if requested)', required: false },
    { id: 'prescriptions', text: 'Prescription letters for any medications', required: false },
    { id: 'consent', text: 'Child travel consent (single parent travel)', required: false },
    { id: 'photos', text: 'Passport photos (spare for emergencies)', required: false }
  ];

  // Digital Setup Checklist
  const digitalChecklist = [
    { id: 'roaming', text: 'Enable roaming or airplane mode', done: false },
    { id: 'grab', text: 'Download Grab app (taxis)', done: false },
    { id: 'translate', text: 'Download Google Translate + Thai offline', done: false },
    { id: 'maps', text: 'Download Phuket offline maps', done: false },
    { id: 'xe', text: 'XE Currency app installed', done: false },
    { id: 'whatsapp', text: 'WhatsApp working for free calls home', done: false },
    { id: 'powerbank', text: 'Charge power banks', done: false },
    { id: 'adapters', text: 'Pack UK→Thai plug adapters', done: false },
    { id: 'backup', text: 'Photo backup to cloud enabled', done: false },
    { id: 'netflix', text: 'Download kids shows for flights', done: false }
  ];

  // Government & Official Links
  const officialLinks = {
    thailand: [
      { name: "Thailand e-Visa", url: "https://www.thaievisa.go.th", note: "Official visa site (not needed for UK/DE)" },
      { name: "Immigration Bureau", url: "https://www.immigration.go.th", note: "TM30, visa extensions" },
      { name: "Tourism Authority", url: "https://www.tourismthailand.org", note: "Official tourism info" },
      { name: "Thailand Pass", url: "https://tp.consular.go.th", note: "No longer required but check" },
      { name: "Phuket Smart City", url: "https://www.phuket.go.th", note: "Local government services" },
      { name: "Thai Health Ministry", url: "https://ddc.moph.go.th/en", note: "Health requirements" }
    ],
    singapore: [
      { name: "ICA Singapore", url: "https://www.ica.gov.sg", note: "Immigration & Checkpoints" },
      { name: "Changi Airport", url: "https://www.changiairport.com", note: "Transit guide, facilities" },
      { name: "SG Arrival Card", url: "https://eservices.ica.gov.sg/sgarrivalcard", note: "Not needed for transit" }
    ],
    uk: [
      { name: "UK Foreign Travel Advice", url: "https://www.gov.uk/foreign-travel-advice/thailand", note: "Latest Thailand guidance" },
      { name: "UK Passport Check", url: "https://www.gov.uk/check-a-passport-travel-europe", note: "Passport validity checker" }
    ],
    germany: [
      { name: "Auswärtiges Amt", url: "https://www.auswaertiges-amt.de/en/aussenpolitik/laenderinformationen/thailand-node", note: "German foreign office advice" }
    ]
  };

  // Emergency contacts
  const emergencyContacts = {
    thailand: [
      { name: "Tourist Police", number: "1155", note: "24/7 English support" },
      { name: "Phuket Hospital", number: "+66 76 361 234", note: "Government hospital" },
      { name: "Bangkok Hospital Phuket", number: "+66 76 254 425", note: "Private - Best for emergencies" },
      { name: "Anantara Mai Khao Hotel", number: "+66 76 336 100", note: "Your accommodation" },
      { name: "Phuket Airport", number: "+66 76 351 111", note: "Flight inquiries" }
    ],
    embassies: [
      { country: "UK Embassy Bangkok", number: "+66 2 305 8333", note: "Emergency: +66 2 305 8333" },
      { country: "German Embassy Bangkok", number: "+66 2 287 9000", note: "Emergency: +66 81 845 6224" },
      { country: "UK Honorary Consul Phuket", number: "+66 76 386 594", note: "Local UK support" },
      { country: "German Honorary Consul Phuket", number: "+66 76 610 407", note: "Local German support" }
    ],
    medical: [
      { name: "Dental Emergency", number: "+66 76 336 669", note: "Phuket Dental Signature" },
      { name: "Pharmacy Delivery", number: "+66 92 494 5599", note: "24hr pharmacy delivery" },
      { name: "Poison Control", number: "1367", note: "Thailand poison center" }
    ]
  };

  // Useful Thai Apps & Services
  const usefulApps = [
    { name: "Grab", purpose: "Taxis & food delivery", note: "Works with UK cards" },
    { name: "Bolt", purpose: "Alternative to Grab", note: "Sometimes cheaper" },
    { name: "7-Eleven TH", purpose: "Delivery from 7-Eleven", note: "Handy for emergencies" },
    { name: "FoodPanda", purpose: "Food delivery", note: "More restaurants than Grab" },
    { name: "Line", purpose: "Thai WhatsApp", note: "Many services use this" },
    { name: "Google Translate", purpose: "Camera translation", note: "Download Thai offline" },
    { name: "XE Currency", purpose: "Live exchange rates", note: "Works offline too" },
    { name: "Thaiger", purpose: "Local news in English", note: "Weather, events, warnings" }
  ];

  const copyToClipboard = (text, fieldId) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyAllPassportInfo = (traveler) => {
    const info = `Name: ${traveler.name}
Passport Number: ${traveler.passport.number}
Date of Birth: ${traveler.passport.dateOfBirth}
Place of Birth: ${traveler.passport.placeOfBirth}
Date of Issue: ${traveler.passport.dateOfIssue}
Issuing Authority: ${traveler.passport.issuingAuthority}
Expiry Date: ${traveler.passport.expiryDate}
Nationality: ${traveler.passport.nationality}`;
    
    copyToClipboard(info, `all-${traveler.id}`);
  };

  const getExpiryWarning = (monthsToExpiry) => {
    if (monthsToExpiry < 6) return 'text-red-600 font-bold';
    if (monthsToExpiry < 12) return 'text-amber-600';
    return 'text-green-600';
  };

  const handleDocUpload = (travelerId, docType, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedDocs({
          ...uploadedDocs,
          [`${travelerId}-${docType}`]: reader.result
        });
        // In production, you'd upload to Firebase Storage here
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Bar */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
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
            onClick={() => setSelectedSection(selectedSection === 'checklist' ? null : 'checklist')}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200"
          >
            ✅ Checklist
          </button>
          
          <button
            onClick={() => setSelectedSection(selectedSection === 'emergency' ? null : 'emergency')}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200"
          >
            🚨 Emergency
          </button>
          
          <button
            onClick={() => setSelectedSection(selectedSection === 'accommodation' ? null : 'accommodation')}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200"
          >
            🏨 Hotel
          </button>
          
          <button
            onClick={() => setSelectedSection(selectedSection === 'vaccines' ? null : 'vaccines')}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200"
          >
            💉 Vaccines
          </button>
          
          <button
            onClick={() => setSelectedSection(selectedSection === 'links' ? null : 'links')}
            className="px-4 py-2 bg-sky-100 text-sky-700 rounded-lg font-medium hover:bg-sky-200"
          >
            🔗 Gov Links
          </button>
        </div>
      </div>

      {/* Thailand Arrival Checklist */}
      {selectedSection === 'checklist' && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="font-bold text-lg text-blue-800 mb-4">✅ Thailand Arrival Checklist</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 mb-3">Immigration Requirements</h4>
              <div className="space-y-2">
                {arrivalChecklist.filter(item => item.required).map(item => (
                  <label key={item.id} className="flex items-start gap-3 bg-white p-2 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="checkbox"
                      checked={checklistItems[item.id] || false}
                      onChange={() => toggleChecklistItem(item.id)}
                      className="mt-0.5"
                    />
                    <span className={`text-sm ${checklistItems[item.id] ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-700 mb-3">Digital Setup</h4>
              <div className="space-y-2">
                {digitalChecklist.map(item => (
                  <label key={item.id} className="flex items-start gap-3 bg-white p-2 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="checkbox"
                      checked={checklistItems[item.id] || false}
                      onChange={() => toggleChecklistItem(item.id)}
                      className="mt-0.5"
                    />
                    <span className={`text-sm ${checklistItems[item.id] ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>💡 Pro Tip:</strong> Screenshot your hotel confirmation and return flights. 
              Immigration rarely asks but it's good to have ready.
            </p>
          </div>
        </div>
      )}

      {/* Accommodation Details */}
      {selectedSection === 'accommodation' && (
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <h3 className="font-bold text-lg text-purple-800 mb-4">🏨 Accommodation Details</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-slate-800 mb-3">{accommodationInfo.hotel.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Confirmation:</span>
                  <span className="font-mono font-bold">{accommodationInfo.hotel.confirmation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Room:</span>
                  <span className="font-medium">{accommodationInfo.hotel.roomType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Check-in:</span>
                  <span>{accommodationInfo.hotel.checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Check-out:</span>
                  <span>{accommodationInfo.hotel.checkOut}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(accommodationInfo.hotel.phone, 'hotel-phone')}
                  className="w-full mt-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200"
                >
                  📞 {accommodationInfo.hotel.phone} {copiedField === 'hotel-phone' && '✓'}
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Mai Khao Location Info</h4>
              <div className="space-y-2 text-sm">
                <p className="text-slate-700">📍 {accommodationInfo.location.area}, {accommodationInfo.location.district}</p>
                <p className="text-slate-700">✈️ {accommodationInfo.location.fromAirport}</p>
                <p className="text-slate-700">🏥 Nearest Hospital: {accommodationInfo.location.nearestHospital}</p>
                <p className="text-slate-700">🏪 7-Eleven: {accommodationInfo.location.nearest711}</p>
                <p className="text-slate-700">💰 ATM: {accommodationInfo.location.nearestATM}</p>
                <p className="text-slate-700">🏖️ Beach: {accommodationInfo.location.beachAccess}</p>
                <a
                  href={accommodationInfo.hotel.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium text-center hover:bg-blue-200"
                >
                  🗺️ Open in Google Maps
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-sm text-slate-700">
              <strong>Address for Taxi:</strong><br/>
              {accommodationInfo.hotel.address}
            </p>
            <button
              onClick={() => copyToClipboard(accommodationInfo.hotel.address, 'address')}
              className="mt-2 text-xs text-purple-600 hover:text-purple-700"
            >
              {copiedField === 'address' ? '✓ Copied!' : '📋 Copy Address'}
            </button>
          </div>
        </div>
      )}

      {/* Vaccination Records */}
      {selectedSection === 'vaccines' && (
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <h3 className="font-bold text-lg text-green-800 mb-4">💉 Vaccination Records</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {travelers.map(traveler => (
              <div key={traveler.id} className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-2">{traveler.name}</h4>
                <p className="text-xs text-slate-600 mb-3">{traveler.role} • Last updated: {traveler.vaccinations.lastUpdated}</p>
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Routine:</span>
                    <span className="text-green-600">✓ {traveler.vaccinations.routine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">COVID-19:</span>
                    <span className="text-green-600">✓ {traveler.vaccinations.covid19}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Hepatitis A:</span>
                    <span className="text-green-600">✓ {traveler.vaccinations.hepatitisA}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Typhoid:</span>
                    <span className={traveler.vaccinations.typhoid.includes('Not required') ? 'text-slate-400' : 'text-green-600'}>
                      {traveler.vaccinations.typhoid}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Yellow Fever:</span>
                    <span className="text-slate-400">{traveler.vaccinations.yellowFever}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t">
                  <label className="text-xs text-slate-600">
                    Upload vaccination card:
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleDocUpload(traveler.id, 'vaccine', e)}
                      className="mt-1 text-xs"
                    />
                  </label>
                  {uploadedDocs[`${traveler.id}-vaccine`] && (
                    <p className="text-xs text-green-600 mt-1">✓ Document uploaded</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>ℹ️ Thailand Requirements:</strong> No mandatory vaccines for UK/German travelers. 
              Hepatitis A and Typhoid recommended but not required. Yellow fever only if coming from affected areas.
            </p>
          </div>
        </div>
      )}

      {/* Government Links */}
      {selectedSection === 'links' && (
        <div className="bg-sky-50 rounded-xl p-4 border border-sky-200">
          <h3 className="font-bold text-lg text-sky-800 mb-4">🔗 Official Government Resources</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sky-700 mb-2">🇹🇭 Thailand Official Sites</h4>
              <div className="grid md:grid-cols-2 gap-2">
                {officialLinks.thailand.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-lg hover:bg-sky-100 transition-colors"
                  >
                    <p className="font-medium text-sm text-sky-700">{link.name} ↗</p>
                    <p className="text-xs text-slate-600">{link.note}</p>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-sky-700 mb-2">🇸🇬 Singapore Transit</h4>
              <div className="grid md:grid-cols-2 gap-2">
                {officialLinks.singapore.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-lg hover:bg-sky-100 transition-colors"
                  >
                    <p className="font-medium text-sm text-sky-700">{link.name} ↗</p>
                    <p className="text-xs text-slate-600">{link.note}</p>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold text-sky-700 mb-2">📱 Essential Apps for Thailand</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {usefulApps.map(app => (
                  <div key={app.name} className="bg-white p-2 rounded-lg">
                    <p className="font-medium text-sm text-slate-800">{app.name}</p>
                    <p className="text-xs text-slate-600">{app.purpose}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contacts - Always Visible */}
      {selectedSection === 'emergency' && (
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <h3 className="font-bold text-lg text-red-800 mb-4">🚨 Emergency Contacts</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Thailand Emergency</h4>
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
              <h4 className="font-semibold text-red-700 mb-2">Embassy Support</h4>
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
            
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Medical Services</h4>
              <div className="space-y-2">
                {emergencyContacts.medical.map(contact => (
                  <div key={contact.name} className="bg-white p-2 rounded">
                    <p className="font-medium text-sm">{contact.name}</p>
                    <button
                      onClick={() => copyToClipboard(contact.number, contact.name)}
                      className="font-mono text-xs text-slate-700"
                    >
                      {contact.number} {copiedField === contact.name && '✓'}
                    </button>
                    <p className="text-xs text-slate-600">{contact.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Travelers Grid - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {travelers.map(traveler => (
          <div key={traveler.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className={`p-4 ${traveler.role.includes('Child') ? 'bg-blue-50' : 'bg-slate-50'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{traveler.name}</h3>
                  <p className="text-sm text-slate-600">
                    {traveler.role} • Age {traveler.age} • {traveler.passport.nationality}
                  </p>
                </div>
                <button
                  onClick={() => copyAllPassportInfo(traveler)}
                  className="p-2 bg-white rounded-lg hover:bg-slate-100 transition-colors"
                  title="Copy all info"
                >
                  {copiedField === `all-${traveler.id}` ? (
                    <Icons.checkSquare className="w-5 h-5 text-green-600" />
                  ) : (
                    <Icons.bookOpen className="w-5 h-5 text-slate-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Passport Details */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Passport</span>
                <span className={`font-mono text-sm ${showPassports ? 'text-slate-800' : 'text-slate-400'}`}>
                  {showPassports ? traveler.passport.number : '•••••••••'}
                  {showPassports && (
                    <button
                      onClick={() => copyToClipboard(traveler.passport.number, `passport-${traveler.id}`)}
                      className="ml-2 text-sky-600 hover:text-sky-700"
                    >
                      {copiedField === `passport-${traveler.id}` ? '✓' : '📋'}
                    </button>
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">DOB</span>
                <span className="text-sm text-slate-800">{traveler.passport.dateOfBirth}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Expiry</span>
                <span className={`text-sm font-medium ${getExpiryWarning(traveler.passport.monthsToExpiry)}`}>
                  {traveler.passport.expiryDate}
                  <span className="text-xs ml-1">({traveler.passport.monthsToExpiry}m)</span>
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Seat</span>
                <span className="text-sm font-bold text-slate-800">{traveler.seat}</span>
              </div>

              {/* Document Upload Section */}
              <div className="pt-3 mt-3 border-t border-slate-200">
                <label className="text-xs text-slate-600 cursor-pointer">
                  📷 Upload passport photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleDocUpload(traveler.id, 'passport', e)}
                    className="hidden"
                  />
                  {uploadedDocs[`${traveler.id}-passport`] && (
                    <span className="ml-2 text-green-600">✓</span>
                  )}
                </label>
              </div>

              {/* Medical Info (Hidden by default) */}
              {showPassports && (
                <div className="pt-3 mt-3 border-t border-slate-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Blood Type</span>
                    <span className="text-xs font-medium text-red-600">{traveler.medical.bloodType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Allergies</span>
                    <span className="text-xs text-slate-800">{traveler.medical.allergies}</span>
                  </div>
                  {traveler.medical.emergencyNotes && (
                    <div className="text-xs text-amber-700 bg-amber-50 p-2 rounded">
                      {traveler.medical.emergencyNotes}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reference Footer */}
      <div className="bg-slate-50 rounded-xl p-4">
        <h3 className="font-semibold text-slate-800 mb-3">📋 Quick Reference</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => {
              const info = `PHUKET TRIP AUG 2025
Hotel: Anantara Mai Khao
Dates: 20-28 Aug
Confirmation: ANT2025082045
Emergency: Tourist Police 1155`;
              copyToClipboard(info, 'trip-summary');
            }}
            className="px-3 py-2 bg-white border rounded-lg text-sm hover:bg-slate-50"
          >
            {copiedField === 'trip-summary' ? '✓ Copied!' : '📱 Trip Summary'}
          </button>
          
          <button
            onClick={() => {
              const allPassports = travelers.map(t => 
                `${t.name}: ${t.passport.number}`
              ).join('\n');
              copyToClipboard(allPassports, 'all-passports');
            }}
            className="px-3 py-2 bg-white border rounded-lg text-sm hover:bg-slate-50"
          >
            {copiedField === 'all-passports' ? '✓ Copied!' : '📄 All Passports'}
          </button>
          
          <button
            onClick={() => {
              const hotelInfo = `Anantara Mai Khao Phuket Villas
888 Moo 3, Mai Khao, Thalang District, Phuket 83110
+66 76 336 100
Booking: ANT2025082045`;
              copyToClipboard(hotelInfo, 'hotel');
            }}
            className="px-3 py-2 bg-white border rounded-lg text-sm hover:bg-slate-50"
          >
            {copiedField === 'hotel' ? '✓ Copied!' : '🏨 Hotel Info'}
          </button>
          
          <button
            onClick={() => window.print()}
            className="px-3 py-2 bg-white border rounded-lg text-sm hover:bg-slate-50"
          >
            🖨️ Print All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelDocuments;
