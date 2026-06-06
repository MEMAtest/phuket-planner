import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { calculateProgress, getNextTheme, getCurrentLevel } from '../data/germanThemes';
import { createCard, reviewCard, countDue } from '../utils/srs';

/**
 * A spaced-repetition flashcard (shape produced by utils/srs.createCard)
 */
export type Flashcard = any;

/**
 * A "How do I say...?" capture from real life
 */
export type Capture = {
  id: string;
  timestamp: string;
  englishPhrase: string;
  german: string;
  literal: string;
  breakdown: string[];
  grammarNote: string;
  formality: string;
  context: string;
};

/**
 * A German diary entry with AI correction + mined errors
 */
export type DiaryEntry = {
  id: string;
  date: string;
  original: string;
  corrected: string;
  corrections: { original: string; fixed: string; explanation: string; errorType: string }[];
  errorTags: string[];
  encouragement: string;
  score: number;
};

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

  // Living-curriculum layers
  flashcards: Flashcard[];
  captures: Capture[];
  diaryEntries: DiaryEntry[];
  errorLog: Record<string, number>; // errorType -> count

  // Methods
  markThemeComplete: (themeId: string) => void;
  setCurrentTheme: (themeId: string | null) => void;
  addSession: (session: Omit<PracticeSession, 'id'>) => void;
  addRecording: (recording: Omit<Recording, 'id' | 'timestamp'>) => void;
  getProgress: () => number;
  getCurrentLevel: () => string;
  getNextTheme: () => any;
  updateStreak: () => void;

  // Flashcards / SRS
  addFlashcards: (cards: { german: string; english: string; source?: string; note?: string; themeId?: string | null; example?: string }[]) => number;
  reviewFlashcardById: (id: string, quality: number) => void;
  dueCount: () => number;

  // Capture & diary
  addCapture: (capture: Omit<Capture, 'id' | 'timestamp'>) => void;
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id' | 'date'>) => void;
  logErrors: (tags: string[]) => void;
  getWeakAreas: () => { tag: string; count: number }[];
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

  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem('german_flashcards');
    return saved ? JSON.parse(saved) : [];
  });

  const [captures, setCaptures] = useState<Capture[]>(() => {
    const saved = localStorage.getItem('german_captures');
    return saved ? JSON.parse(saved) : [];
  });

  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>(() => {
    const saved = localStorage.getItem('german_diary');
    return saved ? JSON.parse(saved) : [];
  });

  const [errorLog, setErrorLog] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('german_error_log');
    return saved ? JSON.parse(saved) : {};
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

  useEffect(() => {
    localStorage.setItem('german_flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem('german_captures', JSON.stringify(captures));
  }, [captures]);

  useEffect(() => {
    localStorage.setItem('german_diary', JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  useEffect(() => {
    localStorage.setItem('german_error_log', JSON.stringify(errorLog));
  }, [errorLog]);

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

  // ---- Flashcards / SRS ----
  const addFlashcards = useCallback((cards: { german: string; english: string; source?: string; note?: string; themeId?: string | null; example?: string }[]) => {
    let added = 0;
    setFlashcards(prev => {
      const existing = new Set(prev.map((c: Flashcard) => c.german.toLowerCase().trim()));
      const fresh = cards
        .filter(c => c.german && c.german.trim() && !existing.has(c.german.toLowerCase().trim()))
        .map((c: any) => createCard(c));
      added = fresh.length;
      return fresh.length ? [...prev, ...fresh] : prev;
    });
    return added;
  }, []);

  const reviewFlashcardById = useCallback((id: string, quality: number) => {
    setFlashcards(prev => prev.map((c: Flashcard) => (c.id === id ? reviewCard(c, quality) : c)));
  }, []);

  const dueCount = useCallback(() => countDue(flashcards), [flashcards]);

  // ---- Error log ----
  const logErrors = useCallback((tags: string[]) => {
    if (!tags || tags.length === 0) return;
    setErrorLog(prev => {
      const next = { ...prev };
      tags.forEach(tag => {
        if (!tag) return;
        next[tag] = (next[tag] || 0) + 1;
      });
      return next;
    });
  }, []);

  const getWeakAreas = useCallback(() => {
    return Object.entries(errorLog)
      .map(([tag, count]) => ({ tag, count: count as number }))
      .sort((a, b) => b.count - a.count);
  }, [errorLog]);

  // ---- Capture ----
  const addCapture = useCallback((capture: Omit<Capture, 'id' | 'timestamp'>) => {
    const newCapture: Capture = {
      ...capture,
      id: `cap-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      timestamp: new Date().toISOString()
    };
    setCaptures(prev => [newCapture, ...prev]);
    // A capture is perfect flashcard material - both sides already known
    if (newCapture.german && newCapture.englishPhrase) {
      setFlashcards(prev => {
        const exists = prev.some(c => c.german.toLowerCase().trim() === newCapture.german.toLowerCase().trim());
        if (exists) return prev;
        return [...prev, createCard({
          german: newCapture.german,
          english: newCapture.englishPhrase,
          source: 'capture',
          note: newCapture.grammarNote
        })];
      });
    }
  }, []);

  // ---- Diary ----
  const addDiaryEntry = useCallback((entry: Omit<DiaryEntry, 'id' | 'date'>) => {
    const newEntry: DiaryEntry = {
      ...entry,
      id: `diary-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      date: new Date().toISOString().split('T')[0]
    };
    setDiaryEntries(prev => [newEntry, ...prev]);
    // Mine the errors into the weak-area log
    if (entry.errorTags && entry.errorTags.length) {
      setErrorLog(prev => {
        const next = { ...prev };
        entry.errorTags.forEach(tag => {
          if (!tag) return;
          next[tag] = (next[tag] || 0) + 1;
        });
        return next;
      });
    }
  }, []);

  const value: GermanState = {
    completedThemes,
    currentThemeId,
    totalPracticeMinutes,
    streak,
    lastPracticeDate,
    sessions,
    recordings,
    flashcards,
    captures,
    diaryEntries,
    errorLog,
    markThemeComplete,
    setCurrentTheme,
    addSession,
    addRecording,
    getProgress,
    getCurrentLevel: getLevel,
    getNextTheme: getNext,
    updateStreak,
    addFlashcards,
    reviewFlashcardById,
    dueCount,
    addCapture,
    addDiaryEntry,
    logErrors,
    getWeakAreas
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
