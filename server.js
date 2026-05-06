const terminal = document.getElementById("terminal");
const input = document.getElementById("userInput");

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = "msg";

  msg.innerHTML = `
    <span class="sender">${sender}:</span>
    <span>${text}</span>
  `;

  terminal.appendChild(msg);

  terminal.scrollTop = terminal.scrollHeight;
}

async function sendMessage() {
  const message = input.value.trim();

  if (!message) return;

  addMessage("YOU", message);

  input.value = "";

  try {

    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message
      })
    });

    const data = await response.json();

    if (data.reply) {
      addMessage("ARCANE", data.reply);
    } else {
      addMessage("SYSTEM", "No response.");
    }

  } catch (err) {
    console.error(err);

    addMessage(
      "SYSTEM",
      "Connection failed."
    );
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});