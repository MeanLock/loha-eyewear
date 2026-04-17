"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EnumRules({ index }: { index: number }) {
    const { register } = useFormContext();
    const prefix = `attributes.${index}.validation_rules`;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="space-y-2">
                <Label>Số lựa chọn tối thiểu</Label>
                <Input type="number" placeholder="VD: 1" {...register(`${prefix}.min_options`)} />
                <p className="text-[0.8rem] text-muted-foreground">Bắt buộc chọn ít nhất n mục</p>
            </div>
            <div className="space-y-2">
                <Label>Số lựa chọn tối đa</Label>
                <Input type="number" placeholder="VD: 3" {...register(`${prefix}.max_options`)} />
                <p className="text-[0.8rem] text-muted-foreground">Được chọn tối đa n mục (nếu chọn nhiều)</p>
            </div>
        </div>
    );
}
