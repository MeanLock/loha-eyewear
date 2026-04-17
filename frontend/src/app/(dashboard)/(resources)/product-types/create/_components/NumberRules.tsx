// @ts-nocheck
"use client";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function NumberRules({ index }: { index: number }) {
    const { register, control } = useFormContext();
    const prefix = `attributes.${index}.validation_rules`;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="space-y-3">
                <Label>Giá trị nhỏ nhất</Label>
                <Input type="number" placeholder="VD: 0" {...register(`${prefix}.min_value`)} />
            </div>
            <div className="space-y-3">
                <Label>Giá trị lớn nhất</Label>
                <Input type="number" placeholder="VD: 100" {...register(`${prefix}.max_value`)} />
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/30 transition-colors">
                <Controller
                    control={control}
                    name={`${prefix}.is_int`}
                    render={({ field }) => (
                        <Checkbox
                            id={`is_int_${index}`}
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 w-5 h-5 border-2 border-muted-foreground/50 data-[state=checked]:border-primary"
                        />
                    )}
                />
                <div className="space-y-1.5 leading-none">
                    <Label htmlFor={`is_int_${index}`} className="cursor-pointer font-medium text-base">Số nguyên (Integer)</Label>
                    <p className="text-[0.85rem] text-muted-foreground leading-snug">Chỉ cho phép số nguyên, không được nhập số thập phân</p>
                </div>
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/30 transition-colors">
                <Controller
                    control={control}
                    name={`${prefix}.is_negativeable`}
                    render={({ field }) => (
                        <Checkbox
                            id={`is_negativeable_${index}`}
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 w-5 h-5 border-2 border-muted-foreground/50 data-[state=checked]:border-primary"
                        />
                    )}
                />
                <div className="space-y-1.5 leading-none">
                    <Label htmlFor={`is_negativeable_${index}`} className="cursor-pointer font-medium text-base">Cho phép số âm</Label>
                    <p className="text-[0.85rem] text-muted-foreground leading-snug">Cho phép người dùng nhập giá trị bé hơn 0</p>
                </div>
            </div>

            <div className="col-span-1 sm:col-span-2 space-y-3">
                <Label>Đơn vị (Symbol)</Label>
                <Input placeholder="VD: kg, cm, mm..." {...register(`${prefix}.unit_symbol`)} />
                <p className="text-[0.85rem] text-muted-foreground">Hiển thị ở đuôi input (nếu có)</p>
            </div>
        </div>
    );
}
