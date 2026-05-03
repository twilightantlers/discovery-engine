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
app.use(express.json());

app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: "."
  });
});

app.post("/chat", async (req, res) => {

  try {

    const completion =
      await client.chat.completions.create({

      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content:
          "You are Arcane AI, a futuristic helpful assistant."
        },

        {
          role: "user",
          content: req.body.message
        }
      ]

    });

    res.json({
      reply:
      completion.choices[0].message.content
    });

  } catch(err){

    console.log(err);

    res.status(500).json({
      error:
      "Arcane AI chat failed."
    });

  }

});

app.post("/image", async (req, res) => {

  try {

    const image =
      await client.images.generate({

      model: "gpt-image-1",

      prompt: req.body.prompt,

      size: "1024x1024"

    });

    res.json({
      image:
      image.data[0].b64_json
    });

  } catch(err){

    console.log(err);

    res.status(500).json({
      error:
      "Arcane AI image failed."
    });

  }

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    "Arcane AI Online"
  );

});