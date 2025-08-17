import React, { useState, useEffect } from 'react';
import { Icons } from '../data/staticData';

const CurrencyConverter = () => {
  // Default exchange rate
  const DEFAULT_RATE = 43.5; // 1 GBP = 43.5 THB approximately
  
  const [rate, setRate] = useState(() => {
    // Try to load from localStorage first
    const saved = localStorage.getItem('exchange_rate');
    return saved ? parseFloat(saved) : DEFAULT_RATE;
  });
  
  const [gbp, setGbp] = useState(100);
  const [thb, setThb] = useState(100 * rate);
  const [lastUpdated, setLastUpdated] = useState(() => {
    const saved = localStorage.getItem('exchange_rate_updated');
    return saved || new Date().toISOString();
  });
  const [loading, setLoading] = useState(false);

  // Save rate to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('exchange_rate', rate.toString());
    localStorage.setItem('exchange_rate_updated', lastUpdated);
  }, [rate, lastUpdated]);

  // Fetch latest exchange rate
  const fetchExchangeRate = async () => {
    setLoading(true);
    try {
      // Using exchangerate-api.com free tier
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/GBP');
      if (response.ok) {
        const data = await response.json();
        const newRate = data.rates?.THB || DEFAULT_RATE;
        setRate(newRate);
        setLastUpdated(new Date().toISOString());
        // Recalculate THB with new rate
        setThb(gbp * newRate);
      }
    } catch (error) {
      console.log('Could not fetch exchange rate, using default:', DEFAULT_RATE);
    } finally {
      setLoading(false);
    }
  };

  // Check if rate is older than 12 hours
  useEffect(() => {
    const lastUpdate = new Date(lastUpdated);
    const now = new Date();
    const hoursSinceUpdate = (now - lastUpdate) / (1000 * 60 * 60);
    
    if (hoursSinceUpdate > 12) {
      fetchExchangeRate();
    }
  }, []);

  const handleGbpChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setGbp(val);
    setThb(parseFloat((val * rate).toFixed(2)));
  };

  const handleThbChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setThb(val);
    setGbp(parseFloat((val / rate).toFixed(2)));
  };

  const handleRateChange = (e) => {
    const val = parseFloat(e.target.value) || DEFAULT_RATE;
    setRate(val);
    setThb(parseFloat((gbp * val).toFixed(2)));
    setLastUpdated(new Date().toISOString());
  };

  // Format date for display
  const formatUpdateTime = () => {
    const date = new Date(lastUpdated);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
          {Icons.repeat ? <Icons.repeat className="w-6 h-6 text-sky-600"/> : <span>💱</span>}
          Currency Converter
        </h3>
        <button
          onClick={fetchExchangeRate}
          disabled={loading}
          className="text-sm px-3 py-1 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors disabled:opacity-50"
          title="Update exchange rate"
        >
          {loading ? 'Updating...' : 'Update Rate'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            GBP (£)
          </label>
          <input 
            type="number" 
            value={gbp} 
            onChange={handleGbpChange} 
            className="block w-full px-3 py-2 rounded-md border border-slate-300 shadow-sm text-lg font-bold focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="0.00"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            THB (฿)
          </label>
          <input 
            type="number" 
            value={thb} 
            onChange={handleThbChange} 
            className="block w-full px-3 py-2 rounded-md border border-slate-300 shadow-sm text-lg font-bold focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="0.00"
          />
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-600">Rate: 1 GBP =</span>
            <input
              type="number"
              value={rate}
              onChange={handleRateChange}
              className="w-20 px-2 py-1 border rounded text-sm font-medium"
              step="0.1"
            />
            <span className="text-slate-600">THB</span>
          </div>
          <span className="text-xs text-slate-500">
            Updated: {formatUpdateTime()}
          </span>
        </div>
      </div>
      
      {/* Quick conversion reference */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="bg-slate-50 p-2 rounded">
          <span className="font-medium">£10</span> = ฿{(10 * rate).toFixed(0)}
        </div>
        <div className="bg-slate-50 p-2 rounded">
          <span className="font-medium">£50</span> = ฿{(50 * rate).toFixed(0)}
        </div>
        <div className="bg-slate-50 p-2 rounded">
          <span className="font-medium">£100</span> = ฿{(100 * rate).toFixed(0)}
        </div>
        <div className="bg-slate-50 p-2 rounded">
          <span className="font-medium">£500</span> = ฿{(500 * rate).toFixed(0)}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
