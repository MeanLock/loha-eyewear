"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from "lucide-react";
import { ProductService } from "@/services/product/product.service";

export function ImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const result = await ProductService.uploadToCloudinary(
        file,
        "temp/products",
      );
      onChange(result.secure_url);
    } catch (error) {
      // Thêm thông báo lỗi cho người dùng thấy
      alert(error instanceof Error ? error.message : "Không thể tải ảnh lên");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {value ? (
        <div className="relative w-32 h-32 border rounded-md overflow-hidden">
          <img
            src={value}
            alt="Preview"
            className="object-cover w-full h-full"
          />
          <button
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <label className="w-32 h-32 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50">
          <UploadCloud className="text-slate-400" />
          <span className="text-xs text-slate-500 mt-2">
            {loading ? "Uploading..." : "Tải ảnh lên"}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            accept="image/*"
          />
        </label>
      )}
    </div>
  );
}
