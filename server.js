import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

const PORT =
  process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(express.static("."));

const client = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {

  res.sendFile(
    process.cwd() + "/index.html"
  );

});

app.post("/chat", async (req, res) => {

  try {

    const message =
      req.body.message || "hello";

    const completion =
      await client.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [

          {
            role: "system",

            content:
              "You are Arcane, a glowing ASCII signal AI."
          },

          {
            role: "user",
            content: message
          }

        ]

      });

    res.json({
      reply:
        completion.choices[0]
        .message.content
    });

  } catch (err) {

    console.error(err);

    res.json({
      reply:
        "☼ Arcane signal distortion detected ☼"
    });

  }

});

app.listen(PORT, () => {

  console.log(
    `Arcane online on port ${PORT}`
  );

});