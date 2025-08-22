import React, { useState, useEffect } from 'react';

const NewsFeed = ({ location, date }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState(() => {
    const saved = localStorage.getItem('phuket_dismissed_alerts');
    return saved ? JSON.parse(saved) : [];
  });
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    fetchAndProcessNews();
    // Refresh every 4 hours
    const interval = setInterval(fetchAndProcessNews, 4 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [date, location]);

  const fetchAndProcessNews = async () => {
    // Check cache first
    const cached = localStorage.getItem('phuket_ai_news_cache');
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < 7200000) { // 2 hour cache
        setEvents(data.filter(e => !dismissedAlerts.includes(e.id)));
        setLastUpdate(new Date(timestamp));
        return;
      }
    }

    setLoading(true);
    try {
      // Step 1: Fetch RSS feeds
      const rssFeeds = [
        'https://news.google.com/rss/search?q=Phuket+weather+beach+safety&hl=en-US&gl=US&ceid=US:en',
        'https://news.google.com/rss/search?q=Phuket+events+August+2025&hl=en-US&gl=US&ceid=US:en',
        'https://news.google.com/rss/search?q=Thailand+travel+advisory&hl=en-US&gl=US&ceid=US:en'
      ];

      const feedPromises = rssFeeds.map(url => 
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`)
          .then(res => res.json())
          .catch(err => ({ items: [] }))
      );

      const feedData = await Promise.all(feedPromises);
      const allArticles = feedData.flatMap(f => f.items || []).slice(0, 15);

      // Step 2: Process with Groq if we have articles
      let processedNews = [];
      if (allArticles.length > 0) {
        processedNews = await processWithGroq(allArticles);
      }
      
      // Step 3: Add static alerts
      const staticAlerts = getStaticAlerts();
      
      // Step 4: Combine all events
      const combinedEvents = [...processedNews, ...staticAlerts];
      
      // Step 5: Filter dismissed and save
      const activeEvents = combinedEvents.filter(e => !dismissedAlerts.includes(e.id));
      
      // Cache the results
      localStorage.setItem('phuket_ai_news_cache', JSON.stringify({
        data: combinedEvents,
        timestamp: Date.now()
      }));
      
      setEvents(activeEvents);
      setLastUpdate(new Date());
      
    } catch (error) {
      console.error('News fetch failed:', error);
      // Fallback to static alerts only
      const staticAlerts = getStaticAlerts();
      setEvents(staticAlerts.filter(e => !dismissedAlerts.includes(e.id)));
    } finally {
      setLoading(false);
    }
  };

  const processWithGroq = async (articles) => {
    // Prepare article summary for AI
    const articleSummary = articles.map(a => ({
      title: a.title || '',
      description: (a.description || '').substring(0, 200),
      date: a.pubDate || ''
    }));

    const prompt = `Analyze these news items and extract ONLY information relevant to tourists in Phuket from August 19-29, 2025.

News items:
${JSON.stringify(articleSummary, null, 2)}

Filter for:
1. Weather warnings or conditions affecting beaches
2. Jellyfish or marine hazards  
3. Local events, festivals, or markets happening Aug 19-29
4. Transportation disruptions
5. Safety alerts for tourists
6. Beach conditions

Ignore: politics, crime unless tourist-targeted, business news, COVID, property, sports

Return as JSON array with EXACTLY this format (no markdown, no code blocks, just JSON):
[{
  "type": "warning",
  "title": "Brief clear title",
  "description": "One sentence description",
  "priority": "high",
  "icon": "⚠️"
}]

Use type: "warning" for safety/weather, "event" for activities, "tip" for advice
Use priority: "high" for urgent safety, "medium" for important info, "low" for general tips
Use appropriate emoji for icon

Return empty array [] if nothing relevant. Maximum 5 items.`;

    try {
      // Call Netlify function
      const response = await fetch('/.netlify/functions/groq-filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        console.error('Groq function failed:', response.status);
        return [];
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '[]';
      
      // Parse AI response
      let parsedEvents = [];
      try {
        // Clean any markdown formatting if present
        const cleanContent = content
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();
        parsedEvents = JSON.parse(cleanContent);
        
        // Validate it's an array
        if (!Array.isArray(parsedEvents)) {
          console.error('AI response not an array');
          return [];
        }
      } catch (e) {
        console.error('Failed to parse Groq response:', e);
        return [];
      }

      // Add metadata to AI-generated events
      return parsedEvents.slice(0, 5).map((event, idx) => ({
        ...event,
        id: `ai_${Date.now()}_${idx}`,
        isAI: true,
        dismissible: true,
        icon: event.icon || '📰'
      }));

    } catch (error) {
      console.error('Groq processing error:', error);
      return [];
    }
  };

  const getStaticAlerts = () => {
    const currentDate = new Date(date || new Date());
    const alerts = [];
    
    // Jellyfish warning (Aug 20-28)
    if (currentDate >= new Date('2025-08-20') && currentDate <= new Date('2025-08-28')) {
      if (location === 'maiKhao' || location === 'all') {
        alerts.push({
          id: 'jellyfish_warning',
          type: 'warning',
          title: 'Jellyfish Season Advisory',
          description: 'Box jellyfish possible at beaches. Swim in designated areas only.',
          priority: 'high',
          icon: '⚠️',
          dismissible: true
        });
      }
    }
    
    // Sunday Walking Street (Sundays only)
    if (currentDate.getDay() === 0) {
      if (location === 'oldTown' || location === 'all') {
        alerts.push({
          id: 'sunday_market',
          type: 'event',
          title: 'Old Town Sunday Walking Street',
          description: 'Every Sunday 4-10pm. Great for souvenirs and street food.',
          priority: 'low',
          icon: '🎪',
          dismissible: true
        });
      }
    }
    
    // General tip (always show)
    alerts.push({
      id: 'atm_tip',
      type: 'tip',
      title: 'ATM Tip',
      description: 'Yellow (Krungsri) and Purple (SCB) ATMs have lowest fees for foreign cards.',
      priority: 'low',
      icon: '💳',
      dismissible: true
    });
    
    return alerts;
  };

  const dismissAlert = (id) => {
    const newDismissed = [...dismissedAlerts, id];
    setDismissedAlerts(newDismissed);
    localStorage.setItem('phuket_dismissed_alerts', JSON.stringify(newDismissed));
    setEvents(events.filter(e => e.id !== id));
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
      default: return 'News';
    }
  };

  // Don't render if no events
  if (events.length === 0 && !loading) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Collapsible Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <span>🤖</span>
          Local Updates & AI News
          {loading && <span className="text-xs text-sky-600 animate-pulse ml-2">Updating...</span>}
          {lastUpdate && !loading && (
            <span className="text-xs text-slate-500 ml-2">
              Updated {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </h3>
        <span className={`transition-transform text-slate-400 ${collapsed ? '' : 'rotate-180'}`}>
          ▼
        </span>
      </button>

      {/* Content */}
      {!collapsed && (
        <div className="px-4 pb-4 border-t">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500">
                {loading ? 'Checking for updates...' : 'No relevant updates for today'}
              </p>
              {!loading && (
                <button
                  onClick={fetchAndProcessNews}
                  className="mt-2 text-xs text-sky-600 hover:text-sky-800"
                >
                  Check for Updates
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-2 max-h-64 overflow-y-auto mt-3">
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
                          'bg-green-100 text-green-700'
                        }`}>
                          {getTypeLabel(event.type)}
                        </span>
                        {event.isAI && (
                          <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                            AI
                          </span>
                        )}
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

              {/* Footer Actions */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <button
                  onClick={fetchAndProcessNews}
                  disabled={loading}
                  className="text-xs text-sky-600 hover:text-sky-800 disabled:opacity-50"
                >
                  🔄 Refresh Updates
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
