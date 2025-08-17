import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PlanDay, User, Expense } from '../types';
import { TRIP_DATA } from '../data/staticData';

interface TripContextType {
  // Trip Data
  planData: PlanDay[];
  setPlanData: (data: PlanDay[]) => void;
  updateDayPlan: (dayIndex: number, updatedBlocks: any[]) => void;
  
  // UI State
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentDayIndex: number;
  setCurrentDayIndex: (index: number) => void;
  
  // Network State
  isOnline: boolean;
  
  // User & Collaboration
  currentUser: User | null;
  collaborators: User[];
  
  // Preferences
  preferences: {
    currency: 'THB' | 'GBP';
    budgetPerDay: number;
    exchangeRate: number;
  };
  updatePreferences: (prefs: Partial<TripContextType['preferences']>) => void;
  
  // Expenses
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

interface TripProviderProps {
  children: ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  // Initialize from localStorage or use default data
  const [planData, setPlanData] = useState<PlanDay[]>(() => {
    const saved = localStorage.getItem('tripPlanData');
    return saved ? JSON.parse(saved) : TRIP_DATA.initialPlan;
  });
  
  const [activeTab, setActiveTab] = useState<string>('Itinerary');
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  
  const [currentUser] = useState<User | null>({
    id: '1',
    name: 'Guest User',
    email: 'guest@example.com'
  });
  
  const [collaborators] = useState<User[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  const [preferences, setPreferences] = useState({
    currency: 'THB' as const,
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
  const updateDayPlan = (dayIndex: number, updatedBlocks: any[]) => {
    const newPlanData = [...planData];
    newPlanData[dayIndex].blocks = updatedBlocks;
    setPlanData(newPlanData);
  };
  
  // Update preferences
  const updatePreferences = (prefs: Partial<typeof preferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  };
  
  // Add expense
  const addExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };
  
  // Remove expense
  const removeExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };
  
  const value: TripContextType = {
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
