from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import pandas as pd
from sklearn.linear_model import LinearRegression
import os
import requests
from dotenv import load_dotenv
import google.generativeai as genai
from datetime import datetime, timedelta



# Load API key từ .env
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
NEWS_API_KEY = os.getenv("NEWS_API_KEY")
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")


app = Flask(__name__)
CORS(app)

# -------------------- HÀM PHÂN TÍCH CẢM XÚC THỦ CÔNG --------------------
def simple_sentiment(title):
    title = title.lower()

    positive_keywords = ["surge", "gain", "soar", "up", "beat", "strong", "growth", "record high", "buy", "bullish"]
    negative_keywords = ["fall", "drop", "down", "weak", "loss", "plunge", "concern", "miss", "sell", "bearish"]

    positive = any(word in title for word in positive_keywords)
    negative = any(word in title for word in negative_keywords)

    if positive and not negative:
        return "Positive"
    elif negative and not positive:
        return "Negative"
    else:
        return "Neutral"
# -------------------- LẤY GIÁ ĐỂ CHO STOCK-CARD --------------------
@app.route("/get-stock-price", methods=["POST"])
def get_stock_price():
    req = request.get_json()
    symbols = req.get("symbols", [])

    result = {}
    for sym in symbols:
        try:
            ticker = yf.Ticker(sym)
            hist = ticker.history(period="2d")  # lấy 2 ngày gần nhất
            if len(hist) >= 2:
                latest = hist.iloc[-1]
                prev = hist.iloc[-2]
                price = round(latest["Close"], 2)
                change = round(price - prev["Close"], 2)
                percent = round((change / prev["Close"]) * 100, 2)
                result[sym] = {
                    "price": price,
                    "change": change,
                    "percent": percent
                }
            else:
                result[sym] = "Not enough data"
        except Exception as e:
            result[sym] = f"Error: {str(e)}"

    return jsonify(result)


# -------------------- CHATBOT --------------------
@app.route("/gemini-chat", methods=["POST"])
def gemini_chat():
    try:
        data = request.get_json()
        message_text = data.get("message", "").strip()

        if not message_text:
            return jsonify({"error": "Missing 'message' field"}), 400

        model = genai.GenerativeModel("gemini-1.5-flash")

        # Gọi Gemini
        response = model.generate_content(message_text)

        # Kiểm tra phản hồi an toàn
        if hasattr(response, "text") and response.text:
            return jsonify({"reply": response.text})
        else:
            return jsonify({"error": "Không nhận được phản hồi từ Gemini."}), 500

    except Exception as e:
        # Ghi log để dễ debug
        print("❌ Lỗi khi gọi Gemini:", e)
        return jsonify({"error": f"Lỗi nội bộ: {str(e)}"}), 500


# -------------------- CHART --------------------
@app.route("/get-chart-data", methods=["POST"])
def get_chart_data():
    req = request.get_json()
    symbols = req.get("symbols", [])
    period = req.get("period", "1mo")
    price_fields = req.get("price_fields", ["Close"])

    # ✅ Map tên viết thường từ frontend sang đúng tên gốc trong yfinance
    FIELD_MAPPING = {
        "open": "Open",
        "high": "High",
        "low": "Low",
        "close": "Close",
    }

    result = {}
    for sym in symbols:
        try:
            data = yf.Ticker(sym).history(period=period)
            if not data.empty:
                result[sym] = []
                for index, row in data.iterrows():
                    point = {"date": str(index.date())}
                    for field in price_fields:
                        mapped = FIELD_MAPPING.get(field.lower())
                        if mapped in row:
                            point[field] = round(row[mapped], 2)
                    result[sym].append(point)
            else:
                result[sym] = "No data"
        except Exception as e:
            result[sym] = f"Error: {str(e)}"

    return jsonify(result)



# -------------------- NEWS --------------------
@app.route("/get-news-finnhub", methods=["POST"])
def get_news_finnhub():
    req = request.get_json()
    symbols = req.get("symbols", [])
    
    # Lấy ngày hiện tại và ngày cách đây 7 ngày
    today = datetime.today().date()
    from_date = today - timedelta(days=7)
    to_date = today

    all_articles = []

    for symbol in symbols:
        try:
            url = f"https://finnhub.io/api/v1/company-news?symbol={symbol}&from={from_date}&to={to_date}&token={FINNHUB_API_KEY}"
            response = requests.get(url)
            news = response.json()

            # Nếu không có tin, thì ghi log
            if not isinstance(news, list) or len(news) == 0:
                print(f"⚠️ Không có tin tức cho {symbol} từ Finnhub")
                continue

            for article in news[:5]:  # Lấy tối đa 5 bài
                all_articles.append({
                    "symbol": symbol,
                    "title": article.get("headline", "Không có tiêu đề"),
                    "url": article.get("url", "#"),
                    "source": article.get("source", "N/A"),
                    "publishedAt": datetime.fromtimestamp(article.get("datetime", 0)).isoformat(),
                    "sentiment": simple_sentiment(article.get("headline", ""))
                })
        except Exception as e:
            print(f"❌ Lỗi khi lấy tin cho {symbol}: {e}")

    return jsonify(all_articles)
# @app.route("/get-news", methods=["POST"])
# def get_news():
#     req = request.get_json()
#     symbols = req.get("symbols", [])
#     all_articles = []

#     for symbol in symbols:
#         query = f'"{symbol}" AND (stock OR company OR shares)'
#         # ❌ KHÔNG cần thêm &from=&to=
#         url = f"https://newsapi.org/v2/everything?q={query}&sortBy=publishedAt&pageSize=5&language=en&apiKey={NEWS_API_KEY}"

#         try:
#             response = requests.get(url, timeout=5)
#             articles = response.json().get("articles", [])
#             articles = [a for a in articles if "title" in a]

#             for article in articles:
#                 sentiment = simple_sentiment(article["title"])
#                 all_articles.append({
#                     "symbol": symbol,
#                     "title": article["title"],
#                     "url": article["url"],
#                     "source": article["source"]["name"],
#                     "publishedAt": article["publishedAt"],
#                     "sentiment": sentiment
#                 })

#         except Exception as e:
#             print("❌ Lỗi khi lấy tin tức:", e)

#     return jsonify(all_articles)
#---------------------PREDICTION---------------------------#

@app.route("/predict", methods=["POST"])
def predict_stock_price():
    symbol = request.json.get("symbol", "")
    if not symbol:
        return jsonify({"error": "Symbol is required"}), 400

    data = yf.Ticker(symbol).history(period="60d")
    if data.empty:
        return jsonify({"error": "Không có dữ liệu"}), 404

    current_price = round(data["Close"].iloc[-1], 2)
    
    #### Dùng giá đóng cửa
    data = data[["Close"]].reset_index()
    data["Day"] = range(len(data))

    # Mô hình đơn giản  
    X = data[["Day"]]
    y = data["Close"]


    model = LinearRegression().fit(X, y)   #PREDICT MODEL HERE 


    # Dự đoán cho ngày tiếp theo
    next_day = [[len(data)]]
    predicted_price = round(model.predict(next_day)[0], 2)

    return jsonify({"symbol": symbol,
                    "current_price": current_price
                    ,"predicted_price": predicted_price})





# -------------------- MAIN --------------------
if __name__ == "__main__":
    app.run(debug=True)