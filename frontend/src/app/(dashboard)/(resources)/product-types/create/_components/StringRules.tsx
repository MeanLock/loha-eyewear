// @ts-nocheck
"use client";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function StringRules({ index }: { index: number }) {
    const { register, control } = useFormContext();
    const prefix = `attributes.${index}.validation_rules`;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="space-y-3">
                <Label>Độ dài tối thiểu</Label>
                <Input type="number" placeholder="VD: 1 ký tự" {...register(`${prefix}.min_length`)} />
            </div>
            <div className="space-y-3">
                <Label>Độ dài tối đa</Label>
                <Input type="number" placeholder="VD: 255 ký tự" {...register(`${prefix}.max_length`)} />
            </div>

            <div className="col-span-1 sm:col-span-2 space-y-3">
                <Label>Loại UI hiển thị</Label>
                <Controller
                    control={control}
                    name={`${prefix}.ui_type`}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn loại giao diện (text, textarea, rich-text...)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="text">Chữ ngắn (Text)</SelectItem>
                                <SelectItem value="textarea">Đoạn văn (Textarea)</SelectItem>
                                <SelectItem value="rich-text">Trình soạn thảo văn bản (Rich-text)</SelectItem>
                                <SelectItem value="color_picker">Mã màu (Color Picker)</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>

            <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/30 transition-colors">
                <Controller
                    control={control}
                    name={`${prefix}.is_spaceable`}
                    render={({ field }) => (
                        <Checkbox
                            id={`is_spaceable_${index}`}
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                            className="w-5 h-5 border-2 border-muted-foreground/50 data-[state=checked]:border-primary"
                        />
                    )}
                />
                <div className="space-y-1.5 leading-none">
                    <Label htmlFor={`is_spaceable_${index}`} className="cursor-pointer font-medium text-base">Cho phép khoảng trắng</Label>
                </div>
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/30 transition-colors">
                <Controller
                    control={control}
                    name={`${prefix}.is_unique`}
                    render={({ field }) => (
                        <Checkbox
                            id={`is_unique_${index}`}
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 w-5 h-5 border-2 border-muted-foreground/50 data-[state=checked]:border-primary"
                        />
                    )}
                />
                <div className="space-y-1.5 leading-none">
                    <Label htmlFor={`is_unique_${index}`} className="cursor-pointer font-medium text-base">Giá trị phải là duy nhất ?</Label>
                </div>
            </div>

            <div className="col-span-1 sm:col-span-2 space-y-3">
                <Label>Biểu thức chính quy (Regex Pattern)</Label>
                <Input placeholder="VD: ^[A-Z]+$" {...register(`${prefix}.regex_pattern`)} />
                <p className="text-[0.85rem] text-muted-foreground">Pattern tự định nghĩa (nếu cần)</p>
            </div>
        </div>
    );
}
