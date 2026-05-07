const chat = document.getElementById("chat");
const msg = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function add(sender, text) {
  const p = document.createElement("p");
  p.innerHTML = `<b>${sender}:</b> ${text}`;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const text = msg.value.trim();

  if (!text) return;

  add("YOU", text);
  msg.value = "";

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await res.json();

    add("ARCANE", data.reply || "No reply.");
  } catch (err) {
    add("SYSTEM", "Send failed.");
  }
}

sendBtn.addEventListener("click", send);

msg.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    send();
  }
});

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

const particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    s: Math.random() * 0.6 + 0.2
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#9d7bff";

  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.y -= p.s;

    if (p.y < 0) {
      p.y = canvas.height;
      p.x = Math.random() * canvas.width;
    }
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener("resize", resizeCanvas);