import { Router } from "express";
import multer from "multer";
import logger from "../utilities/logger";
import { uploadOriginal } from "../services/uploadImage";
import { getSignedUrl } from "../services/fetchImage";

const router = Router();
const upload = multer();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image
 *     tags:
 *       - Images
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 image:
 *                   type: object
 *                 url:
 *                   type: string
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Internal server error
 */

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;    
    if (!file) {
      logger.error("No file uploaded");
      return res.status(400).json({
        status: "error",
        message: "No file uploaded",
      });
    }

    const image = await uploadOriginal({
      filename: file.originalname,
      buffer: file.buffer,
      visibility: "private",
    });

    const url = await getSignedUrl(image.storageKey);
    res.status(200).json({
      status: "success",
      message: "Image uploaded",
      image,
      url,
    });
  } catch (error: any) {
    logger.error(error?.message);
    res.status(500).json({
      status: "error",
      message: error?.message,
    });
  }
});

export default router;
