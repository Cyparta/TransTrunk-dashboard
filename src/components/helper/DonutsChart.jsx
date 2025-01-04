'use client';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from "chart.js";
  import ChartDataLabels from "chartjs-plugin-datalabels";
  import { Doughnut } from "react-chartjs-2";
  
  // Register the necessary components
  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
  
  export default function DonutChartWithPercentage() {
    const data = {
      labels: [
        "Available drivers",
        "Unavailable drivers",
        "Available vehicles",
        "Unavailable vehicles",
      ],
      datasets: [
        {
          data: [40, 15, 35, 10],
          backgroundColor: [
            "#467DB2", // Blue
            "#F14C4C", // Red
            "#5EAB65", // Green
            "#C2BA72", // Yellow
          ],
          hoverOffset: 4,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Availability status",
        },
        datalabels: {
          formatter: (value, context) => {
            const total = context.chart.data.datasets[0].data.reduce(
              (acc, val) => acc + val,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1) + "%";
            return percentage;
          },
          color: "#fff", // Label text color
          font: {
            size: 10,
            
          },
        },
      },
    };
  
    return <Doughnut data={data} options={options} />;
  }
  