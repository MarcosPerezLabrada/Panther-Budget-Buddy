import {
  calculateTotalExpenses,
  calculateTotalIncome,
  calculateBalance,
  calculateDailyAverage,
  calculateCategorySpending,
  getTopCategory,
} from './calculations.js';

describe('Expense Calculation Functions', () => {
  describe('calculateTotalExpenses', () => {
    test('should return 0 for empty array', () => {
      expect(calculateTotalExpenses([])).toBe(0);
    });

    test('should return correct amount for single expense', () => {
      const transactions = [{ type: 'expense', amount: '50.00' }];
      expect(calculateTotalExpenses(transactions)).toBe(50);
    });

    test('should sum multiple expenses correctly', () => {
      const transactions = [
        { type: 'expense', amount: '10.50' },
        { type: 'expense', amount: '25.00' },
        { type: 'expense', amount: '8.75' },
      ];
      expect(calculateTotalExpenses(transactions)).toBe(44.25);
    });

    test('should handle decimal values correctly', () => {
      const transactions = [
        { type: 'expense', amount: '12.50' },
        { type: 'expense', amount: '8.99' },
      ];
      expect(calculateTotalExpenses(transactions)).toBeCloseTo(21.49, 2);
    });

    test('should handle large numbers', () => {
      const transactions = [
        { type: 'expense', amount: '500.00' },
        { type: 'expense', amount: '450.75' },
      ];
      expect(calculateTotalExpenses(transactions)).toBeCloseTo(950.75, 2);
    });

    test('should ignore income transactions', () => {
      const transactions = [
        { type: 'expense', amount: '30' },
        { type: 'income', amount: '100' },
        { type: 'expense', amount: '20' },
      ];
      expect(calculateTotalExpenses(transactions)).toBe(50);
    });

    test('should parse string amounts correctly', () => {
      const transactions = [
        { type: 'expense', amount: '15.99' },
        { type: 'expense', amount: '24.01' },
      ];
      expect(calculateTotalExpenses(transactions)).toBe(40);
    });
  });

  describe('calculateDailyAverage', () => {
    test('should calculate daily average with default 30 days', () => {
      const transactions = [{ type: 'expense', amount: '300' }];
      expect(calculateDailyAverage(transactions)).toBe(10);
    });

    test('should calculate daily average with custom days parameter', () => {
      const transactions = [{ type: 'expense', amount: '700' }];
      expect(calculateDailyAverage(transactions, 7)).toBe(100);
    });

    test('should handle multiple expenses over 30 days', () => {
      const transactions = [
        { type: 'expense', amount: '10.50' },
        { type: 'expense', amount: '25.00' },
        { type: 'expense', amount: '8.75' },
      ];
      expect(calculateDailyAverage(transactions)).toBeCloseTo(1.475, 2);
    });

    test('should return 0 for empty transaction array', () => {
      expect(calculateDailyAverage([])).toBe(0);
    });

    test('should handle single day calculations', () => {
      const transactions = [{ type: 'expense', amount: '100' }];
      expect(calculateDailyAverage(transactions, 1)).toBe(100);
    });
  });
});

