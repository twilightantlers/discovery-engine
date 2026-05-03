import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static("."));

app.get("/", (req, res) => {
  res.send("Arcane AI Running");
});

app.post("/chat", async (req, res) => {
  try {

    const response = await client.responses.create({
      model: "gpt-5.5",
      instructions:
        "You are Arcane AI, a futuristic assistant that solves problems, helps creatively, explains clearly, and safely guides users.",
      input: req.body.message
    });

    res.json({
      reply: response.output_text
    });

  } catch (err) {

    res.status(500).json({
      error: "Arcane AI chat failed"
    });

  }
});

app.post("/image", async (req, res) => {
  try {

    const image = await client.images.generate({
      model: "gpt-image-2",
      prompt: req.body.prompt,
      size: "1024x1024"
    });

    res.json({
      image: image.data[0].b64_json
    });

  } catch (err) {

    res.status(500).json({
      error: "Arcane AI image generation failed"
    });

  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Arcane AI Online");
});