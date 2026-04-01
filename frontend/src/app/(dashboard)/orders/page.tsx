import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Đơn hàng</h2>
        <p className="text-muted-foreground mt-2">
          Quản lý, thông duyệt và theo dõi các đơn đặt hàng.
        </p>
      </div>
      <div className="w-full flex items-center justify-end">
        <Link href="orders/create">
          <Button>Tạo Đơn Hàng</Button>
        </Link>
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-muted-foreground font-medium">
          Danh sách đơn hàng sẽ hiển thị tại đây.
        </p>
      </div>
    </div>
  );
}
