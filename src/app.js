import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morganLogger from "./middleware/morganLogger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

import uploadRouter from "./routes/upload.route.js";

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(morganLogger);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "WealthUp Assignment API is running 🚀",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/upload", uploadRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
