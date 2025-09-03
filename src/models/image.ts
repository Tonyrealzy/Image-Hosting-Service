export interface Image {
  ownerId?: string;
  buffer: Buffer;
  filename: string;
  visibility: "public" | "private";
}

export interface SupabaseData {
  key: string;
  buffer: Buffer;
  contentType: string;
}
