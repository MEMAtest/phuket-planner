import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Icons } from '../data/staticData';
import { useTrip } from '../context/TripContext';
import { generateICS } from '../utils/calendar';
import CountrySwitcher from './CountrySwitcher';
import { useCountry } from '../state/CountryContext';

const Header = () => {
  const { activeTab, setActiveTab, planData, setCurrentDayIndex, tripDates, setTripDatesForCountry } = useTrip();
  const { country } = useCountry();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [draftDates, setDraftDates] = useState({ startDate: '', endDate: '' });
  const datePickerRef = useRef(null);

  const activeDates = tripDates?.[country.iso2];

  useEffect(() => {
    setDraftDates(activeDates || { startDate: '', endDate: '' });
  }, [country.iso2, activeDates]);

  useEffect(() => {
    if (!showDatePicker) return undefined;
    const handleClick = event => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showDatePicker]);

  const getTodayIndex = useCallback(() => {
    if (!planData || planData.length === 0) return 0;
    const activeTrip = tripDates?.[country.iso2];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (activeTrip?.startDate) {
      const start = new Date(activeTrip.startDate);
      start.setHours(0, 0, 0, 0);
      if (!Number.isNaN(start.getTime())) {
        const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        if (diff < 0) return 0;
        if (diff >= planData.length) return planData.length - 1;
        return diff;
      }
    }

    const todayIndex = planData.findIndex(day => {
      const dayDate = new Date(day.date);
      dayDate.setHours(0, 0, 0, 0);
      return dayDate.getTime() === today.getTime();
    });

    if (todayIndex >= 0) return todayIndex;

    const firstDay = new Date(planData[0].date);
    firstDay.setHours(0, 0, 0, 0);
    if (today < firstDay) return 0;
    return planData.length - 1;
  }, [planData, tripDates, country.iso2]);

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    if (planData && planData.length > 0) {
      const icsContent = generateICS(planData, country, {
        timeZone: country.timeZones?.[0],
        tripLabel: `${country.name} Family Trip`,
        location: country.name,
        description: `Custom itinerary for ${country.name}`
      });
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `${country.iso2 || 'trip'}_Itinerary.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleLogoClick = () => {
    setActiveTab('Itinerary');
    const todayIdx = getTodayIndex();
    setCurrentDayIndex(todayIdx);
  };

  // Handle tab click - navigate to today if clicking Itinerary
  const handleTabClick = (tabName) => {
    const cleanTabName = tabName.replace(/\s+/g, '');
    setActiveTab(cleanTabName);
    
    // If clicking on Itinerary tab, also navigate to today
    if (cleanTabName === 'Itinerary') {
      const todayIdx = getTodayIndex();
      setCurrentDayIndex(todayIdx);
    }
  };

  const tabs = ['Itinerary', 'Jet Lag', 'Food Helper', 'Tools & Info', 'Documents'];

  const dateLabel = useMemo(() => {
    if (activeDates?.startDate && activeDates?.endDate) {
      return `${new Date(activeDates.startDate).toLocaleDateString()} – ${new Date(activeDates.endDate).toLocaleDateString()}`;
    }
    if (activeDates?.startDate) {
      return new Date(activeDates.startDate).toLocaleDateString();
    }
    return 'Select travel dates';
  }, [activeDates]);

  const handleSaveDates = () => {
    if (!draftDates.startDate && !draftDates.endDate) {
      setTripDatesForCountry(country.iso2, null);
    } else {
      setTripDatesForCountry(country.iso2, {
        startDate: draftDates.startDate || draftDates.endDate,
        endDate: draftDates.endDate || draftDates.startDate
      });
    }
    setShowDatePicker(false);
  };

  const handleClearDates = () => {
    setDraftDates({ startDate: '', endDate: '' });
    setTripDatesForCountry(country.iso2, null);
    setShowDatePicker(false);
  };

  const handleUseToday = () => {
    const today = new Date().toISOString().split('T')[0];
    setDraftDates({ startDate: today, endDate: today });
  };

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
  const destinationTimeZone = country.timeZones?.[0] || 'UTC';
  const destinationTime = formatTime(currentTime, destinationTimeZone);

  const getCountryFlag = (iso = '') => {
    if (!iso) return '🌍';
    return iso
      .toUpperCase()
      .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 border-b">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between gap-4">
            {/* Logo and Title - Entire block clickable */}
            <button
              type="button"
              onClick={handleLogoClick}
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
              aria-label="Back to itinerary"
            >
              <div className="bg-sky-600 p-2.5 rounded-xl text-white shadow-md">
                <Icons.TripLogo className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-slate-800">Trip Planner</h1>
                <p className="text-sm text-slate-500">{dateLabel}</p>
                {/* Dual Time Display */}
                <div className="flex gap-3 mt-1 text-xs">
                  <span className="text-slate-600">
                    🇬🇧 London: <span className="font-semibold">{londonTime}</span>
                  </span>
                  <span className="text-slate-600">
                    {getCountryFlag(country.iso2)} {country.name}:{' '}
                    <span className="font-semibold">{destinationTime}</span>
                  </span>
                </div>
              </div>
            </button>
            
            {/* Navigation Tabs and Export Button */}
            <div className="flex items-center gap-2">
              <CountrySwitcher />
              <div className="relative" ref={datePickerRef}>
                <button
                  onClick={() => setShowDatePicker(prev => !prev)}
                  className={`px-3 py-2 rounded-lg border text-sm flex items-center gap-2 ${showDatePicker ? 'bg-sky-50 border-sky-200 text-sky-700' : 'bg-white hover:bg-slate-50'}`}
                >
                  <Icons.Calendar className="w-4 h-4" />
                  {dateLabel}
                </button>

                {showDatePicker && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-xl p-4 z-30">
                    <h4 className="text-sm font-semibold text-slate-800 mb-3">
                      Travel dates for {country.name}
                    </h4>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Start date</label>
                    <input
                      type="date"
                      value={draftDates.startDate || ''}
                      onChange={(e) => setDraftDates(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2 mb-3"
                    />
                    <label className="block text-xs font-medium text-slate-600 mb-1">End date</label>
                    <input
                      type="date"
                      value={draftDates.endDate || ''}
                      onChange={(e) => setDraftDates(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2 mb-3"
                    />
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <button onClick={handleUseToday} className="text-sky-600 hover:text-sky-800">Use today</button>
                      <button onClick={handleClearDates} className="text-rose-600 hover:text-rose-800">Clear</button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveDates}
                        className="flex-1 bg-sky-600 text-white py-2 rounded-lg font-semibold hover:bg-sky-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setShowDatePicker(false)}
                        className="flex-1 border py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-1 bg-slate-200 rounded-lg flex gap-1">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
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
                <Icons.Calendar className="w-5 h-5 text-slate-600"/>
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="sm:hidden">
            {/* Logo and Title */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={handleLogoClick}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                aria-label="Back to itinerary"
              >
                <div className="bg-sky-600 p-2 rounded-lg text-white shadow-md">
                  <Icons.TripLogo className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h1 className="text-lg font-bold text-slate-800">{country.name} Trip</h1>
                  <p className="text-xs text-slate-500">{dateLabel}</p>
                  {/* Mobile Time Display */}
                  <div className="flex gap-2 mt-0.5 text-xs">
                    <span className="text-slate-600">🇬🇧 {londonTime}</span>
                    <span className="text-slate-600">
                      {getCountryFlag(country.iso2)} {destinationTime}
                    </span>
                  </div>
                </div>
              </button>
              
              {/* Export Button */}
              <button 
                onClick={handleExport} 
                title="Export to Calendar" 
                className="p-2 bg-white rounded-lg shadow-sm border hover:bg-slate-100 transition-colors"
              >
                <Icons.Calendar className="w-4 h-4 text-slate-600"/>
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
                      onClick={() => handleTabClick(tab)} 
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
