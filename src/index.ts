import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { envConfig } from "./utilities/config";
import { errorHandler } from "./middleware/errorHandler";
import { corsOptions } from "./middleware/corsOptions";
import { limiter } from "./middleware/rateLimiting";
import logger from "./utilities/logger";
import uploadImageRoute from "./routes/uploadImages";
import fetchImageRoute from "./routes/fetchImages";
import { setupSwagger } from "./static/swagger";
import { cronJob } from "./services/cronJob";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

setupSwagger(app);

app.use("/upload", uploadImageRoute);
app.use("/fetch", fetchImageRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

app.use(errorHandler);

cronJob();

app.listen(envConfig.port, () => {
  logger.info(
    `Server is running on port ${envConfig.port} in ${envConfig.environment} mode!`
  );
});
