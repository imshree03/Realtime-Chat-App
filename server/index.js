const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const messageRoute = require("./routes/messageRoutes");
const cors = require("cors");
const socket = require("socket.io");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

mongoose
  .connect("mongodb://127.0.0.1/chat-appDb1")
  .then(() => {
    console.log("DB connection successful");
  })
  .catch(err => {
    console.log(err.message);
  });

// const port = process.env.PORT;
const port = 5000;
const server = app.listen(port, () => {
  console.log("Server is up and running on", port);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", socket => {
  global.chatSocket = socket;
  socket.on("add-user", userId => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", data => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
