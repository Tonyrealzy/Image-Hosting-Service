import cron from "node-cron";
import logger from "../utilities/logger";
import { envConfig } from "../utilities/config";

export const cronJob = () => {
  cron.schedule("0 7-19 * * *", () => {
    logger.info(
      `Task running to keep server active on ${envConfig.environment} mode!`
    );
  });
};
