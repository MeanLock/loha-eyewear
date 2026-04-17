"use client";

import Image from "next/image";
import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Eye,
  Pencil,
  Printer,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export type ProductTableItem = {
  id: string;
  code: string;
  name: string;
  image_url: string;
  listed_price: number;
  minimum_price: number;
  minimum_saleable_range_count: number;
  min_order_range_count: number;
  price_after_tax: boolean;
  is_expirable: boolean;
  total_available_quantity: number;
  total_shipments: number;
  total_expired_quantity: number;
};

type ProductTableMeta = {
  editingRowId: string | null;
  draftById: Record<string, Partial<ProductTableItem>>;
  setDraftValue: <K extends keyof ProductTableItem>(
    rowId: string,
    key: K,
    value: ProductTableItem[K],
  ) => void;
  startEdit: (row: ProductTableItem) => void;
  cancelEdit: (rowId: string) => void;
  saveEdit: (rowId: string) => void;
  onDelete: (row: ProductTableItem) => void;
  onDetails: (row: ProductTableItem) => void;
  onPrinting: (row: ProductTableItem) => void;
};

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const parseBooleanFilter = (value: unknown) => {
  if (value === undefined || value === null || value === "all") return "all";
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return "all";
};

const numberRangeFilter: ColumnDef<ProductTableItem>["filterFn"] = (
  row,
  columnId,
  filterValue,
) => {
  if (!filterValue) return true;

  const value = Number(row.getValue(columnId) ?? 0);
  const min =
    filterValue.min === undefined || filterValue.min === ""
      ? undefined
      : Number(filterValue.min);
  const max =
    filterValue.max === undefined || filterValue.max === ""
      ? undefined
      : Number(filterValue.max);

  if (min !== undefined && !Number.isNaN(min) && value < min) return false;
  if (max !== undefined && !Number.isNaN(max) && value > max) return false;
  return true;
};

const renderSortHeader = (
  title: string,
  context: HeaderContext<ProductTableItem, unknown>,
) => (
  <Button
    variant="ghost"
    size="sm"
    className="-ml-2 h-8 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
    onClick={() =>
      context.column.toggleSorting(context.column.getIsSorted() === "asc")
    }
  >
    {title}
    <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
  </Button>
);

