import { clampScore } from './groqAI';

describe('clampScore', () => {
  test('preserves a legitimate 0 (the bug the fix targets)', () => {
    expect(clampScore(0)).toBe(0);
    expect(clampScore('0')).toBe(0);
  });

  test('absent / null / non-numeric falls back to neutral 5', () => {
    expect(clampScore(null)).toBe(5);       // Number(null) is 0 — must be handled explicitly
    expect(clampScore(undefined)).toBe(5);
    expect(clampScore('not a number')).toBe(5);
    expect(clampScore(NaN)).toBe(5);
  });

  test('clamps into the 0-10 range', () => {
    expect(clampScore(15)).toBe(10);
    expect(clampScore(-3)).toBe(0);
    expect(clampScore(7)).toBe(7);
    expect(clampScore('8')).toBe(8);
  });
});
