"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from "lucide-react";
import { ProductService } from "@/services/product/product.service";

export function ImageUpload({
  value,
  onChange,
}: {
  value: string; // public_id - dùng để lưu vào form, gửi backend
  onChange: (publicId: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const [previewUrl, setPreviewUrl] = useState<string>(() => {
    if (!value) return "";
    // Nếu value đã là một URL (secure_url) thì dùng luôn
    if (value.startsWith("http")) return value;
    // Nếu value là public_id, có thể build nhanh URL để preview
    // Lưu ý: Thay 'your_cloud_name' bằng tên cloud của bro
    return `https://res.cloudinary.com/dqxdl0nbs/image/upload/${value}`;
  });

  // Đồng bộ previewUrl khi value thay đổi từ bên ngoài (form reset chẳng hạn)
  useEffect(() => {
    if (!value) setPreviewUrl("");
  }, [value]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const result = await ProductService.uploadToCloudinary(
        file,
        "temp/products",
      );
      onChange(result.public_id);
      setPreviewUrl(result.secure_url);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Không thể tải ảnh lên");
    } finally {
      setLoading(false);
    }
  };

  // const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   setLoading(true);
  //   try {
  //     const result = await ProductService.uploadToCloudinary(
  //       file,
  //       "temp/products",
  //     );
  //     // Ghi public_id vào form (để backend rename)
  //     onChange(result.public_id);
  //     // Lưu secure_url local để preview
  //     setPreviewUrl(result.secure_url);
  //   } catch (error) {
  //     alert(error instanceof Error ? error.message : "Không thể tải ảnh lên");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex items-center gap-4">
      {value ? (
        <div className="relative w-32 h-32 border rounded-md overflow-hidden">
          <img
            src={previewUrl}
            alt="Preview"
            className="object-cover w-full h-full"
          />
          <button
            type="button"
            onClick={() => {
              onChange("");
              setPreviewUrl("");
            }}
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
