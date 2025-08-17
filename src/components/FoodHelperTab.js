import React, { useState } from 'react';
import { Icons } from '../data/staticData';

// Restaurant recommendations by meal type
const RESTAURANT_DATA = {
  breakfast: [
    {
      name: "Gallery Cafe (Anantara)",
      location: "Mai Khao",
      rating: 4.6,
      priceRange: "£££",
      highlights: ["Kids eat free buffet", "Beach views", "Live cooking stations"],
      mustTry: "Thai rice porridge (joke), Fresh tropical fruits, Egg station",
      kidFriendly: 5,
      hours: "6:30-10:30",
      notes: "Your hotel - easiest with kids in morning"
    },
    {
      name: "Wow Wow Cafe",
      location: "Mai Khao",
      rating: 4.7,
      priceRange: "££",
      highlights: ["Instagram-worthy smoothie bowls", "Healthy options", "Quiet garden"],
      mustTry: "Acai bowl, Green smoothie, Banana pancakes",
      kidFriendly: 4,
      hours: "8:00-14:00",
      notes: "10 min from hotel, very relaxed vibe"
    },
    {
      name: "Robinson's Cafe",
      location: "Old Town",
      rating: 4.5,
      priceRange: "£",
      highlights: ["Local breakfast spot", "Dim sum", "Strong coffee"],
      mustTry: "Pa thong ko (Thai donuts), Dim sum set, Thai milk tea",
      kidFriendly: 3,
      hours: "7:00-12:00",
      notes: "Authentic local experience, cash only"
    }
  ],
  lunch: [
    {
      name: "Kin Dee Restaurant",
      location: "Mai Khao",
      rating: 4.5,
      priceRange: "££",
      highlights: ["Beachfront", "Covered seating", "Quick service"],
      mustTry: "Pad Thai, Tom Yum Goong, Mango sticky rice",
      kidFriendly: 5,
      hours: "11:00-22:00",
      notes: "Perfect for post-beach lunch"
    },
    {
      name: "Siam Supper Club",
      location: "Mai Khao",
      rating: 4.4,
      priceRange: "££",
      highlights: ["Air-conditioned", "Kids menu", "Mocktails"],
      mustTry: "Massaman curry, Crispy pork belly, Coconut ice cream",
      kidFriendly: 5,
      hours: "11:30-15:00, 18:00-22:00",
      notes: "Great for escaping midday heat"
    },
    {
      name: "One Chun Cafe",
      location: "Old Town",
      rating: 4.6,
      priceRange: "££",
      highlights: ["Michelin Bib Gourmand", "Heritage building", "Famous crab curry"],
      mustTry: "Crab meat curry, Hokkien noodles, Moo Hong",
      kidFriendly: 3,
      hours: "11:00-21:00",
      notes: "Worth the drive, order mild for kids"
    },
    {
      name: "Natural Restaurant",
      location: "Old Town",
      rating: 4.3,
      priceRange: "£££",
      highlights: ["Garden setting", "Huge portions", "Playground nearby"],
      mustTry: "Whole fried fish, Morning glory, Pineapple fried rice",
      kidFriendly: 4,
      hours: "11:00-23:00",
      notes: "Popular with families"
    }
  ],
  dinner: [
    {
      name: "Sea.Fire.Salt",
      location: "Mai Khao",
      rating: 4.6,
      priceRange: "££££",
      highlights: ["Sunset views", "Beach BBQ", "Live music Fri/Sat"],
      mustTry: "Seafood platter, Wagyu beef, Grilled lobster",
      kidFriendly: 4,
      hours: "18:00-22:30",
      notes: "Book sunset table, special occasion spot"
    },
    {
      name: "Black Ginger",
      location: "Mai Khao",
      rating: 4.7,
      priceRange: "££££",
      highlights: ["Floating restaurant", "Romantic", "Exceptional service"],
      mustTry: "Royal Thai set menu, Soft shell crab, Tom Kha Gai",
      kidFriendly: 2,
      hours: "18:30-22:30",
      notes: "Adults' night out - get babysitter"
    },
    {
      name: "Trisara Seafood",
      location: "Mai Khao",
      rating: 4.8,
      priceRange: "££££",
      highlights: ["Fresh catch daily", "Cliffside views", "Wine list"],
      mustTry: "Grilled prawns, Sea bass, Lobster thermidor",
      kidFriendly: 3,
      hours: "18:00-23:00",
      notes: "20 min drive but worth it"
    },
    {
      name: "Raya Restaurant",
      location: "Old Town",
      rating: 4.4,
      priceRange: "££",
      highlights: ["130-year-old mansion", "Authentic Phuket cuisine", "Historic charm"],
      mustTry: "Crab curry, Nam prik goong siap, Moo Hong",
      kidFriendly: 3,
      hours: "10:00-22:00",
      notes: "Phuket institution, reservations essential"
    }
  ]
};

