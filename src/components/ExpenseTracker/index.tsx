// ──────────────────────────────────────────────────────────────────────────────
// ExpenseTracker Component
// Multi-currency expense tracking with automatic conversion
// ──────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { Expense, MultiCountryTrip, ExpenseSummary } from '../../types/trip';
import { getCountry } from '../../countries';
import { formatMoney, getFxRate } from '../../services/currency';

interface ExpenseTrackerProps {
  trip: MultiCountryTrip;
  expenses: Expense[];
  onAddExpense: (expense: Expense) => void;
  onDeleteExpense: (expenseId: string) => void;
}

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({
  trip,
  expenses,
  onAddExpense,
  onDeleteExpense
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'category' | 'country'>('list');
  const [filterSegment, setFilterSegment] = useState<string | 'all'>('all');
  const [expenseSummary, setExpenseSummary] = useState<ExpenseSummary | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'food' as Expense['category'],
    description: '',
    amount: '',
    currency: trip.homeCurrency,
    segmentId: trip.segments[0]?.id || '',
    paymentMethod: 'card' as Expense['paymentMethod'],
    notes: ''
  });

  useEffect(() => {
    calculateExpenseSummary();
  }, [expenses, trip.homeCurrency]);

  const calculateExpenseSummary = async () => {
    const summary: ExpenseSummary = {
      totalByCategory: {},
      totalByCountry: {},
      totalByCurrency: {},
      grandTotal: {
        homeCurrency: trip.homeCurrency,
        amount: 0
      }
    };

    // Group by category
    expenses.forEach(expense => {
      if (!summary.totalByCategory[expense.category]) {
        summary.totalByCategory[expense.category] = [];
      }
      summary.totalByCategory[expense.category].push({
        amount: expense.amount,
        currency: expense.currency
      });
    });

    // Group by country
    expenses.forEach(expense => {
      if (expense.segmentId) {
        const segment = trip.segments.find(s => s.id === expense.segmentId);
        if (segment) {
          const country = segment.countryIso2;
          if (!summary.totalByCountry[country]) {
            summary.totalByCountry[country] = [];
          }
          summary.totalByCountry[country].push({
            amount: expense.amount,
            currency: expense.currency
          });
        }
      }
    });

    // Group by currency
    expenses.forEach(expense => {
      summary.totalByCurrency[expense.currency] =
        (summary.totalByCurrency[expense.currency] || 0) + expense.amount;
    });

    // Calculate grand total in home currency
    let grandTotal = 0;
    for (const [currency, amount] of Object.entries(summary.totalByCurrency)) {
      if (currency === trip.homeCurrency) {
        grandTotal += amount;
      } else {
        try {
          const fxRate = await getFxRate(currency, trip.homeCurrency);
          grandTotal += amount * fxRate.rate;
        } catch (error) {
          console.error(`Failed to convert ${currency} to ${trip.homeCurrency}:`, error);
          // Use 1:1 as fallback
          grandTotal += amount;
        }
      }
    }

    summary.grandTotal.amount = grandTotal;
    setExpenseSummary(summary);
  };

  const handleAddExpense = () => {
    if (!formData.description || !formData.amount) {
      alert('Please fill in description and amount');
      return;
    }

    const expense: Expense = {
      id: `expense_${Date.now()}`,
      tripId: trip.id,
      segmentId: formData.segmentId || undefined,
      date: formData.date,
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes || undefined
    };

    onAddExpense(expense);
    setShowAddForm(false);

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: 'food',
      description: '',
      amount: '',
      currency: trip.homeCurrency,
      segmentId: trip.segments[0]?.id || '',
      paymentMethod: 'card',
      notes: ''
    });
  };

  const getCountryFlag = (iso2: string) => {
    return String.fromCodePoint(
      ...iso2.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0))
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'accommodation': return '🏨';
      case 'food': return '🍽️';
      case 'transport': return '🚗';
      case 'activities': return '🎯';
      case 'shopping': return '🛍️';
      default: return '📌';
    }
  };

  const filteredExpenses = filterSegment === 'all'
    ? expenses
    : expenses.filter(e => e.segmentId === filterSegment);

  const sortedExpenses = [...filteredExpenses].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Expense Tracker</h2>
          <p className="text-gray-600">Track spending across {trip.segments.length} countries</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Expense
        </button>
      </div>

      {/* Add Expense Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Expense</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Expense['category'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="accommodation">🏨 Accommodation</option>
                <option value="food">🍽️ Food & Drinks</option>
                <option value="transport">🚗 Transport</option>
                <option value="activities">🎯 Activities</option>
                <option value="shopping">🛍️ Shopping</option>
                <option value="other">📌 Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g., Lunch at street market"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {trip.segments.map(segment => {
                  const country = getCountry(segment.countryIso2);
                  return (
                    <option key={segment.id} value={country.currency}>
                      {country.currency} - {country.name}
                    </option>
                  );
                })}
                {!trip.segments.find(s => getCountry(s.countryIso2).currency === trip.homeCurrency) && (
                  <option value={trip.homeCurrency}>{trip.homeCurrency} (Home)</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location (Country)</label>
              <select
                value={formData.segmentId}
                onChange={(e) => {
                  const segment = trip.segments.find(s => s.id === e.target.value);
                  if (segment) {
                    const country = getCountry(segment.countryIso2);
                    setFormData({
                      ...formData,
                      segmentId: e.target.value,
                      currency: country.currency
                    });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {trip.segments.map(segment => {
                  const country = getCountry(segment.countryIso2);
                  return (
                    <option key={segment.id} value={segment.id}>
                      {getCountryFlag(segment.countryIso2)} {country.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as Expense['paymentMethod'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="cash">💵 Cash</option>
                <option value="card">💳 Card</option>
                <option value="digital">📱 Digital Wallet</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddExpense}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Save Expense
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      {expenseSummary && (
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {/* Grand Total */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg p-6 md:col-span-2">
            <div className="text-sm text-blue-100 mb-1">Total Spent</div>
            <div className="text-4xl font-bold mb-2">
              {formatMoney(expenseSummary.grandTotal.amount, trip.homeCurrency, 'en-US')}
            </div>
            <div className="text-sm text-blue-100">In {trip.homeCurrency} (converted)</div>
          </div>

          {/* Expenses Count */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-1">Total Expenses</div>
            <div className="text-3xl font-bold text-gray-900">{expenses.length}</div>
            <div className="text-sm text-gray-500">transactions</div>
          </div>

          {/* Countries */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-1">Countries</div>
            <div className="text-3xl font-bold text-gray-900">
              {Object.keys(expenseSummary.totalByCountry).length}
            </div>
            <div className="text-sm text-gray-500">destinations</div>
          </div>
        </div>
      )}

      {/* View Mode Switcher & Filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg font-medium ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('category')}
            className={`px-4 py-2 rounded-lg font-medium ${
              viewMode === 'category'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            By Category
          </button>
          <button
            onClick={() => setViewMode('country')}
            className={`px-4 py-2 rounded-lg font-medium ${
              viewMode === 'country'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            By Country
          </button>
        </div>

        <select
          value={filterSegment}
          onChange={(e) => setFilterSegment(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Countries</option>
          {trip.segments.map(segment => {
            const country = getCountry(segment.countryIso2);
            return (
              <option key={segment.id} value={segment.id}>
                {getCountryFlag(segment.countryIso2)} {country.name}
              </option>
            );
          })}
        </select>
      </div>

      {/* Expense List */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {sortedExpenses.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-500">No expenses recorded yet</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Your First Expense
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {sortedExpenses.map(expense => {
                const segment = trip.segments.find(s => s.id === expense.segmentId);
                const country = segment ? getCountry(segment.countryIso2) : null;

                return (
                  <div key={expense.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-3xl">{getCategoryIcon(expense.category)}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{expense.description}</h4>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {expense.category}
                            </span>
                            {expense.paymentMethod && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {expense.paymentMethod}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>{formatDate(expense.date)}</span>
                            {segment && country && (
                              <>
                                <span className="text-gray-400">•</span>
                                <span className="flex items-center gap-1">
                                  {getCountryFlag(segment.countryIso2)} {country.name}
                                </span>
                              </>
                            )}
                          </div>

                          {expense.notes && (
                            <p className="text-sm text-gray-500 mt-1">{expense.notes}</p>
                          )}
                        </div>
                      </div>

                      <div className="text-right ml-4">
                        <div className="font-bold text-lg text-gray-900">
                          {formatMoney(expense.amount, expense.currency, 'en-US')}
                        </div>
                        {expense.currency !== trip.homeCurrency && (
                          <div className="text-xs text-gray-500">
                            ≈ {trip.homeCurrency} (converting...)
                          </div>
                        )}
                        <button
                          onClick={() => onDeleteExpense(expense.id)}
                          className="text-xs text-red-600 hover:text-red-700 mt-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Category View */}
      {viewMode === 'category' && expenseSummary && (
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(expenseSummary.totalByCategory).map(([category, amounts]) => {
            const categoryExpenses = filteredExpenses.filter(e => e.category === category);
            const total = amounts.reduce((sum, a) => sum + a.amount, 0);

            return (
              <div key={category} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{getCategoryIcon(category)}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 capitalize">{category}</h3>
                    <p className="text-sm text-gray-600">{categoryExpenses.length} expenses</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {Object.entries(
                    amounts.reduce((acc, a) => {
                      acc[a.currency] = (acc[a.currency] || 0) + a.amount;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([currency, amount]) => (
                    <div key={currency} className="flex justify-between">
                      <span className="text-gray-600">{currency}</span>
                      <span className="font-semibold">{formatMoney(amount, currency, 'en-US')}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Country View */}
      {viewMode === 'country' && expenseSummary && (
        <div className="space-y-4">
          {Object.entries(expenseSummary.totalByCountry).map(([countryIso2, amounts]) => {
            const country = getCountry(countryIso2);
            const countryExpenses = filteredExpenses.filter(e => {
              const segment = trip.segments.find(s => s.id === e.segmentId);
              return segment?.countryIso2 === countryIso2;
            });

            return (
              <div key={countryIso2} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{getCountryFlag(countryIso2)}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{country.name}</h3>
                    <p className="text-sm text-gray-600">{countryExpenses.length} expenses</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(
                    amounts.reduce((acc, a) => {
                      acc[a.currency] = (acc[a.currency] || 0) + a.amount;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([currency, amount]) => (
                    <div key={currency} className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">{currency}</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {formatMoney(amount, currency, 'en-US')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