describe('Income and Balance Calculations', () => {
  describe('calculateTotalIncome', () => {
    test('should return 0 for empty array', () => {
      expect(calculateTotalIncome([])).toBe(0);
    });

    test('should return correct amount for single income', () => {
      const transactions = [{ type: 'income', amount: '2000.00' }];
      expect(calculateTotalIncome(transactions)).toBe(2000);
    });

    test('should sum multiple income sources correctly', () => {
      const transactions = [
        { type: 'income', amount: '1500.00' },
        { type: 'income', amount: '500.00' },
        { type: 'income', amount: '250.00' },
      ];
      expect(calculateTotalIncome(transactions)).toBe(2250);
    });

    test('should ignore expense transactions', () => {
      const transactions = [
        { type: 'income', amount: '2000' },
        { type: 'expense', amount: '500' },
        { type: 'income', amount: '1000' },
      ];
      expect(calculateTotalIncome(transactions)).toBe(3000);
    });

    test('should handle decimal income values', () => {
      const transactions = [
        { type: 'income', amount: '1500.50' },
        { type: 'income', amount: '749.99' },
      ];
      expect(calculateTotalIncome(transactions)).toBeCloseTo(2250.49, 2);
    });

    test('should handle zero income', () => {
      const transactions = [{ type: 'expense', amount: '100' }];
      expect(calculateTotalIncome(transactions)).toBe(0);
    });
  });

  describe('calculateBalance', () => {
    test('should calculate positive balance correctly', () => {
      const transactions = [
        { type: 'income', amount: '2450' },
        { type: 'expense', amount: '1890' },
      ];
      expect(calculateBalance(transactions)).toBe(560);
    });

    test('should calculate negative balance correctly', () => {
      const transactions = [
        { type: 'income', amount: '1000' },
        { type: 'expense', amount: '1500' },
      ];
      expect(calculateBalance(transactions)).toBe(-500);
    });

    test('should return 0 for balanced budget', () => {
      const transactions = [
        { type: 'income', amount: '2000' },
        { type: 'expense', amount: '2000' },
      ];
      expect(calculateBalance(transactions)).toBe(0);
    });

    test('should handle empty transaction array', () => {
      expect(calculateBalance([])).toBe(0);
    });

    test('should handle multiple income and expense sources', () => {
      const transactions = [
        { type: 'income', amount: '1500' },
        { type: 'income', amount: '1000' },
        { type: 'expense', amount: '500' },
        { type: 'expense', amount: '300' },
        { type: 'expense', amount: '200' },
      ];
      expect(calculateBalance(transactions)).toBe(1500);
    });

    test('should reflect various income/expense combinations', () => {
      const transactions = [
        { type: 'income', amount: '3000' },
        { type: 'expense', amount: '1200' },
        { type: 'expense', amount: '800' },
      ];
      expect(calculateBalance(transactions)).toBe(1000);
    });

    test('should confirm balance correctly reflects positive and negative values', () => {
      const transactionsPositive = [
        { type: 'income', amount: '1500' },
        { type: 'expense', amount: '600' },
      ];
      const transactionsNegative = [
        { type: 'income', amount: '500' },
        { type: 'expense', amount: '1000' },
      ];
      expect(calculateBalance(transactionsPositive)).toBe(900);
      expect(calculateBalance(transactionsNegative)).toBe(-500);
    });
  });
});

describe('Category Spending Calculations', () => {
  describe('calculateCategorySpending', () => {
    test('should calculate spending for single category', () => {
      const transactions = [
        { type: 'expense', category_id: 1, amount: '50' },
        { type: 'expense', category_id: 1, amount: '75' },
      ];
      const categories = [{ id: 1, name: 'Food', type: 'expense' }];
      const result = calculateCategorySpending(transactions, categories);
      expect(result).toEqual({ Food: 125 });
    });

    test('should calculate spending across multiple categories', () => {
      const transactions = [
        { type: 'expense', category_id: 1, amount: '50' },
        { type: 'expense', category_id: 2, amount: '100' },
        { type: 'expense', category_id: 1, amount: '30' },
      ];
      const categories = [
        { id: 1, name: 'Food', type: 'expense' },
        { id: 2, name: 'Bills', type: 'expense' },
      ];
      const result = calculateCategorySpending(transactions, categories);
      expect(result).toEqual({ Food: 80, Bills: 100 });
    });

    test('should exclude zero spending categories', () => {
      const transactions = [
        { type: 'expense', category_id: 1, amount: '50' },
      ];
      const categories = [
        { id: 1, name: 'Food', type: 'expense' },
        { id: 2, name: 'Entertainment', type: 'expense' },
      ];
      const result = calculateCategorySpending(transactions, categories);
      expect(result).toEqual({ Food: 50 });
      expect(result.Entertainment).toBeUndefined();
    });

    test('should handle decimal amounts', () => {
      const transactions = [
        { type: 'expense', category_id: 1, amount: '25.50' },
        { type: 'expense', category_id: 1, amount: '49.99' },
      ];
      const categories = [{ id: 1, name: 'Food', type: 'expense' }];
      const result = calculateCategorySpending(transactions, categories);
      expect(result.Food).toBeCloseTo(75.49, 2);
    });

    test('should handle empty transactions', () => {
      const categories = [
        { id: 1, name: 'Food', type: 'expense' },
        { id: 2, name: 'Bills', type: 'expense' },
      ];
      const result = calculateCategorySpending([], categories);
      expect(result).toEqual({});
    });

    test('should ignore income category types', () => {
      const transactions = [
        { type: 'expense', category_id: 2, amount: '100' },
      ];
      const categories = [
        { id: 1, name: 'Salary', type: 'income' },
        { id: 2, name: 'Bills', type: 'expense' },
      ];
      const result = calculateCategorySpending(transactions, categories);
      expect(result).toEqual({ Bills: 100 });
      expect(result.Salary).toBeUndefined();
    });
  });

  describe('getTopCategory', () => {
    test('should return the category with highest spending', () => {
      const categorySpending = { Food: 50, Bills: 100, Entertainment: 50 };
      const result = getTopCategory(categorySpending);
      expect(result).toEqual(['Bills', 100]);
    });

    test('should return highest when multiple categories have same amount', () => {
      const categorySpending = { Food: 100, Bills: 100 };
      const result = getTopCategory(categorySpending);
      expect(result[0]).toBeDefined();
      expect(result[1]).toBe(100);
    });

    test('should handle single category', () => {
      const categorySpending = { Food: 250 };
      const result = getTopCategory(categorySpending);
      expect(result).toEqual(['Food', 250]);
    });

    test('should return undefined for empty spending', () => {
      const categorySpending = {};
      const result = getTopCategory(categorySpending);
      expect(result).toBeUndefined();
    });

    test('should correctly identify largest value from multiple categories', () => {
      const categorySpending = {
        Food: 50,
        Bills: 100,
        Entertainment: 75,
        Transportation: 30,
      };
      const result = getTopCategory(categorySpending);
      expect(result).toEqual(['Bills', 100]);
    });
  });
});

