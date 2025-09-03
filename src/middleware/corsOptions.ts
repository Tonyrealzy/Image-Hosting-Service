import { CorsOptions } from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5173",
  "https://my-frontend.com",
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
