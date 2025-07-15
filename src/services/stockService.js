// services/stockService.js
export const fetchStockPrices = async (symbols) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get-stock-price`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symbols }),
  });
  return await res.json();
};