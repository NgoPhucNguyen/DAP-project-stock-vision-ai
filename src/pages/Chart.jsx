import React, { useState, useEffect } from "react";
import StockFilterDropdown from "../components/StockFilterDropdown";
import StockChart from "../components/StockChart";
import "./Chart.css";

const DEFAULT_CHART_TYPES = ["line", "bar", "area", "candlestick"];

const Chart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(false);
  const [expandedChartType, setExpandedChartType] = useState(null);

  useEffect(() => {
    handleFilterSubmit({
      symbols: ["AAPL"],
      period: "1mo",
      price_fields: ["Open", "High", "Low"],
    });
  }, []);

  const handleFilterSubmit = async ({ symbols, period, price_fields }) => {
    setLoading(true);
    setExpandedChartType(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/get-chart-data`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symbols, period, price_fields }),
        }
      );

      const data = await response.json();
      setChartData(data);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu biểu đồ:", err);
      alert("Không thể tải dữ liệu biểu đồ.");
    } finally {
      setLoading(false);
    }
  };

  const handleChartClick = (type) => {
    setExpandedChartType(type);
  };

  const handleBack = () => {
    setExpandedChartType(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Biểu Đồ Phân Tích Cổ Phiếu</h2>

      <div className="mb-4">
        <StockFilterDropdown onFilterSubmit={handleFilterSubmit} />
      </div>

      {/* Phần Loading */}
      {loading && (
      <div className="fullscreen-loader-wrapper">
        <span className="chart-loader"></span>
      </div>
      )}

      {!loading && Object.keys(chartData).length > 0 && (
        <>
          {expandedChartType ? (
            <div className="mb-4">
              <button
                className="btn btn-outline-secondary zoom-back-btn"
                onClick={handleBack}
              >
                ✕ Thoát phóng to
              </button>

              <div className="chart-container">
                <h3 className="chart-title">
                  Biểu đồ {expandedChartType.toUpperCase()} (Phóng to)
                </h3>
                <StockChart
                  chartData={chartData}
                  chartType={expandedChartType}
                  isZoomed
                />
              </div>
            </div>
          ) : (
            <div className="row chart-grid-row">
              {DEFAULT_CHART_TYPES.map((type, index) => (
                <div
                  className="col-lg-6 col-12 mb-4"
                  key={index}
                  onClick={() => handleChartClick(type)}
                  style={{ cursor: "zoom-in" }}
                >
                  <div className="chart-container">
                    <h4 className="chart-title">{type.toUpperCase()}</h4>
                    <StockChart chartData={chartData} chartType={type} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Chart;
