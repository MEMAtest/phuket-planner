import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Icons } from '../data/staticData';
import { BASE_KID_CHECKLIST, getKidChecklistGuide } from '../data/countryContent';
import { useCountry } from '../state/CountryContext';

const normalizeChecklistItems = (items = []) => {
  return items.map(item => {
    if (typeof item.isCustom === 'boolean') {
      return item;
    }

    const id = (item.id ?? '').toString();
    const numericId = parseInt(id, 10);
    const isLegacyBaseId = !Number.isNaN(numericId) && numericId <= BASE_KID_CHECKLIST.length;
    const isBaseLike = id.startsWith('base-') || isLegacyBaseId;
    const isExtraLike = id.startsWith('extra-');

    return {
      ...item,
      isCustom: !(isBaseLike || isExtraLike)
    };
  });
};

const KidComfortChecklist = () => {
  const { country } = useCountry();
  const storageKey = `kidChecklist_${country.iso2}`;
  const kidGuide = useMemo(() => getKidChecklistGuide(country.iso2), [country.iso2]);

  const buildDefaultItems = useCallback(() => {
    const baseItems = BASE_KID_CHECKLIST.map((item, index) => ({
      id: `base-${index}`,
      text: item.text,
      category: item.category,
      checked: false,
      isCustom: false
    }));

    const extras = (kidGuide.extras || []).map((item, index) => ({
      id: `extra-${country.iso2}-${index}`,
      text: item.text,
      category: item.category,
      checked: false,
      isCustom: false
    }));

    return [...baseItems, ...extras];
  }, [kidGuide, country.iso2]);

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return normalizeChecklistItems(parsed);
        }
      } catch (error) {
        console.warn('Failed to parse saved kid checklist', error);
      }
    }
    return buildDefaultItems();
  });
  
  const [customItem, setCustomItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('essential');
  const [filter, setFilter] = useState('all');
  
  // Refresh items when the user switches countries
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(normalizeChecklistItems(parsed));
          return;
        }
      } catch (error) {
        console.warn('Failed to parse saved kid checklist', error);
      }
    } else {
      setItems(buildDefaultItems());
      return;
    }
  }, [storageKey, buildDefaultItems]);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);
  
  const toggleItem = (id) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };
  
  const addCustomItem = () => {
    if (customItem.trim()) {
      const newItem = {
        id: Date.now().toString(),
        text: customItem,
        category: selectedCategory,
        checked: false,
        isCustom: true
      };
      setItems(prev => [...prev, newItem]);
      setCustomItem('');
    }
  };
  
  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);
  
  const checkedCount = items.filter(item => item.checked).length;
  const progressPercentage = items.length ? (checkedCount / items.length) * 100 : 0;
  
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'essential': return '📋';
      case 'comfort': return '🛏️';
      case 'entertainment': return '🎮';
      case 'safety': return '🛡️';
      default: return '📋';
    }
  };
  
  const getCategoryColor = (category) => {
    switch(category) {
      case 'essential': return 'text-red-600 bg-red-50 border-red-200';
      case 'comfort': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'entertainment': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'safety': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };
  
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <h3 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
        <Icons.CheckSquare className="w-6 h-6 text-sky-600"/>
        Kid-Comfort Packing Checklist
      </h3>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-600 mb-1">
          <span>Packing Progress</span>
          <span>{checkedCount}/{items.length} packed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{width: `${progressPercentage}%`}}
          />
        </div>
      </div>
      
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap
                    ${filter === 'all' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          All ({items.length})
        </button>
        {['essential', 'comfort', 'entertainment', 'safety'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap capitalize
                      ${filter === cat ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            {getCategoryIcon(cat)} {cat} ({items.filter(i => i.category === cat).length})
          </button>
        ))}
      </div>
      
      {/* Checklist Items */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className={`flex items-center gap-3 p-2 rounded-lg border ${item.checked ? 'opacity-60' : ''}`}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
              className="h-5 w-5 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
            />
            <span className={`flex-1 text-sm ${item.checked ? 'line-through text-slate-400' : 'text-slate-700'}`}>
              {item.text}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
              {getCategoryIcon(item.category)}
            </span>
            {item.isCustom && (
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Icons.Trash2 className="w-4 h-4"/>
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Add Custom Item */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-sm font-semibold text-slate-700 mb-2">Add custom item:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={customItem}
            onChange={(e) => setCustomItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
            placeholder="Enter item..."
            className="flex-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-sky-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="essential">Essential</option>
            <option value="comfort">Comfort</option>
            <option value="entertainment">Entertainment</option>
            <option value="safety">Safety</option>
          </select>
          <button
            onClick={addCustomItem}
            className="px-4 py-2 bg-sky-600 text-white rounded-md text-sm font-semibold hover:bg-sky-700"
          >
            Add
          </button>
        </div>
      </div>
      
      {/* Travel Tip */}
      <div className="mt-4 p-3 bg-sky-50 rounded-lg border border-sky-200">
        <p className="text-xs text-sky-800">
          <strong>✈️ Local Tip ({country.name}):</strong> {kidGuide.tip}
        </p>
      </div>
    </div>
  );
};

export default KidComfortChecklist;