// Thai dishes data
const FOOD_DATA = {
  kidFriendly: [
    { name: "Khao Pad", thai: "ข้าวผัด", desc: "Classic fried rice with egg, veg, and choice of protein", spice: 0, order: "Mai phet (not spicy)" },
    { name: "Gai Tod", thai: "ไก่ทอด", desc: "Thai-style fried chicken - crispy and juicy", spice: 0, order: "With sticky rice" },
    { name: "Chicken Satay", thai: "สะเต๊ะไก่", desc: "Grilled chicken skewers with peanut sauce", spice: 0, order: "Sauce on side for dipping" },
    { name: "Pad See Ew", thai: "ผัดซีอิ๊ว", desc: "Wide rice noodles in sweet soy sauce", spice: 0, order: "No chili flakes" },
    { name: "Khao Man Gai", thai: "ข้าวมันไก่", desc: "Poached chicken over garlic rice", spice: 0, order: "Sauce separate" },
    { name: "Spring Rolls", thai: "ปอเปี๊ยะทอด", desc: "Crispy vegetable rolls", spice: 0, order: "Sweet chili on side" }
  ],
  mustTry: [
    { name: "Pad Thai", thai: "ผัดไทย", desc: "Thailand's famous stir-fried noodles", spice: 1, order: "With prawns, no dried shrimp for kids" },
    { name: "Tom Yum Goong", thai: "ต้มยำกุ้ง", desc: "Hot & sour soup with prawns", spice: 2, order: "Nam sai (clear) version is milder" },
    { name: "Green Curry", thai: "แกงเขียวหวาน", desc: "Coconut curry with Thai basil", spice: 2, order: "With chicken, less spicy" },
    { name: "Som Tam", thai: "ส้มตำ", desc: "Green papaya salad", spice: 2, order: "Tam Thai (not Tam Lao), mild" },
    { name: "Massaman Curry", thai: "แกงมัสมั่น", desc: "Mild curry with peanuts and potato", spice: 1, order: "Great for kids - naturally mild" },
    { name: "Tom Kha Gai", thai: "ต้มข่าไก่", desc: "Coconut soup with chicken", spice: 1, order: "Creamy and mild" }
  ],
  phuketSpecial: [
    { name: "Moo Hong", thai: "หมูฮ้อง", desc: "Phuket's sweet braised pork belly", spice: 1, order: "Served with boiled egg" },
    { name: "Nam Prik Goong Siap", thai: "น้ำพริกกุ้งเสียบ", desc: "Smoked shrimp chili dip", spice: 3, order: "With fresh vegetables" },
    { name: "Hokkien Mee", thai: "หมี่ฮกเกี้ยน", desc: "Yellow noodles with seafood", spice: 1, order: "Phuket-style with broth" },
    { name: "Oh Tao", thai: "ออส่วน", desc: "Oyster & taro crispy pancake", spice: 0, order: "Street food favorite" },
    { name: "Mee Sapam", thai: "หมี่สะปำ", desc: "Phuket rice noodles with curry", spice: 2, order: "Unique to Phuket" },
    { name: "Loba", thai: "โลบะ", desc: "Phuket-style rice salad", spice: 1, order: "Refreshing lunch option" }
  ]
};

// Useful phrases
const PHRASES = {
  essential: [
    { thai: "ไม่เผ็ด", phonetic: "Mai phet", english: "Not spicy", usage: "Most important phrase!" },
    { thai: "ไม่ใส่พริก", phonetic: "Mai sai prik", english: "No chili", usage: "Extra clear for kids' food" },
    { thai: "เผ็ดนิดหน่อย", phonetic: "Phet nit noi", english: "Little bit spicy", usage: "For mild spice lovers" },
    { thai: "อร่อย", phonetic: "Aroy", english: "Delicious", usage: "Servers love this!" },
    { thai: "เช็คบิน", phonetic: "Check bin", english: "Bill please", usage: "Universal in tourist areas" },
    { thai: "ขอบคุณ", phonetic: "Khob khun", english: "Thank you", usage: "Add 'ka' (female) or 'krub' (male)" }
  ],
  dietary: [
    { thai: "ไม่กินหมู", phonetic: "Mai gin moo", english: "No pork", usage: "Common restriction" },
    { thai: "มังสวิรัติ", phonetic: "Mang-sa-wi-rat", english: "Vegetarian", usage: "No meat or fish" },
    { thai: "เจ", phonetic: "Jay", english: "Vegan", usage: "Buddhist vegan style" },
    { thai: "แพ้ถั่ว", phonetic: "Pae tua", english: "Peanut allergy", usage: "Important for safety" },
    { thai: "ไม่ใส่น้ำปลา", phonetic: "Mai sai nam pla", english: "No fish sauce", usage: "For vegetarians" },
    { thai: "ไม่ใส่กุ้ง", phonetic: "Mai sai goong", english: "No shrimp", usage: "Common in pastes" }
  ]
};

