/**
 * Render smoke test: proves the German living-curriculum screens mount inside
 * GermanProvider without crashing. This is the regression guard for the bug
 * where DailyHome and friends referenced context/AI APIs that didn't exist.
 *
 * Uses react-dom directly (no @testing-library dependency).
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';

// Opt into React 18's concurrent act() environment to silence act warnings.
global.IS_REACT_ACT_ENVIRONMENT = true;
import { GermanProvider } from '../../state/GermanContext';
import GermanLearning from './index';

let container;
let root;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = ReactDOM.createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  container = null;
  localStorage.clear();
});

const mount = () => {
  act(() => {
    root.render(
      <GermanProvider>
        <GermanLearning />
      </GermanProvider>
    );
  });
};

// Find a clickable element whose text matches, and click it.
const clickText = (regex) => {
  const el = Array.from(container.querySelectorAll('button, a')).find((node) =>
    regex.test(node.textContent || '')
  );
  if (!el) throw new Error(`No clickable element matching ${regex}`);
  act(() => {
    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
};

test('Daily Home (default view) renders without crashing', () => {
  mount();
  expect(container.textContent).toMatch(/Today's Plan/i);
  expect(container.textContent).toMatch(/day streak/i);
});

test('navigates into Review, Capture and Diary tools without crashing', () => {
  mount();

  // Reviews tile -> SpacedReview (empty deck -> "Nothing due right now!")
  clickText(/Reviews all caught up|Review \d+ card/i);
  expect(container.textContent).toMatch(/Nothing due right now/i);
  clickText(/Back to Today/i);

  // Capture tile -> PhraseCapture
  clickText(/Heard something you couldn't say/i);
  expect(container.textContent).toMatch(/How do I say/i);
  clickText(/Back to Today/i);

  // Diary tile -> GermanDiary
  clickText(/Write your German diary/i);
  expect(container.textContent).toMatch(/German Diary/i);
});

test('Progress & placement opens the dashboard and returns home', () => {
  mount();
  clickText(/Progress & placement/i);
  expect(container.textContent).toMatch(/Your path to conversational fluency/i);
  clickText(/Back to Today/i);
  expect(container.textContent).toMatch(/Today's Plan/i);
});

test('Listening practice opens and shows empty state on an empty deck', () => {
  mount();
  clickText(/Listening practice/i);
  expect(container.textContent).toMatch(/Listening practice unlocks once you've reviewed a few cards/i);
  clickText(/Back to Today/i);
  expect(container.textContent).toMatch(/Today's Plan/i);
});

test('Theme lesson renders offline (no Groq) with base content', () => {
  mount();
  // DailyHome's next-theme tile reads "Learn: <title>"
  clickText(/Learn:/i);
  expect(container.textContent).toMatch(/What you'll learn/i);
  // No enrichment banner without an API key
  expect(container.textContent).not.toMatch(/Generating personalised lesson content/i);
  // Step to vocabulary, then grammar — both must render via the fallback path
  clickText(/^\s*Next\s*$/);
  expect(container.textContent).toMatch(/Key Phrases & Vocabulary/i);
  clickText(/^\s*Next\s*$/);
  expect(container.textContent).toMatch(/Grammar Focus/i);
});
