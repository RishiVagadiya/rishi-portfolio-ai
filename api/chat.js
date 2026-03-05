export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {

    const { message } = req.body;

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        reply: "API key missing on server."
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://rishi-portfolio-ai.vercel.app",
        "X-Title": "Rishi Portfolio AI"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
          {
            role: "system",
            content: "You are Rishi Vagadiya's AI assistant. Explain his Unity projects, skills, and how to contact him."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    console.log("OPENROUTER:", data);

    const reply =
      data?.choices?.[0]?.message?.content ||
      "AI could not generate a response.";

    return res.status(200).json({ reply });

  } catch (error) {

    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      reply: "Server error. Try again."
    });

  }
}