
import { CreateProductTypeInput } from "@/lib/validations/product-type";
import { apiClient } from "../api-client";

export const ProductTypeService = {
    /**
     * Tạo loại sản phẩm mới
     */
    async createProductType(data: CreateProductTypeInput) {
        const response = await apiClient.post("/product-types", data);
        return response.data;
    },

    /**
     * Upload ảnh trực tiếp thông qua Next.js Server API Route nội bộ
     * Đảm bảo không bị lộ thông tin API_SECRET của Cloudinary ở phía Client
     */
    async uploadToCloudinary(file: File): Promise<{ secure_url: string; public_id: string }> {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Upload ảnh thất bại");
        }

        const data = await response.json();
        return {
            secure_url: data.secure_url,
            public_id: data.public_id,
        };
    }
};
