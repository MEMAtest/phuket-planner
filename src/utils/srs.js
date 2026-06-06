/**
 * Spaced Repetition System (SRS) - SuperMemo SM-2 algorithm
 *
 * This is the "memory layer" of the German learning system. It schedules
 * when each card should be reviewed so that material is seen again right
 * before it would be forgotten - converting practice into long-term memory.
 *
 * Each card tracks:
 *  - easeFactor: how "easy" the card is (>= 1.3, starts at 2.5)
 *  - interval: days until next review
 *  - repetitions: number of consecutive successful reviews
 *  - dueDate: ISO date string for when the card is next due
 */

const MIN_EASE = 1.3;
const DEFAULT_EASE = 2.5;

/**
 * Review quality ratings mapped from the UI buttons.
 * In SM-2, quality < 3 means "failed" (reset the card).
 */
export const REVIEW_QUALITY = {
  AGAIN: 2, // Forgot it
  HARD: 3,  // Recalled with serious difficulty
  GOOD: 4,  // Recalled after some thought
  EASY: 5   // Instant recall
};

function startOfTodayISO() {
  return new Date().toISOString().split('T')[0];
}

function addDays(isoDate, days) {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

/**
 * Create a fresh SRS card. Front/back plus optional metadata.
 */
export function createCard({ german, english, source = 'manual', note = '', themeId = null, example = '' }) {
  const today = startOfTodayISO();
  return {
    id: `card-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    german: (german || '').trim(),
    english: (english || '').trim(),
    note: note || '',
    example: example || '',
    source,        // 'capture' | 'diary' | 'theme' | 'manual'
    themeId,
    created: today,
    // SM-2 scheduling state
    easeFactor: DEFAULT_EASE,
    interval: 0,
    repetitions: 0,
    dueDate: today, // due immediately so new cards show up today
    lastReviewed: null,
    totalReviews: 0,
    lapses: 0
  };
}

/**
 * Apply an SM-2 review to a card and return the UPDATED card.
 * `quality` is one of REVIEW_QUALITY (0-5).
 */
export function reviewCard(card, quality) {
  const today = startOfTodayISO();
  let { easeFactor, interval, repetitions, lapses, totalReviews } = card;

  totalReviews = (totalReviews || 0) + 1;

  if (quality < 3) {
    // Failed - reset progress, show again tomorrow
    repetitions = 0;
    interval = 1;
    lapses = (lapses || 0) + 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor (SM-2 formula)
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < MIN_EASE) easeFactor = MIN_EASE;

  return {
    ...card,
    easeFactor: Math.round(easeFactor * 100) / 100,
    interval,
    repetitions,
    lapses,
    totalReviews,
    lastReviewed: today,
    dueDate: addDays(today, interval)
  };
}

/**
 * Return all cards that are due for review (dueDate <= today).
 * Sorted so the most overdue come first, with a sensible daily cap.
 */
export function getDueCards(cards, limit = 30) {
  const today = startOfTodayISO();
  return cards
    .filter(c => c.dueDate <= today)
    .sort((a, b) => (a.dueDate < b.dueDate ? -1 : a.dueDate > b.dueDate ? 1 : 0))
    .slice(0, limit);
}

/**
 * Count how many cards are due today.
 */
export function countDue(cards) {
  const today = startOfTodayISO();
  return cards.filter(c => c.dueDate <= today).length;
}

/**
 * A card is "mastered" once it has survived to a long interval.
 */
export function isMastered(card) {
  return card.repetitions >= 3 && card.interval >= 21;
}

/**
 * Summary stats for the dashboard.
 */
export function deckStats(cards) {
  const total = cards.length;
  const due = countDue(cards);
  const mastered = cards.filter(isMastered).length;
  const learning = total - mastered;
  return { total, due, mastered, learning };
}
