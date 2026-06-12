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

describe('normalizeGermanAnswer options', () => {
  test('foldUmlauts:false keeps umlaut/ß spellings distinct (for spelling drills)', () => {
    // The whole point of a spelling drill: "Strasse" must NOT pass as "Straße".
    expect(normalizeGermanAnswer('Straße', { foldUmlauts: false }))
      .not.toBe(normalizeGermanAnswer('Strasse', { foldUmlauts: false }));
    expect(normalizeGermanAnswer('schön', { foldUmlauts: false }))
      .not.toBe(normalizeGermanAnswer('schoen', { foldUmlauts: false }));
    // ...but the correct spelling still matches itself (case/punctuation forgiven)
    expect(normalizeGermanAnswer('Straße', { foldUmlauts: false }))
      .toBe(normalizeGermanAnswer('straße.', { foldUmlauts: false }));
  });

  test('lowercase:false keeps capitalization distinct (for capitalization drills)', () => {
    expect(normalizeGermanAnswer('der Hund', { lowercase: false }))
      .not.toBe(normalizeGermanAnswer('der hund', { lowercase: false }));
    expect(normalizeGermanAnswer('Das Mädchen', { lowercase: false }))
      .toBe(normalizeGermanAnswer('Das Mädchen', { lowercase: false }));
  });

  test('defaults remain fully forgiving (both folds on)', () => {
    expect(normalizeGermanAnswer('Straße')).toBe('strasse');
    expect(normalizeGermanAnswer('der Hund')).toBe('der hund');
  });
});
