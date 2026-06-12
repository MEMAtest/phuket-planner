/**
 * Groq AI integration for German language learning
 * Uses Groq's fast inference API with free tier
 */

// Get API key from environment variable or settings
// User needs to add REACT_APP_GROQ_API_KEY to .env file
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || '';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile'; // 70B param model, very capable

// Grammar error categories shared across the diary/drill features
const VALID_ERROR_TAGS = [
  'case', 'word-order', 'verb-conjugation', 'gender-article', 'preposition',
  'spelling', 'vocabulary', 'tense', 'plural', 'capitalization', 'other'
];

// --- Shared helpers -------------------------------------------------------

const asArray = (v) => (Array.isArray(v) ? v : []);
const asString = (v, fallback = '') => (typeof v === 'string' ? v : fallback);

/**
 * Pull the first complete JSON object or array out of an AI response,
 * tolerating any prose the model adds around it.
 */
function extractJson(text) {
  const firstObj = text.indexOf('{');
  const firstArr = text.indexOf('[');
  let start;
  if (firstObj === -1 && firstArr === -1) throw new Error('No JSON found in AI response');
  if (firstObj === -1) start = firstArr;
  else if (firstArr === -1) start = firstObj;
  else start = Math.min(firstObj, firstArr);

  const close = text[start] === '{' ? '}' : ']';
  const end = text.lastIndexOf(close);
  if (end <= start) throw new Error('No JSON found in AI response');

  return JSON.parse(text.slice(start, end + 1));
}

/**
 * Single-turn Groq chat completion. Returns the raw assistant text.
 */
async function callGroq({ system, user, temperature = 0.3, maxTokens = 1200 }) {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key not configured. Please add REACT_APP_GROQ_API_KEY to your .env file.');
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      temperature,
      max_tokens: maxTokens
    })
  });

  if (!response.ok) {
    let errorMessage = response.statusText;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error?.message || errorMessage;
    } catch (parseError) {
      console.warn('Non-JSON error response from Groq API');
    }
    throw new Error(`Groq API error (${response.status}): ${errorMessage}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Review German speech and provide detailed feedback
 */
export async function reviewGermanSpeech({
  spokenText,
  context,
  prompt,
  expectedPattern,
  themeTitle
}) {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key not configured. Please add REACT_APP_GROQ_API_KEY to your .env file.');
  }

  const systemPrompt = `You are an expert German language tutor. Your role is to review spoken German and provide constructive, encouraging feedback.

Review criteria:
1. Grammar: Correct verb conjugation, word order, article usage
2. Intelligibility: you only see a speech-recognizer TRANSCRIPT, not audio. Judge how cleanly the recognizer understood the learner (garbled words, missing endings, non-words suggest unclear speech). Do NOT claim to analyze actual pronunciation.
3. Fluency: Natural flow, appropriate connecting words
4. Cultural appropriateness: Is this how native speakers would actually say it?

Be encouraging but honest. Focus on helping the learner improve.`;

  const userPrompt = `Theme: ${themeTitle}
Context: ${context}
Task: ${prompt}
Expected pattern: ${expectedPattern}

Student said: "${spokenText}"

Please review this German speech and provide feedback in JSON format:
{
  "grammarScore": <0-10>,
  "pronunciationScore": <0-10, intelligibility: how clearly the recognizer understood the speech>,
  "fluencyScore": <0-10>,
  "overallScore": <0-10>,
  "corrections": [<list of grammar/word choice errors>],
  "betterAlternatives": [<more natural ways to say the same thing>],
  "suggestions": [<general tips for improvement>]
}

Be specific in corrections. If everything is perfect, say so! If there are issues, explain them clearly.`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3, // Lower temperature for more consistent feedback
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      let errorMessage = response.statusText;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || errorMessage;
      } catch (parseError) {
        // Error response wasn't JSON, use status text
        console.warn('Non-JSON error response from Groq API');
      }
      throw new Error(`Groq API error (${response.status}): ${errorMessage}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Parse JSON response
    try {
      // Extract JSON from response (in case AI adds extra text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in AI response');
      }

      const feedback = JSON.parse(jsonMatch[0]);

      // Validate and ensure all fields exist
      return {
        grammarScore: feedback.grammarScore || 5,
        pronunciationScore: feedback.pronunciationScore || 5,
        fluencyScore: feedback.fluencyScore || 5,
        overallScore: feedback.overallScore || 5,
        corrections: feedback.corrections || [],
        betterAlternatives: feedback.betterAlternatives || [],
        suggestions: feedback.suggestions || []
      };
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.log('Raw response:', aiResponse);

      // Fallback: provide basic feedback
      return {
        grammarScore: 7,
        pronunciationScore: 7,
        fluencyScore: 7,
        overallScore: 7,
        corrections: [],
        betterAlternatives: [],
        suggestions: ['AI feedback parsing failed. Your response was recorded. Try again or continue to the next exercise.']
      };
    }
  } catch (error) {
    console.error('Groq API error:', error);
    throw error;
  }
}

