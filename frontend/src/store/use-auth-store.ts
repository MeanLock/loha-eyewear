import { create } from "zustand";
import { User } from "@/types/auth.type";
import Cookies from "js-cookie";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    setAuth: (user, token) => {
        // Lưu token vào Cookie với cấu hình bảo mật
        Cookies.set("access_token", token, {
            expires: 7, // 7 ngày
            secure: true,
            sameSite: "strict"
        });
        set({ user, isAuthenticated: true });
    },
    logout: () => {
        Cookies.remove("access_token");
        set({ user: null, isAuthenticated: false });
    },
}));