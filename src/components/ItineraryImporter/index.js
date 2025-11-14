import React, { useState } from 'react';
import { Icons } from '../../data/staticData';
import { useTrip } from '../../context/TripContext';
import { parseBookingText, bookingToActivity } from '../../utils/bookingParser';

const ItineraryImporter = () => {
  const { planData, addActivity } = useTrip();
  const [inputText, setInputText] = useState('');
  const [extractedBookings, setExtractedBookings] = useState([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleExtract = () => {
    setIsExtracting(true);

    // Simulate processing delay for better UX
    setTimeout(() => {
      const bookings = parseBookingText(inputText);
      setExtractedBookings(bookings);
      setIsExtracting(false);
    }, 500);
  };

  const handleRemove = (id) => {
    setExtractedBookings(prev => prev.filter(b => b.id !== id));
  };

  const handleEdit = (booking) => {
    setEditingId(booking.id);
    setEditForm(booking);
  };

  const handleSaveEdit = () => {
    setExtractedBookings(prev =>
      prev.map(b => (b.id === editingId ? { ...editForm } : b))
    );
    setEditingId(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleAddAll = () => {
    if (extractedBookings.length === 0) return;

    const bookingsByDate = {};

    // Group bookings by date
    extractedBookings.forEach(booking => {
      const date = booking.date || booking.checkIn;
      if (date) {
        if (!bookingsByDate[date]) {
          bookingsByDate[date] = [];
        }
        bookingsByDate[date].push(booking);
      }
    });

    // Find matching day indices and add activities
    Object.entries(bookingsByDate).forEach(([date, bookings]) => {
      const dayIndex = planData.findIndex(day => day.date === date);

      if (dayIndex !== -1) {
        bookings.forEach(booking => {
          const activity = bookingToActivity(booking, date);
          addActivity(dayIndex, activity);
        });
      }
    });

    // Show success message
    const count = extractedBookings.length;
    alert(`✅ Added ${count} ${count === 1 ? 'item' : 'items'} to your itinerary!`);

    // Clear
    setExtractedBookings([]);
    setInputText('');
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'hotel': return '🏨';
      case 'train': return '🚄';
      case 'flight': return '✈️';
      case 'restaurant': return '🍽️';
      case 'activity': return '🎭';
      default: return '📋';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'hotel': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300';
      case 'train': return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300';
      case 'flight': return 'bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300';
      case 'restaurant': return 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300';
      case 'activity': return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300';
      default: return 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300';
    }
  };

  const exampleText = `Hotel Booking Confirmation #ABC123
Grand Plaza Paris
Check-in: 15 November 2025, 14:00
Check-out: 19 November 2025, 11:00
123 Rue de Rivoli, Paris

---

Your Eurostar ticket
From: London St Pancras
To: Paris Gare du Nord
Departure: 15 Nov 2025, 09:30
Arrival: 15 Nov 2025, 12:47
Coach E, Seats 45-46
Booking Ref: XYZ789`;

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Icons.Calendar className="w-6 h-6 text-sky-600"/>
            Import Bookings
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Paste your confirmation emails to automatically extract bookings
          </p>
        </div>
      </div>

      {/* Input Section */}
      {extractedBookings.length === 0 && (
        <div className="space-y-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={exampleText}
            className="w-full h-64 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-sky-500 font-mono resize-none"
          />

          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Supports: Hotels, Trains, Flights, Restaurants, Activities
            </p>
            <button
              onClick={handleExtract}
              disabled={!inputText.trim() || isExtracting}
              className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isExtracting ? (
                <>
                  <Icons.Loader className="w-4 h-4 animate-spin"/>
                  Extracting...
                </>
              ) : (
                <>
                  <Icons.Search className="w-4 h-4"/>
                  Extract Bookings
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Extracted Bookings Preview */}
      {extractedBookings.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              ✨ Found {extractedBookings.length} {extractedBookings.length === 1 ? 'booking' : 'bookings'}
            </p>
            <button
              onClick={() => {
                setExtractedBookings([]);
                setInputText('');
              }}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 underline"
            >
              Start Over
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {extractedBookings.map((booking) => (
              <div
                key={booking.id}
                className={`p-4 rounded-lg border-2 ${getTypeColor(booking.type)} transition-all`}
              >
                {editingId === booking.id ? (
                  // Edit Mode
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-sm bg-white dark:bg-slate-700 dark:text-slate-200"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={editForm.date || editForm.checkIn || ''}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        className="border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-sm bg-white dark:bg-slate-700 dark:text-slate-200"
                      />
                      <input
                        type="time"
                        value={editForm.time || ''}
                        onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                        className="border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-sm bg-white dark:bg-slate-700 dark:text-slate-200"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="flex-1 bg-green-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded text-sm font-medium hover:bg-slate-400 dark:hover:bg-slate-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getTypeIcon(booking.type)}</span>
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                            {booking.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 capitalize">
                            {booking.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(booking)}
                          className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors"
                          title="Edit"
                        >
                          <Icons.Edit className="w-4 h-4 text-slate-600 dark:text-slate-300"/>
                        </button>
                        <button
                          onClick={() => handleRemove(booking.id)}
                          className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                          title="Remove"
                        >
                          <Icons.Trash className="w-4 h-4 text-red-600 dark:text-red-400"/>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm">
                      {booking.date && (
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 dark:text-slate-400">📅</span>
                          <span className="text-slate-700 dark:text-slate-300">{booking.date}</span>
                          {booking.time && (
                            <span className="text-slate-700 dark:text-slate-300">• {booking.time}</span>
                          )}
                        </div>
                      )}
                      {booking.checkIn && booking.checkOut && (
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 dark:text-slate-400">📅</span>
                          <span className="text-slate-700 dark:text-slate-300">
                            {booking.checkIn} → {booking.checkOut}
                          </span>
                        </div>
                      )}
                      {booking.from && booking.to && (
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 dark:text-slate-400">🗺️</span>
                          <span className="text-slate-700 dark:text-slate-300">
                            {booking.from} → {booking.to}
                            {booking.arrivalTime && ` (arrives ${booking.arrivalTime})`}
                          </span>
                        </div>
                      )}
                      {booking.location && (
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 dark:text-slate-400">📍</span>
                          <span className="text-slate-700 dark:text-slate-300">{booking.location}</span>
                        </div>
                      )}
                      {booking.bookingRef && (
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 dark:text-slate-400">#</span>
                          <span className="text-slate-700 dark:text-slate-300 font-mono text-xs">
                            {booking.bookingRef}
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddAll}
              className="flex-1 bg-sky-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-sky-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icons.Plus className="w-5 h-5"/>
              Add All to Itinerary ({extractedBookings.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryImporter;
