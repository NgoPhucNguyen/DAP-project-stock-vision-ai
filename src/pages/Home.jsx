// Home.jsx
import React, { useEffect, useState } from "react";
import NewsTabs from "../components/NewsTab";
import StockCard from "../components/StockCard";
import SectionCard from "../components/SectionCard";
import { fetchNews } from "../services/newsService";
import { fetchStockPrices } from "../services/stockService";
import "./Home.css";

// 🧠 Danh sách mã và domain
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

const CACHE_KEY_PREFIX = "newsData_";

const Home = () => {
  const [stockData, setStockData] = useState({});
  const [newsData, setNewsData] = useState({});
  const [symbols, setSymbols] = useState(stockList.map(s => s.symbol));
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    symbols.forEach(symbol => {
      const cacheKey = `${CACHE_KEY_PREFIX}${symbol}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.date === today) {
          setNewsData(prev => ({ ...prev, [symbol]: parsed.data }));
          return;
        }
      }

      loadNewsForSymbol(symbol);
    });

    loadPrices(symbols);
  }, []);

  const loadNewsForSymbol = async (symbol) => {
    try {
      const data = await fetchNews([symbol]);
      setNewsData(prev => ({ ...prev, [symbol]: data }));
      localStorage.setItem(`${CACHE_KEY_PREFIX}${symbol}`, JSON.stringify({ data, date: today }));
    } catch (err) {
      console.error(`Lỗi khi lấy tin tức cho ${symbol}:`, err);
    }
  };

  const loadPrices = async (symbols) => {
    try {
      const data = await fetchStockPrices(symbols);
      setStockData(data);
    } catch (err) {
      console.error("Lỗi khi lấy giá cổ phiếu:", err);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="display-5 fw-bold">Chào mừng bạn đến với Stock Vision AI</h1>
        <p className="lead mt-3">
          Nền tảng giúp bạn dự đoán xu hướng cổ phiếu, cập nhật tin tức tài chính theo thời gian thực.
        </p>
        <a href="/predict" className="btn btn-primary btn-lg mt-4">
          Dự đoán ngay
        </a>
      </section>

      {/* Tin tức */}
      <SectionCard className="news-section mt-5 p-4 shadow-sm rounded">
        <h2 className="text-center mb-4">Tin Tức Cổ Phiếu</h2>
        {Object.keys(newsData).length > 0 ? (
          <NewsTabs newsData={newsData} />
        ) : (
          <p className="fw-bold text-center">Đang tải tin tức...</p>
        )}
      </SectionCard>

      {/* Phân tích nhanh */}
      <SectionCard className="analysis-section mt-5 p-4 shadow-sm rounded">
        <h2 className="text-center">Phân Tích Nhanh Giá Đóng (Close) Gần Nhất</h2>
        <div className="card-container d-flex flex-wrap gap-4 justify-content-center">
          {symbols.map((symbol) => {
            const stock = stockData[symbol] || {};
            const domain = stockList.find(s => s.symbol === symbol)?.domain || "";
            return (
              <StockCard
                key={symbol}
                symbol={symbol}
                domain={domain}
                price={stock.price}
                change={stock.change}
                changePercent={stock.percent}
              />
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
};

export default Home;
