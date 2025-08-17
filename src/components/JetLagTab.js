import React, { useState, useEffect } from 'react';
import { Icons, TRIP_DATA } from '../data/staticData';
import { JetLagTask } from '../types';

const JetLagTab: React.FC = () => {
  const [tasks, setTasks] = useState<JetLagTask[]>(() => {
    // Load from localStorage or use defaults
    const saved = localStorage.getItem('jetLagTasks');
    if (saved) {
      return JSON.parse(saved);
    }
    return TRIP_DATA.jetLagTasks.map(task => ({ ...task, completed: false }));
  });
  
  const [lastCompletedId, setLastCompletedId] = useState<string | null>(null);
  
  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('jetLagTasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const toggleTask = (id: string) => {
    let isCompleting = false;
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        if (!task.completed) isCompleting = true;
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
    
    if (isCompleting) {
      setLastCompletedId(id);
      // Hide the nudge after 5 seconds
      setTimeout(() => setLastCompletedId(null), 5000);
    } else if (lastCompletedId === id) {
      setLastCompletedId(null);
    }
  };
  
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = (completedCount / tasks.length) * 100;
  
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-bold text-2xl text-slate-800 mb-2 flex items-center gap-2">
          <Icons.moon className="w-6 h-6 text-sky-600"/>
          Jet Lag Plan: UK → Phuket (+6h)
        </h2>
        <p className="text-sm text-slate-600">
          Follow these steps to minimize jet lag and help your family adjust quickly to the new time zone.
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>Progress</span>
          <span>{completedCount} of {tasks.length} completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{width: `${progressPercentage}%`}}
          />
        </div>
      </div>
      
      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id}>
            <div 
              className={`
                p-4 rounded-lg border-2 flex items-start gap-3 transition-all duration-300
                ${task.completed 
                  ? 'bg-slate-50 border-slate-200 opacity-60' 
                  : 'bg-white border-slate-300 hover:border-sky-300'}
              `}
            >
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTask(task.id)} 
                className="mt-1 h-5 w-5 rounded border-gray-300 text-sky-600 
                         focus:ring-sky-500 cursor-pointer"
              />
              <div className="flex-1">
                <h3 className={`font-semibold text-slate-800 ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </h3>
                <p className={`text-sm text-slate-600 mt-1 ${task.completed ? 'line-through' : ''}`}>
                  {task.text}
                </p>
              </div>
            </div>
            
            {/* Success Nudge */}
            {lastCompletedId === task.id && (
              <div className="mt-2 p-3 bg-gradient-to-r from-sky-50 to-indigo-50 text-sky-800 
                            text-sm font-semibold rounded-lg flex items-center gap-2 
                            animate-fade-in border border-sky-200">
                <Icons.lightbulb className="w-5 h-5 text-amber-500"/>
                <span>{task.nudge}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Tips Section */}
      <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <h3 className="font-semibold text-indigo-900 mb-2">💡 Pro Tips:</h3>
        <ul className="space-y-1 text-sm text-indigo-800">
          <li>• Hydration is key - drink plenty of water during the flight</li>
          <li>• Avoid heavy meals on the plane; eat light and at Phuket meal times</li>
          <li>• Resist the urge to let kids nap too long on arrival day</li>
          <li>• Use blackout curtains in the hotel to help with early morning wake-ups</li>
        </ul>
      </div>
    </div>
  );
};

export default JetLagTab;
