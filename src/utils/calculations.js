// Calculate total expenses
export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};

// Calculate total income
export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};

// Calculate balance
export const calculateBalance = (transactions) => {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  return income - expenses;
};

// Calculate daily average
export const calculateDailyAverage = (transactions, days = 30) => {
  const total = calculateTotalExpenses(transactions);
  return total / days;
};

// Calculate goal progress percentage
export const calculateGoalProgress = (current, target) => {
  if (target === 0) return 0;
  return Math.round((current / target) * 100);
};

// Calculate category total
export const calculateCategoryTotal = (transactions, categoryId) => {
  return transactions
    .filter(t => t.category_id === categoryId)
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};

// Calculate category percentage
export const calculateCategoryPercentage = (categoryTotal, totalExpenses) => {
  if (totalExpenses === 0) return 0;
  return ((categoryTotal / totalExpenses) * 100).toFixed(1);
};

// Validate expense amount
export const validateExpenseAmount = (amount) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};

// Validate category
export const validateCategory = (category) => {
  return category && category.trim() !== '';
};

// Validate description
export const validateDescription = (description) => {
  return description && description.trim() !== '';
};