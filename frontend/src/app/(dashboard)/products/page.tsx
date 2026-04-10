import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Sản phẩm</h2>
                <p className="text-muted-foreground mt-2">Quản lý danh sách sản phẩm và các thuộc tính liên quan.</p>
            </div>
            <div className="w-full flex items-center justify-end">
                <Link href="/products/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Thêm Mới
                    </Button>
                </Link>
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground font-medium">Danh sách sản phẩm sẽ hiển thị tại đây.</p>
            </div>
        </div>
    )
}
