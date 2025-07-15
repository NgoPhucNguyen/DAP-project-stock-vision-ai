import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function PredictionChart({ historicalData, predictedPrice }) {
  if (!historicalData || historicalData.length === 0) {
    return <p className="alert alert-warning">Không có dữ liệu lịch sử.</p>;
  }

  // Dữ liệu thực tế
  const labels = historicalData.map(point => point.date);
  const prices = historicalData.map(point => point.Close);

  // Ngày tiếp theo cho dự đoán
  const nextDate = new Date(historicalData[historicalData.length - 1].date);
  nextDate.setDate(nextDate.getDate() + 1);
  const predictedDate = nextDate.toISOString().split("T")[0];

  const data = {
    labels: [...labels, predictedDate],
    datasets: [
      {
        label: "Giá thực tế",
        data: [...prices, null],
        borderColor: "rgba(0,200,151,1)",
        tension: 0.3,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        label: "Giá dự đoán",
        data: [...Array(prices.length).fill(null), predictedPrice],
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        tension: 0.3,
        pointRadius: 4,
        borderDash: [5, 5],
        borderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { mode: "index", intersect: false }
    },
    scales: {
      x: { title: { display: true, text: "Ngày" } },
      y: { title: { display: true, text: "Giá (USD)" } }
    }
  };

  return (
    <div className="card p-3 shadow-sm" style={{ height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
}
