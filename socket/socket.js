import { Server } from "socket.io";
import http from "http";
import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:3005',
    changeOrigin: true,
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://sparkx-frontend.onrender.com",
      "http://localhost:8081",
      "http://localhost:3000",
      "https://sparkx-frontend.vercel.app",
      "https://sparkx.ddns.net",
      "http://localhost:3001",
      "https://sparkxchat.vercel.app"
    ],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on("connect", (socket) => {
  console.log(`User connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
