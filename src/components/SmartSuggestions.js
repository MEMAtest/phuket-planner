import React, { useState, useEffect } from 'react';
import { Icons } from '../data/staticData';

const SmartSuggestions = ({ currentTime, dayData, weatherData, expenses }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [dismissedSuggestions, setDismissedSuggestions] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Load dismissed suggestions from localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const savedDismissed = localStorage.getItem(`dismissed_suggestions_${today}`);
    if (savedDismissed) {
      setDismissedSuggestions(JSON.parse(savedDismissed));
    }
    
    // Clear old dismissed suggestions from previous days
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (key.startsWith('dismissed_suggestions_') && !key.includes(today)) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  useEffect(() => {
    generateSuggestions();
    // Update suggestions every minute
    const interval = setInterval(generateSuggestions, 60000);
    return () => clearInterval(interval);
  }, [currentTime, dayData, weatherData, expenses, dismissedSuggestions]);

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
        action: 'View nearby restaurants',
        actionType: 'food'
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
        action: 'Set nap reminder',
        actionType: 'reminder'
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
        action: 'Find nearby cafes',
        actionType: 'food'
      });
    }

    // Enhanced UV/Sun protection based on actual weather
    if (weatherData?.uvi >= 6 && hour >= 10 && hour < 16) {
      newSuggestions.push({
        id: 'sunscreen',
        type: 'health',
        priority: 'high',
        icon: '☀️',
        title: 'High UV Alert',
        message: `UV Index: ${weatherData.uvi} - Reapply sunscreen NOW! Seek shade for kids.`,
        action: 'Set 2-hour reminder',
        actionType: 'reminder'
      });
    } else if (hour === 10 && minute >= 30 && hour < 15) {
      newSuggestions.push({
        id: 'sunscreen-routine',
        type: 'health',
        priority: 'medium',
        icon: '🧴',
        title: 'Sun Protection',
        message: 'Peak UV hours (11am-3pm). Reapply sunscreen!',
        action: 'Set reminder',
        actionType: 'reminder'
      });
    }

    // Weather-based activity suggestions
    if (weatherData) {
      // Rain suggestions
      if (weatherData.isRaining || weatherData.rain > 2) {
        newSuggestions.push({
          id: 'rain',
          type: 'weather',
          priority: 'high',
          icon: '🌧️',
          title: 'Rain Alert',
          message: `${weatherData.rain}mm expected. Consider indoor activities or grab umbrellas`,
          action: 'View indoor options',
          actionType: 'indoor'
        });

        // Suggest indoor alternatives for outdoor activities
        const outdoorActivity = dayData?.blocks.find(b => 
          b.type === 'outdoor' && !isActivityPassed(b.time, hour, minute)
        );
        if (outdoorActivity) {
          newSuggestions.push({
            id: 'rain-alternative',
            type: 'weather',
            priority: 'high',
            icon: '🏠',
            title: 'Activity Alternative',
            message: `${outdoorActivity.title} may be affected by rain. Consider indoor backup`,
            action: 'Find alternatives',
            actionType: 'indoor'
          });
        }
      }

      // High humidity suggestions
      if (weatherData.humidity > 85) {
        newSuggestions.push({
          id: 'hydration',
          type: 'health',
          priority: 'medium',
          icon: '💧',
          title: 'High Humidity Alert',
          message: `${weatherData.humidity}% humidity - clothes will take longer to dry`,
          action: 'Pack extra clothes',
          actionType: 'info'
        });
      }

      // Temperature-based suggestions
      if (weatherData.temp > 33) {
        newSuggestions.push({
          id: 'heat',
          type: 'weather',
          priority: 'high',
          icon: '🥵',
          title: 'Heat Warning',
          message: `${weatherData.temp}°C - Avoid prolonged outdoor exposure 12-3pm`,
          action: 'Find AC venues',
          actionType: 'indoor'
        });
      }

      // Wind suggestions for beach activities
      if (weatherData.wind_speed > 5 && dayData?.location === 'maiKhao') {
        newSuggestions.push({
          id: 'wind',
          type: 'weather',
          priority: 'low',
          icon: '💨',
          title: 'Windy Beach Conditions',
          message: 'Strong winds at beach - secure belongings, watch for sand',
          action: 'Check beach flags',
          actionType: 'info'
        });
      }
    }

    // Activity-specific suggestions based on planned activities
    const currentActivity = dayData?.blocks.find(block => {
      if (!block.time || block.time === 'AM' || block.time === 'PM') return false;
      const [blockHour, blockMinute] = block.time.split(':').map(Number);
      const blockTime = blockHour * 60 + blockMinute;
      const currentTimeMinutes = hour * 60 + minute;
      return Math.abs(blockTime - currentTimeMinutes) < 30;
    });

    if (currentActivity) {
      // Travel suggestions
      if (currentActivity.type === 'travel') {
        newSuggestions.push({
          id: 'departure',
          type: 'logistics',
          priority: 'high',
          icon: '🚕',
          title: 'Departure Reminder',
          message: `${currentActivity.title} - Allow extra time for traffic`,
          action: 'Book Grab taxi',
          actionType: 'transport'
        });
      }

      // Restaurant suggestions
      if (currentActivity.type === 'eat') {
        newSuggestions.push({
          id: 'restaurant',
          type: 'meal',
          priority: 'medium',
          icon: '📍',
          title: 'Restaurant Navigation',
          message: `Heading to ${currentActivity.title}?`,
          action: 'Get directions',
          actionType: 'directions'
        });
      }

      // Outdoor activity weather check
      if (currentActivity.type === 'outdoor') {
        if (weatherData?.temp > 30) {
          newSuggestions.push({
            id: 'outdoor-heat',
            type: 'weather',
            priority: 'high',
            icon: '🌡️',
            title: 'Hot Weather Activity',
            message: `${weatherData.temp}°C for ${currentActivity.title} - Bring water & hats`,
            action: 'Pack cooling items',
            actionType: 'info'
          });
        }
      }
    }

    // Special activity suggestions (like elephant sanctuary)
    const hasElephantActivity = dayData?.blocks.some(b => 
      b.title.toLowerCase().includes('elephant') || 
      b.title.toLowerCase().includes('sanctuary')
    );
    
    if (hasElephantActivity) {
      newSuggestions.push({
        id: 'elephant-prep',
        type: 'activity',
        priority: 'medium',
        icon: '🐘',
        title: 'Elephant Sanctuary Visit',
        message: 'Wear closed shoes, bring change of clothes (may get muddy/wet)',
        action: 'Packing checklist',
        actionType: 'info'
      });

      if (weatherData?.isRaining) {
        newSuggestions.push({
          id: 'elephant-rain',
          type: 'activity',
          priority: 'high',
          icon: '🌧️🐘',
          title: 'Sanctuary Rain Advisory',
          message: 'Elephants active in rain but paths muddy. Bring raincoats!',
          action: 'Check tour status',
          actionType: 'info'
        });
      }
    }

    // Water park suggestions
    const hasWaterPark = dayData?.blocks.some(b => 
      b.title.toLowerCase().includes('splash') || 
      b.title.toLowerCase().includes('water park')
    );
    
    if (hasWaterPark) {
      if (weatherData?.temp < 28) {
        newSuggestions.push({
          id: 'waterpark-cool',
          type: 'activity',
          priority: 'medium',
          icon: '🏊',
          title: 'Cool Day for Water Park',
          message: `${weatherData.temp}°C - Pack towels & warm clothes for after`,
          action: 'Check opening hours',
          actionType: 'info'
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
        message: `${Math.round((expenses.todayTotal / expenses.dailyBudget) * 100)}% of daily budget spent`,
        action: 'View spending',
        actionType: 'expenses'
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
        action: 'Find food options',
        actionType: 'food'
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
        action: 'View restaurants',
        actionType: 'food'
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
        action: 'Set bedtime reminder',
        actionType: 'reminder'
      });
    }

    // Beach tide suggestions (if at Mai Khao)
    if (dayData?.location === 'maiKhao' && hour >= 6 && hour <= 18) {
      const isMorning = hour < 12;
      newSuggestions.push({
        id: 'beach-tide',
        type: 'activity',
        priority: 'low',
        icon: '🏖️',
        title: 'Beach Conditions',
        message: isMorning ? 'Low tide morning - great for walking & shells' : 
                            'High tide afternoon - better for swimming',
        action: 'Check tide times',
        actionType: 'info'
      });
    }

    // Filter out dismissed suggestions
    const activeSuggestions = newSuggestions.filter(
      s => !dismissedSuggestions.includes(s.id)
    );

    // Sort by priority
    activeSuggestions.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    setSuggestions(activeSuggestions);
  };

  const isActivityPassed = (activityTime, currentHour, currentMinute) => {
    if (!activityTime || !activityTime.includes(':')) return false;
    const [h, m] = activityTime.split(':').map(Number);
    const activityMinutes = h * 60 + m;
    const currentMinutes = currentHour * 60 + currentMinute;
    return activityMinutes < currentMinutes;
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
    const newDismissed = [...dismissedSuggestions, id];
    setDismissedSuggestions(newDismissed);
    
    // Save to localStorage for today only
    const today = new Date().toDateString();
    localStorage.setItem(`dismissed_suggestions_${today}`, JSON.stringify(newDismissed));
  };

  const handleAction = (suggestion) => {
    // Handle different action types
    switch(suggestion.actionType) {
      case 'food':
        // Filter to show only food-related suggestions
        setExpandedCategory('food');
        alert('Food recommendations: Check the "Local Options" section for restaurant suggestions');
        break;
      
      case 'indoor':
        // Show indoor activities
        setExpandedCategory('indoor');
        alert('Indoor options: Aquarium, Kids Club, Shopping Mall - check your itinerary for details');
        break;
      
      case 'reminder':
        // Set a reminder (for now just show alert)
        alert(`Reminder set! We'll notify you in 2 hours.`);
        dismissSuggestion(suggestion.id);
        break;
      
      case 'transport':
        // Open Grab in new tab
        window.open('https://www.grab.com/th/en/', '_blank');
        break;
      
      case 'directions':
        // Show directions info
        alert('For directions: Use Google Maps or ask hotel concierge for assistance');
        break;
      
      case 'expenses':
        // Scroll to expense tracker
        const expenseElement = document.querySelector('.expense-tracker');
        if (expenseElement) {
          expenseElement.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      
      case 'info':
      default:
        // Just dismiss the suggestion as acknowledged
        alert(suggestion.message);
        dismissSuggestion(suggestion.id);
        break;
    }
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
        {suggestions.length > 0 && (
          <span className="text-xs bg-sky-600 text-white px-2 py-0.5 rounded-full">
            {suggestions.length}
          </span>
        )}
      </h3>
      
      <div className="space-y-2">
        {suggestions.slice(0, 3).map(suggestion => (
          <div
            key={suggestion.id}
            className={`p-3 rounded-lg border ${getPriorityColor(suggestion.priority)} 
                     flex items-start gap-3 transition-all hover:shadow-md`}
          >
            <span className="text-lg flex-shrink-0">{suggestion.icon}</span>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{suggestion.title}</h4>
              <p className="text-xs mt-0.5 opacity-90">{suggestion.message}</p>
              <button 
                onClick={() => handleAction(suggestion)}
                className="text-xs font-medium mt-1 text-blue-600 hover:text-blue-800 
                         transition-colors cursor-pointer"
              >
                {suggestion.action} →
              </button>
            </div>
            <button
              onClick={() => dismissSuggestion(suggestion.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              title="Dismiss for today"
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
