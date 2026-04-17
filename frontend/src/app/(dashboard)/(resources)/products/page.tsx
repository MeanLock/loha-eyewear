"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { ProductService } from "@/services/product/product.service";
import { PrintingService } from "@/services/printing/printing.service";
import { Product, ProductsResponse } from "@/types/product.type";
import {
  productColumns,
  ProductTableItem,
} from "./components/columns";

const CLOUDINARY_PREFIX =
  process.env.NEXT_PUBLIC_CLOUDINARY_PUBLIC_URL_PREFIX ?? "";

const toNumber = (value: string | number | null | undefined) => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const resolveImageUrl = (imageUrl: string) => {
  if (!imageUrl) return "/logo.svg";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (!CLOUDINARY_PREFIX) return imageUrl;

  const prefix = CLOUDINARY_PREFIX.endsWith("/")
    ? CLOUDINARY_PREFIX.slice(0, -1)
    : CLOUDINARY_PREFIX;
  const path = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
  return `${prefix}/${path}`;
};

const normalizeProductItems = (items: Product[]): ProductTableItem[] =>
  items.map((item) => ({
    id: String(item.id),
    code: item.code ?? "",
    name: item.name ?? "",
    image_url: resolveImageUrl(item.image_url ?? ""),
    listed_price: toNumber(item.listed_price),
    minimum_price: toNumber(item.minimum_price),
    minimum_saleable_range_count: toNumber(item.minimum_saleable_range_count),
    min_order_range_count: toNumber(item.min_order_range_count),
    price_after_tax: Boolean(item.price_after_tax),
    is_expirable: Boolean(item.is_expirable),
    total_available_quantity: toNumber(item.total_available_quantity),
    total_shipments: toNumber(item.total_shipments),
    total_expired_quantity: toNumber(item.total_expired_quantity),
  }));

type ProductsPayload = ProductsResponse | { data: ProductsResponse } | Product[];

