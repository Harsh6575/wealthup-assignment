import { AppError } from "../utils/appError.js";
import logger from "../utils/logger.js";

import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      error: {
        code: "MULTER_ERROR",
        message: err.message,
      },
    });
  }

  if (err.message === "Only .txt allowed") {
    return res.status(400).json({
      success: false,
      error: {
        code: "INVALID_FILE_TYPE",
        message: "Only .txt files are allowed",
      },
    });
  }

  let statusCode = 500;
  let code = "INTERNAL_ERROR";
  let message = "An unexpected error occurred.";
  let meta;
  let stack;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    code = err.code;
    message = err.message;
    meta = err.meta;
    stack = err.stack;
  } else if (err instanceof Error) {
    message = err.message;
    stack = err.stack;
  } else {
    message = "Unknown error occurred";
  }

  logger.error("💥 Error occurred", {
    code,
    message,
    statusCode,
    ...(meta && { meta }),
    ...(stack && { stack }),
  });

  // 🧊 Send response
  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      ...(process.env.NODE_ENV !== "production" && {
        stack,
        meta,
      }),
    },
  });
};
