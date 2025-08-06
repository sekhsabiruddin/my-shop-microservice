import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import redis from "../../../packages/libs/redis/index"; // using ioredis
import chatRoutes from "./routes/chat.route";

const app = express();
app.use(express.json());

// Register routes
app.use("/api/chat", chatRoutes);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

(async () => {
  try {
    // ✅ With ioredis, duplicates auto-connect
    const pubClient = redis.duplicate();
    const subClient = redis.duplicate();

    io.adapter(createAdapter(pubClient, subClient));

    io.on("connection", (socket) => {
      console.log(`✅ User connected: ${socket.id}`);

      socket.on("joinRoom", ({ roomId, userId }) => {
        socket.join(roomId);
        console.log(`User ${userId} joined room ${roomId}`);
        io.to(roomId).emit("systemMessage", `${userId} joined the chat`);
      });

      socket.on("sendMessage", ({ roomId, senderId, content }) => {
        const message = { roomId, senderId, content, createdAt: new Date() };
        io.to(roomId).emit("receiveMessage", message);
      });

      socket.on("disconnect", () => {
        console.log(`❌ User disconnected: ${socket.id}`);
      });
    });

    const PORT = process.env.PORT || 6003;
    httpServer.listen(PORT, () => {
      console.log(`🚀 Chatting service running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Redis connection error:", error);
    process.exit(1);
  }
})();
