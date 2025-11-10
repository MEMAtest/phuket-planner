import React, { useState, useEffect, useMemo } from 'react';
import AddActivityForm from './AddActivityForm';
import WeatherWidget from './WeatherWidget';
import ExpenseTracker from './ExpenseTracker';
import ActivityNotes from './ActivityNotes';
import NewsFeed from './NewsFeed';
import DailyPhrases from './DailyPhrases';
import { useTrip } from '../context/TripContext';
import { useCountry } from '../state/CountryContext';
import { getTripPreset } from '../data/itineraryContent';

// Activity badge component
const ActivityBadge = ({ type }) => {
  const getBadgeInfo = (type) => {
    switch(type) {
      case 'indoor':
        return { icon: '🏠', label: 'Indoor', color: 'bg-indigo-100 text-indigo-700' };
      case 'outdoor':
        return { icon: '☀️', label: 'Outdoor', color: 'bg-emerald-100 text-emerald-700' };
      case 'mixed':
        return { icon: '🌤️', label: 'Mixed', color: 'bg-cyan-100 text-cyan-700' };
      case 'travel':
        return { icon: '✈️', label: 'Travel', color: 'bg-sky-100 text-sky-700' };
      case 'eat':
        return { icon: '🍽️', label: 'Meal', color: 'bg-rose-100 text-rose-700' };
      case 'nap':
        return { icon: '😴', label: 'Rest', color: 'bg-amber-100 text-amber-700' };
      default:
        return { icon: '🎯', label: 'Activity', color: 'bg-slate-100 text-slate-700' };
    }
  };
  
  const badge = getBadgeInfo(type);
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
      <span>{badge.icon}</span>
      <span>{badge.label}</span>
    </span>
  );
};

// Helper functions - FIXED to use emojis
const getTypeIcon = (type) => {
  const iconMap = {
    travel: '✈️',
    eat: '🍴',
    nap: '⏰',
    indoor: '📚',
    outdoor: '☀️',
    mixed: '🎡'
  };
  return <span className="text-lg">{iconMap[type] || '🎯'}</span>;
};

const getTypeColor = (type) => {
  const colorMap = {
    travel: 'bg-sky-100 text-sky-800',
    eat: 'bg-rose-100 text-rose-800',
    nap: 'bg-amber-100 text-amber-800',
    indoor: 'bg-indigo-100 text-indigo-800',
    outdoor: 'bg-emerald-100 text-emerald-800',
    mixed: 'bg-cyan-100 text-cyan-800'
  };
  return colorMap[type] || 'bg-slate-100 text-slate-800';
};

// Undo notification component - FIXED to use emojis
const UndoNotification = ({ onUndo, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onClose]);
  
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-up flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span>✅</span>
        <span>Activity added successfully!</span>
      </div>
      <button
        onClick={onUndo}
        className="px-3 py-1 bg-white text-green-600 rounded-md font-semibold hover:bg-green-50 transition-colors"
      >
        Undo ({timeLeft}s)
      </button>
      <button
        onClick={onClose}
        className="text-white hover:text-green-100"
      >
        <span>✕</span>
      </button>
    </div>
  );
};

