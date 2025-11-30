/**
 * Calculate total expenses from transactions array
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Total expense amount
 */
export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};

/**
 * Calculate total income from transactions array
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Total income amount
 */
export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};

/**
 * Calculate current balance (income - expenses)
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Current balance
 */
export const calculateBalance = (transactions) => {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  return income - expenses;
};

/**
 * Calculate daily average spending
 * @param {Array} transactions - Array of transaction objects
 * @param {number} days - Number of days to calculate average over (default: 30)
 * @returns {number} Daily average spending
 */
export const calculateDailyAverage = (transactions, days = 30) => {
  const total = calculateTotalExpenses(transactions);
  return total / days;
};

/**
 * Calculate spending by category
 * Returns an object with category names as keys and total spending as values
 * @param {Array} transactions - Array of transaction objects
 * @param {Array} categories - Array of category objects (must have type and id)
 * @returns {Object} Object with category names as keys and spending totals as values
 */
export const calculateCategorySpending = (transactions, categories) => {
  const categorySpending = {};
  
  categories
    .filter((c) => c.type === 'expense')
    .forEach((category) => {
      const total = transactions
        .filter((t) => t.type === 'expense' && t.category_id === category.id)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      
      if (total > 0) {
        categorySpending[category.name] = total;
      }
    });
  
  return categorySpending;
};

/**
 * Get the top spending category
 * @param {Object} categorySpending - Object with category spending data
 * @returns {Array|undefined} [categoryName, amount] or undefined if no spending
 */
export const getTopCategory = (categorySpending) => {
  return Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];
};

/**
 * Calculate goal progress as a percentage
 * @param {number} currentAmount - Current amount saved/spent
 * @param {number} targetAmount - Target goal amount
 * @returns {number} Progress percentage (0-100)
 */
export const calculateGoalProgress = (currentAmount, targetAmount) => {
  if (targetAmount <= 0) return 0;
  return Math.min((currentAmount / targetAmount) * 100, 100);
};

/**
 * Calculate remaining amount to reach goal
 * @param {number} currentAmount - Current amount saved/spent
 * @param {number} targetAmount - Target goal amount
 * @returns {number} Remaining amount needed (0 if goal exceeded)
 */
export const calculateRemainingAmount = (currentAmount, targetAmount) => {
  const remaining = targetAmount - currentAmount;
  return Math.max(remaining, 0);
};

/**
 * Calculate spending for a specific time period
 * @param {Array} transactions - Array of transaction objects
 * @param {number} days - Number of days to look back (default: 7 for weekly)
 * @returns {number} Total spending in the period
 */
export const calculatePeriodSpending = (transactions, days = 7) => {
  const now = new Date();
  const periodStart = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  
  return transactions
    .filter(t => {
      if (t.type !== 'expense') return false;
      const transactionDate = new Date(t.date || t.created_at);
      return transactionDate >= periodStart;
    })
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};

/**
 * Calculate weekly spending (last 7 days)
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Total spending in the last 7 days
 */
export const calculateWeeklySpending = (transactions) => {
  return calculatePeriodSpending(transactions, 7);
};

/**
 * Calculate monthly spending (last 30 days)
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Total spending in the last 30 days
 */
export const calculateMonthlySpending = (transactions) => {
  return calculatePeriodSpending(transactions, 30);
};

/**
 * Calculate projected monthly spending based on daily average
 * @param {Array} transactions - Array of transaction objects
 * @param {number} days - Number of days used to calculate average (default: 30)
 * @returns {number} Projected spending for a full month (30 days)
 */
export const calculateProjectedMonthlySpending = (transactions, days = 30) => {
  const dailyAverage = calculateDailyAverage(transactions, days);
  return dailyAverage * 30;
};

/**
 * Calculate goal progress for savings goals based on transactions
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Progress amount (balance = income - expenses)
 */
export const calculateSavingsProgress = (transactions) => {
  return calculateBalance(transactions);
};

/**
 * Calculate goal progress for spending limit goals
 * @param {Array} transactions - Array of transaction objects
 * @param {string} categoryId - Category ID to track spending
 * @returns {number} Total spending in the category
 */
export const calculateSpendingLimitProgress = (transactions, categoryId) => {
  return transactions
    .filter(t => t.type === 'expense' && t.category_id === categoryId)
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};