"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductTypeService } from "@/services/product-types/product-type.service";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/column";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProductType } from "@/types/product-type.type";
import { useState } from "react";
import ProductTypeDetailModal from "./components/product-type-detail-modal";

export default function ProductTypesPage() {
  // STATES & QUERIES
  const [selectedProductType, setSelectedProductType] =
    useState<ProductType | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product-types"], // Key để cache dữ liệu
    queryFn: () => ProductTypeService.getAllProductTypes(),
    staleTime: 5 * 60 * 1000, // Cache dữ liệu trong 5 phút
  });

  // FUNCTIONS
  const onViewDetail = (productType: ProductType) => {
    setSelectedProductType(productType);
    setIsDetailModalOpen(true);
  };

  const onOpenUpdateForm = (productType: ProductType) => {
    setSelectedProductType(productType);
    setIsEditModalOpen(true);
  };

  const onClickDelete = (productType: ProductType) => {
    if (confirm(`Bạn có chắc chắn muốn xóa ${productType.name}?`)) {
      console.log("Delete ID:", productType.id);
      // Gọi mutation delete ở đây
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Loại sản phẩm</h2>
          <p className="text-muted-foreground mt-2">
            Quản lý danh sách loại sản phẩm.
          </p>
        </div>
      </div>

      <div className="w-full flex items-center justify-end">
        <Link href="/product-types/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Thêm Mới
          </Button>
        </Link>
      </div>
      <div className="rounded-md border bg-white p-4">
        {/* Xử lý trạng thái Loading */}
        {isLoading && (
          <div className="flex h-[300px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Xử lý trạng thái Lỗi */}
        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>
              Không thể tải danh sách. Vui lòng thử lại sau.
            </AlertDescription>
          </Alert>
        )}

        {/* Hiển thị bảng khi đã có Data */}
        {!isLoading && !isError && (
          <DataTable
            columns={columns}
            data={data || []}
            meta={{
              onViewDetail,
              onOpenUpdateForm,
              onClickDelete,
            }}
          />
        )}
      </div>

      <ProductTypeDetailModal
        productType={selectedProductType}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </div>
  );
}
