import multer from "multer";
import logger from "../utils/logger.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "text/plain") {
    return cb(new Error("Only .txt allowed"), false);
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 }, // 5 GB
});
