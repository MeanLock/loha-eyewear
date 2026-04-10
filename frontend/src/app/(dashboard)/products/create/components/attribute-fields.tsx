// components/products/attribute-fields.tsx
import { ProductTypeAttribute } from "@/types/product-type.type";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox"; // Đảm bảo đã cài shadcn checkbox
import { Button } from "@/components/ui/button";

interface Props {
  attributes: ProductTypeAttribute[];
  form: UseFormReturn<any>;
}

export function AttributeFields({ attributes, form }: Props) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const handleCheckUnique = (attributeId: string, value: any) => {};
  return (
    <div className="space-y-4">
      {attributes
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((attr) => {
          const fieldName = `attribute_values.${attr.key}`;
          const rules = attr.validation_rules;
          const attributeErrors = errors.attribute_values as
            | Record<string, any>
            | undefined;
          const error = attributeErrors?.[attr.key];
          const currentValues = watch(fieldName) || [];

          return (
            <div
              key={attr.id}
              className="space-y-2 p-4 border rounded-lg bg-white"
            >
              <label className="text-sm font-bold flex justify-between">
                <span>
                  {attr.name}{" "}
                  {attr.is_required && <span className="text-red-500">*</span>}
                </span>
                {rules.unit_symbol && (
                  <span className="text-muted-foreground font-normal italic">
                    {rules.unit_symbol}
                  </span>
                )}
              </label>
              <label className="text-sm font-light italic text-gray-600 flex justify-between">
                {attr.validation_rules["placeholder"]}
              </label>
              {/* 1. STRING */}
              {attr.data_type === "string" && (
                <>
                  <Input
                    placeholder={rules.placeholder || "Nhập chuỗi..."}
                    {...register(fieldName)}
                    onChange={(e) => {
                      let val = e.target.value;
                      if (rules.is_uppercase) val = val.toUpperCase();
                      if (rules.is_lowercase) val = val.toLowerCase();
                      if (rules.is_spaceable === false)
                        val = val.replace(/\s/g, "");
                      setValue(fieldName, val, { shouldValidate: true });
                    }}
                  />
                  {rules.is_unique && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleCheckUnique(attr.id, watch(fieldName))
                      }
                    >
                      Kiểm tra trùng lặp
                    </Button>
                  )}
                </>
              )}

              {/* 2. NUMBER */}
              {attr.data_type === "number" && (
                <Input
                  type="number"
                  step={rules.is_step ? rules.step : "any"}
                  placeholder={rules.placeholder}
                  {...register(fieldName, { valueAsNumber: true })}
                />
              )}

              {/* 3. BOOLEAN */}
              {attr.data_type === "boolean" && (
                <div className="flex items-center gap-2">
                  <Switch
                    checked={!!watch(fieldName)}
                    onCheckedChange={(val) =>
                      setValue(fieldName, val, { shouldValidate: true })
                    }
                  />
                  <span className="text-xs">
                    {watch(fieldName) ? "Có" : "Không"}
                  </span>
                </div>
              )}

              {/* 4. DATE */}
              {attr.data_type === "date" && (
                <Input type="date" {...register(fieldName)} />
              )}

              {/* 5. ENUM */}
              {attr.data_type === "enum" && (
                <>
                  <div className="w-full flex items-center justify-start">
                    <p className="text-sm font-medium text-primary">
                      {attr.validation_rules["max_options"] === 1
                        ? "Chọn một giá trị duy nhất!"
                        : attr.validation_rules["max_options"] &&
                            attr.validation_rules["max_options"] > 1
                          ? `Chọn tối thiểu 1 giá trị, tối đa ${attr.validation_rules["max_options"]} giá trị`
                          : `Chọn tối thiểu 1 giá trị`}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                    {attr.enum_options
                      ?.sort((a, b) => a.sort_order - b.sort_order)
                      .map((opt) => {
                        const currentValues = watch(fieldName) || [];
                        const isSelected = currentValues.includes(opt.id);

                        return (
                          <div
                            key={opt.id}
                            className={`
                            relative flex flex-col items-center border-2 rounded-xl p-3 transition-all cursor-pointer group
                            ${
                              isSelected
                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
                            }
                          `}
                            onClick={() => {
                              // Click vào nguyên cái card cũng sẽ toggle checkbox
                              const newValues = isSelected
                                ? currentValues.filter(
                                    (v: string) => v !== opt.id,
                                  )
                                : [...currentValues, opt.id];
                              setValue(fieldName, newValues, {
                                shouldValidate: true,
                              });
                            }}
                          >
                            {/* Checkbox dấu tích nhỏ ở góc */}
                            <div className="absolute top-2 right-2 z-10">
                              <Checkbox
                                id={opt.id}
                                checked={!!isSelected}
                                onCheckedChange={() => {}} // Đã handle ở div onClick
                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                            </div>

                            {/* Ảnh lớn hơn để làm nổi bật option */}
                            {opt.image_url && (
                              <div className="w-full flex items-center justify-center p-5 aspect-square mb-3 overflow-hidden rounded-lg bg-slate-50">
                                <img
                                  src={opt.image_url}
                                  alt={opt.value}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                              </div>
                            )}

                            {/* Nhãn văn bản */}
                            <label
                              className={`
                                text-sm text-center font-semibold break-words w-full px-1 cursor-pointer
                                ${isSelected ? "text-primary" : "text-slate-700"}
                            `}
                            >
                              {opt.value}
                            </label>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}

              {/* HIỂN THỊ LỖI ĐỘNG TỪ ZOD */}
              {error && (
                <p className="text-xs text-red-500 font-medium">
                  {error.message}
                </p>
              )}
            </div>
          );
        })}
    </div>
  );
}
