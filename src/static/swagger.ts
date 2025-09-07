import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Image Upload API",
      version: "1.0.0",
      description:
        "API for uploading and retrieving images with Supabase + Prisma",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Local server",
      },
      {
        url: "https://image-hosting-service.onrender.com",
        description: "Production server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