/**
 * Generate a German conversation response (for conversation mode)
 */
export async function generateConversationResponse({
  conversationHistory,
  userMessage,
  context,
  difficulty
}) {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key not configured');
  }

  const systemPrompt = `You are a friendly German conversation partner. Have a natural conversation in German.

Difficulty level: ${difficulty}
Context: ${context}

Rules:
- Respond ONLY in German
- Keep responses conversational and natural
- Match the difficulty level (A1 = simple, B1 = complex)
- If the user makes errors, respond naturally but model the correct form
- Keep responses short (1-3 sentences)`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory,
    { role: 'user', content: userMessage }
  ];

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.7, // Higher for more natural conversation
        max_tokens: 200
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Groq API error:', error);
    throw error;
  }
}

/**
 * Generate a targeted grammar drill for a specific weak spot.
 * Returns { title, explanation, exercises: [...] }.
 */
export async function generateGrammarDrill({ errorType, level = 'A2', count = 5 }) {
  const system = `You are an expert German tutor creating targeted grammar drills. Always respond with valid JSON only, no extra prose.`;
  const user = `Create a ${count}-question German grammar drill for a learner at CEFR level ${level} who struggles with: "${errorType}".

Each question should be a short fill-in-the-blank or correction task grounded in everyday family / daily-life situations. Return JSON in exactly this shape:
{
  "title": "<short drill title>",
  "explanation": "<1-2 sentence reminder of the rule being practised>",
  "exercises": [
    {
      "scenario": "<2-4 word tag, e.g. 'At the Kita'>",
      "prompt": "<short instruction, e.g. 'Fill in the correct article'>",
      "question": "<the sentence with a ___ blank, or the sentence to correct>",
      "correctAnswer": "<the single best answer>",
      "acceptableAnswers": ["<other fully valid answers: word-order variants, contractions (e.g. 'in dem'/'im'), synonyms that fit the blank; empty array if none>"],
      "explanation": "<why this is correct>",
      "commonMistake": "<the typical wrong answer and why it's wrong>"
    }
  ]
}
Provide exactly ${count} exercises. Keep answers short so they can be typed exactly.
Do NOT include the correctAnswer itself in acceptableAnswers, and never include wrong answers there.`;

  const raw = await callGroq({ system, user, temperature: 0.4, maxTokens: 2000 });
  const parsed = extractJson(raw);

  const exercises = asArray(parsed.exercises)
    .map((e) => ({
      scenario: asString(e.scenario, 'Practice'),
      prompt: asString(e.prompt, 'Complete the sentence'),
      question: asString(e.question),
      correctAnswer: asString(e.correctAnswer),
      acceptableAnswers: asArray(e.acceptableAnswers).map((a) => asString(a)).filter(Boolean),
      explanation: asString(e.explanation),
      commonMistake: asString(e.commonMistake)
    }))
    .filter((e) => e.question && e.correctAnswer);

  return {
    title: asString(parsed.title, `${errorType} drill`),
    explanation: asString(parsed.explanation),
    exercises
  };
}

/**
 * Translate an English phrase into natural German and teach it.
 * Returns { german, literal, breakdown, grammarNote, formality, alternatives }.
 */
