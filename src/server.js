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

function handleConnection(socket) {
  console.log(socket);
}

wss.on("connection", handleConnection);

server.listen(PORT, handleListening);
