// TEMPORARILY replace your App.js with this diagnostic version
// This will show you EXACTLY what's undefined

import React from 'react';

const App = () => {
  const diagnostics = {
    'TripContext': null,
    'Icons': null,
    'TRIP_DATA': null,
    'Header': null,
    'DayCard': null,
    'JetLagTab': null,
    'FoodHelperTab': null,
    'CurrencyConverter': null,
    'KidComfortChecklist': null,
    'IconLegend': null,
    'TravelDocuments': null,
    'useTrip hook': null,
  };

  const errors = [];

  // Check TripContext
  try {
    const { useTrip } = require('./context/TripContext');
    diagnostics['TripContext'] = '✅ Loaded';
    
    // Try to use the hook
    const hookTest = () => {
      try {
        const trip = useTrip();
        diagnostics['useTrip hook'] = '✅ Working';
      } catch (e) {
        diagnostics['useTrip hook'] = `❌ Error: ${e.message}`;
      }
    };
    // Can't call hook here directly, just mark as available
    diagnostics['useTrip hook'] = '✅ Available';
  } catch (e) {
    diagnostics['TripContext'] = `❌ Error: ${e.message}`;
    errors.push(`TripContext: ${e.message}`);
  }

  // Check Icons and TRIP_DATA
  try {
    const { Icons, TRIP_DATA } = require('./data/staticData');
    
    if (Icons === undefined) {
      diagnostics['Icons'] = '❌ UNDEFINED - This is your problem!';
      errors.push('Icons is undefined in staticData.js');
    } else if (typeof Icons !== 'object') {
      diagnostics['Icons'] = `❌ Wrong type: ${typeof Icons}`;
      errors.push(`Icons is ${typeof Icons} instead of object`);
    } else {
      diagnostics['Icons'] = `✅ Loaded (${Object.keys(Icons).length} icons)`;
    }
    
    if (TRIP_DATA === undefined) {
      diagnostics['TRIP_DATA'] = '❌ UNDEFINED';
      errors.push('TRIP_DATA is undefined in staticData.js');
    } else {
      diagnostics['TRIP_DATA'] = '✅ Loaded';
    }
  } catch (e) {
    diagnostics['Icons'] = `❌ Import Error: ${e.message}`;
    diagnostics['TRIP_DATA'] = `❌ Import Error: ${e.message}`;
    errors.push(`staticData import: ${e.message}`);
  }

  // Check each component
  const components = [
    'Header',
    'DayCard',
    'JetLagTab',
    'FoodHelperTab',
    'CurrencyConverter',
    'KidComfortChecklist',
    'IconLegend',
    'TravelDocuments'
  ];

  components.forEach(name => {
    try {
      const Component = require(`./components/${name}`).default;
      if (Component === undefined) {
        diagnostics[name] = '❌ Component is UNDEFINED';
        errors.push(`${name} exports undefined`);
      } else if (typeof Component !== 'function') {
        diagnostics[name] = `❌ Not a function: ${typeof Component}`;
        errors.push(`${name} is ${typeof Component}`);
      } else {
        diagnostics[name] = '✅ Loaded';
      }
    } catch (e) {
      diagnostics[name] = `❌ Error: ${e.message}`;
      errors.push(`${name}: ${e.message}`);
    }
  });

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-slate-800">
          🔍 Diagnostic Report
        </h1>
        
        {errors.length > 0 && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <h2 className="font-bold text-lg mb-2">🔴 Found {errors.length} Error(s):</h2>
            <ul className="list-disc list-inside">
              {errors.map((error, i) => (
                <li key={i} className="text-sm">{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Component Status:</h2>
          <div className="space-y-2">
            {Object.entries(diagnostics).map(([name, status]) => (
              <div key={name} className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">{name}:</span>
                <span className={status?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                  {status || '❓ Not checked'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">📝 How to Fix:</h3>
          <ol className="list-decimal list-inside text-sm space-y-1">
            <li>Look for any ❌ marks above</li>
            <li>If Icons is undefined, check your staticData.js exports</li>
            <li>If a component is undefined, check the export statement</li>
            <li>Make sure all files use: <code className="bg-white px-1">export default ComponentName</code></li>
            <li>Icons should be: <code className="bg-white px-1">export const Icons = {'{...}'}</code></li>
          </ol>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm">
            <strong>Most Common Fix:</strong> Add <code className="bg-white px-2 py-1 rounded">export</code> 
            before <code className="bg-white px-2 py-1 rounded">const Icons</code> in your staticData.js file
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
