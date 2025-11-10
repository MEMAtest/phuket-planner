import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Icons } from '../../data/staticData';
import { useCountry } from '../../state/CountryContext';
import { useProfile } from '../../state/ProfileContext';
import { useTrip } from '../../context/TripContext';

/**
 * Generate smart packing list based on weather, profile, and trip duration
 */
const generatePackingList = (weatherData, profile, tripDuration, country) => {
  const items = [];

  // Calculate average temperature
  const avgTemp = weatherData?.forecast?.length > 0
    ? weatherData.forecast.reduce((sum, day) => sum + ((day.hi + day.lo) / 2), 0) / weatherData.forecast.length
    : 25; // Default to 25°C

  const isCold = avgTemp < 15;
  const isWarm = avgTemp > 25;
  const isRainy = weatherData?.forecast?.some(day =>
    day.summary?.toLowerCase().includes('rain') ||
    day.summary?.toLowerCase().includes('shower')
  );

  // CLOTHING - Base items
  const clothingBase = [
    { id: 'underwear', text: `Underwear (${Math.min(tripDuration + 2, 10)} pairs)`, category: 'clothing' },
    { id: 'socks', text: `Socks (${Math.min(tripDuration + 2, 10)} pairs)`, category: 'clothing' },
    { id: 'sleepwear', text: 'Sleepwear / Pajamas', category: 'clothing' },
    { id: 'comfortable-shoes', text: 'Comfortable walking shoes', category: 'clothing' },
  ];

  // Weather-specific clothing
  if (isCold) {
    clothingBase.push(
      { id: 'warm-jacket', text: 'Warm jacket / coat', category: 'clothing' },
      { id: 'sweaters', text: 'Sweaters / hoodies (2-3)', category: 'clothing' },
      { id: 'long-pants', text: `Long pants / jeans (${Math.ceil(tripDuration / 2)})`, category: 'clothing' },
      { id: 'thermal-underwear', text: 'Thermal underwear', category: 'clothing' },
      { id: 'scarf-gloves', text: 'Scarf, gloves, beanie', category: 'clothing' }
    );
  } else if (isWarm) {
    clothingBase.push(
      { id: 't-shirts', text: `T-shirts / tops (${Math.min(tripDuration, 7)})`, category: 'clothing' },
      { id: 'shorts', text: 'Shorts (2-3 pairs)', category: 'clothing' },
      { id: 'light-pants', text: 'Light pants / skirts (2)', category: 'clothing' },
      { id: 'sun-hat', text: 'Sun hat / cap', category: 'clothing' },
      { id: 'sunglasses', text: 'Sunglasses', category: 'clothing' },
      { id: 'sandals', text: 'Sandals / flip-flops', category: 'clothing' }
    );
  } else {
    clothingBase.push(
      { id: 't-shirts', text: `T-shirts / tops (${Math.min(tripDuration, 6)})`, category: 'clothing' },
      { id: 'light-jacket', text: 'Light jacket / cardigan', category: 'clothing' },
      { id: 'pants', text: `Pants (${Math.ceil(tripDuration / 3)})`, category: 'clothing' }
    );
  }

  if (isRainy) {
    clothingBase.push(
      { id: 'rain-jacket', text: 'Rain jacket / waterproof layer', category: 'clothing' },
      { id: 'umbrella', text: 'Compact umbrella', category: 'clothing' }
    );
  }

  // Profile-specific clothing
  if (profile?.type === 'business') {
    clothingBase.push(
      { id: 'business-attire', text: 'Business attire (suits/dresses)', category: 'clothing' },
      { id: 'dress-shoes', text: 'Dress shoes', category: 'clothing' },
      { id: 'tie-accessories', text: 'Tie / professional accessories', category: 'clothing' }
    );
  }

  if (profile?.preferences?.activities?.includes('beach')) {
    clothingBase.push(
      { id: 'swimwear', text: 'Swimwear (2)', category: 'clothing' },
      { id: 'beach-towel', text: 'Beach towel', category: 'clothing' }
    );
  }

  if (profile?.preferences?.activities?.includes('adventure') || profile?.type === 'adventure') {
    clothingBase.push(
      { id: 'hiking-boots', text: 'Hiking boots / trail shoes', category: 'clothing' },
      { id: 'athletic-wear', text: 'Athletic / outdoor wear', category: 'clothing' },
      { id: 'backpack', text: 'Daypack / hiking backpack', category: 'clothing' }
    );
  }

  if (profile?.preferences?.activities?.includes('nightlife')) {
    clothingBase.push(
      { id: 'going-out-outfit', text: 'Going out / evening outfits (2)', category: 'clothing' }
    );
  }

  items.push(...clothingBase);

  // TOILETRIES
  const toiletries = [
    { id: 'toothbrush', text: 'Toothbrush & toothpaste', category: 'toiletries' },
    { id: 'shampoo', text: 'Shampoo & conditioner', category: 'toiletries' },
    { id: 'soap', text: 'Body wash / soap', category: 'toiletries' },
    { id: 'deodorant', text: 'Deodorant', category: 'toiletries' },
    { id: 'skincare', text: 'Face wash & moisturizer', category: 'toiletries' },
    { id: 'sunscreen', text: isWarm ? 'Sunscreen (SPF 30+)' : 'Sunscreen', category: 'toiletries' },
    { id: 'medications', text: 'Personal medications', category: 'toiletries' },
    { id: 'first-aid', text: 'Basic first aid kit', category: 'toiletries' },
    { id: 'pain-relief', text: 'Pain relievers (ibuprofen, etc.)', category: 'toiletries' },
    { id: 'insect-repellent', text: 'Insect repellent', category: 'toiletries' }
  ];

  if (isWarm) {
    toiletries.push(
      { id: 'after-sun', text: 'After-sun lotion / aloe vera', category: 'toiletries' }
    );
  }

  items.push(...toiletries);

  // ELECTRONICS
  const electronics = [
    { id: 'phone-charger', text: 'Phone charger', category: 'electronics' },
    { id: 'power-adapter', text: `Power adapter for ${country.name}`, category: 'electronics' },
    { id: 'power-bank', text: 'Portable power bank', category: 'electronics' },
    { id: 'headphones', text: 'Headphones / earbuds', category: 'electronics' },
    { id: 'camera', text: 'Camera (optional)', category: 'electronics' }
  ];

  if (profile?.type === 'business') {
    electronics.push(
      { id: 'laptop', text: 'Laptop & charger', category: 'electronics' },
      { id: 'tablet', text: 'Tablet (optional)', category: 'electronics' },
      { id: 'usb-drives', text: 'USB drives / dongles', category: 'electronics' }
    );
  }

  items.push(...electronics);

  // DOCUMENTS & ESSENTIALS
  const documents = [
    { id: 'passport', text: 'Passport (check expiry date!)', category: 'documents' },
    { id: 'visa', text: 'Visa (if required)', category: 'documents' },
    { id: 'travel-insurance', text: 'Travel insurance documents', category: 'documents' },
    { id: 'flight-tickets', text: 'Flight tickets / boarding passes', category: 'documents' },
    { id: 'hotel-bookings', text: 'Hotel reservation confirmations', category: 'documents' },
    { id: 'credit-cards', text: 'Credit/debit cards', category: 'documents' },
    { id: 'local-currency', text: `Some local currency (${country.currency})`, category: 'documents' },
    { id: 'emergency-contacts', text: 'Emergency contacts list', category: 'documents' },
    { id: 'medical-records', text: 'Medical records / vaccination card', category: 'documents' }
  ];

  if (profile?.type === 'business') {
    documents.push(
      { id: 'business-cards', text: 'Business cards', category: 'documents' }
    );
  }

  items.push(...documents);

  // MISCELLANEOUS
  const misc = [
    { id: 'reusable-bottle', text: 'Reusable water bottle', category: 'miscellaneous' },
    { id: 'snacks', text: 'Travel snacks', category: 'miscellaneous' },
    { id: 'book-entertainment', text: 'Book / entertainment for flights', category: 'miscellaneous' },
    { id: 'travel-pillow', text: 'Travel pillow', category: 'miscellaneous' },
    { id: 'laundry-bag', text: 'Laundry / dirty clothes bag', category: 'miscellaneous' },
    { id: 'ziplock-bags', text: 'Ziplock bags (various sizes)', category: 'miscellaneous' }
  ];

  if (profile?.type === 'family') {
    misc.push(
      { id: 'kids-entertainment', text: 'Kids entertainment / toys', category: 'miscellaneous' },
      { id: 'stroller', text: 'Stroller (if needed)', category: 'miscellaneous' },
      { id: 'baby-supplies', text: 'Diapers / baby supplies', category: 'miscellaneous' }
    );
  }

  items.push(...misc);

  return items.map((item, index) => ({
    ...item,
    id: `base-${item.id || index}`,
    checked: false,
    isCustom: false
  }));
};

