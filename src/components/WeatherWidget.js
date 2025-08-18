import React, { useState, useEffect } from 'react';
import { Icons } from '../data/staticData';
import { getCurrentWeather, getWeatherForecast, getWeatherRecommendations } from '../services/weatherService';

const WeatherWidget = ({ location, date }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHourly, setShowHourly] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  
  useEffect(() => {
    fetchWeatherData();
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location, date]);
  
  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      // Get current weather
      const current = await getCurrentWeather(location);
      setCurrentWeather(current);
      
      // Get forecast
      const forecastData = await getWeatherForecast(location);
      setForecast(forecastData);
      
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const getWeatherIcon = (condition, size = 'w-6 h-6') => {
    if (!condition) return <Icons.sun className={`${size} text-amber-500`} />;
    
    const cond = condition.toLowerCase();
    if (cond.includes('rain') || cond.includes('drizzle')) {
      return <Icons.cloudRain className={`${size} text-blue-500`} />;
    } else if (cond.includes('storm') || cond.includes('thunder')) {
      return <Icons.cloudRain className={`${size} text-purple-600`} />;
    } else if (cond.includes('cloud') || cond.includes('overcast')) {
      return <Icons.cloud className={`${size} text-slate-500`} />;
    }
    return <Icons.sun className={`${size} text-amber-500`} />;
  };
  
  const getUVWarning = (uvi) => {
    if (uvi >= 11) return { level: 'Extreme', color: 'text-purple-700 bg-purple-100', advice: 'Avoid sun 10am-4pm' };
    if (uvi >= 8) return { level: 'Very High', color: 'text-red-700 bg-red-100', advice: 'Protect against sunburn' };
    if (uvi >= 6) return { level: 'High', color: 'text-orange-700 bg-orange-100', advice: 'Protection required' };
    if (uvi >= 3) return { level: 'Moderate', color: 'text-yellow-700 bg-yellow-100', advice: 'Stay in shade midday' };
    return { level: 'Low', color: 'text-green-700 bg-green-100', advice: 'Enjoy safely' };
  };
  
  const getActivityWindows = () => {
    const windows = [];
    const hour = new Date().getHours();
    
    // Morning window
    if (currentWeather?.uvi < 6 && !currentWeather?.isRaining) {
      windows.push({
        time: 'Morning (7-10am)',
        status: '✅ BEST',
        reason: 'Low UV, cooler temps',
        color: 'text-green-600'
      });
    } else {
      windows.push({
        time: 'Morning (7-10am)',
        status: '⚠️ Good',
        reason: 'Check UV levels',
        color: 'text-amber-600'
      });
    }
    
    // Midday
    if (currentWeather?.uvi >= 8) {
      windows.push({
        time: 'Midday (11am-2pm)',
        status: '❌ Avoid outdoor',
        reason: 'Extreme UV levels',
        color: 'text-red-600'
      });
    } else {
      windows.push({
        time: 'Midday (11am-2pm)',
        status: '⚠️ Use caution',
        reason: 'High sun exposure',
        color: 'text-amber-600'
      });
    }
    
    // Afternoon
    if (forecast?.rainExpected) {
      windows.push({
        time: 'Afternoon (3-5pm)',
        status: '🌧️ Rain likely',
        reason: 'Indoor activities best',
        color: 'text-blue-600'
      });
    } else {
      windows.push({
        time: 'Afternoon (3-5pm)',
        status: '✅ Good',
        reason: 'UV decreasing',
        color: 'text-green-600'
      });
    }
    
    // Evening
    windows.push({
      time: 'Evening (5-7pm)',
      status: '✅ Perfect',
      reason: 'Golden hour for photos',
      color: 'text-green-600'
    });
    
    return windows;
  };
  
  const getTodaysTips = () => {
    const tips = [];
    
    // UV-based tips
    if (currentWeather?.uvi >= 8) {
      tips.push('🧴 Reapply sunscreen every 2 hours');
      tips.push('👒 Hats & UV clothing for kids');
    }
    
    // Humidity tips
    if (currentWeather?.humidity > 85) {
      tips.push('💧 Clothes dry slowly - pack extras');
      tips.push('💦 Hydrate more frequently');
    }
    
    // Rain tips
    if (forecast?.rainAmount > 5) {
      tips.push(`🌧️ ${forecast.rainAmount}mm rain expected`);
      tips.push('☂️ Bring umbrellas/raincoats');
    }
    
    // Beach tips
    if (location === 'maiKhao') {
      const hour = new Date().getHours();
      if (hour < 12) {
        tips.push('🏖️ Low tide morning - great for walking');
      } else {
        tips.push('🏊 High tide afternoon - better swimming');
      }
    }
    
    // Sunset time
    tips.push('🌅 Sunset at 6:31pm - great photos');
    
    return tips;
  };
  
  const getWeatherScore = () => {
    let score = 10;
    
    // Deduct for rain
    if (currentWeather?.isRaining) score -= 3;
    if (forecast?.rainAmount > 10) score -= 2;
    
    // Deduct for extreme UV
    if (currentWeather?.uvi >= 11) score -= 3;
    else if (currentWeather?.uvi >= 8) score -= 1;
    
    // Deduct for high humidity
    if (currentWeather?.humidity > 90) score -= 1;
    
    // Deduct for strong wind
    if (currentWeather?.wind_speed > 10) score -= 2;
    
    return Math.max(0, Math.min(10, score));
  };
  
  const todaysForecast = forecast?.find(f => f.date === date);
  const activityWindows = getActivityWindows();
  const todaysTips = getTodaysTips();
  const weatherScore = getWeatherScore();
  const uvInfo = getUVWarning(currentWeather?.uvi || 0);
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-20 bg-slate-200 rounded-lg"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {/* Main Weather Card */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold text-sky-600 uppercase">
              {location === 'maiKhao' ? 'Mai Khao Beach' : 'Old Town Phuket'}
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-slate-800">
                {currentWeather?.temp || '--'}°
              </span>
              <span className="text-sm text-slate-500">
                Feels like {currentWeather?.feels_like || '--'}°
              </span>
            </div>
            <p className="text-sm text-slate-600 capitalize mt-1">
              {currentWeather?.description || 'Loading...'}
            </p>
          </div>
          
          <div className="text-right">
            {getWeatherIcon(currentWeather?.main, 'w-12 h-12')}
            {/* Weather Score */}
            <div className="mt-2">
              <div className="text-xs text-slate-500">Activity Score</div>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      i < weatherScore ? 'bg-green-500' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs font-bold text-slate-700">{weatherScore}/10</div>
            </div>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-sky-200">
          <div className="text-center">
            <div className="text-xs text-slate-500">Humidity</div>
            <div className="font-bold text-sm">{currentWeather?.humidity || '--'}%</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500">UV Index</div>
            <div className={`font-bold text-sm px-1 rounded ${uvInfo.color}`}>
              {currentWeather?.uvi || '--'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500">Wind</div>
            <div className="font-bold text-sm">{currentWeather?.wind_speed || '--'}m/s</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500">Rain</div>
            <div className="font-bold text-sm">{todaysForecast?.rainAmount || '0'}mm</div>
          </div>
        </div>
      </div>
      
      {/* UV Warning if high */}
      {currentWeather?.uvi >= 6 && (
        <div className={`p-3 rounded-lg ${uvInfo.color} flex items-center gap-2`}>
          <span className="text-lg">☀️</span>
          <div>
            <div className="font-semibold text-sm">UV Index: {uvInfo.level}</div>
            <div className="text-xs">{uvInfo.advice}</div>
          </div>
        </div>
      )}
      
      {/* Activity Windows */}
      <div className="bg-white rounded-lg p-3 border border-slate-200">
        <h4 className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
          <Icons.clock className="w-4 h-4" />
          ACTIVITY WINDOWS
        </h4>
        <div className="space-y-1">
          {activityWindows.map((window, i) => (
            <div key={i} className="flex justify-between items-center text-xs">
              <span className="text-slate-600">{window.time}</span>
              <div className="text-right">
                <div className={`font-semibold ${window.color}`}>{window.status}</div>
                <div className="text-slate-500 text-xs">{window.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Today's Tips */}
      <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
        <h4 className="text-xs font-semibold text-amber-800 mb-2">
          💡 TODAY'S TIPS
        </h4>
        <ul className="space-y-1">
          {todaysTips.map((tip, i) => (
            <li key={i} className="text-xs text-amber-700 flex items-start gap-1">
              <span className="mt-0.5">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Hourly Toggle */}
      {todaysForecast?.hourly && (
        <button
          onClick={() => setShowHourly(!showHourly)}
          className="w-full text-xs text-sky-600 hover:text-sky-700 font-semibold"
        >
          {showHourly ? 'Hide' : 'Show'} Hourly Forecast →
        </button>
      )}
      
      {/* Hourly Forecast */}
      {showHourly && todaysForecast?.hourly && (
        <div className="bg-white rounded-lg p-3 border border-slate-200">
          <h4 className="text-xs font-semibold text-slate-700 mb-2">Hourly Breakdown</h4>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {todaysForecast.hourly.slice(0, 8).map((hour, i) => (
              <div key={i} className="flex-shrink-0 text-center p-2 bg-slate-50 rounded-lg min-w-[60px]">
                <p className="text-xs text-slate-600">{hour.time}</p>
                {getWeatherIcon(hour.description, 'w-5 h-5 mx-auto my-1')}
                <p className="text-sm font-semibold">{hour.temp}°</p>
                {hour.rain > 0 && (
                  <p className="text-xs text-blue-600">💧{hour.rain}mm</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Last Update */}
      {lastUpdate && (
        <div className="text-center">
          <button
            onClick={fetchWeatherData}
            className="text-xs text-slate-400 hover:text-slate-600"
          >
            Updated {lastUpdate.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })} • Tap to refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
