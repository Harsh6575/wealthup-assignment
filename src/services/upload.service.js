import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.config.js";
import logger from "../utils/logger.js";

import { fromEnv } from "@aws-sdk/credential-provider-env";

export const uploadService = {
  // uploadFile: async (req) => {
  //   if (!req.file) {
  //     throw new Error("No file uploaded");
  //   }

  //   return {
  //     originalName: req.file.originalname,
  //     mimeType: req.file.mimetype,
  //     size: req.file.size,
  //   };
  // },
  uploadFile: async (file) => {
    const bucket = process.env.S3_BUCKET_NAME;
    const key = `files/${Date.now()}-${file.originalname}`;

    // logger.info("S3 Command Input:", {
    //   Bucket: bucket,
    //   Key: key,
    //   ContentType: file.mimetype,
    //   BodyType: typeof file.buffer,
    //   BodyLength: file.buffer?.length,
    // });

    const uploadResponse = await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        Metadata: { status: "uploaded" },
      })
    );

    return {
      url: `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    };
  },
};
