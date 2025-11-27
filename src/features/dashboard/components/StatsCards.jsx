import { Card, CardContent } from "@/components/ui/card";

export function StatsCards({ balance, totalExpenses, totalIncome, dailyAverage }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-[#B6862C] to-[#8B6914] text-white border-0">
        <CardContent className="pt-6">
          <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
          <div className="text-sm opacity-90">Total Balance</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-[#B6862C] to-[#8B6914] text-white border-0">
        <CardContent className="pt-6">
          <div className="text-3xl font-bold">${totalExpenses.toFixed(2)}</div>
          <div className="text-sm opacity-90">Monthly Expenses</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-[#B6862C] to-[#8B6914] text-white border-0">
        <CardContent className="pt-6">
          <div className="text-3xl font-bold">${totalIncome.toFixed(2)}</div>
          <div className="text-sm opacity-90">Total Income</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-[#B6862C] to-[#8B6914] text-white border-0">
        <CardContent className="pt-6">
          <div className="text-3xl font-bold">${(totalIncome - totalExpenses).toFixed(2)}</div>
          <div className="text-sm opacity-90">Monthly Savings</div>
        </CardContent>
      </Card>
    </div>
  );
}
