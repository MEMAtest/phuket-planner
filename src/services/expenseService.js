// Expense and Currency Service
// Tracks spending and handles GBP/THB conversion

const CACHE_KEY = 'phuket_expense_data';
const RATE_CACHE_KEY = 'exchange_rate_cache';

// Default exchange rate (update if API fails)
const DEFAULT_RATE = 43.5; // 1 GBP = 43.5 THB (as of Jan 2025)

// Exchange rate API (free tier)
export const fetchExchangeRate = async () => {
  const cached = getCachedRate();
  
  // Use cache if less than 12 hours old
  if (cached && cached.timestamp > Date.now() - (12 * 60 * 60 * 1000)) {
    return cached.rate;
  }
  
  try {
    // Using exchangerate-api.com free tier (1500 requests/month)
    const response = await fetch(
      'https://api.exchangerate-api.com/v4/latest/GBP'
    );
    
    if (!response.ok) throw new Error('Rate fetch failed');
    
    const data = await response.json();
    const rate = data.rates.THB || DEFAULT_RATE;
    
    // Cache the rate
    localStorage.setItem(RATE_CACHE_KEY, JSON.stringify({
      rate,
      timestamp: Date.now(),
      date: new Date().toISOString()
    }));
    
    return rate;
  } catch (error) {
    console.error('Exchange rate fetch error:', error);
    return cached?.rate || DEFAULT_RATE;
  }
};

// Get cached exchange rate
const getCachedRate = () => {
  try {
    const cached = localStorage.getItem(RATE_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

// Initialize expense tracking
export const initializeExpenses = (planData) => {
  const existing = getExpenses();
  if (existing && existing.days) return existing;
  
  const expenses = {
    days: {},
    categories: {
      food: { total: 0, count: 0, icon: '🍜' },
      activities: { total: 0, count: 0, icon: '🎢' },
      transport: { total: 0, count: 0, icon: '🚕' },
      shopping: { total: 0, count: 0, icon: '🛍️' },
      other: { total: 0, count: 0, icon: '💳' }
    },
    totalTHB: 0,
    totalGBP: 0,
    exchangeRate: DEFAULT_RATE,
    lastUpdated: new Date().toISOString()
  };
  
  // Initialize days from plan
  planData.forEach(day => {
    expenses.days[day.date] = {
      items: [],
      totalTHB: 0,
      totalGBP: 0
    };
  });
  
  saveExpenses(expenses);
  return expenses;
};

// Add expense to activity
export const addExpense = (date, expense) => {
  const expenses = getExpenses();
  const rate = expenses.exchangeRate || DEFAULT_RATE;
  
  // Create expense object
  const newExpense = {
    id: `exp_${Date.now()}`,
    amount: expense.amount,
    currency: expense.currency || 'THB',
    amountTHB: expense.currency === 'GBP' ? expense.amount * rate : expense.amount,
    amountGBP: expense.currency === 'GBP' ? expense.amount : expense.amount / rate,
    category: expense.category || 'other',
    description: expense.description || '',
    activityId: expense.activityId,
    timestamp: new Date().toISOString()
  };
  
  // Add to day
  if (!expenses.days[date]) {
    expenses.days[date] = { items: [], totalTHB: 0, totalGBP: 0 };
  }
  
  expenses.days[date].items.push(newExpense);
  expenses.days[date].totalTHB += newExpense.amountTHB;
  expenses.days[date].totalGBP += newExpense.amountGBP;
  
  // Update category totals
  const category = expenses.categories[newExpense.category];
  if (category) {
    category.total += newExpense.amountTHB;
    category.count += 1;
  }
  
  // Update grand totals
  expenses.totalTHB += newExpense.amountTHB;
  expenses.totalGBP += newExpense.amountGBP;
  expenses.lastUpdated = new Date().toISOString();
  
  saveExpenses(expenses);
  return newExpense;
};

// Quick add preset amounts
export const QUICK_AMOUNTS = [
  { label: '฿100', amount: 100, currency: 'THB' },
  { label: '฿500', amount: 500, currency: 'THB' },
  { label: '฿1000', amount: 1000, currency: 'THB' },
  { label: '£10', amount: 10, currency: 'GBP' },
  { label: '£25', amount: 25, currency: 'GBP' },
  { label: '£50', amount: 50, currency: 'GBP' }
];

// Get expenses
export const getExpenses = () => {
  try {
    const stored = localStorage.getItem(CACHE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// Save expenses
const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses:', error);
  }
};

// Update exchange rate for all expenses
export const updateExchangeRate = async () => {
  const newRate = await fetchExchangeRate();
  const expenses = getExpenses();
  
  if (!expenses) return;
  
  expenses.exchangeRate = newRate;
  
  // Recalculate all GBP amounts
  Object.keys(expenses.days).forEach(date => {
    const day = expenses.days[date];
    day.totalGBP = day.totalTHB / newRate;
    
    day.items.forEach(item => {
      if (item.currency === 'THB') {
        item.amountGBP = item.amount / newRate;
      }
    });
  });
  
  expenses.totalGBP = expenses.totalTHB / newRate;
  expenses.lastUpdated = new Date().toISOString();
  
  saveExpenses(expenses);
  return expenses;
};

// Get spending by category
export const getSpendingByCategory = () => {
  const expenses = getExpenses();
  if (!expenses) return [];
  
  return Object.entries(expenses.categories)
    .map(([key, data]) => ({
      category: key,
      ...data,
      percentOfTotal: expenses.totalTHB > 0 
        ? Math.round((data.total / expenses.totalTHB) * 100) 
        : 0
    }))
    .sort((a, b) => b.total - a.total);
};

// Get daily spending trend
export const getDailySpendingTrend = () => {
  const expenses = getExpenses();
  if (!expenses) return [];
  
  return Object.entries(expenses.days)
    .map(([date, data]) => ({
      date,
      totalTHB: data.totalTHB,
      totalGBP: data.totalGBP,
      itemCount: data.items.length
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

// Check if over budget
export const checkBudgetAlert = (dailyBudgetTHB = 5000) => {
  const expenses = getExpenses();
  if (!expenses) return null;
  
  const today = new Date().toISOString().split('T')[0];
  const todayExpenses = expenses.days[today];
  
  if (!todayExpenses) return null;
  
  const percentUsed = (todayExpenses.totalTHB / dailyBudgetTHB) * 100;
  
  if (percentUsed >= 100) {
    return {
      type: 'danger',
      message: `Over budget! Spent ฿${todayExpenses.totalTHB.toFixed(0)} today`,
      percentUsed
    };
  } else if (percentUsed >= 80) {
    return {
      type: 'warning', 
      message: `80% of daily budget used (฿${todayExpenses.totalTHB.toFixed(0)})`,
      percentUsed
    };
  }
  
  return null;
};
