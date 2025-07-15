const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchNews(symbols) {
  try {
    const response = await fetch(`${API_BASE_URL}/get-news-finnhub`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbols }),
    });

    if (!response.ok) throw new Error("Lỗi khi gọi Finnhub API");

    const data = await response.json();
    console.log("🔥 Tin từ Finnhub:", data);
    return data;
  } catch (err) {
    console.error("❌ Lỗi khi fetchNews:", err);
    return [];
  }
}
