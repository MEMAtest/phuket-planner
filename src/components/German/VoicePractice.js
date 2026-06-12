import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../../data/staticData';
import { reviewGermanSpeech, generateConversationResponse } from '../../utils/groqAI';
import { speakGerman as speak } from '../../utils/helpers';

const VoicePractice = ({ theme, scenario, onComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Conversation mode state
  const [conversationMode, setConversationMode] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [, setAiResponse] = useState(null);
  const [turnCount, setTurnCount] = useState(0);

  // Grammar drill mode
  const [grammarDrillMode, setGrammarDrillMode] = useState(false);
  const [showGrammarHelp, setShowGrammarHelp] = useState(false);

  const recognitionRef = useRef(null);
  const themeRef = useRef(theme);
  const scenarioRef = useRef(scenario);

  // Keep refs updated
  useEffect(() => {
    themeRef.current = theme;
    scenarioRef.current = scenario;
  }, [theme, scenario]);

  const handleGetFeedback = async (text) => {
    setIsProcessing(true);
    setError(null);

    try {
      // If in conversation mode, get AI response
      if (conversationMode) {
        const aiText = await generateConversationResponse({
          conversationHistory,
          userMessage: text,
          context: scenarioRef.current.situation,
          difficulty: themeRef.current.level
        });

        setAiResponse(aiText);
        setConversationHistory(prev => [
          ...prev,
          { role: 'user', content: text },
          { role: 'assistant', content: aiText }
        ]);

        // Speak AI response
        speak(aiText);

        setTurnCount(prev => prev + 1);

        // After 5 turns, offer to end conversation and get feedback
        if (turnCount >= 4) {
          // Get overall feedback on the conversation
          const fullConversation = conversationHistory
            .map(msg => `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`)
            .join('\n');

          const feedback = await reviewGermanSpeech({
            spokenText: fullConversation,
            context: scenarioRef.current.situation,
            prompt: 'Full conversation practice',
            expectedPattern: scenarioRef.current.expectedPattern,
            themeTitle: themeRef.current.title
          });

          setAiFeedback(feedback);
          setConversationMode(false);
        }
      } else {
        // Regular feedback mode
        const feedback = await reviewGermanSpeech({
          spokenText: text,
          context: scenarioRef.current.situation,
          prompt: scenarioRef.current.prompt,
          expectedPattern: scenarioRef.current.expectedPattern,
          themeTitle: themeRef.current.title
        });

        setAiFeedback(feedback);
      }
    } catch (err) {
      console.error('Error getting AI feedback:', err);
      setError('Could not get AI feedback. Please check your internet connection.');
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'de-DE'; // German
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscription(transcript);
        setIsRecording(false);

        // Automatically get AI feedback
        handleGetFeedback(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Recognition error: ${event.error}`);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    } else {
      setError('Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition not available');
      return;
    }

    // Prevent starting if already recording
    if (isRecording) {
      return;
    }

    setTranscription('');
    setAiFeedback(null);
    setError(null);

    try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting recognition:', err);
      // Check if it's already started
      if (err.message && err.message.includes('already started')) {
        setError('Recording already in progress');
      } else {
        setError('Could not start recording. Please try again.');
      }
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const tryAgain = () => {
    setTranscription('');
    setAiFeedback(null);
    setError(null);
    setAiResponse(null);
  };

  const startConversation = () => {
    setConversationMode(true);
    setConversationHistory([]);
    setTurnCount(0);
    setTranscription('');
    setAiFeedback(null);
    setError(null);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 space-y-6">
      {/* Grammar Drill (if available) */}
      {scenario.grammarDrill && !conversationMode && !transcription && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-2">
              📚 Grammar Focus: {scenario.grammarDrill.pattern}
            </h5>
            <button
              onClick={() => setShowGrammarHelp(!showGrammarHelp)}
              className="text-xs text-amber-700 dark:text-amber-300 hover:underline"
            >
              {showGrammarHelp ? 'Hide' : 'Show'} drill
            </button>
          </div>
          {showGrammarHelp && (
            <div className="mt-2 p-3 bg-white dark:bg-slate-800 rounded border border-amber-200 dark:border-amber-700">
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                <strong>Practice:</strong> {scenario.grammarDrill.exercise}
              </p>
              <button
                onClick={() => setGrammarDrillMode(true)}
                className="text-xs bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700 transition-colors"
              >
                Start Grammar Drill
              </button>
            </div>
          )}
        </div>
      )}

      {/* Scenario */}
      <div className="bg-sky-50 dark:bg-sky-900/20 border-2 border-sky-200 dark:border-sky-800 rounded-lg p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-slate-800 dark:text-slate-100">
            {grammarDrillMode ? '📚 Grammar Drill' : '📝 Scenario'}: {scenario.situation}
          </h4>
          {!conversationMode && !transcription && !grammarDrillMode && (
            <button
              onClick={startConversation}
              className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700 transition-colors"
            >
              💬 Conversation Mode
            </button>
          )}
        </div>
        <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
          {grammarDrillMode && scenario.grammarDrill
            ? `📚 ${scenario.grammarDrill.exercise}`
            : conversationMode
            ? '💬 Having a conversation - AI will respond to you. Speak naturally!'
            : scenario.prompt
          }
        </p>
        {scenario.expectedPattern && !conversationMode && !grammarDrillMode && (
          <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            💡 Pattern: <code className="bg-white dark:bg-slate-700 px-2 py-1 rounded">{scenario.expectedPattern}</code>
          </div>
        )}
      </div>

      {/* Conversation History */}
      {conversationMode && conversationHistory.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 max-h-60 overflow-y-auto">
          <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            💬 Conversation ({turnCount}/5 turns)
          </h5>
          {conversationHistory.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 p-2 rounded ${
                msg.role === 'user'
                  ? 'bg-blue-100 dark:bg-blue-900/30 ml-8'
                  : 'bg-green-100 dark:bg-green-900/30 mr-8'
              }`}
            >
              <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1">
                {msg.role === 'user' ? '👤 You' : '🤖 AI'}
              </div>
              <div className="text-sm text-slate-800 dark:text-slate-100">{msg.content}</div>
            </div>
          ))}
        </div>
      )}

      {/* Recording Controls */}
      {!transcription && !isProcessing && (
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={!!error && error.includes('not supported')}
            className={`
              w-32 h-32 rounded-full flex items-center justify-center text-white transition-all
              ${isRecording
                ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                : 'bg-sky-600 hover:bg-sky-700 shadow-lg hover:shadow-xl'
              }
              ${error && error.includes('not supported') ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isRecording ? (
              <Icons.Mic className="w-16 h-16" />
            ) : (
              <Icons.Mic className="w-12 h-12" />
            )}
          </button>

          <div className="text-center">
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {isRecording ? '🔴 Recording...' : '🎤 Press to Speak'}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {isRecording ? 'Release or tap again to stop' : 'Speak your German response'}
            </p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-300 text-sm">
            ⚠️ {error}
          </p>
        </div>
      )}

      {/* Processing */}
      {isProcessing && (
        <div className="flex flex-col items-center gap-3 py-8">
          <Icons.Loader className="w-12 h-12 text-sky-600 animate-spin" />
          <p className="text-slate-600 dark:text-slate-400">
            Analyzing your German...
          </p>
        </div>
      )}

      {/* Transcription & Feedback */}
      {transcription && !isProcessing && (
        <div className="space-y-4">
          {/* Transcription */}
          <div className="bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
              ✅ You said:
            </h4>
            <p className="text-lg text-slate-800 dark:text-slate-100 font-medium">
              "{transcription}"
            </p>
          </div>

          {/* AI Feedback */}
          {aiFeedback && (
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border-2 border-sky-200 dark:border-sky-800 rounded-lg p-5 space-y-4">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                🤖 AI Feedback
                <span className="ml-auto text-2xl">
                  {aiFeedback.overallScore >= 9 ? '🌟' :
                   aiFeedback.overallScore >= 7 ? '✅' :
                   aiFeedback.overallScore >= 5 ? '👍' : '📝'}
                </span>
              </h4>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Grammar</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${aiFeedback.grammarScore * 10}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {aiFeedback.grammarScore}/10
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <div
                    className="text-xs text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1"
                    title="Estimated from what the speech recognizer transcribed — not a true audio pronunciation analysis"
                  >
                    Intelligibility <span className="text-slate-400 cursor-help">ⓘ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${aiFeedback.pronunciationScore * 10}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {aiFeedback.pronunciationScore}/10
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Fluency</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${aiFeedback.fluencyScore * 10}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {aiFeedback.fluencyScore}/10
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Overall</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full transition-all"
                        style={{ width: `${aiFeedback.overallScore * 10}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {aiFeedback.overallScore}/10
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Scores are based on the speech recognizer's transcript of what you said.
              </p>

              {/* Corrections */}
              {aiFeedback.corrections && aiFeedback.corrections.length > 0 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                  <h5 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">
                    ⚠️ Corrections:
                  </h5>
                  <ul className="space-y-1">
                    {aiFeedback.corrections.map((correction, i) => (
                      <li key={i} className="text-sm text-amber-900 dark:text-amber-200">
                        • {correction}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Better Alternatives */}
              {aiFeedback.betterAlternatives && aiFeedback.betterAlternatives.length > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <h5 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                    💡 More Natural:
                  </h5>
                  <ul className="space-y-1">
                    {aiFeedback.betterAlternatives.map((alt, i) => (
                      <li key={i} className="text-sm text-green-900 dark:text-green-200">
                        • {alt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {aiFeedback.suggestions && aiFeedback.suggestions.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <h5 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    📚 Tips:
                  </h5>
                  <ul className="space-y-1">
                    {aiFeedback.suggestions.map((suggestion, i) => (
                      <li key={i} className="text-sm text-blue-900 dark:text-blue-200">
                        • {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={tryAgain}
              className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-3 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              🔁 Try Again
            </button>
            {onComplete && aiFeedback && (
              <button
                onClick={() => {
                  // Call onComplete with full result
                  onComplete({ transcription, feedback: aiFeedback, score: aiFeedback.overallScore });
                  // Reset for next scenario
                  setTranscription('');
                  setAiFeedback(null);
                }}
                className="flex-1 bg-sky-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors"
              >
                ➡️ Next Exercise
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoicePractice;
