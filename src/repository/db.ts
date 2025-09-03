import { PrismaClient } from "@prisma/client";
import { envConfig } from "../utilities/config";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error", "query"],
  });

if (envConfig.environment !== "production") globalForPrisma.prisma = db;

export default db;
