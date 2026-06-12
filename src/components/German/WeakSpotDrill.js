import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Icons } from '../../data/staticData';
import { generateGrammarDrill, isGroqConfigured, getGroqSetupInstructions } from '../../utils/groqAI';
import { useGerman } from '../../state/GermanContext';
import { normalizeGermanAnswer } from '../../utils/helpers';

const ERROR_LABELS = {
  case: 'Cases (der/den/dem)',
  'word-order': 'Word order',
  'verb-conjugation': 'Verb conjugation',
  'gender-article': 'Gender / articles',
  preposition: 'Prepositions',
  spelling: 'Spelling',
  vocabulary: 'Vocabulary',
  tense: 'Tenses',
  plural: 'Plurals',
  capitalization: 'Capitalization',
  other: 'Mixed'
};

const STORAGE_KEY_PREFIX = 'german_drill_';
const STORAGE_VERSION = 1; // For future schema migrations
const DRILL_TTL_DAYS = 7; // Clear drills older than 7 days
const MAX_FLAGGED_QUESTIONS = 100; // Prevent unbounded growth

// Detect if on mobile/touch device
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || (window.matchMedia && window.matchMedia('(max-width: 768px)').matches);
};

const WeakSpotDrill = ({ errorType, onBack }) => {
  const { decrementErrorCount, incrementErrorCount, getErrorCount, getCurrentLevel } = useGerman();
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState(null);
  const [drill, setDrill] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0, weighted: 0 });
  const [hasDecremented, setHasDecremented] = useState(false);
  const [initialErrorCount, setInitialErrorCount] = useState(0);
  const [showRuleReminder, setShowRuleReminder] = useState(false);
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [liveRegionMessage, setLiveRegionMessage] = useState('');

  const nextButtonRef = useRef(null);
  const isMounted = useRef(true);
  const isMobile = useRef(isMobileDevice());

  // Drill at the learner's real level. 'B1+' isn't a CEFR band the model
  // knows, so cap the prompt level at B1.
  const rawLevel = getCurrentLevel();
  const drillLevel = rawLevel === 'B1+' ? 'B1' : rawLevel;

  // Cleanup old drills on mount
  useEffect(() => {
    cleanupOldDrills();
  }, []);

  // Cleanup function for component unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const cleanupOldDrills = () => {
    try {
      const now = Date.now();
      const ttlMs = DRILL_TTL_DAYS * 24 * 60 * 60 * 1000;

      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(STORAGE_KEY_PREFIX)) {
          const data = localStorage.getItem(key);
          if (data) {
            try {
              const parsed = JSON.parse(data);
              if (parsed.timestamp && (now - parsed.timestamp) > ttlMs) {
                localStorage.removeItem(key);
              }
            } catch (e) {
              // Malformed data - remove it
              localStorage.removeItem(key);
            }
          }
        }
      });
    } catch (e) {
      console.warn('Failed to cleanup old drills:', e);
    }
  };

  const validateDrillState = (state) => {
    if (!state || typeof state !== 'object') return false;
    if (!state.drill || !Array.isArray(state.drill.exercises)) return false;
    if (typeof state.currentIndex !== 'number' || state.currentIndex < 0) return false;
    if (state.currentIndex > state.drill.exercises.length) return false;
    if (!state.score || typeof state.score.correct !== 'number') return false;
    if (state.score.correct > state.score.total) return false;
    if (state.score.total > state.drill.exercises.length) return false;
    if (state.score.weighted < 0 || !isFinite(state.score.weighted)) return false;
    return true;
  };

  // Load persisted state on mount
  useEffect(() => {
    const storageKey = `${STORAGE_KEY_PREFIX}${errorType}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const state = JSON.parse(saved);

        // Validate version and structure
        if (state.version === STORAGE_VERSION && validateDrillState(state)) {
          setDrill(state.drill);
          setCurrentIndex(state.currentIndex || 0);
          setScore(state.score || { correct: 0, total: 0, weighted: 0 });
          setHasDecremented(state.hasDecremented || false);
          setLoading(false);
          return;
        } else {
          console.warn('Persisted drill state invalid or outdated, generating fresh');
          localStorage.removeItem(storageKey);
        }
      } catch (e) {
        console.warn('Failed to restore drill state:', e);
        localStorage.removeItem(storageKey);
      }
    }

    // Validate errorType
    const validTypes = ['case', 'word-order', 'verb-conjugation', 'gender-article',
                        'preposition', 'spelling', 'vocabulary', 'tense', 'plural',
                        'capitalization', 'other'];
    if (!errorType || !validTypes.includes(errorType)) {
      setError('invalid-error-type');
      setLoading(false);
      return;
    }

    if (!isGroqConfigured()) {
      setError('groq-not-configured');
      setLoading(false);
      return;
    }

    // Capture initial error count
    setInitialErrorCount(getErrorCount(errorType));

    const fetchDrill = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await generateGrammarDrill({
          errorType,
          level: drillLevel,
          count: 5
        });
        if (!isMounted.current) return;

        if (!result.exercises || result.exercises.length === 0) {
          setError('no-exercises');
        } else {
          setDrill(result);
        }
      } catch (err) {
        console.error('Error generating drill:', err);
        if (isMounted.current) {
          setError('fetch-failed');
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchDrill();
  }, [errorType, getErrorCount, drillLevel]);

  // Persist state on changes
  useEffect(() => {
    if (drill && !error && !loading) {
      const storageKey = `${STORAGE_KEY_PREFIX}${errorType}`;
      const state = {
        version: STORAGE_VERSION,
        timestamp: Date.now(),
        drill,
        currentIndex,
        score,
        hasDecremented
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          console.error('localStorage quota exceeded - cleaning up old drills');
          cleanupOldDrills();
          try {
            localStorage.setItem(storageKey, JSON.stringify(state));
          } catch (e2) {
            console.error('Still failed after cleanup:', e2);
          }
        } else {
          console.error('Failed to persist drill state:', e);
        }
      }
    }
  }, [drill, currentIndex, score, hasDecremented, errorType, error, loading]);

  // Clear persisted state
  const clearPersistedState = useCallback(() => {
    const storageKey = `${STORAGE_KEY_PREFIX}${errorType}`;
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.warn('Failed to clear persisted state:', e);
    }
  }, [errorType]);

  const handleSubmit = () => {
    // Fix #4: Guard against spam clicks and already-showing feedback
    if (!userAnswer.trim() || showFeedback) return;

    const exercise = drill.exercises[currentIndex];
    // Accept the primary answer plus any AI-supplied valid variants.
    // (Older persisted drills have no acceptableAnswers — guard with [].)
    const candidates = [exercise.correctAnswer, ...(exercise.acceptableAnswers || [])];
    const normalized = normalizeGermanAnswer(userAnswer);
    const match = candidates.some(c => normalizeGermanAnswer(c) === normalized);
    setIsCorrect(match);
    setShowFeedback(true);

    // Update live region for screen readers
    setLiveRegionMessage(match ? 'Correct! Well done.' : 'Not quite. Review the correct answer below.');

    // Weighted scoring
    const difficultyWeight = 1 + (currentIndex * 0.2);
    const weightedPoints = match ? difficultyWeight : 0;

    setScore(prev => ({
      correct: prev.correct + (match ? 1 : 0),
      total: prev.total + 1,
      weighted: prev.weighted + weightedPoints
    }));
  };

  const handleNext = useCallback(() => {
    setUserAnswer('');
    setShowFeedback(false);
    setIsCorrect(false);
    setShowRuleReminder(false);
    setLiveRegionMessage('');

    // Advance to the next exercise, or one past the last to trigger completion.
    if (currentIndex < drill.exercises.length) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, drill]);

  // Keyboard shortcuts with fixes #8, #12
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Fix #8: Ignore repeated keypresses (held keys)
      if (e.repeat) return;

      // Don't interfere if user is typing in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (showFeedback && (e.key === 'Enter' || e.key === ' ')) {
        // Fix #12: Only prevent Space default if Next button has focus or there's no scrollable content
        if (e.key === ' ') {
          // Allow scrolling if user hasn't focused the Next button
          const nextButton = nextButtonRef.current;
          if (document.activeElement !== nextButton) {
            return; // Let Space scroll the page
          }
        }
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFeedback, handleNext]);

  // Focus management - Fix #2, #14
  useEffect(() => {
    if (showFeedback && nextButtonRef.current) {
      // Use setTimeout to ensure button is fully rendered
      setTimeout(() => {
        if (nextButtonRef.current && isMounted.current) {
          nextButtonRef.current.focus();
        }
      }, 50);
    }
  }, [showFeedback]);

  // Fix #1: Proper restart logic
  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswer('');
    setShowFeedback(false);
    setIsCorrect(false);
    setScore({ correct: 0, total: 0, weighted: 0 });
    setShowRuleReminder(false);
    setLiveRegionMessage('');
    // Fix: Reset flags for new completion
    setHasDecremented(false);
    setInitialErrorCount(getErrorCount(errorType));
  };

  // Skip with accessible modal - Fix #6, #8
  const handleSkipConfirm = () => {
    decrementErrorCount(errorType);
    clearPersistedState();
    setShowSkipModal(false);
    onBack();
  };

  // Fix #6: Flag question with deduplication and limits
  const handleFlagQuestion = () => {
    const exercise = drill.exercises[currentIndex];
    const flagged = {
      errorType,
      exerciseId: `${errorType}-${currentIndex}`,
      question: exercise.question,
      correctAnswer: exercise.correctAnswer,
      timestamp: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('german_flagged_questions') || '[]');

      // Deduplication: Check if already flagged
      const isDuplicate = existing.some(f =>
        f.exerciseId === flagged.exerciseId &&
        f.question === flagged.question
      );

      if (isDuplicate) {
        setLiveRegionMessage('This question was already flagged.');
        return;
      }

      // Limit: Keep only most recent MAX_FLAGGED_QUESTIONS
      const updated = [flagged, ...existing].slice(0, MAX_FLAGGED_QUESTIONS);
      localStorage.setItem('german_flagged_questions', JSON.stringify(updated));
      setLiveRegionMessage('Question flagged for review. Thank you!');
    } catch (e) {
      console.error('Failed to flag question:', e);
      setLiveRegionMessage('Failed to flag question. Please try again.');
    }
  };

  // Completion logic with fixes #1, #2, #10
  useEffect(() => {
    if (drill && currentIndex >= drill.exercises.length && score.total > 0 && !hasDecremented) {
      // Fix #2: Guard against division by zero
      const maxWeightedScore = drill.exercises.reduce((sum, _, i) => sum + (1 + i * 0.2), 0);
      if (maxWeightedScore === 0) {
        console.error('maxWeightedScore is 0 - cannot calculate percentage');
        return;
      }

      const weightedPercentage = (score.weighted / maxWeightedScore) * 100;

      // Fix #10: Increment on failure, decrement on success
      if (weightedPercentage < 60) {
        incrementErrorCount(errorType);
      } else {
        decrementErrorCount(errorType);
      }
      setHasDecremented(true);

      // Clear live region
      setLiveRegionMessage('');
    }
  }, [currentIndex, drill, score, hasDecremented, decrementErrorCount, incrementErrorCount, errorType]);

  // Retry with proper cleanup - Fix #3, #7
  const handleRetry = async () => {
    setRetrying(true);
    setError(null);
    try {
      const result = await generateGrammarDrill({
        errorType,
        level: drillLevel,
        count: 5
      });
      if (!isMounted.current) return;

      if (!result.exercises || result.exercises.length === 0) {
        setError('no-exercises');
      } else {
        setDrill(result);
        setCurrentIndex(0);
        setScore({ correct: 0, total: 0, weighted: 0 });
        setHasDecremented(false);
        setInitialErrorCount(getErrorCount(errorType));
      }
    } catch (err) {
      console.error('Error generating drill:', err);
      if (isMounted.current) {
        setError('fetch-failed');
      }
    } finally {
      if (isMounted.current) {
        setRetrying(false);
      }
    }
  };

  // Loading state
  if (loading && !retrying) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg text-center">
            {/* Fix #13: Accessible loading state */}
            <div role="status" aria-live="polite">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4" aria-hidden="true"></div>
              <p className="text-slate-600 dark:text-slate-400">
                Generating custom exercises for {ERROR_LABELS[errorType]}...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error === 'groq-not-configured') {
    const instructions = getGroqSetupInstructions();
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:underline mb-4"
          >
            <Icons.ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              {instructions.title}
            </h2>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {instructions.steps.map((step, i) => (
                <p key={i} className="font-mono">{step}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error === 'invalid-error-type') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:underline mb-4"
          >
            <Icons.ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg text-center">
            <Icons.AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Invalid error type. This drill cannot be loaded.
            </p>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
            >
              Back to Daily Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:underline mb-4"
          >
            <Icons.ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg text-center">
            <Icons.AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {error === 'no-exercises'
                ? 'Could not generate exercises. Please try again.'
                : 'Failed to load drill. Check your internet connection.'}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRetry}
                disabled={retrying}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 flex items-center gap-2"
              >
                {retrying && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" aria-hidden="true"></div>}
                {retrying ? 'Retrying...' : 'Retry'}
              </button>
              <button
                onClick={onBack}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!drill) return null;

  // Fix #3: Validate currentIndex is in bounds
  if (currentIndex > drill.exercises.length) {
    console.error('currentIndex out of bounds, resetting');
    setCurrentIndex(drill.exercises.length);
    return null;
  }

  const isComplete = currentIndex >= drill.exercises.length;
  const exercise = !isComplete && currentIndex < drill.exercises.length ? drill.exercises[currentIndex] : null;

  // Fix #1: Progress shows completed, not current
  const completedCount = score.total;
  const progressPercentage = isComplete ? 100 : (completedCount / drill.exercises.length) * 100;

  // Fix #2: Guard against division by zero
  const maxWeightedScore = drill.exercises.reduce((sum, _, i) => sum + (1 + i * 0.2), 0);
  const weightedPercentage = maxWeightedScore > 0 && score.total > 0
    ? Math.round((score.weighted / maxWeightedScore) * 100)
    : 0;
  const simplePercentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  // Fix #3: Show error count delta
  const currentErrorCount = getErrorCount(errorType);
  const delta = currentErrorCount - initialErrorCount;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
      <div className="max-w-2xl mx-auto pt-8 pb-12">
        {/* Fix #7: aria-live region for screen reader announcements */}
        <div
          role="status"
          aria-live="assertive"
          aria-atomic="true"
          className="sr-only"
        >
          {liveRegionMessage}
        </div>

        {/* Header */}
        <button
          onClick={() => {
            clearPersistedState();
            onBack();
          }}
          className="flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:underline mb-4"
        >
          <Icons.ArrowLeft className="w-4 h-4" />
          Back to Daily Home
        </button>

        {/* Skip Modal - Fix #6: Accessible modal */}
        {showSkipModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            role="dialog"
            aria-labelledby="skip-modal-title"
            aria-modal="true"
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md mx-4 shadow-xl">
              <h3 id="skip-modal-title" className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
                Skip This Drill?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Mark {ERROR_LABELS[errorType]} as reviewed and reduce error count without completing the drill?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowSkipModal(false)}
                  className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
                  autoFocus
                >
                  Cancel
                </button>
                <button
                  onClick={handleSkipConfirm}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Skip Drill
                </button>
              </div>
            </div>
          </div>
        )}

        {!isComplete && exercise ? (
          <>
            {/* Progress */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {drill.title}
                </h2>
                <div className="flex items-center gap-3">
                  {/* Fix #16: Accessible progress label */}
                  <span
                    className="text-sm text-slate-500 dark:text-slate-400"
                    aria-label={`${completedCount} of ${drill.exercises.length} questions completed`}
                  >
                    {completedCount} / {drill.exercises.length} completed
                  </span>
                  {/* Fix #8: Skip button accessible, disabled after answers started */}
                  <button
                    onClick={() => setShowSkipModal(true)}
                    disabled={score.total > 0}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 underline disabled:opacity-50 disabled:cursor-not-allowed"
                    title={score.total > 0 ? "Can't skip after answering questions" : "Already know this? Skip and mark as reviewed"}
                  >
                    Skip
                  </button>
                </div>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                  role="progressbar"
                  aria-valuenow={progressPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Drill progress"
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                {drill.explanation}
              </p>
            </div>

            {/* Exercise */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full mb-2">
                    {exercise.scenario}
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{exercise.prompt}</p>
                </div>
                {/* Fix #10: Accessible flag button */}
                <button
                  onClick={handleFlagQuestion}
                  className="ml-2 p-2 text-slate-400 hover:text-red-500 transition-colors"
                  aria-label="Flag this question as incorrect or confusing"
                >
                  <Icons.Flag className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mb-4">
                <p className="text-lg font-medium text-slate-800 dark:text-slate-100">
                  {exercise.question}
                </p>
              </div>

              {!showFeedback ? (
                <>
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="Type your answer here..."
                    className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:border-amber-500 focus:outline-none mb-4"
                    autoFocus
                    aria-label="Your answer"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!userAnswer.trim()}
                    className="w-full py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Check Answer
                  </button>
                </>
              ) : (
                <>
                  {/* Fix #7: Feedback with aria-live */}
                  <div
                    className={`p-4 rounded-lg mb-4 ${
                      isCorrect
                        ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
                        : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500'
                    }`}
                    role="alert"
                    aria-live="assertive"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {isCorrect ? (
                        <Icons.Check className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                      ) : (
                        <Icons.X className="w-6 h-6 text-red-600 dark:text-red-400" aria-hidden="true" />
                      )}
                      <span className={`font-bold ${
                        isCorrect
                          ? 'text-green-800 dark:text-green-200'
                          : 'text-red-800 dark:text-red-200'
                      }`}>
                        {isCorrect ? 'Correct!' : 'Not quite'}
                      </span>
                    </div>

                    {!isCorrect && (
                      <div className="mb-2">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Your answer:</p>
                        <p className="font-medium text-slate-800 dark:text-slate-100">{userAnswer}</p>
                      </div>
                    )}

                    <div className="mb-2">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Correct answer:</p>
                      <p className="font-medium text-slate-800 dark:text-slate-100">{exercise.correctAnswer}</p>
                      {!isCorrect && exercise.acceptableAnswers?.length > 0 && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Also accepted: {exercise.acceptableAnswers.join(' · ')}
                        </p>
                      )}
                    </div>

                    <div className="mb-2">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Explanation:</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{exercise.explanation}</p>
                    </div>

                    {!isCorrect && exercise.commonMistake && (
                      <div className="mb-2">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Common mistake:</p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{exercise.commonMistake}</p>
                      </div>
                    )}

                    {/* Fix #5: Rule reminder */}
                    <button
                      onClick={() => setShowRuleReminder(!showRuleReminder)}
                      className="text-sm text-sky-600 dark:text-sky-400 hover:underline mt-2"
                      aria-expanded={showRuleReminder}
                    >
                      {showRuleReminder ? '▼' : '▶'} Review the rule
                    </button>
                    {showRuleReminder && (
                      <div className="mt-2 p-3 bg-sky-50 dark:bg-sky-900/20 rounded border-l-4 border-sky-500">
                        <p className="text-sm text-sky-900 dark:text-sky-200">{drill.explanation}</p>
                      </div>
                    )}
                  </div>

                  <button
                    ref={nextButtonRef}
                    onClick={handleNext}
                    className="w-full py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-all"
                  >
                    {currentIndex < drill.exercises.length - 1
                      ? `Next Exercise${isMobile.current ? '' : ' (Enter ↵)'}`
                      : `Finish Drill${isMobile.current ? '' : ' (Enter ↵)'}`}
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          /* Completion Screen */
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg text-center">
            <div className="text-6xl mb-4" role="img" aria-label={weightedPercentage >= 80 ? 'Celebration' : weightedPercentage >= 60 ? 'Thumbs up' : 'Keep going'}>
              {weightedPercentage >= 80 ? '🎉' : weightedPercentage >= 60 ? '👍' : '💪'}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              {weightedPercentage >= 80 ? 'Excellent work!' : weightedPercentage >= 60 ? 'Good effort!' : 'Keep practicing!'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              You got {score.correct} out of {score.total} correct ({simplePercentage}%)
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Weighted score: {weightedPercentage}% (harder questions count more)
            </p>

            {weightedPercentage >= 60 ? (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4 mb-6">
                <p className="text-green-800 dark:text-green-200 font-medium mb-2">
                  Great progress! Your {ERROR_LABELS[errorType]} errors have been reduced.
                </p>
                {/* Fix #3: Show delta */}
                <p className="text-sm text-green-700 dark:text-green-300">
                  {ERROR_LABELS[errorType]}: {initialErrorCount} → {currentErrorCount} ({delta >= 0 ? '+' : ''}{delta})
                </p>
              </div>
            ) : (
              <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500 rounded-lg p-4 mb-6">
                <p className="text-amber-800 dark:text-amber-200 mb-2">
                  Keep practicing {ERROR_LABELS[errorType]} — this area needs more work!
                </p>
                {/* Fix #10: Show increment on failure */}
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {ERROR_LABELS[errorType]}: {initialErrorCount} → {currentErrorCount} ({delta >= 0 ? '+' : ''}{delta})
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleRestart}
                className="flex-1 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-all"
              >
                Practice Again
              </button>
              <button
                onClick={() => {
                  clearPersistedState();
                  onBack();
                }}
                className="flex-1 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-all"
              >
                Back to Daily Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeakSpotDrill;
