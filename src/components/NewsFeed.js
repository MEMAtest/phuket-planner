import React, { useState, useEffect } from 'react';

const NewsFeed = ({ location, date }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    fetchAndProcessNews();
    const interval = setInterval(fetchAndProcessNews, 4 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [date, location]);

  const fetchAndProcessNews = async () => {
    setLoading(true);
    const allAlerts = [];
    
    try {
      // Use simpler Google News RSS URL (no ceid parameter)
      const rssUrl = 'https://news.google.com/rss/search?q=Phuket+Thailand&hl=en';
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          // Show top 5 news items directly - no Groq needed
          const newsAlerts = data.items.slice(0, 5).map((item, idx) => {
            // Clean up the title (remove source)
            const title = item.title.split(' - ')[0];
            const source = item.title.split(' - ')[1] || 'News';
            
            // Extract clean description
            let description = '';
            if (item.description) {
              // Remove HTML tags
              description = item.description.replace(/<[^>]*>/g, '');
              // Limit length
              description = description.substring(0, 80) + '...';
            } else {
              description = `Source: ${source}`;
            }
            
            // Determine type and priority based on keywords
            let type = 'news';
            let priority = 'low';
            let icon = '📰';
            
            const lowerTitle = title.toLowerCase();
            if (lowerTitle.includes('storm') || lowerTitle.includes('warning') || lowerTitle.includes('alert')) {
              type = 'warning';
              priority = 'high';
              icon = '⚠️';
            } else if (lowerTitle.includes('festival') || lowerTitle.includes('event') || lowerTitle.includes('celebration')) {
              type = 'event';
              priority = 'medium';
              icon = '🎉';
            } else if (lowerTitle.includes('rain') || lowerTitle.includes('weather')) {
              icon = '🌧️';
            } else if (lowerTitle.includes('tourist') || lowerTitle.includes('travel')) {
              icon = '✈️';
            }
            
            return {
              id: `news_${Date.now()}_${idx}`,
              type: type,
              title: title.substring(0, 60),
              description: description,
              priority: priority,
              icon: icon,
              dismissible: true
            };
          });
          
          allAlerts.push(...newsAlerts);
        }
      }
    } catch (error) {
      console.log('RSS fetch failed, using fallback news');
      // Fallback: Show generic travel tips if RSS fails
      allAlerts.push({
        id: 'tip_weather',
        type: 'tip',
        title: 'August Weather',
        description: 'Expect afternoon showers. Carry a light raincoat.',
        priority: 'low',
        icon: '🌧️',
        dismissible: true
      });
    }
    
    // Always add static alerts
    const currentDate = new Date(date || new Date());
    
    // Jellyfish warning (Aug 20-28)
    if (currentDate >= new Date('2025-08-20') && currentDate <= new Date('2025-08-28')) {
      allAlerts.push({
        id: 'jellyfish_warning',
        type: 'warning',
        title: 'Jellyfish Season Advisory',
        description: 'Box jellyfish possible at beaches. Swim in designated areas only.',
        priority: 'high',
        icon: '⚠️',
        dismissible: true
      });
    }
    
    // Sunday Walking Street
    if (currentDate.getDay() === 0) {
      allAlerts.push({
        id: 'sunday_market',
        type: 'event',
        title: 'Old Town Sunday Walking Street',
        description: 'Every Sunday 4-10pm. Great for souvenirs and street food.',
        priority: 'low',
        icon: '🎪',
        dismissible: true
      });
    }
    
    // Always show useful tips
    allAlerts.push({
      id: 'atm_tip',
      type: 'tip',
      title: 'ATM Tip',
      description: 'Yellow (Krungsri) and Purple (SCB) ATMs have lowest fees.',
      priority: 'low',
      icon: '💳',
      dismissible: true
    });
    
    allAlerts.push({
      id: 'transport_tip',
      type: 'tip',
      title: 'Transport Tip',
      description: 'Use Grab or Bolt apps for fair taxi prices.',
      priority: 'low',
      icon: '🚕',
      dismissible: true
    });
    
    // Filter out dismissed alerts
    const activeAlerts = allAlerts.filter(a => !dismissedAlerts.includes(a.id));
    setEvents(activeAlerts);
    setLastUpdate(new Date());
    setLoading(false);
  };

  const dismissAlert = (id) => {
    setDismissedAlerts([...dismissedAlerts, id]);
    setEvents(events.filter(e => e.id !== id));
  };

  const resetAlerts = () => {
    setDismissedAlerts([]);
    fetchAndProcessNews();
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-amber-50 border-amber-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'event': return 'Event';
      case 'warning': return 'Alert';
      case 'tip': return 'Tip';
      case 'news': return 'News';
      default: return 'Info';
    }
  };

  // Always render something
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <span>📍</span>
          Local Updates & News
          {loading && <span className="text-xs text-sky-600 animate-pulse ml-2">Updating...</span>}
          {lastUpdate && !loading && (
            <span className="text-xs text-slate-500 ml-2">
              {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </h3>
        <span className={`transition-transform text-slate-400 ${collapsed ? '' : 'rotate-180'}`}>
          ▼
        </span>
      </button>

      {!collapsed && (
        <div className="px-4 pb-4 border-t">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500 mb-3">
                {loading ? 'Loading news...' : 'All updates dismissed'}
              </p>
              <button
                onClick={resetAlerts}
                className="text-sm text-sky-600 hover:text-sky-800 font-medium"
              >
                Show All Updates
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-2 max-h-80 overflow-y-auto mt-3">
                {events.map(event => (
                  <div
                    key={event.id}
                    className={`p-3 rounded-lg border flex items-start gap-3 ${getPriorityColor(event.priority)}`}
                  >
                    <span className="text-lg flex-shrink-0">{event.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          event.type === 'warning' ? 'bg-red-100 text-red-700' :
                          event.type === 'event' ? 'bg-blue-100 text-blue-700' :
                          event.type === 'news' ? 'bg-gray-100 text-gray-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {getTypeLabel(event.type)}
                        </span>
                      </div>
                      <p className="text-xs mt-1 text-slate-600">
                        {event.description}
                      </p>
                    </div>
                    {event.dismissible && (
                      <button
                        onClick={() => dismissAlert(event.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors text-lg"
                        title="Dismiss"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <button
                  onClick={fetchAndProcessNews}
                  disabled={loading}
                  className="text-xs text-sky-600 hover:text-sky-800 disabled:opacity-50"
                >
                  🔄 Refresh
                </button>
                <p className="text-xs text-slate-400">
                  Tourist Police: 1155
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
