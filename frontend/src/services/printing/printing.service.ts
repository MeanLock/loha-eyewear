import { apiClient } from "../api-client";

export const PrintingService = {
  async getProductInfo(productId: string) {
    const response = await apiClient.get(
      `/printing/${productId}/printing-info`,
    );
    return response.data;
  },
};
