// src/services/api-client.ts
import axios from "axios";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
});

// Customization: Xử lý Request (Gắn token)
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token"); // Hoặc lấy từ cookie
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Customization: Xử lý Response lỗi tập trung
apiClient.interceptors.response.use(
    (response) => response.data, // Trả về data luôn, không cần .data ở các hàm sau
    (error) => {
        const message = error.response?.data?.message || "Đã có lỗi xảy ra";
        // Ví dụ: Toast báo lỗi hoặc redirect nếu 401
        return Promise.reject(new Error(message));
    }
);