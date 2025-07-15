# 📊 Stock Vision AI

Một ứng dụng web thông minh dùng để trực quan hóa, dự đoán và phân tích dữ liệu thị trường chứng khoán theo thời gian thực, tích hợp trí tuệ nhân tạo (AI) và các API tài chính mạnh mẽ.

Một dự án môn DAP
---

## 🚀 Tính năng chính

- 🧠 Dự đoán giá cổ phiếu bằng mô hình học máy (ML) - cụ thẻ là LinearRegression
- 📰 Lấy tin tức tài chính theo từng cổ phiếu + phân tích cảm xúc
- 🤖 Tích hợp chatbot Gemini hỗ trợ hỏi đáp về thị trường
- 💬 Chatbot tự động gợi ý Mua/Bán dựa trên xu hướng giá
- 🧩 Tùy chọn loại biểu đồ và loại giá (Open, High, Low, Close, Volume)
- 📈 Hiển thị biểu đồ giá cổ phiếu đa dạng (Line, Bar,Area ,Candlestick)
- 🔍 So sánh nhiều cổ phiếu cùng lúc trên biểu đồ
---

## 🧱 Công nghệ sử dụng

| Frontend | Backend | ML | API |
|----------|---------|-------|-----|
| React + Vite + Bootstrap | Flask (Python) | Scikit-learn | Google Gemini, yFinance, Finnhub |

---

## ⚙️ Hướng dẫn cài đặt và chạy

### 1. Tải dự án về máy

```bash
git clone https://github.com/NgoPhucNguyen/DAP-project-stock-vision-ai.git
cd DAP-project-stock-vision-ai
```

### 2.Tải "requirements" cho backend và chạy backend
```bash
DAP-project-stock-vision-ai/
cd DAP-project-stock-vision-ai/backend
cd backend  
python -m venv venv
venv\Scripts\activate  # với Windows | source venv/bin/activate (Linux/Mac)
pip install -r requirements.txt
python app.py
```

### 3. Tải NPM và chạy frontend
Nếu chưa tải Node.js
Tải tại : https://nodejs.org/
Sau đó kiểm tra phiên bản
```bash
node - v
npm -v
```
```bash
npm install
npm run dev
```

## 👥 Thành viên nhóm
Ngo Phuc Nguyen (Felix) – Phát triển giao diện & tích hợp AI

[Tên các thành viên khác nếu có]
