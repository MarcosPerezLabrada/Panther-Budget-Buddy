import { Card, CardContent } from "@/components/ui/card";
import {
  calculateWeeklySpending,
  calculateMonthlySpending,
  calculateProjectedMonthlySpending,
} from "@/utils/calculations";

export function SpendingSummary({
  transactions,
  topCategory,
  dailyAverage,
  balance,
}) {
  const weeklySpending = calculateWeeklySpending(transactions);
  const monthlySpending = calculateMonthlySpending(transactions);
  const projectedMonthly = calculateProjectedMonthlySpending(transactions);

  return (
    <div className="space-y-4">
      <Card className="border-l-4 border-l-[#B6862C]">
        <CardContent className="pt-6">
          <div className="text-sm text-gray-600 mb-1">This Week</div>
          <div className="text-3xl font-bold mb-1">${weeklySpending.toFixed(2)}</div>
          {topCategory && (
            <div className="text-sm text-gray-600">
              Top category: {topCategory[0]} (${topCategory[1].toFixed(2)})
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-[#1E3A5F]">
        <CardContent className="pt-6">
          <div className="text-sm text-gray-600 mb-1">This Month</div>
          <div className="text-3xl font-bold mb-1">${monthlySpending.toFixed(2)}</div>
          {topCategory && (
            <div className="text-sm text-gray-600">
              Top category: {topCategory[0]} (${topCategory[1].toFixed(2)})
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardContent className="pt-6">
          <div className="text-sm text-gray-600 mb-1">Average Daily Spending</div>
          <div className="text-3xl font-bold mb-1">${dailyAverage.toFixed(2)}</div>
          <div className="text-sm text-gray-600">Based on last 30 days</div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="pt-6">
          <div className="text-sm text-gray-600 mb-1">Projected Monthly Total</div>
          <div className="text-3xl font-bold mb-1">
            ${projectedMonthly.toFixed(2)}
          </div>
          <div className="text-sm text-green-600">
            {balance >= 0
              ? `Saving $${balance.toFixed(2)} 🎯`
              : `Over budget by $${Math.abs(balance).toFixed(2)}`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
