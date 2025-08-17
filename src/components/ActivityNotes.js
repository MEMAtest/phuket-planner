import React, { useState, useEffect } from 'react';
import { Icons } from '../data/staticData';

const ActivityNotes = ({ activityId, activityTitle, date }) => {
  const [notes, setNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(0);
  const [savedNote, setSavedNote] = useState(null);

  const NOTES_KEY = `activity_notes_${date}_${activityId}`;
  const RATING_KEY = `activity_rating_${date}_${activityId}`;

  useEffect(() => {
    // Load saved notes and rating
    const saved = localStorage.getItem(NOTES_KEY);
    const savedRating = localStorage.getItem(RATING_KEY);
    
    if (saved) {
      setSavedNote(saved);
      setNotes(saved);
    }
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
  }, [NOTES_KEY, RATING_KEY]);

  const handleSave = () => {
    localStorage.setItem(NOTES_KEY, notes);
    localStorage.setItem(RATING_KEY, rating.toString());
    setSavedNote(notes);
    setIsEditing(false);
  };

  const handleRating = (value) => {
    setRating(value);
    localStorage.setItem(RATING_KEY, value.toString());
  };

  return (
    <div className="mt-2 p-3 bg-slate-50 rounded-lg">
      {/* Rating Stars */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-slate-600">Rate:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              className="transition-colors"
            >
              <Icons.star 
                className={`w-4 h-4 ${
                  star <= rating 
                    ? 'text-amber-500 fill-amber-500' 
                    : 'text-slate-300'
                }`}
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <span className="text-xs text-slate-500 ml-1">
            {rating === 5 ? 'Loved it!' : 
             rating === 4 ? 'Great!' : 
             rating === 3 ? 'Good' : 
             rating === 2 ? 'OK' : 'Not great'}
          </span>
        )}
      </div>

      {/* Notes Section */}
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes... (e.g., 'Kids loved the swimming pool!', 'Too spicy for little ones')"
            className="w-full px-3 py-2 text-sm border rounded-lg resize-none"
            rows="3"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-sky-600 text-white text-sm rounded-lg 
                       hover:bg-sky-700 transition-colors"
            >
              Save Note
            </button>
            <button
              onClick={() => {
                setNotes(savedNote || '');
                setIsEditing(false);
              }}
              className="px-3 py-1 bg-slate-300 text-slate-700 text-sm rounded-lg 
                       hover:bg-slate-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {savedNote ? (
            <div 
              onClick={() => setIsEditing(true)}
              className="text-sm text-slate-700 bg-white p-2 rounded cursor-pointer 
                       hover:bg-slate-50 transition-colors"
            >
              <Icons.bookOpen className="w-3 h-3 inline mr-1 text-slate-400" />
              {savedNote}
              <span className="text-xs text-sky-600 ml-2">(click to edit)</span>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-slate-500 hover:text-slate-700 
                       flex items-center gap-1"
            >
              <Icons.plusCircle className="w-4 h-4" />
              Add a note
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityNotes;
