import React, { useState } from 'react';
import { generateId } from '../utils/helpers';

const AddActivityForm = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('indoor');
  const [notes, setNotes] = useState('');
  const [cost, setCost] = useState('');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  
  // Quick-add templates
  const templates = {
    meals: [
      { title: "Breakfast at hotel", type: "eat", time: "08:00" },
      { title: "Lunch", type: "eat", time: "12:30" },
      { title: "Dinner", type: "eat", time: "18:30" }
    ],
    transport: [
      { title: "Hotel shuttle", type: "travel", time: "09:00" },
      { title: "Grab to location", type: "travel", time: "10:00" },
      { title: "Return to hotel", type: "travel", time: "17:00" }
    ],
    kids: [
      { title: "Kids' nap time", type: "nap", time: "13:00" },
      { title: "Pool time", type: "outdoor", time: "16:00" },
      { title: "Kids' club", type: "indoor", time: "10:00" }
    ]
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && time) {
      const newActivity = {
        id: generateId(),
        title,
        time,
        type,
        notes: notes || undefined,
        cost: cost ? parseFloat(cost) : undefined,
        currency: 'THB',
        createdAt: new Date(),
        completed: false
      };
      onAdd(newActivity);
    }
  };
  
  const handleQuickAdd = (template) => {
    const newActivity = {
      id: generateId(),
      title: template.title,
      time: template.time,
      type: template.type,
      createdAt: new Date(),
      completed: false
    };
    onAdd(newActivity);
  };
  
  return (
    <div className="mt-3 p-4 bg-sky-50 rounded-lg border border-sky-200">
      {/* Quick Add Templates */}
      {showQuickAdd ? (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-slate-700">Quick Add:</p>
            <button
              type="button"
              onClick={() => setShowQuickAdd(false)}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Custom →
            </button>
          </div>
          <div className="space-y-2">
            {Object.entries(templates).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs text-slate-500 uppercase mb-1">{category}</p>
                <div className="grid grid-cols-1 gap-1">
                  {items.map((template, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickAdd(template)}
                      className="text-left px-3 py-2 text-sm bg-white rounded border hover:bg-sky-50 
                               hover:border-sky-300 transition-colors"
                    >
                      <span className="font-medium">{template.title}</span>
                      <span className="text-slate-500 ml-2">{template.time}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-slate-700">Add Activity:</p>
            <button
              type="button"
              onClick={() => setShowQuickAdd(true)}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Quick Add →
            </button>
          </div>
          
          <input 
            type="text" 
            placeholder="Activity name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-sky-500 
                     focus:border-sky-500"
            autoFocus
            required
          />
          
          <div className="grid grid-cols-2 gap-2">
            <input 
              type="time" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-sky-500 
                       focus:border-sky-500"
              required
            />
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-sky-500 
                       focus:border-sky-500"
            >
              <option value="travel">🛫 Travel</option>
              <option value="eat">🍽️ Meal</option>
              <option value="nap">😴 Nap/Rest</option>
              <option value="indoor">🏠 Indoor Activity</option>
              <option value="outdoor">🌳 Outdoor Activity</option>
              <option value="mixed">🎭 Mixed Activity</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <input 
              type="text" 
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-sky-500 
                       focus:border-sky-500"
            />
            <input 
              type="number" 
              placeholder="Cost ฿ (optional)"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-sky-500 
                       focus:border-sky-500"
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              type="submit" 
              className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-md text-sm font-semibold 
                       hover:bg-sky-700 transition-colors"
            >
              Add Activity
            </button>
            <button 
              type="button" 
              onClick={onCancel} 
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md text-sm font-semibold 
                       hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddActivityForm;
