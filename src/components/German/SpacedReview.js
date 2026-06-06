import React, { useState, useMemo } from 'react';
import { Icons } from '../../data/staticData';
import { useGerman } from '../../state/GermanContext';
import { getDueCards, REVIEW_QUALITY } from '../../utils/srs';

const speak = (text) => {
  if ('speechSynthesis' in window && text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }
};

const RATINGS = [
  { label: 'Again', quality: REVIEW_QUALITY.AGAIN, color: 'bg-red-600 hover:bg-red-700', hint: 'Forgot' },
  { label: 'Hard', quality: REVIEW_QUALITY.HARD, color: 'bg-amber-600 hover:bg-amber-700', hint: 'Tough' },
  { label: 'Good', quality: REVIEW_QUALITY.GOOD, color: 'bg-sky-600 hover:bg-sky-700', hint: 'Got it' },
  { label: 'Easy', quality: REVIEW_QUALITY.EASY, color: 'bg-green-600 hover:bg-green-700', hint: 'Instant' }
];

const SpacedReview = ({ onExit }) => {
  const { flashcards, reviewFlashcardById, updateStreak } = useGerman();

  // Freeze the due queue for this session so re-scheduled cards don't reappear
  const initialQueue = useMemo(() => getDueCards(flashcards, 30).map(c => c.id), []); // eslint-disable-line react-hooks/exhaustive-deps

  const [queue] = useState(initialQueue);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  const currentId = queue[index];
  const card = flashcards.find(c => c.id === currentId);

  const handleRate = (quality) => {
    if (!card) return;
    reviewFlashcardById(card.id, quality);
    setReviewedCount(c => c + 1);
    if (index === 0) updateStreak();

    if (index < queue.length - 1) {
      setIndex(index + 1);
      setFlipped(false);
    } else {
      setIndex(queue.length); // triggers done state
    }
  };

  // Empty deck / no cards due
  if (queue.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Nothing due right now!
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Your review deck is all caught up. Capture a real-life phrase or write a diary
          entry to add new cards.
        </p>
        <button
          onClick={onExit}
          className="px-6 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-colors"
        >
          Back to Today
        </button>
      </div>
    );
  }

  // Session complete
  if (index >= queue.length) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Review complete!
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          You reviewed <strong>{reviewedCount}</strong> {reviewedCount === 1 ? 'card' : 'cards'}.
          They'll come back at just the right time to stick.
        </p>
        <button
          onClick={onExit}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Done
        </button>
      </div>
    );
  }

  if (!card) {
    // Card was somehow removed - skip
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center">
        <button onClick={onExit} className="text-sky-600 hover:underline">Back</button>
      </div>
    );
  }

  const progress = (index / queue.length) * 100;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onExit}
          className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-2"
        >
          <Icons.ArrowLeft className="w-4 h-4" />
          Exit review
        </button>
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          {index + 1} / {queue.length}
        </span>
      </div>

      {/* Progress */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div
          className="bg-sky-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Card */}
      <div
        onClick={() => !flipped && setFlipped(true)}
        className={`bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border-2 min-h-[280px] flex flex-col items-center justify-center text-center transition-all ${
          flipped ? 'border-sky-300 dark:border-sky-700' : 'border-slate-200 dark:border-slate-700 cursor-pointer hover:border-sky-400'
        }`}
      >
        {!flipped ? (
          <>
            <div className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3">
              What's the German for…
            </div>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              {card.english || '(no prompt — tap to see)'}
            </div>
            <div className="text-sm text-slate-400 dark:text-slate-500">
              👆 Tap to reveal
            </div>
          </>
        ) : (
          <>
            <div className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-2">
              {card.english}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl font-bold text-sky-700 dark:text-sky-300">
                {card.german}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); speak(card.german); }}
                className="p-2 bg-sky-100 dark:bg-sky-900/30 hover:bg-sky-200 dark:hover:bg-sky-900/50 rounded-full"
                title="Listen"
              >
                <Icons.Play className="w-5 h-5 text-sky-700 dark:text-sky-300" />
              </button>
            </div>
            {card.example && (
              <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-2">
                "{card.example}"
              </p>
            )}
            {card.note && (
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
                💡 {card.note}
              </p>
            )}
            <span className="mt-3 text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-600">
              from {card.source}
            </span>
          </>
        )}
      </div>

      {/* Rating buttons (only after flip) */}
      {flipped ? (
        <div className="grid grid-cols-4 gap-2">
          {RATINGS.map(r => (
            <button
              key={r.label}
              onClick={() => handleRate(r.quality)}
              className={`${r.color} text-white py-3 rounded-lg font-semibold transition-colors flex flex-col items-center`}
            >
              <span>{r.label}</span>
              <span className="text-[10px] opacity-80">{r.hint}</span>
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setFlipped(true)}
          className="w-full py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          Show Answer
        </button>
      )}
    </div>
  );
};

export default SpacedReview;
