import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const onlineUsers = new Map();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;

  console.log("User connected:", socket.id, "UserId:", userId);

  
  if (userId) {
    onlineUsers.set(userId, socket.id);
  }

 socket.on("sendMessage", ({ receiverId, message }) => {
  const receiverSocketId = onlineUsers.get(receiverId);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("receiveMessage", {
      ...message,
      receiverId,
      senderId: message.senderId
    });
  }
});

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    for (const [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        onlineUsers.delete(key);
        break;
      }
    }
  });
});

export { io, server, app };
