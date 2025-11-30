# Unit Testing Setup

## Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## Test Results Summary
- **Test Suites:** 1 passed
- **Tests:** 64 passed
- **Coverage:** All calculation functions tested

---

## Test Suite Coverage (64 Tests)

### Expense Calculation Functions (12 tests)
 `calculateTotalExpenses()`
- Empty array returns 0
- Single expense returns correct amount
- Multiple expenses sum correctly
- Decimal values preserved
- Large numbers handled
- Income transactions ignored
- String amounts parsed correctly

`calculateDailyAverage()`
- Default 30-day calculation
- Custom days parameter
- Multiple expenses over period
- Empty array returns 0
- Single day calculation

### Income and Balance Calculations (13 tests)
`calculateTotalIncome()`
- Empty array returns 0
- Single income returns correct amount
- Multiple sources sum correctly
- Expense transactions ignored
- Decimal income values handled
- Zero income case

`calculateBalance()`
- Positive balance calculation ($2,450 - $1,890 = $560) ✓
- Negative balance calculation
- Zero balance (break-even)
- Empty transaction array
- Multiple income/expense sources
- Various combinations
- Positive and negative value reflection

### Category Spending Calculations (11 tests)
`calculateCategorySpending()`
- Single category spending
- Multiple categories
- Exclude zero spending categories
- Decimal amounts
- Empty transactions
- Ignore income category types

`getTopCategory()`
- Return highest spending category
- Handle tied amounts
- Single category
- Empty spending object
- Identify largest from multiple categories

### Goal Progress Calculations (24 tests)
`calculateGoalProgress()`
- Zero current amount returns 0%
- 50% progress calculation
- 71% progress calculation
- 100% when goal is met
- Cap at 100% when goal exceeded
- Decimal values handled
- Zero target amount returns 0

`calculateRemainingAmount()`
- Calculate remaining amount correctly
- Return 0 when goal is met
- Return 0 when goal is exceeded
- Handle decimal values
- Return full target when current is zero

`calculateSavingsProgress()`
- Calculate balance (income - expenses) as savings progress
- Subtract expenses from income
- Return negative balance when expenses exceed income
- Return 0 for no transactions
- Calculate positive savings correctly

`calculateSpendingLimitProgress()`
- Calculate spending for a specific category
- Return 0 for category with no spending
- Ignore income transactions
- Handle decimal amounts

`calculateProjectedMonthlySpending()`
- Project monthly spending from daily average
- Handle multiple expenses
- Handle custom period calculation

### Real-world Scenarios (4 tests)
Weekly spending summary ($115 total)
Income & balance ($2,450 - $1,890 = $560)
Category breakdown (Bills 50%, Food 25%, Entertainment 25%)
Daily average spending calculation

---

## Test Examples

### Expense Calculation
```javascript
Input: [
  { type: 'expense', amount: '10.50' },
  { type: 'expense', amount: '25.00' },
  { type: 'expense', amount: '8.75' }
]
Expected: $44.25
Result: ✅ PASS
```

### Balance Calculation
```javascript
Input: Income = $2,450, Expenses = $1,890
Expected: $560 balance
Result: ✅ PASS
```

### Category Breakdown
```javascript
Input:
  Food: $50
  Bills: $100
  Entertainment: $50
Expected:
  Bills = 50%
  Food = 25%
  Entertainment = 25%
  Sum = 100%
Result: ✅ PASS
```

### Savings Progress (Updated)
```javascript
Input: [
  { type: 'income', amount: '2000' },
  { type: 'expense', amount: '500' },
  { type: 'expense', amount: '300' }
]
Expected: $1,200 balance (income - expenses)
Result: ✅ PASS
```

### Spending Limit Progress
```javascript
Input: [
  { type: 'expense', category_id: 1, amount: '50' },
  { type: 'expense', category_id: 1, amount: '75' },
  { type: 'expense', category_id: 2, amount: '100' }
]
Category ID: 1
Expected: $125 spent in category
Result: ✅ PASS
```
