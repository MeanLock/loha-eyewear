"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductType } from "@/types/product-type.type"; // Đường dẫn type của bro
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns"; // npm install date-fns
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "name",
    header: "Tên loại sản phẩm",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "config_attributes",
    header: "Số lượng thuộc tính",
    cell: ({ row }) => {
      const attrs = row.original.config_attributes || [];
      return <Badge variant="secondary">{attrs.length} thuộc tính</Badge>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Ngày tạo",
    cell: ({ row }) =>
      format(new Date(row.getValue("created_at")), "dd/MM/yyyy"),
  },
  {
    id: "actions", // ID định danh cho cột action
    cell: ({ row, table }) => {
      const productType = row.original; // Lấy dữ liệu của dòng hiện tại
      const meta = table.options.meta as any;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="start" className="min-w-[200px]">
            {/* 💡 Bọc lại như thế này để cung cấp Context cho Label */}
            <DropdownMenuGroup>
              <DropdownMenuLabel>Thao tác</DropdownMenuLabel>

              <DropdownMenuItem onClick={() => meta?.onViewDetail(productType)}>
                <Eye className="mr-2 h-4 w-4" /> Xem chi tiết
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => meta?.onOpenUpdateForm(productType)}
              >
                <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => meta?.onClickDelete(productType)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Xóa
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