export const productColumns: ColumnDef<ProductTableItem>[] = [
  {
    accessorKey: "code",
    header: (context) => renderSortHeader("Mã SKU Code", context),
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">
        {row.original.code}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Tên Sản Phẩm",
    enableSorting: false,
    cell: ({ row, table }) => {
      const meta = table.options.meta as ProductTableMeta;
      const isEditing = meta.editingRowId === row.original.id;
      const draftValue = meta.draftById[row.original.id]?.name;

      if (isEditing) {
        return (
          <Input
            value={(draftValue as string) ?? row.original.name}
            onChange={(event) =>
              meta.setDraftValue(row.original.id, "name", event.target.value)
            }
            className="h-8 min-w-52"
          />
        );
      }

      return (
        <span className="font-medium text-foreground">{row.original.name}</span>
      );
    },
  },
  {
    accessorKey: "image_url",
    header: "Ảnh Minh Họa",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="relative h-10 w-10 overflow-hidden rounded-md border border-muted-foreground/20 bg-muted/20">
        <Image
          src={row.original.image_url}
          alt={row.original.name}
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "listed_price",
    header: (context) => renderSortHeader("Giá Niêm Yết", context),
    enableSorting: true,
    cell: ({ row, table }) => {
      const meta = table.options.meta as ProductTableMeta;
      const isEditing = meta.editingRowId === row.original.id;
      const draftValue = meta.draftById[row.original.id]?.listed_price;

      if (isEditing) {
        return (
          <Input
            type="number"
            min={0}
            value={Number(draftValue ?? row.original.listed_price)}
            onChange={(event) =>
              meta.setDraftValue(
                row.original.id,
                "listed_price",
                Number(event.target.value),
              )
            }
            className="h-8 w-32"
          />
        );
      }

      return (
        <span className="text-sm text-foreground">
          {currencyFormatter.format(row.original.listed_price)}
        </span>
      );
    },
  },
  {
    accessorKey: "minimum_price",
    header: (context) => renderSortHeader("Giá Bán Tối Thiểu", context),
    enableSorting: true,
    cell: ({ row, table }) => {
      const meta = table.options.meta as ProductTableMeta;
      const isEditing = meta.editingRowId === row.original.id;
      const draftValue = meta.draftById[row.original.id]?.minimum_price;

      if (isEditing) {
        return (
          <Input
            type="number"
            min={0}
            value={Number(draftValue ?? row.original.minimum_price)}
            onChange={(event) =>
              meta.setDraftValue(
                row.original.id,
                "minimum_price",
                Number(event.target.value),
              )
            }
            className="h-8 w-32"
          />
        );
      }

      return (
        <span className="text-sm text-foreground">
          {currencyFormatter.format(row.original.minimum_price)}
        </span>
      );
    },
  },
  {
    accessorKey: "minimum_saleable_range_count",
    header: (context) => renderSortHeader("Ngày Bán Tối Thiểu", context),
    enableSorting: true,
    cell: ({ row }) => (
      <span>{row.original.minimum_saleable_range_count} ngày</span>
    ),
  },
  {
    accessorKey: "min_order_range_count",
    header: (context) =>
      renderSortHeader("Số Ngày Tối Thiểu Để Đặt Hàng", context),
    enableSorting: true,
    cell: ({ row }) => <span>{row.original.min_order_range_count} ngày</span>,
  },
  {
    accessorKey: "price_after_tax",
    header: "Giá Sau Thuế",
    enableSorting: false,
    filterFn: (row, columnId, filterValue) => {
      const parsed = parseBooleanFilter(filterValue);
      if (parsed === "all") return true;
      return row.getValue(columnId) === parsed;
    },
    cell: ({ row }) => (
      <Badge variant={row.original.price_after_tax ? "default" : "outline"}>
        {row.original.price_after_tax ? "Có" : "Không"}
      </Badge>
    ),
  },
  {
    accessorKey: "is_expirable",
    header: "Sản Phẩm Có Thể Hết Hạn",
    enableSorting: false,
    filterFn: (row, columnId, filterValue) => {
      const parsed = parseBooleanFilter(filterValue);
      if (parsed === "all") return true;
      return row.getValue(columnId) === parsed;
    },
    cell: ({ row }) => (
      <Badge variant={row.original.is_expirable ? "secondary" : "outline"}>
        {row.original.is_expirable ? "Có" : "Không"}
      </Badge>
    ),
  },
  {
    accessorKey: "total_available_quantity",
    header: (context) => renderSortHeader("Số Lượng Còn Trong Kho", context),
    enableSorting: true,
    filterFn: numberRangeFilter,
  },
  {
    accessorKey: "total_shipments",
    header: (context) =>
      renderSortHeader("Số Lô Hàng Chứa Sản Phẩm Này", context),
    enableSorting: true,
    filterFn: numberRangeFilter,
  },
  {
    accessorKey: "total_expired_quantity",
    header: (context) =>
      renderSortHeader("Số Sản Phẩm Này Đã Bị Hết Hạn", context),
    enableSorting: true,
    filterFn: numberRangeFilter,
  },
  {
    id: "actions",
    header: "Thao tác",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row, table }) => {
      const meta = table.options.meta as ProductTableMeta;
      const isEditing = meta.editingRowId === row.original.id;

      if (isEditing) {
        return (
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => meta.saveEdit(row.original.id)}
              className="border-emerald-500/50 text-emerald-700 hover:bg-emerald-50"
            >
              <Save className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => meta.cancelEdit(row.original.id)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-blue-400"
            onClick={() => meta.onDetails(row.original)}
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-indigo-400"
            onClick={() => meta.onPrinting(row.original)}
          >
            <Printer className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-green-700"
            onClick={() => meta.startEdit(row.original)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-destructive"
            onClick={() => meta.onDelete(row.original)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      );
    },
  },
];
