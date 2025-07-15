// chatbotService.js (Gemini API calls)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function sendToChatbot(prompt) {
  try {
    const response = await fetch(`${API_BASE_URL}/gemini-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Lỗi gọi Gemini:", error);
    throw error;
  }
}
