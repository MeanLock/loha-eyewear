"use client";

import React, { useRef, useEffect } from "react";
import "./OpticalLabel.css";
import JsBarcode from "jsbarcode";

const OpticalLabel = ({ product }: { product: any }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current && product?.id) {
      JsBarcode(barcodeRef.current, product.id, {
        format: "CODE128",
        width: 1.2,
        height: 30,
        displayValue: false,
        margin: 0,
      });
    }
  }, [product]);

  return (
    <div className="label-page">
      <div className="printable-area">
        <div className="label-section store-info">
          <div className="rotate-content">
            <h1 className="store-name">Loc Hai Optic</h1>
            <p className="product-desc">
              {product.name || "Gong Nhua Kinh Can"}
            </p>
          </div>
        </div>

        <div className="label-section price-info">
          <div className="rotate-content">
            <svg ref={barcodeRef}></svg>
            <span className="barcode-id">{product.id}</span>
            <div className="price-box">
              <span className="label-text">Price: </span>
              <span className="price-value">
                {/* Ép kiểu Number để tránh lỗi toLocaleString */}
                {Number(product.listed_price || 0).toLocaleString()} VND
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpticalLabel;