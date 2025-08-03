import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import router from "./routes/auth.router";
// import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import router from "./routes/auth.route";
// import { errorMiddleware } from "@packages/error-handler/error-middleware";
// const swaggerDocument = require("./swagger-output.json");

const app = express();

// Enable CORS for frontend origin
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Serve Swagger UI under /api/api-docs
// app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve raw Swagger JSON under /api/doc-json
// app.get("/api/doc-json", (req, res) => {
//   res.json(swaggerDocument);
// });

// API routes
app.use("/api", router);

// Global error handler
// app.use(errorMiddleware);

// Start server
const port = process.env.PORT || 6001;
const server = app.listen(port, () => {
  console.log(`🚀 Listening at http://localhost:${port}`);
  console.log(
    `📚 Swagger UI available at http://localhost:${port}/api/api-docs`
  );
});

server.on("error", console.error);