// Daily recommendations
const DAILY_SPECIALS = [
  { day: "Monday", special: "Try street food at Malin Plaza (Tuesday night market)", dish: "Moo ping (grilled pork skewers)" },
  { day: "Tuesday", special: "Fresh seafood at Rawai Beach market", dish: "Grilled fish with salt crust" },
  { day: "Wednesday", special: "Local breakfast at Locking Market", dish: "Dim sum and pa thong ko" },
  { day: "Thursday", special: "Indy Market night food stalls", dish: "Pad krapow with fried egg" },
  { day: "Friday", special: "Weekend night market at Naka", dish: "Khao kriab pak moh (dumplings)" },
  { day: "Saturday", special: "Brunch at beach clubs", dish: "International + Thai fusion" },
  { day: "Sunday", special: "Old Town Walking Street food", dish: "Oh ew (oyster omelet)" }
];

const FoodHelperTab = () => {
  const [activeTab, setActiveTab] = useState('restaurants');
  const [expandedRestaurant, setExpandedRestaurant] = useState(null);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySpecial = DAILY_SPECIALS.find(d => d.day === today) || DAILY_SPECIALS[0];

  const FoodCard = ({ item }) => {
    const spiceLevel = Array.from({ length: 3 }, (_, i) => (
      <Icons.flame key={i} className={`w-4 h-4 ${i < item.spice ? 'text-red-500 fill-current' : 'text-slate-300'}`}/>
    ));
    return (
      <div className="bg-white rounded-lg p-4 border">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-bold text-slate-800">{item.name}</h4>
            <p className="text-xs text-slate-500">{item.thai}</p>
          </div>
          <div className="flex gap-0.5">{spiceLevel}</div>
        </div>
        <p className="text-sm text-slate-600 mb-2">{item.desc}</p>
        <p className="text-xs text-sky-700 font-medium">Order: "{item.order}"</p>
      </div>
    );
  };

  const RestaurantCard = ({ restaurant, mealType }) => {
    const isExpanded = expandedRestaurant === restaurant.name;
    const kidStars = Array.from({ length: 5 }, (_, i) => (
      <Icons.star key={i} className={`w-3 h-3 ${i < restaurant.kidFriendly ? 'text-blue-500 fill-current' : 'text-slate-300'}`}/>
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
                  <Icons.star className="w-4 h-4 text-amber-500 fill-current"/>
                  <span className="text-sm font-medium">{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500">Kid-friendly:</span>
                  {kidStars}
                </div>
              </div>
            </div>
            <Icons.chevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}/>
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
      {/* Main Content - Left Side */}
      <div className="lg:col-span-3 space-y-6">
        {/* Tab Navigation */}
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

          {/* Restaurant Recommendations */}
          {activeTab === 'restaurants' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
                  <Icons.sun className="w-5 h-5 text-amber-500"/>
                  Breakfast (6:30-11:00)
                </h3>
                <div className="space-y-3">
                  {RESTAURANT_DATA.breakfast.map(r => (
                    <RestaurantCard key={r.name} restaurant={r} mealType="breakfast"/>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
                  <Icons.sun className="w-5 h-5 text-orange-500"/>
                  Lunch (11:00-15:00)
                </h3>
                <div className="space-y-3">
                  {RESTAURANT_DATA.lunch.map(r => (
                    <RestaurantCard key={r.name} restaurant={r} mealType="lunch"/>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
                  <Icons.moon className="w-5 h-5 text-indigo-600"/>
                  Dinner (18:00-22:00)
                </h3>
                <div className="space-y-3">
                  {RESTAURANT_DATA.dinner.map(r => (
                    <RestaurantCard key={r.name} restaurant={r} mealType="dinner"/>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Thai Dishes */}
          {activeTab === 'dishes' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">🍼 Kid-Friendly Favorites</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FOOD_DATA.kidFriendly.map(item => <FoodCard key={item.name} item={item}/>)}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">⭐ Must-Try Thai Classics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FOOD_DATA.mustTry.map(item => <FoodCard key={item.name} item={item}/>)}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">🏝️ Phuket Specialties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FOOD_DATA.phuketSpecial.map(item => <FoodCard key={item.name} item={item}/>)}
                </div>
              </div>
            </div>
          )}

          {/* Useful Phrases */}
          {activeTab === 'phrases' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">🔑 Essential Phrases</h3>
                <div className="space-y-2">
                  {PHRASES.essential.map(phrase => (
                    <div key={phrase.thai} className="bg-slate-50 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-lg text-slate-800">{phrase.phonetic}</p>
                          <p className="text-sm text-slate-600">{phrase.thai} = {phrase.english}</p>
                        </div>
                        <span className="text-xs text-sky-700 font-medium">{phrase.usage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">🥗 Dietary Restrictions</h3>
                <div className="space-y-2">
                  {PHRASES.dietary.map(phrase => (
                    <div key={phrase.thai} className="bg-slate-50 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-lg text-slate-800">{phrase.phonetic}</p>
                          <p className="text-sm text-slate-600">{phrase.thai} = {phrase.english}</p>
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

      {/* Sidebar - Right Side */}
      <div className="lg:col-span-1 space-y-4">
        {/* Today's Special */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
          <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
            <Icons.star className="w-5 h-5 text-amber-500 fill-current"/>
            Today's Pick
          </h3>
          <p className="text-sm font-medium text-slate-700 mb-1">{todaySpecial.special}</p>
          <p className="text-xs text-amber-800 font-semibold">Try: {todaySpecial.dish}</p>
        </div>

        {/* Quick Tips */}
        <div className="bg-sky-50 p-4 rounded-xl border border-sky-200">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Icons.lightbulb className="w-5 h-5 text-sky-600"/>
            Quick Tips
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Order rice/noodles first for hungry kids</li>
            <li>• "Mai phet" = magic words for no spice</li>
            <li>• Coconut based curries are milder</li>
            <li>• Street food peaks 5-8pm</li>
            <li>• Hotel breakfast buffets are lifesavers</li>
            <li>• 7-Eleven has familiar snacks 24/7</li>
          </ul>
        </div>

        {/* Try This Today */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Icons.ferrisWheel className="w-5 h-5 text-green-600"/>
            Try This Today!
          </h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3">
              <p className="font-semibold text-sm text-slate-800">Morning</p>
              <p className="text-xs text-slate-600">Thai iced coffee (oliang) - less sweet than expected!</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-semibold text-sm text-slate-800">Lunch</p>
              <p className="text-xs text-slate-600">Khao man gai - Thailand's comfort chicken rice</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-semibold text-sm text-slate-800">Snack</p>
              <p className="text-xs text-slate-600">Mango sticky rice - kids love this dessert!</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-semibold text-sm text-slate-800">Dinner</p>
              <p className="text-xs text-slate-600">Pad see ew - sweet noodles, zero spice</p>
            </div>
          </div>
        </div>

        {/* Emergency Eats */}
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Icons.alertTriangle className="w-5 h-5 text-rose-600"/>
            Emergency Eats
          </h3>
          <p className="text-xs text-slate-700 mb-2">When kids are melting down:</p>
          <ul className="space-y-1 text-xs text-slate-600">
            <li>• <b>7-Eleven:</b> Toasties, yogurt, fruit</li>
            <li>• <b>McDonald's:</b> Central Festival</li>
            <li>• <b>Pizza Company:</b> Delivers everywhere</li>
            <li>• <b>Hotel room service:</b> Worth it!</li>
            <li>• <b>Lotus's:</b> Food court + groceries</li>
          </ul>
        </div>

        {/* Spice Level Guide */}
        <div className="bg-white p-4 rounded-xl border">
          <h3 className="font-bold text-slate-800 mb-3">🌶️ Spice Decoder</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Icons.flame className="w-4 h-4 text-slate-300"/>
              <span className="text-slate-600">Safe for toddlers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                <Icons.flame className="w-4 h-4 text-red-500 fill-current"/>
                <Icons.flame className="w-4 h-4 text-slate-300"/>
              </div>
              <span className="text-slate-600">Mild tingle</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                <Icons.flame className="w-4 h-4 text-red-500 fill-current"/>
                <Icons.flame className="w-4 h-4 text-red-500 fill-current"/>
              </div>
              <span className="text-slate-600">Proper spicy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                <Icons.flame className="w-4 h-4 text-red-500 fill-current"/>
                <Icons.flame className="w-4 h-4 text-red-500 fill-current"/>
                <Icons.flame className="w-4 h-4 text-red-500 fill-current"/>
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
