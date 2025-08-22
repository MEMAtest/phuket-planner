// NewsFeed.js with Groq AI filtering
import React, { useState, useEffect } from 'react';

const NewsFeed = ({ location, date }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState(() => {
    const saved = localStorage.getItem('phuket_dismissed_alerts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchAndProcessNews();
    // Refresh every 4 hours
    const interval = setInterval(fetchAndProcessNews, 4 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [date]);

  const fetchAndProcessNews = async () => {
    // Check cache first
    const cached = localStorage.getItem('phuket_ai_news_cache');
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < 7200000) { // 2 hour cache
        setEvents(data.filter(e => !dismissedAlerts.includes(e.id)));
        return;
      }
    }

    setLoading(true);
    try {
      // Step 1: Fetch RSS feeds
      const rssFeeds = [
        'https://news.google.com/rss/search?q=Phuket+weather+beach+safety&hl=en-US&gl=US&ceid=US:en',
        'https://news.google.com/rss/search?q=Phuket+events+August+2025&hl=en-US&gl=US&ceid=US:en'
      ];

      const feedPromises = rssFeeds.map(url => 
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`)
          .then(res => res.json())
          .catch(err => ({ items: [] }))
      );

      const feedData = await Promise.all(feedPromises);
      const allArticles = feedData.flatMap(f => f.items || []).slice(0, 15);

      if (allArticles.length === 0) {
        setEvents(getStaticAlerts());
        return;
      }

      // Step 2: Process with Groq
      const processedNews = await processWithGroq(allArticles);
      
      // Step 3: Combine with static alerts
      const combinedEvents = [...processedNews, ...getStaticAlerts()];
      
      // Step 4: Filter dismissed and cache
      const activeEvents = combinedEvents.filter(e => !dismissedAlerts.includes(e.id));
      
      localStorage.setItem('phuket_ai_news_cache', JSON.stringify({
        data: combinedEvents,
        timestamp: Date.now()
      }));
      
      setEvents(activeEvents);
      
    } catch (error) {
      console.error('News fetch failed:', error);
      setEvents(getStaticAlerts().filter(e => !dismissedAlerts.includes(e.id)));
    } finally {
      setLoading(false);
    }
  };

  const processWithGroq = async (articles) => {
    // Prepare article summary
    const articleSummary = articles.map(a => ({
      title: a.title,
      description: a.description?.substring(0, 200),
      date: a.pubDate
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

Ignore: politics, crime unless tourist-targeted, business news, COVID, property

Return as JSON array with EXACTLY this format (no markdown, just JSON):
[{
  "type": "warning" or "event" or "tip",
  "title": "Brief clear title",
  "description": "One sentence description",
  "priority": "high" or "medium" or "low",
  "icon": "appropriate emoji"
}]

Return empty array [] if nothing relevant. Maximum 5 items.`;

    try {
      // Groq API call
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192', // or 'mixtral-8x7b-32768' for better quality
          messages: [{
            role: 'user',
            content: prompt
          }],
          temperature: 0.2,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error('Groq API failed');
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '[]';
      
      // Parse response
      let parsedEvents = [];
      try {
        // Remove any markdown formatting if present
        const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsedEvents = JSON.parse(cleanContent);
      } catch (e) {
        console.error('Failed to parse Groq response:', content);
        return [];
      }

      // Add metadata
      return parsedEvents.map((event, idx) => ({
        ...event,
        id: `ai_${Date.now()}_${idx}`,
        isAI: true,
        dismissible: true
      }));

    } catch (error) {
      console.error('Groq processing failed:', error);
      return [];
    }
  };

  const getStaticAlerts = () => {
    return [
      {
        id: 'jellyfish_static',
        type: 'warning',
        title: 'Jellyfish Season Advisory',
        description: 'Box jellyfish possible at beaches. Swim in designated areas only.',
        priority: 'high',
        icon: '⚠️',
        dismissible: true
      }
    ].filter(e => {
      // Only show if date relevant
      const currentDate = new Date(date);
      return currentDate >= new Date('2025-08-20') && currentDate <= new Date('2025-08-28');
    });
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

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <span>🤖</span>
          AI-Filtered Local Updates
          {loading && <span className="text-xs text-sky-600 animate-pulse">Updating...</span>}
        </h3>
        <span className={`transition-transform ${collapsed ? '' : 'rotate-180'}`}>
          ▼
        </span>
      </button>

      {!collapsed && (
        <div className="px-4 pb-4">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500">No relevant updates for today</p>
              <button
                onClick={fetchAndProcessNews}
                className="mt-2 text-xs text-sky-600 hover:text-sky-800"
              >
                Check for Updates
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {events.map(event => (
                  <div
                    key={event.id}
                    className={`p-3 rounded-lg border flex items-start gap-3 ${getPriorityColor(event.priority)}`}
                  >
                    <span className="text-lg flex-shrink-0">{event.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        {event.isAI && (
                          <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                            AI
                          </span>
                        )}
                        {event.type === 'warning' && (
                          <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full">
                            Alert
                          </span>
                        )}
                      </div>
                      <p className="text-xs mt-0.5 text-slate-600">
                        {event.description}
                      </p>
                    </div>
                    {event.dismissible && (
                      <button
                        onClick={() => dismissAlert(event.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                        title="Dismiss"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={fetchAndProcessNews}
                disabled={loading}
                className="mt-3 text-xs text-sky-600 hover:text-sky-800 disabled:opacity-50"
              >
                🔄 Refresh Updates
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
