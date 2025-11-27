import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function SpendingChart({ transactions, categories }) {
  const categorySpending = useMemo(() => {
    const spending = {};
    categories
      .filter((c) => c.type === "expense")
      .forEach((category) => {
        const total = transactions
          .filter((t) => t.type === "expense" && t.category_id === category.id)
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);
        if (total > 0) {
          spending[category.name] = total;
        }
      });
    return spending;
  }, [transactions, categories]);

  const chartData = {
    labels: Object.keys(categorySpending),
    datasets: [
      {
        data: Object.values(categorySpending),
        backgroundColor: [
          "#FFE4B5",
          "#E6E6FA",
          "#B0E0E6",
          "#FFB6C1",
          "#98FB98",
          "#D3D3D3",
        ],
        borderWidth: 3,
        borderColor: "#fff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: { weight: "bold", size: 12 },
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">📊 Spending Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          {Object.keys(categorySpending).length > 0 ? (
            <Doughnut data={chartData} options={chartOptions} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No expense data yet. Start adding expenses to see analytics!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
