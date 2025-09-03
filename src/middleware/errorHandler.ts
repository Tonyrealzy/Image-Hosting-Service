import { Request, Response, NextFunction } from "express";
import { AppError } from "../models/appError";
import logger from "../utilities/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  if (err instanceof AppError) {
    return res.status(status).json({
      status,
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  logger.error(`[ERROR] ${req.method} ${req.url} -> ${message}`);
  res.status(status).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
