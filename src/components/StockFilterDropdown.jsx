import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StockFilterDropdown.css";

const stockList = [
  { symbol: "AAPL", name: "Apple Inc.", domain: "apple.com" },
  { symbol: "TSLA", name: "Tesla Inc.", domain: "tesla.com" },
  { symbol: "GOOGL", name: "Alphabet Inc.", domain: "abc.xyz" },
  { symbol: "MSFT", name: "Microsoft Corp.", domain: "microsoft.com" },
  { symbol: "AMZN", name: "Amazon.com Inc.", domain: "amazon.com" },
  { symbol: "META", name: "Meta Platforms", domain: "about.facebook.com" },
  { symbol: "NFLX", name: "Netflix Inc.", domain: "netflix.com" },
  { symbol: "NVDA", name: "NVIDIA Corp.", domain: "nvidia.com" },
];

const timePresets = [
  { label: "7 ngày gần nhất", value: "7d" },
  { label: "1 tháng gần nhất", value: "1mo" },
  { label: "3 tháng gần nhất", value: "3mo" },
  { label: "6 tháng gần nhất", value: "6mo" },
  { label: "1 năm gần nhất", value: "1y" },
];

const priceOptions = [
  { label: "Giá mở cửa (Open)", value: "Open" },
  { label: "Giá cao nhất (High)", value: "High" },
  { label: "Giá thấp nhất (Low)", value: "Low" },
  { label: "Giá đóng cửa (Close)", value: "Close" },
];

export default function StockFilterDropdown({ onFilterSubmit }) {
  const [selectedStocks, setSelectedStocks] = useState(["AAPL"]);
  const [selectedPeriod, setSelectedPeriod] = useState("1mo");
  const [selectedPrices, setSelectedPrices] = useState(["Open", "High", "Low"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleItem = (item, setItems, max) => {
    setItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : prev.length < max
        ? [...prev, item]
        : prev
    );
  };

  const handleSubmit = () => {
    if (!selectedStocks.length || !selectedPrices.length) {
      alert("Vui lòng chọn ít nhất 1 mã cổ phiếu và 1 loại giá.");
      return;
    }

    onFilterSubmit({
      symbols: selectedStocks,
      period: selectedPeriod,
      price_fields: selectedPrices,
    });

    setDropdownOpen(false);
  };

  const handleReset = () => {
    setSelectedStocks([]);
    setSelectedPeriod("1mo");
    setSelectedPrices([]);
  };

  return (
    <div className="container text-center mt-4">
      <button className="btn btn-filter" onClick={() => setDropdownOpen(!dropdownOpen)}>
        Bộ Lọc Cổ Phiếu
      </button>

      {dropdownOpen && (
        <div className="bg-white border rounded shadow p-4 mt-3 mx-auto" style={{ maxWidth: 960 }}>
          <div className="row">
            {/* Mã cổ phiếu */}
            <div className="col-md-6 mb-4">
              <h6 className="text-uppercase">Chọn mã cổ phiếu (tối đa 3)</h6>
              {stockList.map(({ symbol, name, domain }) => (
                <div className="form-check text-start" key={symbol}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`stock-${symbol}`}
                    checked={selectedStocks.includes(symbol)}
                    onChange={() => toggleItem(symbol, setSelectedStocks, 3)}
                    disabled={!selectedStocks.includes(symbol) && selectedStocks.length >= 3}
                  />
                  <label className="form-check-label d-flex align-items-center gap-2" htmlFor={`stock-${symbol}`}>
                    <img
                      src={`https://logo.clearbit.com/${domain}`}
                      alt={`${symbol} logo`}
                      style={{ width: 20, height: 20, objectFit: "contain" }}
                      onError={(e) => (e.target.src = "/default-logo.png")}
                    />
                    <strong>{symbol}</strong> — {name}
                  </label>
                </div>
              ))}
            </div>

            {/* Thời gian + Loại giá */}
            <div className="col-md-6">
              <h6 className="text-uppercase">Chọn thời gian</h6>
              <select
                className="form-select mb-3"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                {timePresets.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>

              <h6 className="text-uppercase">Loại giá (tối đa 3)</h6>
              <div className="row">
                {priceOptions.map(({ label, value }) => (
                  <div className="col-6" key={value}>
                    <div className="form-check text-start">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`price-${value}`}
                        checked={selectedPrices.includes(value)}
                        onChange={() => toggleItem(value, setSelectedPrices, 3)}
                        disabled={!selectedPrices.includes(value) && selectedPrices.length >= 3}
                      />
                      <label className="form-check-label" htmlFor={`price-${value}`}>
                        {label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 d-flex justify-content-between">
                <button onClick={handleReset} className="btn btn-dark w-45">⟲ Đặt Lại</button>
                <button onClick={handleSubmit} className="btn btn-success w-45">📈 Tạo Biểu Đồ</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
