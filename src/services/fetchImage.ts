import { AppError } from "../models/appError";
import db from "../repository/db";
import { supabase } from "../repository/supabaseClient";
import { envConfig } from "../utilities/config";
import logger from "../utilities/logger";

export const fetchImage = (storageKey: string) => {
  const image = db.image.findUnique({ where: { storageKey } });

  if (!image)
    throw new AppError(`Image with storageKey ${storageKey} not found.`, 404);

  return image;
};

export const getImageUrl = (key: string) => {
  let url = `${envConfig.supabaseUrl}/storage/v1/object/sign/Realzy/${key}`;
  return url;
};

export const getSignedUrl = (key: string) => {
  const { data } = supabase.storage.from("images").getPublicUrl(key);
  return data.publicUrl;
};

export const getPrivateSignedUrl = async (key: string) => {
  const { data, error } = await supabase.storage
    .from("images")
    .createSignedUrl(key, Number(envConfig.urlTimeout));
  if (error) {
    logger.error("Error retrieving signedUrl: ", error?.message);
    throw new AppError(error.message, 500);
  }

  return data.signedUrl;
};
