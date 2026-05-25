import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../../data/staticData';
import { reviewGermanSpeech } from '../../utils/groqAI';

const VoicePractice = ({ theme, scenario, onComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);

  const handleGetFeedback = async (text) => {
    setIsProcessing(true);
    setError(null);

    try {
      const feedback = await reviewGermanSpeech({
        spokenText: text,
        context: scenario.situation,
        prompt: scenario.prompt,
        expectedPattern: scenario.expectedPattern,
        themeTitle: theme.title
      });

      setAiFeedback(feedback);

      // Call onComplete callback if provided
      if (onComplete) {
        onComplete({
          transcription: text,
          feedback,
          score: feedback.overallScore
        });
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

    setTranscription('');
    setAiFeedback(null);
    setError(null);

    try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting recognition:', err);
      setError('Could not start recording. Please try again.');
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
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 space-y-6">
      {/* Scenario */}
      <div className="bg-sky-50 dark:bg-sky-900/20 border-2 border-sky-200 dark:border-sky-800 rounded-lg p-4">
        <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
          📝 Scenario: {scenario.situation}
        </h4>
        <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
          {scenario.prompt}
        </p>
        {scenario.expectedPattern && (
          <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            💡 Pattern: <code className="bg-white dark:bg-slate-700 px-2 py-1 rounded">{scenario.expectedPattern}</code>
          </div>
        )}
      </div>

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
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Pronunciation</div>
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
                onClick={() => onComplete({ transcription, feedback: aiFeedback, score: aiFeedback.overallScore })}
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
