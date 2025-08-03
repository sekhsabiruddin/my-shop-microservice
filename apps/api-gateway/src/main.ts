import express from "express";
// import * as path from "path";
import cors from "cors";
import proxy from "express-http-proxy";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

// CORS setup
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);
dotenv.config();
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
    // req.ip might be undefined, so provide a default
    const ip = req.ip ?? "0.0.0.0";
    return ipKeyGenerator(ip);
  },
});

app.use(limiter);

// // Static assets
// app.use("/assets", express.static(path.join(__dirname, "assets")));
// app.use("/chatting", proxy("http://localhost:6006"));
// app.use("/logger", proxy("http://localhost:6008"));
// app.use("/recommend", proxy("http://localhost:6007"));
// app.use("/admin", proxy("http://localhost:6005"));
// app.use("/order", proxy("http://localhost:6004"));
// app.use("/product", proxy("http://localhost:6002"));
app.use("/", proxy("http://localhost:6001"));

// Start server
const port = process.env.PORT || 8080;

const server = app.listen(port, async () => {
  console.log(`🚀 Listening at http://localhost:${port}/api`);
});

server.on("error", console.error);
