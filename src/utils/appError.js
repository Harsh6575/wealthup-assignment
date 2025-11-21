export class AppError extends Error {
  constructor(message, meta, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.meta = meta;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const Errors = {
  BadRequest: (message, meta = {}) => new AppError(message, meta, 400),
  Unauthorized: (message, meta = {}) => new AppError(message, meta, 401),
  Forbidden: (message, meta = {}) => new AppError(message, meta, 403),
  NotFound: (message, meta = {}) => new AppError(message, meta, 404),
  Conflict: (message, meta = {}) => new AppError(message, meta, 409),
  InternalServerError: (message, meta = {}) => new AppError(message, meta, 500),
};
