const URL = `ws://${window.location.host}`;

const socket = new WebSocket(URL);

socket.addEventListener("open", () => {
  console.log("✅ Connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("New message", message.data);
});

socket.addEventListener("close", () => {
  console.log("❌ Disconnected from Server");
});

setTimeout(() => {
  socket.send("hello from the browser");
}, 10000);
