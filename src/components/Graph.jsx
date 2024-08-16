import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Graph = ({ x, y }) => {
  const data = {
    labels: x, // x-axis values
    datasets: [
      {
        label: "Financial Data",
        data: y, // y-axis values
        borderColor: "#3a80e9", // Line color
        borderWidth: 2, // Line thickness
        fill: true, // Enable area fill under the line
        tension: 0.25, // Smoothness of the curve
        backgroundColor: "rgba(58,128,233,0.1)", // Color for the area with correct rgba format
        pointRadius: 0, // No points on the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          color: "#fff", // Correct color code
        },
        ticks: {
          color: "#fff", // Correct color code
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
          color: "#fff", // Correct color code
        },
        ticks: {
          color: "#fff", // Correct color code
        },
      },
    },
  };

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Financial Overview</h2>
      <div className="h-64 bg-gray-600 flex items-center justify-center">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Graph;
