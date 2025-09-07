import { Router, Request, Response } from "express";
import logger from "../utilities/logger";
import { supabase } from "../repository/supabaseClient";
import { version } from "os";

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

router.get("/", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("Image").select("id").limit(1);
    if (error) {
      logger.error(error);
      return res.status(500).json({
        status: "error",
        message: "Supabase Error",
        timestamp: new Date().toISOString(),
      });
    }

    logger.info("Server is up and running");
    return res.status(200).json({
      status: "success",
      message: "Server is up and running",
      timestamp: new Date().toISOString(),
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
