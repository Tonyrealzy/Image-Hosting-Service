import sharp from "sharp";
import crypto from "crypto";
import { Image } from "../models/image";
import db from "../repository/db";
import logger from "../utilities/logger";
import { buffer } from "stream/consumers";
import { uploadToSupabase } from "./uploadToSupabase";

export const uploadOriginal = async (image: Image) => {
  const normalized = await sharp(image.buffer).rotate().toBuffer();
  const sha256 = crypto.createHash("sha256").update(normalized).digest("hex");

  const existing = await db.image.findUnique({
    where: {
      sha256,
    },
  });

  if (existing) {
    logger.error("Duplicate existence, returning existing record.");
    return existing;
  }

  const ext = image.filename.split(".").pop()!;
  const storageKey = `${sha256}.${ext}`;
  const mime = `image/${ext}`;

  await uploadToSupabase({
    key: storageKey,
    buffer: normalized,
    contentType: mime,
  });

  const metadata = await sharp(normalized).metadata();

  const imageCreated = await db.image.create({
    data: {
      ownerId: image.ownerId ? image.ownerId : "user-123",
      sha256,
      mime,
      ext,
      width: metadata.width!,
      height: metadata.height!,
      bytes: buffer.length,
      storageKey,
      visibility: image.visibility,
    },
  });

  return imageCreated;
};
