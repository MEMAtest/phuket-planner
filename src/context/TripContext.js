import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRIP_DATA } from '../data/staticData';
import { db, isFirebaseConfigured } from '../firebase/config';
import { collection, doc, setDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const TripContext = createContext();

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};

export const TripProvider = ({ children }) => {
  const [planData, setPlanData] = useState(() => {
    // Try to load from localStorage first
    const saved = localStorage.getItem('phuket_trip_plan');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved plan:', e);
      }
    }
    return TRIP_DATA.initialPlan;
  });
  
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem('phuket_active_tab');
    return saved || 'Itinerary';
  });
  
  const [currentDayIndex, setCurrentDayIndex] = useState(() => {
    const saved = localStorage.getItem('phuket_current_day');
    return saved ? parseInt(saved) : 0;
  });
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle', 'syncing', 'synced', 'error'
  const [undoStack, setUndoStack] = useState([]);
  
  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('phuket_trip_plan', JSON.stringify(planData));
    console.log('📱 Saved to localStorage:', planData.length, 'days');
  }, [planData]);
  
  useEffect(() => {
    localStorage.setItem('phuket_active_tab', activeTab);
  }, [activeTab]);
  
  useEffect(() => {
    localStorage.setItem('phuket_current_day', currentDayIndex.toString());
  }, [currentDayIndex]);
  
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
  }, []);
  
  // Firebase sync on mount and when online
  useEffect(() => {
    if (isFirebaseConfigured() && isOnline) {
      setupFirebaseListener();
      syncWithFirebase();
    }
  }, [isOnline]);
  
  // Setup Firebase listener for real-time updates
  const setupFirebaseListener = () => {
    if (!isFirebaseConfigured()) return;
    
    try {
      const q = query(collection(db, 'itinerary'), orderBy('date'));
      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          if (!snapshot.empty && snapshot.metadata.fromCache === false) {
            const firebasePlan = snapshot.docs.map(doc => ({
              firebaseId: doc.id,
              ...doc.data()
            }));
            
            // Only update if data is different
            const localDataStr = JSON.stringify(planData);
            const firebaseDataStr = JSON.stringify(firebasePlan);
            
            if (localDataStr !== firebaseDataStr) {
              console.log('🔄 Received updates from Firebase');
              setPlanData(firebasePlan);
              setSyncStatus('synced');
            }
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
    }
  };
  
  // Sync local data to Firebase
  const syncWithFirebase = async () => {
    if (!isFirebaseConfigured() || !isOnline) return;
    
    setSyncStatus('syncing');
    try {
      for (const day of planData) {
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
  };
  
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
    localStorage.setItem('phuket_trip_plan', JSON.stringify(newPlanData));
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
    localStorage.setItem('phuket_trip_plan', JSON.stringify(newPlanData));
    
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
  
  // Helper function to show notifications
  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : 
                    type === 'warning' ? 'bg-amber-500' : 
                    type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    notification.className = `fixed top-20 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in flex items-center gap-2`;
    notification.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('animate-fade-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
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
    setPlanData(TRIP_DATA.initialPlan);
    setCurrentDayIndex(0);
    setUndoStack([]);
    
    // Clear localStorage
    localStorage.setItem('phuket_trip_plan', JSON.stringify(TRIP_DATA.initialPlan));
    
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
    showNotification
  };
  
  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
};