const DayCard = ({ dayData, dayIndex, onUpdatePlan, planData }) => {
  const { undoLastOperation, showNotification, syncStatus, tripDates } = useTrip();
  const { country } = useCountry();
  const displayDate = useMemo(() => {
    const activeTripDates = tripDates?.[country.iso2];
    if (activeTripDates?.startDate) {
      const start = new Date(activeTripDates.startDate);
      if (!Number.isNaN(start.getTime())) {
        const projected = new Date(start);
        projected.setDate(start.getDate() + dayIndex);
        return projected;
      }
    }
    const fallback = new Date(dayData.date);
    return Number.isNaN(fallback.getTime()) ? new Date() : fallback;
  }, [tripDates, country.iso2, dayIndex, dayData.date]);
  const displayDateISO = useMemo(() => displayDate.toISOString().split('T')[0], [displayDate]);
  const itineraryPreset = useMemo(() => getTripPreset(country.iso2), [country.iso2]);
  const completionStorageKey = useMemo(() => `completed_activities_${country.iso2}`, [country.iso2]);
  const localOptions =
    country.highlights?.localOptions?.length
      ? country.highlights.localOptions
      : itineraryPreset.recommendations?.[dayData.location] || [];
  const factSource =
    country.highlights?.facts?.length
      ? country.highlights.facts
      : itineraryPreset.facts || [];
  const fact =
    factSource.length > 0
      ? factSource[dayIndex % factSource.length]
      : 'Explore like a local wherever you are!';
  const locationLabel = dayData.locationLabel || dayData.focus || dayData.location || country.name;
  const [isAdding, setIsAdding] = useState(false);
  const [expandedActivity, setExpandedActivity] = useState(null);
  const [showUndoNotification, setShowUndoNotification] = useState(false);
  const [completedActivities, setCompletedActivities] = useState({});

  // Load completed activities from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(completionStorageKey);
      if (saved) {
        setCompletedActivities(JSON.parse(saved));
      } else {
        setCompletedActivities({});
      }
    } catch (error) {
      console.error('Error loading completed activities:', error);
      setCompletedActivities({});
    }
  }, [completionStorageKey]);

  // Toggle activity completion
  const toggleActivityComplete = (activityId) => {
    const activityKey = `${displayDateISO}_${activityId}`;
    const newCompleted = { ...completedActivities };
    
    newCompleted[activityKey] = !newCompleted[activityKey];
    
    setCompletedActivities(newCompleted);
    try {
      localStorage.setItem(completionStorageKey, JSON.stringify(newCompleted));
    } catch (error) {
      console.error('Error saving completed activities:', error);
    }
  };

  // Check if activity is completed
  const isActivityCompleted = (activityId) => {
    const activityKey = `${displayDateISO}_${activityId}`;
    return completedActivities[activityKey] || false;
  };

  // Get completion stats
  const getCompletionStats = () => {
    const total = dayData.blocks.length;
    const completed = dayData.blocks.filter(block => isActivityCompleted(block.id)).length;
    return { total, completed };
  };

  const handleAddItem = (newItem) => {
    // Ensure the item has a unique ID and timestamp
    const itemWithId = {
      ...newItem,
      id: newItem.id || `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      addedAt: new Date().toISOString()
    };
    
    // Sort and update
    const updatedBlocks = [...dayData.blocks, itemWithId].sort(
      (a, b) => (a.time || "99").localeCompare(b.time || "99")
    );
    
    // Update through context (which handles persistence)
    onUpdatePlan(dayIndex, updatedBlocks);
    setIsAdding(false);
    setShowUndoNotification(true);
    
    // Log for debugging
    console.log('✨ Activity added:', itemWithId);
  };

  const handleUndo = () => {
    const success = undoLastOperation();
    if (success) {
      setShowUndoNotification(false);
      showNotification('↩️ Activity removed', 'info');
      console.log('↩️ Undo successful');
    }
  };

  const handleRemoveItem = (blockId) => {
    // Find the activity being removed
    const removedActivity = dayData.blocks.find(b => b.id === blockId);
    
    if (removedActivity) {
      onUpdatePlan(dayIndex, dayData.blocks.filter(b => b.id !== blockId));
      showNotification(`🗑️ Removed: ${removedActivity.title}`, 'info');
      console.log('🗑️ Activity removed:', removedActivity);
      
      // Also remove from completed activities
      const activityKey = `${displayDateISO}_${blockId}`;
      const newCompleted = { ...completedActivities };
      delete newCompleted[activityKey];
      setCompletedActivities(newCompleted);
      localStorage.setItem(completionStorageKey, JSON.stringify(newCompleted));
    }
  };

  const toggleActivityExpansion = (blockId) => {
    setExpandedActivity(expandedActivity === blockId ? null : blockId);
  };

  // Prevent event bubbling for interactive elements
  const handleInteraction = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const stats = getCompletionStats();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header Section with Sync Status - NO TOUCH HANDLERS HERE */}
      <div className="p-4 bg-slate-50 border-b" onClick={handleInteraction}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Day Info */}
          <div>
            <p className="text-xs font-semibold text-sky-600">
              {dayData.dow.toUpperCase()}
            </p>
            <h2 className="text-xl font-bold text-slate-800">
              {displayDate.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              📍 {locationLabel}
            </p>
            {/* Sync Status Indicator - FIXED to use emojis */}
            <div className="flex items-center gap-2 mt-2">
              {syncStatus === 'syncing' && (
                <span className="text-xs text-blue-600 flex items-center gap-1">
                  <span className="animate-spin">⏳</span>
                  Syncing...
                </span>
              )}
              {syncStatus === 'synced' && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <span>☁️</span>
                  Synced
                </span>
              )}
              {syncStatus === 'error' && (
                <span className="text-xs text-amber-600 flex items-center gap-1">
                  <span>⚠️</span>
                  Local only
                </span>
              )}
              {/* Completion Progress */}
              {stats.total > 0 && (
                <span className="text-xs font-medium text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">
                  {stats.completed}/{stats.total} completed
                  {stats.completed === stats.total && ' 🎉'}
                </span>
              )}
            </div>
          </div>
          
          {/* Weather Widget - Has its own event handling */}
          <div className="flex-1 max-w-sm">
            <WeatherWidget 
              date={displayDateISO}
            />
          </div>
        </div>
      </div>

      {/* News Feed - NO TOUCH HANDLERS */}
      <div className="p-4 border-b" onClick={handleInteraction}>
        <NewsFeed
          date={displayDateISO}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Left Column - Timeline & Expenses - NO TOUCH HANDLERS ON INTERACTIVE ELEMENTS */}
        <div className="lg:col-span-3 p-4">
          {/* Expense Tracker */}
          <div className="mb-4" onClick={handleInteraction}>
            <ExpenseTracker
              date={displayDateISO}
              activityId={null}
            />
          </div>

          {/* Timeline */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-700">Timeline</h3>
            <span className="text-xs text-slate-500">
              {dayData.blocks.length} activities
            </span>
          </div>
          
          <div className="space-y-2">
            {dayData.blocks.map(block => {
              const isCompleted = isActivityCompleted(block.id);
              
              return (
                <div key={block.id}>
                  <div 
                    className={`flex items-center group cursor-pointer hover:bg-slate-50 rounded-lg p-2 transition-colors
                              ${isCompleted ? 'opacity-60' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleActivityExpansion(block.id);
                    }}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActivityComplete(block.id);
                      }}
                      className={`mr-3 w-5 h-5 rounded border-2 flex items-center justify-center
                                transition-colors cursor-pointer flex-shrink-0
                                ${isCompleted 
                                  ? 'bg-green-500 border-green-500' 
                                  : 'bg-white border-slate-400 hover:border-green-500'}`}
                      aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {isCompleted && (
                        <span className="text-white text-xs font-bold">✓</span>
                      )}
                    </button>
                    
                    <div className={`p-2 rounded-full ${getTypeColor(block.type)} mr-3`}>
                      {getTypeIcon(block.type)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <p className={`font-medium text-sm text-slate-800 
                                    ${isCompleted ? 'line-through' : ''}`}>
                          {block.title}
                        </p>
                        {/* Activity badge */}
                        <ActivityBadge type={block.type} />
                        {/* New indicator if recently added */}
                        {block.addedAt && new Date(block.addedAt) > new Date(Date.now() - 60000) && (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{block.time}</p>
                    </div>
                    {/* FIXED chevron icon */}
                    <span className={`text-slate-400 transition-transform
                      ${expandedActivity === block.id ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(block.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity 
                               text-rose-500 hover:text-rose-700 p-1 ml-2"
                    >
                      <span>🗑️</span>
                    </button>
                  </div>
                  
                  {/* Expanded Activity Details */}
                  {expandedActivity === block.id && (
                    <div className="ml-11 mt-2" onClick={handleInteraction}>
                      <ActivityNotes
                        activityId={block.id}
                        activityTitle={block.title}
                        date={dayData.date}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add Activity Button/Form - NO TOUCH HANDLERS */}
          {isAdding ? (
            <div onClick={handleInteraction}>
              <AddActivityForm 
                onAdd={handleAddItem} 
                onCancel={() => setIsAdding(false)} 
              />
            </div>
          ) : (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsAdding(true);
              }}
              className="mt-3 w-full text-left flex items-center gap-2 text-sm 
                       font-semibold text-sky-600 hover:text-sky-800 p-2 
                       rounded-lg hover:bg-sky-50 transition-colors"
            >
              <span>➕</span>
              Add Activity
            </button>
          )}
        </div>

        {/* Right Column - Recommendations & Facts - NO TOUCH HANDLERS */}
        <div className="lg:col-span-2 p-4 bg-slate-50 lg:border-l" onClick={handleInteraction}>
          {/* Local Options */}
          <h3 className="font-semibold text-slate-700 mb-3">
            Local Picks in {country.name}
          </h3>
          <div className="space-y-3 mb-4">
            {localOptions.map(item => (
              <div 
                key={item.name} 
                className="bg-white rounded-lg p-3 flex items-start gap-3 
                         border hover:shadow-md transition-shadow"
                onClick={handleInteraction}
              >
                <div className="flex-shrink-0 mt-1 text-sky-600">
                  {item.type === 'eat' ? (
                    <span className="text-lg">🍴</span>
                  ) : (
                    <span className="text-lg">🎡</span>
                  )}
                </div>
                <div className="flex-1">
                  <a 
                    href={item.map} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-semibold text-sm text-slate-800 
                             hover:text-sky-600 transition-colors"
                    onClick={handleInteraction}
                  >
                    {item.name}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.notes}
                  </p>
                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    {item.travelTime}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold 
                              text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                  <span>⭐</span>
                  <span>{item.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Local Phrases for Today */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-2">
              Useful Phrases for {country.name}
            </h3>
            <DailyPhrases dayData={dayData} dayIndex={dayIndex} />
          </div>

          {/* Destination Fact of the Day */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-2">
              {country.name} Fact of the Day
            </h3>
            <p className="text-sm text-slate-600 italic">
              "{fact}"
            </p>
          </div>
        </div>
      </div>
      
      {/* Undo Notification */}
      {showUndoNotification && (
        <UndoNotification
          onUndo={handleUndo}
          onClose={() => setShowUndoNotification(false)}
        />
      )}
    </div>
  );
};

export default DayCard;
