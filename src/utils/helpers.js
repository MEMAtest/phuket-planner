import { Icons } from '../data/staticData';

/**
 * Normalize a German answer for forgiving comparison:
 * trims, collapses whitespace, strips trailing punctuation, and (by default)
 * lowercases and folds umlauts/eszett so "schoen" matches "schön".
 * Fold direction is umlaut -> digraph only (the reverse would corrupt
 * genuine "ae"/"oe" words). Apply to BOTH sides of a comparison.
 *
 * The two folds are opt-OUT so drills that test exactly those distinctions
 * can stay strict: a spelling drill must NOT fold umlauts/ß (else "Strasse"
 * wrongly matches "Straße"), and a capitalization drill must NOT lowercase
 * (else "der hund" wrongly matches "der Hund").
 *
 * @param {string} text
 * @param {{ foldUmlauts?: boolean, lowercase?: boolean }} [opts]
 * @returns {string}
 */
export const normalizeGermanAnswer = (text, opts = {}) => {
  const { foldUmlauts = true, lowercase = true } = opts;
  let s = (text || '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[.,!?;]+$/g, '');
  if (lowercase) s = s.toLowerCase();
  if (foldUmlauts) {
    s = s
      .replace(/ä/g, 'ae').replace(/Ä/g, 'Ae')
      .replace(/ö/g, 'oe').replace(/Ö/g, 'Oe')
      .replace(/ü/g, 'ue').replace(/Ü/g, 'Ue')
      .replace(/ß/g, 'ss');
  }
  return s;
};

// Which drill error types must keep matching STRICT on a dimension the default
// normalizer would forgive. Declarative so adding a drill type forces an
// explicit decision (rather than silently inheriting the lenient default):
//  - spelling/plural: ß and umlauts ARE the answer (Straße≠Strasse,
//    Mutter→Mütter is an umlaut plural), so don't fold umlauts.
//  - capitalization: case IS the answer, so don't lowercase.
const STRICT_NORMALIZE_BY_TYPE = {
  spelling: { foldUmlauts: false },
  plural: { foldUmlauts: false },
  capitalization: { lowercase: false },
};

/**
 * Normalization options for matching a weak-spot drill answer of the given
 * error type. Returns undefined (= fully forgiving defaults) for types where
 * folding is safe.
 * @param {string} errorType
 * @returns {{ foldUmlauts?: boolean, lowercase?: boolean } | undefined}
 */
export const germanAnswerOptsForErrorType = (errorType) => STRICT_NORMALIZE_BY_TYPE[errorType];

/** True when the browser supports the Web Speech synthesis API. */
export const hasSpeechSynthesis = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window;

// Cache the chosen German voice once found. Voices load asynchronously, so we
// keep re-resolving (staying null) until the list is populated.
let germanVoice = null;
const resolveGermanVoice = () => {
  if (germanVoice) return germanVoice;
  const voices = window.speechSynthesis.getVoices() || [];
  germanVoice =
    voices.find(v => v.lang === 'de-DE') ||
    voices.find(v => (v.lang || '').toLowerCase().startsWith('de')) ||
    null;
  return germanVoice;
};

/**
 * Speak German text via the Web Speech API. Cancels an in-flight utterance
 * first so rapid replays/taps don't queue and overlap — but only when one is
 * actually playing/pending, to avoid the Chromium cancel()-then-speak() race
 * that can swallow the new utterance on a fresh, idle synth. Picks a de-DE
 * voice when available so German isn't read in the default (often English)
 * voice. No-op when the browser lacks speechSynthesis or text is empty.
 * @param {string} text
 * @param {number} [rate=0.9]
 */
export const speakGerman = (text, rate = 0.9) => {
  if (!hasSpeechSynthesis() || !text) return;
  const synth = window.speechSynthesis;
  if (synth.speaking || synth.pending) synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'de-DE';
  u.rate = rate;
  const voice = resolveGermanVoice();
  if (voice) u.voice = voice;
  synth.speak(u);
};

// Weather Icon Helper
export const getWeatherIcon = (summary) => {
  const s = summary.toLowerCase();
  if (s.includes("storm") || s.includes("rain")) {
    return <Icons.CloudRain className="w-6 h-6 text-blue-500" />;
  } else if (s.includes("cloud")) {
    return <Icons.Cloud className="w-6 h-6 text-slate-500" />;
  }
  return <Icons.Sun className="w-6 h-6 text-amber-500" />;
};

// Activity Type Icon Helper
export const getTypeIcon = (type, props = { className: "w-5 h-5" }) => {
  const iconMap = {
    travel: <Icons.Plane {...props} />,
    eat: <Icons.Utensils {...props} />,
    nap: <Icons.Clock {...props} />,
    indoor: <Icons.FerrisWheel {...props} />,
    outdoor: <Icons.Sun {...props} />,
    mixed: <Icons.FerrisWheel {...props} />
  };
  return iconMap[type] || <Icons.FerrisWheel {...props} />;
};

// Activity Type Color Helper
export const getTypeColor = (type) => {
  const colorMap = {
    travel: 'bg-sky-100 text-sky-800',
    eat: 'bg-rose-100 text-rose-800',
    nap: 'bg-amber-100 text-amber-800',
    indoor: 'bg-indigo-100 text-indigo-800',
    outdoor: 'bg-emerald-100 text-emerald-800',
    mixed: 'bg-cyan-100 text-cyan-800'
  };
  return colorMap[type] || 'bg-slate-100 text-slate-800';
};

// Format Date
export const formatDate = (dateString, format = 'long') => {
  const date = new Date(dateString);
  if (format === 'short') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
};

// Check if date is today
export const isToday = (dateString) => {
  const today = new Date();
  const date = new Date(dateString);
  return date.toDateString() === today.toDateString();
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Currency converter
export const convertCurrency = (amount, from, rate = 45.5) => {
  if (from === 'GBP') {
    return parseFloat((amount * rate).toFixed(2));
  }
  return parseFloat((amount / rate).toFixed(2));
};

// Get weather-based recommendations
export const getWeatherRecommendations = (summary) => {
  const isRainy = summary.toLowerCase().includes('rain') || 
                  summary.toLowerCase().includes('storm');
  
  if (isRainy) {
    return {
      icon: <Icons.AlertTriangle className="w-4 h-4 text-amber-500"/>,
      message: "Indoor activities recommended today",
      suggestions: [
        "Visit a local aquarium or science museum",
        "Explore a nearby mall or indoor market", 
        "Book a family cooking class",
        "Spend extra time at the kids club",
        "Schedule a spa or wellness session"
      ]
    };
  }
  return {
    icon: <Icons.Sun className="w-4 h-4 text-green-500"/>,
    message: "Great day for outdoor activities!",
    suggestions: [
      "Beach time",
      "Island hopping",
      "Snorkeling",
      "National park visit",
      "Outdoor dining"
    ]
  };
};
