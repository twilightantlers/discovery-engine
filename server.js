import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

app.post("/chat", async (req, res) => {

  const message = req.body.message;

  res.json({
    reply: `☼ ARCANE SIGNAL RECEIVED ☼ :: ${message}`
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Arcane online on port ${PORT}`);
});