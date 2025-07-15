import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,  // 👈 Filler là quan trọng cho area
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler  // 👈 Bắt buộc để fill area hoạt động
);

const COLORS = [
  "rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 206, 86)",
  "rgb(75, 192, 192)", "rgb(153, 102, 255)", "rgb(255, 159, 64)",
  "rgb(0, 204, 102)", "rgb(204, 0, 204)", "rgb(0, 102, 204)",
  "rgb(255, 102, 0)", "rgb(0, 153, 255)", "rgb(204, 255, 0)", "rgb(102, 0, 255)"
];

export default function StockChart({ chartData, chartType }) {
  if (!chartData || Object.keys(chartData).length === 0) {
    return <p className="alert alert-warning">Chưa có dữ liệu hiển thị.</p>;
  }

  const labels = chartData[Object.keys(chartData)[0]].map((point) => point.date);
  const datasets = [];

  Object.entries(chartData).forEach(([symbol, data], stockIndex) => {
    const fields = Object.keys(data[0]).filter((k) => k !== "date");

    fields.forEach((field, fieldIndex) => {
      const rawColor = COLORS[(stockIndex * 3 + fieldIndex) % COLORS.length];
      const [r, g, b] = rawColor.match(/\d+/g);
      const rgba = `rgba(${r}, ${g}, ${b}, 0.25)`; // mềm mại hơn

      datasets.push({
        label: `${symbol} - ${field}`,
        data: data.map((point) => point[field]),
        borderColor: rawColor,
        backgroundColor: chartType === "area" ? rgba : rawColor,
        tension: chartType === "line" || chartType === "area" ? 0.3 : 0,
        fill: chartType === "area" ? true : false,
        pointRadius: 2,
        borderWidth: 2,
      });
    });
  });

  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: { display: true, text: `Biểu đồ ${chartType.toUpperCase()}` },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <Line data={data} options={options} />;
      case "bar":
        return <Bar data={data} options={options} />;
      case "area":
        return <Line data={data} options={options} />;
      default:
        return (
          <div className="alert alert-secondary text-center">
            Biểu đồ <strong>{chartType}</strong> chưa hỗ trợ.
          </div>
        );
    }
  };

  return (
    <div className="card p-3 shadow-sm" style={{ height: "100%", minHeight: 400 }}>
      {renderChart()}
    </div>
  );
}
