import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { createServer } from "http";
import { Server } from "socket.io";

// App Config
const app = express();
const port = process.env.PORT || 4000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// Websocket configuration

const connectedUsers = new Map();
io.on("connection", (socket) => {
  socket.on("user_connected", (userId) => {
    connectedUsers.set(userId, socket.id);

    // Broadcast to all clients that this user is online
    io.emit("user_status_changed", {
      userId: userId,
      status: "online",
    });
  });

  socket.on("check_user_status", (userId) => {
    const isUserOnline = connectedUsers.has(userId);
    socket.emit("user_status", { userId, isOnline: isUserOnline });
  });

  socket.on("disconnect", () => {
    // console.log("A user disconnected");
    let disconnectedUserId;
    for (const [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        disconnectedUserId = userId;
        break;
      }
    }
    if (disconnectedUserId) {
      connectedUsers.delete(disconnectedUserId);
      io.emit("user_status_changed", {
        userId: disconnectedUserId,
        status: "offline",
      });
    }
  });
});

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

server.listen(port, () => console.log("Server started on PORT : " + port));
