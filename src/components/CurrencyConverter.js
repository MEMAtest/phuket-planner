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
  
  const [amount1, setAmount1] = useState(100);
  const [amount2, setAmount2] = useState(100 * rate);
  const [currency1, setCurrency1] = useState('GBP');
  const [currency2, setCurrency2] = useState('THB');
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
        // Recalculate amount2 with new rate
        if (currency1 === 'GBP') {
          setAmount2(parseFloat((amount1 * newRate).toFixed(2)));
        } else {
          setAmount2(parseFloat((amount1 / newRate).toFixed(2)));
        }
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

  const handleAmount1Change = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setAmount1(val);
    
    if (currency1 === 'GBP') {
      setAmount2(parseFloat((val * rate).toFixed(2)));
    } else {
      setAmount2(parseFloat((val / rate).toFixed(2)));
    }
  };

  const handleAmount2Change = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setAmount2(val);
    
    if (currency1 === 'GBP') {
      setAmount1(parseFloat((val / rate).toFixed(2)));
    } else {
      setAmount1(parseFloat((val * rate).toFixed(2)));
    }
  };

  const handleSwapCurrencies = () => {
    // Swap currencies
    setCurrency1(currency2);
    setCurrency2(currency1);
    
    // Swap amounts
    setAmount1(amount2);
    setAmount2(amount1);
  };

  const handleRateChange = (e) => {
    const val = parseFloat(e.target.value) || DEFAULT_RATE;
    setRate(val);
    
    // Recalculate amount2 based on current direction
    if (currency1 === 'GBP') {
      setAmount2(parseFloat((amount1 * val).toFixed(2)));
    } else {
      setAmount2(parseFloat((amount1 / val).toFixed(2)));
    }
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

  // Get currency symbols
  const getCurrencySymbol = (currency) => {
    return currency === 'GBP' ? '£' : '฿';
  };

  // Calculate quick reference amounts based on current direction
  const getQuickReferences = () => {
    if (currency1 === 'GBP') {
      return [
        { from: '£10', to: `฿${(10 * rate).toFixed(0)}` },
        { from: '£50', to: `฿${(50 * rate).toFixed(0)}` },
        { from: '£100', to: `฿${(100 * rate).toFixed(0)}` },
        { from: '£500', to: `฿${(500 * rate).toFixed(0)}` }
      ];
    } else {
      return [
        { from: '฿100', to: `£${(100 / rate).toFixed(2)}` },
        { from: '฿500', to: `£${(500 / rate).toFixed(2)}` },
        { from: '฿1000', to: `£${(1000 / rate).toFixed(2)}` },
        { from: '฿5000', to: `£${(5000 / rate).toFixed(2)}` }
      ];
    }
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
      
      <div className="flex items-center gap-2">
        {/* First Currency Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            {currency1} ({getCurrencySymbol(currency1)})
          </label>
          <input 
            type="number" 
            value={amount1} 
            onChange={handleAmount1Change} 
            className="block w-full px-3 py-2 rounded-md border border-slate-300 shadow-sm text-lg font-bold focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="0.00"
          />
        </div>
        
        {/* Swap Button */}
        <button
          onClick={handleSwapCurrencies}
          className="mt-6 p-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-all transform hover:scale-110 active:scale-95"
          title="Swap currencies"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M16 3l4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16"/>
          </svg>
        </button>
        
        {/* Second Currency Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            {currency2} ({getCurrencySymbol(currency2)})
          </label>
          <input 
            type="number" 
            value={amount2} 
            onChange={handleAmount2Change} 
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
      
      {/* Quick conversion reference - Dynamic based on direction */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {getQuickReferences().map((ref, index) => (
          <div key={index} className="bg-slate-50 p-2 rounded flex justify-between items-center">
            <span className="font-medium">{ref.from}</span>
            <span className="text-slate-600">→</span>
            <span className="font-medium text-slate-700">{ref.to}</span>
          </div>
        ))}
      </div>
      
      {/* Direction indicator */}
      <div className="mt-3 text-center text-xs text-slate-500">
        Converting {currency1} → {currency2}
      </div>
    </div>
  );
};

export default CurrencyConverter;
