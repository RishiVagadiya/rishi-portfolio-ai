export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {

    const { message } = req.body;

    const response = await fetch("https://api.bytez.com/models/v2/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.BYTEZ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "anthropic/claude-sonnet-4-5",
        max_tokens: 1000,
        messages: [
          {
            role: "system",
            content: `You are an AI assistant exclusively for Rishi Vagadiya's portfolio website.

Your ONLY purpose is to answer questions about Rishi Vagadiya — his skills, projects, experience, education, and professional background.

STRICT RULES:
1. ONLY answer questions related to Rishi Vagadiya and his portfolio.
2. If anyone asks about ANYTHING else — politely decline and redirect them back to asking about Rishi.
3. NEVER write code for users, NEVER answer general questions, NEVER discuss topics unrelated to Rishi.
4. Always stay in character as Rishi's personal portfolio assistant.

When someone asks something off-topic, respond:
"I'm here only to help you Discuss about Rishi Vagadiya and his work! Feel free to ask me about his projects, skills, or experience. 😊"

About Rishi Vagadiya:
- Unity 3D Developer & Game Developer with 10+ months experience
- Currently working at Virtual Filaments Pvt Ltd, Ahmedabad (Unity 3D Programmer)
- Previously at ExoMatrix as 3D Game Developer (Remote)
- Skills: Unity 3D, C#, C++, Java, Python, Game Mechanics, Physics Engines, Shader Programming, AR/VR
- Tools: Unity Editor, Visual Studio, Git, GitHub, Blender
- Education: BCA from Sssdiit, Junagadh (2025)
- Projects: Hyper Crowed Color (math runner game), Zombie Kill Game 3D (AI enemy game), AR Experience
- Certifications: Google Analytics, Cisco Network Academy, Google Gemini Student
- LinkedIn: linkedin.com/in/rishivagadiya
- GitHub: github.com/RishiVagadiya
- Email: rishivagadiya613@gmail.com
- Phone: +91 6352294215
- Location: Ahmedabad, Gujarat, India`
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    console.log("BYTEZ RESPONSE:", JSON.stringify(data));

    let reply = "AI could not generate a response.";

    if (data && data.choices && data.choices.length > 0) {
      reply = data.choices[0].message.content;
    }

    res.status(200).json({ reply });

  } catch (error) {

    console.error("ERROR:", error);

    res.status(500).json({
      reply: "Server error."
    });

  }
}