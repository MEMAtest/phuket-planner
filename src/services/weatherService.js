// Weather Service for OpenWeatherMap API
// Handles all weather data fetching and caching

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || '4221eacbcab49fe83e6b6381d3255eb4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Mai Khao Beach coordinates (near hotel)
const MAI_KHAO_COORDS = {
  lat: 8.1707,
  lon: 98.2994
};

// Old Town Phuket coordinates
const OLD_TOWN_COORDS = {
  lat: 7.8840,
  lon: 98.3865
};

// Cache weather data to avoid excessive API calls
let weatherCache = {
  current: null,
  forecast: null,
  lastFetch: null
};

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Get current weather
export const getCurrentWeather = async (location = 'maiKhao') => {
  try {
    // Check cache first
    if (weatherCache.current && weatherCache.lastFetch && 
        (Date.now() - weatherCache.lastFetch < CACHE_DURATION)) {
      console.log('Using cached weather data');
      return weatherCache.current;
    }

    // Get coordinates based on location
    const coords = location === 'oldTown' ? OLD_TOWN_COORDS : MAI_KHAO_COORDS;
    
    const response = await fetch(
      `${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather API error');
    }
    
    const data = await response.json();
    
    // Transform to our format
    const weatherData = {
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      temp_min: Math.round(data.main.temp_min),
      temp_max: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      main: data.weather[0].main,
      icon: data.weather[0].icon,
      wind_speed: data.wind.speed,
      clouds: data.clouds.all,
      timestamp: Date.now()
    };
    
    // Update cache
    weatherCache.current = weatherData;
    weatherCache.lastFetch = Date.now();
    
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

// Get 5-day forecast (3-hour intervals)
export const getWeatherForecast = async (location = 'maiKhao') => {
  try {
    // Check cache
    if (weatherCache.forecast && weatherCache.lastFetch && 
        (Date.now() - weatherCache.lastFetch < CACHE_DURATION)) {
      console.log('Using cached forecast data');
      return weatherCache.forecast;
    }

    const coords = location === 'oldTown' ? OLD_TOWN_COORDS : MAI_KHAO_COORDS;
    
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&cnt=40`
    );
    
    if (!response.ok) {
      throw new Error('Forecast API error');
    }
    
    const data = await response.json();
    
    // Group forecast by day
    const dailyForecasts = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-CA'); // YYYY-MM-DD format
      
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          date: date,
          temps: [],
          descriptions: [],
          icons: [],
          humidity: [],
          wind: [],
          rain: 0,
          hourly: []
        };
      }
      
      dailyForecasts[date].temps.push(item.main.temp);
      dailyForecasts[date].descriptions.push(item.weather[0].description);
      dailyForecasts[date].icons.push(item.weather[0].icon);
      dailyForecasts[date].humidity.push(item.main.humidity);
      dailyForecasts[date].wind.push(item.wind.speed);
      
      // Add rain amount if present
      if (item.rain && item.rain['3h']) {
        dailyForecasts[date].rain += item.rain['3h'];
      }
      
      // Store hourly data (for detailed view)
      dailyForecasts[date].hourly.push({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        }),
        temp: Math.round(item.main.temp),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        rain: item.rain ? item.rain['3h'] : 0
      });
    });
    
    // Process daily summaries
    const processedForecast = Object.keys(dailyForecasts).map(date => {
      const day = dailyForecasts[date];
      const temps = day.temps;
      
      // Find most common weather description
      const descriptionCounts = {};
      day.descriptions.forEach(desc => {
        descriptionCounts[desc] = (descriptionCounts[desc] || 0) + 1;
      });
      const mainDescription = Object.keys(descriptionCounts).reduce((a, b) => 
        descriptionCounts[a] > descriptionCounts[b] ? a : b
      );
      
      return {
        date: date,
        dow: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        hi: Math.round(Math.max(...temps)),
        lo: Math.round(Math.min(...temps)),
        summary: mainDescription,
        humidity: Math.round(day.humidity.reduce((a, b) => a + b) / day.humidity.length),
        wind: Math.round(day.wind.reduce((a, b) => a + b) / day.wind.length),
        rainAmount: Math.round(day.rain),
        hourly: day.hourly,
        icon: day.icons[Math.floor(day.icons.length / 2)] // Middle of day icon
      };
    });
    
    // Update cache
    weatherCache.forecast = processedForecast;
    
    return processedForecast;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
};