export async function translateAndTeach({ englishPhrase, level = 'A2', context = '' }) {
  const system = `You are a warm, practical German tutor. Always respond with valid JSON only.`;
  const user = `A learner at CEFR level ${level} wants to say this in natural German:
"${englishPhrase}"
${context ? `Situation / tone: ${context}` : ''}

Return JSON in exactly this shape:
{
  "german": "<the natural German sentence>",
  "literal": "<word-for-word literal English of the German, to reveal structure>",
  "breakdown": ["<chunk -> meaning>", "..."],
  "grammarNote": "<one key grammar point worth noticing>",
  "formality": "<informal | formal | neutral>",
  "alternatives": ["<other natural ways to say it>"]
}`;

  const raw = await callGroq({ system, user, temperature: 0.4, maxTokens: 800 });
  const parsed = extractJson(raw);
  if (!parsed.german) throw new Error('AI response missing German translation');

  return {
    german: asString(parsed.german),
    literal: asString(parsed.literal),
    breakdown: asArray(parsed.breakdown).map((b) => asString(b)).filter(Boolean),
    grammarNote: asString(parsed.grammarNote),
    formality: asString(parsed.formality),
    alternatives: asArray(parsed.alternatives).map((a) => asString(a)).filter(Boolean)
  };
}

/**
 * Correct a German diary entry and tag the recurring mistakes.
 * Returns { corrected, corrections, errorTags, encouragement, score }.
 */
export async function correctGermanText({ text, level = 'A2' }) {
  const system = `You are an encouraging German writing tutor. Always respond with valid JSON only.`;
  const user = `A learner at CEFR level ${level} wrote this German diary entry:
"${text}"

Correct it into natural German and explain the changes. Use ONLY these errorType tags: ${VALID_ERROR_TAGS.join(', ')}.

Return JSON in exactly this shape:
{
  "corrected": "<the fully corrected, natural German>",
  "corrections": [
    { "original": "<the learner's phrase>", "fixed": "<the corrected phrase>", "errorType": "<one tag>", "explanation": "<short why>" }
  ],
  "errorTags": ["<distinct tags from the corrections>"],
  "encouragement": "<one warm sentence of encouragement>",
  "score": <integer 0-10 for the original entry>
}
If the entry is already correct, return an empty corrections array and a high score.`;

  const raw = await callGroq({ system, user, temperature: 0.3, maxTokens: 1200 });
  const parsed = extractJson(raw);

  const corrections = asArray(parsed.corrections)
    .map((c) => ({
      original: asString(c.original),
      fixed: asString(c.fixed),
      errorType: VALID_ERROR_TAGS.includes(c.errorType) ? c.errorType : 'other',
      explanation: asString(c.explanation)
    }))
    .filter((c) => c.fixed);

  let errorTags = asArray(parsed.errorTags).filter((t) => VALID_ERROR_TAGS.includes(t));
  if (errorTags.length === 0) {
    errorTags = corrections.map((c) => c.errorType);
  }
  errorTags = [...new Set(errorTags)];

  let score = Number(parsed.score);
  if (!isFinite(score)) score = corrections.length === 0 ? 9 : 6;
  score = Math.max(0, Math.min(10, Math.round(score)));

  return {
    corrected: asString(parsed.corrected, text),
    corrections,
    errorTags,
    encouragement: asString(parsed.encouragement, 'Keep writing — every entry sharpens your German!'),
    score
  };
}

/**
 * Provide concise English meanings for a list of German phrases.
 * Returns [{ german, english }] aligned to the input phrases.
 */
export async function explainGermanPhrases({ phrases, level = 'A2' }) {
  const list = asArray(phrases).filter(Boolean);
  if (list.length === 0) return [];

  const system = `You are a German tutor. Always respond with valid JSON only.`;
  const user = `For each of these German phrases, give a concise, natural English meaning for a CEFR ${level} learner.
Phrases:
${list.map((p, i) => `${i + 1}. ${p}`).join('\n')}

Return a JSON array in exactly this shape:
[{ "german": "<phrase>", "english": "<meaning>" }]`;

  const raw = await callGroq({ system, user, temperature: 0.2, maxTokens: 1000 });
  const parsed = extractJson(raw);

  // The model may return a bare array or wrap it in an object.
  const arr = Array.isArray(parsed) ? parsed : asArray(parsed.phrases);
  const pairs = arr
    .map((p) => ({ german: asString(p.german), english: asString(p.english) }))
    .filter((p) => p.german);

  // Offline / malformed fallback: keep the German, leave meaning blank.
  if (pairs.length === 0) {
    return list.map((p) => ({ german: asString(p), english: '' }));
  }
  return pairs;
}

