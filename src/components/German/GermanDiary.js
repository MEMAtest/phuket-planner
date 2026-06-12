import React, { useState, useRef } from 'react';
import { Icons } from '../../data/staticData';
import { useGerman } from '../../state/GermanContext';
import { correctGermanText, isGroqConfigured } from '../../utils/groqAI';
import { speakGerman as speak } from '../../utils/helpers';
import { cefrForAI } from '../../data/germanThemes';

// Rotating prompts grounded in the learner's real family life
const PROMPTS = [
  'Was hast du heute mit der Familie gemacht?',
  'Beschreibe dein Frühstück heute Morgen.',
  'Was war das Beste an deinem Tag?',
  'Was möchtest du am Wochenende machen?',
  'Erzähle von einem Gespräch mit deiner Frau heute.',
  'Was haben die Kinder heute gemacht?',
  'Was hat dich heute geärgert oder gefreut?',
  'Was musst du morgen erledigen?'
];

const ERROR_LABELS = {
  case: 'Case (Fall)',
  'word-order': 'Word order',
  'verb-conjugation': 'Verb conjugation',
  'gender-article': 'Gender / article',
  preposition: 'Preposition',
  spelling: 'Spelling',
  vocabulary: 'Vocabulary',
  tense: 'Tense',
  plural: 'Plural',
  capitalization: 'Capitalization',
  other: 'Other'
};

const GermanDiary = ({ onExit }) => {
  const { addDiaryEntry, addFlashcards, diaryEntries, getCurrentLevel } = useGerman();

  const [text, setText] = useState('');
  const [prompt] = useState(() => PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const level = cefrForAI(getCurrentLevel());

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setError('Voice input not supported here. Please type your entry.');
      return;
    }
    const rec = new SR();
    rec.lang = 'de-DE';
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (e) => {
      setText(prev => (prev ? prev + ' ' : '') + e.results[0][0].transcript);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  };

  const handleCheck = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setSaved(false);
    setFeedback(null);
    try {
      const r = await correctGermanText({ text: text.trim(), level });
      setFeedback(r);
    } catch (err) {
      console.error(err);
      setError('Could not reach the AI tutor. Check your connection and Groq API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!feedback) return;
    addDiaryEntry({
      original: text.trim(),
      corrected: feedback.corrected,
      corrections: feedback.corrections,
      errorTags: feedback.errorTags,
      encouragement: feedback.encouragement,
      score: feedback.score
    });
    setSaved(true);
  };

  const handleSaveCorrectionsToDeck = () => {
    if (!feedback || !feedback.corrections.length) return;
    const cards = feedback.corrections
      .filter(c => c.fixed)
      .map(c => ({
        german: c.fixed,
        english: c.explanation || 'correction from your diary',
        source: 'diary',
        note: c.explanation
      }));
    const added = addFlashcards(cards);
    alert(`Added ${added} correction${added === 1 ? '' : 's'} to your review deck.`);
  };

  const reset = () => {
    setText('');
    setFeedback(null);
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
        {diaryEntries.length > 0 && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {diaryEntries.length} entries · keep the streak
          </span>
        )}
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border-2 border-indigo-200 dark:border-indigo-800">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
          ✍️ German Diary
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
          Write a few sentences in German about your day. The tutor corrects you and tracks
          your recurring mistakes so practice gets targeted.
        </p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 flex items-center justify-between gap-2">
          <span className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">💭 {prompt}</span>
          <button onClick={() => speak(prompt)} className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full shrink-0">
            <Icons.Play className="w-4 h-4 text-indigo-700 dark:text-indigo-300" />
          </button>
        </div>
      </div>

      {!isGroqConfigured() && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-300">
          ⚠️ AI tutor needs a Groq API key configured to give corrections.
        </div>
      )}

      {/* Writing area */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Your entry (auf Deutsch)
          </label>
          <button
            onClick={startVoice}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors flex items-center gap-1 ${
              listening
                ? 'bg-red-600 border-red-600 text-white animate-pulse'
                : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Icons.Mic className="w-4 h-4" />
            {listening ? 'Listening…' : 'Speak'}
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Heute habe ich…"
          className="w-full h-32 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 resize-none"
        />
        <button
          onClick={handleCheck}
          disabled={!text.trim() || loading}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Icons.Loader className="w-5 h-5 animate-spin" />
              Checking my German…
            </>
          ) : (
            <>
              <Icons.CheckSquare className="w-5 h-5" />
              Check my German
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-300">
          ⚠️ {error}
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg space-y-4 border-2 border-indigo-200 dark:border-indigo-800">
          {/* Score + encouragement */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{feedback.score}/10</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">today</span>
            </div>
            {feedback.errorTags.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-end">
                {feedback.errorTags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full">
                    {ERROR_LABELS[tag] || tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {feedback.encouragement && (
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-3 text-sm text-green-800 dark:text-green-200">
              🌟 {feedback.encouragement}
            </div>
          )}

          {/* Corrected version */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs uppercase tracking-wide text-slate-400">Natural German</div>
              <button onClick={() => speak(feedback.corrected)} className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                <Icons.Play className="w-4 h-4 text-indigo-700 dark:text-indigo-300" />
              </button>
            </div>
            <p className="text-base text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
              {feedback.corrected}
            </p>
          </div>

          {/* Corrections */}
          {feedback.corrections.length > 0 ? (
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wide text-slate-400">What changed</div>
              {feedback.corrections.map((c, i) => (
                <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm mb-1 flex-wrap">
                    <span className="line-through text-red-500 dark:text-red-400">{c.original}</span>
                    <Icons.ChevronRight className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-green-600 dark:text-green-400">{c.fixed}</span>
                    {c.errorType && (
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full">
                        {ERROR_LABELS[c.errorType] || c.errorType}
                      </span>
                    )}
                  </div>
                  {c.explanation && (
                    <p className="text-xs text-slate-600 dark:text-slate-400">{c.explanation}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-green-600 dark:text-green-400 font-semibold py-2">
              🎯 No mistakes — perfekt!
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            {saved ? (
              <div className="flex-1 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg font-semibold text-center min-w-[150px]">
                ✅ Saved {feedback.errorTags.length > 0 && '· weak areas updated'}
              </div>
            ) : (
              <button
                onClick={handleSave}
                className="flex-1 min-w-[150px] py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-colors"
              >
                Save entry
              </button>
            )}
            {feedback.corrections.length > 0 && (
              <button
                onClick={handleSaveCorrectionsToDeck}
                className="px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                + Corrections to deck
              </button>
            )}
            <button
              onClick={reset}
              className="px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              New entry
            </button>
          </div>
        </div>
      )}

      {/* Past entries */}
      {diaryEntries.length > 0 && !feedback && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg">
          <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Past entries</h4>
          <div className="space-y-2">
            {diaryEntries.slice(0, 5).map(e => (
              <div key={e.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">{e.date}</span>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{e.score}/10</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">{e.corrected}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GermanDiary;
