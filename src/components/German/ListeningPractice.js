import React, { useState, useMemo } from 'react';
import { Icons } from '../../data/staticData';
import { useGerman } from '../../state/GermanContext';
import { isListenable } from '../../utils/srs';
import { speakGerman as speak, normalizeGermanAnswer } from '../../utils/helpers';

const hasTTS = () => 'speechSynthesis' in window;

// Fisher–Yates shuffle (non-mutating).
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const SESSION_SIZE = 10;

/**
 * Listening comprehension practice: hear a learned card's German (text
 * hidden), type what you heard or reveal and self-rate. Deliberately does
 * NOT touch SRS scheduling — the deck's intervals are calibrated for the
 * EN->DE production direction; this trains the ear as a separate skill.
 *
 * Scoring goes through one path (markRated): a typed answer that exactly
 * matches counts immediately (a dictation bonus), but anything else does NOT
 * auto-fail — the learner self-rates whether they understood it, so a single
 * mis-typed word in a long sentence can't under-report comprehension.
 */
const ListeningPractice = ({ onExit }) => {
  const { flashcards, updateStreak } = useGerman();

  // Cards the learner has already learned (shared predicate with DailyHome's
  // tile count, so the two can't drift). Frozen for the session.
  const queueIds = useMemo(() => {
    const eligible = flashcards.filter(isListenable);
    return shuffle(eligible).slice(0, SESSION_SIZE).map(c => c.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState('listen'); // 'listen' | 'reveal'
  const [exactMatch, setExactMatch] = useState(null); // null until checked; true/false after a typed check
  const [rated, setRated] = useState(false); // has this card's comprehension been recorded?
  const [gotIt, setGotIt] = useState(0);

  const card = flashcards.find(c => c.id === queueIds[index]);
  const done = index >= queueIds.length;

  // Single source of truth for scoring — both the exact-dictation fast path
  // and the self-rate buttons funnel through here, and the `rated` guard makes
  // it idempotent per card (no double-count).
  const markRated = (understood) => {
    if (rated) return;
    setRated(true);
    if (understood) setGotIt(c => c + 1);
  };

  const handleCheck = () => {
    if (phase !== 'listen' || !typed.trim()) return;
    const exact = normalizeGermanAnswer(typed) === normalizeGermanAnswer(card.german);
    setExactMatch(exact);
    setPhase('reveal');
    if (exact) markRated(true); // perfect dictation counts automatically
  };

  const handleRevealOnly = () => {
    setExactMatch(null);
    setPhase('reveal');
  };

  const handleNext = () => {
    if (index + 1 >= queueIds.length) {
      updateStreak(); // idempotent per day
    }
    setIndex(i => i + 1);
    setTyped('');
    setPhase('listen');
    setExactMatch(null);
    setRated(false);
  };

  // Browser without speech synthesis (also covers jsdom in tests, after the
  // empty-deck branch below).
  if (queueIds.length > 0 && !hasTTS()) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">🔇</div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Audio not supported here
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          This browser doesn't support speech synthesis, which listening practice needs.
          Try Chrome, Edge or Safari.
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

  // Empty state: no learned cards yet
  if (queueIds.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">🎧</div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Listening practice unlocks once you've reviewed a few cards
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Train your ear on words you already know. Review your due cards, capture a
          real-life phrase, or add theme vocabulary to your deck — then come back.
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
  if (done) {
    const pct = gotIt / queueIds.length;
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">{pct >= 0.8 ? '🎉' : pct >= 0.5 ? '👂' : '💪'}</div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Listening session complete!
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          You understood <strong>{gotIt}</strong> of <strong>{queueIds.length}</strong>.
          {pct >= 0.8
            ? ' Your ear is sharp — great work!'
            : pct >= 0.5
            ? ' Solid — replays and slower speech are your friends.'
            : ' Keep going — listening is the slowest skill to grow, and every session counts.'}
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
    // Card was somehow removed mid-session - skip
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center">
        <button onClick={handleNext} className="text-sky-600 hover:underline">Skip</button>
      </div>
    );
  }

  // Progress reflects cards completed: a card counts once it's in the reveal
  // phase, so the bar reaches 100% on the last card's reveal (and the counter
  // "{index+1} / N" tracks the current card).
  const completed = index + (phase === 'reveal' ? 1 : 0);
  const progress = (completed / queueIds.length) * 100;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onExit}
          className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-2"
        >
          <Icons.ArrowLeft className="w-4 h-4" />
          Exit listening
        </button>
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          {index + 1} / {queueIds.length}
        </span>
      </div>

      {/* Progress */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div
          className="bg-teal-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border-2 border-slate-200 dark:border-slate-700 min-h-[280px] flex flex-col items-center justify-center text-center">
        {phase === 'listen' ? (
          <>
            <div className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-4">
              Listen — what is being said?
            </div>
            <button
              onClick={() => speak(card.german)}
              className="w-20 h-20 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center shadow-lg transition-colors mb-4"
              title="Play"
              aria-label="Play audio"
            >
              <Icons.Play className="w-9 h-9" />
            </button>
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => speak(card.german)}
                className="px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Replay
              </button>
              <button
                onClick={() => speak(card.german, 0.65)}
                className="px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                🐢 Replay slower
              </button>
            </div>

            <div className="w-full max-w-sm space-y-3">
              <input
                type="text"
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                placeholder="Type what you heard… (optional)"
                className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:border-teal-500 focus:outline-none"
                aria-label="Type what you heard"
              />
              <button
                onClick={handleCheck}
                disabled={!typed.trim()}
                className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Check
              </button>
              <button
                onClick={handleRevealOnly}
                className="w-full text-sm text-sky-600 dark:text-sky-400 hover:underline"
              >
                Reveal — I'll rate myself
              </button>
            </div>
          </>
        ) : (
          <>
            {exactMatch === true && (
              <div className="w-full max-w-sm mb-4 p-3 rounded-lg border-2 bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200 text-sm" role="status">
                ✅ Exact — you heard it perfectly!
              </div>
            )}
            {exactMatch === false && (
              <div className="w-full max-w-sm mb-4 p-3 rounded-lg border-2 bg-slate-50 dark:bg-slate-700/40 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm" role="status">
                You typed: <em>{typed}</em>
              </div>
            )}

            <div className="flex items-center gap-3 mb-2">
              <div className="text-3xl font-bold text-teal-700 dark:text-teal-300">
                {card.german}
              </div>
              <button
                onClick={() => speak(card.german)}
                className="p-2 bg-teal-100 dark:bg-teal-900/30 hover:bg-teal-200 rounded-full"
                title="Listen again"
              >
                <Icons.Play className="w-5 h-5 text-teal-700 dark:text-teal-300" />
              </button>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{card.english}</p>

            {!rated ? (
              <>
                <div className="flex gap-3 mb-2">
                  <button
                    onClick={() => markRated(true)}
                    className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Got it
                  </button>
                  <button
                    onClick={() => markRated(false)}
                    className="px-5 py-2.5 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                  >
                    Missed it
                  </button>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Heard it right? Mark “Got it” — typing it exactly is just a bonus.
                </p>
              </>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-colors"
              >
                {index + 1 >= queueIds.length ? 'Finish' : 'Next'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ListeningPractice;
