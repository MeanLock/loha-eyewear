"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CommonRules({ index }: { index: number }) {
    const { register } = useFormContext();
    const prefix = `attributes.${index}.validation_rules`;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 border-t pt-4">
            <div className="space-y-3">
                <Label>Chữ gợi ý (Placeholder)</Label>
                <Input placeholder="VD: Vui lòng nhập..." {...register(`${prefix}.placeholder`)} />
            </div>
            <div className="space-y-3">
                <Label>Thông báo lỗi custom</Label>
                <Input placeholder="VD: Giá trị không hợp lệ!" {...register(`${prefix}.error_message`)} />
                <p className="text-[0.8rem] text-muted-foreground">Ghi đè thông báo mặc định</p>
            </div>
        </div>
    );
}
