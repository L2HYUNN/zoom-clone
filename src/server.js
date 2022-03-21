import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";

const PORT = 3000;

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListening = () => {
  console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
};

// app.listen(PORT, handleListening);

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anonymous";
  console.log("✅ Connected to Browser");
  socket.on("close", () => {
    console.log("❌ Disconnected from Browser");
  });
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((socket) =>
          socket.send(`${socket.nickname}: ${message.payload}`)
        );
        break;
      case "nickname":
        socket["nickname"] = message.payload;
        break;
    }
  });
});

server.listen(PORT, handleListening);
