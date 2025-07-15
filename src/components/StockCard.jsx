// StockCard.jsx
import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../components/StockCard.css";

const StockCard = ({ symbol, price, change, changePercent, domain }) => {
  const isPositive = change >= 0;
  const navigate = useNavigate();

  const logoUrl = domain ? `https://logo.clearbit.com/${domain}` : null;

  const handleViewPrediction = () => {
    navigate(`/predict?symbol=${symbol}`);
  };

  return (
    <div className="card stock-card shadow-sm" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title fw-bold d-flex align-items-center gap-2">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={`${symbol} logo`}
              className="stock-logo"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          {symbol}
        </h5>

        {price !== undefined ? (
          <div className="mt-3 d-flex align-items-center">
            <h4 className="me-2 text-dark">${price.toFixed(2)}</h4>
            <span
              className={`d-flex align-items-center text-${isPositive ? "success" : "danger"} fw-semibold`}
            >
              {isPositive ? (
                <ArrowUpRight size={20} className="me-1" />
              ) : (
                <ArrowDownRight size={20} className="me-1" />
              )}
              {Math.abs(changePercent).toFixed(2)}%
            </span>
          </div>
        ) : (
          <p className="text-muted">Đang tải giá...</p>
        )}
        <button onClick={handleViewPrediction} className="btn btn-outline-primary btn-sm">
          Xem dự đoán
        </button>
      </div>
    </div>
  );
};

export default StockCard;
