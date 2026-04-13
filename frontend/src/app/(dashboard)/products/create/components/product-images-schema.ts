import { z } from "zod";

export const productImagesSchema = z.array(
  z.object({
    sort_order: z.number().int().min(0, "Thứ tự sắp xếp không được âm"),
    image_url: z.string(),
    is_primary: z.boolean().default(false),
    preview_url: z.string().optional(),
  })
);