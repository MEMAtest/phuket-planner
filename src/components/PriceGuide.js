import React, { useState } from 'react';
import { Icons } from '../data/staticData';
import { PRICE_GUIDE } from '../data/staticData';

const PriceGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState('food');
  const [showGBP, setShowGBP] = useState(true);
  
  const categories = Object.keys(PRICE_GUIDE).filter(key => key !== 'tips');
  
  const formatPrice = (price, currency) => {
    if (!price) return '-';
    
    if (currency === 'THB') {
      if (price.min && price.max) {
        return `฿${price.min}-${price.max}`;
      } else if (price.typical) {
        return `฿${price.typical}`;
      } else if (price.adult) {
        return `Adult: ฿${price.adult} / Child: ฿${price.child}`;
      }
      return `฿${price}`;
    } else {
      if (price.min && price.max) {
        return `£${price.min}-${price.max}`;
      } else if (price.typical) {
        return `£${price.typical}`;
      } else if (price.adult) {
        return `Adult: £${price.adult} / Child: £${price.child}`;
      }
      return `£${price}`;
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4">
        <h3 className="font-bold text-xl text-white mb-2 flex items-center gap-2">
          <Icons.Wallet className="w-6 h-6" />
          Phuket Price Guide
        </h3>
        <p className="text-emerald-100 text-sm">
          Average prices for August 2025 • Exchange rate: £1 ≈ ฿44
        </p>
      </div>
      
      {/* Currency Toggle */}
      <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${selectedCategory === cat 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              {PRICE_GUIDE[cat].title}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setShowGBP(!showGBP)}
          className="px-3 py-1.5 bg-white rounded-lg text-sm font-medium border
                   hover:bg-slate-50 transition-colors"
        >
          Show {showGBP ? '฿ THB' : '£ GBP'}
        </button>
      </div>
      
      {/* Price List */}
      <div className="p-4">
        <div className="grid gap-3">
          {PRICE_GUIDE[selectedCategory].items.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg
                       bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">{item.icon}</span>
                <div>
                  <h4 className="font-semibold text-sm text-slate-800">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">{item.note}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-slate-800">
                  {formatPrice(showGBP ? item.gbp : item.thb, showGBP ? 'GBP' : 'THB')}
                </p>
                {item.thb.typical && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    Typical: {showGBP ? `£${item.gbp.typical}` : `฿${item.thb.typical}`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Tips Section */}
        {selectedCategory === 'shopping' && (
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-sm text-amber-800 mb-3 flex items-center gap-2">
              <Icons.Lightbulb className="w-5 h-5" />
              Money Saving Tips
            </h4>
            <ul className="space-y-2">
              {PRICE_GUIDE.tips.items.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-amber-700">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Quick Reference */}
      <div className="p-4 bg-slate-50 border-t">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white p-2 rounded-lg">
            <p className="text-xs text-slate-600">Street Food</p>
            <p className="font-bold text-emerald-600">฿40-80</p>
          </div>
          <div className="bg-white p-2 rounded-lg">
            <p className="text-xs text-slate-600">Taxi (10km)</p>
            <p className="font-bold text-emerald-600">฿150-250</p>
          </div>
          <div className="bg-white p-2 rounded-lg">
            <p className="text-xs text-slate-600">Beer</p>
            <p className="font-bold text-emerald-600">฿80-150</p>
          </div>
          <div className="bg-white p-2 rounded-lg">
            <p className="text-xs text-slate-600">Massage</p>
            <p className="font-bold text-emerald-600">฿300-500</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceGuide;