/**
 * AI-enrich a lesson theme with vocab meanings, grammar explanations,
 * an example dialogue and a cultural tip. Pass the THEME's own level
 * (not the learner's) so results stay valid forever and can be cached.
 *
 * @param {{ theme: { id: string, title: string, description: string, level: string,
 *           keyPhrases?: string[], grammarFocus?: string[] }, level?: string }} args
 * @returns {Promise<{
 *   vocabulary: Array<{german: string, english: string, note: string}>,
 *   grammarFocus: Array<{name: string, explanation: string, example: string}>,
 *   dialogue: Array<{speaker: string, german: string, english: string}>,
 *   culturalTip: string
 * }>}
 */
export async function enrichTheme({ theme, level = 'A2' }) {
  const system = `You are an expert German curriculum designer. Always respond with valid JSON only, no extra prose.`;
  const existingGrammar = Array.isArray(theme.grammarFocus) && theme.grammarFocus.length > 0
    ? `Existing grammar focus: ${theme.grammarFocus.join(', ')}`
    : '';
  const user = `Enrich this German lesson theme for a CEFR ${level} learner.
Theme: "${theme.title}" — ${theme.description}
Key phrases: ${(theme.keyPhrases || []).join(' | ')}
${existingGrammar}

Return JSON in exactly this shape:
{
  "vocabulary": [
    { "german": "<key phrase or important word from this theme>", "english": "<concise natural meaning>", "note": "<short usage/gender/register note, or empty string>" }
  ],
  "grammarFocus": [
    { "name": "<grammar point name>", "explanation": "<2-3 sentence plain-English explanation>", "example": "<one German example sentence using theme vocabulary>" }
  ],
  "dialogue": [
    { "speaker": "<short role name, e.g. 'Kellner' or 'Du'>", "german": "<line>", "english": "<translation>" }
  ],
  "culturalTip": "<one practical cultural tip relevant to this theme>"
}
Cover every key phrase in "vocabulary" (plus 2-4 extra useful words), give 1-2 grammarFocus items, and a 4-6 line dialogue.`;

  const raw = await callGroq({ system, user, temperature: 0.4, maxTokens: 2000 });
  const parsed = extractJson(raw);

  const result = {
    vocabulary: asArray(parsed.vocabulary)
      .map((v) => ({ german: asString(v.german), english: asString(v.english), note: asString(v.note) }))
      .filter((v) => v.german),
    grammarFocus: asArray(parsed.grammarFocus)
      .map((g) => ({ name: asString(g.name), explanation: asString(g.explanation), example: asString(g.example) }))
      .filter((g) => g.name),
    dialogue: asArray(parsed.dialogue)
      .map((d) => ({ speaker: asString(d.speaker, '—'), german: asString(d.german), english: asString(d.english) }))
      .filter((d) => d.german),
    culturalTip: asString(parsed.culturalTip)
  };

  // Refuse to return (and let the caller cache) a useless enrichment.
  if (result.vocabulary.length === 0 && result.dialogue.length === 0) {
    throw new Error('AI enrichment came back empty');
  }
  return result;
}

/**
 * Check if Groq API is configured
 */
export function isGroqConfigured() {
  return !!GROQ_API_KEY && GROQ_API_KEY.length > 0;
}

/**
 * Get Groq API configuration instructions
 */
export function getGroqSetupInstructions() {
  return {
    title: 'Groq API Setup Required',
    steps: [
      '1. Go to https://console.groq.com',
      '2. Sign up for a free account (no credit card needed)',
      '3. Create an API key',
      '4. Add to your project:',
      '   - Create a .env file in the project root',
      '   - Add: REACT_APP_GROQ_API_KEY=your-key-here',
      '5. Restart the dev server',
      '',
      'Free tier: 14,400 requests/day (plenty for practice!)'
    ]
  };
}
