import morgan from "morgan";
import logger from "../utils/logger.js";

const skip = () => process.env.NODE_ENV === "test";

const stream = {
  write: (message) => logger.http(message.trim()),
};

const morganFormat =
  ":method :url :status :res[content-length] - :response-time ms";

const morganLogger = morgan(morganFormat, { stream, skip });

export default morganLogger;
