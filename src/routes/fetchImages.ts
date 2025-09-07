import { Router } from "express";
import logger from "../utilities/logger";
import { fetchImage, getSignedUrl } from "../services/fetchImage";

const router = Router();

/**
 * @swagger
 * /fetch:
 *   get:
 *     summary: Get the public URL of an image by key
 *     tags:
 *       - Images
 *     parameters:
 *       - in: query
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: The storage key or filename of the image
 *     responses:
 *       200:
 *         description: Image URL retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 url:
 *                   type: string
 *       400:
 *         description: Missing filename
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const key = req.query.key as string;
    if (!key) {
      logger.error("Missing filename");
      return res.status(400).json({
        status: "error",
        message: "Missing filename",
      });
    }

    const imageUrl = await fetchImage(key);
    if (!imageUrl) {
      logger.error("File doesn't exist.");
      return res.status(404).json({
        status: "error",
        message: "File doesn't exist.",
      });
    }

    const url = getSignedUrl(key);
    return res.status(200).json({
      status: "success",
      message: "Image path in bucket retrieved",
      url,
    });
  } catch (error: any) {
    logger.error(error?.message);
    return res.status(500).json({
      status: "error",
      message: error?.message,
    });
  }
});

export default router;
