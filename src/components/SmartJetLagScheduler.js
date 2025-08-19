import React, { useState, useEffect } from 'react';
import { Icons } from '../data/staticData';

const SmartJetLagScheduler = ({ currentDate }) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState('all');
  const [editMode, setEditMode] = useState(false);
  const [actualSleepData, setActualSleepData] = useState(() => {
    const saved = localStorage.getItem('jetlag_actual_sleep');
    return saved ? JSON.parse(saved) : {};
  });
  const [editingPerson, setEditingPerson] = useState(null);
  const [tempSleepData, setTempSleepData] = useState({});
  
  // Calculate which day of the trip we're on
  useEffect(() => {
    const tripStart = new Date('2025-08-20');
    const current = currentDate ? new Date(currentDate) : new Date();
    const dayNumber = Math.max(1, Math.ceil((current - tripStart) / (1000 * 60 * 60 * 24)) + 1);
    setCurrentDay(Math.min(9, dayNumber));
  }, [currentDate]);
  
  // Save actual sleep data whenever it changes
  useEffect(() => {
    localStorage.setItem('jetlag_actual_sleep', JSON.stringify(actualSleepData));
  }, [actualSleepData]);
  
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
  
  // Get actual sleep data for a person on a specific day
  const getActualSleep = (personId, day) => {
    const key = `${personId}_day${day}`;
    return actualSleepData[key] || null;
  };
  
  // Start editing sleep data for a person
  const startEdit = (member, day) => {
    const key = `${member.id}_day${day}`;
    const existing = actualSleepData[key] || {};
    setEditingPerson(member.id);
    setTempSleepData({
      bedtime: existing.bedtime || '',
      waketime: existing.waketime || '',
      naptime: existing.naptime || '',
      nightWakings: existing.nightWakings || 0,
      notes: existing.notes || ''
    });
  };
  
  // Save edited sleep data
  const saveEdit = () => {
    if (editingPerson) {
      const key = `${editingPerson}_day${currentDay}`;
      setActualSleepData(prev => ({
        ...prev,
        [key]: {
          ...tempSleepData,
          timestamp: new Date().toISOString()
        }
      }));
      setEditingPerson(null);
      setTempSleepData({});
    }
  };
  
  // Cancel edit
  const cancelEdit = () => {
    setEditingPerson(null);
    setTempSleepData({});
  };
  
  // Calculate sleep quality score
  const calculateSleepScore = (planned, actual) => {
    if (!actual || !actual.bedtime || !actual.waketime) return null;
    
    // Convert times to minutes for comparison
    const timeToMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };
    
    const plannedBed = timeToMinutes(planned.bedtime);
    const actualBed = timeToMinutes(actual.bedtime);
    const plannedWake = timeToMinutes(planned.waketime);
    const actualWake = timeToMinutes(actual.waketime);
    
    // Calculate differences (within 30 mins = good)
    const bedDiff = Math.abs(plannedBed - actualBed);
    const wakeDiff = Math.abs(plannedWake - actualWake);
    
    let score = 10;
    if (bedDiff > 60) score -= 3;
    else if (bedDiff > 30) score -= 1;
    
    if (wakeDiff > 60) score -= 3;
    else if (wakeDiff > 30) score -= 1;
    
    if (actual.nightWakings > 3) score -= 2;
    else if (actual.nightWakings > 1) score -= 1;
    
    return Math.max(0, Math.min(10, score));
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
  
  // Enhanced Sleep Timeline component with actual vs planned
  const SleepTimeline = ({ schedule, actual, name, member }) => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const sleepScore = calculateSleepScore(schedule, actual);
    
    const isInSleepRange = (hour, sleepData) => {
      if (!sleepData.bedtime || !sleepData.waketime) return false;
      const bedHour = parseInt(sleepData.bedtime.split(':')[0]);
      const wakeHour = parseInt(sleepData.waketime.split(':')[0]);
      
      if (bedHour > wakeHour) {
        return hour >= bedHour || hour < wakeHour;
      }
      return hour >= bedHour && hour < wakeHour;
    };
    
    const isNapTime = (hour, naptime) => {
      if (!naptime) return false;
      const naps = naptime.split(', ');
      
      for (const nap of naps) {
        const [start, end] = nap.split('-');
        if (!start || !end) continue;
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
          <div className="flex items-center gap-2">
            {sleepScore !== null && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                sleepScore >= 8 ? 'bg-green-100 text-green-800' :
                sleepScore >= 5 ? 'bg-amber-100 text-amber-800' :
                'bg-red-100 text-red-800'
              }`}>
                Score: {sleepScore}/10
              </span>
            )}
            <span className={`text-xs px-2 py-1 rounded-full ${getQualityColor(schedule.quality)}`}>
              Expected: {schedule.quality}
            </span>
            <button
              onClick={() => startEdit(member, currentDay)}
              className="text-xs px-2 py-1 bg-sky-100 text-sky-700 rounded-full hover:bg-sky-200"
            >
              {actual ? 'Edit' : 'Log'} Sleep
            </button>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="space-y-1">
          {/* Planned Schedule */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 w-12">Plan:</span>
            <div className="relative h-6 bg-slate-100 rounded-lg overflow-hidden flex-1">
              {hours.map(hour => (
                <div
                  key={hour}
                  className={`absolute top-0 h-full border-r border-slate-200 ${
                    isInSleepRange(hour, schedule) ? 'bg-indigo-400' :
                    isNapTime(hour, schedule.naptime) ? 'bg-purple-300' :
                    'bg-slate-100'
                  }`}
                  style={{ left: `${(hour / 24) * 100}%`, width: `${100 / 24}%` }}
                />
              ))}
            </div>
          </div>
          
          {/* Actual Schedule (if logged) */}
          {actual && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 w-12">Actual:</span>
              <div className="relative h-6 bg-slate-100 rounded-lg overflow-hidden flex-1">
                {hours.map(hour => (
                  <div
                    key={hour}
                    className={`absolute top-0 h-full border-r border-slate-200 ${
                      isInSleepRange(hour, actual) ? 'bg-green-500' :
                      isNapTime(hour, actual.naptime) ? 'bg-green-300' :
                      'bg-slate-100'
                    }`}
                    style={{ left: `${(hour / 24) * 100}%`, width: `${100 / 24}%` }}
                  />
                ))}
                {/* Night wakings markers */}
                {actual.nightWakings > 0 && (
                  <div className="absolute top-0 left-0 right-0 h-full flex items-center justify-center">
                    <span className="text-xs bg-red-500 text-white px-1 rounded">
                      {actual.nightWakings} wake-ups
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Time labels */}
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>12am</span>
          <span>6am</span>
          <span>12pm</span>
          <span>6pm</span>
          <span>12am</span>
        </div>
        
        <p className="text-xs text-slate-600 mt-2">{schedule.note}</p>
        {actual?.notes && (
          <p className="text-xs text-green-600 mt-1">📝 {actual.notes}</p>
        )}
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
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-3 py-1 bg-white/20 rounded-lg text-sm hover:bg-white/30"
          >
            {editMode ? 'View Mode' : 'Track Actual Sleep'}
          </button>
        </div>
      </div>
      
      {/* Edit Dialog */}
      {editingPerson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="font-bold text-lg mb-4">
              Log Sleep Data - {familyMembers.find(m => m.id === editingPerson)?.name}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Bedtime</label>
                <input
                  type="time"
                  value={tempSleepData.bedtime}
                  onChange={(e) => setTempSleepData({ ...tempSleepData, bedtime: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Wake Time</label>
                <input
                  type="time"
                  value={tempSleepData.waketime}
                  onChange={(e) => setTempSleepData({ ...tempSleepData, waketime: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Nap Times (e.g., 13:00-14:00)</label>
                <input
                  type="text"
                  value={tempSleepData.naptime}
                  onChange={(e) => setTempSleepData({ ...tempSleepData, naptime: e.target.value })}
                  placeholder="13:00-14:00, 16:00-16:30"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Night Wakings</label>
                <input
                  type="number"
                  min="0"
                  value={tempSleepData.nightWakings}
                  onChange={(e) => setTempSleepData({ ...tempSleepData, nightWakings: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Notes</label>
                <textarea
                  value={tempSleepData.notes}
                  onChange={(e) => setTempSleepData({ ...tempSleepData, notes: e.target.value })}
                  placeholder="How did they sleep? Any issues?"
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="2"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={saveEdit}
                className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
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
            const actual = getActualSleep(member.id, currentDay);
            return (
              <SleepTimeline 
                key={member.id}
                schedule={schedule}
                actual={actual}
                name={member.name}
                member={member}
              />
            );
          })}
      </div>
      
      {/* Compliance Summary */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-3">Sleep Tracking Summary</h3>
        <div className="grid grid-cols-2 gap-3">
          {familyMembers.map(member => {
            const hasData = Array.from({ length: currentDay }, (_, i) => i + 1)
              .map(day => getActualSleep(member.id, day))
              .filter(Boolean).length;
            
            return (
              <div key={member.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium">{member.name}</span>
                <span className="text-xs text-slate-600">
                  {hasData}/{currentDay} days tracked
                </span>
              </div>
            );
          })}
        </div>
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
    </div>
  );
};

export default SmartJetLagScheduler;
