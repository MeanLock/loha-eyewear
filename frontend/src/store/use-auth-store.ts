import { create } from "zustand";
import { User } from "@/types/auth.type";
import Cookies from "js-cookie";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      setAuth: (user, token) => {
        Cookies.set("access_token", token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        Cookies.remove("access_token");
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem("auth-storage"); // Xóa sạch khi logout
      },
    }),
    {
      name: "auth-storage", // Lưu user vào đây để F5 không mất
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
