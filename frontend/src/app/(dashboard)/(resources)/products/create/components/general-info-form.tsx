import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductFormValues } from "./schema"; // Import type từ file schema của bạn
import { RichTextEditor } from "@/components/RichTextEditor";
import { ImageUpload } from "@/components/ImageUpload";

interface Props {
  form: UseFormReturn<any>; // Hoặc UseFormReturn<ProductFormValues>
}

export function GeneralInformation({ form }: Props) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  // Theo dõi trạng thái is_expirable để ẩn/hiện field liên quan
  const isExpirable = watch("is_expirable");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-800">
          1. Thông tin cơ bản
        </CardTitle>
        <CardDescription>
          Điền các thông tin cơ bản về sản phẩm như tên, mô tả, giá cả, hình
          ảnh...
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 mt-5">
        {/* Tên sản phẩm */}
        <div className="space-y-2">
          <Label htmlFor="name" className="font-semibold">
            Tên sản phẩm *
          </Label>
          <Input
            id="name"
            placeholder="Ví dụ: Gọng Kính HMK-001"
            {...register("name")}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-xs text-destructive">
              {errors.name.message as string}
            </p>
          )}
        </div>

        {/* Mô tả sản phẩm */}
        <div className="space-y-2">
          <Label>Mô tả sản phẩm *</Label>
          <RichTextEditor
            value={watch("description")}
            onChange={(val) =>
              setValue("description", val, { shouldValidate: true })
            }
          />
          {errors.description && (
            <p className="text-red-500 text-xs">
              {errors.description.message as string}
            </p>
          )}
        </div>

        {/* Ảnh sản phẩm */}
        <div className="space-y-2">
          <Label>Ảnh sản phẩm *</Label>
          <ImageUpload
            value={watch("image_url")}
            onChange={(url) =>
              setValue("image_url", url, { shouldValidate: true })
            }
          />
        </div>

        {/* Giá niêm yết & Giá tối thiểu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="listed_price" className="font-semibold">
              Giá niêm yết (VNĐ) *
            </Label>
            <Input
              id="listed_price"
              type="number"
              {...register("listed_price", { valueAsNumber: true })}
            />
            {errors.listed_price && (
              <p className="text-xs text-destructive">
                {errors.listed_price.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="minimum_price" className="font-semibold">
              Giá tối thiểu cho phép (VNĐ)
            </Label>
            <Input
              id="minimum_price"
              type="number"
              {...register("minimum_price", { valueAsNumber: true })}
            />
            {errors.minimum_price && (
              <p className="text-xs text-destructive">
                {errors.minimum_price.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Thuế & Ngày đặt hàng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center space-x-3 p-3 border rounded-md bg-slate-50">
            <Switch
              id="price_after_tax"
              checked={watch("price_after_tax")}
              onCheckedChange={(val) => setValue("price_after_tax", val)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="price_after_tax">Giá đã bao gồm thuế (VAT)</Label>
              <p className="text-xs text-muted-foreground">
                Bật nếu giá niêm yết đã tính phí VAT
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="min_order_range_count">
              Ngày chuẩn bị hàng (Dự kiến)
            </Label>
            <Input
              id="min_order_range_count"
              type="number"
              {...register("min_order_range_count", { valueAsNumber: true })}
            />
            {errors.min_order_range_count && (
              <p className="text-xs text-destructive">
                {errors.min_order_range_count.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Hạn sử dụng */}
        <div className="space-y-4 pt-2 border-t">
          <div className="flex items-center space-x-3">
            <Switch
              id="is_expirable"
              checked={isExpirable}
              onCheckedChange={(val) => {
                setValue("is_expirable", val);
                if (!val) setValue("minimum_saleable_range_count", 0);
              }}
            />
            <Label htmlFor="is_expirable" className="font-bold">
              Sản phẩm có hạn sử dụng?
            </Label>
          </div>

          {isExpirable && (
            <div className="space-y-2 pl-9 animate-in fade-in slide-in-from-top-2">
              <Label htmlFor="minimum_saleable_range_count">
                Khoảng cách ngày bán tối thiểu (Ngày) *
              </Label>
              <Input
                id="minimum_saleable_range_count"
                type="number"
                placeholder="Ví dụ: 30"
                {...register("minimum_saleable_range_count", {
                  valueAsNumber: true,
                })}
              />
              <p className="text-[11px] text-amber-600 italic">
                Sản phẩm phải còn ít nhất số ngày này tính từ ngày hết hạn mới
                được phép bán.
              </p>
              {errors.minimum_saleable_range_count && (
                <p className="text-xs text-destructive">
                  {errors.minimum_saleable_range_count.message as string}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