const extractProductItems = (payload: ProductsPayload | undefined): Product[] => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if ("items" in payload && Array.isArray(payload.items)) return payload.items;
  if (
    "data" in payload &&
    payload.data &&
    "items" in payload.data &&
    Array.isArray(payload.data.items)
  ) {
    return payload.data.items;
  }
  return [];
};

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productTypeId = searchParams.get("productTypeId") ?? undefined;

  const [rows, setRows] = React.useState<ProductTableItem[]>([]);
  const [editingRowId, setEditingRowId] = React.useState<string | null>(null);
  const [draftById, setDraftById] = React.useState<
    Record<string, Partial<ProductTableItem>>
  >({});
  const [availableMin, setAvailableMin] = React.useState("");
  const [availableMax, setAvailableMax] = React.useState("");

  const { data, isLoading, isError, error } = useQuery<ProductsPayload>({
    queryKey: ["products", { productTypeId }],
    queryFn: () => ProductService.getProducts({ productTypeId }),
    staleTime: 5 * 60 * 1000,
  });

  React.useEffect(() => {
    const items = extractProductItems(data);
    setRows(normalizeProductItems(items));
  }, [data]);

  const setDraftValue = React.useCallback(
    <K extends keyof ProductTableItem>(
      rowId: string,
      key: K,
      value: ProductTableItem[K],
    ) => {
      setDraftById((prev) => ({
        ...prev,
        [rowId]: {
          ...prev[rowId],
          [key]: value,
        },
      }));
    },
    [],
  );

  const startEdit = React.useCallback((row: ProductTableItem) => {
    setEditingRowId(row.id);
    setDraftById((prev) => ({
      ...prev,
      [row.id]: {
        name: row.name,
        listed_price: row.listed_price,
        minimum_price: row.minimum_price,
      },
    }));
  }, []);

  const cancelEdit = React.useCallback((rowId: string) => {
    setEditingRowId((prev) => (prev === rowId ? null : prev));
    setDraftById((prev) => {
      const next = { ...prev };
      delete next[rowId];
      return next;
    });
  }, []);

  const saveEdit = React.useCallback(
    (rowId: string) => {
      const patch = draftById[rowId];
      if (!patch) return;

      setRows((prev) =>
        prev.map((row) => (row.id === rowId ? { ...row, ...patch } : row)),
      );
      setEditingRowId(null);
      setDraftById((prev) => {
        const next = { ...prev };
        delete next[rowId];
        return next;
      });
      toast.success("Đã cập nhật dữ liệu trên bảng (local)");
    },
    [draftById],
  );

  const onDelete = React.useCallback((row: ProductTableItem) => {
    if (!confirm(`Bạn có chắc muốn xóa ${row.name}?`)) return;
    setRows((prev) => prev.filter((item) => item.id !== row.id));
    toast.success("Đã xóa khỏi danh sách local");
  }, []);

  const onDetails = React.useCallback(
    (row: ProductTableItem) => {
      router.push(`/products/${row.id}`);
    },
    [router],
  );

  const onPrinting = React.useCallback(async (row: ProductTableItem) => {
    try {
      const pdfBlob = await PrintingService.getProductPriceTagPdf(row.id);
      const blob = pdfBlob instanceof Blob ? pdfBlob : new Blob([pdfBlob], { type: "application/pdf" });
      const objectUrl = URL.createObjectURL(blob);

      const printWindow = window.open(objectUrl, "_blank", "noopener,noreferrer");
      if (!printWindow) {
        URL.revokeObjectURL(objectUrl);
        toast.error("Trình duyệt đang chặn popup. Vui lòng cho phép popup để mở file PDF.");
        return;
      }

      setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
      toast.success("Đã mở file PDF tem giá");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Không thể tạo PDF tem giá";
      toast.error(message);
    }
  }, []);

  return (
    <div className="min-w-0 w-full max-w-full space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sản phẩm</h2>
          <p className="mt-2 text-muted-foreground">
            Quản lý danh sách sản phẩm và các thuộc tính liên quan.
          </p>
        </div>
        <Link href="/products/create">
          <Button className="bg-black text-white hover:bg-black/90">
            <Plus className="mr-2 h-4 w-4" />
            Thêm Mới
          </Button>
        </Link>
      </div>

      <div className="min-w-0 w-full max-w-full overflow-hidden rounded-xl border border-muted-foreground/20 bg-white p-4 shadow-sm">
        {isLoading && (
          <div className="py-20 text-center text-sm text-muted-foreground">
            Đang tải dữ liệu sản phẩm...
          </div>
        )}

        {isError && (
          <div className="py-20 text-center text-sm text-destructive">
            {(error as Error)?.message ?? "Không thể tải danh sách sản phẩm."}
          </div>
        )}

        {!isLoading && !isError && (
          <DataTable
            columns={productColumns}
            data={rows}
            searchableColumns={[
              { id: "code", title: "Mã SKU Code" },
              { id: "name", title: "Tên Sản Phẩm" },
            ]}
            searchPlaceholder="Tìm theo mã SKU hoặc tên sản phẩm..."
            getRowId={(row) => row.id}
            meta={{
              editingRowId,
              draftById,
              setDraftValue,
              startEdit,
              cancelEdit,
              saveEdit,
              onDelete,
              onDetails,
              onPrinting,
            }}
            renderToolbar={(table) => {
              const priceAfterTaxFilter =
                (table.getColumn("price_after_tax")?.getFilterValue() as string | undefined) ??
                "all";
              const isExpirableFilter =
                (table.getColumn("is_expirable")?.getFilterValue() as string | undefined) ??
                "all";

              return (
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    className="h-9 rounded-lg border border-muted-foreground/20 bg-white px-2 text-sm"
                    value={priceAfterTaxFilter}
                    onChange={(event) =>
                      table
                        .getColumn("price_after_tax")
                        ?.setFilterValue(event.target.value)
                    }
                  >
                    <option value="all">Giá Sau Thuế: Tất cả</option>
                    <option value="true">Giá Sau Thuế: Có</option>
                    <option value="false">Giá Sau Thuế: Không</option>
                  </select>

                  <select
                    className="h-9 rounded-lg border border-muted-foreground/20 bg-white px-2 text-sm"
                    value={isExpirableFilter}
                    onChange={(event) =>
                      table.getColumn("is_expirable")?.setFilterValue(event.target.value)
                    }
                  >
                    <option value="all">Hết Hạn: Tất cả</option>
                    <option value="true">Hết Hạn: Có</option>
                    <option value="false">Hết Hạn: Không</option>
                  </select>

                  <Input
                    type="number"
                    value={availableMin}
                    onChange={(event) => setAvailableMin(event.target.value)}
                    placeholder="Kho từ"
                    className="h-9 w-24"
                  />
                  <Input
                    type="number"
                    value={availableMax}
                    onChange={(event) => setAvailableMax(event.target.value)}
                    placeholder="Kho đến"
                    className="h-9 w-24"
                  />

                  <Button
                    variant="outline"
                    className="h-9 border-muted-foreground/20"
                    onClick={() =>
                      table.getColumn("total_available_quantity")?.setFilterValue({
                        min: availableMin,
                        max: availableMax,
                      })
                    }
                  >
                    Áp dụng range
                  </Button>

                  <Button
                    variant="ghost"
                    className="h-9"
                    onClick={() => {
                      table.resetColumnFilters();
                      table.resetGlobalFilter();
                      setAvailableMin("");
                      setAvailableMax("");
                    }}
                  >
                    Xóa lọc
                  </Button>
                </div>
              );
            }}
          />
        )}
      </div>
    </div>
  );
}
