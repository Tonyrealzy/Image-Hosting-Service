import { AppError } from "../models/appError";
import { SupabaseData } from "../models/image";
import { supabase } from "../repository/supabaseClient";

export const uploadToSupabase = async (request: SupabaseData) => {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(request.key, request.buffer, {
      cacheControl: "3600",
      upsert: false,
      contentType: request.contentType,
    });

  if (error) throw new AppError(error.message, 500);

  return data;
};
