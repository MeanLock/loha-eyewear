"use client";

import { LoginForm } from "@/components/login-form";
import { AuthService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/store/use-auth-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import { io } from "socket.io-client";

// Địa chỉ của con Bridge đang chạy ở tiệm
const SOCKET_SERVER_URL = "http://localhost:5000";
export default function Page() {
  //   useEffect(() => {
  //     const socket = io("http://localhost:5000", {
  //       transports: ["websocket"], // Ép dùng websocket cho nhanh và ổn định
  //     });

  //     socket.on("NEW_MEASUREMENT", (data) => {
  //       alert("Alo");
  //       console.log("Nhận data từ máy đo:", data);

  //       // Hiện thông báo (Toast hoặc Confirm)
  //       const confirmApply = window.confirm(
  //         `Đã nhận kết quả đo ID: ${data.id}. Bạn có muốn điền vào đơn hàng không?`,
  //       );

  //       if (confirmApply) {
  //         // Giả sử bro dùng state để quản lý Form
  //         // setFieldValue("sph_r", data.right_eye.avg.sph);
  //         // setFieldValue("cyl_r", data.right_eye.avg.cyl);
  //         // ... tự động điền hết đống data vào form
  //       }
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const loginMutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (response) => {
      const { access_token, user } = response.data;

      // 1. Lưu vào Store & Cookie
      setAuth(user, access_token);

      // 2. Thông báo thành công
      toast.success("Chào mừng trở lại!", {
        description: `Loha Eyewear: ${user.full_name} đã đăng nhập thành công.`,
      });

      router.push("/");
    },
    onError: (error: any) => {
      toast.error("Đăng nhập thất bại", {
        description: error.message || "Email hoặc mật khẩu không đúng",
      });
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lấy dũ liệu thật từ Form HTML
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    loginMutation.mutate({
      email,
      password,
    });
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm handleLogin={handleLogin} />
      </div>
    </div>
  );
}
