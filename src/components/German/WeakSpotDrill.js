import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Icons } from '../../data/staticData';
import { generateGrammarDrill, isGroqConfigured, getGroqSetupInstructions } from '../../utils/groqAI';
import { useGerman } from '../../state/GermanContext';

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

const WeakSpotDrill = ({ errorType, onBack }) => {
  const { decrementErrorCount, incrementErrorCount, getErrorCount } = useGerman();
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
  const setFlaggedQuestions = useState([])[1]; // Only setter needed for flag feature
  const [showRuleReminder, setShowRuleReminder] = useState(false);
  const [initialErrorCount, setInitialErrorCount] = useState(0);
  const nextButtonRef = useRef(null);

  // Load persisted state on mount
  useEffect(() => {
    const storageKey = `${STORAGE_KEY_PREFIX}${errorType}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const state = JSON.parse(saved);
        setDrill(state.drill);
        setCurrentIndex(state.currentIndex || 0);
        setScore(state.score || { correct: 0, total: 0, weighted: 0 });
        setHasDecremented(state.hasDecremented || false);
        setLoading(false);
        return;
      } catch (e) {
        console.warn('Failed to restore drill state:', e);
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
          level: 'A2',
          count: 5
        });
        if (!result.exercises || result.exercises.length === 0) {
          setError('no-exercises');
        } else {
          setDrill(result);
        }
      } catch (err) {
        console.error('Error generating drill:', err);
        setError('fetch-failed');
      } finally {
        setLoading(false);
      }
    };

    fetchDrill();
  }, [errorType, getErrorCount]);

  // Persist state on changes (Issue #2: Persistence)
  useEffect(() => {
    if (drill && !error) {
      const storageKey = `${STORAGE_KEY_PREFIX}${errorType}`;
      const state = {
        drill,
        currentIndex,
        score,
        hasDecremented
      };
      localStorage.setItem(storageKey, JSON.stringify(state));
    }
  }, [drill, currentIndex, score, hasDecremented, errorType, error]);

  // Clear persisted state on completion
  const clearPersistedState = () => {
    const storageKey = `${STORAGE_KEY_PREFIX}${errorType}`;
    localStorage.removeItem(storageKey);
  };

  const normalizeAnswer = (text) => {
    return text
      .trim()
      .replace(/\s+/g, ' ')  // normalize multiple spaces
      .replace(/[.,!?;]$/g, '') // only remove trailing punctuation
      .toLowerCase();  // case-insensitive, but ß/ss remains distinct
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const exercise = drill.exercises[currentIndex];
    const normalized = normalizeAnswer(userAnswer);
    const correct = normalizeAnswer(exercise.correctAnswer);

    const match = normalized === correct;
    setIsCorrect(match);
    setShowFeedback(true);

    // Issue #9: Weight by difficulty - later questions worth more
    const difficultyWeight = 1 + (currentIndex * 0.2); // 1.0, 1.2, 1.4, 1.6, 1.8
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

    if (currentIndex < drill.exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    // Note: Completion logic moved to useEffect to avoid race condition
  }, [currentIndex, drill]);

  // Issue #4: Keyboard shortcut for Next button
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showFeedback && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFeedback, handleNext]);

  // Focus Next button when feedback appears for accessibility
  useEffect(() => {
    if (showFeedback && nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
  }, [showFeedback]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswer('');
    setShowFeedback(false);
    setIsCorrect(false);
    setScore({ correct: 0, total: 0, weighted: 0 });
    // Note: hasDecremented stays true - don't decrement again on restart
  };

  // Issue #8: Skip drill option
  const handleSkip = () => {
    if (window.confirm(`Mark ${ERROR_LABELS[errorType]} as reviewed and reduce error count without completing drill?`)) {
      decrementErrorCount(errorType);
      clearPersistedState();
      onBack();
    }
  };

  // Issue #6: Flag bad questions
  const handleFlagQuestion = () => {
    const exercise = drill.exercises[currentIndex];
    const flagged = {
      errorType,
      exerciseId: currentIndex,
      question: exercise.question,
      correctAnswer: exercise.correctAnswer,
      timestamp: new Date().toISOString()
    };
    setFlaggedQuestions(prev => [...prev, flagged]);

    // Store flagged questions for later review
    const existing = JSON.parse(localStorage.getItem('german_flagged_questions') || '[]');
    existing.push(flagged);
    localStorage.setItem('german_flagged_questions', JSON.stringify(existing));

    alert('Question flagged for review. Thank you for the feedback!');
  };

  // Check completion and apply increment/decrement (avoids race condition)
  useEffect(() => {
    if (drill && currentIndex >= drill.exercises.length && score.total > 0 && !hasDecremented) {
      const maxWeightedScore = drill.exercises.reduce((sum, _, i) => sum + (1 + i * 0.2), 0);
      const weightedPercentage = (score.weighted / maxWeightedScore) * 100;

      // Issue #10: Increment on failure
      if (weightedPercentage < 60) {
        incrementErrorCount(errorType);
      } else {
        decrementErrorCount(errorType);
      }
      setHasDecremented(true);
    }
  }, [currentIndex, drill, score, hasDecremented, decrementErrorCount, incrementErrorCount, errorType]);

  // Issue #7: Retry with loading state
  const handleRetry = async () => {
    setRetrying(true);
    setError(null);
    try {
      const result = await generateGrammarDrill({
        errorType,
        level: 'A2',
        count: 5
      });
      if (!result.exercises || result.exercises.length === 0) {
        setError('no-exercises');
      } else {
        setDrill(result);
        setCurrentIndex(0);
        setScore({ correct: 0, total: 0, weighted: 0 });
        setHasDecremented(false);
      }
    } catch (err) {
      console.error('Error generating drill:', err);
      setError('fetch-failed');
    } finally {
      setRetrying(false);
    }
  };

  if (loading && !retrying) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">
              Generating custom exercises for {ERROR_LABELS[errorType]}...
            </p>
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
                {retrying && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
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

  const isComplete = currentIndex >= drill.exercises.length;
  const exercise = !isComplete ? drill.exercises[currentIndex] : null;

  // Issue #1: Progress bar shows completed, not current
  const completedCount = score.total;
  const progressPercentage = isComplete ? 100 : (completedCount / drill.exercises.length) * 100;

  // Calculate final percentage with weighted score
  const maxWeightedScore = drill.exercises.reduce((sum, _, i) => sum + (1 + i * 0.2), 0);
  const weightedPercentage = score.total > 0 ? Math.round((score.weighted / maxWeightedScore) * 100) : 0;
  const simplePercentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  // Issue #3: Show error count delta
  const currentErrorCount = getErrorCount(errorType);
  const delta = currentErrorCount - initialErrorCount;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
      <div className="max-w-2xl mx-auto pt-8 pb-12">
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

        {!isComplete ? (
          <>
            {/* Progress */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {drill.title}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {completedCount} / {drill.exercises.length} completed
                  </span>
                  {/* Issue #8: Skip option */}
                  <button
                    onClick={handleSkip}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 underline"
                    title="Already know this? Skip and mark as reviewed"
                  >
                    Skip
                  </button>
                </div>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
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
                {/* Issue #6: Flag question button */}
                <button
                  onClick={handleFlagQuestion}
                  className="ml-2 p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Flag this question as incorrect or confusing"
                >
                  <Icons.Flag className="w-4 h-4" />
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
                  {/* Feedback */}
                  <div className={`p-4 rounded-lg mb-4 ${
                    isCorrect
                      ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
                      : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {isCorrect ? (
                        <Icons.Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                      ) : (
                        <Icons.X className="w-6 h-6 text-red-600 dark:text-red-400" />
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

                    {/* Issue #5: Rule reminder */}
                    <button
                      onClick={() => setShowRuleReminder(!showRuleReminder)}
                      className="text-sm text-sky-600 dark:text-sky-400 hover:underline mt-2"
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
                    {currentIndex < drill.exercises.length - 1 ? 'Next Exercise (Enter ↵)' : 'Finish Drill (Enter ↵)'}
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          /* Completion Screen */
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg text-center">
            <div className="text-6xl mb-4">
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

            {weightedPercentage >= 60 && delta !== 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4 mb-6">
                <p className="text-green-800 dark:text-green-200 font-medium mb-2">
                  Great progress! Your {ERROR_LABELS[errorType]} errors have been reduced.
                </p>
                {/* Issue #3: Show delta */}
                <p className="text-sm text-green-700 dark:text-green-300">
                  {ERROR_LABELS[errorType]}: {initialErrorCount} → {currentErrorCount} ({delta > 0 ? '+' : ''}{delta})
                </p>
              </div>
            )}

            {weightedPercentage < 60 && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500 rounded-lg p-4 mb-6">
                <p className="text-amber-800 dark:text-amber-200 mb-2">
                  Keep practicing {ERROR_LABELS[errorType]} — this area needs more work!
                </p>
                {/* Issue #10: Show increment */}
                {delta !== 0 && (
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {ERROR_LABELS[errorType]}: {initialErrorCount} → {currentErrorCount} ({delta > 0 ? '+' : ''}{delta})
                  </p>
                )}
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
