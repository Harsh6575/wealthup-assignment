export const uploadService = {
  uploadFile: async (req) => {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    return {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
    };
  },
};
