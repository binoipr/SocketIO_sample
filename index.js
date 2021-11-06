const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(express.static(__dirname + "/public"));

server.listen(3000, () => {
  console.log(`server is listening to port: ${3000}`);
});
