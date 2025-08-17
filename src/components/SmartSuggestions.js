import React, { useState, useEffect } from 'react';
import { Icons } from '../data/staticData';

const SmartSuggestions = ({ currentTime, dayData, weatherData, expenses }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [dismissedSuggestions, setDismissedSuggestions] = useState([]);

  useEffect(() => {
    generateSuggestions();
    // Update suggestions every minute
    const interval = setInterval(generateSuggestions, 60000);
    return () => clearInterval(interval);
  }, [currentTime, dayData, weatherData, expenses]);

  const generateSuggestions = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const newSuggestions = [];

    // Time-based suggestions
    if (hour === 11 && minute >= 30) {
      newSuggestions.push({
        id: 'lunch',
        type: 'meal',
        priority: 'high',
        icon: '🍽️',
        title: 'Lunch Time Soon',
        message: 'Consider heading to lunch in 30 minutes to avoid crowds',
        action: 'View nearby restaurants'
      });
    }

    if (hour === 13 && minute >= 30) {
      newSuggestions.push({
        id: 'nap',
        type: 'rest',
        priority: 'medium',
        icon: '😴',
        title: 'Nap Time',
        message: 'Kids usually nap better after lunch. Head back soon?',
        action: 'Set nap reminder'
      });
    }

    if (hour === 16 && minute >= 0) {
      newSuggestions.push({
        id: 'snack',
        type: 'meal',
        priority: 'low',
        icon: '🍎',
        title: 'Snack Break',
        message: 'Good time for a light snack and drinks',
        action: 'Find nearby cafes'
      });
    }

    if (hour === 10 && minute >= 30 && hour < 15) {
      newSuggestions.push({
        id: 'sunscreen',
        type: 'health',
        priority: 'high',
        icon: '☀️',
        title: 'Sun Protection',
        message: 'Peak UV hours (11am-3pm). Reapply sunscreen!',
        action: 'Set reminder for 2 hours'
      });
    }

    // Weather-based suggestions
    if (weatherData?.isRaining) {
      newSuggestions.push({
        id: 'rain',
        type: 'weather',
        priority: 'high',
        icon: '🌧️',
        title: 'Rain Alert',
        message: 'Consider indoor activities or grab an umbrella',
        action: 'View indoor options'
      });
    }

    if (weatherData?.humidity > 85) {
      newSuggestions.push({
        id: 'hydration',
        type: 'health',
        priority: 'medium',
        icon: '💧',
        title: 'Stay Hydrated',
        message: 'High humidity - drink water frequently',
        action: 'Set water reminder'
      });
    }

    // Activity-based suggestions
    const currentActivity = dayData?.blocks.find(block => {
      if (!block.time || block.time === 'AM' || block.time === 'PM') return false;
      const [blockHour, blockMinute] = block.time.split(':').map(Number);
      const blockTime = blockHour * 60 + blockMinute;
      const currentTimeMinutes = hour * 60 + minute;
      return Math.abs(blockTime - currentTimeMinutes) < 30;
    });

    if (currentActivity) {
      if (currentActivity.type === 'travel') {
        newSuggestions.push({
          id: 'departure',
          type: 'logistics',
          priority: 'high',
          icon: '🚕',
          title: 'Departure Reminder',
          message: `${currentActivity.title} - Allow extra time for traffic`,
          action: 'Book Grab taxi'
        });
      }

      if (currentActivity.type === 'eat') {
        newSuggestions.push({
          id: 'restaurant',
          type: 'meal',
          priority: 'medium',
          icon: '📍',
          title: 'Restaurant Navigation',
          message: `Heading to ${currentActivity.title}?`,
          action: 'Get directions'
        });
      }
    }

    // Budget-based suggestions
    if (expenses?.todayTotal > expenses?.dailyBudget * 0.8) {
      newSuggestions.push({
        id: 'budget',
        type: 'finance',
        priority: 'medium',
        icon: '💰',
        title: 'Budget Alert',
        message: 'Approaching daily budget limit',
        action: 'View spending'
      });
    }

    // Kids-specific suggestions
    const timeSinceLastMeal = getTimeSinceLastMeal(dayData?.blocks, hour, minute);
    if (timeSinceLastMeal > 180) { // 3 hours
      newSuggestions.push({
        id: 'kids-hungry',
        type: 'meal',
        priority: 'high',
        icon: '🍪',
        title: 'Kids Might Be Hungry',
        message: "It's been 3+ hours since last meal/snack",
        action: 'Find food options'
      });
    }

    // Evening suggestions
    if (hour === 17 && minute >= 30) {
      newSuggestions.push({
        id: 'dinner-plan',
        type: 'meal',
        priority: 'medium',
        icon: '🍝',
        title: 'Dinner Planning',
        message: 'Consider making dinner reservations or heading out soon',
        action: 'View restaurants'
      });
    }

    if (hour === 19 && minute >= 0) {
      newSuggestions.push({
        id: 'bedtime-prep',
        type: 'rest',
        priority: 'low',
        icon: '🛁',
        title: 'Bedtime Routine',
        message: 'Start winding down for kids\' bedtime',
        action: 'Set bedtime reminder'
      });
    }

    // Filter out dismissed suggestions
    const activeSuggestions = newSuggestions.filter(
      s => !dismissedSuggestions.includes(s.id)
    );

    setSuggestions(activeSuggestions);
  };

  const getTimeSinceLastMeal = (blocks, currentHour, currentMinute) => {
    if (!blocks) return 999;
    
    const mealBlocks = blocks.filter(b => b.type === 'eat');
    if (mealBlocks.length === 0) return 999;
    
    const currentTimeMinutes = currentHour * 60 + currentMinute;
    let minTimeSince = 999;
    
    mealBlocks.forEach(block => {
      if (block.time && block.time.includes(':')) {
        const [h, m] = block.time.split(':').map(Number);
        const blockMinutes = h * 60 + m;
        if (blockMinutes < currentTimeMinutes) {
          minTimeSince = Math.min(minTimeSince, currentTimeMinutes - blockMinutes);
        }
      }
    });
    
    return minTimeSince;
  };

  const dismissSuggestion = (id) => {
    setDismissedSuggestions([...dismissedSuggestions, id]);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg p-4 border border-sky-200">
      <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
        <Icons.lightbulb className="w-5 h-5 text-amber-500" />
        Smart Suggestions
      </h3>
      
      <div className="space-y-2">
        {suggestions.slice(0, 3).map(suggestion => (
          <div
            key={suggestion.id}
            className={`p-3 rounded-lg border ${getPriorityColor(suggestion.priority)} 
                     flex items-start gap-3`}
          >
            <span className="text-lg">{suggestion.icon}</span>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{suggestion.title}</h4>
              <p className="text-xs mt-0.5 opacity-90">{suggestion.message}</p>
              <button className="text-xs font-medium mt-1 underline opacity-75 
                             hover:opacity-100">
                {suggestion.action}
              </button>
            </div>
            <button
              onClick={() => dismissSuggestion(suggestion.id)}
              className="text-slate-400 hover:text-slate-600"
            >
              <Icons.x className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      
      {suggestions.length > 3 && (
        <p className="text-xs text-slate-500 text-center mt-2">
          +{suggestions.length - 3} more suggestions
        </p>
      )}
    </div>
  );
};

export default SmartSuggestions;
