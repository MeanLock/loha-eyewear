// src/components/products/create-form/schema.ts
import * as z from "zod";
import { productImagesSchema } from "./product-images-schema";
import { quantityConfigsSchema } from "./quantity_config-schema";

export const getFinalSchema = (dynamicSchema: z.ZodObject<any>) => {
  return z
    .object({
      name: z.string().min(1, "Tên không được để trống"),
      description: z.string().min(1, "Mô tả không được để trống"),
      image_url: z.string(),
      listed_price: z.number().min(0, "Giá niêm yết không được âm"),
      minimum_price: z.number().min(0, "Giá tối thiểu không được âm"),
      price_after_tax: z.boolean().default(false),
      min_order_range_count: z.number().int().min(1).default(1),
      is_expirable: z.boolean().default(false),
      minimum_saleable_range_count: z.number().int().min(0).default(0),
      parent_id: z
        .string()
        .nullable()
        .optional()
        .transform((val) => (val === "" ? null : val)), // Chuyển "" thành null khi không chọn
      // Thay thế z.record bằng dynamicSchema truyền vào
      attribute_values: dynamicSchema,
      product_images: productImagesSchema,
      quantity_configs: quantityConfigsSchema,
    })
    .refine((data) => data.listed_price > data.minimum_price, {
      message: "Giá niêm yết phải lớn hơn giá tối thiểu",
      path: ["listed_price"],
    })
    .refine(
      (data) => {
        if (data.is_expirable) return data.minimum_saleable_range_count >= 1;
        return true;
      },
      {
        message: "Nếu sản phẩm có hạn sử dụng, khoảng cách ngày bán phải >= 1",
        path: ["minimum_saleable_range_count"],
      },
    );
};

const dummySchema = getFinalSchema(z.object({}));
export type ProductFormValues = z.infer<typeof dummySchema>;
