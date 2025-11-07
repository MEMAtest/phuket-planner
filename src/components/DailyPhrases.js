import React, { useState } from 'react';
import { Icons } from '../data/staticData';
import { THAI_PHRASES, getDailyPhrases } from '../data/staticData';

const DailyPhrases = ({ dayData, dayIndex }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  
  // Get daily suggested phrases based on activities
  const dailyPhrases = dayData ? getDailyPhrases(dayData.blocks || [], dayIndex) : [];
  
  const playPronunciation = (phraseId) => {
    // Placeholder for audio functionality
    setPlayingAudio(phraseId);
    setTimeout(() => setPlayingAudio(null), 1000);
    
    // In production, you would play actual audio files:
    // const audio = new Audio(`/audio/thai/${phraseId}.mp3`);
    // audio.play();
  };
  
  const categories = [
    { key: 'greetings', title: 'Basic Greetings', icon: '👋' },
    { key: 'restaurant', title: 'Restaurant', icon: '🍽️' },
    { key: 'kidsNeeds', title: "Kids' Needs", icon: '👶' },
    { key: 'shopping', title: 'Shopping', icon: '🛍️' },
    { key: 'directions', title: 'Directions', icon: '🗺️' },
    { key: 'emergency', title: 'Emergency', icon: '🚨' },
    { key: 'activities', title: 'Activities', icon: '🎯' }
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
        <h3 className="font-bold text-xl text-white mb-2 flex items-center gap-2">
          <Icons.BookOpen className="w-6 h-6" />
          Thai Phrases
        </h3>
        <p className="text-purple-100 text-sm">
          Essential phrases for your Phuket adventure
        </p>
      </div>
      
      {/* Today's Suggested Phrases */}
      {dailyPhrases.length > 0 && (
        <div className="p-4 bg-purple-50 border-b">
          <h4 className="font-semibold text-sm text-purple-800 mb-3">
            📅 Today's Essential Phrases
          </h4>
          <div className="space-y-2">
            {dailyPhrases.map((phrase, i) => (
              <div 
                key={i}
                className="flex items-center justify-between p-2 bg-white rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-thai text-lg text-purple-700">
                      {phrase.thai}
                    </span>
                    <span className="text-xs text-slate-500">
                      ({phrase.phonetic})
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 mt-0.5">
                    {phrase.english}
                  </p>
                </div>
                <button
                  onClick={() => playPronunciation(phrase.audio)}
                  className={`p-2 rounded-full transition-colors ${
                    playingAudio === phrase.audio 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                  title="Play pronunciation"
                >
                  🔊
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* All Phrases by Category */}
      <div className="p-4">
        <h4 className="font-semibold text-sm text-slate-700 mb-3">
          All Phrases by Category
        </h4>
        
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.key} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedCategory(
                  expandedCategory === category.key ? null : category.key
                )}
                className="w-full p-3 bg-slate-50 hover:bg-slate-100 flex items-center 
                         justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-medium text-sm text-slate-700">
                    {category.title}
                  </span>
                  <span className="text-xs text-slate-500">
                    ({THAI_PHRASES[category.key].length} phrases)
                  </span>
                </div>
                <Icons.ChevronDown 
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    expandedCategory === category.key ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {expandedCategory === category.key && (
                <div className="p-3 bg-white space-y-2">
                  {THAI_PHRASES[category.key].map((phrase, i) => (
                    <div 
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg
                               hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="font-thai text-base text-slate-800">
                            {phrase.thai}
                          </span>
                          <span className="text-xs text-slate-500">
                            {phrase.phonetic}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-0.5">
                          {phrase.english}
                        </p>
                      </div>
                      <button
                        onClick={() => playPronunciation(phrase.audio)}
                        className={`p-1.5 rounded-full transition-colors ${
                          playingAudio === phrase.audio 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                        }`}
                        title="Play pronunciation"
                      >
                        <span className="text-xs">🔊</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Tips */}
      <div className="p-4 bg-amber-50 border-t">
        <h4 className="font-semibold text-sm text-amber-800 mb-2">
          💡 Language Tips
        </h4>
        <ul className="space-y-1 text-xs text-amber-700">
          <li>• Add "krub" (men) or "ka" (women) to be polite</li>
          <li>• Smile while speaking - Thais appreciate the effort!</li>
          <li>• Point with your chin, not your finger</li>
          <li>• "Mai pen rai" (never mind) is the most Thai phrase ever</li>
        </ul>
      </div>
    </div>
  );
};

export default DailyPhrases;
