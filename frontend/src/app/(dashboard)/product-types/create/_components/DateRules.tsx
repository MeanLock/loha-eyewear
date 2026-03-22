// @ts-nocheck
"use client";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function DateRules({ index }: { index: number }) {
    const { register, control } = useFormContext();
    const prefix = `attributes.${index}.validation_rules`;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="space-y-2">
                <Label>Ngày nhỏ nhất (Min Date)</Label>
                <Input type="date" {...register(`${prefix}.min_date`)} />
            </div>
            <div className="space-y-2">
                <Label>Ngày lớn nhất (Max Date)</Label>
                <Input type="date" {...register(`${prefix}.max_date`)} />
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 col-span-1 sm:col-span-2 hover:bg-muted/30 transition-colors">
                <Controller
                    control={control}
                    name={`${prefix}.is_default_date_today`}
                    render={({ field }) => (
                        <Checkbox
                            id={`is_default_date_today_${index}`}
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 w-5 h-5 border-2 border-muted-foreground/50 data-[state=checked]:border-primary"
                        />
                    )}
                />
                <div className="space-y-1.5 leading-none">
                    <Label htmlFor={`is_default_date_today_${index}`} className="cursor-pointer font-medium text-base">Mặc định là ngày hôm nay</Label>
                    <p className="text-[0.85rem] text-muted-foreground leading-snug">Tự động điền ngày hiện tại khi tạo sản phẩm</p>
                </div>
            </div>
        </div>
    );
}
