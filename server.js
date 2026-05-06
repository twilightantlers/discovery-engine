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
      model: "gpt-5.5-mini",
      input: userMessage
    });

    res.json({
      reply: response.output_text
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Arcane signal failure"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Arcane server running on port ${PORT}`);
});