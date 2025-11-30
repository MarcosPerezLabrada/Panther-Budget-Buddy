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
- **Tests:** 40 passed
- **Coverage:** All calculation functions tested

---

## Test Suite Coverage (40 Tests)

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
