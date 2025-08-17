import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRIP_DATA } from '../data/staticData';

const TripContext = createContext(undefined);

export const TripProvider = ({ children }) => {
  // Initialize from localStorage or use default data
  const [planData, setPlanData] = useState(() => {
    const saved = localStorage.getItem('tripPlanData');
    return saved ? JSON.parse(saved) : TRIP_DATA.initialPlan;
  });
  
  const [activeTab, setActiveTab] = useState('Itinerary');
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const [currentUser] = useState({
    id: '1',
    name: 'Guest User',
    email: 'guest@example.com'
  });
  
  const [collaborators] = useState([]);
  const [expenses, setExpenses] = useState([]);
  
  const [preferences, setPreferences] = useState({
    currency: 'THB',
    budgetPerDay: 5000,
    exchangeRate: 45.5
  });
  
  // Save to localStorage whenever planData changes
  useEffect(() => {
    localStorage.setItem('tripPlanData', JSON.stringify(planData));
  }, [planData]);
  
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
    newPlanData[dayIndex].blocks = updatedBlocks;
    setPlanData(newPlanData);
  };
  
  // Update preferences
  const updatePreferences = (prefs) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  };
  
  // Add expense
  const addExpense = (expense) => {
    setExpenses(prev => [...prev, expense]);
  };
  
  // Remove expense
  const removeExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };
  
  const value = {
    planData,
    setPlanData,
    updateDayPlan,
    activeTab,
    setActiveTab,
    currentDayIndex,
    setCurrentDayIndex,
    isOnline,
    currentUser,
    collaborators,
    preferences,
    updatePreferences,
    expenses,
    addExpense,
    removeExpense
  };
  
  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
};

// Custom hook to use the TripContext
export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
