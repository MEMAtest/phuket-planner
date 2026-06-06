import React, { useState, useRef } from 'react';
import { Icons } from '../../data/staticData';
import { useGerman } from '../../state/GermanContext';
import { translateAndTeach, isGroqConfigured } from '../../utils/groqAI';

const speak = (text) => {
  if ('speechSynthesis' in window && text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }
};

const PhraseCapture = ({ onExit }) => {
  const { addCapture, captures, getCurrentLevel } = useGerman();

  const [englishPhrase, setEnglishPhrase] = useState('');
  const [context, setContext] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  const level = getCurrentLevel();

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setError('Voice input not supported in this browser. Just type instead.');
      return;
    }
    const rec = new SR();
    rec.lang = 'en-GB'; // they describe the situation in English
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (e) => {
      setEnglishPhrase(prev => (prev ? prev + ' ' : '') + e.results[0][0].transcript);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  };

  const handleTeach = async () => {
    if (!englishPhrase.trim()) return;
    setLoading(true);
    setError(null);
    setSaved(false);
    setResult(null);
    try {
      const r = await translateAndTeach({
        englishPhrase: englishPhrase.trim(),
        level,
        context: context.trim()
      });
      setResult(r);
      speak(r.german);
    } catch (err) {
      console.error(err);
      setError('Could not reach the AI tutor. Check your connection and Groq API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!result) return;
    addCapture({
      englishPhrase: englishPhrase.trim(),
      german: result.german,
      literal: result.literal,
      breakdown: result.breakdown,
      grammarNote: result.grammarNote,
      formality: result.formality,
      context: context.trim()
    });
    setSaved(true);
  };

  const reset = () => {
    setEnglishPhrase('');
    setContext('');
    setResult(null);
    setError(null);
    setSaved(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onExit}
          className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-2"
        >
          <Icons.ArrowLeft className="w-4 h-4" />
          Back to Today
        </button>
        {captures.length > 0 && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {captures.length} captured so far
          </span>
        )}
      </div>

      {/* Intro */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border-2 border-emerald-200 dark:border-emerald-800">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
          💬 How do I say…?
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Stuck in a real moment? Type what you wanted to say. The tutor gives you the natural
          German and saves it to your review deck so it sticks.
        </p>
      </div>

      {!isGroqConfigured() && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-300">
          ⚠️ AI tutor needs a Groq API key configured to work.
        </div>
      )}

      {/* Input */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg space-y-3">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          What did you want to say? (in English)
        </label>
        <div className="flex gap-2">
          <textarea
            value={englishPhrase}
            onChange={(e) => setEnglishPhrase(e.target.value)}
            placeholder="e.g. Can you pick up the kids from school tomorrow?"
            className="flex-1 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 resize-none h-20"
          />
          <button
            onClick={startVoice}
            className={`px-3 rounded-lg border transition-colors ${
              listening
                ? 'bg-red-600 border-red-600 text-white animate-pulse'
                : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
            title="Speak in English"
          >
            <Icons.Mic className="w-5 h-5" />
          </button>
        </div>

        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Situation <span className="font-normal text-slate-400">(optional — helps tone)</span>
        </label>
        <input
          type="text"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g. talking to my wife / at the Kita / formal email"
          className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500"
        />

        <button
          onClick={handleTeach}
          disabled={!englishPhrase.trim() || loading}
          className="w-full py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Icons.Loader className="w-5 h-5 animate-spin" />
              Teaching me…
            </>
          ) : (
            <>
              <Icons.Search className="w-5 h-5" />
              Teach me the German
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-300">
          ⚠️ {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg space-y-4 border-2 border-emerald-200 dark:border-emerald-800">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-400 mb-1">Say this</div>
              <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                {result.german}
              </div>
            </div>
            <button
              onClick={() => speak(result.german)}
              className="p-2 bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 rounded-full shrink-0"
              title="Listen"
            >
              <Icons.Play className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
            </button>
          </div>

          {result.literal && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Literally: <em>{result.literal}</em>
            </p>
          )}

          {result.breakdown && result.breakdown.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">Breakdown</div>
              <ul className="space-y-1">
                {result.breakdown.map((b, i) => (
                  <li key={i} className="text-sm text-slate-700 dark:text-slate-300">• {b}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2 text-xs">
            {result.formality && (
              <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-full">
                {result.formality}
              </span>
            )}
          </div>

          {result.grammarNote && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-3 text-sm text-amber-800 dark:text-amber-200">
              💡 {result.grammarNote}
            </div>
          )}

          {result.alternatives && result.alternatives.length > 0 && (
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-semibold">Also natural: </span>
              {result.alternatives.join(' · ')}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            {saved ? (
              <div className="flex-1 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg font-semibold text-center">
                ✅ Saved to your review deck
              </div>
            ) : (
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-colors flex items-center justify-center gap-2"
              >
                <Icons.Plus className="w-5 h-5" />
                Add to review deck
              </button>
            )}
            <button
              onClick={reset}
              className="px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Ask another
            </button>
          </div>
        </div>
      )}

      {/* Recent captures */}
      {captures.length > 0 && !result && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg">
          <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Recently captured</h4>
          <div className="space-y-2">
            {captures.slice(0, 5).map(c => (
              <div key={c.id} className="flex items-center justify-between gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{c.german}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{c.englishPhrase}</div>
                </div>
                <button
                  onClick={() => speak(c.german)}
                  className="p-1.5 bg-sky-100 dark:bg-sky-900/30 rounded-full shrink-0"
                >
                  <Icons.Play className="w-4 h-4 text-sky-700 dark:text-sky-300" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhraseCapture;
