// api/chat.js

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-website.com", // optional
        "X-Title": "Rishi Portfolio AI"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
          {
            role: "system",
            content: "Rishi's AI assistant. Help users learn about his Unity game development projects, C# skills, and availability."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OPENROUTER ERROR:", data);
      return res.status(500).json({ error: "OpenRouter error" });
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, no response from AI.";

    return res.status(200).json({ reply });

  } catch (err) {

    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: "Server error" });

  }

}