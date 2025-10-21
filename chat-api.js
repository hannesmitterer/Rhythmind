// Sends a message to the chat API
async function sendMessage(user, message) {
  const res = await fetch("https://https://euystacio-ai-q3hh.onrender.com/chat/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, message })
  });
  return res.json();
}

// Loads the chat log from the chat API
async function loadChatLog() {
  const res = await fetch("https://https://euystacio-ai-q3hh.onrender.com/chat/log");
  const data = await res.json();
  console.log("Chat Log:", data.chat_history);
}
