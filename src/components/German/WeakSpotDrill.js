import React, { useState, useEffect } from 'react';
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

const WeakSpotDrill = ({ errorType, onBack }) => {
  const { decrementErrorCount } = useGerman();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drill, setDrill] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [hasDecremented, setHasDecremented] = useState(false);

  useEffect(() => {
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
  }, [errorType]);

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
    setScore(prev => ({
      correct: prev.correct + (match ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const handleNext = () => {
    setUserAnswer('');
    setShowFeedback(false);
    setIsCorrect(false);

    if (currentIndex < drill.exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    // Note: Completion logic moved to useEffect to avoid race condition
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswer('');
    setShowFeedback(false);
    setIsCorrect(false);
    setScore({ correct: 0, total: 0 });
    // Note: hasDecremented stays true - don't decrement again on restart
  };

  // Check completion and apply decrement (avoids race condition)
  useEffect(() => {
    if (drill && currentIndex >= drill.exercises.length && score.total > 0 && !hasDecremented) {
      const percentage = (score.correct / score.total) * 100;
      if (percentage >= 60) {
        decrementErrorCount(errorType);
        setHasDecremented(true);
      }
    }
  }, [currentIndex, drill, score, hasDecremented, decrementErrorCount, errorType]);

  if (loading) {
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

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Re-trigger the useEffect by creating a new component mount
    window.location.reload();
  };

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
                disabled={loading}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
              >
                {loading ? 'Retrying...' : 'Retry'}
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
  const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
      <div className="max-w-2xl mx-auto pt-8 pb-12">
        {/* Header */}
        <button
          onClick={onBack}
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
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {currentIndex + 1} / {drill.exercises.length}
                </span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / drill.exercises.length) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                {drill.explanation}
              </p>
            </div>

            {/* Exercise */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full mb-2">
                  {exercise.scenario}
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{exercise.prompt}</p>
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
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Common mistake:</p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{exercise.commonMistake}</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-all"
                  >
                    {currentIndex < drill.exercises.length - 1 ? 'Next Exercise' : 'Finish Drill'}
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          /* Completion Screen */
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg text-center">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              {percentage >= 80 ? 'Excellent work!' : percentage >= 60 ? 'Good effort!' : 'Keep practicing!'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              You got {score.correct} out of {score.total} correct ({percentage}%)
            </p>

            {percentage >= 60 && (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4 mb-6">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  Great progress! Your {ERROR_LABELS[errorType]} error count has been reduced.
                </p>
              </div>
            )}

            {percentage < 60 && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500 rounded-lg p-4 mb-6">
                <p className="text-amber-800 dark:text-amber-200">
                  Keep practicing {ERROR_LABELS[errorType]} — consistency is key!
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
                onClick={onBack}
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
