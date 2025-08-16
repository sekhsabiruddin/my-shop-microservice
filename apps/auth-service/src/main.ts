// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import router from "./routes/auth.route";
// import { errorHandler } from "../../../packages/error-handler/error-middleware";
// const app = express();
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
//     credentials: true,
//   })
// );
// dotenv.config();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json({ limit: "100mb" }));
// app.use(express.urlencoded({ extended: true, limit: "100mb" }));
// app.use(cookieParser());

// app.use("/api", router);

// app.use(errorHandler);

// // Start server
// const port = process.env.PORT || 6001;
// const server = app.listen(port, () => {
//   console.log(`🚀 Listening at http://localhost:${port}`);
//   console.log(
//     `📚 Swagger UI available at http://localhost:${port}/api/api-docs`
//   );
// });

// server.on("error", console.error);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/auth.route";
import { errorHandler } from "../../../packages/error-handler/error-middleware";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());

app.use("/api", router);
app.use(errorHandler);

const port = process.env.PORT || 6001;
const server = app.listen(port, () => {
  console.log(`🚀 Listening at http://localhost:${port}`);
});

server.on("error", console.error);
