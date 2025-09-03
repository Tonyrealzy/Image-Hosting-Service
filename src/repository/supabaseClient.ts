import { createClient } from "@supabase/supabase-js";
import { envConfig } from "../utilities/config";

export const supabase = createClient(
  envConfig.supabaseUrl,
  envConfig.supabaseKey
);
