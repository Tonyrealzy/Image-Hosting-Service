import { AppError } from "../models/appError";
import { SupabaseData } from "../models/image";
import { supabase } from "../repository/supabaseClient";
import logger from "../utilities/logger";

export const uploadToSupabase = async (request: SupabaseData) => {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(request.key, request.buffer, {
      cacheControl: "3600",
      upsert: false,
      contentType: request.contentType,
    });

  if (error) {
    logger.error("Upload error: ", error);
    throw new AppError(error.message, 500);
  }

  return data;
};
