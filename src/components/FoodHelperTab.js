import React, { useEffect, useMemo, useState } from 'react';
import { Icons } from '../data/staticData';
import { getFoodGuide } from '../data/countryContent';
import { useCountry } from '../state/CountryContext';

const FoodHelperTab = () => {
  const { country } = useCountry();
  const [activeTab, setActiveTab] = useState('restaurants');
  const [expandedRestaurant, setExpandedRestaurant] = useState(null);

  const foodGuide = useMemo(() => getFoodGuide(country.iso2), [country.iso2]);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySpecial = useMemo(() => {
    if (!foodGuide?.dailySpecials?.length) return null;
    return foodGuide.dailySpecials.find(d => d.day === today) || foodGuide.dailySpecials[0];
  }, [foodGuide, today]);

  const weeklyHighlights = useMemo(() => {
    if (!foodGuide?.dailySpecials?.length) return [];
    if (foodGuide.dailySpecials.length <= 4) return foodGuide.dailySpecials;
    return foodGuide.dailySpecials.slice(0, 4);
  }, [foodGuide]);

  useEffect(() => {
    setExpandedRestaurant(null);
  }, [country.iso2]);

  const FoodCard = ({ item }) => {
    const spiceLevel = Array.from({ length: 3 }, (_, i) => (
      <Icons.Flame
        key={i}
        className={`w-4 h-4 ${i < item.spice ? 'text-red-500 fill-current' : 'text-slate-300'}`}
      />
    ));
    return (
      <div className="bg-white rounded-lg p-4 border">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-bold text-slate-800">{item.name}</h4>
            {item.native && <p className="text-xs text-slate-500">{item.native}</p>}
          </div>
          <div className="flex gap-0.5">{spiceLevel}</div>
        </div>
        <p className="text-sm text-slate-600 mb-2">{item.desc}</p>
        <p className="text-xs text-sky-700 font-medium">Order: "{item.order}"</p>
      </div>
    );
  };

  const RestaurantCard = ({ restaurant }) => {
    const isExpanded = expandedRestaurant === restaurant.name;
    const kidStars = Array.from({ length: 5 }, (_, i) => (
      <Icons.Star
        key={i}
        className={`w-3 h-3 ${i < restaurant.kidFriendly ? 'text-blue-500 fill-current' : 'text-slate-300'}`}
      />
    ));

    return (
      <div className="bg-white rounded-lg border overflow-hidden">
        <div
          className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
          onClick={() => setExpandedRestaurant(isExpanded ? null : restaurant.name)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">{restaurant.name}</h4>
              <p className="text-sm text-slate-600">📍 {restaurant.location} • {restaurant.priceRange}</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <Icons.Star className="w-4 h-4 text-amber-500 fill-current"/>
                  <span className="text-sm font-medium">{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500">Kid-friendly:</span>
                  {kidStars}
                </div>
              </div>
            </div>
            <Icons.ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}/>
          </div>
        </div>

        {isExpanded && (
          <div className="px-4 pb-4 border-t bg-slate-50">
            <div className="pt-3 space-y-2">
              <div>
                <p className="text-xs font-semibold text-slate-700">Must Try:</p>
                <p className="text-sm text-slate-600">{restaurant.mustTry}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700">Highlights:</p>
                <ul className="text-sm text-slate-600">
                  {restaurant.highlights.map((h, i) => (
                    <li key={i}>• {h}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">⏰ {restaurant.hours}</span>
                <span className="text-sky-700 font-medium">{restaurant.notes}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex gap-2 mb-4">
            {['restaurants', 'dishes', 'phrases'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab 
                    ? 'bg-sky-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === 'restaurants' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
                  <Icons.Sun className="w-5 h-5 text-amber-500"/>
                  Breakfast (6:30-11:00)
                </h3>
                <div className="space-y-3">
                  {foodGuide.restaurants.breakfast.map(r => (
                    <RestaurantCard key={r.name} restaurant={r}/>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
                  <Icons.Sun className="w-5 h-5 text-orange-500"/>
                  Lunch (11:00-15:00)
                </h3>
                <div className="space-y-3">
                  {foodGuide.restaurants.lunch.map(r => (
                    <RestaurantCard key={r.name} restaurant={r}/>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
                  <Icons.Moon className="w-5 h-5 text-indigo-600"/>
                  Dinner (18:00-22:00)
                </h3>
                <div className="space-y-3">
                  {foodGuide.restaurants.dinner.map(r => (
                    <RestaurantCard key={r.name} restaurant={r}/>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dishes' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">🍼 Kid-Friendly Favorites</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {foodGuide.dishes.kidFriendly.map(item => <FoodCard key={item.name} item={item}/>)}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">⭐ Must-Try Classics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {foodGuide.dishes.mustTry.map(item => <FoodCard key={item.name} item={item}/>)}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">🏝️ Local Specialties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {foodGuide.dishes.specialties.map(item => <FoodCard key={item.name} item={item}/>)}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'phrases' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">🔑 Essential Phrases</h3>
                <div className="space-y-2">
                  {foodGuide.phrases.essential.map(phrase => (
                    <div key={`${phrase.native}-${phrase.phonetic}`} className="bg-slate-50 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-lg text-slate-800">{phrase.phonetic}</p>
                          <p className="text-sm text-slate-600">{phrase.native} = {phrase.english}</p>
                        </div>
                        <span className="text-xs text-sky-700 font-medium">{phrase.usage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">🥗 Dietary Needs</h3>
                <div className="space-y-2">
                  {foodGuide.phrases.dietary.map(phrase => (
                    <div key={`${phrase.native}-${phrase.usage}`} className="bg-slate-50 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-lg text-slate-800">{phrase.phonetic}</p>
                          <p className="text-sm text-slate-600">{phrase.native} = {phrase.english}</p>
                        </div>
                        <span className="text-xs text-sky-700 font-medium">{phrase.usage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-1 space-y-4">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
          <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
            <Icons.Star className="w-5 h-5 text-amber-500 fill-current"/>
            Today's Pick
          </h3>
          {todaySpecial ? (
            <>
              <p className="text-sm font-medium text-slate-700 mb-1">{todaySpecial.special}</p>
              <p className="text-xs text-amber-800 font-semibold">Try: {todaySpecial.dish}</p>
            </>
          ) : (
            <p className="text-sm text-slate-600">Fresh picks arrive soon.</p>
          )}
        </div>

        <div className="bg-sky-50 p-4 rounded-xl border border-sky-200">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Icons.Lightbulb className="w-5 h-5 text-sky-600"/>
            Quick Tips
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {foodGuide.quickTips.map((tip, idx) => (
              <li key={idx}>• {tip}</li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Icons.FerrisWheel className="w-5 h-5 text-green-600"/>
            Local Weekly Picks
          </h3>
          <div className="space-y-3">
            {weeklyHighlights.map(item => (
              <div key={item.day} className="bg-white rounded-lg p-3">
                <p className="font-semibold text-sm text-slate-800">{item.day}</p>
                <p className="text-xs text-slate-600">{item.special}</p>
                <p className="text-xs text-emerald-700 font-semibold">Try: {item.dish}</p>
              </div>
            ))}
            {weeklyHighlights.length === 0 && (
              <p className="text-sm text-slate-600">No weekly highlights yet.</p>
            )}
          </div>
        </div>

        <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Icons.AlertTriangle className="w-5 h-5 text-rose-600"/>
            Emergency Eats
          </h3>
          <p className="text-xs text-slate-700 mb-2">When kids are melting down:</p>
          <ul className="space-y-1 text-xs text-slate-600">
            {foodGuide.emergencyEats.map((option, idx) => (
              <li key={idx}>• {option}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <h3 className="font-bold text-slate-800 mb-3">🌶️ Spice Decoder</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Icons.Flame className="w-4 h-4 text-slate-300"/>
              <span className="text-slate-600">Safe for toddlers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                <Icons.Flame className="w-4 h-4 text-red-500 fill-current"/>
                <Icons.Flame className="w-4 h-4 text-slate-300"/>
              </div>
              <span className="text-slate-600">Mild tingle</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                <Icons.Flame className="w-4 h-4 text-red-500 fill-current"/>
                <Icons.Flame className="w-4 h-4 text-red-500 fill-current"/>
              </div>
              <span className="text-slate-600">Proper spicy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                <Icons.Flame className="w-4 h-4 text-red-500 fill-current"/>
                <Icons.Flame className="w-4 h-4 text-red-500 fill-current"/>
                <Icons.Flame className="w-4 h-4 text-red-500 fill-current"/>
              </div>
              <span className="text-slate-600">🔥 Local level!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodHelperTab;
