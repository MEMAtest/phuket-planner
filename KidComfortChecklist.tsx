import React, { useState, useEffect } from 'react';
import { Icons } from '../data/staticData';

interface ChecklistItem {
  id: string;
  text: string;
  category: 'essential' | 'comfort' | 'entertainment' | 'safety';
  checked: boolean;
}

const KidComfortChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    // Load from localStorage or use defaults
    const saved = localStorage.getItem('kidChecklist');
    if (saved) {
      return JSON.parse(saved);
    }
    
    return [
      // Essential Items
      { id: '1', text: 'Passports & travel documents', category: 'essential', checked: false },
      { id: '2', text: 'Travel insurance documents', category: 'essential', checked: false },
      { id: '3', text: 'Hotel booking confirmations', category: 'essential', checked: false },
      { id: '4', text: 'Emergency contact list', category: 'essential', checked: false },
      
      // Comfort Items
      { id: '5', text: 'Travel car seat / booster', category: 'comfort', checked: false },
      { id: '6', text: 'Lightweight stroller with rain cover', category: 'comfort', checked: false },
      { id: '7', text: 'Portable blackout blind', category: 'comfort', checked: false },
      { id: '8', text: 'Favorite blanket/comforter', category: 'comfort', checked: false },
      { id: '9', text: 'Travel pillow', category: 'comfort', checked: false },
      
      // Entertainment
      { id: '10', text: 'Tablet with downloaded content', category: 'entertainment', checked: false },
      { id: '11', text: 'Headphones (kid-sized)', category: 'entertainment', checked: false },
      { id: '12', text: 'Coloring books & crayons', category: 'entertainment', checked: false },
      { id: '13', text: 'Favorite small toys', category: 'entertainment', checked: false },
      { id: '14', text: 'Travel games/cards', category: 'entertainment', checked: false },
      
      // Safety & Health
      { id: '15', text: 'Kid-safe insect repellent', category: 'safety', checked: false },
      { id: '16', text: 'SPF 50+ sunscreen', category: 'safety', checked: false },
      { id: '17', text: 'First-aid kit (Calpol, plasters)', category: 'safety', checked: false },
      { id: '18', text: 'Prescribed medications', category: 'safety', checked: false },
      { id: '19', text: 'Thermometer', category: 'safety', checked: false },
      { id: '20', text: 'Rehydration salts', category: 'safety', checked: false },
      { id: '21', text: 'Floaties/armbands for pool', category: 'safety', checked: false },
      { id: '22', text: 'UV swimwear/rash vests', category: 'safety', checked: false },
      { id: '23', text: 'Sun hats & sunglasses', category: 'safety', checked: false },
      { id: '24', text: 'Reusable water bottles', category: 'safety', checked: false },
    ];
  });
  
  const [customItem, setCustomItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ChecklistItem['category']>('essential');
  const [filter, setFilter] = useState<'all' | ChecklistItem['category']>('all');
  
  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('kidChecklist', JSON.stringify(items));
  }, [items]);
  
  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };
  
  const addCustomItem = () => {
    if (customItem.trim()) {
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        text: customItem,
        category: selectedCategory,
        checked: false
      };
      setItems(prev => [...prev, newItem]);
      setCustomItem('');
    }
  };
  
  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);
  
  const checkedCount = items.filter(item => item.checked).length;
  const progressPercentage = (checkedCount / items.length) * 100;
  
  const getCategoryIcon = (category: ChecklistItem['category']) => {
    switch(category) {
      case 'essential': return '📋';
      case 'comfort': return '🛏️';
      case 'entertainment': return '🎮';
      case 'safety': return '🛡️';
    }
  };
  
  const getCategoryColor = (category: ChecklistItem['category']) => {
    switch(category) {
      case 'essential': return 'text-red-600 bg-red-50 border-red-200';
      case 'comfort': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'entertainment': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'safety': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    }
  };
  
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <h3 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
        <Icons.checkSquare className="w-6 h-6 text-sky-600"/>
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
        {(['essential', 'comfort', 'entertainment', 'safety'] as const).map(cat => (
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
            {parseInt(item.id) > 24 && (
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Icons.trash2 className="w-4 h-4"/>
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
            onChange={(e) => setSelectedCategory(e.target.value as ChecklistItem['category'])}
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
          <strong>✈️ Pro Tip:</strong> Pack essentials in carry-on. Most forgotten items can be bought in Phuket 
          (often cheaper!). Focus on items specific to your kids' needs.
        </p>
      </div>
    </div>
  );
};

export default KidComfortChecklist;
