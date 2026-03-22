"use client";

import { useForm, useFieldArray, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2, Save, ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { ValidationRules } from "./_components/ValidationRules";
import { EnumOptions } from "./_components/EnumOptions";
import { ProductTypeService } from "@/services/product-types/product-type.service";
import { CreateProductTypeSchema, CreateProductTypeInput } from "@/lib/validations/product-type";

export default function CreateProductTypePage() {
    const router = useRouter();

    const methods = useForm<any>({
        resolver: zodResolver(CreateProductTypeSchema),
        defaultValues: {
            name: "",
            attributes: [],
        },
    });

    const { control, handleSubmit, register, watch, formState: { isSubmitting, errors } } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "attributes",
    });

    const onSubmit = async (data: any) => {
        try {
            console.log("Data nè: ", data);
            await ProductTypeService.createProductType(data as CreateProductTypeInput);
            toast.success("Tạo loại sản phẩm thành công!");
            router.push("/product-types");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Đã xảy ra lỗi khi tạo loại sản phẩm");
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Thêm Loại Sản Phẩm</h2>
                        <p className="text-muted-foreground mt-2">Thêm loại sản phẩm mới vào hệ thống.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/product-types">
                            <Button variant="outline" type="button">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Quay lại
                            </Button>
                        </Link>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Đang tạo..." : "Tạo loại sản phẩm mới"}
                            <PlusCircle className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 sm:p-8">
                    <div className="max-w-md space-y-2">
                        <Label className="text-base text-card-foreground">Tên Loại Sản Phẩm</Label>
                        <Input placeholder="VD: Gọng kính, Tròng kính..." {...register("name")} />
                        {errors.name && <p className="text-sm font-medium text-destructive">{errors.name.message as string}</p>}
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                    <div className="p-6 sm:p-8 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold">Thuộc Tính (Attributes)</h3>
                            <p className="text-sm text-muted-foreground">Định nghĩa các thông số cụ thể cho nhóm sản phẩm này (Màu sắc, Chất liệu...).</p>
                        </div>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => append({
                                name: "",
                                key: "",
                                data_type: "string",
                                is_required: false,
                                sort_order: fields.length,
                                validation_rules: {},
                                options: []
                            })}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Thêm Thuộc Tính
                        </Button>
                    </div>

                    <div className="p-2 sm:p-6 bg-muted/10">
                        {fields.length === 0 ? (
                            <div className="py-12 text-center flex flex-col items-center justify-center text-muted-foreground bg-card rounded-lg border border-dashed">
                                <p>Chưa có thuộc tính nào được định nghĩa.</p>
                                <p className="text-sm mt-1">Bấm "Thêm Thuộc Tính" để bắt đầu thiết lập.</p>
                            </div>
                        ) : (
                            <Accordion className="w-full space-y-4">
                                {fields.map((field, index) => {
                                    // @ts-ignore
                                    const attrErrors = errors.attributes?.[index];

                                    return (
                                        <AccordionItem
                                            key={field.id}
                                            value={field.id}
                                            className="border rounded-xl bg-card px-4 py-2 shadow-sm data-[state=open]:ring-1 data-[state=open]:ring-primary/20 transition-all"
                                        >
                                            <div className="flex items-center w-full gap-4">
                                                <span className="font-medium text-base flex items-center">
                                                    <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs mr-3">#{index + 1}</span>
                                                    {watch(`attributes.${index}.name`) || "Thuộc tính chưa đặt tên"}
                                                </span>
                                                <AccordionTrigger className="hover:no-underline flex-1 text-left px-2 py-3">
                                                    <div className="flex flex-col gap-1 w-full text-foreground/90">
                                                    </div>
                                                </AccordionTrigger>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0 mt-1 mr-2"
                                                    onClick={() => remove(index)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            <AccordionContent className="p-4 pt-2 border-t mt-2 flex flex-col gap-6">
                                                <div className="grid my-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    <div className="space-y-3">
                                                        <Label>Tên thuộc tính</Label>
                                                        <Input placeholder="VD: Màu sắc khung" {...register(`attributes.${index}.name`)} />
                                                        {attrErrors?.name && <p className="text-sm text-destructive">{attrErrors.name.message}</p>}
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label>Mã trường lưu trữ (Key)</Label>
                                                        <Input placeholder="VD: frame_color" {...register(`attributes.${index}.key`)} />
                                                        <p className="text-[0.8rem] text-muted-foreground">Dùng cho kỹ thuật, không dấu, không dấu cách</p>
                                                        {attrErrors?.key && <p className="text-sm text-destructive">{attrErrors.key.message}</p>}
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label>Định dạng dữ liệu</Label>
                                                        <Controller
                                                            control={control}
                                                            name={`attributes.${index}.data_type`}
                                                            render={({ field }) => (
                                                                <Select onValueChange={field.onChange} value={field.value}>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Chọn định dạng" />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="w-full">
                                                                        <SelectItem value="string">Văn bản (String)</SelectItem>
                                                                        <SelectItem value="number">Chữ số (Number)</SelectItem>
                                                                        <SelectItem value="boolean">Có/Không (Boolean)</SelectItem>
                                                                        <SelectItem value="date">Ngày tháng (Date)</SelectItem>
                                                                        <SelectItem value="enum">Lựa chọn (Enum Box)</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            )}
                                                        />
                                                        {attrErrors?.data_type && <p className="text-sm text-destructive">{attrErrors.data_type.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-x-8 gap-y-4 items-center bg-muted/40 p-4 rounded-md border border-dashed">
                                                    <div className="flex flex-row items-center space-x-3 space-y-0">
                                                        <Controller
                                                            control={control}
                                                            name={`attributes.${index}.is_required`}
                                                            render={({ field }) => (
                                                                <Checkbox
                                                                    id={`req-${index}`}
                                                                    checked={!!field.value}
                                                                    onCheckedChange={field.onChange}
                                                                    className="w-5 h-5 border-2 border-muted-foreground/50 data-[state=checked]:border-primary"
                                                                />
                                                            )}
                                                        />
                                                        <Label htmlFor={`req-${index}`} className="font-medium cursor-pointer">Bắt buộc phải nhập ?</Label>
                                                    </div>

                                                    <div className="flex flex-row items-center space-x-3 space-y-0">
                                                        <Label className="font-medium whitespace-nowrap">Thứ tự hiển thị:</Label>
                                                        <Input type="number" className="w-24 bg-background" {...register(`attributes.${index}.sort_order`)} />
                                                    </div>
                                                </div>

                                                {/* Validation Rules Section */}
                                                <div className="mt-4 pt-4 border-t border-muted">
                                                    <ValidationRules index={index} />
                                                </div>

                                                {/* Enum Options Section */}
                                                {watch(`attributes.${index}.data_type`) === "enum" && (
                                                    <div className="mt-4">
                                                        <EnumOptions attributeIndex={index} />
                                                    </div>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    )
                                })}
                            </Accordion>
                        )}
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}