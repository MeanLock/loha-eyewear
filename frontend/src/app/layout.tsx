import type { Metadata } from "next";
import { Inter, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
});

const beVietnam = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"], // Các độ đậm: Regular, Medium, SemiBold, Bold
  subsets: ["vietnamese"],              // Bắt buộc phải có để hiển thị đúng dấu tiếng Việt
  variable: "--font-be-vietnam",        // Đặt tên biến CSS để dùng trong Tailwind
});

export const metadata: Metadata = {
  title: "LoHa Eyewear Admin",
  description: "LoHa Eyewear Administrator Dashboard",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${beVietnam.variable} font-sans antialiased`}>
        <QueryProvider>
          {children}
          <Toaster richColors closeButton />
        </QueryProvider>
      </body>
    </html>
  );
}
