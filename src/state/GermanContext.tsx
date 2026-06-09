import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { calculateProgress, getNextTheme, getCurrentLevel } from '../data/germanThemes';
import { createCard, reviewCard } from '../utils/srs';

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
 * A spaced-repetition flashcard (shape created by utils/srs.createCard).
 */
export type Flashcard = {
  id: string;
  german: string;
  english: string;
  note: string;
  example: string;
  source: string;
  themeId: string | null;
  created: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  dueDate: string;
  lastReviewed: string | null;
  totalReviews: number;
  lapses: number;
};

/** Input accepted by addFlashcards (scheduling fields are added automatically). */
export type NewCard = {
  german: string;
  english?: string;
  source?: string;
  note?: string;
  themeId?: string | null;
  example?: string;
};

/** A real-life phrase the learner captured via "How do I say…?". */
export type Capture = {
  id: string;
  date: string;
  englishPhrase: string;
  german: string;
  literal?: string;
  breakdown?: string[];
  grammarNote?: string;
  formality?: string;
  context?: string;
};

export type DiaryCorrection = {
  original: string;
  fixed: string;
  errorType: string;
  explanation: string;
};

/** A corrected diary entry. */
export type DiaryEntry = {
  id: string;
  date: string;
  original: string;
  corrected: string;
  corrections: DiaryCorrection[];
  errorTags: string[];
  encouragement: string;
  score: number;
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

  // Living-curriculum data
  flashcards: Flashcard[];
  captures: Capture[];
  diaryEntries: DiaryEntry[];
  errorCounts: Record<string, number>;

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
  addFlashcards: (cards: NewCard[]) => number;
  reviewFlashcardById: (id: string, quality: number) => void;

  // Capture & diary
  addCapture: (capture: Omit<Capture, 'id' | 'date'>) => void;
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id' | 'date'>) => void;

  // Weak-spot tracking
  getErrorCount: (tag: string) => number;
  incrementErrorCount: (tag: string) => void;
  decrementErrorCount: (tag: string) => void;
  getWeakAreas: () => Array<{ tag: string; count: number }>;
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

  const [errorCounts, setErrorCounts] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('german_error_counts');
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
    localStorage.setItem('german_error_counts', JSON.stringify(errorCounts));
  }, [errorCounts]);

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

  // --- Flashcards / SRS ---------------------------------------------------

  const addFlashcards = useCallback((cards: NewCard[]): number => {
    const valid = (cards || []).filter(c => c && c.german);
    if (valid.length === 0) return 0;

    const newCards: Flashcard[] = valid.map(c => createCard({
      german: c.german,
      english: c.english || '',
      source: c.source || 'manual',
      note: c.note || '',
      themeId: c.themeId || null,
      example: c.example || ''
    }));

    setFlashcards(prev => [...prev, ...newCards]);
    return newCards.length;
  }, []);

  const reviewFlashcardById = useCallback((id: string, quality: number) => {
    setFlashcards(prev => prev.map(c => (c.id === id ? reviewCard(c, quality) : c)));
  }, []);

  // --- Capture & diary ----------------------------------------------------

  const addCapture = useCallback((capture: Omit<Capture, 'id' | 'date'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newCapture: Capture = {
      id: `cap-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      date: today,
      ...capture
    };
    setCaptures(prev => [newCapture, ...prev]);

    // Seed a review card so the capture actually enters the spaced-repetition deck.
    if (capture.german) {
      const card = createCard({
        german: capture.german,
        english: capture.englishPhrase || '',
        source: 'capture',
        note: capture.grammarNote || '',
        example: capture.literal || ''
      });
      setFlashcards(prev => [...prev, card]);
    }
  }, []);

  const addDiaryEntry = useCallback((entry: Omit<DiaryEntry, 'id' | 'date'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: DiaryEntry = {
      id: `diary-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      date: today,
      ...entry
    };
    setDiaryEntries(prev => [newEntry, ...prev]);

    // Feed recurring mistakes into the weak-spot tracker.
    const tags = Array.isArray(entry.errorTags) ? entry.errorTags : [];
    if (tags.length > 0) {
      setErrorCounts(prev => {
        const next = { ...prev };
        tags.forEach(tag => { next[tag] = (next[tag] || 0) + 1; });
        return next;
      });
    }
  }, []);

  // --- Weak-spot tracking -------------------------------------------------

  const getErrorCount = useCallback((tag: string) => errorCounts[tag] || 0, [errorCounts]);

  const incrementErrorCount = useCallback((tag: string) => {
    setErrorCounts(prev => ({ ...prev, [tag]: (prev[tag] || 0) + 1 }));
  }, []);

  const decrementErrorCount = useCallback((tag: string) => {
    setErrorCounts(prev => ({ ...prev, [tag]: Math.max(0, (prev[tag] || 0) - 1) }));
  }, []);

  const getWeakAreas = useCallback(() => {
    return Object.entries(errorCounts)
      .filter(([, count]) => count > 0)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [errorCounts]);

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
    errorCounts,
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
    addCapture,
    addDiaryEntry,
    getErrorCount,
    incrementErrorCount,
    decrementErrorCount,
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
