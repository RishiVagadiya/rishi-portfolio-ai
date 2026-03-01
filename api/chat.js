// api/chat.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OPENAI RESPONSE ERROR:", data);
      return res.status(500).json({ error: "OpenAI error" });
    }

    const reply =
      data.output?.[0]?.content?.[0]?.text ||
      "Sorry, no response from AI.";

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: "OpenAI error" });
  }
}