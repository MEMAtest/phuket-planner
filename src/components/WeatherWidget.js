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
  
  const getTodaysForecast = () => {
    if (!forecast || !date) return null;
    return forecast.find(f => f.date === date);
  };
  
  const todaysForecast = getTodaysForecast();
  const recommendations = getWeatherRecommendations(currentWeather);
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-20 bg-slate-200 rounded-lg"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {/* Current Weather */}
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
            <div className="mt-2 text-xs text-slate-500">
              <div>💧 {currentWeather?.humidity || '--'}%</div>
              <div>💨 {currentWeather?.wind_speed || '--'} m/s</div>
            </div>
          </div>
        </div>
        
        {/* Today's Forecast Summary */}
        {todaysForecast && (
          <div className="mt-3 pt-3 border-t border-sky-200">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600">Today's Range</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">{todaysForecast.hi}°</span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-500">{todaysForecast.lo}°</span>
                {todaysForecast.rainAmount > 0 && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    💧 {todaysForecast.rainAmount}mm
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Hourly Toggle */}
        {todaysForecast && todaysForecast.hourly && (
          <button
            onClick={() => setShowHourly(!showHourly)}
            className="w-full mt-2 text-xs text-sky-600 hover:text-sky-700 font-semibold"
          >
            {showHourly ? 'Hide' : 'Show'} Hourly Forecast →
          </button>
        )}
      </div>
      
      {/* Hourly Forecast */}
      {showHourly && todaysForecast && todaysForecast.hourly && (
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
      
      {/* Weather Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-2">
          {recommendations.map((rec, i) => (
            <div 
              key={i}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-2
                ${rec.type === 'warning' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                  rec.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
                  'bg-blue-50 text-blue-800 border border-blue-200'}`}
            >
              <span className="text-base">{rec.icon}</span>
              <span>{rec.message}</span>
            </div>
          ))}
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
