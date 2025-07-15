// Chatbox.jsx
import React, { useState, useEffect } from "react";
import { sendToChatbot } from "../services/chatbotService";
import ReactMarkDown from "react-markdown";
import "./Chatbox.css";

const FINANCE_PROMPT = `
Bạn là một chuyên gia tài chính chỉ tư vấn 8 mã cổ phiếu: AAPL, TSLA, GOOGL, MSFT, AMZN, META, NFLX, NVDA.

🎯 Mục tiêu:
- Dựa vào giá hiện tại và dự đoán từ AI (được backend cung cấp) để kết luận: MUA / BÁN / GIỮ + mức độ (mạnh / vừa / yếu).
- Giải thích ngắn gọn, rõ ràng, tối đa 3 dòng ngắn.

📌 Nếu người dùng hỏi ngoài 8 mã này, chỉ trả lời:
"Tôi chỉ chuyên gia về cổ phiếu. Vui lòng hỏi về một trong 8 mã tôi hỗ trợ: AAPL, TSLA, GOOGL, MSFT, AMZN, META, NFLX, NVDA."
Không nói thêm gì khác. Tránh lan man.
`;

export default function Chatbox({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("chat_history");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        { role: "assistant", content: "Chào bạn, tôi có thể giúp gì về cổ phiếu hôm nay?" },
      ]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chat_history", JSON.stringify(messages));
    }
  }, [messages]);

const handleSend = async () => {
  if (!input.trim()) return;

  const newMessages = [...messages, { role: "user", content: input }];
  setMessages(newMessages);
  setInput("");
  setLoading(true);

  try {
    let promptToSend = "";
    const symbolMatch = input.match(/\b(AAPL|TSLA|GOOGL|MSFT|AMZN|META|NFLX|NVDA)\b/i);
    const generalQuery = input.trim().toLowerCase();

    const stockKeywords = [
      "giá", "giá hôm nay", "cổ phiếu", "biến động", "tăng", "giảm",
      "chứng khoán", "mã", "phân tích"
    ];

    const unrelatedKeywords = [
      "sơn tùng", "tình yêu", "trà sữa", "chat gpt", "phim",
      "đi chơi", "tâm sự", "trò chuyện", 'nông', 'dân'
    ];

    const hasSymbol = !!symbolMatch;
    const hasStockKeyword = stockKeywords.some(w => generalQuery.includes(w));
    const hasUnrelated = unrelatedKeywords.some(w => generalQuery.includes(w));
    const wantsPrediction = /(dự đoán|mai|ngày mai|giá tiếp theo|dự kiến|tăng không|giảm không|nên mua|nên bán)/i.test(input);

    if (!hasSymbol && hasUnrelated && !hasStockKeyword) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Tôi chỉ là chuyên gia về cổ phiếu.Vui lòng hỏi về một trong 8 mã tôi hỗ trợ: AAPL, TSLA, GOOGL, MSFT, AMZN, META, NFLX, NVDA.",
        },
      ]);
      return;
    }
    // Nếu có từ khóa liên quan cổ phiếu, lấy API predict về (có giá hiện tại và giá dự đoán)
    if (hasSymbol) {
      const symbol = symbolMatch[0].toUpperCase();

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol }),
      });

      const stock = await res.json();
      if (stock.error) throw new Error(stock.error);

      if (wantsPrediction) {
        promptToSend = `
Bạn là một chuyên gia tài chính cấp cao, nhưng vẫn sử dụng phong cách giao tiếp tự nhiên, ngắn gọn và dễ hiểu như Gemini.

📌 Yêu cầu:
- So sánh giá hiện tại và giá dự đoán.
- Tính **chênh lệch tuyệt đối và phần trăm**.
- Đưa ra khuyến nghị đầu tư: **MUA / BÁN / GIỮ + mức độ (mạnh / vừa / yếu)**.
- Nêu tối đa 3 lý do, mỗi dòng một ý, không lan man.

📈 Thông tin cổ phiếu:
- Mã: ${symbol}
- Giá hiện tại: ${stock.current_price} USD
- Giá dự đoán: ${stock.predicted_price} USD

🎯 Mẫu phản hồi: ( những gạch đầu dòng thì xuống dòng)
- Mã: ...
- Giá hiện tại: ...
- Giá dự đoán: ...
- Chênh lệch: ... 
- Khuyến nghị: ...

📎 Ghi chú:
- Nếu chênh lệch < 2% → nên khuyến nghị **GIỮ**.
- Không lặp lại câu hỏi người dùng.
        `;
      } else {
        promptToSend = `
Bạn là một chuyên gia tài chính.
Người dùng muốn biết giá hiện tại của mã cổ phiếu ${symbol}.

Trả lời: ( những gạch đầu dòng thì xuống dòng )
- Mã: ${symbol}
- Giá hiện tại: ${stock.current_price} USD

Không cần phân tích thêm, không cần dự đoán. Ngắn gọn, rõ ràng.
        `;
      }
    } else {
      promptToSend = `Trả lời bình thường, nếu được hỏi là ai thì nói: 
      "Tôi là chuyên gia tài chính về tài chính" (bắt buộc không giải thích thêm)`;
    }

    const reply = await sendToChatbot(promptToSend);
    setMessages([...newMessages, { role: "assistant", content: reply }]);
  } catch (err) {
    console.error(err);
    setMessages([
      ...newMessages,
      { role: "assistant", content: "Xảy ra lỗi, vui lòng thử lại sau" },   // Lỗi hết Request API
    ]);
  } finally {
    setLoading(false);
  }
};


  const handleReset = () => {
    const initial = [
      { role: "assistant", content: "Chào bạn, tôi có thể giúp gì về cổ phiếu hôm nay?" },
    ];
    setMessages(initial);
    localStorage.removeItem("chat_history");
  };

return (
  <div
    className="chatbox card shadow position-fixed end-0 bottom-0 m-3"
    style={{ width: "350px", height: "500px", zIndex: 999 }}
  >
    {/* Header */}
    <div className="card-header d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img
          src="/avatar.png"
          alt="Bot Avatar"
          width="32"
          height="32"
          className="me-2 rounded-circle"
        />
        <strong>Super Bot</strong>
      </div>
      <div>
        <button className="btn btn-sm btn-light me-2" onClick={handleReset}>
          ⟲
        </button>
        <button className="btn btn-sm btn-light" onClick={onClose}>
          ☓
        </button>
      </div>
    </div>

    {/* Chat body */}
    <div className="card-body overflow-auto" style={{ maxHeight: "360px" }}>
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`${msg.role === "user" ? "text-end" : "text-start"}`}
        >
          <div
            className={`p-2 rounded ${
              msg.role === "user" ? "user-bubble" : "bot-bubble"
            }`}
          >
            <ReactMarkDown>{msg.content}</ReactMarkDown>
          </div>
        </div>
      ))}
      {loading && <div className="text-muted small">Đang trả lời...</div>}
    </div>

    {/* Input */}
    <div className="card-footer">
      <div className="input-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          type="text"
          className="form-control"
          placeholder="Nhập câu hỏi về cổ phiếu..."
        />
        <button
          className="btn-send btn btn-primary"
          onClick={handleSend}
          disabled={loading || !input.trim()}
        >
          {loading ? "Đang gửi..." : "Gửi"}
        </button>
      </div>
    </div>
  </div>
);
}
