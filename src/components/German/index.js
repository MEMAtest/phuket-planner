import React, { useState, useMemo } from 'react';
import { Icons } from '../../data/staticData';
import { useGerman } from '../../state/GermanContext';
import { getAllThemes, getThemeById, getFamilyThemes } from '../../data/germanThemes';
import { isGroqConfigured, getGroqSetupInstructions } from '../../utils/groqAI';
import VoicePractice from './VoicePractice';
import PlacementTest from './PlacementTest';
import DailyHome from './DailyHome';
import ThemeLesson from './ThemeLesson';
import PhraseCapture from './PhraseCapture';
import GermanDiary from './GermanDiary';
import SpacedReview from './SpacedReview';
import WeakSpotDrill from './WeakSpotDrill';
import ListeningPractice from './ListeningPractice';

const GermanLearning = () => {
  const {
    completedThemes,
    currentThemeId,
    totalPracticeMinutes,
    streak,
    setCurrentTheme,
    markThemeComplete,
    addSession,
    addRecording,
    updateStreak,
    getProgress,
    getCurrentLevel
  } = useGerman();

  // 'home' | 'dashboard' | 'themes' | 'lesson' | 'practice' | 'placement' | 'review' | 'capture' | 'diary' | 'drill' | 'listening'
  const [view, setView] = useState('home');
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [drillTag, setDrillTag] = useState(null);
  const [placementComplete, setPlacementComplete] = useState(
    localStorage.getItem('german_placement_complete') === 'true'
  );
  const [skippedThemes, setSkippedThemes] = useState(() => {
    const saved = localStorage.getItem('german_skipped_themes');
    return saved ? JSON.parse(saved) : [];
  });

  const allThemes = getAllThemes();
  const currentTheme = currentThemeId ? getThemeById(currentThemeId) : null;
  const progress = getProgress();
  const level = getCurrentLevel();

  const groqConfigured = isGroqConfigured();

  // Group themes by level
  const themesByLevel = useMemo(() => {
    const familyThemes = getFamilyThemes();
    return {
      A1: allThemes.filter(t => t.level === 'A1' && t.number <= 12),
      A2: allThemes.filter(t => t.level === 'A2' && t.number <= 24),
      B1: allThemes.filter(t => t.level === 'B1' && t.number <= 36),
      FAMILY: familyThemes
    };
  }, [allThemes]);

  const handlePlacementComplete = (result) => {
    // Mark skipped themes as completed
    result.skipThemes.forEach(themeId => {
      if (!completedThemes.includes(themeId)) {
        markThemeComplete(themeId);
      }
    });

    setSkippedThemes(result.skipThemes);
    localStorage.setItem('german_skipped_themes', JSON.stringify(result.skipThemes));
    localStorage.setItem('german_placement_complete', 'true');
    setPlacementComplete(true);
    setView('dashboard');

    alert(`✅ ${result.recommendation}\n\n${result.skipThemes.length} themes unlocked automatically.`);
  };

  const startPlacementTest = () => {
    setView('placement');
  };

  const handleStartTheme = (themeId) => {
    setCurrentTheme(themeId);
    setCurrentScenarioIndex(0);
    setView('lesson');
    updateStreak();
  };

  const handleScenarioComplete = (result) => {
    // Save recording
    addRecording({
      themeId: currentThemeId,
      scenarioId: currentTheme.scenarios[currentScenarioIndex].id,
      transcription: result.transcription,
      userInput: result.transcription,
      aiFeedback: result.feedback
    });

    // Move to next scenario or complete theme
    if (currentScenarioIndex < currentTheme.scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
    } else {
      // Theme complete!
      markThemeComplete(currentThemeId);

      addSession({
        themeId: currentThemeId,
        date: new Date().toISOString().split('T')[0],
        duration: currentTheme.estimatedTime,
        exercisesCompleted: currentTheme.scenarios.length,
        averageScore: result.score
      });

      setView('home');
      setCurrentTheme(null);
      alert(`🎉 Theme "${currentTheme.title}" completed! Great work!`);
    }
  };

  // Daily Home View (default landing — the living-curriculum hub)
  if (view === 'home') {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setView('dashboard')}
            className="text-sm text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            <Icons.BarChart className="w-4 h-4" />
            Progress & placement
          </button>
        </div>
        <DailyHome
          onReview={() => setView('review')}
          onCapture={() => setView('capture')}
          onDiary={() => setView('diary')}
          onStartTheme={(themeId) => handleStartTheme(themeId)}
          onBrowse={() => setView('themes')}
          onDrillWeakSpot={(tag) => { setDrillTag(tag); setView('drill'); }}
          onListening={() => setView('listening')}
        />
      </div>
    );
  }

  // Spaced-repetition review
  if (view === 'review') {
    return (
      <div className="space-y-4">
        <SpacedReview onExit={() => setView('home')} />
      </div>
    );
  }

  // Listening comprehension practice
  if (view === 'listening') {
    return (
      <div className="space-y-4">
        <ListeningPractice onExit={() => setView('home')} />
      </div>
    );
  }

  // "How do I say…?" phrase capture
  if (view === 'capture') {
    return <PhraseCapture onExit={() => setView('home')} />;
  }

  // German diary
  if (view === 'diary') {
    return <GermanDiary onExit={() => setView('home')} />;
  }

  // Weak-spot grammar drill
  if (view === 'drill' && drillTag) {
    return (
      <WeakSpotDrill
        errorType={drillTag}
        onBack={() => { setDrillTag(null); setView('home'); }}
      />
    );
  }

  // Theme lesson walkthrough (precedes voice practice)
  if (view === 'lesson' && currentTheme) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => { setView('home'); setCurrentTheme(null); }}
          className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-2"
        >
          <Icons.ArrowLeft className="w-4 h-4" />
          Back to Today
        </button>
        <ThemeLesson key={currentTheme.id} theme={currentTheme} onStartPractice={() => setView('practice')} />
      </div>
    );
  }

  // Dashboard View
  if (view === 'dashboard') {
    return (
      <div className="space-y-6">
        <div>
          <button
            onClick={() => setView('home')}
            className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-2"
          >
            <Icons.ArrowLeft className="w-4 h-4" />
            Back to Today
          </button>
        </div>
        {/* Groq Setup Warning */}
        {!groqConfigured && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
              ⚠️ Setup Required
            </h3>
            <p className="text-sm text-amber-800 dark:text-amber-300 mb-3">
              To use AI feedback, you need to configure the Groq API (free tier available).
            </p>
            <div className="text-xs text-amber-900 dark:text-amber-200 bg-white dark:bg-slate-800 rounded p-3 font-mono">
              {getGroqSetupInstructions().steps.map((step, i) => (
                <div key={i}>{step}</div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                🇩🇪 German Learning
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Your path to conversational fluency
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-lg p-4">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Level</div>
              <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">{level}</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Progress</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{progress}%</div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-4">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Streak</div>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{streak} 🔥</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Practice</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalPracticeMinutes}m</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
              <span>{completedThemes.length} of 41 themes completed</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-sky-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {!placementComplete && completedThemes.length === 0 && (
              <button
                onClick={startPlacementTest}
                className="w-full bg-purple-600 text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                🎯 Take Placement Test (Skip What You Know)
              </button>
            )}
            <button
              onClick={() => setView('themes')}
              className="w-full bg-sky-600 text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-sky-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icons.Play className="w-6 h-6"/>
              {completedThemes.length === 0 && placementComplete ? 'Start Learning' : 'Browse All Themes'}
            </button>
          </div>
        </div>

        {/* Recent Completions */}
        {completedThemes.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-4">
              ✅ Completed Themes ({completedThemes.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {completedThemes.slice(-8).reverse().map(themeId => {
                const theme = getThemeById(themeId);
                return theme ? (
                  <div
                    key={themeId}
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3"
                  >
                    <div className="text-xs text-green-700 dark:text-green-400 mb-1">
                      {theme.level} • Theme {theme.number}
                    </div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {theme.title}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Placement Test View
  if (view === 'placement') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setView('dashboard')}
            className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-2"
          >
            <Icons.ArrowLeft className="w-4 h-4"/>
            Back to Dashboard
          </button>
        </div>
        <PlacementTest onComplete={handlePlacementComplete} />
      </div>
    );
  }

  // Theme Selector View
  if (view === 'themes') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setView('dashboard')}
            className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-2"
          >
            <Icons.ArrowLeft className="w-4 h-4"/>
            Back to Dashboard
          </button>
        </div>

        {/* Family Themes Section (Priority) */}
        {themesByLevel.FAMILY && themesByLevel.FAMILY.length > 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 shadow-lg border-2 border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
              👨‍👩‍👧 Family Life Themes
              <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">New!</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Real conversations for daily family life - partner, kids, in-laws, parenting
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {themesByLevel.FAMILY.map(theme => {
                const isCompleted = completedThemes.includes(theme.id);
                const isSkipped = skippedThemes.includes(theme.id);
                const hasPrerequisites = completedThemes.length >= 20; // Need some A2 progress
                const isLocked = !hasPrerequisites && !isCompleted && !isSkipped;

                return (
                  <button
                    key={theme.id}
                    onClick={() => !isLocked && handleStartTheme(theme.id)}
                    disabled={isLocked}
                    className={`
                      text-left p-4 rounded-lg border-2 transition-all
                      ${isCompleted
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800'
                        : isSkipped
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-800'
                        : isLocked
                        ? 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 opacity-50 cursor-not-allowed'
                        : 'bg-white dark:bg-slate-700 border-purple-300 dark:border-purple-600 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">
                        {isCompleted ? '✅' : isSkipped ? '⏩' : isLocked ? '🔒' : '👨‍👩‍👧'}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                          Theme {theme.number} • {theme.estimatedTime} min
                          {theme.realWorldContext && ' • Real-world'}
                        </div>
                        <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                          {theme.title}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {theme.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Standard Themes */}
        {['A1', 'A2', 'B1'].map(levelKey => (
          <div key={levelKey} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Level {levelKey} {levelKey === 'A1' && '(Beginner)'} {levelKey === 'A2' && '(Elementary)'} {levelKey === 'B1' && '(Intermediate)'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {themesByLevel[levelKey].map(theme => {
                const isCompleted = completedThemes.includes(theme.id);
                const isSkipped = skippedThemes.includes(theme.id);
                const isLocked = theme.number > 1 && !completedThemes.includes(allThemes[theme.number - 2]?.id) && !isSkipped;

                return (
                  <button
                    key={theme.id}
                    onClick={() => !isLocked && handleStartTheme(theme.id)}
                    disabled={isLocked}
                    className={`
                      text-left p-4 rounded-lg border-2 transition-all
                      ${isCompleted
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800'
                        : isSkipped
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-800'
                        : isLocked
                        ? 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 opacity-50 cursor-not-allowed'
                        : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-sky-500 dark:hover:border-sky-400 hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">
                        {isCompleted ? '✅' : isSkipped ? '⏩' : isLocked ? '🔒' : '📚'}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                          Theme {theme.number} • {theme.estimatedTime} min
                        </div>
                        <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                          {theme.title}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {theme.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Practice View
  if (view === 'practice' && currentTheme) {
    const scenario = currentTheme.scenarios[currentScenarioIndex];

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure? Your progress in this theme will not be saved.')) {
                  setView('themes');
                  setCurrentTheme(null);
                }
              }}
              className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-2 mb-2"
            >
              <Icons.ArrowLeft className="w-4 h-4"/>
              Exit Practice
            </button>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {currentTheme.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {currentTheme.level} • Exercise {currentScenarioIndex + 1} of {currentTheme.scenarios.length}
            </p>
          </div>
        </div>

        {/* Key Phrases Reference */}
        <div className="bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl p-4">
          <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
            💡 Key Phrases for this theme:
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentTheme.keyPhrases.map((phrase, i) => (
              <span
                key={i}
                className="bg-white dark:bg-slate-600 px-3 py-1 rounded-full text-sm text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-500"
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>

        {/* Voice Practice */}
        <VoicePractice
          theme={currentTheme}
          scenario={scenario}
          onComplete={handleScenarioComplete}
        />

        {/* Progress within theme */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
            <span>Exercise Progress</span>
            <span>{currentScenarioIndex + 1} / {currentTheme.scenarios.length}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-sky-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentScenarioIndex + 1) / currentTheme.scenarios.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default GermanLearning;
