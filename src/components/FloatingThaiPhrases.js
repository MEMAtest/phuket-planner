import React, { useState } from 'react';
import { THAI_PHRASES } from '../data/staticData';

const FloatingThaiPhrases = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('greetings');

  const categories = Object.keys(THAI_PHRASES);

  const playAudio = (audioFile) => {
    // Placeholder for audio playback
    console.log(`Playing audio: ${audioFile}`);
    // In production, you'd play actual audio files
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied: ' + text);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-sky-600 text-white rounded-full shadow-lg 
                 hover:bg-sky-700 transition-all hover:scale-110 z-40 flex items-center justify-center
                 animate-bounce"
        title="Thai Phrases"
      >
        <span className="text-2xl">🗣️</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div 
            className="bg-white w-full sm:w-96 max-h-[80vh] rounded-t-2xl sm:rounded-2xl shadow-xl 
                     animate-slide-up sm:animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-sky-500 to-blue-600 
                          text-white rounded-t-2xl sm:rounded-t-2xl">
              <h2 className="text-lg font-bold">🇹🇭 Thai Phrases</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto p-2 gap-1 bg-slate-50 no-scrollbar">
              {categories.map(cat => {
                const categoryLabels = {
                  greetings: '👋 Greetings',
                  kidsNeeds: '👶 Kids',
                  restaurant: '🍜 Food',
                  shopping: '🛍️ Shop',
                  directions: '🗺️ Directions',
                  emergency: '🚨 Emergency',
                  activities: '🏖️ Activities'
                };
                
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors
                             ${selectedCategory === cat 
                               ? 'bg-sky-600 text-white' 
                               : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                  >
                    {categoryLabels[cat] || cat}
                  </button>
                );
              })}
            </div>

            {/* Phrases List */}
            <div className="overflow-y-auto max-h-96 p-4">
              <div className="space-y-3">
                {THAI_PHRASES[selectedCategory].map((phrase, idx) => (
                  <div 
                    key={idx}
                    className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-bold text-lg text-slate-800">{phrase.thai}</p>
                        <p className="text-sm text-sky-600 font-medium mt-1">
                          {phrase.phonetic}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">{phrase.english}</p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => copyToClipboard(phrase.thai)}
                          className="p-2 bg-white rounded-lg hover:bg-sky-50 transition-colors"
                          title="Copy Thai text"
                        >
                          📋
                        </button>
                        {phrase.audio && (
                          <button
                            onClick={() => playAudio(phrase.audio)}
                            className="p-2 bg-white rounded-lg hover:bg-sky-50 transition-colors"
                            title="Play pronunciation"
                          >
                            🔊
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Tips */}
            <div className="p-3 bg-amber-50 border-t rounded-b-2xl">
              <p className="text-xs text-amber-800">
                💡 <strong>Tip:</strong> Add "krap" (male) or "ka" (female) at the end to be polite!
              </p>
              <p className="text-xs text-amber-800 mt-1">
                🙏 "Sawadee krap/ka" = Hello (polite)
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingThaiPhrases;
