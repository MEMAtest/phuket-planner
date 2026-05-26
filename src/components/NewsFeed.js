import React, { useState, useEffect, useCallback } from 'react';
import { useCountry } from '../state/CountryContext';

const NewsFeed = ({ date }) => {
  const { country } = useCountry();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState(() => {
    // Load dismissed alerts from localStorage
    try {
      const saved = localStorage.getItem('dismissedNewsAlerts');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading dismissed alerts:', error);
    }
    return [];
  });
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchAndProcessNews = useCallback(async () => {
    setLoading(true);
    const allAlerts = [];
    const newsConfig = country.news || {};
    const query = newsConfig.query || `${country.name} travel news`;
    const region = newsConfig.region || country.iso2 || 'US';
    
    try {
      const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-${region}&gl=${region}&ceid=${region}:en`;
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          // Show top 5 news items with full titles and links
          const newsAlerts = data.items.slice(0, 5).map((item, idx) => {
            // Split title and source
            const fullTitle = item.title;
            const titleParts = fullTitle.split(' - ');
            const title = titleParts[0];
            const source = titleParts[titleParts.length - 1] || 'News';
            
            // Clean description
            let description = '';
            if (item.description) {
              description = item.description.replace(/<[^>]*>/g, '').trim();
              // Keep it shorter for cleaner look
              description = description.substring(0, 100);
              if (description.length === 100) description += '...';
            }
            
            // Determine type and priority based on keywords
            let type = 'news';
            let priority = 'low';
            let icon = '📰';
            
            const lowerTitle = title.toLowerCase();
            if (lowerTitle.includes('flood') || lowerTitle.includes('storm') || lowerTitle.includes('warning') || lowerTitle.includes('alert')) {
              type = 'warning';
              priority = 'high';
              icon = '⚠️';
            } else if (lowerTitle.includes('festival') || lowerTitle.includes('event') || lowerTitle.includes('celebration')) {
              type = 'event';
              priority = 'medium';
              icon = '🎉';
            } else if (lowerTitle.includes('rain') || lowerTitle.includes('weather')) {
              icon = '🌧️';
              priority = 'medium';
            } else if (lowerTitle.includes('tourist') || lowerTitle.includes('travel')) {
              icon = '✈️';
            }
            
            return {
              id: `news_${Date.now()}_${idx}`,
              type: type,
              title: title, // Keep full title
              description: description || `Source: ${source}`,
              source: source,
              link: item.link, // Add the actual article link
              priority: priority,
              icon: icon,
              dismissible: true,
              isNews: true
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
    
    (newsConfig.staticAlerts || []).forEach(alert => {
      const inMonth = !alert.months || alert.months.includes(currentDate.getMonth() + 1);
      const inDay = !alert.daysOfWeek || alert.daysOfWeek.includes(currentDate.getDay());
      if (inMonth && inDay) {
        allAlerts.push({
          ...alert,
          dismissible: true
        });
      }
    });
    
    // Always show useful tips
    allAlerts.push({
      id: 'atm_tip',
      type: 'tip',
      title: `${country.currency} Cash Tip`,
      description: `Carry some ${country.currency} for markets—smaller shops may not accept cards.`,
      priority: 'low',
      icon: '💳',
      dismissible: true
    });
    
    // Filter out dismissed alerts
    const activeAlerts = allAlerts.filter(a => !dismissedAlerts.includes(a.id));
    setEvents(activeAlerts);
    setLastUpdate(new Date());
    setLoading(false);
  }, [date, dismissedAlerts, country]);

  // Persist dismissed alerts to localStorage
  useEffect(() => {
    localStorage.setItem('dismissedNewsAlerts', JSON.stringify(dismissedAlerts));
  }, [dismissedAlerts]);

  useEffect(() => {
    void fetchAndProcessNews();
    const interval = setInterval(fetchAndProcessNews, 4 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAndProcessNews]);

  const dismissAlert = (id) => {
    setDismissedAlerts(prev => [...prev, id]);
    setEvents(prev => prev.filter(e => e.id !== id));
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
              <div className="space-y-2 max-h-96 overflow-y-auto mt-3">
                {events.map(event => (
                  <div
                    key={event.id}
                    className={`p-3 rounded-lg border flex items-start gap-3 ${getPriorityColor(event.priority)} ${
                      event.link ? 'hover:shadow-md transition-shadow cursor-pointer' : ''
                    }`}
                    onClick={event.link ? () => window.open(event.link, '_blank') : undefined}
                  >
                    <span className="text-lg flex-shrink-0">{event.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                              event.type === 'warning' ? 'bg-red-100 text-red-700' :
                              event.type === 'event' ? 'bg-blue-100 text-blue-700' :
                              event.type === 'news' ? 'bg-gray-100 text-gray-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {getTypeLabel(event.type)}
                            </span>
                            {event.source && (
                              <span className="text-xs text-slate-400">
                                {event.source}
                              </span>
                            )}
                          </div>
                          <h4 className={`font-medium text-sm leading-tight ${
                            event.link ? 'text-sky-700 hover:text-sky-900' : 'text-slate-800'
                          }`}>
                            {event.title}
                            {event.link && (
                              <span className="ml-1 text-xs text-sky-500">↗</span>
                            )}
                          </h4>
                          {event.description && (
                            <p className="text-xs mt-1 text-slate-600 leading-relaxed">
                              {event.description}
                            </p>
                          )}
                        </div>
                        {event.dismissible && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dismissAlert(event.id);
                            }}
                            className="text-slate-400 hover:text-red-600 transition-colors text-lg ml-2 flex-shrink-0"
                            title="Dismiss"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
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