// Get UV Index (requires different endpoint - One Call API)
export const getUVIndex = async (location = 'maiKhao') => {
  try {
    const coords = location === 'oldTown' ? OLD_TOWN_COORDS : MAI_KHAO_COORDS;
    
    const response = await fetch(
      `${BASE_URL}/uvi?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      // UV Index might not be available on free tier
      console.log('UV Index not available');
      return null;
    }
    
    const data = await response.json();
    return {
      value: data.value,
      level: getUVLevel(data.value)
    };
  } catch (error) {
    console.error('Error fetching UV index:', error);
    return null;
  }
};

// Helper function to categorize UV levels
const getUVLevel = (uv) => {
  if (uv <= 2) return { text: 'Low', color: 'green' };
  if (uv <= 5) return { text: 'Moderate', color: 'yellow' };
  if (uv <= 7) return { text: 'High', color: 'orange' };
  if (uv <= 10) return { text: 'Very High', color: 'red' };
  return { text: 'Extreme', color: 'purple' };
};

// Get weather-based recommendations
export const getWeatherRecommendations = (weather) => {
  const recommendations = [];
  
  if (!weather) return recommendations;
  
  // Temperature-based
  if (weather.temp > 35) {
    recommendations.push({
      type: 'warning',
      icon: '🌡️',
      message: 'Very hot today! Stay hydrated and seek shade 11am-3pm'
    });
  }
  
  // Rain-based
  if (weather.main && weather.main.toLowerCase().includes('rain')) {
    recommendations.push({
      type: 'info',
      icon: '☔',
      message: 'Rain expected - bring umbrellas and consider indoor activities'
    });
  }
  
  // Humidity-based
  if (weather.humidity > 85) {
    recommendations.push({
      type: 'info',
      icon: '💧',
      message: 'High humidity - clothes will take longer to dry'
    });
  }
  
  // Wind-based
  if (weather.wind_speed > 10) {
    recommendations.push({
      type: 'warning',
      icon: '💨',
      message: 'Windy conditions - not ideal for beach umbrellas'
    });
  }
  
  // Perfect weather
  if (weather.temp >= 28 && weather.temp <= 32 && 
      !weather.main.toLowerCase().includes('rain')) {
    recommendations.push({
      type: 'success',
      icon: '😎',
      message: 'Perfect weather for outdoor activities!'
    });
  }
  
  return recommendations;
};

// Clear cache (useful for manual refresh)
export const clearWeatherCache = () => {
  weatherCache = {
    current: null,
    forecast: null,
    lastFetch: null
  };
};

// Check if we should show weather alert
export const checkWeatherAlert = (forecast) => {
  if (!forecast || !forecast.length) return null;
  
  const today = forecast[0];
  const tomorrow = forecast[1];
  
  // Check for significant rain
  if (today.rainAmount > 10) {
    return {
      type: 'warning',
      message: `Heavy rain expected today (${today.rainAmount}mm). Plan indoor activities.`
    };
  }
  
  // Check for storms
  if (today.summary.toLowerCase().includes('storm')) {
    return {
      type: 'danger',
      message: 'Storms expected today. Avoid beaches and outdoor activities.'
    };
  }
  
  // Check tomorrow for planning
  if (tomorrow && tomorrow.rainAmount > 10) {
    return {
      type: 'info',
      message: `Rain expected tomorrow (${tomorrow.rainAmount}mm). Consider rescheduling outdoor plans.`
    };
  }
  
  return null;
};
