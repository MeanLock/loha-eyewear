"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const orderTypeId = searchParams.get("orderTypeId");

  const pageTitle = useMemo(() => {
    return orderTypeId ? (orderTypeId === "1" ? "kính thuốc" : "bán lẻ") : "";
  }, [orderTypeId]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Đơn hàng {pageTitle}
        </h2>
        <p className="text-muted-foreground mt-2">
          Quản lý, thông duyệt và theo dõi các đơn đặt hàng.
        </p>
      </div>
      <div className="w-full flex items-center justify-end">
        {orderTypeId && orderTypeId === "1" ? (
          <Link href="/orders/create?orderTypeId=1">
            <Button>Tạo Đơn Hàng</Button>
          </Link>
        ) : orderTypeId === "2" ? (
          <Link href="/orders/create?orderTypeId=2">
            <Button>Tạo Đơn Hàng</Button>
          </Link>
        ) : null}
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-muted-foreground font-medium">
          Danh sách đơn hàng sẽ hiển thị tại đây.
        </p>
      </div>
    </div>
  );
}
