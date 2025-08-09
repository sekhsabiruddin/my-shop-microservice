import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { seedAdmin } from "./seeds/admin.seeder";
import { setupSocketIO } from "../../../packages/libs/websocket";
import http from "http";
import { errorHandler } from "../../../packages/error-handler/error-middleware";
dotenv.config();

const app = express();

// CORS setup
app.use(
  cors({
    origin: (origin, callback) => {
      // ✅ Allow all origins
      callback(null, origin || "*");
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Logging, parsing, and middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());

// Trust proxy (e.g., for rate limiting behind reverse proxy)
app.set("trust proxy", 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) => {
    const ip = req.ip ?? "0.0.0.0";
    return ipKeyGenerator(ip);
  },
});
app.use(limiter);

// Proxy routes (these should come BEFORE error handler)
app.use("/order", proxy("http://localhost:6005"));
app.use("/cart", proxy("http://localhost:6004"));
app.use("/chat", proxy("http://localhost:6003"));
app.use("/product", proxy("http://localhost:6002"));
app.use("/", proxy("http://localhost:6001"));

// Handle 404 - Route not found (optional but recommended)
app.use("*", (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  (error as any).statusCode = 404;
  next(error);
});

// 🚨 CRITICAL: Error handler must be the LAST middleware
app.use(errorHandler);

// Create HTTP server instead of app.listen
const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port, async () => {
  console.log(`🚀 Listening at http://localhost:${port}`);

  try {
    // Run seeder when server starts
    await seedAdmin();
    // console.log("✅ Admin seeder executed");

    // ✅ Attach WebSocket + Redis
    await setupSocketIO(server);
  } catch (err) {
    console.error(err);
  }
});

server.on("error", console.error);
