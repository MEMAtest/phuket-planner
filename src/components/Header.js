import React, { useState, useEffect } from 'react';
import { Icons } from '../data/staticData';
import { useTrip } from '../context/TripContext';
import { generateICS } from '../utils/calendar';

const Header = () => {
  const { activeTab, setActiveTab, planData } = useTrip();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    if (planData && planData.length > 0) {
      const icsContent = generateICS(planData);
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'Phuket_Itinerary.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const tabs = ['Itinerary', 'Jet Lag', 'Food Helper', 'Tools & Info', 'Documents'];

  // Format time for display
  const formatTime = (date, timeZone) => {
    return date.toLocaleTimeString('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const londonTime = formatTime(currentTime, 'Europe/London');
  const phuketTime = formatTime(currentTime, 'Asia/Bangkok');

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 border-b">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between gap-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <div className="bg-sky-600 p-2.5 rounded-xl text-white shadow-md">
                <Icons.plane className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Phuket Family Itinerary</h1>
                <p className="text-sm text-slate-500">August 19–29, 2025</p>
                {/* Dual Time Display */}
                <div className="flex gap-3 mt-1 text-xs">
                  <span className="text-slate-600">
                    🇬🇧 London: <span className="font-semibold">{londonTime}</span>
                  </span>
                  <span className="text-slate-600">
                    🇹🇭 Phuket: <span className="font-semibold">{phuketTime}</span>
                  </span>
                </div>
              </div>
            </div>
            
            {/* Navigation Tabs and Export Button */}
            <div className="flex items-center gap-2">
              <div className="p-1 bg-slate-200 rounded-lg flex gap-1">
                {tabs.map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab.replace(/\s+/g, ''))} 
                    className={`whitespace-nowrap px-3 py-1.5 text-sm font-semibold rounded-md transition-colors 
                      ${activeTab === tab.replace(/\s+/g, '') 
                        ? 'bg-white text-slate-800 shadow' 
                        : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Export Button */}
              <button 
                onClick={handleExport} 
                title="Export to Calendar" 
                className="p-2.5 bg-white rounded-lg shadow-sm border hover:bg-slate-100 transition-colors"
              >
                <Icons.calendar className="w-5 h-5 text-slate-600"/>
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="sm:hidden">
            {/* Logo and Title */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-sky-600 p-2 rounded-lg text-white shadow-md">
                  <Icons.plane className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-800">Phuket Trip</h1>
                  <p className="text-xs text-slate-500">Aug 19–29, 2025</p>
                  {/* Mobile Time Display */}
                  <div className="flex gap-2 mt-0.5 text-xs">
                    <span className="text-slate-600">🇬🇧 {londonTime}</span>
                    <span className="text-slate-600">🇹🇭 {phuketTime}</span>
                  </div>
                </div>
              </div>
              
              {/* Export Button */}
              <button 
                onClick={handleExport} 
                title="Export to Calendar" 
                className="p-2 bg-white rounded-lg shadow-sm border hover:bg-slate-100 transition-colors"
              >
                <Icons.calendar className="w-4 h-4 text-slate-600"/>
              </button>
            </div>
            
            {/* Mobile Navigation Tabs - Scrollable */}
            <div className="overflow-x-auto no-scrollbar">
              <div className="p-1 bg-slate-200 rounded-lg flex gap-1 min-w-fit">
                {tabs.map(tab => {
                  // Shorten tab names for mobile
                  const mobileTabName = tab === 'Tools & Info' ? 'Tools' : 
                                       tab === 'Food Helper' ? 'Food' :
                                       tab === 'Documents' ? 'Docs' :
                                       tab === 'Jet Lag' ? 'Jet Lag' :
                                       tab;
                  
                  return (
                    <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab.replace(/\s+/g, ''))} 
                      className={`whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-md transition-colors 
                        ${activeTab === tab.replace(/\s+/g, '') 
                          ? 'bg-white text-slate-800 shadow' 
                          : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      {mobileTabName}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
