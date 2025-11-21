import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morganLogger from "./middleware/morganLogger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(morganLogger);

app.get("/", (req, res) => {
  res.send("Welcome to the Wealth Up Assignment API!");
});

app.post("/upload", (req, res) => {
  // Placeholder for file upload handling logic
  res.send("File upload endpoint");
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
