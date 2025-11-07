import React, { useState, useEffect, useCallback } from 'react';
import { getCurrentWeather, getWeatherForecast } from '../services/weatherService';

const WeatherWidget = ({ location, date }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHourly, setShowHourly] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    try {
      const current = await getCurrentWeather(location);
      setCurrentWeather(current);
      const forecastData = await getWeatherForecast(location);
      setForecast(forecastData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  }, [location]);
  
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
  
  const getActivitySuitability = () => {
    const hour = new Date().getHours();
    const uvi = currentWeather?.uvi || 5;
    const temp = currentWeather?.temp || 30;
    const rain = forecast?.[0]?.rainAmount || 0;
    
    return {
      beach: {
        score: hour < 10 && uvi < 6 && rain < 5 ? 9 : hour > 16 ? 7 : 4,
        bestTime: '7-10am',
        icon: '🏖️'
      },
      pool: {
        score: temp > 25 && rain < 5 ? 8 : 5,
        bestTime: '3-5pm',
        icon: '🏊'
      },
      indoor: {
        score: hour >= 11 && hour <= 14 ? 9 : 6,
        bestTime: '11am-2pm',
        icon: '🏛️'
      },
      dining: {
        score: hour >= 18 && hour <= 20 && rain < 10 ? 9 : 6,
        bestTime: '6-8pm',
        icon: '🍽️'
      }
    };
  };
  
  const getKidsComfort = () => {
    const temp = currentWeather?.temp || 30;
    const humidity = currentWeather?.humidity || 80;
    const uvi = currentWeather?.uvi || 5;
    
    let babyScore = 10;
    let kidsScore = 10;
    
    if (temp > 32) { babyScore -= 3; kidsScore -= 2; }
    else if (temp > 30) { babyScore -= 2; kidsScore -= 1; }
    if (humidity > 85) { babyScore -= 2; kidsScore -= 1; }
    if (uvi > 8) { babyScore -= 3; kidsScore -= 2; }
    else if (uvi > 6) { babyScore -= 2; kidsScore -= 1; }
    
    return {
      baby: Math.max(0, babyScore),
      kids: Math.max(0, kidsScore)
    };
  };
  
  const getTimeBasedTheme = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) return 'from-amber-50 to-orange-100';
    if (hour >= 8 && hour < 12) return 'from-sky-50 to-blue-100';
    if (hour >= 12 && hour < 16) return 'from-yellow-50 to-amber-100';
    if (hour >= 16 && hour < 19) return 'from-orange-50 to-pink-100';
    return 'from-indigo-50 to-purple-100';
  };
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-slate-200 rounded-xl"></div>
      </div>
    );
  }
  
  const weatherScore = getWeatherScore();
  const uvInfo = getUVInfo(currentWeather?.uvi || 0);
  const activities = getActivitySuitability();
  const kidsComfort = getKidsComfort();
  const theme = getTimeBasedTheme();
  const todaysForecast = forecast?.find(f => f.date === date);
  
  const uvPercent = Math.min(100, (currentWeather?.uvi || 0) * 10);
  const humidityPercent = currentWeather?.humidity || 0;
  const rainPercent = Math.min(100, (todaysForecast?.rainAmount || 0) * 10);
  
  return (
    <div className="space-y-2">
      {/* Hero Weather Card */}
      <div className={`bg-gradient-to-br ${theme} rounded-xl p-4 shadow-lg border border-white/50`}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              {location === 'maiKhao' ? '📍 Mai Khao Beach' : '📍 Old Town Phuket'}
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
        {['overview', 'activities', 'comfort'].map((tab) => (
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
            {tab === 'activities' && '🏃 Activities'}
            {tab === 'comfort' && '👶 Family'}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="space-y-2">
        {activeTab === 'overview' && (
          <>
            {/* Smart Timing Bar */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-200">
              <h4 className="text-xs font-bold text-indigo-800 mb-2 flex items-center gap-2">
                <span className="text-sm">⏰</span> TODAY'S OPTIMAL SCHEDULE
              </h4>
              <div className="relative">
                <div className="flex h-10 rounded-lg overflow-hidden">
                  <div className="flex-1 flex items-center justify-center bg-green-400/30 border-r border-white">
                    <span className="text-xs font-semibold text-green-700">7-10am Beach</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center bg-red-400/30 border-r border-white">
                    <span className="text-xs font-semibold text-red-700">11-2pm Indoor</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center bg-blue-400/30 border-r border-white">
                    <span className="text-xs font-semibold text-blue-700">3-5pm Pool</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center bg-amber-400/30">
                    <span className="text-xs font-semibold text-amber-700">6-8pm Dinner</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Key Insights */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-2 border border-orange-200">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-lg">🌅</span>
                  <span className="text-xs font-bold text-orange-800">Sunrise</span>
                </div>
                <p className="text-base font-bold text-orange-900">6:14 AM</p>
                <p className="text-xs text-orange-700">Best photos 6:30-7:00</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-2 border border-purple-200">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-lg">🌇</span>
                  <span className="text-xs font-bold text-purple-800">Sunset</span>
                </div>
                <p className="text-base font-bold text-purple-900">6:31 PM</p>
                <p className="text-xs text-purple-700">Golden hour 5:30-6:30</p>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'activities' && (
          <div className="space-y-1.5">
            {Object.entries(activities).map(([activity, data]) => (
              <div key={activity} className="bg-white rounded-lg p-2 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{data.icon}</span>
                    <div>
                      <p className="font-semibold text-sm capitalize text-slate-800">{activity}</p>
                      <p className="text-xs text-slate-600">Best: {data.bestTime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-3 rounded-sm ${
                            i < Math.ceil(data.score / 2) 
                              ? data.score >= 8 ? 'bg-green-500' : data.score >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-slate-700">
                      {data.score >= 8 ? 'Perfect' : data.score >= 5 ? 'Good' : 'Wait'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'comfort' && (
          <div className="space-y-2">
            {/* Kids Comfort Meters */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-3 border border-pink-200">
              <h4 className="text-xs font-bold text-purple-800 mb-2">👶 FAMILY COMFORT INDEX</h4>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-sm font-semibold text-slate-700">Baby Askia (1yr)</span>
                    <span className="text-xs font-bold text-purple-600">{kidsComfort.baby}/10</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        kidsComfort.baby >= 8 ? 'bg-green-500' : kidsComfort.baby >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${kidsComfort.baby * 10}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {kidsComfort.baby >= 8 ? '✅ Perfect conditions' : kidsComfort.baby >= 5 ? '⚠️ Keep cool & hydrated' : '❌ Stay indoors'}
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-sm font-semibold text-slate-700">Amari (4yr)</span>
                    <span className="text-xs font-bold text-purple-600">{kidsComfort.kids}/10</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        kidsComfort.kids >= 8 ? 'bg-green-500' : kidsComfort.kids >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${kidsComfort.kids * 10}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {kidsComfort.kids >= 8 ? '✅ Great for activities' : kidsComfort.kids >= 5 ? '⚠️ Frequent breaks needed' : '❌ Too hot for outdoors'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Health Reminders */}
            <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
              <h4 className="text-xs font-bold text-blue-800 mb-1">💙 HEALTH REMINDERS</h4>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-xs text-blue-700">
                  <span>🧴</span>
                  <span>Reapply sunscreen: 10am, 12pm, 2pm, 4pm</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-700">
                  <span>💧</span>
                  <span>Hydration check every 30 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-700">
                  <span>🦟</span>
                  <span>Bug spray after 5pm (high mosquito activity)</span>
                </div>
              </div>
            </div>
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
