import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, addDoc, query, orderBy } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase/config';
import { TRIP_DATA } from './data/staticData';
import { Icons } from './data/staticData';
import { useTrip } from './context/TripContext';
import { checkWeatherAlert, getWeatherForecast } from './services/weatherService';

// Import all components
import Header from './components/Header';
import DayCard from './components/DayCard';
import JetLagTab from './components/JetLagTab';
import FoodHelperTab from './components/FoodHelperTab';
import CurrencyConverter from './components/CurrencyConverter';
import KidComfortChecklist from './components/KidComfortChecklist';
import IconLegend from './components/IconLegend';
import TravelDocuments from './components/TravelDocuments';

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
          } else {
            // Initialize Firebase with default data if empty
            initializeFirebase();
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
  
  // Check for weather alerts
  useEffect(() => {
    const fetchWeatherAlert = async () => {
      try {
        const forecast = await getWeatherForecast('maiKhao');
        const alert = checkWeatherAlert(forecast);
        setWeatherAlert(alert);
      } catch (error) {
        console.error('Error fetching weather alert:', error);
      }
    };
    
    fetchWeatherAlert();
    // Check every hour
    const interval = setInterval(fetchWeatherAlert, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Initialize Firebase with default data
  const initializeFirebase = async () => {
    if (!isFirebaseConfigured()) return;
    
    try {
      for (const day of TRIP_DATA.initialPlan) {
        await addDoc(collection(db, 'itinerary'), {
          ...day,
          createdAt: new Date(),
          lastModified: new Date()
        });
      }
    } catch (error) {
      console.error('Error initializing Firebase:', error);
    }
  };
  
  // Update Firebase when plan changes (if online and configured)
  const handleUpdatePlan = async (dayIndex, updatedBlocks) => {
    updateDayPlan(dayIndex, updatedBlocks);
    
    if (isFirebaseConfigured() && isOnline && planData[dayIndex].id) {
      try {
        const docRef = doc(db, 'itinerary', planData[dayIndex].id);
        await updateDoc(docRef, { 
          blocks: updatedBlocks,
          lastModified: new Date()
        });
      } catch (error) {
        console.error('Error updating Firebase:', error);
      }
    }
  };
  
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
        if (planData.length === 0) {
          return (
            <div className="text-center py-12">
              <Icons.calendar className="w-12 h-12 text-slate-300 mx-auto mb-4"/>
              <p className="text-slate-500">No itinerary data available</p>
            </div>
          );
        }
        
        const currentDay = planData[currentDayIndex];
        return (
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Day Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={goToPrevDay} 
                disabled={currentDayIndex === 0} 
                className="px-4 py-2 bg-white rounded-lg shadow-md border disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center gap-2 hover:bg-slate-50 
                         transition-colors"
              >
                <Icons.chevronLeft className="w-5 h-5"/> 
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
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <Icons.chevronRight className="w-5 h-5"/>
              </button>
            </div>
            
            {/* Day Card */}
            <DayCard 
              dayData={currentDay} 
              dayIndex={currentDayIndex} 
              onUpdatePlan={handleUpdatePlan}
              planData={planData}
            />
            
            {/* Swipe Hint (shown on mobile) */}
            <div className="sm:hidden text-center mt-4 text-xs text-slate-400">
              Swipe left or right to navigate days
            </div>
          </div>
        );
        
      case 'JetLag':
        return <JetLagTab />;
        
      case 'FoodHelper':
        return <FoodHelperTab />;
        
      case 'Tools&Info':
        return (
          <div className="space-y-8">
            <CurrencyConverter />
            <KidComfortChecklist />
            <IconLegend />
          </div>
        );
        
      case 'Documents':
        return <TravelDocuments />;
        
      default:
        return null;
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Icons.plane className="w-12 h-12 text-sky-600 animate-pulse mx-auto mb-4"/>
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
          <Icons.alertTriangle className="inline w-4 h-4 mr-2"/>
          {weatherAlert.message}
        </div>
      )}
      
      {/* Firebase Error Banner */}
      {firebaseError && (
        <div className="bg-amber-100 text-amber-800 px-4 py-2 text-center text-sm">
          <Icons.alertTriangle className="inline w-4 h-4 mr-2"/>
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
