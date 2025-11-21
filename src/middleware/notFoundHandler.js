import logger from "../utils/logger.js";
import { Errors } from "../utils/appError.js";

export const notFoundHandler = (req, res, next) => {
  const message = `Route ${req.method} ${req.originalUrl} not found`;
  logger.warn("⚠️ Route not found", {
    method: req.method,
    url: req.originalUrl,
  });

  next(Errors.NotFound(message));
};
