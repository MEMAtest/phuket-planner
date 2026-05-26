import React, { useState } from 'react';
import { Icons } from '../../data/staticData';

const PlacementTest = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const questions = [
    {
      id: 'q1',
      level: 'A1',
      question: 'How comfortable are you with basic German greetings and introductions?',
      options: [
        { value: 0, label: "I don't know any German" },
        { value: 1, label: 'I know "Hallo" and "Danke"' },
        { value: 2, label: 'I can introduce myself confidently' },
        { value: 3, label: 'Very comfortable, this is too basic' }
      ]
    },
    {
      id: 'q2',
      level: 'A1',
      question: 'Can you order food and drinks in German?',
      options: [
        { value: 0, label: 'No, I would use English' },
        { value: 1, label: 'I know "Ein Bier, bitte"' },
        { value: 2, label: 'I can order a full meal' },
        { value: 3, label: 'I can handle complex restaurant situations' }
      ]
    },
    {
      id: 'q3',
      level: 'A2',
      question: 'Can you talk about past events in German (Perfekt tense)?',
      options: [
        { value: 0, label: 'I don\'t know past tense' },
        { value: 1, label: 'I\'ve heard "Ich habe gemacht"' },
        { value: 2, label: 'I can form basic past tense' },
        { value: 3, label: 'I use past tense confidently' }
      ]
    },
    {
      id: 'q4',
      level: 'A2',
      question: 'Can you use German cases correctly (Nominativ, Akkusativ, Dativ)?',
      options: [
        { value: 0, label: 'What are cases?' },
        { value: 1, label: 'I know they exist but mess them up' },
        { value: 2, label: 'I get them right most of the time' },
        { value: 3, label: 'Cases are natural for me' }
      ]
    },
    {
      id: 'q5',
      level: 'B1',
      question: 'Can you express opinions and have discussions in German?',
      options: [
        { value: 0, label: 'No, too complex' },
        { value: 1, label: 'I can say "Ich denke, dass..."' },
        { value: 2, label: 'I can have basic discussions' },
        { value: 3, label: 'I debate comfortably in German' }
      ]
    },
    {
      id: 'q6',
      level: 'B1',
      question: 'How is your German with your wife and kids?',
      options: [
        { value: 0, label: 'We speak mostly English' },
        { value: 1, label: 'Simple phrases only' },
        { value: 2, label: 'Mix of German and English' },
        { value: 3, label: 'Mostly German, struggling with complex topics' }
      ]
    }
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateLevel(newAnswers);
    }
  };

  const calculateLevel = (finalAnswers) => {
    setIsProcessing(true);

    // Calculate scores
    const totalScore = Object.values(finalAnswers).reduce((sum, val) => sum + val, 0);
    const maxScore = questions.length * 3;
    const percentage = (totalScore / maxScore) * 100;

    // Determine starting level and themes to unlock
    let startLevel = 'A1';
    let skipThemes = [];
    let recommendation = '';

    if (percentage >= 75) {
      startLevel = 'B1';
      skipThemes = Array.from({ length: 24 }, (_, i) => `a${i < 12 ? '1' : '2'}-${(i % 12) + 1}`);
      recommendation = '🎯 Start at B1 (Intermediate) - You have solid A1/A2 knowledge. Focus on family themes and complex grammar.';
    } else if (percentage >= 50) {
      startLevel = 'A2';
      skipThemes = Array.from({ length: 12 }, (_, i) => `a1-${i + 1}`);
      recommendation = '📈 Start at A2 (Elementary) - You know the basics. Work on past tense, cases, and family conversations.';
    } else if (percentage >= 25) {
      startLevel = 'A1';
      skipThemes = Array.from({ length: 6 }, (_, i) => `a1-${i + 1}`);
      recommendation = '📚 Start at A1 Theme 7 - You have some basics. Build foundation then move to family themes.';
    } else {
      startLevel = 'A1';
      skipThemes = [];
      recommendation = '🌱 Start at A1 Theme 1 (Beginner) - Build your foundation from the ground up.';
    }

    setTimeout(() => {
      onComplete({
        level: startLevel,
        skipThemes,
        score: percentage,
        recommendation
      });
    }, 500);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  if (isProcessing) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center">
        <Icons.Loader className="w-12 h-12 text-sky-600 animate-spin mx-auto mb-4" />
        <p className="text-lg text-slate-700 dark:text-slate-300">Analyzing your level...</p>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            🎯 Placement Test
          </h3>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className="bg-sky-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs font-semibold rounded-full mb-3">
          Level: {currentQ.level}
        </div>
        <p className="text-lg text-slate-800 dark:text-slate-100 font-medium mb-4">
          {currentQ.question}
        </p>
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-4 rounded-lg border-2 border-slate-300 dark:border-slate-600
                         hover:border-sky-500 dark:hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20
                         transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600
                                group-hover:border-sky-500 dark:group-hover:border-sky-400
                                flex items-center justify-center font-semibold text-slate-600 dark:text-slate-400
                                group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {index + 1}
                </div>
                <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100">
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {currentQuestion > 0 && (
        <button
          onClick={goBack}
          className="text-sky-600 dark:text-sky-400 hover:underline text-sm flex items-center gap-1"
        >
          <Icons.ChevronLeft className="w-4 h-4" />
          Previous question
        </button>
      )}
    </div>
  );
};

export default PlacementTest;
