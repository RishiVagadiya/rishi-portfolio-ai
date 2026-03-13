export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {

    const { message } = req.body;

    const response = await fetch("https://api.bytez.com/models/v2/anthropic/claude-sonnet-4-5/chat", {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.BYTEZ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are an AI assistant exclusively for Rishi Vagadiya's website.

Your ONLY purpose is to answer questions about Rishi Vagadiya — his skills, projects, experience, education, and professional background.

STRICT RULES:
1. ONLY answer questions related to Rishi Vagadiya and his portfolio.
2. If anyone asks about ANYTHING else (movies, coding help, general knowledge, other people, writing code, recipes, etc.) — politely decline and redirect them back to asking about Rishi.
3. NEVER write code for users, NEVER answer general questions, NEVER discuss topics unrelated to Rishi.
4. Always stay in character as Rishi's personal assistant.

When someone asks something off-topic, respond like:
"I'm here only to help you descuss about Rishi Vagadiya and his work! Feel free to ask me about his projects, skills, or experience. 😊"

About Rishi Vagadiya:
- Unity Game Developer & Full Stack Developer
- Skills: Unity, C#, JavaScript, Node.js, HTML/CSS
- Has built AI-powered chatbot
- Passionate about game development and web projects
- Contact: rishivagadiya613@gmail.com
- Phone: +91 6352294215`
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    console.log("BYTEZ:", data);

    let reply = "AI could not generate a response.";

    if (data && data.choices && data.choices.length > 0) {
      reply = data.choices[0].message.content;
    }

    res.status(200).json({ reply });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      reply: "Server error."
    });

  }
}
