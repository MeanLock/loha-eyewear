import { apiClient } from "../api-client";

const unwrapData = <T>(response: unknown): T =>
  response && typeof response === "object" && "data" in response
    ? (response.data as T)
    : (response as T);

export const PrintingService = {
  // async getProductInfo(productId: string) {
  //   const response = await apiClient.get(
  //     `/printing/${productId}/printing-info`,
  //   );
  //   return response.data;
  // },

  async getProductPriceTagPdf(productId: string) {
    const response = await apiClient.get(`/printing/${productId}/pdf`, {
      responseType: "blob",
    });
    return unwrapData<Blob>(response);
  },
};
