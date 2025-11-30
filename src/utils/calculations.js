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