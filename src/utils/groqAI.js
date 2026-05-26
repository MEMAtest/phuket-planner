/**
 * Groq AI integration for German language learning
 * Uses Groq's fast inference API with free tier
 */

// Get API key from environment variable or settings
// User needs to add REACT_APP_GROQ_API_KEY to .env file
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || '';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile'; // 70B param model, very capable

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
