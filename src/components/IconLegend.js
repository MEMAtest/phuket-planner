import React from 'react';
import { Icons } from '../data/staticData';
import { useCountry } from '../state/CountryContext';
import { getCountryApps, getDestinationContacts } from '../data/countryContent';

const IconLegend = () => {
  const { country } = useCountry();
  const countryApps = getCountryApps(country.iso2);
  const destinationContacts = getDestinationContacts(country.iso2);
  const etiquetteNotes = country.content?.etiquetteNotes || [];
  const quickStarts = country.content?.quickStarts || [];
  const emergencyNumbers = country.content?.emergency || {};

  const iconItems = [
    { icon: <Icons.Plane className="w-5 h-5 text-sky-600"/>, label: 'Travel', description: 'Flights, transfers, transportation' },
    { icon: <Icons.Utensils className="w-5 h-5 text-rose-600"/>, label: 'Meal', description: 'Restaurants, food experiences' },
    { icon: <Icons.FerrisWheel className="w-5 h-5 text-indigo-600"/>, label: 'Activity', description: 'Attractions, tours, experiences' },
    { icon: <Icons.Clock className="w-5 h-5 text-amber-600"/>, label: 'Nap / Rest', description: 'Scheduled rest time for kids' },
    { icon: <Icons.Sun className="w-5 h-5 text-emerald-600"/>, label: 'Outdoor', description: 'Beach, parks, outdoor activities' },
    { icon: <Icons.Moon className="w-5 h-5 text-purple-600"/>, label: 'Indoor', description: 'Museums, malls, indoor venues' },
    { icon: <Icons.Star className="w-5 h-5 text-amber-500"/>, label: 'Rating', description: 'Venue or activity rating' },
    { icon: <Icons.Wallet className="w-5 h-5 text-green-600"/>, label: 'Budget', description: 'Cost and expense tracking' },
    { icon: <Icons.AlertTriangle className="w-5 h-5 text-red-500"/>, label: 'Important', description: 'Weather alerts, safety notes' },
  ];
  
  const weatherLegend = [
    { icon: <Icons.Sun className="w-5 h-5 text-amber-500"/>, label: 'Sunny', temp: '30-35°C' },
    { icon: <Icons.Cloud className="w-5 h-5 text-slate-500"/>, label: 'Cloudy', temp: '28-32°C' },
    { icon: <Icons.CloudRain className="w-5 h-5 text-blue-500"/>, label: 'Rainy', temp: '25-30°C' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Icon Legend */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h3 className="font-bold text-lg text-slate-800 mb-4">📖 Icon Legend</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {iconItems.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50">
              <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
              <div>
                <p className="font-semibold text-sm text-slate-800">{item.label}</p>
                <p className="text-xs text-slate-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Weather Icons */}
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-semibold text-sm text-slate-700 mb-2">Weather Icons:</h4>
          <div className="flex gap-4">
            {weatherLegend.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                {item.icon}
                <span className="text-sm text-slate-600">{item.label}</span>
                <span className="text-xs text-slate-400">({item.temp})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Emergency Contacts */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
        <h3 className="font-bold text-lg text-red-800 mb-4 flex items-center gap-2">
          <Icons.AlertTriangle className="w-6 h-6"/>
          Emergency Contacts — {country.name}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-red-700">Local Hotlines</h4>
            <div className="space-y-2">
              {Object.entries(emergencyNumbers).map(([label, number]) => (
                <div key={label} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🚨</span>
                    <span className="font-medium text-sm text-slate-700">
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </span>
                  </div>
                  <a href={`tel:${number}`} className="font-bold text-red-700 hover:text-red-900">
                    {number}
                  </a>
                </div>
              ))}
              {destinationContacts.local.map((contact) => (
                <div key={contact.label} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{contact.icon || '📞'}</span>
                    <div>
                      <p className="font-medium text-sm text-slate-700">{contact.label}</p>
                      {contact.note && <p className="text-xs text-slate-500">{contact.note}</p>}
                    </div>
                  </div>
                  <a href={`tel:${contact.number}`} className="font-bold text-red-700 hover:text-red-900">
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-red-700">Embassy Support</h4>
            <div className="space-y-2">
              {destinationContacts.embassy.map((contact) => (
                <div key={contact.label} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-sm text-slate-700">{contact.label}</p>
                    {contact.note && <p className="text-xs text-slate-500">{contact.note}</p>}
                  </div>
                  <a href={`tel:${contact.number}`} className="font-bold text-slate-800 hover:text-slate-900">
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Safety Tips */}
        <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <h4 className="font-semibold text-sm text-amber-900 mb-2">🦺 Safety Tips:</h4>
          <ul className="space-y-1 text-xs text-amber-800">
            {etiquetteNotes.length > 0 ? (
              etiquetteNotes.map((note, idx) => <li key={idx}>• {note}</li>)
            ) : (
              <li>• Keep digital and paper copies of IDs separate.</li>
            )}
          </ul>
        </div>
      </div>
      
      {/* Useful Apps */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h3 className="font-bold text-lg text-slate-800 mb-4">📱 Recommended Apps for {country.name}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {countryApps.map((app) => (
            <div key={app.name} className="text-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="text-2xl mb-1">{app.icon}</div>
              <p className="font-semibold text-xs text-slate-800">{app.name}</p>
              <p className="text-xs text-slate-500">{app.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {quickStarts.length > 0 && (
        <div className="bg-slate-50 p-4 sm:p-6 rounded-xl shadow-lg">
          <h3 className="font-bold text-lg text-slate-800 mb-3">🧭 Quick Starts in {country.name}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickStarts.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg border p-3">
                <p className="font-semibold text-sm text-slate-800">{item.title}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {(item.tags || []).map(tag => `#${tag}`).join(' ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconLegend;
