// Expense and Currency Service
// Tracks spending and handles home/local currency conversion dynamically

import { getFxRate } from './currency';

const DEFAULT_CONFIG = {
  localCurrency: 'THB',
  homeCurrency: 'GBP',
  storageKey: 'trip_expense_data_TH',
  rateCacheKey: 'exchange_rate_cache_GBP_THB',
  defaultRate: 43.5
};

let expenseConfig = { ...DEFAULT_CONFIG };

export const configureExpenseService = (config = {}) => {
  const localCurrency = config.localCurrency || expenseConfig.localCurrency;
  const homeCurrency = config.homeCurrency || expenseConfig.homeCurrency;

  expenseConfig = {
    ...expenseConfig,
    ...config,
    localCurrency,
    homeCurrency,
    storageKey: config.storageKey || `trip_expense_data_${localCurrency}`,
    rateCacheKey:
      config.rateCacheKey || `exchange_rate_cache_${homeCurrency}_${localCurrency}`,
    defaultRate: config.defaultRate || expenseConfig.defaultRate
  };
};

const getStorageKey = () => expenseConfig.storageKey;
const getRateCacheKey = () => expenseConfig.rateCacheKey;
const getDefaultRate = () => expenseConfig.defaultRate || 1;

const createLedger = () => ({
  days: {},
  categories: {
    food: { total: 0, count: 0, icon: '🍜' },
    activities: { total: 0, count: 0, icon: '🎢' },
    transport: { total: 0, count: 0, icon: '🚕' },
    shopping: { total: 0, count: 0, icon: '🛍️' },
    other: { total: 0, count: 0, icon: '💳' }
  },
  totalLocal: 0,
  totalHome: 0,
  exchangeRate: getDefaultRate(),
  currencies: {
    local: expenseConfig.localCurrency,
    home: expenseConfig.homeCurrency
  },
  lastUpdated: new Date().toISOString()
});

const getCachedRate = () => {
  try {
    const cached = localStorage.getItem(getRateCacheKey());
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

export const fetchExchangeRate = async () => {
  const cached = getCachedRate();
  if (cached && cached.timestamp > Date.now() - 12 * 60 * 60 * 1000) {
    return cached.rate;
  }

  try {
    const fx = await getFxRate(expenseConfig.homeCurrency, expenseConfig.localCurrency);
    const rate = fx.rate || getDefaultRate();
    localStorage.setItem(
      getRateCacheKey(),
      JSON.stringify({ rate, timestamp: Date.now(), asOf: fx.asOf })
    );
    return rate;
  } catch (error) {
    console.error('Exchange rate fetch error:', error);
    return cached?.rate || getDefaultRate();
  }
};

const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(getStorageKey(), JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses:', error);
  }
};

export const getExpenses = () => {
  try {
    const stored = localStorage.getItem(getStorageKey());
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to parse expenses', error);
  }
  const ledger = createLedger();
  saveExpenses(ledger);
  return ledger;
};

export const addExpense = (date, expense) => {
  const expenses = getExpenses();
  const rate = expenses.exchangeRate || getDefaultRate();
  const isHomeCurrency = expense.currency === expenseConfig.homeCurrency;

  const amountLocal = isHomeCurrency ? expense.amount * rate : expense.amount;
  const amountHome = isHomeCurrency ? expense.amount : expense.amount / rate;

  const newExpense = {
    id: `exp_${Date.now()}`,
    amount: expense.amount,
    currency: expense.currency || expenseConfig.localCurrency,
    amountLocal,
    amountHome,
    category: expense.category || 'other',
    description: expense.description || '',
    activityId: expense.activityId,
    timestamp: new Date().toISOString()
  };

  if (!expenses.days[date]) {
    expenses.days[date] = { items: [], totalLocal: 0, totalHome: 0 };
  }

  expenses.days[date].items.push(newExpense);
  expenses.days[date].totalLocal += amountLocal;
  expenses.days[date].totalHome += amountHome;

  const category = expenses.categories[newExpense.category];
  if (category) {
    category.total += amountLocal;
    category.count += 1;
  }

  expenses.totalLocal += amountLocal;
  expenses.totalHome += amountHome;
  expenses.lastUpdated = new Date().toISOString();

  saveExpenses(expenses);
  return newExpense;
};

export const initializeExpenses = (planData = []) => {
  const expenses = getExpenses();
  planData.forEach(day => {
    if (!expenses.days[day.date]) {
      expenses.days[day.date] = { items: [], totalLocal: 0, totalHome: 0 };
    }
  });
  saveExpenses(expenses);
  return expenses;
};

export const updateExchangeRate = async () => {
  const newRate = await fetchExchangeRate();
  const expenses = getExpenses();
  if (!expenses) return;

  expenses.exchangeRate = newRate;

  Object.values(expenses.days).forEach(day => {
    day.totalHome = 0;
    day.items.forEach(item => {
      if (item.currency === expenseConfig.localCurrency) {
        item.amountHome = item.amount / newRate;
        item.amountLocal = item.amount;
      } else {
        item.amountLocal = item.amount * newRate;
        item.amountHome = item.amount;
      }
      day.totalHome += item.amountHome;
    });
    day.totalLocal = day.items.reduce((sum, item) => sum + item.amountLocal, 0);
  });

  expenses.totalLocal = Object.values(expenses.days).reduce(
    (sum, day) => sum + day.totalLocal,
    0
  );
  expenses.totalHome = expenses.totalLocal / newRate;
  expenses.lastUpdated = new Date().toISOString();

  saveExpenses(expenses);
  return expenses;
};

export const checkBudgetAlert = (dailyBudgetLocal = 5000) => {
  const expenses = getExpenses();
  if (!expenses) return null;

  const today = new Date().toISOString().split('T')[0];
  const todayExpenses = expenses.days[today];
  if (!todayExpenses) return null;

  const percentUsed = (todayExpenses.totalLocal / dailyBudgetLocal) * 100;

  if (percentUsed >= 100) {
    return {
      type: 'danger',
      message: `Over budget! Spent ${expenses.currencies.local} ${todayExpenses.totalLocal.toFixed(0)} today`,
      percentUsed
    };
  }

  if (percentUsed >= 80) {
    return {
      type: 'warning',
      message: `80% of daily budget used (${expenses.currencies.local} ${todayExpenses.totalLocal.toFixed(0)})`,
      percentUsed
    };
  }

  return null;
};

export const getSpendingByCategory = () => {
  const expenses = getExpenses();
  if (!expenses) return [];

  return Object.entries(expenses.categories)
    .map(([key, data]) => ({
      category: key,
      icon: data.icon,
      totalLocal: data.total,
      count: data.count,
      percentOfTotal: expenses.totalLocal > 0 ? Math.round((data.total / expenses.totalLocal) * 100) : 0
    }))
    .sort((a, b) => b.totalLocal - a.totalLocal);
};

export const getDailySpendingTrend = () => {
  const expenses = getExpenses();
  if (!expenses) return [];

  return Object.entries(expenses.days)
    .map(([date, data]) => ({
      date,
      totalLocal: data.totalLocal,
      totalHome: data.totalHome,
      itemCount: data.items.length
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
};
