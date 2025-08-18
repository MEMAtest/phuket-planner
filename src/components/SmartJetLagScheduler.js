import React, { useState, useEffect } from 'react';
import { Icons } from '../data/staticData';

const SmartJetLagScheduler = ({ currentDate }) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState('all');
  
  // Calculate which day of the trip we're on
  useEffect(() => {
    const tripStart = new Date('2025-08-20');
    const current = currentDate ? new Date(currentDate) : new Date();
    const dayNumber = Math.max(1, Math.ceil((current - tripStart) / (1000 * 60 * 60 * 24)) + 1);
    setCurrentDay(Math.min(9, dayNumber)); // Max 9 days
  }, [currentDate]);
  
  // Family members with their specific needs
  const familyMembers = [
    { id: 'amari', name: 'Amari (4y)', ageGroup: 'child', color: 'bg-purple-100 text-purple-800' },
    { id: 'askia', name: 'Askia (1y)', ageGroup: 'baby', color: 'bg-pink-100 text-pink-800' },
    { id: 'parent1', name: 'Parent 1', ageGroup: 'adult', color: 'bg-blue-100 text-blue-800' },
    { id: 'parent2', name: 'Parent 2', ageGroup: 'adult', color: 'bg-green-100 text-green-800' }
  ];
  
  // Get sleep schedule based on day and age group
  const getSleepSchedule = (day, ageGroup) => {
    const schedules = {
      adult: [
        { day: 1, bedtime: '21:00', waketime: '05:00', naptime: null, quality: 'poor', note: 'First night - expect disrupted sleep' },
        { day: 2, bedtime: '21:30', waketime: '05:30', naptime: '13:00-14:00', quality: 'fair', note: 'Improving but still adjusting' },
        { day: 3, bedtime: '22:00', waketime: '06:00', naptime: null, quality: 'good', note: 'Should feel more normal' },
        { day: 4, bedtime: '22:00', waketime: '06:30', naptime: null, quality: 'good', note: 'Fully adjusted' },
        { day: 5, bedtime: '22:00', waketime: '06:30', naptime: null, quality: 'excellent', note: 'Normal schedule achieved' }
      ],
      child: [
        { day: 1, bedtime: '19:00', waketime: '05:00', naptime: '12:00-14:00', quality: 'poor', note: 'Expect early morning wake-ups' },
        { day: 2, bedtime: '19:30', waketime: '05:30', naptime: '12:30-14:00', quality: 'fair', note: 'Still waking early' },
        { day: 3, bedtime: '20:00', waketime: '06:00', naptime: '13:00-14:30', quality: 'good', note: 'Getting better!' },
        { day: 4, bedtime: '20:00', waketime: '06:30', naptime: '13:00-14:00', quality: 'good', note: 'Almost there' },
        { day: 5, bedtime: '20:00', waketime: '06:30', naptime: '13:00-14:00', quality: 'excellent', note: 'Fully adjusted!' }
      ],
      baby: [
        { day: 1, bedtime: '18:30', waketime: '05:00', naptime: '09:00-10:00, 13:00-15:00', quality: 'poor', note: 'Multiple night wakings expected' },
        { day: 2, bedtime: '19:00', waketime: '05:30', naptime: '09:30-10:30, 13:00-15:00', quality: 'poor', note: 'Still very disrupted' },
        { day: 3, bedtime: '19:00', waketime: '06:00', naptime: '09:30-10:30, 13:00-14:30', quality: 'fair', note: 'Slowly improving' },
        { day: 4, bedtime: '19:00', waketime: '06:00', naptime: '09:30-10:30, 13:00-14:30', quality: 'good', note: 'Better nights' },
        { day: 5, bedtime: '19:00', waketime: '06:00', naptime: '09:30-10:30, 13:00-14:30', quality: 'good', note: 'Routine established' }
      ]
    };
    
    const daySchedule = schedules[ageGroup]?.find(s => s.day === day) || 
                       schedules[ageGroup]?.[schedules[ageGroup].length - 1];
    
    return daySchedule;
  };
  
  // Get meal timing recommendations
  const getMealSchedule = (day) => {
    const meals = [
      { day: 1, breakfast: '06:00', lunch: '12:00', dinner: '18:00', note: 'Eat at Phuket times immediately' },
      { day: 2, breakfast: '06:30', lunch: '12:00', dinner: '18:30', note: 'Keep regular meal intervals' },
      { day: 3, breakfast: '07:00', lunch: '12:30', dinner: '18:30', note: 'Normal schedule' },
      { day: 4, breakfast: '07:00', lunch: '12:30', dinner: '19:00', note: 'Fully adjusted' },
      { day: 5, breakfast: '07:00', lunch: '12:30', dinner: '19:00', note: 'Maintain consistency' }
    ];
    
    return meals.find(m => m.day === day) || meals[meals.length - 1];
  };
  
  // Get light exposure recommendations
  const getLightExposure = (day) => {
    const light = [
      { day: 1, morning: 'Get outside by 6am', afternoon: 'Avoid screens after 7pm', priority: 'critical' },
      { day: 2, morning: 'Sunrise walk recommended', afternoon: 'Dim lights by 8pm', priority: 'high' },
      { day: 3, morning: 'Morning sun exposure', afternoon: 'Normal evening routine', priority: 'medium' },
      { day: 4, morning: 'Continue morning light', afternoon: 'Regular bedtime routine', priority: 'low' },
      { day: 5, morning: 'Maintain routine', afternoon: 'Normal schedule', priority: 'low' }
    ];
    
    return light.find(l => l.day === day) || light[light.length - 1];
  };
  
  // Get current alerts
  const getCurrentAlerts = () => {
    const hour = new Date().getHours();
    const alerts = [];
    
    if (currentDay <= 3) {
      if (hour >= 14 && hour < 16) {
        alerts.push({
          type: 'warning',
          message: 'Fight the afternoon sleepiness! Stay active.',
          icon: '⚡'
        });
      }
      
      if (hour >= 19 && hour < 20) {
        alerts.push({
          type: 'bedtime',
          message: 'Start bedtime routine for kids',
          icon: '🛁'
        });
      }
      
      if (hour >= 5 && hour < 7) {
        alerts.push({
          type: 'success',
          message: 'Perfect time for morning light exposure!',
          icon: '☀️'
        });
      }
    }
    
    return alerts;
  };
  
  const getQualityColor = (quality) => {
    switch(quality) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-amber-100 text-amber-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };
  
  const mealSchedule = getMealSchedule(currentDay);
  const lightSchedule = getLightExposure(currentDay);
  const alerts = getCurrentAlerts();
  
  // Visual sleep timeline component
  const SleepTimeline = ({ schedule, name }) => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    const isInSleepRange = (hour) => {
      const bedHour = parseInt(schedule.bedtime.split(':')[0]);
      const wakeHour = parseInt(schedule.waketime.split(':')[0]);
      
      if (bedHour > wakeHour) {
        // Sleep crosses midnight
        return hour >= bedHour || hour < wakeHour;
      }
      return hour >= bedHour && hour < wakeHour;
    };
    
    const isNapTime = (hour) => {
      if (!schedule.naptime) return false;
      const naps = schedule.naptime.split(', ');
      
      for (const nap of naps) {
        const [start, end] = nap.split('-');
        const startHour = parseInt(start.split(':')[0]);
        const endHour = parseInt(end.split(':')[0]);
        
        if (hour >= startHour && hour < endHour) return true;
      }
      return false;
    };
    
    return (
      <div className="bg-white p-3 rounded-lg border border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <h5 className="font-medium text-sm">{name}</h5>
          <span className={`text-xs px-2 py-1 rounded-full ${getQualityColor(schedule.quality)}`}>
            Sleep Quality: {schedule.quality}
          </span>
        </div>
        
        {/* Timeline */}
        <div className="relative h-8 bg-slate-100 rounded-lg overflow-hidden">
          {hours.map(hour => (
            <div
              key={hour}
              className={`absolute top-0 h-full border-r border-slate-200 ${
                isInSleepRange(hour) ? 'bg-indigo-400' :
                isNapTime(hour) ? 'bg-purple-300' :
                'bg-slate-100'
              }`}
              style={{ left: `${(hour / 24) * 100}%`, width: `${100 / 24}%` }}
            >
              {(hour % 6 === 0) && (
                <span className="absolute top-0 text-xs text-slate-600 -ml-2">
                  {hour}
                </span>
              )}
            </div>
          ))}
          
          {/* Markers */}
          <div 
            className="absolute top-0 h-full w-0.5 bg-red-600"
            style={{ left: `${(parseInt(schedule.bedtime.split(':')[0]) / 24) * 100}%` }}
          >
            <span className="absolute -top-5 text-xs bg-red-100 px-1 rounded -ml-4">
              Bed {schedule.bedtime}
            </span>
          </div>
          
          <div 
            className="absolute top-0 h-full w-0.5 bg-green-600"
            style={{ left: `${(parseInt(schedule.waketime.split(':')[0]) / 24) * 100}%` }}
          >
            <span className="absolute -bottom-5 text-xs bg-green-100 px-1 rounded -ml-4">
              Wake {schedule.waketime}
            </span>
          </div>
        </div>
        
        <p className="text-xs text-slate-600 mt-2">{schedule.note}</p>
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Icons.moon className="w-6 h-6" />
          Smart Jet Lag Schedule - Day {currentDay}
        </h2>
        <p className="text-indigo-100 text-sm">
          Personalized sleep schedules for your family's adjustment to Phuket time (+6 hours)
        </p>
      </div>
      
      {/* Current Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert, i) => (
            <div key={i} className={`p-3 rounded-lg flex items-center gap-3 ${
              alert.type === 'warning' ? 'bg-amber-100 text-amber-800' :
              alert.type === 'bedtime' ? 'bg-purple-100 text-purple-800' :
              'bg-green-100 text-green-800'
            }`}>
              <span className="text-2xl">{alert.icon}</span>
              <p className="font-medium text-sm">{alert.message}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Family Member Selector */}
      <div className="bg-white p-3 rounded-lg border border-slate-200">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedPerson('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedPerson === 'all' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Family
          </button>
          {familyMembers.map(member => (
            <button
              key={member.id}
              onClick={() => setSelectedPerson(member.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedPerson === member.id 
                  ? member.color
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {member.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Sleep Schedules */}
      <div className="space-y-3">
        {(selectedPerson === 'all' ? familyMembers : familyMembers.filter(m => m.id === selectedPerson))
          .map(member => {
            const schedule = getSleepSchedule(currentDay, member.ageGroup);
            return (
              <SleepTimeline 
                key={member.id}
                schedule={schedule}
                name={member.name}
              />
            );
          })}
      </div>
      
      {/* Meal Schedule */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Icons.utensils className="w-5 h-5 text-rose-500" />
          Meal Timing for Day {currentDay}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 bg-amber-50 rounded-lg">
            <p className="text-xs text-slate-600">Breakfast</p>
            <p className="font-bold text-lg text-amber-800">{mealSchedule.breakfast}</p>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded-lg">
            <p className="text-xs text-slate-600">Lunch</p>
            <p className="font-bold text-lg text-orange-800">{mealSchedule.lunch}</p>
          </div>
          <div className="text-center p-2 bg-rose-50 rounded-lg">
            <p className="text-xs text-slate-600">Dinner</p>
            <p className="font-bold text-lg text-rose-800">{mealSchedule.dinner}</p>
          </div>
        </div>
        <p className="text-xs text-slate-600 mt-2 text-center">{mealSchedule.note}</p>
      </div>
      
      {/* Light Exposure */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200">
        <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
          <Icons.sun className="w-5 h-5" />
          Light Exposure Plan
        </h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-lg">🌅</span>
            <div>
              <p className="font-medium text-sm text-amber-800">Morning</p>
              <p className="text-xs text-amber-600">{lightSchedule.morning}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-lg">🌙</span>
            <div>
              <p className="font-medium text-sm text-amber-800">Evening</p>
              <p className="text-xs text-amber-600">{lightSchedule.afternoon}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Tracker */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-3">Adjustment Progress</h3>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(day => (
            <div
              key={day}
              className={`flex-1 h-2 rounded-full ${
                day <= currentDay ? 'bg-green-500' :
                day === currentDay + 1 ? 'bg-amber-500' :
                'bg-slate-200'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-600 mt-2">
          <span>Day 1</span>
          <span>Fully Adjusted</span>
          <span>Day 9</span>
        </div>
      </div>
      
      {/* Tips for Today */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for Day {currentDay}</h3>
        <ul className="space-y-1 text-sm text-blue-700">
          {currentDay <= 2 && (
            <>
              <li>• Keep kids awake until their bedtime, even if they're cranky</li>
              <li>• Avoid long afternoon naps for adults</li>
              <li>• Stay hydrated - dehydration worsens jet lag</li>
            </>
          )}
          {currentDay === 3 && (
            <>
              <li>• You should start feeling more normal today</li>
              <li>• Maintain consistent meal times</li>
              <li>• Light exercise helps adjustment</li>
            </>
          )}
          {currentDay >= 4 && (
            <>
              <li>• You're mostly adjusted - maintain the routine</li>
              <li>• Don't sleep in, even if you can</li>
              <li>• Keep regular bedtimes for the rest of the trip</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SmartJetLagScheduler;
