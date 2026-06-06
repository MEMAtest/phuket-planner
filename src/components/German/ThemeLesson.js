import React, { useState } from 'react';
import { Icons } from '../../data/staticData';
import { useGerman } from '../../state/GermanContext';
import { explainGermanPhrases, isGroqConfigured } from '../../utils/groqAI';

const ThemeLesson = ({ theme, onStartPractice }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { addFlashcards } = useGerman();
  const [seeding, setSeeding] = useState(false);
  const [seededCount, setSeededCount] = useState(null);

  const handleAddToDeck = async () => {
    if (!theme.keyPhrases || theme.keyPhrases.length === 0) return;
    setSeeding(true);
    try {
      let pairs;
      if (isGroqConfigured()) {
        pairs = await explainGermanPhrases({ phrases: theme.keyPhrases, level: theme.level });
      } else {
        // Offline fallback: store the German with a blank meaning to fill in later
        pairs = theme.keyPhrases.map(p => ({ german: p, english: '' }));
      }
      const cards = pairs.map(p => ({
        german: p.german,
        english: p.english,
        source: 'theme',
        themeId: theme.id
      }));
      const added = addFlashcards(cards);
      setSeededCount(added);
    } catch (e) {
      console.error('Failed to seed deck from theme:', e);
      setSeededCount(0);
    } finally {
      setSeeding(false);
    }
  };

  const steps = [
    {
      id: 'intro',
      title: '📚 Introduction',
      icon: '👋'
    },
    {
      id: 'vocabulary',
      title: '📖 Key Vocabulary',
      icon: '📝'
    },
    {
      id: 'grammar',
      title: '🔧 Grammar Focus',
      icon: '⚙️'
    },
    {
      id: 'examples',
      title: '💬 Example Dialogues',
      icon: '🗣️'
    },
    {
      id: 'ready',
      title: '✅ Ready to Practice',
      icon: '🎯'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onStartPractice();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkipToVoice = () => {
    onStartPractice();
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'intro':
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                {theme.title}
              </h2>
              <div className="inline-block px-4 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-sm font-semibold rounded-full mb-4">
                Level {theme.level} • {theme.estimatedTime} minutes
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-3 text-lg">
                📋 What you'll learn:
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                {theme.description}
              </p>

              {theme.realWorldContext && (
                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mb-4">
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    <strong>💡 Real-world context:</strong> This theme is based on everyday situations you'll encounter in German-speaking environments.
                  </p>
                </div>
              )}

              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4">
                <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
                  🎯 Learning Objectives:
                </h4>
                <ul className="list-disc list-inside text-sm text-amber-800 dark:text-amber-300 space-y-1">
                  <li>Master {theme.keyPhrases?.length || 5} key phrases</li>
                  <li>Practice {theme.scenarios?.length || 1} real-world scenario{theme.scenarios?.length > 1 ? 's' : ''}</li>
                  {theme.grammarFocus && theme.grammarFocus.length > 0 && (
                    <li>Understand {theme.grammarFocus.join(', ')}</li>
                  )}
                  <li>Build confidence in speaking</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'vocabulary':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">{step.icon}</div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Key Phrases & Vocabulary
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Listen and repeat these essential phrases
              </p>
            </div>

            <div className="space-y-3">
              {theme.keyPhrases && theme.keyPhrases.map((phrase, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg p-4 hover:border-sky-500 dark:hover:border-sky-400 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center text-sky-700 dark:text-sky-300 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                          {phrase}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if ('speechSynthesis' in window) {
                          const utterance = new SpeechSynthesisUtterance(phrase);
                          utterance.lang = 'de-DE';
                          utterance.rate = 0.85;
                          window.speechSynthesis.speak(utterance);
                        }
                      }}
                      className="ml-3 p-2 bg-sky-100 dark:bg-sky-900/30 hover:bg-sky-200 dark:hover:bg-sky-900/50 rounded-full transition-colors"
                      title="Listen"
                    >
                      <Icons.Play className="w-5 h-5 text-sky-700 dark:text-sky-300" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mt-6">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>💡 Tip:</strong> Click the play button to hear native pronunciation. Try saying each phrase out loud several times before moving on.
              </p>
            </div>

            {/* Seed these phrases into the spaced-repetition deck */}
            {seededCount !== null ? (
              <div className="mt-3 py-3 px-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-center font-semibold">
                ✅ Added {seededCount} card{seededCount === 1 ? '' : 's'} to your review deck
              </div>
            ) : (
              <button
                onClick={handleAddToDeck}
                disabled={seeding}
                className="mt-3 w-full py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {seeding ? (
                  <><Icons.Loader className="w-5 h-5 animate-spin" /> Adding to deck…</>
                ) : (
                  <><Icons.Plus className="w-5 h-5" /> Add these phrases to my review deck</>
                )}
              </button>
            )}
          </div>
        );

      case 'grammar':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">{step.icon}</div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Grammar Focus
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Understand the structure behind the phrases
              </p>
            </div>

            {theme.grammarFocus && theme.grammarFocus.length > 0 ? (
              <div className="space-y-4">
                {theme.grammarFocus.map((focus, index) => (
                  <div
                    key={index}
                    className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-lg p-5"
                  >
                    <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-3 flex items-center gap-2">
                      <span className="text-2xl">📚</span>
                      {focus}
                    </h4>

                    {theme.scenarios && theme.scenarios[0]?.grammarDrill && index === 0 && (
                      <div className="mt-3 p-4 bg-white dark:bg-slate-800 rounded-lg border border-amber-200 dark:border-amber-700">
                        <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                          <strong>Pattern:</strong> {theme.scenarios[0].grammarDrill.pattern}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <strong>Practice:</strong> {theme.scenarios[0].grammarDrill.exercise}
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    <strong>✨ Don't worry!</strong> You'll practice these grammar patterns in the voice exercises. Focus on understanding the concept, not memorizing rules.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6 text-center">
                <p className="text-slate-600 dark:text-slate-400">
                  No specific grammar focus for this theme. We'll concentrate on vocabulary and pronunciation!
                </p>
              </div>
            )}
          </div>
        );

      case 'examples':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">{step.icon}</div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Example Dialogues
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                See how these phrases work in real conversations
              </p>
            </div>

            <div className="space-y-4">
              {theme.scenarios && theme.scenarios.map((scenario, index) => (
                <div
                  key={scenario.id}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-lg p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">💬</span>
                    <h4 className="font-bold text-purple-900 dark:text-purple-200">
                      Scenario {index + 1}: {scenario.situation}
                    </h4>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-3">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      <strong>Task:</strong> {scenario.prompt}
                    </p>
                    {scenario.expectedPattern && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        <strong>Pattern to use:</strong>{' '}
                        <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-purple-700 dark:text-purple-300">
                          {scenario.expectedPattern}
                        </code>
                      </p>
                    )}
                  </div>

                  {scenario.vocabulary && scenario.vocabulary.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {scenario.vocabulary.map((word, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded-full"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-sky-50 dark:bg-sky-900/20 border-l-4 border-sky-500 p-4">
              <p className="text-sky-800 dark:text-sky-200 text-sm">
                <strong>🎤 Next step:</strong> You'll practice these scenarios with voice recognition. The AI will give you personalized feedback on your German!
              </p>
            </div>
          </div>
        );

      case 'ready':
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                You're Ready to Practice!
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Let's put your knowledge into action with voice practice
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700 rounded-lg p-6">
              <h4 className="font-bold text-green-900 dark:text-green-200 mb-4 text-lg">
                🎯 Training Modes Available:
              </h4>

              <div className="space-y-3">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-blue-500">
                  <h5 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                    🎤 Standard Practice
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Speak your responses and get AI feedback on accuracy, pronunciation, and grammar
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-purple-500">
                  <h5 className="font-semibold text-purple-900 dark:text-purple-200 mb-1">
                    💬 Conversation Mode
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Have a real dialogue - the AI responds to you in German for immersive practice
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-amber-500">
                  <h5 className="font-semibold text-amber-900 dark:text-amber-200 mb-1">
                    📚 Grammar Drill
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Focus on specific grammar patterns with guided exercises
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-sky-50 dark:bg-sky-900/20 rounded-lg p-5 text-center">
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                <strong>Ready to start speaking German?</strong>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Click "Start Voice Practice" below to begin your training!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => setCurrentStep(index)}
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full transition-all
                  ${index === currentStep
                    ? 'bg-sky-600 text-white scale-110 shadow-lg'
                    : index < currentStep
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }
                `}
              >
                {index < currentStep ? '✓' : index + 1}
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-1 mx-2 transition-all
                    ${index < currentStep
                      ? 'bg-green-600'
                      : 'bg-slate-200 dark:bg-slate-700'
                    }
                  `}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {steps[currentStep].title}
          </span>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-700 pt-6">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <Icons.ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={handleSkipToVoice}
          className="px-4 py-2 text-sm text-sky-600 dark:text-sky-400 hover:underline"
        >
          Skip to Voice Practice
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-colors flex items-center gap-2"
        >
          {currentStep === steps.length - 1 ? (
            <>
              <Icons.Mic className="w-5 h-5" />
              Start Voice Practice
            </>
          ) : (
            <>
              Next
              <Icons.ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ThemeLesson;
