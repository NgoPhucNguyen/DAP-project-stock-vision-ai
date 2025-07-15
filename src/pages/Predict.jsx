//Predict.jsx

import React from "react";
import StockPrediction from "../components/StockPrediction";
import '../pages/Predict.css'
const Predict = () => {
  return (
    <div className="predict-container mt-5 align-center">
      <h2 className="predict-title text-center mb-4">🔮 Dự Đoán Cổ Phiếu 🔮</h2>
      <p className="predict-subtitle text-center">
        Chọn mã cổ phiếu để hệ thống đưa ra dự đoán
      </p>
      <div className="mt-4">
        <StockPrediction />
      </div>
    </div>
  );
};

export default Predict;
