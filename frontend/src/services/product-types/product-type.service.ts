import { CreateProductTypeInput } from "@/lib/validations/product-type";
import { apiClient } from "../api-client";
import { ProductType, ProductTypeBasic } from "@/types/product-type.type";

export const ProductTypeService = {
  async getAllProductTypes(): Promise<ProductType[]> {
    try {
      const response = await apiClient.get<ProductType[]>("/product-types");

      return response.data;
    } catch (error) {
      console.error("Failed to fetch product types:", error);
      throw error;
    }
  },

  async getAllProductTypesBasic(): Promise<ProductTypeBasic[]> {
    try {
      const response = await apiClient.get<ProductTypeBasic[]>("/product-types/basic");

      return response.data;
    } catch (error) {
      console.error("Failed to fetch product types:", error);
      throw error;
    }
  },

  async getProductTypeById(id: string): Promise<ProductType> {
    try {
      const response = await apiClient.get<ProductType>(`/product-types/${id}`);

      return response.data;
    } catch (error) {
      console.error("Failed to fetch product type:", error);
      throw error;
    }
  },

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
  async uploadToCloudinary(
    file: File,
  ): Promise<{ secure_url: string; public_id: string }> {
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
  },
};
