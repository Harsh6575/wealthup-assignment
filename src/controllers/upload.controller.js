import { uploadService } from "../services/upload.service.js";
import { Errors } from "../utils/appError.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return Errors.BadRequest("No file uploaded", res);
    }

    const result = await uploadService.uploadFile(req);

    return res.status(200).json({
      message: "File upload placeholder success",
      data: result,
    });
  } catch (error) {
    return Errors.InternalServerError(res, "File upload failed", error);
  }
};
