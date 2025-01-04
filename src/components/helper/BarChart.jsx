'use client';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4"],
    datasets: [
      {
        label: "Active shipments",
        data: [25, 30, 22, 20],
        backgroundColor: "#467DB2",
        borderRadius:10,
        barThickness:14,
      },
      {
        label: "Completed shipments",
        data: [20, 18, 17, 16],
        backgroundColor: "#5EAB65",
        borderRadius:10,
        barThickness:14,
      },
      {
        label: "Delayed shipments",
        data: [5, 7, 3, 4],
        backgroundColor: "#F14C4C",
        borderRadius:10,
        barThickness:14,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Shipments overview" },
      datalabels: {
        display: false, // Disable datalabels for this chart
      },
    },
  };

  return <Bar data={data} options={options} />;
}
