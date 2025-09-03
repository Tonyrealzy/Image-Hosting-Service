import { AppError } from "../models/appError";
import db from "../repository/db";
import { supabase } from "../repository/supabaseClient";
import { envConfig } from "../utilities/config";

export const fetchImage = (sha256: string) => {
  return db.image.findUnique({ where: { sha256 } });
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
    throw new AppError(error.message, 500);
  }

  return data.signedUrl;
};
