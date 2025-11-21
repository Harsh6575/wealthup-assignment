import app from "./app.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
  logger.info(`Press CTRL+C to stop the server`);
});

const gracefulShutdown = (signal) => {
  logger.warn(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    logger.info("Server closed. Exiting process.");
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error("Could not close connections in time, forcing shutdown");
    process.exit(1);
  }, 10000);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

// Exporting app for testing purposes
export default server;
