import * as z from "zod";
import { ProductTypeAttribute } from "@/types/product-type.type";

export const generateAttributeSchema = (attributes: ProductTypeAttribute[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  attributes.forEach((attr) => {
    let s: z.ZodTypeAny = z.any();
    const rules = attr.validation_rules;
    const errorMsg = rules.error_message;

    switch (attr.data_type) {
      case "string":
        // Khởi tạo đơn giản, Zod sẽ dùng message mặc định nếu không khớp
        let strSchema = z.string();
        
        if (rules.min_length) strSchema = strSchema.min(rules.min_length, errorMsg);
        if (rules.max_length) strSchema = strSchema.max(rules.max_length, errorMsg);
        if (rules.regex_pattern) strSchema = strSchema.regex(new RegExp(rules.regex_pattern), errorMsg);
        
        s = strSchema;
        break;

      case "number":
        // Dùng coerce để ép kiểu từ string (input) sang number
        let numSchema = z.coerce.number({ 
          invalid_type_error: errorMsg || "Phải là số" 
        } as any); // Ép kiểu 'as any' ở đây để vượt qua lỗi Overload của Zod

        if (rules.min_value !== undefined) numSchema = numSchema.min(rules.min_value, errorMsg);
        if (rules.max_value !== undefined) numSchema = numSchema.max(rules.max_value, errorMsg);
        if (rules.is_int) numSchema = numSchema.int(errorMsg || "Phải là số nguyên");
        
        s = numSchema;
        break;

      case "boolean":
        s = z.boolean().default(rules.default_value ?? false);
        break;

      case "date":
        // Validate date string
        s = z.string().refine((val) => !isNaN(Date.parse(val)), {
          message: errorMsg || "Ngày không hợp lệ",
        });
        break;

      case "enum":
        // Đối với enum, value sẽ là mảng các ID option đã chọn
        let enumSchema = z.array(z.string());
        if (rules.min_options) enumSchema = enumSchema.min(rules.min_options, errorMsg);
        if (rules.max_options) enumSchema = enumSchema.max(rules.max_options, errorMsg);
        s = enumSchema;
        break;
    }

    // 2. Xử lý Required động
    if (attr.is_required) {
      if (attr.data_type === "string") {
        s = (s as z.ZodString).min(1, errorMsg || "Trường này là bắt buộc");
      } else if (attr.data_type === "enum") {
        s = (s as z.ZodArray<any>).min(1, errorMsg || "Vui lòng chọn ít nhất một tùy chọn");
      }
    } else {
      // Nếu không bắt buộc, cho phép null hoặc undefined
      s = s.nullish();
    }

    shape[attr.key] = s;
  });

  return z.object(shape);
};