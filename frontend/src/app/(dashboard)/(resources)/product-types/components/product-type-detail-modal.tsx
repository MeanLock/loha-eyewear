"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area"; // npx shadcn@latest add scroll-area
import { ProductType } from "@/types/product-type.type";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ProductTypeAttributeCard from "./product-type-attribute-card";

interface Props {
  productType: ProductType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductTypeDetailModal = ({ productType, open, onOpenChange }: Props) => {
  if (!productType) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] h-[85vh] flex flex-col p-0">
        {/* Tăng max-w và set w để responsive */}
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-primary">
              Chi tiết: {productType.name}
            </DialogTitle>
            <Badge variant="outline">ID: {productType.id.slice(0, 8)}</Badge>
          </div>
          <DialogDescription>
            Khởi tạo ngày{" "}
            {format(new Date(productType.created_at), "dd/MM/yyyy")}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {/* flex-1 kết hợp với h-[85vh] ở trên sẽ ép ScrollArea phải hoạt động */}
        <ScrollArea className="flex-1 px-6 py-4 overflow-hidden">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Danh sách thuộc tính ({productType.config_attributes.length})
            </h4>

            {/* CHIA GRID RESPONSIVE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productType.config_attributes.map((attr) => (
                <ProductTypeAttributeCard key={attr.id} attribute={attr} />
              ))}
            </div>
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-muted/20 flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductTypeDetailModal;
