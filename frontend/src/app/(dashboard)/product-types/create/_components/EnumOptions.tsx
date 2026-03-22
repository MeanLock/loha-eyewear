"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Upload, Loader2 } from "lucide-react";
import { ProductTypeService } from "@/services/product-types/product-type.service";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
    attributeIndex: number;
}

export function EnumOptions({ attributeIndex }: Props) {
    const { control, setValue, watch, register, formState: { errors } } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `attributes.${attributeIndex}.options`,
    });

    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

    const handleFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'image/webp') {
            toast.error('Chỉ chấp nhận ảnh định dạng WebP thôi nhé!');
            e.target.value = ''; // Reset input
            return;
        }

        setUploadingIndex(index);
        try {
            const result = await ProductTypeService.uploadToCloudinary(file);
            setValue(`attributes.${attributeIndex}.options.${index}.image_url`, result.secure_url, {
                shouldValidate: true,
                shouldDirty: true,
            });
            toast.success("Tải ảnh phụ thành công!");
        } catch (error: any) {
            toast.error(error.message || "Tải ảnh thất bại");
        } finally {
            setUploadingIndex(null);
        }
    };

    return (
        <div className="space-y-4 mt-6 border p-4 rounded-lg bg-background">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Danh sách lựa chọn (Enum)</h4>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ value: "", image_url: "", sort_order: fields.length })}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm Options
                </Button>
            </div>

            <div className="space-y-3">
                {fields.map((field, optionIndex) => {
                    const imageUrl = watch(`attributes.${attributeIndex}.options.${optionIndex}.image_url`);
                    // @ts-ignore
                    const errorMessage = errors?.attributes?.[attributeIndex]?.options?.[optionIndex]?.value?.message;

                    return (
                        <div key={field.id} className="flex gap-3 items-start p-3 bg-muted/20 border rounded-md">
                            <div className="flex-1 space-y-2">
                                <div className="space-y-1">
                                    <Input
                                        placeholder="Giá trị (VD: Đen, Trắng...)"
                                        {...register(`attributes.${attributeIndex}.options.${optionIndex}.value`)}
                                    />
                                    {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/webp"
                                            className="hidden"
                                            id={`upload-${attributeIndex}-${optionIndex}`}
                                            onChange={(e) => handleFileUpload(optionIndex, e)}
                                        />
                                        <label htmlFor={`upload-${attributeIndex}-${optionIndex}`}>
                                            <div className="flex items-center gap-2 text-xs cursor-pointer border rounded px-3 py-2 hover:bg-muted font-medium transition-colors">
                                                {uploadingIndex === optionIndex ? (
                                                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                                                ) : (
                                                    <Upload className="w-4 h-4 text-muted-foreground" />
                                                )}
                                                {imageUrl ? "Thay ảnh minh hoạ" : "Tải ảnh minh hoạ"}
                                            </div>
                                        </label>
                                    </div>

                                    {imageUrl && (
                                        <div className="w-10 h-10 relative rounded border overflow-hidden bg-background">
                                            <Image src={imageUrl} alt="preview" fill className="object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(optionIndex)}
                                className="text-destructive hover:bg-destructive/10 shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    );
                })}
                {fields.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4 italic">
                        Chưa có lựa chọn nào. Vui lòng bấm "Thêm Options".
                    </p>
                )}
            </div>
        </div>
    );
}
