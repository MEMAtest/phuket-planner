/**
 * Groq AI integration for German language learning
 * Uses Groq's fast inference API with free tier
 */

// Get API key from environment variable or settings
// User needs to add REACT_APP_GROQ_API_KEY to .env file
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || '';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-70b-versatile'; // 70B param model, very capable

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
2. Pronunciation: Identify common pronunciation issues (based on transcription patterns)
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
  "pronunciationScore": <0-10>,
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
 * Low-level helper: send messages to Groq and return the raw text content.
 */
async function callGroq(messages, { temperature = 0.3, maxTokens = 1000 } = {}) {
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
      messages,
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
 * Extract the first JSON object/array from an AI response string.
 */
function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (!match) throw new Error('No JSON found in AI response');
  return JSON.parse(match[0]);
}

/**
 * "How do I say...?" capture.
 * Takes something the learner wants to say (in English, or mixed) and
 * teaches them the natural German - with a breakdown and a flashcard-ready
 * front/back so it can be dropped straight into the review deck.
 */
export async function translateAndTeach({ englishPhrase, level = 'A2', context = '' }) {
  const systemPrompt = `You are a warm, practical German tutor helping someone who LIVES in Germany with a German-speaking family. They will tell you something they want to say in real life. Teach them the most natural, everyday German a native would actually use - not textbook stiffness.`;

  const userPrompt = `The learner (level ${level}) wants to say: "${englishPhrase}"
${context ? `Situation: ${context}` : ''}

Respond in JSON:
{
  "german": "<the natural German sentence/phrase>",
  "literal": "<word-for-word literal English gloss>",
  "breakdown": ["<key word or chunk: meaning>", "..."],
  "grammarNote": "<one short, useful grammar insight relevant here>",
  "formality": "<informal (du) | formal (Sie) | neutral>",
  "alternatives": ["<another natural way to say it>"]
}

Keep it appropriate for level ${level}. Be accurate with articles, cases, and word order.`;

  const raw = await callGroq(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    { temperature: 0.4, maxTokens: 600 }
  );

  try {
    const r = extractJson(raw);
    return {
      german: r.german || '',
      literal: r.literal || '',
      breakdown: Array.isArray(r.breakdown) ? r.breakdown : [],
      grammarNote: r.grammarNote || '',
      formality: r.formality || 'neutral',
      alternatives: Array.isArray(r.alternatives) ? r.alternatives : []
    };
  } catch (e) {
    console.error('translateAndTeach parse error:', e, raw);
    return {
      german: raw.trim().slice(0, 200),
      literal: '',
      breakdown: [],
      grammarNote: '',
      formality: 'neutral',
      alternatives: []
    };
  }
}

/**
 * German diary correction + error mining.
 * Corrects a short piece of the learner's own writing/speech, explains each
 * fix, and tags the error TYPES so the system can track recurring weak spots.
 */
export async function correctGermanText({ text, level = 'A2' }) {
  const systemPrompt = `You are an encouraging German tutor reviewing a learner's own diary entry. Correct it into natural German, explain mistakes kindly, and classify each error by type so we can track patterns over time.`;

  const userPrompt = `Learner level: ${level}
Their German diary entry: "${text}"

Respond in JSON:
{
  "corrected": "<the full entry rewritten in correct, natural German>",
  "corrections": [
    {
      "original": "<the exact wrong fragment>",
      "fixed": "<the corrected fragment>",
      "explanation": "<short, friendly why>",
      "errorType": "<ONE of: case, word-order, verb-conjugation, gender-article, preposition, spelling, vocabulary, tense, plural, capitalization, other>"
    }
  ],
  "errorTags": ["<the distinct errorType values that appeared>"],
  "encouragement": "<one short encouraging sentence about what they did well>",
  "score": <0-10 overall>
}

If the entry is already correct, return empty corrections and praise them. Be precise about German grammar.`;

  const raw = await callGroq(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    { temperature: 0.3, maxTokens: 1200 }
  );

  try {
    const r = extractJson(raw);
    const corrections = Array.isArray(r.corrections) ? r.corrections : [];
    const errorTags = Array.isArray(r.errorTags) && r.errorTags.length
      ? r.errorTags
      : [...new Set(corrections.map(c => c.errorType).filter(Boolean))];
    return {
      corrected: r.corrected || text,
      corrections,
      errorTags,
      encouragement: r.encouragement || 'Great effort - keep writing every day!',
      score: typeof r.score === 'number' ? r.score : 7
    };
  } catch (e) {
    console.error('correctGermanText parse error:', e, raw);
    return {
      corrected: text,
      corrections: [],
      errorTags: [],
      encouragement: 'Your entry was saved. Keep practising!',
      score: 7
    };
  }
}

/**
 * Batch-translate German phrases to English so they can seed the review deck.
 * Used when a learner taps "Add this theme's phrases to my deck".
 */
export async function explainGermanPhrases({ phrases, level = 'A2' }) {
  const list = (phrases || []).filter(Boolean);
  if (list.length === 0) return [];

  const systemPrompt = `You translate German phrases into concise, natural English meanings for flashcards.`;
  const userPrompt = `Translate each German phrase (learner level ${level}) into a short English meaning.
Return a JSON array, same order, each item: { "german": "<original>", "english": "<concise meaning>" }

Phrases:
${list.map((p, i) => `${i + 1}. ${p}`).join('\n')}`;

  const raw = await callGroq(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    { temperature: 0.2, maxTokens: 1000 }
  );

  try {
    const arr = extractJson(raw);
    if (!Array.isArray(arr)) throw new Error('Expected array');
    return arr
      .filter(item => item && item.german)
      .map(item => ({ german: item.german, english: item.english || '' }));
  } catch (e) {
    console.error('explainGermanPhrases parse error:', e, raw);
    // Fallback: cards with blank English the user can fill in
    return list.map(p => ({ german: p, english: '' }));
  }
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
