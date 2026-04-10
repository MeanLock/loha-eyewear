"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ProductService } from "@/services/product/product.service";
import { Button } from "@/components/ui/button";
import { X, ImagePlus, Star } from "lucide-react";

export function ProductImages({ form }: { form: UseFormReturn<any> }) {
  const { control, register, setValue, watch } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "product_images" });
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    for (const file of acceptedFiles) {
      try {
        // Gọi API upload đã làm ở bước trước
        const res = await ProductService.uploadToCloudinary(file, "products/gallery");
        append({
          image_url: res.secure_url,
          sort_order: fields.length,
          is_primary: false,
        });
      } catch (e) { console.error("Upload gallery failed", e); }
    }
    setIsUploading(false);
  }, [append, fields.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  return (
    <div className="space-y-4 border p-4 rounded-lg bg-slate-50/30">
      <h3 className="font-bold flex items-center gap-2">Album ảnh phụ</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="relative aspect-square group border rounded-lg bg-white overflow-hidden shadow-sm">
            <img src={watch(`product_images.${index}.image_url`)} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1">
              <Button type="button" variant="destructive" size="icon" className="h-6 w-6 ml-auto" onClick={() => remove(index)}>
                <X className="h-3 w-3" />
              </Button>
              <Button 
                type="button" 
                variant={watch(`product_images.${index}.is_primary`) ? "default" : "secondary"}
                className="w-full text-[10px] h-6"
                onClick={() => {
                   fields.forEach((_, i) => setValue(`product_images.${i}.is_primary`, i === index));
                }}
              >
                <Star className="h-3 w-3 mr-1" /> {watch(`product_images.${index}.is_primary`) ? "Ảnh chính" : "Làm chính"}
              </Button>
            </div>
          </div>
        ))}
        
        <div {...getRootProps()} className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
          <input {...getInputProps()} />
          <ImagePlus className="text-slate-400" />
          <p className="text-[10px] text-slate-500 mt-1">{isDragActive ? "Thả vào đây" : "Thêm ảnh"}</p>
        </div>
      </div>
    </div>
  );
}