import { cefrForAI, getCurrentLevel } from './germanThemes';

describe('cefrForAI', () => {
  test('maps the internal B1+ progress label to the B1 CEFR band', () => {
    expect(cefrForAI('B1+')).toBe('B1');
  });

  test('passes real CEFR bands through unchanged', () => {
    ['A1', 'A2', 'B1'].forEach(level => expect(cefrForAI(level)).toBe(level));
  });
});

describe('getCurrentLevel', () => {
  test('only reaches B1+ after all 36 core themes are completed', () => {
    expect(getCurrentLevel(new Array(35).fill('x'))).toBe('B1');
    expect(getCurrentLevel(new Array(36).fill('x'))).toBe('B1+');
  });

  test('band thresholds', () => {
    expect(getCurrentLevel([])).toBe('A1');
    expect(getCurrentLevel(new Array(12).fill('x'))).toBe('A2');
    expect(getCurrentLevel(new Array(24).fill('x'))).toBe('B1');
  });
});
