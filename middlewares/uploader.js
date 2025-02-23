const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

// AWS SDK v3 S3 Client Configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer Configuration to Store Files in Memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

const UploadFile = ({ fieldName }) => {
  return async (req, res, next) => {
    upload.single(fieldName)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // If no file is uploaded, proceed without S3 upload
      if (!req.file) {
        return next();
      }

      try {
        // Define S3 Upload Parameters (Skip if file is not uploaded)
        const fileKey = `uploads/${Date.now()}_${req.file.originalname}`;
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileKey,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        };

        // Upload File to S3
        await s3.send(new PutObjectCommand(uploadParams));

        // Store File URL in Request Object
        req.file.location = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

        next();
      } catch (uploadError) {
        console.error("S3 Upload Error:", uploadError);
        return res.status(500).json({ error: "Failed to upload file to S3" });
      }
    });
  };
};

module.exports = { UploadFile };
