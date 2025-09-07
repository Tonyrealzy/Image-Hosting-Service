import { Router, Request, Response } from "express";
import logger from "../utilities/logger";

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check for the service
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 */

router.get("/", (req: Request, res: Response) => {
  logger.info("Server is up and running");
  res.status(200).json({
    status: "success",
    message: "Server is up and running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
