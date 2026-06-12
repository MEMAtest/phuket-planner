import { normalizeGermanAnswer } from './helpers';

describe('normalizeGermanAnswer', () => {
  test('umlaut-less typing matches umlauted answers (both sides folded)', () => {
    expect(normalizeGermanAnswer('schoen')).toBe(normalizeGermanAnswer('schön'));
    expect(normalizeGermanAnswer('Ueber')).toBe(normalizeGermanAnswer('über'));
    expect(normalizeGermanAnswer('hoeren')).toBe(normalizeGermanAnswer('hören'));
  });

  test('eszett folds to ss', () => {
    expect(normalizeGermanAnswer('Straße')).toBe(normalizeGermanAnswer('strasse'));
    expect(normalizeGermanAnswer('heißt')).toBe('heisst');
  });

  test('uppercase umlauts fold via lowercase-first', () => {
    expect(normalizeGermanAnswer('ÄPFEL')).toBe('aepfel');
    expect(normalizeGermanAnswer('Öl')).toBe('oel');
  });

  test('strips trailing punctuation (including repeats), not internal', () => {
    expect(normalizeGermanAnswer('Wie geht es dir?')).toBe('wie geht es dir');
    expect(normalizeGermanAnswer('Na gut!!')).toBe('na gut');
    expect(normalizeGermanAnswer('z.B. hier')).toBe('z.b. hier');
  });

  test('collapses whitespace and trims', () => {
    expect(normalizeGermanAnswer('  ich   gehe  ')).toBe('ich gehe');
  });

  test('case-insensitive', () => {
    expect(normalizeGermanAnswer('Der Hund')).toBe(normalizeGermanAnswer('der hund'));
  });

  test('handles null/undefined/empty safely', () => {
    expect(normalizeGermanAnswer('')).toBe('');
    expect(normalizeGermanAnswer(null)).toBe('');
    expect(normalizeGermanAnswer(undefined)).toBe('');
  });

  test('does not corrupt genuine digraph words (fold is one-directional)', () => {
    // "Aerobic" contains a real 'ae' — folding must not turn it into 'ärobic'
    expect(normalizeGermanAnswer('Aerobic')).toBe('aerobic');
  });
});
