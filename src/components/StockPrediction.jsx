import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./StockPrediction.css";
import PredictionChart from "./PredictionChart";
import SymbolDropdown from "./SymbolDropdown.jsx";

const AVAILABLE_SYMBOLS = [
  "AAPL", "TSLA", "GOOGL", "MSFT",
  "AMZN", "META", "NFLX", "NVDA"
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function StockPrediction() {
  const location = useLocation();
  const [symbol, setSymbol] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy symbol từ URL (nếu có)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSymbol = params.get("symbol");

    if (urlSymbol && AVAILABLE_SYMBOLS.includes(urlSymbol)) {
      setSymbol(urlSymbol);
    } else {
      setSymbol(AVAILABLE_SYMBOLS[0]);
    }
  }, [location.search]);

  // Gọi dự đoán khi symbol thay đổi
  useEffect(() => {
    if (symbol) handlePredict();
  }, [symbol]);

  // Gọi API lấy dữ liệu và dự đoán
  const handlePredict = async () => {
    if (!symbol) return;
    setLoading(true);
    setPrediction(null);
    setHistoricalData([]);

    try {
      const resHistory = await fetch(`${API_BASE_URL}/get-chart-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbols: [symbol],
          period: "1mo",
          price_fields: ["Close"],
        }),
      });
      const historyData = await resHistory.json();
      setHistoricalData(historyData[symbol]);

      const resPredict = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol }),
      });
      const predictData = await resPredict.json();
      setPrediction(predictData);
    } catch (err) {
      alert("❌ Lỗi khi gọi API dự đoán.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stock-predict-card mt-5">
      <div className="predict-input-group">
        <SymbolDropdown
  value={symbol}
  onChange={setSymbol}
  symbols={["AAPL", "TSLA", "GOOGL", "MSFT", "AMZN", "META", "NFLX", "NVDA"]}
/>


        <button
          className="btn btn-predict"
          onClick={handlePredict}
          disabled={loading}
        >
          {loading ? "Đang dự đoán..." : "Dự đoán"}
        </button>
      </div>

      {loading && (
        <div className="text-center mb-3">
          <span className="predict-loader"></span>
        </div>
      )}

      {prediction && (
        <div className="result-box mt-3">
          <strong>Giá hiện tại:</strong> ${prediction.current_price} <br />
          <strong>Dự đoán:</strong> ${prediction.predicted_price} <br />
          <strong>Chênh lệch:</strong>{" "}
          {(prediction.predicted_price - prediction.current_price).toFixed(2)} USD
        </div>
      )}

      {historicalData.length > 0 && prediction && (
        <div className="the-chart mt-4">
          <PredictionChart
            historicalData={historicalData}
            predictedPrice={prediction.predicted_price}
          />
        </div>
      )}
    </div>
  );
}
