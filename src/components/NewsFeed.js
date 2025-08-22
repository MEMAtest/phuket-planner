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
      // Step 1: Fetch REAL news from Google News RSS
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://news.google.com/rss/search?q=Phuket+Thailand&hl=en-US&gl=US&ceid=US:en')}&count=20`
      );
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          // Step 2: Send the REAL headlines to Groq to pick the best ones
          const headlines = data.items.map(item => ({
            title: item.title.split(' - ')[0], // Remove source
            source: item.title.split(' - ')[1] || 'News',
            date: item.pubDate
          }));
          
          const groqPrompt = `Here are today's real Phuket news headlines. Pick the TOP 5 most important/interesting for tourists:

${headlines.map((h, i) => `${i+1}. ${h.title}`).join('\n')}

Return as JSON array with your TOP 5 picks:
[{
  "type": "news",
  "title": "Shortened headline (max 8 words)",
  "description": "Why this matters to tourists (one sentence)",
  "priority": "high/medium/low",
  "icon": "📰"
}]

Use priority high for safety/urgent, medium for important events, low for general news.
Use icons: ⚠️ for warnings, 🌧️ for weather, 🎉 for events, 📰 for general news, 🚨 for urgent`;

          const groqResponse = await fetch('/.netlify/functions/groq-filter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: groqPrompt })
          });

          if (groqResponse.ok) {
            const groqData = await groqResponse.json();
            
            let content = '';
            if (groqData.choices && groqData.choices[0] && groqData.choices[0].message) {
              content = groqData.choices[0].message.content;
            }

            if (content) {
              // Extract JSON from response
              const jsonMatch = content.match(/\[[\s\S]*\]/);
              if (jsonMatch) {
                try {
                  const parsed = JSON.parse(jsonMatch[0]);
                  if (Array.isArray(parsed)) {
                    const newsAlerts = parsed.map((item, idx) => ({
                      id: `news_${Date.now()}_${idx}`,
                      type: item.type || 'news',
                      title: item.title || 'News Update',
                      description: item.description || 'Latest from Phuket',
                      priority: item.priority || 'low',
                      icon: item.icon || '📰',
                      isAI: true,
                      dismissible: true
                    }));
                    allAlerts.push(...newsAlerts);
                  }
                } catch (e) {
                  console.log('Parse error, falling back to direct news');
                  // Fallback: show news directly without AI filtering
                  const fallbackNews = data.items.slice(0, 3).map((item, idx) => ({
                    id: `news_${Date.now()}_${idx}`,
                    type: 'news',
                    title: item.title.split(' - ')[0].substring(0, 50),
                    description: 'Latest Phuket news',
                    priority: 'low',
                    icon: '📰',
                    dismissible: true
                  }));
                  allAlerts.push(...fallbackNews);
                }
              }
            } else {
              // If Groq fails, show raw news anyway
              const fallbackNews = data.items.slice(0, 3).map((item, idx) => ({
                id: `news_${Date.now()}_${idx}`,
                type: 'news',
                title: item.title.split(' - ')[0].substring(0, 50),
                description: 'Latest Phuket news',
                priority: 'low',
                icon: '📰',
                dismissible: true
              }));
              allAlerts.push(...fallbackNews);
            }
          } else {
            // Groq not working, show news directly
            const directNews = data.items.slice(0, 5).map((item, idx) => ({
              id: `news_${Date.now()}_${idx}`,
              type: 'news',
              title: item.title.split(' - ')[0].substring(0, 50),
              description: item.description ? 
                item.description.replace(/<[^>]*>/g, '').substring(0, 80) + '...' : 
                'Click to learn more',
              priority: 'low',
              icon: '📰',
              dismissible: true
            }));
            allAlerts.push(...directNews);
          }
        }
      }
    } catch (error) {
      console.log('News fetch error');
    }
    
    // Add static alerts
    const currentDate = new Date(date || new Date());
    
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
    
    allAlerts.push({
      id: 'atm_tip',
      type: 'tip',
      title: 'ATM Tip',
      description: 'Yellow (Krungsri) and Purple (SCB) ATMs have lowest fees for foreign cards.',
      priority: 'low',
      icon: '💳',
      dismissible: true
    });
    
    // Filter dismissed and update
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

  return (
    <div className="bg-white rounded-lg shadow-sm border">
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

      {!collapsed && (
        <div className="px-4 pb-4 border-t">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500 mb-3">
                {loading ? 'Fetching real news...' : 'No news available'}
              </p>
              <button
                onClick={resetAlerts}
                className="text-sm text-sky-600 hover:text-sky-800 font-medium"
              >
                🔄 Refresh
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
                        {event.isAI && (
                          <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                            AI Filtered
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
