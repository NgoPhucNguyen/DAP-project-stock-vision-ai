import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

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

const companyDescriptionMap = {
  AAPL: "Apple là tập đoàn công nghệ hàng đầu với iPhone, Macbook và hệ sinh thái riêng.",
  TSLA: "Tesla chuyên về xe điện, năng lượng sạch và do Elon Musk sáng lập.",
  GOOGL: "Alphabet là công ty mẹ của Google, sở hữu Android, YouTube, Gemini AI,...",
  MSFT: "Microsoft nổi tiếng với Windows, Office, Azure và hợp tác với OpenAI.",
  AMZN: "Amazon là nền tảng TMĐT và điện toán đám mây lớn nhất thế giới.",
  META: "Meta sở hữu Facebook, Instagram, và tập trung vào Metaverse/VR.",
  NFLX: "Netflix là nền tảng phim/series streaming dẫn đầu toàn cầu.",
  NVDA: "NVIDIA là nhà sản xuất chip GPU hàng đầu, nền tảng quan trọng cho AI.",
};


export default function About() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h1 className="about-hero-section">Chào bạn, nếu bạn mới đến trang web của chúng tôi lần đầu</h1>
      <p>Hãy để chúng tôi hướng dẫn bạn sử dụng những công cụ này nhé !</p>


      <button className="about-btn" onClick={() => navigate("/home")}>
        Tôi đã biết rồi (Quay về trang chủ)
      </button>

      <div className="row my-5">
        <div className="each-part">
          <h5> </h5>
        </div>
        <div className="card shadow-sm border-0 mb-5">
          <div className="card-body">
            <h3 className="card-title">
              <i className="bi bi-currency-dollar me-2"></i>Cổ phiếu là gì?
            </h3>
            <p className="card-text">
              Cổ phiếu là một loại chứng khoán thể hiện quyền sở hữu của bạn đối với một công ty cổ phần. Khi bạn sở hữu cổ phiếu, bạn đang sở hữu một phần nhỏ của doanh nghiệp đó.
            </p>
            <p className="card-text">
              Bạn có thể kiếm lời từ cổ phiếu thông qua <strong>chênh lệch giá</strong> hoặc <strong>cổ tức</strong>. Cổ phiếu được niêm yết và giao dịch trên các sàn chứng khoán như NASDAQ, NYSE,...
            </p>
          </div>
        </div>
        <div className="part-visualization">
          <h5>📊 Biểu đồ</h5>
          <p> Khi mở trang biểu đồ, chúng tôi đã đưa sẵn mã cổ phiếu AAPL (Apple), 3 loại giá : Mở, Cao, Thấp và khoảng thời gian là 1 tháng gần nhất </p>
          <p> Nếu bạn muốn thay đổi theo ý mình, bạn hãy bấm vào bộ lọc cổ phiếu</p>
          <p> Bạn có thể chọn tối đa 3 mã cổ phiếu, tối đa 3 loại giá, và 1 khoảng thời gian nhất định</p>
          <p> Chúng tôi không muốn bạn chọn quá nhiều dẫn đến biểu đồ quá đầy và khó nhìn</p>
        </div>
        <div className="part-predict">
          <h5>🤖 Dự Đoán</h5>
          <p>Khi mở trang dự đoán, chúng tôi đã đưa sẵn mã cổ phiếu AAPL (Apple) để dự đoán và biểu đồ dự đoán</p>
          <p>Bạn có thể bấm vào mã để có thể tìm thấy những mã cổ phiếu khác, cụ thể là 8 loại chúng tôi đưa ra</p>
          <p>Sau khi chọn bạn sẽ thấy kết quả dự đoán và biểu đồ dự đoán</p>
        </div>
        <div className="part-news">
          <h5>📰 Tin Tức</h5>
          <p>Khi mở trang chủ, chúng tôi để sẵn 5 bài báo gần nhất của cả 8 mã cổ phiếu mà chúng tôi có</p>
          <p>Nếu bạn muốn tìm hiểu về mã nào thì hãy bấm vào thẻ của mã đó</p>
        </div>
        <div className="part-chatbot">
          <h5>💬 Chatbot</h5>
          <p>Khi bạn mở 1 trang bất kỳ, bạn sẽ thấy nút chatbot nhỏ ở dưới góc phải màn hình</p>
          <p>Chúng tôi sử dụng Gemini-1.5-flash</p>
          <p></p>
          <p>Lời Khuyên</p>
        </div>
      </div>

      <div className="container mb-5">
        <h3 className="mb-4 text-center">🏢 Giới thiệu 8 mã cổ phiếu</h3>
        <div className="row g-4">
          {stockList.map((stock) => (
            <div key={stock.symbol} className="col-md-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">{stock.name} ({stock.symbol})</h5>
                  <p className="card-text text-muted">{companyDescriptionMap[stock.symbol]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="container mb-5">
        <h3 className="mb-4 text-center">📈 Các loại giá cổ phiếu</h3>
        <div className="row g-4">
          {[
            { label: "Open", desc: "Giá tại thời điểm mở cửa phiên giao dịch", icon: "🔓" },
            { label: "Close", desc: "Giá đóng cửa phiên – dùng nhiều trong phân tích", icon: "🔒" },
            { label: "High", desc: "Giá cao nhất đạt được trong phiên", icon: "📈" },
            { label: "Low", desc: "Giá thấp nhất trong phiên", icon: "📉" },
          ].map((item, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title">{item.icon} {item.label}</h5>
                  <p className="card-text text-muted">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="about-btn" onClick={() => navigate("/home")}>
        tiếp tục với trang chủ
      </button>


    </div>
  );
}
