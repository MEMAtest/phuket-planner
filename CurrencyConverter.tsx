import React, { useState, useEffect } from 'react';
import { Icons } from '../data/staticData';
import { useTrip } from '../context/TripContext';

const CurrencyConverter: React.FC = () => {
  const { preferences } = useTrip();
  const [rate] = useState(preferences.exchangeRate);
  const [gbp, setGbp] = useState(100);
  const [thb, setThb] = useState(100 * rate);
  const [lastChanged, setLastChanged] = useState<'gbp' | 'thb'>('gbp');
  
  // Common amounts for quick conversion
  const quickAmounts = {
    gbp: [10, 20, 50, 100, 200],
    thb: [500, 1000, 2000, 5000, 10000]
  };
  
  const handleGbpChange = (value: string) => {
    const val = parseFloat(value) || 0;
    setGbp(val);
    setThb(parseFloat((val * rate).toFixed(2)));
    setLastChanged('gbp');
  };
  
  const handleThbChange = (value: string) => {
    const val = parseFloat(value) || 0;
    setThb(val);
    setGbp(parseFloat((val / rate).toFixed(2)));
    setLastChanged('thb');
  };
  
  const setQuickAmount = (amount: number, currency: 'gbp' | 'thb') => {
    if (currency === 'gbp') {
      handleGbpChange(amount.toString());
    } else {
      handleThbChange(amount.toString());
    }
  };
  
  // Useful reference amounts
  const references = [
    { item: "Street food meal", thb: 60, icon: "🍜" },
    { item: "Taxi ride (10 min)", thb: 200, icon: "🚕" },
    { item: "Beer at restaurant", thb: 120, icon: "🍺" },
    { item: "Bottle of water", thb: 20, icon: "💧" },
    { item: "Entrance to attraction", thb: 500, icon: "🎫" },
    { item: "Massage (1 hour)", thb: 400, icon: "💆" }
  ];
  
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
        <Icons.repeat className="w-6 h-6 text-sky-600"/>
        Currency Converter
      </h3>
      
      {/* Main Converter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-slate-600">GBP (£)</label>
          <div className="mt-1 relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">£</span>
            <input 
              type="number" 
              value={gbp} 
              onChange={(e) => handleGbpChange(e.target.value)} 
              className={`
                pl-8 block w-full rounded-md border-2 shadow-sm text-lg font-bold
                focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                ${lastChanged === 'gbp' ? 'border-sky-400' : 'border-slate-300'}
              `}
            />
          </div>
          {/* Quick amounts for GBP */}
          <div className="flex gap-1 mt-2">
            {quickAmounts.gbp.map(amount => (
              <button
                key={amount}
                onClick={() => setQuickAmount(amount, 'gbp')}
                className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded transition-colors"
              >
                £{amount}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-600">THB (฿)</label>
          <div className="mt-1 relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">฿</span>
            <input 
              type="number" 
              value={thb} 
              onChange={(e) => handleThbChange(e.target.value)} 
              className={`
                pl-8 block w-full rounded-md border-2 shadow-sm text-lg font-bold
                focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                ${lastChanged === 'thb' ? 'border-sky-400' : 'border-slate-300'}
              `}
            />
          </div>
          {/* Quick amounts for THB */}
          <div className="flex gap-1 mt-2">
            {quickAmounts.thb.map(amount => (
              <button
                key={amount}
                onClick={() => setQuickAmount(amount, 'thb')}
                className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded transition-colors"
              >
                ฿{amount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center text-xs text-slate-500 mt-3 p-2 bg-slate-50 rounded">
        Exchange Rate: 1 GBP ≈ {rate} THB
        <br />
        <span className="text-xs italic">Rates may vary at exchange counters</span>
      </div>
      
      {/* Reference Prices */}
      <div className="mt-6 pt-4 border-t">
        <h4 className="font-semibold text-sm text-slate-700 mb-3">💰 Typical Prices in Phuket:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {references.map((ref, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded">
              <span className="flex items-center gap-2 text-sm">
                <span>{ref.icon}</span>
                <span className="text-slate-700">{ref.item}</span>
              </span>
              <span className="text-sm font-semibold">
                <span className="text-slate-600">฿{ref.thb}</span>
                <span className="text-slate-400 ml-1">(£{(ref.thb / rate).toFixed(1)})</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tips */}
      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-xs text-amber-800">
          <strong>💡 Tip:</strong> Always carry small notes (20, 50, 100 baht) for street vendors and taxis. 
          Many places don't accept cards for small amounts.
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
