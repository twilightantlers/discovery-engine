import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static("."));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message || "Hello";

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: `You are Arcane, a peaceful ASCII signal AI. Reply warmly with ASCII faces and no dystopian energy. User said: ${userMessage}`
    });

    res.json({ reply: response.output_text });
  } catch (err) {
    console.error("CHAT ERROR:", err);
    res.status(500).json({ error: "Arcane chat failed." });
  }
});

app.post("/gif", async (req, res) => {
  try {
    const query = encodeURIComponent(req.body.query || "aesthetic anime sparkle");

    const gifUrl = `https://giphy.com/search/${query}`;

    res.json({
      reply: "Here are safe GIF results:",
      url: gifUrl
    });
  } catch (err) {
    console.error("GIF ERROR:", err);
    res.status(500).json({ error: "GIF search failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Arcane server running on port ${PORT}`);
});