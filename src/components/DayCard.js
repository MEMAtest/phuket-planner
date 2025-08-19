import React, { useState, useEffect } from 'react';
import { TRIP_DATA, Icons } from '../data/staticData';
import AddActivityForm from './AddActivityForm';
import WeatherWidget from './WeatherWidget';
import ExpenseTracker from './ExpenseTracker';
import ActivityNotes from './ActivityNotes';
import SmartSuggestions from './SmartSuggestions';
import NewsFeed from './NewsFeed';
import DailyPhrases from './DailyPhrases';
import { initializeExpenses, getExpenses } from '../services/expenseService';
import { useTrip } from '../context/TripContext';

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

// Helper functions
const getTypeIcon = (type, props = { className: "w-5 h-5" }) => {
  const iconMap = {
    travel: <Icons.plane {...props} />,
    eat: <Icons.utensils {...props} />,
    nap: <Icons.clock {...props} />,
    indoor: <Icons.bookOpen {...props} />,
    outdoor: <Icons.sun {...props} />,
    mixed: <Icons.ferrisWheel {...props} />
  };
  return iconMap[type] || <Icons.ferrisWheel {...props} />;
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

// Undo notification component
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
        <Icons.checkCircle className="w-5 h-5" />
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
        <Icons.x className="w-4 h-4" />
      </button>
    </div>
  );
};

const DayCard = ({ dayData, dayIndex, onUpdatePlan, planData }) => {
  const { undoLastOperation, showNotification, syncStatus } = useTrip();
  const recommendations = TRIP_DATA.recommendations[dayData.location] || [];
  const fact = TRIP_DATA.phuketFacts[dayIndex % TRIP_DATA.phuketFacts.length];
  const [isAdding, setIsAdding] = useState(false);
  const [expandedActivity, setExpandedActivity] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expenses, setExpenses] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [showUndoNotification, setShowUndoNotification] = useState(false);
  const [lastAddedActivity, setLastAddedActivity] = useState(null);

  useEffect(() => {
    // Initialize expenses if needed
    if (!getExpenses()) {
      initializeExpenses(planData || [dayData]);
    }
    setExpenses(getExpenses());

    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, [dayData, planData]);

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
    setLastAddedActivity(itemWithId);
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
    }
  };

  const toggleActivityExpansion = (blockId) => {
    setExpandedActivity(expandedActivity === blockId ? null : blockId);
  };

  const handleExpenseAdded = () => {
    setExpenses(getExpenses());
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header Section with Sync Status */}
      <div className="p-4 bg-slate-50 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Day Info */}
          <div>
            <p className="text-xs font-semibold text-sky-600">
              {dayData.dow.toUpperCase()}
            </p>
            <h2 className="text-xl font-bold text-slate-800">
              {new Date(dayData.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              📍 {dayData.location === 'maiKhao' ? 'Mai Khao Area' : 'Phuket Old Town'}
            </p>
            {/* Sync Status Indicator */}
            <div className="flex items-center gap-2 mt-2">
              {syncStatus === 'syncing' && (
                <span className="text-xs text-blue-600 flex items-center gap-1">
                  <Icons.loader className="w-3 h-3 animate-spin" />
                  Syncing...
                </span>
              )}
              {syncStatus === 'synced' && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <Icons.cloud className="w-3 h-3" />
                  Synced
                </span>
              )}
              {syncStatus === 'error' && (
                <span className="text-xs text-amber-600 flex items-center gap-1">
                  <Icons.alertTriangle className="w-3 h-3" />
                  Local only
                </span>
              )}
            </div>
          </div>
          
          {/* Weather Widget */}
          <div className="flex-1 max-w-sm">
            <WeatherWidget 
              location={dayData.location} 
              date={dayData.date}
              onWeatherUpdate={setWeatherData}
            />
          </div>
        </div>
      </div>

      {/* Smart Suggestions */}
      <div className="p-4 border-b">
        <SmartSuggestions
          currentTime={currentTime}
          dayData={dayData}
          weatherData={weatherData}
          expenses={expenses?.days?.[dayData.date]}
        />
      </div>

      {/* News Feed */}
      <div className="p-4 border-b">
        <NewsFeed
          location={dayData.location}
          date={dayData.date}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Left Column - Timeline & Expenses */}
        <div className="lg:col-span-3 p-4">
          {/* Expense Tracker */}
          <div className="mb-4">
            <ExpenseTracker
              date={dayData.date}
              activityId={null}
              onExpenseAdded={handleExpenseAdded}
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
            {dayData.blocks.map(block => (
              <div key={block.id}>
                <div 
                  className="flex items-center group cursor-pointer hover:bg-slate-50 rounded-lg p-2 transition-colors"
                  onClick={() => toggleActivityExpansion(block.id)}
                >
                  <div className={`p-2 rounded-full ${getTypeColor(block.type)} mr-3`}>
                    {getTypeIcon(block.type)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-slate-800">
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
                  <Icons.chevronDown 
                    className={`w-4 h-4 text-slate-400 transition-transform
                      ${expandedActivity === block.id ? 'rotate-180' : ''}`}
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(block.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity 
                             text-rose-500 hover:text-rose-700 p-1 ml-2"
                  >
                    <Icons.trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Expanded Activity Details */}
                {expandedActivity === block.id && (
                  <div className="ml-11 mt-2">
                    <ActivityNotes
                      activityId={block.id}
                      activityTitle={block.title}
                      date={dayData.date}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Activity Button/Form */}
          {isAdding ? (
            <AddActivityForm 
              onAdd={handleAddItem} 
              onCancel={() => setIsAdding(false)} 
            />
          ) : (
            <button 
              onClick={() => setIsAdding(true)} 
              className="mt-3 w-full text-left flex items-center gap-2 text-sm 
                       font-semibold text-sky-600 hover:text-sky-800 p-2 
                       rounded-lg hover:bg-sky-50 transition-colors"
            >
              <Icons.plusCircle className="w-5 h-5" />
              Add Activity
            </button>
          )}
        </div>

        {/* Right Column - Recommendations & Facts */}
        <div className="lg:col-span-2 p-4 bg-slate-50 lg:border-l">
          {/* Local Options */}
          <h3 className="font-semibold text-slate-700 mb-3">Local Options</h3>
          <div className="space-y-3 mb-4">
            {recommendations.map(item => (
              <div 
                key={item.name} 
                className="bg-white rounded-lg p-3 flex items-start gap-3 
                         border hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 mt-1 text-sky-600">
                  {item.type === 'eat' ? (
                    <Icons.utensils className="w-5 h-5" />
                  ) : (
                    <Icons.ferrisWheel className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <a 
                    href={item.map} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-semibold text-sm text-slate-800 
                             hover:text-sky-600 transition-colors"
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
                  <Icons.star className="w-3 h-3 fill-current" />
                  <span>{item.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Thai Phrases for Today */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-2">
              Today's Thai Phrases
            </h3>
            <DailyPhrases dayData={dayData} dayIndex={dayIndex} />
          </div>

          {/* Phuket Fact of the Day */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-2">
              Phuket Fact of the Day
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
