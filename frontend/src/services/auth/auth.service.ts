import { LoginResponse } from "@/types/auth.type";
import { apiClient } from "../api-client";


export const AuthService = {
    login: async (payload: any): Promise<LoginResponse> => {
        return apiClient.post("/auth/login", payload);
    },
};