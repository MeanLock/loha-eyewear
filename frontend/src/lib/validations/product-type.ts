import { z } from "zod";

export const AttributeDataTypeEnum = z.enum(["number", "string", "boolean", "date", "enum"]);
export type AttributeDataType = z.infer<typeof AttributeDataTypeEnum>;

export const AttributeEnumOptionSchema = z.object({
    value: z.string().min(1, "Giá trị không được để trống"),
    image_url: z.string().optional(),
    sort_order: z.coerce.number().int().default(0),
});

export const ValidationRulesSchema = z.object({
    // Number
    is_int: z.boolean().optional(),
    min_value: z.coerce.number().optional(),
    max_value: z.coerce.number().optional(),
    is_step: z.boolean().optional(),
    step: z.coerce.number().optional(),
    is_negativeable: z.boolean().optional(),
    unit_symbol: z.string().optional(),

    // String
    min_length: z.coerce.number().optional(),
    max_length: z.coerce.number().optional(),
    ui_type: z.string().optional(),
    is_spaceable: z.boolean().optional(),
    is_unique: z.boolean().optional(),
    is_uppercase: z.boolean().optional(),
    is_lowercase: z.boolean().optional(),
    regex_pattern: z.string().optional(),

    // Boolean (can be used for other types too)
    default_value: z.any().optional(),

    // Date
    min_date: z.string().optional(),
    max_date: z.string().optional(),
    is_default_date_today: z.boolean().optional(),
    range_from_today: z.coerce.number().optional(),
    range_to_today: z.coerce.number().optional(),

    // Enum
    min_options: z.coerce.number().optional(),
    max_options: z.coerce.number().optional(),

    // All Types
    placeholder: z.string().optional(),
    error_message: z.string().optional(),
});

export const CreateProductTypeConfigAttributeSchema = z.object({
    name: z.string().min(1, "Tên thuộc tính không được để trống"),
    key: z.string().min(1, "Mã thuộc tính không được để trống")
        .regex(/^[a-zA-Z0-9_]+$/, "Mã thuộc tính chỉ được chứa chữ cái, số và dấu gạch dưới"),
    data_type: AttributeDataTypeEnum,
    is_required: z.boolean().default(false),
    sort_order: z.coerce.number().int().default(0),
    validation_rules: ValidationRulesSchema.optional().default({}),
    options: z.array(AttributeEnumOptionSchema).optional().default([]),
});

export const CreateProductTypeSchema = z.object({
    name: z.string().min(1, "Tên loại sản phẩm không được để trống"),
    attributes: z.array(CreateProductTypeConfigAttributeSchema),
});

export type CreateProductTypeInput = z.infer<typeof CreateProductTypeSchema>;
export type CreateProductTypeConfigAttributeInput = z.infer<typeof CreateProductTypeConfigAttributeSchema>;
export type ValidationRulesInput = z.infer<typeof ValidationRulesSchema>;
export type AttributeEnumOptionInput = z.infer<typeof AttributeEnumOptionSchema>;
