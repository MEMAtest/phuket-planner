import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { calculateProgress, getNextTheme, getCurrentLevel } from '../data/germanThemes';

/**
 * Practice session record
 */
export type PracticeSession = {
  id: string;
  themeId: string;
  date: string; // ISO date
  duration: number; // minutes
  exercisesCompleted: number;
  averageScore: number; // 0-10
  recordings: string[]; // IDs of recorded attempts
};

/**
 * Recording with feedback
 */
export type Recording = {
  id: string;
  themeId: string;
  scenarioId: string;
  timestamp: string;
  transcription: string;
  userInput: string;
  aiFeedback: {
    grammarScore: number; // 0-10
    pronunciationScore: number; // 0-10
    fluencyScore: number; // 0-10
    overallScore: number; // 0-10
    corrections: string[];
    suggestions: string[];
    betterAlternatives: string[];
  };
};

/**
 * German learning state
 */
export type GermanState = {
  // Progress
  completedThemes: string[]; // theme IDs
  currentThemeId: string | null;
  totalPracticeMinutes: number;
  streak: number; // consecutive days
  lastPracticeDate: string | null; // ISO date

  // Sessions & recordings
  sessions: PracticeSession[];
  recordings: Recording[];

  // Methods
  markThemeComplete: (themeId: string) => void;
  setCurrentTheme: (themeId: string | null) => void;
  addSession: (session: Omit<PracticeSession, 'id'>) => void;
  addRecording: (recording: Omit<Recording, 'id' | 'timestamp'>) => void;
  getProgress: () => number;
  getCurrentLevel: () => string;
  getNextTheme: () => any;
  updateStreak: () => void;
};

const GermanContext = createContext<GermanState | undefined>(undefined);

export function GermanProvider({ children }: { children: ReactNode }) {
  // Load state from localStorage
  const [completedThemes, setCompletedThemes] = useState<string[]>(() => {
    const saved = localStorage.getItem('german_completed_themes');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentThemeId, setCurrentThemeId] = useState<string | null>(() => {
    const saved = localStorage.getItem('german_current_theme');
    return saved || null;
  });

  const [totalPracticeMinutes, setTotalPracticeMinutes] = useState<number>(() => {
    const saved = localStorage.getItem('german_total_minutes');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('german_streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lastPracticeDate, setLastPracticeDate] = useState<string | null>(() => {
    const saved = localStorage.getItem('german_last_practice');
    return saved || null;
  });

  const [sessions, setSessions] = useState<PracticeSession[]>(() => {
    const saved = localStorage.getItem('german_sessions');
    return saved ? JSON.parse(saved) : [];
  });

  const [recordings, setRecordings] = useState<Recording[]>(() => {
    const saved = localStorage.getItem('german_recordings');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('german_completed_themes', JSON.stringify(completedThemes));
  }, [completedThemes]);

  useEffect(() => {
    if (currentThemeId) {
      localStorage.setItem('german_current_theme', currentThemeId);
    } else {
      localStorage.removeItem('german_current_theme');
    }
  }, [currentThemeId]);

  useEffect(() => {
    localStorage.setItem('german_total_minutes', totalPracticeMinutes.toString());
  }, [totalPracticeMinutes]);

  useEffect(() => {
    localStorage.setItem('german_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    if (lastPracticeDate) {
      localStorage.setItem('german_last_practice', lastPracticeDate);
    }
  }, [lastPracticeDate]);

  useEffect(() => {
    localStorage.setItem('german_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('german_recordings', JSON.stringify(recordings));
  }, [recordings]);

  const markThemeComplete = useCallback((themeId: string) => {
    setCompletedThemes(prev => {
      if (prev.includes(themeId)) return prev;
      return [...prev, themeId];
    });
  }, []);

  const setCurrentTheme = useCallback((themeId: string | null) => {
    setCurrentThemeId(themeId);
  }, []);

  const addSession = useCallback((session: Omit<PracticeSession, 'id'>) => {
    const newSession: PracticeSession = {
      ...session,
      id: `session-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
    };

    setSessions(prev => [...prev, newSession]);
    setTotalPracticeMinutes(prev => prev + session.duration);
    setLastPracticeDate(newSession.date);
  }, []);

  const addRecording = useCallback((recording: Omit<Recording, 'id' | 'timestamp'>) => {
    const newRecording: Recording = {
      ...recording,
      id: `rec-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      timestamp: new Date().toISOString()
    };

    setRecordings(prev => [...prev, newRecording]);
  }, []);

  const getProgress = useCallback(() => {
    return calculateProgress(completedThemes);
  }, [completedThemes]);

  const getLevel = useCallback(() => {
    return getCurrentLevel(completedThemes);
  }, [completedThemes]);

  const getNext = useCallback(() => {
    return getNextTheme(completedThemes);
  }, [completedThemes]);

  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const last = lastPracticeDate;

    if (!last) {
      // First practice
      setStreak(1);
      setLastPracticeDate(today);
      return;
    }

    if (last === today) {
      // Already practiced today
      return;
    }

    // Check if yesterday
    const lastDate = new Date(last);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day
      setStreak(prev => prev + 1);
    } else {
      // Streak broken
      setStreak(1);
    }

    setLastPracticeDate(today);
  }, [lastPracticeDate]);

  const value: GermanState = {
    completedThemes,
    currentThemeId,
    totalPracticeMinutes,
    streak,
    lastPracticeDate,
    sessions,
    recordings,
    markThemeComplete,
    setCurrentTheme,
    addSession,
    addRecording,
    getProgress,
    getCurrentLevel: getLevel,
    getNextTheme: getNext,
    updateStreak
  };

  return <GermanContext.Provider value={value}>{children}</GermanContext.Provider>;
}

/**
 * Hook to access German learning context
 */
export function useGerman(): GermanState {
  const context = useContext(GermanContext);
  if (!context) {
    throw new Error('useGerman must be used within GermanProvider');
  }
  return context;
}
