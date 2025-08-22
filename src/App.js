import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase/config';
import { Icons } from './data/staticData';
import { useTrip } from './context/TripContext';

// Import all components
import Header from './components/Header';
import DayCard from './components/DayCard';
import SmartJetLagScheduler from './components/SmartJetLagScheduler';
import FoodHelperTab from './components/FoodHelperTab';
import CurrencyConverter from './components/CurrencyConverter';
import KidComfortChecklist from './components/KidComfortChecklist';
// import IconLegend from './components/IconLegend'; // REMOVED - This component has Icon issues
import TravelDocuments from './components/TravelDocuments';
import PriceGuide from './components/PriceGuide';

const App = () => {
  const { 
    planData, 
    setPlanData, 
    updateDayPlan,
    activeTab, 
    currentDayIndex, 
    setCurrentDayIndex,
    isOnline 
  } = useTrip();
  
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [weatherAlert, setWeatherAlert] = useState(null);
  
  // Firebase sync (only if configured)
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      console.log('Firebase not configured, using local storage only');
      return;
    }
    
    if (!isOnline) {
      console.log('Offline - using cached data');
      return;
    }
    
    setLoading(true);
    
    try {
      const q = query(collection(db, 'itinerary'), orderBy('date'));
      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          if (!snapshot.empty) {
            const firebasePlan = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setPlanData(firebasePlan);
          }
          setLoading(false);
        },
        (error) => {
          console.error('Firebase sync error:', error);
          setFirebaseError('Using offline mode - changes saved locally');
          setLoading(false);
        }
      );
      
      return () => unsubscribe();
    } catch (error) {
      console.error('Firebase setup error:', error);
      setFirebaseError('Using offline mode - changes saved locally');
      setLoading(false);
    }
  }, [isOnline, setPlanData]);
  
  // Check for weather alerts (only if weatherService exists)
  useEffect(() => {
    const fetchWeatherAlert = async () => {
      try {
        const weatherModule = await import('./services/weatherService').catch(() => null);
        if (weatherModule && weatherModule.getWeatherForecast && weatherModule.checkWeatherAlert) {
          const forecast = await weatherModule.getWeatherForecast('maiKhao');
          const alert = weatherModule.checkWeatherAlert(forecast);
          setWeatherAlert(alert);
        }
      } catch (error) {
        console.log('Weather service not configured yet');
      }
    };
    
    fetchWeatherAlert();
    const interval = setInterval(fetchWeatherAlert, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Navigation functions
  const goToNextDay = () => {
    setCurrentDayIndex(prev => Math.min(prev + 1, planData.length - 1));
  };
  
  const goToPrevDay = () => {
    setCurrentDayIndex(prev => Math.max(prev - 1, 0));
  };
  
  // Touch handlers for swipe navigation
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && currentDayIndex < planData.length - 1) {
      goToNextDay();
    }
    if (isRightSwipe && currentDayIndex > 0) {
      goToPrevDay();
    }
  };
  
  // Render content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'Itinerary':
        if (!planData || planData.length === 0) {
          return (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              {/* Use icon as function, not JSX component */}
              {React.createElement(Icons.calendar, { className: "w-12 h-12 text-slate-300 mx-auto mb-4" })}
              <p className="text-slate-500">Loading itinerary...</p>
            </div>
          );
        }
        
        const currentDay = planData[currentDayIndex] || planData[0];
        if (!currentDay) {
          return (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <p className="text-slate-500">No itinerary data available</p>
            </div>
          );
        }
        
        return (
          <div>
            {/* Day Navigation - ONLY THIS PART HAS TOUCH HANDLERS */}
            <div 
              className="flex items-center justify-between mb-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <button 
                onClick={goToPrevDay} 
                disabled={currentDayIndex === 0} 
                className="px-4 py-2 bg-white rounded-lg shadow-md border disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center gap-2 hover:bg-slate-50 
                         transition-colors"
                aria-label="Previous day"
              >
                {React.createElement(Icons.chevronLeft, { className: "w-5 h-5" })}
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>
              
              <div className="text-center">
                <h2 className="font-bold text-xl text-slate-800">
                  {new Date(currentDay.date).toLocaleDateString('en-US', { weekday: 'long' })}
                </h2>
                <p className="text-sm text-slate-500">
                  {new Date(currentDay.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </p>
                <div className="flex justify-center gap-1 mt-2">
                  {planData.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentDayIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentDayIndex ? 'bg-sky-600' : 'bg-slate-300'
                      }`}
                      aria-label={`Go to day ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <button 
                onClick={goToNextDay} 
                disabled={currentDayIndex === planData.length - 1} 
                className="px-4 py-2 bg-white rounded-lg shadow-md border disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center gap-2 hover:bg-slate-50 
                         transition-colors"
                aria-label="Next day"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                {React.createElement(Icons.chevronRight, { className: "w-5 h-5" })}
              </button>
            </div>
            
            {/* Day Card - NO TOUCH HANDLERS HERE */}
            <DayCard 
              dayData={currentDay} 
              dayIndex={currentDayIndex} 
              onUpdatePlan={updateDayPlan}
              planData={planData}
            />
            
            {/* Swipe Hint (shown on mobile) */}
            <div className="sm:hidden text-center mt-4 text-xs text-slate-400">
              Swipe left or right to navigate days
            </div>
          </div>
        );
        
      case 'JetLag':
        const currentDate = planData && planData[currentDayIndex] 
          ? planData[currentDayIndex].date 
          : '2025-08-20';
        return <SmartJetLagScheduler currentDate={currentDate} />;
        
      case 'FoodHelper':
        return <FoodHelperTab />;
        
      case 'Tools&Info':
        return (
          <div className="space-y-8">
            <CurrencyConverter />
            <PriceGuide />
            <KidComfortChecklist />
            {/* IconLegend removed - has Icon rendering issues */}
            {/* Emergency contacts section added here as replacement */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-bold text-lg text-red-800 mb-4 flex items-center gap-2">
                ⚠️ Emergency Contacts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👮</span>
                    <span className="font-medium text-sm text-slate-700">Tourist Police</span>
                  </div>
                  <a href="tel:1155" className="font-bold text-red-600">1155</a>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🚑</span>
                    <span className="font-medium text-sm text-slate-700">Medical Emergency</span>
                  </div>
                  <a href="tel:1669" className="font-bold text-red-600">1669</a>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏨</span>
                    <span className="font-medium text-sm text-slate-700">Hotel (Anantara)</span>
                  </div>
                  <a href="tel:+6676336000" className="font-bold text-red-600">+66 76 336 000</a>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇬🇧</span>
                    <span className="font-medium text-sm text-slate-700">UK Embassy Bangkok</span>
                  </div>
                  <a href="tel:+6623058333" className="font-bold text-red-600">+66 2 305 8333</a>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'Documents':
        return <TravelDocuments />;
        
      default:
        return (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <p className="text-slate-500">Select a tab to view content</p>
          </div>
        );
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          {React.createElement(Icons.plane, { className: "w-12 h-12 text-sky-600 animate-pulse mx-auto mb-4" })}
          <p className="text-slate-600">Loading your trip planner...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      
      {/* Weather Alert Banner */}
      {weatherAlert && (
        <div className={`px-4 py-2 text-center text-sm font-semibold
          ${weatherAlert.type === 'danger' ? 'bg-red-100 text-red-800 border-b-2 border-red-300' :
            weatherAlert.type === 'warning' ? 'bg-amber-100 text-amber-800 border-b-2 border-amber-300' :
            'bg-blue-100 text-blue-800 border-b-2 border-blue-300'}`}>
          {React.createElement(Icons.alertTriangle, { className: "inline w-4 h-4 mr-2" })}
          {weatherAlert.message}
        </div>
      )}
      
      {/* Firebase Error Banner */}
      {firebaseError && (
        <div className="bg-amber-100 text-amber-800 px-4 py-2 text-center text-sm">
          {React.createElement(Icons.alertTriangle, { className: "inline w-4 h-4 mr-2" })}
          {firebaseError}
        </div>
      )}
      
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      
      {/* Footer */}
      <footer className="text-center py-8 text-xs text-slate-400">
        <p>Phuket Trip Planner v2.0 • Built with ❤️ for family adventures</p>
        {isFirebaseConfigured() && (
          <p className="mt-1">
            {isOnline ? '🟢 Online - Syncing' : '🔴 Offline - Local Only'}
          </p>
        )}
      </footer>
    </div>
  );
};

export default App;
