import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  port: process.env.PORT || 4000,
  limitTime: process.env.LIMIT_TIME || 1, // 1 minute
  limitRequest: process.env.LIMIT_REQUEST || 50, // limit each IP to 50 requests per windowMs,
  environment: process.env.NODE_ENV || "production",
  databaseUrl: process.env.DATABASE_URL || "",
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseKey: process.env.SUPABASE_ANON_KEY || "",
  urlTimeout: process.env.URL_TIMEOUT || 3600,
};
