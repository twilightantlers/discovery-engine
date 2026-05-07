import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {

  try {

    const text = req.body.message;

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
            content: text
          }
        ]
      });

    res.json({
      reply:
        completion.choices[0].message.content
    });

  } catch (err) {

    console.error(err);

    res.json({
      reply:
        "☼ Arcane signal distortion detected ☼"
    });

  }

});