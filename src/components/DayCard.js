import React, { useState } from 'react';
import { PlanDay, Activity } from '../types';
import { Icons, TRIP_DATA } from '../data/staticData';
import { getWeatherIcon, getTypeIcon, getTypeColor, formatDate, getWeatherRecommendations } from '../utils/helpers';
import AddActivityForm from './AddActivityForm';

interface DayCardProps {
  dayData: PlanDay;
  dayIndex: number;
  onUpdatePlan: (dayIndex: number, updatedBlocks: Activity[]) => void;
}

const DayCard: React.FC<DayCardProps> = ({ dayData, dayIndex, onUpdatePlan }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [completedActivities, setCompletedActivities] = useState<Set<string | number>>(new Set());
  
  const forecast = TRIP_DATA.forecast.find(f => f.date === dayData.date);
  const recommendations = TRIP_DATA.recommendations[dayData.location] || [];
  const fact = TRIP_DATA.phuketFacts[dayIndex % TRIP_DATA.phuketFacts.length];
  const weatherRecs = forecast ? getWeatherRecommendations(forecast.summary) : null;
  
  // Calculate day progress
  const completedCount = dayData.blocks.filter(b => completedActivities.has(b.id)).length;
  const progressPercentage = dayData.blocks.length > 0 
    ? (completedCount / dayData.blocks.length) * 100 
    : 0;
  
  const handleAddItem = (newItem: Activity) => {
    const updatedBlocks = [...dayData.blocks, newItem].sort((a, b) => 
      (a.time || "99").localeCompare(b.time || "99")
    );
    onUpdatePlan(dayIndex, updatedBlocks);
    setIsAdding(false);
  };
  
  const handleRemoveItem = (blockId: string | number) => {
    onUpdatePlan(dayIndex, dayData.blocks.filter(b => b.id !== blockId));
    setCompletedActivities(prev => {
      const newSet = new Set(prev);
      newSet.delete(blockId);
      return newSet;
    });
  };
  
  const handleToggleComplete = (blockId: string | number) => {
    setCompletedActivities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(blockId)) {
        newSet.delete(blockId);
      } else {
        newSet.add(blockId);
      }
      return newSet;
    });
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header with Weather */}
      <div className="p-4 bg-slate-50 border-b">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold text-sky-600">{dayData.dow.toUpperCase()}</p>
            <h2 className="text-xl font-bold text-slate-800">{formatDate(dayData.date)}</h2>
            <p className="text-sm text-slate-500 mt-1">📍 {dayData.location === 'maiKhao' ? 'Mai Khao Area' : 'Old Town'}</p>
          </div>
          {forecast && (
            <div className="text-right">
              <div className="flex items-center gap-2">
                {getWeatherIcon(forecast.summary)}
                <span className="font-bold text-2xl text-slate-700">{forecast.hi}°</span>
                <span className="text-slate-500">{forecast.lo}°C</span>
              </div>
              <p className="text-xs text-slate-500 capitalize">{forecast.summary}</p>
            </div>
          )}
        </div>
        
        {/* Weather Recommendations */}
        {weatherRecs && (
          <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
              {weatherRecs.icon}
              <span>{weatherRecs.message}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Day Progress Bar */}
      {dayData.blocks.length > 0 && (
        <div className="px-4 pt-3">
          <div className="flex justify-between text-xs text-slate-600 mb-1">
            <span>Day Progress</span>
            <span>{completedCount}/{dayData.blocks.length} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-sky-400 to-sky-600 h-2 rounded-full transition-all duration-300"
              style={{width: `${progressPercentage}%`}}
            />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Timeline Section */}
        <div className="lg:col-span-3 p-4">
          <h3 className="font-semibold text-slate-700 mb-3">Timeline</h3>
          <div className="space-y-2">
            {dayData.blocks.map(block => {
              const isCompleted = completedActivities.has(block.id);
              return (
                <div key={block.id} className={`flex items-center group ${isCompleted ? 'opacity-60' : ''}`}>
                  <button 
                    onClick={() => handleToggleComplete(block.id)}
                    className="mr-2 flex-shrink-0"
                  >
                    {isCompleted ? 
                      <Icons.checkSquare className="w-5 h-5 text-green-600"/> : 
                      <Icons.square className="w-5 h-5 text-gray-300 hover:text-gray-400"/>
                    }
                  </button>
                  <div className={`p-2 rounded-full ${getTypeColor(block.type)}`}>
                    {getTypeIcon(block.type)}
                  </div>
                  <div className="flex-grow ml-3">
                    <p className={`font-medium text-sm text-slate-800 ${isCompleted ? 'line-through' : ''}`}>
                      {block.title}
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="text-xs text-slate-500">{block.time}</p>
                      {block.notes && (
                        <p className="text-xs text-slate-400 italic">{block.notes}</p>
                      )}
                      {block.cost && (
                        <p className="text-xs font-semibold text-emerald-600">฿{block.cost}</p>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(block.id)} 
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-rose-500 
                             hover:text-rose-700 p-1 ml-2"
                  >
                    <Icons.trash2 className="w-4 h-4"/>
                  </button>
                </div>
              );
            })}
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
              className="mt-3 w-full text-left flex items-center gap-2 text-sm font-semibold 
                       text-sky-600 hover:text-sky-800 p-2 rounded-lg hover:bg-sky-50 transition-colors"
            >
              <Icons.plusCircle className="w-5 h-5"/> 
              Add Activity
            </button>
          )}
        </div>
        
        {/* Recommendations Section */}
        <div className="lg:col-span-2 p-4 bg-slate-50 lg:border-l">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-slate-700">Local Options</h3>
            <button
              onClick={() => setShowRecommendations(!showRecommendations)}
              className="lg:hidden text-xs text-slate-500"
            >
              {showRecommendations ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {showRecommendations && (
            <>
              <div className="space-y-3 mb-4">
                {recommendations.map(item => (
                  <div key={item.name} className="bg-white rounded-lg p-3 flex items-start gap-3 border 
                                                 hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 mt-1 text-sky-600">
                      {item.type === 'eat' ? 
                        <Icons.utensils className="w-5 h-5"/> : 
                        <Icons.ferrisWheel className="w-5 h-5"/>
                      }
                    </div>
                    <div className="flex-1">
                      <a 
                        href={item.map} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-semibold text-sm text-slate-800 hover:text-sky-600 transition-colors"
                      >
                        {item.name}
                      </a>
                      <p className="text-xs text-slate-500 mt-0.5">{item.notes}</p>
                      <p className="text-xs font-semibold text-slate-600 mt-1">🚗 {item.travelTime}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600 
                                  bg-amber-100 px-2 py-1 rounded-full">
                      <Icons.star className="w-3 h-3 fill-current" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Daily Fact */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Icons.lightbulb className="w-4 h-4 text-amber-500"/>
                  Phuket Fact of the Day
                </h3>
                <p className="text-sm text-slate-600 italic">"{fact}"</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayCard;
