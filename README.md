# 📊 Stock Vision AI  - Dự án môn DAP

Một ứng dụng web thông minh dùng để trực quan hóa, dự đoán và phân tích dữ liệu thị trường chứng khoán theo thời gian thực, tích hợp trí tuệ nhân tạo (AI) và các API tài chính mạnh mẽ.
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
Trong folder DAP-project-stock-vision-ai/ , hãy đi vào folder backend
```bash
cd backend
```
Tạo môi trường ảo
```bash
python -m venv venv
venv\Scripts\activate  # với Windows | source venv/bin/activate (Linux/Mac)
```
Tải "requirements" ( thư viện cần thiết ) 
```bash
pip install -r requirements.txt
```
Chạy backend
```bash
python app.py
```
Tóm gọn 

```bash
...
```

### 3. Tải NPM và chạy frontend
Nếu chưa tải Node.js
Tải tại : https://nodejs.org/

Sau đó kiểm tra phiên bản
```bash
node - v
npm -v
```
Mở terminal mới và vào thư mục dự án
```bash
cd DAP-project-stock-vision-ai
```
Tải thư viện cần của Node.js
```bash
npm install
```
Chạy frontend trong thư mục gốc
```bash
npm run dev
```
Bạn sẽ thấy link https://

## 👥 Thành viên nhóm
Ngô Phúc Nguyên - Phát triển web
