import React, { useState } from 'react';
import { Icons, TRIP_DATA } from '../data/staticData';
import { FoodItem } from '../types';

const FoodCard: React.FC<{ item: FoodItem }> = ({ item }) => {
  const spiceLevel = Array.from({ length: 3 }, (_, i) => (
    <Icons.flame 
      key={i} 
      className={`w-4 h-4 ${i < item.spice ? 'text-red-500 fill-current' : 'text-slate-300'}`}
    />
  ));
  
  return (
    <div className="bg-white rounded-lg p-4 border flex flex-col hover:shadow-md transition-shadow">
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-slate-800">{item.name}</h4>
            <p className="text-xs text-slate-500">{item.thai}</p>
          </div>
          <div className="flex gap-0.5">{spiceLevel}</div>
        </div>
        <p className="text-sm text-slate-600 mt-2">{item.desc}</p>
      </div>
      {item.kidFriendly && (
        <div className="mt-3 pt-3 border-t text-xs font-semibold text-emerald-700">
          ✅ Kid-Friendly Favorite
        </div>
      )}
    </div>
  );
};

const FoodHelperTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'guide' | 'phrases' | 'tips'>('guide');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter food items based on search
  const filterFoodItems = (items: FoodItem[]) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const usefulPhrases = [
    { thai: "Mai Phet", english: "NOT SPICY", note: "The most important phrase!" },
    { thai: "Mai Sai Prik", english: "Don't add chili", note: "Extra precaution for kids" },
    { thai: "Phet Nit Noi", english: "A little spicy", note: "If you want just a hint" },
    { thai: "Nam Pla", english: "Fish sauce", note: "The salty staple of Thai cuisine" },
    { thai: "Aroy", english: "Delicious!", note: "Show your appreciation" },
    { thai: "Check Bin", english: "Bill, please", note: "When you're ready to pay" },
    { thai: "Kor Tohd", english: "Excuse me / Sorry", note: "To get attention politely" },
    { thai: "Khob Khun Krap/Ka", english: "Thank you", note: "Krap for men, Ka for women" },
  ];
  
  const diningTips = [
    "Most restaurants in tourist areas have picture menus - point and smile!",
    "Street food is generally safe and delicious - look for busy stalls with high turnover",
    "7-Eleven has surprisingly good ready-to-eat options for quick kid meals",
    "Always specify 'mai phet' (not spicy) when ordering for kids, even for dishes that seem mild",
    "Thai portions are often smaller - order multiple dishes to share family-style",
    "Fresh fruit shakes are everywhere and perfect for keeping kids hydrated",
    "Coconut water straight from the coconut is nature's electrolyte drink",
    "Most restaurants are very accommodating to special requests for children"
  ];
  
  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="bg-white p-2 rounded-xl shadow-lg">
        <div className="flex gap-2">
          {[
            { id: 'guide', label: 'Food Guide', icon: <Icons.bookOpen className="w-4 h-4"/> },
            { id: 'phrases', label: 'Useful Phrases', icon: <Icons.utensils className="w-4 h-4"/> },
            { id: 'tips', label: 'Dining Tips', icon: <Icons.lightbulb className="w-4 h-4"/> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm
                transition-colors ${activeSection === tab.id 
                  ? 'bg-sky-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Food Guide Section */}
      {activeSection === 'guide' && (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="font-bold text-2xl text-slate-800 mb-4 flex items-center gap-2">
            <Icons.bookOpen className="w-6 h-6 text-sky-600"/>
            Thai Food Guide
          </h2>
          
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-sky-500 
                       focus:border-sky-500"
            />
          </div>
          
          <div className="space-y-6">
            {/* Kid-Friendly Section */}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-emerald-700">
                👶 Kid-Friendly Favorites
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filterFoodItems(TRIP_DATA.foodData.kidFriendly.map(item => ({...item, kidFriendly: true})))
                  .map(item => <FoodCard key={item.name} item={item}/>)}
              </div>
            </div>
            
            {/* Phuket Specialties Section */}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-rose-700">
                🌶️ Must-Try Phuket Specialties
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filterFoodItems(TRIP_DATA.foodData.phuketSpecialties)
                  .map(item => <FoodCard key={item.name} item={item}/>)}
              </div>
            </div>
          </div>
          
          {/* Spice Level Legend */}
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-sm text-amber-900 mb-2">Spice Level Guide:</h4>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Icons.flame className="w-4 h-4 text-slate-300"/> Mild
              </span>
              <span className="flex items-center gap-1">
                <Icons.flame className="w-4 h-4 text-red-500 fill-current"/> Spicy
              </span>
              <span className="flex items-center gap-1">
                <Icons.flame className="w-4 h-4 text-red-500 fill-current"/>
                <Icons.flame className="w-4 h-4 text-red-500 fill-current"/> Very Spicy
              </span>
              <span className="flex items-center gap-1">
                <Icons.flame className="w-4 h-4 text-red-500 fill-current"/>
                <Icons.flame className="w-4 h-4 text-red-500 fill-current"/>
                <Icons.flame className="w-4 h-4 text-red-500 fill-current"/> 🔥 Thai Spicy!
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Useful Phrases Section */}
      {activeSection === 'phrases' && (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
          <h3 className="font-bold text-xl mb-4 text-slate-800">🗣️ Useful Thai Phrases for Dining</h3>
          <div className="space-y-3">
            {usefulPhrases.map((phrase, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <p className="font-bold text-lg text-sky-700">{phrase.thai}</p>
                  <p className="text-sm font-semibold text-slate-700">{phrase.english}</p>
                  {phrase.note && (
                    <p className="text-xs text-slate-500 mt-1 italic">{phrase.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Dining Tips Section */}
      {activeSection === 'tips' && (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
          <h3 className="font-bold text-xl mb-4 text-slate-800">💡 Family Dining Tips in Phuket</h3>
          <div className="space-y-3">
            {diningTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-sky-100 text-sky-700 rounded-full 
                               flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-700">{tip}</p>
              </div>
            ))}
          </div>
          
          {/* Emergency Snacks */}
          <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <h4 className="font-semibold text-emerald-900 mb-2">🍌 Emergency Kid Snacks (Available Everywhere):</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-emerald-800">
              <li>• Fresh fruit (mango, watermelon)</li>
              <li>• Sticky rice with mango</li>
              <li>• Plain rice or noodles</li>
              <li>• Roti (Thai pancake)</li>
              <li>• Toast with condensed milk</li>
              <li>• Fresh coconut water</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodHelperTab;