describe('Real-world Scenarios', () => {
  test('Weekly spending summary - $115 total', () => {
    const transactions = [
      { type: 'expense', amount: '20' },
      { type: 'expense', amount: '15' },
      { type: 'expense', amount: '40' },
      { type: 'expense', amount: '10' },
      { type: 'expense', amount: '30' },
    ];
    expect(calculateTotalExpenses(transactions)).toBe(115);
  });

  test('Income and balance calculation - $2,450 income, $1,890 expenses = $560', () => {
    const transactions = [
      { type: 'income', amount: '2450' },
      { type: 'expense', amount: '1890' },
    ];
    expect(calculateTotalIncome(transactions)).toBe(2450);
    expect(calculateTotalExpenses(transactions)).toBe(1890);
    expect(calculateBalance(transactions)).toBe(560);
  });

  test('Category breakdown - Bills 50%, Food 25%, Entertainment 25%', () => {
    const transactions = [
      { type: 'expense', category_id: 1, amount: '50' },
      { type: 'expense', category_id: 2, amount: '100' },
      { type: 'expense', category_id: 3, amount: '50' },
    ];
    const categories = [
      { id: 1, name: 'Food', type: 'expense' },
      { id: 2, name: 'Bills', type: 'expense' },
      { id: 3, name: 'Entertainment', type: 'expense' },
    ];
    const spending = calculateCategorySpending(transactions, categories);
    const total = calculateTotalExpenses(transactions);

    expect(spending.Food).toBe(50);
    expect(spending.Bills).toBe(100);
    expect(spending.Entertainment).toBe(50);

    const foodPercentage = (spending.Food / total) * 100;
    const billsPercentage = (spending.Bills / total) * 100;
    const entertainmentPercentage = (spending.Entertainment / total) * 100;

    expect(foodPercentage).toBeCloseTo(25, 1);
    expect(billsPercentage).toBeCloseTo(50, 1);
    expect(entertainmentPercentage).toBeCloseTo(25, 1);
    expect(foodPercentage + billsPercentage + entertainmentPercentage).toBeCloseTo(100, 1);
  });

  test('Daily average spending calculation', () => {
    const transactions = [
      { type: 'expense', amount: '10.50' },
      { type: 'expense', amount: '25.00' },
      { type: 'expense', amount: '8.75' },
    ];
    const total = calculateTotalExpenses(transactions);
    const dailyAverage = calculateDailyAverage(transactions, 30);
    expect(total).toBe(44.25);
    expect(dailyAverage).toBeCloseTo(1.475, 2);
  });
});
