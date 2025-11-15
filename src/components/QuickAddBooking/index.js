import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';

const QuickAddBooking = () => {
  const { planData, addActivity } = useTrip();
  const [formData, setFormData] = useState({
    type: 'train',
    title: '',
    date: '',
    time: '',
    from: '',
    to: '',
    location: '',
    notes: '',
    bookingRef: ''
  });

  const bookingTypes = [
    { id: 'train', label: 'Train', icon: '🚄', activityType: 'travel' },
    { id: 'flight', label: 'Flight', icon: '✈️', activityType: 'travel' },
    { id: 'hotel', label: 'Hotel', icon: '🏨', activityType: 'indoor' },
    { id: 'restaurant', label: 'Restaurant', icon: '🍽️', activityType: 'eat' },
    { id: 'activity', label: 'Activity', icon: '🎭', activityType: 'outdoor' }
  ];

  const currentType = bookingTypes.find(t => t.id === formData.type);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date) {
      alert('Please fill in at least the title and date');
      return;
    }

    // Find day index for the selected date
    const dayIndex = planData.findIndex(day => day.date === formData.date);

    if (dayIndex === -1) {
      alert(`No itinerary day found for ${formData.date}. Please check your travel dates.`);
      return;
    }

    // Build activity title based on type
    let activityTitle = formData.title;
    if (formData.type === 'train' && formData.from && formData.to) {
      activityTitle = `Train: ${formData.from} → ${formData.to}`;
    } else if (formData.type === 'flight' && formData.from && formData.to) {
      activityTitle = `Flight: ${formData.from} → ${formData.to}`;
    } else if (formData.type === 'restaurant') {
      activityTitle = `Dinner: ${formData.title}`;
    }

    // Build notes
    const noteParts = [];
    if (formData.location) noteParts.push(formData.location);
    if (formData.from && formData.to && formData.type !== 'train' && formData.type !== 'flight') {
      noteParts.push(`${formData.from} → ${formData.to}`);
    }
    if (formData.notes) noteParts.push(formData.notes);
    if (formData.bookingRef) noteParts.push(`Ref: ${formData.bookingRef}`);

    // Create activity
    const activity = {
      id: `quick-add-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: activityTitle,
      time: formData.time || '09:00',
      type: currentType.activityType,
      notes: noteParts.join(' • '),
      completed: false,
      createdAt: new Date()
    };

    // Add to itinerary
    addActivity(dayIndex, activity);

    // Show success and reset form
    alert(`✅ Added "${activityTitle}" to ${formData.date}`);
    setFormData({
      type: 'train',
      title: '',
      date: '',
      time: '',
      from: '',
      to: '',
      location: '',
      notes: '',
      bookingRef: ''
    });
  };

  const showFromTo = formData.type === 'train' || formData.type === 'flight';
  const showLocation = formData.type === 'hotel' || formData.type === 'restaurant' || formData.type === 'activity';

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span className="text-2xl">➕</span>
            Quick Add Booking
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manually add a booking in 30 seconds
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Booking Type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Booking Type
          </label>
          <div className="grid grid-cols-5 gap-2">
            {bookingTypes.map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleChange('type', type.id)}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  formData.type === type.id
                    ? 'border-sky-600 bg-sky-50 dark:bg-sky-900/20'
                    : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
                }`}
              >
                <div className="text-2xl mb-1">{type.icon}</div>
                <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {type.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {formData.type === 'hotel' ? 'Hotel Name' :
             formData.type === 'restaurant' ? 'Restaurant Name' :
             formData.type === 'activity' ? 'Activity Name' : 'Title'} *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder={
              formData.type === 'hotel' ? 'e.g., Grand Plaza Paris' :
              formData.type === 'restaurant' ? 'e.g., Le Jules Verne' :
              formData.type === 'activity' ? 'e.g., Louvre Museum' :
              'e.g., Eurostar'
            }
            className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>

        {/* From/To (for trains & flights) */}
        {showFromTo && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                From
              </label>
              <input
                type="text"
                value={formData.from}
                onChange={(e) => handleChange('from', e.target.value)}
                placeholder="London St Pancras"
                className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                To
              </label>
              <input
                type="text"
                value={formData.to}
                onChange={(e) => handleChange('to', e.target.value)}
                placeholder="Paris Gare du Nord"
                className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        )}

        {/* Location (for hotels, restaurants, activities) */}
        {showLocation && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {formData.type === 'hotel' ? 'Address' : 'Location'}
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder={
                formData.type === 'hotel' ? '123 Rue de Rivoli, Paris' :
                formData.type === 'restaurant' ? 'Eiffel Tower, 2nd Floor' :
                'City Center'
              }
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-sky-500"
            />
          </div>
        )}

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Time
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Notes & Booking Ref */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Notes
            </label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Coach E, Seats 45-46"
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Booking Ref
            </label>
            <input
              type="text"
              value={formData.bookingRef}
              onChange={(e) => handleChange('bookingRef', e.target.value)}
              placeholder="ABC123"
              className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-sky-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-sky-700 transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-xl">➕</span>
          Add to Itinerary
        </button>
      </form>
    </div>
  );
};

export default QuickAddBooking;
