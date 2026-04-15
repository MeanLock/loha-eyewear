import { ProductParams, ProductsResponse } from "@/types/product.type";
import { apiClient } from "../api-client";

const unwrapData = <T>(response: unknown): T =>
  response && typeof response === "object" && "data" in response
    ? (response.data as T)
    : (response as T);

export const ProductService = {
  // Hàm core để upload, nhận thêm directory
  async uploadToCloudinary(
    file: File,
    directory: string = "general",
  ): Promise<{ secure_url: string; public_id: string }> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", directory); // Gửi folder mong muốn lên API

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

  async findParentProductsByType(productTypeId: string) {
    const response = await apiClient.get(`/products/parents/${productTypeId}`);
    return unwrapData(response);
  },

  async createProduct(payload: unknown) {
    const response = await apiClient.post(`/products`, payload);
    return unwrapData(response);
  },

  async getProducts(params: ProductParams): Promise<ProductsResponse> {
    const response = await apiClient.get(`/products`, { params });
    return unwrapData<ProductsResponse>(response);
  },
};
