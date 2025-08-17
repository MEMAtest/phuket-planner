import React from 'react';
import { Icons } from '../data/staticData';
import { downloadICS } from '../utils/helpers';
import { useTrip } from '../context/TripContext';

const Header = () => {
  const { activeTab, setActiveTab, planData, isOnline, collaborators } = useTrip();
  
  const tabs = ['Itinerary', 'Jet Lag', 'Food Helper', 'Tools & Info'];
  
  return (
    <>
      {!isOnline && (
        <div className="bg-amber-100 text-amber-800 px-4 py-2 text-center text-sm">
          <Icons.alertTriangle className="inline w-4 h-4 mr-2"/>
          Offline mode - changes will sync when connected
        </div>
      )}
      
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <div className="bg-sky-600 p-2.5 rounded-xl text-white shadow-md">
                <Icons.plane className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Phuket Family Itinerary</h1>
                <p className="text-sm text-slate-500">August 19–29, 2025</p>
              </div>
            </div>
            
            {/* Tabs and Actions */}
            <div className="flex items-center gap-2">
              {/* Tab Navigation */}
              <div className="p-1 bg-slate-200 rounded-lg flex gap-1 overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab.replace(/\s+/g, ''))} 
                    className={`
                      whitespace-nowrap px-3 py-1.5 text-sm font-semibold rounded-md transition-colors
                      ${activeTab === tab.replace(/\s+/g, '') 
                        ? 'bg-white text-slate-800 shadow' 
                        : 'text-slate-600 hover:bg-slate-100'}
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Export Button */}
              <button 
                onClick={() => downloadICS(planData)} 
                title="Export to Calendar" 
                className="p-2.5 bg-white rounded-lg shadow-sm border hover:bg-slate-100 transition-colors"
              >
                <Icons.calendar className="w-5 h-5 text-slate-600"/>
              </button>
              
              {/* Collaborators (if any) */}
              {collaborators.length > 0 && (
                <div className="hidden sm:flex items-center gap-2 ml-2">
                  <span className="text-xs text-slate-500">Sharing:</span>
                  <div className="flex -space-x-2">
                    {collaborators.slice(0, 3).map((user, i) => (
                      <div 
                        key={user.id}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 
                                   flex items-center justify-center text-white text-xs font-bold
                                   border-2 border-white"
                        title={user.name}
                      >
                        {user.name[0]}
                      </div>
                    ))}
                    {collaborators.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-slate-300 
                                    flex items-center justify-center text-slate-700 text-xs font-bold
                                    border-2 border-white">
                        +{collaborators.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
