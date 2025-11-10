import React, { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { db, isFirebaseConfigured } from '../firebase/config';
import { collection, doc, setDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getTripPreset } from '../data/itineraryContent';
import { useCountry } from '../state/CountryContext';

const TripContext = createContext();

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};

export const TripProvider = ({ children }) => {
  const { country } = useCountry();
  const planPreset = useMemo(() => getTripPreset(country.iso2), [country.iso2]);
  const planStorageKey = useMemo(() => `trip_plan_${country.iso2}`, [country.iso2]);
  const activeTabKey = useMemo(() => `trip_active_tab_${country.iso2}`, [country.iso2]);
  const currentDayKey = useMemo(() => `trip_current_day_${country.iso2}`, [country.iso2]);

  const clonePlan = useCallback((plan) => {
    return plan.map(day => ({
      ...day,
      blocks: day.blocks.map(block => ({ ...block }))
    }));
  }, []);

  const [planData, setPlanData] = useState(() => {
    const saved = localStorage.getItem(planStorageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved plan:', e);
      }
    }
    return clonePlan(planPreset.initialPlan);
  });
  
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem(activeTabKey);
    return saved || 'Itinerary';
  });
  
  const [currentDayIndex, setCurrentDayIndex] = useState(() => {
    const saved = localStorage.getItem(currentDayKey);
    return saved ? parseInt(saved) : 0;
  });
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle', 'syncing', 'synced', 'error'
  const [undoStack, setUndoStack] = useState([]);
  const [tripDates, setTripDates] = useState(() => {
    const saved = localStorage.getItem('trip_dates_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing trip dates:', error);
      }
    }
    return {};
  });
  const planDataRef = useRef(planData);

  useEffect(() => {
    planDataRef.current = planData;
  }, [planData]);

  const showNotification = useCallback((message, type = 'info') => {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : 
                    type === 'warning' ? 'bg-amber-500' : 
                    type === 'error' ? 'bg-red-500' : 'bg-slate-500';
    
    notification.className = `${bgColor} text-white px-4 py-2 rounded-lg shadow-lg fixed bottom-4 right-4 z-50 animate-slide-up`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('animate-slide-down');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }, []);
  
  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(planStorageKey, JSON.stringify(planData));
    console.log(`📱 Saved ${country.iso2} plan:`, planData.length, 'days');
  }, [planData, planStorageKey, country.iso2]);
  
  useEffect(() => {
    localStorage.setItem(activeTabKey, activeTab);
  }, [activeTab, activeTabKey]);
  
  useEffect(() => {
    localStorage.setItem(currentDayKey, currentDayIndex.toString());
  }, [currentDayIndex, currentDayKey]);

  useEffect(() => {
    const savedPlan = localStorage.getItem(planStorageKey);
    if (savedPlan) {
      try {
        setPlanData(JSON.parse(savedPlan));
      } catch (error) {
        console.error('Failed to parse saved plan', error);
        setPlanData(clonePlan(planPreset.initialPlan));
      }
    } else {
      setPlanData(clonePlan(planPreset.initialPlan));
    }

    const savedTab = localStorage.getItem(activeTabKey);
    setActiveTab(savedTab || 'Itinerary');

    const savedDay = localStorage.getItem(currentDayKey);
    setCurrentDayIndex(savedDay ? parseInt(savedDay, 10) : 0);
  }, [planStorageKey, planPreset, clonePlan, activeTabKey, currentDayKey]);

  useEffect(() => {
    localStorage.setItem('trip_dates_v1', JSON.stringify(tripDates));
  }, [tripDates]);
  
  const syncWithFirebase = useCallback(async () => {
    if (!isFirebaseConfigured() || !isOnline) return;

    const dataToSync = planDataRef.current;
    if (!dataToSync) return;
    
    setSyncStatus('syncing');
    try {
      for (const day of dataToSync) {
        const docId = `day_${day.date}`;
        await setDoc(doc(db, 'itinerary', docId), {
          ...day,
          lastModified: new Date().toISOString(),
          syncedAt: new Date().toISOString()
        });
      }
      console.log('✅ Synced to Firebase successfully');
      setSyncStatus('synced');
      
      // Show success notification
      showNotification('☁️ Synced to cloud', 'success');
    } catch (error) {
      console.error('Error syncing to Firebase:', error);
      setSyncStatus('error');
      showNotification('⚠️ Sync failed - data saved locally', 'warning');
    }
  }, [isOnline, showNotification]);

  // Setup Firebase listener for real-time updates
  const setupFirebaseListener = useCallback(() => {
    if (!isFirebaseConfigured()) return undefined;
    
    try {
      const q = query(collection(db, 'itinerary'), orderBy('date'));
      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          if (!snapshot.empty && snapshot.metadata.fromCache === false) {
            const firebasePlan = snapshot.docs.map(doc => ({
              firebaseId: doc.id,
              ...doc.data()
            }));
            
            const firebaseDataStr = JSON.stringify(firebasePlan);
            setPlanData(prev => {
              const localDataStr = JSON.stringify(prev);
              if (localDataStr !== firebaseDataStr) {
                console.log('🔄 Received updates from Firebase');
                setSyncStatus('synced');
                return firebasePlan;
              }
              return prev;
            });
          }
        },
        (error) => {
          console.error('Firebase listener error:', error);
          setSyncStatus('error');
        }
      );
      
      return unsubscribe;
    } catch (error) {
      console.error('Error setting up Firebase listener:', error);
      setSyncStatus('error');
      return undefined;
    }
  }, []);

  const setTripDatesForCountry = useCallback((countryIso, dates) => {
    setTripDates(prev => {
      const updated = { ...prev };
      if (!dates || (!dates.startDate && !dates.endDate)) {
        delete updated[countryIso];
      } else {
        updated[countryIso] = dates;
      }
      return updated;
    });
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('🌐 Back online - syncing with Firebase');
      syncWithFirebase();
    };
    const handleOffline = () => {
      setIsOnline(false);
      console.log('📴 Offline - using local storage');
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncWithFirebase]);
  
  // Firebase sync on mount and when online
  useEffect(() => {
    if (!isFirebaseConfigured() || !isOnline) {
      return;
    }

    const unsubscribe = setupFirebaseListener();
    syncWithFirebase();

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [isOnline, setupFirebaseListener, syncWithFirebase]);
  
  // Update a specific day's plan with better persistence
  const updateDayPlan = async (dayIndex, updatedBlocks) => {
    // Save current state for undo
    const previousState = {
      dayIndex,
      blocks: [...planData[dayIndex].blocks],
      timestamp: Date.now()
    };
    
    // Add to undo stack (keep last 5 operations)
    setUndoStack(prev => [...prev.slice(-4), previousState]);
    
    // Update local state
    const newPlanData = [...planData];
    newPlanData[dayIndex] = {
      ...newPlanData[dayIndex],
      blocks: updatedBlocks
    };
    setPlanData(newPlanData);
    
    // Force localStorage save immediately
    localStorage.setItem(planStorageKey, JSON.stringify(newPlanData));
    console.log('💾 Activity saved to localStorage', updatedBlocks);
    
    // Sync to Firebase if online
    if (isFirebaseConfigured() && isOnline) {
      try {
        const docId = `day_${newPlanData[dayIndex].date}`;
        await setDoc(doc(db, 'itinerary', docId), {
          ...newPlanData[dayIndex],
          lastModified: new Date().toISOString()
        });
        console.log('☁️ Synced to Firebase');
      } catch (error) {
        console.error('Firebase sync error:', error);
      }
    }
  };
  
  // Undo last operation
  const undoLastOperation = () => {
    if (undoStack.length === 0) return false;
    
    const lastOperation = undoStack[undoStack.length - 1];
    const newPlanData = [...planData];
    newPlanData[lastOperation.dayIndex].blocks = lastOperation.blocks;
    
    setPlanData(newPlanData);
    setUndoStack(prev => prev.slice(0, -1));
    
    // Save to localStorage
    localStorage.setItem(planStorageKey, JSON.stringify(newPlanData));
    
    // Sync to Firebase
    if (isFirebaseConfigured() && isOnline) {
      const docId = `day_${newPlanData[lastOperation.dayIndex].date}`;
      setDoc(doc(db, 'itinerary', docId), {
        ...newPlanData[lastOperation.dayIndex],
        lastModified: new Date().toISOString()
      });
    }
    
    return true;
  };
  
  // Add a new activity to a day
  const addActivity = (dayIndex, activity) => {
    const activityWithId = {
      ...activity,
      id: activity.id || `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    const newPlanData = [...planData];
    newPlanData[dayIndex].blocks.push(activityWithId);
    
    // Sort by time
    newPlanData[dayIndex].blocks.sort((a, b) => {
      const timeA = a.time || '99:99';
      const timeB = b.time || '99:99';
      return timeA.localeCompare(timeB);
    });
    
    updateDayPlan(dayIndex, newPlanData[dayIndex].blocks);
  };
  
  // Remove an activity from a day
  const removeActivity = (dayIndex, activityId) => {
    const newPlanData = [...planData];
    newPlanData[dayIndex].blocks = newPlanData[dayIndex].blocks.filter(
      block => block.id !== activityId
    );
    updateDayPlan(dayIndex, newPlanData[dayIndex].blocks);
  };
  
  // Reset to default plan
  const resetPlan = () => {
    setPlanData(clonePlan(planPreset.initialPlan));
    setCurrentDayIndex(0);
    setUndoStack([]);
    
    // Clear localStorage
    localStorage.setItem(planStorageKey, JSON.stringify(clonePlan(planPreset.initialPlan)));
    
    // Sync to Firebase
    if (isFirebaseConfigured() && isOnline) {
      syncWithFirebase();
    }
  };
  
  const value = {
    planData,
    setPlanData,
    activeTab,
    setActiveTab,
    currentDayIndex,
    setCurrentDayIndex,
    isOnline,
    syncStatus,
    updateDayPlan,
    addActivity,
    removeActivity,
    resetPlan,
    undoLastOperation,
    undoStack,
    showNotification,
    tripDates,
    setTripDatesForCountry,
    country
  };
  
  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
};
