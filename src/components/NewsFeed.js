import React, { useState, useEffect } from 'react';
import { Icons } from '../data/staticData';

const NewsFeed = ({ location, date }) => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all'); // all, events, warnings, tips
  
  // Static events data - in production, this could come from an API
  const allEvents = [
    {
      id: 1,
      type: 'event',
      date: '2025-08-24',
      title: 'Phuket Old Town Sunday Walking Street',
      description: 'Every Sunday 4-10pm. Great for souvenirs and street food.',
      location: 'oldTown',
      icon: '🎪',
      priority: 'info'
    },
    {
      id: 2,
      type: 'warning',
      date: '2025-08-20',
      dateRange: ['2025-08-20', '2025-08-28'],
      title: 'Jellyfish Season Advisory',
      description: 'Box jellyfish possible at beaches. Swim in designated areas only.',
      location: 'maiKhao',
      icon: '⚠️',
      priority: 'warning'
    },
    {
      id: 3,
      type: 'tip',
      date: null, // Always show
      title: 'Vegetarian Festival',
      description: 'Oct 2-11 (not during your visit). Restaurants may have limited meat options.',
      location: 'all',
      icon: '💡',
      priority: 'info'
    },
    {
      id: 4,
      type: 'event',
      date: '2025-08-22',
      title: 'Beach Cleanup Day',
      description: 'Join locals for beach cleanup 7-9am. Free breakfast provided.',
      location: 'maiKhao',
      icon: '🏖️',
      priority: 'success'
    },
    {
      id: 5,
      type: 'warning',
      date: null,
      dateRange: ['2025-08-24', '2025-08-27'],
      title: 'Expected Heavy Rain',
      description: 'Monsoon weather expected. Indoor activities recommended.',
      location: 'all',
      icon: '🌧️',
      priority: 'warning'
    },
    {
      id: 6,
      type: 'tip',
      date: null,
      title: 'ATM Tip',
      description: 'Yellow (Krungsri) and Purple (SCB) ATMs have lowest fees for foreign cards.',
      location: 'all',
      icon: '💳',
      priority: 'info'
    },
    {
      id: 7,
      type: 'event',
      date: '2025-08-26',
      title: 'Night Market Special',
      description: 'Chillva Market has live music Tuesday nights from 7pm.',
      location: 'oldTown',
      icon: '🎵',
      priority: 'info'
    },
    {
      id: 8,
      type: 'warning',
      date: null,
      title: 'Tourist Police Alert',
      description: 'Beware tuk-tuk scams. Always agree on price before riding.',
      location: 'all',
      icon: '🚨',
      priority: 'danger'
    },
    {
      id: 9,
      type: 'tip',
      date: null,
      title: '7-Eleven Hack',
      description: 'Buy mosquito repellent and after-sun at 7-Eleven for 1/3 hotel prices.',
      location: 'all',
      icon: '🏪',
      priority: 'success'
    },
    {
      id: 10,
      type: 'event',
      date: '2025-08-23',
      title: 'Saturday Night Bazaar',
      description: 'Naka Weekend Market open Sat-Sun. Best prices for souvenirs.',
      location: 'oldTown',
      icon: '🛍️',
      priority: 'info'
    }
  ];
  
  useEffect(() => {
    // Filter events based on date and location
    const currentDate = date ? new Date(date) : new Date();
    
    const relevantEvents = allEvents.filter(event => {
      // Check location relevance
      if (event.location !== 'all' && location && event.location !== location) {
        return false;
      }
      
      // Check date relevance
      if (event.date) {
        const eventDate = new Date(event.date);
        // Show events within 3 days
        const daysDiff = Math.abs((eventDate - currentDate) / (1000 * 60 * 60 * 24));
        return daysDiff <= 3;
      }
      
      // Check date range
      if (event.dateRange) {
        const startDate = new Date(event.dateRange[0]);
        const endDate = new Date(event.dateRange[1]);
        return currentDate >= startDate && currentDate <= endDate;
      }
      
      // Always show if no date specified
      return true;
    });
    
    setEvents(relevantEvents);
  }, [location, date]);
  
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.type === filter);
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'danger': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  const getTypeLabel = (type) => {
    switch(type) {
      case 'event': return 'Event';
      case 'warning': return 'Alert';
      case 'tip': return 'Tip';
      default: return type;
    }
  };
  
  if (events.length === 0) return null;
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Icons.alertTriangle className="w-5 h-5 text-amber-500" />
          Local Updates & Tips
        </h3>
        
        {/* Filter Buttons */}
        <div className="flex gap-1">
          {['all', 'events', 'warnings', 'tips'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                filter === f 
                  ? 'bg-slate-800 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredEvents.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">
            No {filter} for this date/location
          </p>
        ) : (
          filteredEvents.map(event => (
            <div
              key={event.id}
              className={`p-3 rounded-lg border ${getPriorityColor(event.priority)} 
                       flex items-start gap-3`}
            >
              <span className="text-lg flex-shrink-0">{event.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full 
                                  ${event.type === 'warning' ? 'bg-red-200 text-red-700' :
                                    event.type === 'event' ? 'bg-blue-200 text-blue-700' :
                                    'bg-green-200 text-green-700'}`}>
                    {getTypeLabel(event.type)}
                  </span>
                </div>
                <p className="text-xs mt-0.5 opacity-90">
                  {event.description}
                </p>
                {event.date && (
                  <p className="text-xs mt-1 opacity-75">
                    📅 {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Quick Safety Reminders */}
      <div className="mt-3 pt-3 border-t border-slate-200">
        <p className="text-xs text-slate-600">
          <strong>Quick Reminders:</strong> Tourist Police: 1155 • 
          Hospital: +66 76 254 425 • Always negotiate taxi prices first
        </p>
      </div>
    </div>
  );
};

export default NewsFeed;
