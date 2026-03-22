import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProductTypesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Loại sản phẩm</h2>
                <p className="text-muted-foreground mt-2">Quản lý danh sách loại sản phẩm và các thuộc tính liên quan.</p>
            </div>
            <div className="w-full flex items-center justify-end">
                <Link href="product-types/create">
                    <Button>
                        <Plus />
                        Thêm Mới
                    </Button>
                </Link>
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground font-medium">Danh sách loại sản phẩm sẽ hiển thị tại đây.</p>
            </div>
        </div>
    )
}
