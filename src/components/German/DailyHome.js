import React from 'react';
import { Icons } from '../../data/staticData';
import { useGerman } from '../../state/GermanContext';
import { deckStats, isListenable } from '../../utils/srs';
import { hasSpeechSynthesis } from '../../utils/helpers';

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

const greeting = () => {
  const h = new Date().getHours();
  if (h < 11) return { text: 'Guten Morgen', emoji: '🌅' };
  if (h < 17) return { text: 'Guten Tag', emoji: '☀️' };
  return { text: 'Guten Abend', emoji: '🌙' };
};

const todayLabel = () =>
  new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

const DailyHome = ({ onReview, onCapture, onDiary, onStartTheme, onBrowse, onDrillWeakSpot, onListening }) => {
  const {
    streak,
    flashcards,
    diaryEntries,
    captures,
    getNextTheme,
    getWeakAreas
  } = useGerman();

  const { total, due, mastered } = deckStats(flashcards);
  const nextTheme = getNextTheme();
  const weakAreas = getWeakAreas().slice(0, 3);
  const g = greeting();
  const listenable = flashcards.filter(isListenable).length;
  const audioSupported = hasSpeechSynthesis();

  const today = new Date().toISOString().split('T')[0];
  const journaledToday = diaryEntries.some(e => e.date === today);

  return (
    <div className="space-y-5">
      {/* Greeting */}
      <div className="bg-gradient-to-br from-sky-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {g.emoji} {g.text}!
            </h2>
            <p className="text-sky-100 mt-1 text-sm">{todayLabel()}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{streak} 🔥</div>
            <div className="text-xs text-sky-100">day streak</div>
          </div>
        </div>
        <p className="mt-4 text-sky-50 text-sm">
          Your 15-minute plan: review what's due, learn something new, and put it to use.
        </p>
      </div>

      {/* Today's plan */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
          Today's Plan
        </h3>
        <div className="space-y-3">
          {/* 1. Reviews */}
          <button
            onClick={onReview}
            className="w-full text-left bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border-2 border-transparent hover:border-sky-400 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center shrink-0">
              <Icons.Repeat className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800 dark:text-slate-100">
                {due > 0 ? `Review ${due} card${due === 1 ? '' : 's'}` : 'Reviews all caught up'}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {due > 0 ? 'Lock in what you’ve learned before it fades' : 'Nice — nothing due right now'}
              </div>
            </div>
            {due > 0 && (
              <span className="bg-sky-600 text-white text-sm font-bold px-3 py-1 rounded-full shrink-0">{due}</span>
            )}
          </button>

          {/* 2. New lesson */}
          <button
            onClick={() => (nextTheme ? onStartTheme(nextTheme.id) : onBrowse())}
            className="w-full text-left bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border-2 border-transparent hover:border-purple-400 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
              <Icons.BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800 dark:text-slate-100">
                {nextTheme ? `Learn: ${nextTheme.title}` : 'Browse all themes'}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {nextTheme ? `${nextTheme.level} · ${nextTheme.estimatedTime} min · new vocabulary` : 'Pick any theme to practise'}
              </div>
            </div>
            <Icons.ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          </button>

          {/* 3. Diary */}
          <button
            onClick={onDiary}
            className="w-full text-left bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border-2 border-transparent hover:border-indigo-400 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
              <Icons.Edit className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800 dark:text-slate-100">
                {journaledToday ? 'Diary done today ✓' : 'Write your German diary'}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {journaledToday ? 'Come back tomorrow — or write another' : 'A few sentences about your day, corrected for you'}
              </div>
            </div>
            <Icons.ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          </button>

          {/* 4. Listening */}
          <button
            onClick={onListening}
            className="w-full text-left bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border-2 border-transparent hover:border-teal-400 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center shrink-0">
              <Icons.Headphones className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800 dark:text-slate-100">
                Listening practice
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {!audioSupported
                  ? 'Needs a browser with audio support'
                  : listenable > 0
                  ? `Train your ear with ${listenable} learned card${listenable === 1 ? '' : 's'}`
                  : 'Unlocks after your first reviews'}
              </div>
            </div>
            <Icons.ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          </button>
        </div>
      </div>

      {/* Capture - always-available real-life shortcut */}
      <button
        onClick={onCapture}
        className="w-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-2xl">💬</div>
        <div className="flex-1 text-left">
          <div className="font-bold">Heard something you couldn't say?</div>
          <div className="text-sm text-emerald-50">Capture it now — I'll teach you and save it to your deck</div>
        </div>
        <Icons.ChevronRight className="w-5 h-5 shrink-0" />
      </button>

      {/* Weak areas */}
      {weakAreas.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
            <Icons.AlertTriangle className="w-4 h-4 text-amber-500" />
            Your weak spots
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Mined from your diary corrections — focus here for the fastest gains.
          </p>
          <div className="space-y-2">
            {weakAreas.map(({ tag, count }) => (
              <button
                key={tag}
                onClick={() => onDrillWeakSpot(tag)}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 border-2 border-transparent hover:border-amber-400 transition-all"
              >
                <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  {ERROR_LABELS[tag] || tag}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-600 dark:text-amber-400">{count} {count === 1 ? 'slip' : 'slips'}</span>
                  <Icons.ChevronRight className="w-4 h-4 text-amber-500" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Deck snapshot */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow text-center">
          <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">{total}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">cards in deck</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{mastered}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">mastered</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow text-center">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{captures.length}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">captured</div>
        </div>
      </div>

      {/* Browse all */}
      <button
        onClick={onBrowse}
        className="w-full py-3 text-sky-600 dark:text-sky-400 font-semibold hover:underline"
      >
        Browse all themes & tools →
      </button>
    </div>
  );
};

export default DailyHome;
