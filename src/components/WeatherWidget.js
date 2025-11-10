import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getCurrentWeather, getWeatherForecast } from '../services/weatherService';
import { useCountry } from '../state/CountryContext';

const WeatherWidget = ({ date }) => {
  const { country } = useCountry();
  const weatherTarget = useMemo(() => {
    return (
      country.weather || {
        city: country.name,
        lat: 8.1707,
        lon: 98.2994
      }
    );
  }, [country]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHourly, setShowHourly] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    try {
      const current = await getCurrentWeather({ coords: weatherTarget });
      setCurrentWeather(current);
      const forecastData = await getWeatherForecast({ coords: weatherTarget });
      setForecast(forecastData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  }, [weatherTarget]);
  
  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchWeatherData, date]);
  
  const getWeatherEmoji = (condition) => {
    if (!condition) return '☀️';
    const cond = condition.toLowerCase();
    if (cond.includes('rain') || cond.includes('drizzle')) return '🌧️';
    if (cond.includes('storm') || cond.includes('thunder')) return '⛈️';
    if (cond.includes('cloud') || cond.includes('overcast')) return '☁️';
    if (cond.includes('snow')) return '❄️';
    return '☀️';
  };
  
  const getUVInfo = (uvi) => {
    if (uvi >= 11) return { level: 'Extreme', color: 'bg-purple-600', textColor: 'text-purple-600', advice: 'Stay indoors 10am-4pm' };
    if (uvi >= 8) return { level: 'Very High', color: 'bg-red-500', textColor: 'text-red-600', advice: 'Maximum protection needed' };
    if (uvi >= 6) return { level: 'High', color: 'bg-orange-500', textColor: 'text-orange-600', advice: 'Protection required' };
    if (uvi >= 3) return { level: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-600', advice: 'Hat & sunscreen' };
    return { level: 'Low', color: 'bg-green-500', textColor: 'text-green-600', advice: 'Enjoy safely' };
  };
  
  const getWeatherScore = () => {
    let score = 10;
    if (currentWeather?.isRaining) score -= 3;
    if (currentWeather?.uvi >= 11) score -= 3;
    else if (currentWeather?.uvi >= 8) score -= 1;
    if (currentWeather?.humidity > 90) score -= 1;
    if (currentWeather?.wind_speed > 10) score -= 2;
    return Math.max(0, Math.min(10, score));
  };
  
  const getTimeBasedTheme = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) return 'from-amber-50 to-orange-100';
    if (hour >= 8 && hour < 12) return 'from-sky-50 to-blue-100';
    if (hour >= 12 && hour < 16) return 'from-yellow-50 to-amber-100';
    if (hour >= 16 && hour < 19) return 'from-orange-50 to-pink-100';
    return 'from-indigo-50 to-purple-100';
  };
  
  const weatherScore = getWeatherScore();
  const uvInfo = getUVInfo(currentWeather?.uvi || 0);
  const theme = getTimeBasedTheme();
  const todaysForecast = forecast?.find(f => f.date === date);
  const daypartHighlights = useMemo(() => {
    const rain = todaysForecast?.rainAmount || 0;
    const uv = currentWeather?.uvi || 0;
    const humidity = currentWeather?.humidity || 0;
    return [
      {
        icon: '🌅',
        label: 'Morning',
        window: '6–10 am',
        detail: rain < 2 ? 'Clearest skies—ideal for walks or transit' : 'Spotty showers possible, carry a light layer'
      },
      {
        icon: '🌞',
        label: 'Midday',
        window: '11 am–2 pm',
        detail: uv >= 6 ? 'High UV—plan shade breaks & reapply SPF' : 'Balanced sun for sightseeing'
      },
      {
        icon: '🌆',
        label: 'Evening',
        window: '5–8 pm',
        detail: humidity > 80 ? 'Humid glow—hydrate and slow the pace' : 'Comfortable temps for dinner plans'
      }
    ];
  }, [todaysForecast, currentWeather]);

  const conditionAlerts = useMemo(() => {
    const alerts = [];
    const rain = todaysForecast?.rainAmount || 0;
    if (rain >= 5) {
      alerts.push({ icon: '☔', text: `${rain}mm of rain expected—pack a shell and waterproof shoes.` });
    }
    if ((currentWeather?.uvi || 0) >= 6) {
      alerts.push({ icon: '🧴', text: 'UV index climbs this afternoon—schedule shade + sunscreen stops.' });
    }
    if ((currentWeather?.humidity || 0) >= 85) {
      alerts.push({ icon: '💧', text: 'Humidity stays high—plan extra hydration and cooling breaks.' });
    }
    if ((currentWeather?.wind_speed || 0) >= 10) {
      alerts.push({ icon: '💨', text: 'Gusty winds—secure hats and prep for breezy ferry rides.' });
    }
    if (!alerts.length) {
      alerts.push({ icon: '✅', text: 'Stable conditions all day—no major weather blockers.' });
    }
    return alerts;
  }, [todaysForecast, currentWeather]);

  const comfortMetrics = useMemo(() => {
    const metrics = [];
    const temp = currentWeather?.temp;
    const humidity = currentWeather?.humidity;
    const wind = currentWeather?.wind_speed;
    if (typeof temp === 'number') {
      const status = temp >= 33 ? 'High heat' : temp >= 28 ? 'Warm' : 'Mild';
      const detail = temp >= 33 ? 'Limit midday exertion & seek AC' : temp >= 28 ? 'Keep water handy on longer walks' : 'Comfortable heat load';
      metrics.push({ icon: '🔥', label: 'Heat load', status, detail });
    }
    if (typeof humidity === 'number') {
      const status = humidity >= 85 ? 'Sticky' : humidity >= 60 ? 'Humid' : 'Dry';
      const detail = humidity >= 85 ? 'Expect muggy air—pack wipes & breathable fabrics' : humidity >= 60 ? 'Moderate humidity—pace hydration' : 'Pleasant air feel';
      metrics.push({ icon: '💧', label: 'Air feel', status, detail });
    }
    if (typeof wind === 'number') {
      const status = wind >= 12 ? 'Windy' : wind >= 6 ? 'Breezy' : 'Calm';
      const detail = wind >= 12 ? 'Secure hats + plan layers for ferries' : wind >= 6 ? 'Light breeze—great for walking' : 'Calm winds everywhere';
      metrics.push({ icon: '🌬️', label: 'Wind', status, detail });
    }
    return metrics;
  }, [currentWeather]);
  
  const uvPercent = Math.min(100, (currentWeather?.uvi || 0) * 10);
  const humidityPercent = currentWeather?.humidity || 0;
  const rainPercent = Math.min(100, (todaysForecast?.rainAmount || 0) * 10);
  const sunriseTime = currentWeather?.sunrise
    ? new Date(currentWeather.sunrise).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    : '--';
  const sunsetTime = currentWeather?.sunset
    ? new Date(currentWeather.sunset).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    : '--';

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-slate-200 rounded-xl"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {/* Hero Weather Card */}
      <div className={`bg-gradient-to-br ${theme} rounded-xl p-4 shadow-lg border border-white/50`}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              📍 {weatherTarget.city}
            </p>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-4xl font-bold text-slate-800">
                {currentWeather?.temp || '--'}°
              </span>
              <div className="text-sm">
                <p className="text-slate-600">Feels like {currentWeather?.feels_like || '--'}°</p>
                <p className="text-slate-700 font-medium capitalize">{currentWeather?.description}</p>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-5xl">{getWeatherEmoji(currentWeather?.main)}</span>
            {/* Visual Activity Score */}
            <div className="mt-2">
              <div className="text-xs font-bold text-slate-600 mb-1">Activity Score</div>
              <div className="relative w-20 h-20">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle cx="40" cy="40" r="32" stroke="#e2e8f0" strokeWidth="6" fill="none"/>
                  <circle 
                    cx="40" cy="40" r="32" 
                    stroke={weatherScore >= 8 ? '#10b981' : weatherScore >= 5 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="6" 
                    fill="none"
                    strokeDasharray={`${(weatherScore / 10) * 201} 201`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-slate-800">{weatherScore}</span>
                  <span className="text-xs text-slate-600">/10</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-700 mt-1">
                {weatherScore >= 8 ? 'EXCELLENT' : weatherScore >= 5 ? 'GOOD' : 'CHALLENGING'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Visual Metrics Dashboard */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          {/* UV Index Gauge */}
          <div className="bg-white/70 backdrop-blur rounded-lg p-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-600">UV</span>
              <span className={`text-xs font-bold ${uvInfo.textColor}`}>{uvInfo.level}</span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`absolute left-0 top-0 h-full ${uvInfo.color} transition-all duration-500`}
                style={{ width: `${uvPercent}%` }}
              />
            </div>
            <p className="text-xs text-slate-600 mt-0.5">{currentWeather?.uvi || 0}</p>
          </div>
          
          {/* Humidity Gauge */}
          <div className="bg-white/70 backdrop-blur rounded-lg p-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-600">💧</span>
              <span className="text-xs font-bold text-blue-600">Humidity</span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${humidityPercent}%` }}
              />
            </div>
            <p className="text-xs text-slate-600 mt-0.5">{currentWeather?.humidity}%</p>
          </div>
          
          {/* Rain Gauge */}
          <div className="bg-white/70 backdrop-blur rounded-lg p-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-600">🌧️</span>
              <span className="text-xs font-bold text-cyan-600">Rain</span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-cyan-500 transition-all duration-500"
                style={{ width: `${rainPercent}%` }}
              />
            </div>
            <p className="text-xs text-slate-600 mt-0.5">{todaysForecast?.rainAmount || 0}mm</p>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation - SIMPLE FIX: Just stopPropagation */}
      <div className="flex gap-1 p-1 bg-white rounded-lg shadow-sm">
        {['overview', 'insights', 'alerts'].map((tab) => (
          <button
            key={tab}
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab(tab);
            }}
            className={`flex-1 py-1.5 px-2 rounded-md text-xs font-semibold transition-all ${
              activeTab === tab 
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab === 'overview' && '📊 Overview'}
            {tab === 'insights' && '🕒 Dayparts'}
            {tab === 'alerts' && '⚠️ Alerts'}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="space-y-2">
        {activeTab === 'overview' && (
          <>
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-3 border border-indigo-100">
              <h4 className="text-xs font-bold text-indigo-800 mb-2 flex items-center gap-2">
                <span>🧭</span> Weather Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {daypartHighlights.map((highlight) => (
                  <div key={highlight.label} className="bg-white rounded-lg p-2 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{highlight.icon}</span>
                      <div>
                        <p className="font-semibold text-sm text-slate-800">{highlight.label}</p>
                        <p className="text-[11px] text-slate-500">{highlight.window}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{highlight.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-indigo-100">
                <p className="text-xs text-indigo-700 flex items-center gap-1">
                  <span>{conditionAlerts[0]?.icon || '✅'}</span>
                  <span>{conditionAlerts[0]?.text || 'No major weather blockers today.'}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-2 border border-orange-200">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-lg">🌅</span>
                  <span className="text-xs font-bold text-orange-800">Sunrise</span>
                </div>
                <p className="text-base font-bold text-orange-900">{sunriseTime}</p>
                <p className="text-xs text-orange-700">
                  {sunriseTime !== '--' ? 'Blue hour hits ~30 min earlier' : 'Times update once data loads'}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-2 border border-purple-200">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-lg">🌇</span>
                  <span className="text-xs font-bold text-purple-800">Sunset</span>
                </div>
                <p className="text-base font-bold text-purple-900">{sunsetTime}</p>
                <p className="text-xs text-purple-700">
                  {sunsetTime !== '--' ? 'Golden hour roughly 60 min before' : 'Times update once data loads'}
                </p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-2">
            <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
              <h4 className="text-xs font-bold text-slate-700 mb-2">🕒 Daypart planner</h4>
              <div className="space-y-2">
                {daypartHighlights.map((highlight) => (
                  <div key={highlight.label} className="flex items-start gap-3">
                    <span className="text-xl">{highlight.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{highlight.label}</p>
                      <p className="text-[11px] text-slate-500">{highlight.window}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{highlight.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {comfortMetrics.length > 0 && (
              <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-700 mb-2">🌡️ Comfort snapshot</h4>
                <div className="space-y-1.5">
                  {comfortMetrics.map((metric) => (
                    <div key={metric.label} className="flex items-start gap-2">
                      <span className="text-lg">{metric.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{metric.label}</p>
                        <p className="text-xs font-bold text-slate-500">{metric.status}</p>
                        <p className="text-xs text-slate-600">{metric.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-1.5">
            {conditionAlerts.map((alert, idx) => (
              <div key={`${alert.text}-${idx}`} className="bg-white rounded-lg p-2 border border-slate-200 shadow-sm flex gap-2 items-start">
                <span className="text-xl">{alert.icon}</span>
                <p className="text-sm text-slate-700">{alert.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Quick Actions Bar - SIMPLE FIX */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowHourly(!showHourly);
          }}
          className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          {showHourly ? '📊 Hide' : '📊 Show'} 3-Hour
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            fetchWeatherData();
          }}
          className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          🔄 Refresh
        </button>
      </div>
      
      {/* 3-Hour Forecast */}
      {showHourly && todaysForecast?.hourly && (
        <div className="bg-white rounded-lg p-3 shadow-md border border-slate-200">
          <h4 className="text-sm font-bold text-slate-700 mb-2">3-Hour Forecast</h4>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {todaysForecast.hourly.slice(0, 8).map((hour, i) => (
              <div 
                key={i} 
                className={`flex-shrink-0 text-center p-2 rounded-lg min-w-[60px] ${
                  hour.rain > 0 ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <p className="text-xs font-semibold text-slate-600">{hour.time}</p>
                <span className="text-2xl block my-1">{getWeatherEmoji(hour.description)}</span>
                <p className="text-base font-bold text-slate-800">{hour.temp}°</p>
                {hour.rain > 0 && (
                  <p className="text-xs text-blue-600 font-semibold mt-0.5">💧{hour.rain}mm</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Last Update */}
      {lastUpdate && (
        <p className="text-center text-xs text-slate-400">
          Updated {lastUpdate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
        </p>
      )}
    </div>
  );
};

export default WeatherWidget;
