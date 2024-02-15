const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 5000;

let users = [];

//connection setup
io.on("connection", (socket) => {
  // console.log("New user connected");

  socket.on("join", (username) => {
    socket.username = username;
    users.push(username);
    io.emit("users", users);
  });


  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    // console.log("User disconnected");
    users = users.filter((user) => user !== socket.username)
    io.emit("users", users)
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
