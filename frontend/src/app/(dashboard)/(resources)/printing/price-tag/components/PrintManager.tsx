"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useMutation } from "@tanstack/react-query";
import OpticalLabel from "./OpticalLabel";
import { PrintingService } from "@/services/printing/printing.service";

const PrintLabelManager = ({ productId }: { productId: string }) => {
  const [productData, setProductData] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1); // Thêm state này
  const [isReadyToPrint, setIsReadyToPrint] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `In_Tem_${productId}`,
    onAfterPrint: () => {
      setIsReadyToPrint(false);
      // setProductData(null); // Có thể giữ lại để xem trước nếu muốn
    },
  });

  // TỰ ĐỘNG KÍCH HOẠT KHI DATA ĐÃ RENDER XONG VÀ BARCODE ĐÃ VẼ
  useEffect(() => {
    if (isReadyToPrint && productData && printRef.current) {
      console.log("Sẵn sàng in, dữ liệu sản phẩm:", productData);
      // Delay 100ms cực ngắn để JsBarcode kịp vẽ vào SVG
      const timer = setTimeout(() => {
        handlePrint();
        setIsReadyToPrint(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isReadyToPrint, productData, handlePrint]);

  const { mutate: fetchAndPrint, isPending } = useMutation({
    mutationFn: () => PrintingService.getProductInfo(productId),
    onSuccess: (response) => {
      console.log("Dữ liệu sản phẩm nhận được:", response.data);
      setProductData(response);
      setIsReadyToPrint(true);
    },
    onError: (error) => {
      console.error("Lấy dữ liệu thất bại", error);
      alert("Không tìm thấy thông tin sản phẩm!");
    },
  });

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-white shadow-sm">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">
            Số lượng bản in:
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => fetchAndPrint()}
          disabled={isPending}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold transition-all disabled:bg-gray-400"
        >
          {isPending ? "Đang lấy data..." : "XÁC NHẬN IN"}
        </button>
      </div>

      {/* VÙNG IN ẨN - Dùng opacity:0 thay vì display:none để đảm bảo JsBarcode vẽ được */}
      <div
        style={{
          position: "fixed",
          opacity: 0,
          pointerEvents: "none",
          left: "-10000px",
          top: 0,
        }}
      >
        <div ref={printRef}>
          {productData &&
            Array.from({ length: quantity }).map((_, i) => (
              <OpticalLabel
                key={`${productData.id}-${i}`}
                product={productData}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PrintLabelManager;
