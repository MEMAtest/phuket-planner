import React, { useState, useEffect } from 'react';
import { Icons } from '../data/staticData';
import {
  addExpense,
  getExpenses,
  fetchExchangeRate,
  updateExchangeRate,
  getSpendingByCategory,
  checkBudgetAlert,
  QUICK_AMOUNTS
} from '../services/expenseService';

const ExpenseTracker = ({ date, activityId, onExpenseAdded }) => {
  const [expenses, setExpenses] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('THB');
  const [category, setCategory] = useState('food');
  const [description, setDescription] = useState('');
  const [exchangeRate, setExchangeRate] = useState(43.5);
  const [budgetAlert, setBudgetAlert] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showAllExpenses, setShowAllExpenses] = useState(false);

  useEffect(() => {
    loadExpenses();
    loadExchangeRate();
  }, [date]);

  const loadExpenses = () => {
    const exp = getExpenses();
    setExpenses(exp);
    
    // Check budget
    const alert = checkBudgetAlert();
    setBudgetAlert(alert);
  };

  const loadExchangeRate = async () => {
    const rate = await fetchExchangeRate();
    setExchangeRate(rate);
  };

  const handleAddExpense = async () => {
    if (!amount || amount <= 0) return;

    const newExpense = await addExpense(date, {
      amount: parseFloat(amount),
      currency,
      category,
      description,
      activityId
    });

    loadExpenses();
    setShowAddForm(false);
    setAmount('');
    setDescription('');
    
    if (onExpenseAdded) {
      onExpenseAdded(newExpense);
    }
  };

  const handleUpdateExpense = (expenseId) => {
    if (!editingExpense || !editingExpense.amount || editingExpense.amount <= 0) return;

    // Get all expenses
    const allExpenses = getExpenses();
    if (!allExpenses || !allExpenses.days[date]) return;

    // Find and update the expense
    const dayExpenses = allExpenses.days[date];
    const expenseIndex = dayExpenses.items.findIndex(item => item.id === expenseId);
    
    if (expenseIndex === -1) return;

    const oldExpense = dayExpenses.items[expenseIndex];
    const rate = allExpenses.exchangeRate || exchangeRate;

    // Calculate new amounts
    const newAmountTHB = editingExpense.currency === 'GBP' 
      ? editingExpense.amount * rate 
      : editingExpense.amount;
    const newAmountGBP = editingExpense.currency === 'GBP' 
      ? editingExpense.amount 
      : editingExpense.amount / rate;

    // Update the expense
    dayExpenses.items[expenseIndex] = {
      ...oldExpense,
      amount: parseFloat(editingExpense.amount),
      currency: editingExpense.currency,
      amountTHB: newAmountTHB,
      amountGBP: newAmountGBP,
      category: editingExpense.category,
      description: editingExpense.description,
      lastModified: new Date().toISOString()
    };

    // Recalculate day totals
    dayExpenses.totalTHB = dayExpenses.items.reduce((sum, item) => sum + item.amountTHB, 0);
    dayExpenses.totalGBP = dayExpenses.items.reduce((sum, item) => sum + item.amountGBP, 0);

    // Update category totals
    Object.keys(allExpenses.categories).forEach(cat => {
      allExpenses.categories[cat].total = 0;
      allExpenses.categories[cat].count = 0;
    });

    Object.values(allExpenses.days).forEach(day => {
      day.items.forEach(item => {
        if (allExpenses.categories[item.category]) {
          allExpenses.categories[item.category].total += item.amountTHB;
          allExpenses.categories[item.category].count += 1;
        }
      });
    });

    // Update grand totals
    allExpenses.totalTHB = Object.values(allExpenses.days).reduce(
      (sum, day) => sum + day.totalTHB, 0
    );
    allExpenses.totalGBP = Object.values(allExpenses.days).reduce(
      (sum, day) => sum + day.totalGBP, 0
    );

    // Save to localStorage
    localStorage.setItem('phuket_expense_data', JSON.stringify(allExpenses));
    
    // Reload and clear editing state
    loadExpenses();
    setEditingExpense(null);
  };

  const handleDeleteExpense = (expenseId) => {
    if (!window.confirm('Delete this expense?')) return;

    // Get all expenses
    const allExpenses = getExpenses();
    if (!allExpenses || !allExpenses.days[date]) return;

    // Find and remove the expense
    const dayExpenses = allExpenses.days[date];
    const expenseToDelete = dayExpenses.items.find(item => item.id === expenseId);
    
    if (!expenseToDelete) return;

    // Remove from items array
    dayExpenses.items = dayExpenses.items.filter(item => item.id !== expenseId);

    // Recalculate day totals
    dayExpenses.totalTHB -= expenseToDelete.amountTHB;
    dayExpenses.totalGBP -= expenseToDelete.amountGBP;

    // Update category totals
    if (allExpenses.categories[expenseToDelete.category]) {
      allExpenses.categories[expenseToDelete.category].total -= expenseToDelete.amountTHB;
      allExpenses.categories[expenseToDelete.category].count -= 1;
    }

    // Update grand totals
    allExpenses.totalTHB -= expenseToDelete.amountTHB;
    allExpenses.totalGBP -= expenseToDelete.amountGBP;

    // Save to localStorage
    localStorage.setItem('phuket_expense_data', JSON.stringify(allExpenses));
    
    // Reload
    loadExpenses();
  };

  const handleQuickAdd = (quickAmount) => {
    setAmount(quickAmount.amount.toString());
    setCurrency(quickAmount.currency);
    setShowAddForm(true);
  };

  const startEditExpense = (expense) => {
    setEditingExpense({
      amount: expense.amount.toString(),
      currency: expense.currency,
      category: expense.category,
      description: expense.description || ''
    });
  };

  const cancelEdit = () => {
    setEditingExpense(null);
  };

  const todayExpenses = expenses?.days[date];
  const categoryBreakdown = getSpendingByCategory();
  const displayLimit = showAllExpenses ? 999 : 3;

  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200 expense-tracker">
      {/* Header with Totals */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <Icons.wallet className="w-5 h-5 text-green-600" />
            Today's Spending
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Rate: £1 = ฿{exchangeRate.toFixed(1)}
            <button
              onClick={updateExchangeRate}
              className="ml-2 text-sky-600 hover:text-sky-700"
              title="Update rate"
            >
              <Icons.repeat className="w-3 h-3 inline" />
            </button>
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-800">
            ฿{todayExpenses?.totalTHB.toFixed(0) || 0}
          </p>
          <p className="text-sm text-slate-500">
            £{todayExpenses?.totalGBP.toFixed(2) || 0}
          </p>
        </div>
      </div>

      {/* Budget Alert */}
      {budgetAlert && (
        <div className={`p-2 rounded-lg mb-3 text-sm font-medium
          ${budgetAlert.type === 'danger' ? 'bg-red-100 text-red-800' : 
            'bg-amber-100 text-amber-800'}`}>
          <Icons.alertTriangle className="w-4 h-4 inline mr-1" />
          {budgetAlert.message}
        </div>
      )}

      {/* Quick Add Buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        {QUICK_AMOUNTS.map(qa => (
          <button
            key={qa.label}
            onClick={() => handleQuickAdd(qa)}
            className="px-3 py-1 text-sm font-medium bg-slate-100 
                     hover:bg-slate-200 rounded-lg transition-colors"
          >
            + {qa.label}
          </button>
        ))}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3 py-1 text-sm font-medium bg-sky-100 
                   text-sky-700 hover:bg-sky-200 rounded-lg transition-colors"
        >
          <Icons.plusCircle className="w-4 h-4 inline mr-1" />
          Custom
        </button>
      </div>

      {/* Add Expense Form */}
      {showAddForm && (
        <div className="bg-slate-50 rounded-lg p-3 mb-3">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm"
              autoFocus
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              <option value="THB">THB ฿</option>
              <option value="GBP">GBP £</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              <option value="food">🍜 Food</option>
              <option value="activities">🎢 Activities</option>
              <option value="transport">🚕 Transport</option>
              <option value="shopping">🛍️ Shopping</option>
              <option value="other">💳 Other</option>
            </select>
            <input
              type="text"
              placeholder="Note (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleAddExpense}
              className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg 
                       text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Add Expense
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setAmount('');
                setDescription('');
              }}
              className="px-3 py-2 bg-slate-300 text-slate-700 rounded-lg 
                       text-sm font-medium hover:bg-slate-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Today's Expenses List */}
      {todayExpenses?.items.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-semibold text-slate-600">
              Today's Items ({todayExpenses.items.length})
            </p>
            {todayExpenses.items.length > 3 && (
              <button
                onClick={() => setShowAllExpenses(!showAllExpenses)}
                className="text-xs text-sky-600 hover:text-sky-700"
              >
                {showAllExpenses ? 'Show Less' : `Show All (${todayExpenses.items.length})`}
              </button>
            )}
          </div>
          
          {todayExpenses.items
            .slice(-displayLimit)
            .reverse()
            .map(item => (
              <div key={item.id} className="bg-slate-50 rounded-lg p-2">
                {editingExpense && item.id === editingExpense.id ? (
                  // Edit Mode
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={editingExpense.amount}
                        onChange={(e) => setEditingExpense({
                          ...editingExpense,
                          amount: e.target.value
                        })}
                        className="px-2 py-1 border rounded text-sm"
                        autoFocus
                      />
                      <select
                        value={editingExpense.currency}
                        onChange={(e) => setEditingExpense({
                          ...editingExpense,
                          currency: e.target.value
                        })}
                        className="px-2 py-1 border rounded text-sm"
                      >
                        <option value="THB">THB ฿</option>
                        <option value="GBP">GBP £</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={editingExpense.category}
                        onChange={(e) => setEditingExpense({
                          ...editingExpense,
                          category: e.target.value
                        })}
                        className="px-2 py-1 border rounded text-sm"
                      >
                        <option value="food">🍜 Food</option>
                        <option value="activities">🎢 Activities</option>
                        <option value="transport">🚕 Transport</option>
                        <option value="shopping">🛍️ Shopping</option>
                        <option value="other">💳 Other</option>
                      </select>
                      <input
                        type="text"
                        value={editingExpense.description}
                        onChange={(e) => setEditingExpense({
                          ...editingExpense,
                          description: e.target.value
                        })}
                        placeholder="Description"
                        className="px-2 py-1 border rounded text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateExpense(item.id)}
                        className="flex-1 px-2 py-1 bg-green-600 text-white rounded text-xs font-medium"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 px-2 py-1 bg-slate-300 text-slate-700 rounded text-xs font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Display Mode
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {item.category === 'food' ? '🍜' :
                           item.category === 'activities' ? '🎢' :
                           item.category === 'transport' ? '🚕' :
                           item.category === 'shopping' ? '🛍️' : '💳'}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {item.description || item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(item.timestamp).toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">
                        {item.currency === 'THB' ? '฿' : '£'}{item.amount}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setEditingExpense({
                              ...item,
                              id: item.id,
                              amount: item.amount.toString()
                            });
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(item.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Trip Total Summary */}
      <div className="mt-3 pt-3 border-t border-slate-200">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Trip Total</span>
          <span className="font-bold text-slate-800">
            ฿{expenses?.totalTHB.toFixed(0) || 0} 
            <span className="text-slate-500 font-normal ml-1">
              (£{expenses?.totalGBP.toFixed(2) || 0})
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
