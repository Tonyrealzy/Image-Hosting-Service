import rateLimit from "express-rate-limit";
import { envConfig } from "../utilities/config";

export const limiter = rateLimit({
  windowMs: Number(envConfig.limitTime) * 60 * 1000,
  max: Number(envConfig.limitRequest),
});
