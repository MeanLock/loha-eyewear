// @ts-nocheck
"use client";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function BooleanRules({ index }: { index: number }) {
    const { control } = useFormContext();
    const prefix = `attributes.${index}.validation_rules`;

    return (
        <div className="grid grid-cols-1 gap-4 mt-2">
            <div className="flex flex-row items-start space-x-3 space-y-3 rounded-md border p-4 hover:bg-muted/30 transition-colors">
                <Controller
                    control={control}
                    name={`${prefix}.default_value`}
                    render={({ field }) => (
                        <Checkbox
                            id={`default_value_${index}`}
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 w-5 h-5 border-2 border-muted-foreground/50 data-[state=checked]:border-primary"
                        />
                    )}
                />
                <div className="space-y-1.5 leading-none">
                    <Label htmlFor={`default_value_${index}`} className="cursor-pointer font-medium text-base">Giá trị mặc định (Default Value)</Label>
                    <p className="text-[0.85rem] text-muted-foreground leading-snug">Giá trị này sẽ được chọn mặc định khi tạo sản phẩm</p>
                </div>
            </div>
        </div>
    );
}
