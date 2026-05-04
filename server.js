import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static("."));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("The Great Beyond AI Running");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    console.error("CHAT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/image", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024"
    });

    const imageBase64 = response.data[0].b64_json;

    res.json({
      image: `data:image/png;base64,${imageBase64}`
    });
  } catch (error) {
    console.error("IMAGE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The Great Beyond AI running on port ${PORT}`);
});