const PackingChecklist = () => {
  const { country, city } = useCountry();
  const { currentProfile } = useProfile();
  const { dates } = useTrip();

  const storageKey = useMemo(
    () => `packingList_${country.iso2}_${currentProfile?.id || 'default'}`,
    [country.iso2, currentProfile]
  );

  // Calculate trip duration
  const tripDuration = useMemo(() => {
    if (!dates?.start || !dates?.end) return 7; // Default to 7 days
    const start = new Date(dates.start);
    const end = new Date(dates.end);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  }, [dates]);

  // Get weather data (simplified - you may want to fetch actual forecast)
  const weatherData = useMemo(() => {
    // This is a simplified version. In production, you'd fetch actual weather forecast
    // based on city/country coordinates and trip dates
    return {
      forecast: [
        { hi: 28, lo: 22, summary: 'Partly cloudy' },
        { hi: 30, lo: 24, summary: 'Sunny' },
        { hi: 27, lo: 23, summary: 'Light rain' }
      ]
    };
  }, [city, country]);

  const buildDefaultItems = useCallback(() => {
    return generatePackingList(weatherData, currentProfile, tripDuration, country);
  }, [weatherData, currentProfile, tripDuration, country]);

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (error) {
        console.warn('Failed to parse saved packing checklist', error);
      }
    }
    return buildDefaultItems();
  });

  const [customItem, setCustomItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('miscellaneous');
  const [filter, setFilter] = useState('all');
  const [showCompleted, setShowCompleted] = useState(true);

  // Refresh items when country or profile changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
          return;
        }
      } catch (error) {
        console.warn('Failed to parse saved packing checklist', error);
      }
    }
    setItems(buildDefaultItems());
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
        id: `custom-${Date.now()}`,
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

  const resetChecklist = () => {
    if (window.confirm('Reset packing checklist to default items? This will keep your custom items but uncheck everything.')) {
      const customItems = items.filter(item => item.isCustom);
      const defaultItems = buildDefaultItems();
      setItems([...defaultItems, ...customItems]);
    }
  };

  const filteredItems = useMemo(() => {
    let filtered = filter === 'all' ? items : items.filter(item => item.category === filter);
    if (!showCompleted) {
      filtered = filtered.filter(item => !item.checked);
    }
    return filtered;
  }, [items, filter, showCompleted]);

  const checkedCount = items.filter(item => item.checked).length;
  const progressPercentage = items.length ? (checkedCount / items.length) * 100 : 0;

  const categories = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'clothing', label: 'Clothing', icon: '👕' },
    { id: 'toiletries', label: 'Toiletries', icon: '🧴' },
    { id: 'electronics', label: 'Electronics', icon: '🔌' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'miscellaneous', label: 'Misc', icon: '🎒' }
  ];

  const getCategoryColor = (category) => {
    switch(category) {
      case 'clothing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'toiletries': return 'text-pink-600 bg-pink-50 border-pink-200';
      case 'electronics': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'documents': return 'text-red-600 bg-red-50 border-red-200';
      case 'miscellaneous': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Icons.Luggage className="w-6 h-6 text-sky-600"/>
            Smart Packing Checklist
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Tailored for {currentProfile?.name || 'your trip'} • {tripDuration} day{tripDuration !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={resetChecklist}
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 underline"
        >
          Reset
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-1">
          <span>{checkedCount} of {items.length} packed</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
          <div
            className="bg-sky-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === cat.id
                ? 'bg-sky-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            <span className="mr-1">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Show completed toggle */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="show-completed"
          checked={showCompleted}
          onChange={(e) => setShowCompleted(e.target.checked)}
          className="w-4 h-4 text-sky-600 border-slate-300 dark:border-slate-600 rounded focus:ring-sky-500"
        />
        <label htmlFor="show-completed" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
          Show completed items
        </label>
      </div>

      {/* Items list */}
      <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
            {showCompleted ? 'No items in this category' : 'All items packed! 🎉'}
          </p>
        ) : (
          filteredItems.map(item => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                item.checked
                  ? 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'
              } transition-all`}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem(item.id)}
                className="w-5 h-5 text-sky-600 border-slate-300 dark:border-slate-600 rounded focus:ring-sky-500"
              />
              <span className={`flex-1 text-sm ${item.checked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'}`}>
                {item.text}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(item.category)}`}>
                {item.category}
              </span>
              {item.isCustom && (
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  title="Remove custom item"
                >
                  <Icons.Trash className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add custom item */}
      <div className="border-t border-slate-200 dark:border-slate-600 pt-4">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Add Custom Item</h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={customItem}
            onChange={(e) => setCustomItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustomItem()}
            placeholder="e.g., Prescription glasses"
            className="flex-1 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-sky-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-sky-500"
          >
            {categories.filter(c => c.id !== 'all').map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
          <button
            onClick={addCustomItem}
            className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackingChecklist;
