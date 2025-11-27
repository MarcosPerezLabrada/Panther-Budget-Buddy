import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js plugins once
ChartJS.register(ArcElement, Tooltip, Legend);

export const chartOptions = {
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
