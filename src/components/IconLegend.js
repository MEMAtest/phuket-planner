import React from 'react';
import { Icons } from '../data/staticData';

const IconLegend = () => {
  const iconItems = [
    { icon: <Icons.plane className="w-5 h-5 text-sky-600"/>, label: 'Travel', description: 'Flights, transfers, transportation' },
    { icon: <Icons.utensils className="w-5 h-5 text-rose-600"/>, label: 'Meal', description: 'Restaurants, food experiences' },
    { icon: <Icons.ferrisWheel className="w-5 h-5 text-indigo-600"/>, label: 'Activity', description: 'Attractions, tours, experiences' },
    { icon: <Icons.clock className="w-5 h-5 text-amber-600"/>, label: 'Nap / Rest', description: 'Scheduled rest time for kids' },
    { icon: <Icons.sun className="w-5 h-5 text-emerald-600"/>, label: 'Outdoor', description: 'Beach, parks, outdoor activities' },
    { icon: <Icons.moon className="w-5 h-5 text-purple-600"/>, label: 'Indoor', description: 'Museums, malls, indoor venues' },
    { icon: <Icons.star className="w-5 h-5 text-amber-500"/>, label: 'Rating', description: 'Venue or activity rating' },
    { icon: <Icons.wallet className="w-5 h-5 text-green-600"/>, label: 'Budget', description: 'Cost and expense tracking' },
    { icon: <Icons.alertTriangle className="w-5 h-5 text-red-500"/>, label: 'Important', description: 'Weather alerts, safety notes' },
  ];
  
  const emergencyInfo = [
    { label: 'Tourist Police', number: '1155', icon: '👮' },
    { label: 'Medical Emergency', number: '1669', icon: '🚑' },
    { label: 'Hotel (Anantara)', number: '+66 76 336 000', icon: '🏨' },
    { label: 'UK Embassy Bangkok', number: '+66 2 305 8333', icon: '🇬🇧' },
    { label: 'Grab Taxi App', number: 'Use App', icon: '🚕' },
  ];
  
  const weatherLegend = [
    { icon: <Icons.sun className="w-5 h-5 text-amber-500"/>, label: 'Sunny', temp: '30-35°C' },
    { icon: <Icons.cloud className="w-5 h-5 text-slate-500"/>, label: 'Cloudy', temp: '28-32°C' },
    { icon: <Icons.cloudRain className="w-5 h-5 text-blue-500"/>, label: 'Rainy', temp: '25-30°C' },
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
          <Icons.alertTriangle className="w-6 h-6"/>
          Emergency Contacts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {emergencyInfo.map((info, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{info.icon}</span>
                <span className="font-medium text-sm text-slate-700">{info.label}</span>
              </div>
              {info.number !== 'Use App' ? (
                <a 
                  href={`tel:${info.number}`} 
                  className="font-bold text-red-700 hover:text-red-900"
                >
                  {info.number}
                </a>
              ) : (
                <span className="font-bold text-slate-600">{info.number}</span>
              )}
            </div>
          ))}
        </div>
        
        {/* Safety Tips */}
        <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <h4 className="font-semibold text-sm text-amber-900 mb-2">🦺 Safety Tips:</h4>
          <ul className="space-y-1 text-xs text-amber-800">
            <li>• Always negotiate taxi fare before getting in (or use Grab app)</li>
            <li>• Keep copies of passports in separate locations</li>
            <li>• Hotel business card handy for taxi returns</li>
            <li>• Stay hydrated - buy sealed water bottles only</li>
            <li>• Apply mosquito repellent at dawn and dusk</li>
          </ul>
        </div>
      </div>
      
      {/* Useful Apps */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h3 className="font-bold text-lg text-slate-800 mb-4">📱 Recommended Apps for Phuket</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: 'Grab', desc: 'Taxi & food delivery', icon: '🚕' },
            { name: 'Google Translate', desc: 'Thai translations', icon: '🗣️' },
            { name: 'XE Currency', desc: 'Live exchange rates', icon: '💱' },
            { name: 'Maps.me', desc: 'Offline maps', icon: '🗺️' },
            { name: 'Line', desc: 'Local messaging', icon: '💬' },
            { name: 'Klook', desc: 'Activity bookings', icon: '🎫' },
            { name: 'Weather', desc: 'Hourly forecasts', icon: '☔' },
            { name: '7-Eleven TH', desc: 'Store locator', icon: '🏪' },
          ].map((app, i) => (
            <div key={i} className="text-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="text-2xl mb-1">{app.icon}</div>
              <p className="font-semibold text-xs text-slate-800">{app.name}</p>
              <p className="text-xs text-slate-500">{app.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconLegend;
