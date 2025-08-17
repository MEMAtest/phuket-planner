import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRIP_DATA } from '../data/staticData';

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

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('phuket_trip_plan', JSON.stringify(planData));
  }, [planData]);

  useEffect(() => {
    localStorage.setItem('phuket_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('phuket_current_day', currentDayIndex.toString());
  }, [currentDayIndex]);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update a specific day's plan
  const updateDayPlan = (dayIndex, updatedBlocks) => {
    const newPlanData = [...planData];
    newPlanData[dayIndex] = {
      ...newPlanData[dayIndex],
      blocks: updatedBlocks
    };
    setPlanData(newPlanData);
  };

  // Add a new activity to a day
  const addActivity = (dayIndex, activity) => {
    const newPlanData = [...planData];
    newPlanData[dayIndex].blocks.push({
      ...activity,
      id: activity.id || Date.now()
    });
    // Sort by time
    newPlanData[dayIndex].blocks.sort((a, b) => {
      const timeA = a.time || '99:99';
      const timeB = b.time || '99:99';
      return timeA.localeCompare(timeB);
    });
    setPlanData(newPlanData);
  };

  // Remove an activity from a day
  const removeActivity = (dayIndex, activityId) => {
    const newPlanData = [...planData];
    newPlanData[dayIndex].blocks = newPlanData[dayIndex].blocks.filter(
      block => block.id !== activityId
    );
    setPlanData(newPlanData);
  };

  // Reset to default plan
  const resetPlan = () => {
    setPlanData(TRIP_DATA.initialPlan);
    setCurrentDayIndex(0);
  };

  const value = {
    planData,
    setPlanData,
    activeTab,
    setActiveTab,
    currentDayIndex,
    setCurrentDayIndex,
    isOnline,
    updateDayPlan,
    addActivity,
    removeActivity,
    resetPlan
  };

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
};
