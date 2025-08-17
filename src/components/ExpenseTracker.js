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

  const handleQuickAdd = (quickAmount) => {
    setAmount(quickAmount.amount.toString());
    setCurrency(quickAmount.currency);
    setShowAddForm(true);
  };

  const todayExpenses = expenses?.days[date];
  const categoryBreakdown = getSpendingByCategory();

  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200">
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
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-600 mb-1">
            Today's Items
          </p>
          {todayExpenses.items.slice(-3).map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-slate-600">
                {item.description || item.category}
              </span>
              <span className="font-medium">
                {item.currency === 'THB' ? '฿' : '£'}{item.amount}
              </span>
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
