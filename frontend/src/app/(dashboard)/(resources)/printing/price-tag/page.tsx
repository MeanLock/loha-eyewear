"use client";

import React, { useState } from "react";
import PrintLabelManager from "./components/PrintManager"; // Đảm bảo đúng đường dẫn file

export default function PriceTagPage() {
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [isReady, setIsReady] = useState(false);

  // Giả sử sau này bạn chọn từ một danh sách sản phẩm
  const handleSelectProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProductId(e.target.value);
    setIsReady(false); // Reset lại trạng thái để người dùng nhấn "Xác nhận"
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Quản lý In Tem Giá</h1>

      <div className="bg-gray-50 p-6 rounded-xl border mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nhập mã sản phẩm (ID/SKU) cần in:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ví dụ: SP001, 123456..."
            value={selectedProductId}
            onChange={handleSelectProduct}
            className="flex-1 p-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={() => setIsReady(true)}
            disabled={!selectedProductId}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Kiểm tra
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 italic">
          * Hệ thống sẽ lấy thông tin từ Backend dựa trên mã này.
        </p>
      </div>

      {/* Chỉ hiện Manager khi đã có mã sản phẩm */}
      {isReady && selectedProductId && (
        <div className="animate-in fade-in duration-500">
          <PrintLabelManager productId={selectedProductId} />
        </div>
      )}

      {!isReady && (
        <div className="text-center p-10 border-2 border-dashed rounded-xl text-gray-400">
          Vui lòng nhập mã sản phẩm để bắt đầu in
        </div>
      )}
    </div>
  );
}
