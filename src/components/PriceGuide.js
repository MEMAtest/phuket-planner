import React, { useMemo, useState, useEffect } from 'react';
import { Icons, getPriceGuideForCountry } from '../data/staticData';
import { useCountry } from '../state/CountryContext';
import { formatMoney } from '../services/currency';

const PriceGuide = () => {
  const { country, language } = useCountry();
  const guideConfig = getPriceGuideForCountry(country.iso2);
  const guideData = guideConfig.data;
  const categories = useMemo(
    () => Object.keys(guideData).filter(key => key !== 'tips'),
    [guideData]
  );
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showHomeCurrency, setShowHomeCurrency] = useState(true);
  const currencyCode = showHomeCurrency ? guideConfig.homeCurrency : guideConfig.currency;
  const priceKey = showHomeCurrency ? guideConfig.homeKey : guideConfig.localKey;
  const locale = language || 'en-GB';

  useEffect(() => {
    setSelectedCategory(categories[0]);
    setShowHomeCurrency(true);
  }, [guideData, categories, country.iso2]);

  const formatPrice = (price) => {
    if (!price) return '-';
    const formatValue = (value) => formatMoney(value, currencyCode, locale);

    if (typeof price === 'number') {
      return formatValue(price);
    }

    if (price.min !== undefined && price.max !== undefined) {
      return `${formatValue(price.min)} - ${formatValue(price.max)}`;
    }

    if (price.typical !== undefined) {
      return formatValue(price.typical);
    }

    if (price.adult !== undefined && price.child !== undefined) {
      return `Adult: ${formatValue(price.adult)} / Child: ${formatValue(price.child)}`;
    }

    if (price.adult !== undefined) {
      return `Adult: ${formatValue(price.adult)}`;
    }

    return '-';
  };

  const selectedItems = selectedCategory ? guideData[selectedCategory]?.items || [] : [];
  const tips = guideData.tips;
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4">
        <h3 className="font-bold text-xl text-white mb-2 flex items-center gap-2">
          <Icons.Wallet className="w-6 h-6" />
          {guideConfig.title}
        </h3>
        <p className="text-emerald-100 text-sm">
          {guideConfig.subtitle}
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
              {guideData[cat].title}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setShowHomeCurrency(!showHomeCurrency)}
          className="px-3 py-1.5 bg-white rounded-lg text-sm font-medium border
                   hover:bg-slate-50 transition-colors"
        >
          Show {showHomeCurrency ? guideConfig.localLabel : guideConfig.homeLabel}
        </button>
      </div>
      
      {/* Price List */}
      <div className="p-4">
        <div className="grid gap-3">
          {selectedItems.map((item, index) => {
            const price = item[priceKey];
            const typical = price?.typical;

            return (
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
                  {formatPrice(price)}
                </p>
                {typeof typical !== 'undefined' && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    Typical: {formatMoney(typical, currencyCode, locale)}
                  </p>
                )}
              </div>
            </div>
          );
          })}
        </div>
        
        {/* Tips Section */}
        {tips && (
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-sm text-amber-800 mb-3 flex items-center gap-2">
              <Icons.Lightbulb className="w-5 h-5" />
              {tips.title || 'Money Tips'}
            </h4>
            <ul className="space-y-2">
              {tips.items.map((tip, i) => (
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
          {guideConfig.quickReference.map((item, index) => (
            <div key={index} className="bg-white p-2 rounded-lg">
              <p className="text-xs text-slate-600">{item.label}</p>
              <p className="font-bold text-emerald-600">
                {showHomeCurrency ? item.home : item.local}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceGuide;
