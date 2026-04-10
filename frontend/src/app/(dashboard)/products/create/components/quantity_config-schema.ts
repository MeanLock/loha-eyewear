import { z } from "zod";
import { is } from "zod/v4/locales";

export const quantityConfigsSchema = z
  .array(
    z.object({
      unit_name: z.string().min(1, "Tên đơn vị không được để trống"),
      is_base_unit: z.boolean().default(false),
      conversion_rate: z.number().min(0, "Tỷ lệ quy đổi không được âm"),
      is_integer_only: z.boolean().default(false),
    }),
  )
  .refine((items) => items.filter((i) => i.is_base_unit).length === 1, {
    message: "Phải có duy nhất 1 đơn vị gốc",
    path: ["quantity_configs"], // lỗi sẽ trỏ về cả mảng
  });
