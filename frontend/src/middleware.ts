import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Danh sách các trang KHÔNG cần đăng nhập vẫn vào được
const publicPaths = ["/login", "/register", "/forgot-password", "/test"];

export function middleware(request: NextRequest) {
  // Đọc cookie access_token do zustand lưu lúc nãy
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isPublicPath = publicPaths.includes(pathname);

  // 1. Chưa đăng nhập mà cố vào các trang bảo mật -> Chuyển về luôn trang /login
  if (!token && !isPublicPath) {
    // Có thể bổ sung &callbackUrl=... để login xong back lại trang cũ nếu muốn
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. ĐÃ đăng nhập rồi mà lỡ tay gõ url /login -> Rinh thẳng vào Dashboard (trang chủ)
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Bỏ qua không quét middleware cho các file hình ảnh, next static, API... để giảm tải server
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.webp).*)",
  ],
};
