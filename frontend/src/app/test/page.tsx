"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";

type Product = {
  name: string;
  price: number;
};

function Test() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        name: name,
        price: Number(price),
      },
    ]);
  };

  const getTotalPrice = () => {
    return products.reduce((result, p) => {
      console.log("Chay Ham 1");
      return result + p.price;
    }, 0);
  };

  const totalPrice = useMemo(() => {
    return products.reduce((result, p) => {
      console.log("Chay Ham 2");
      return result + p.price;
    }, 0);
  }, [products]);

  return (
    <div>
      <p>Test Page</p>

      <div className="mt-10 space-y-5 px-20">
        <h3>Nhap Thong Tin San Pham</h3>

        <Input
          type="text"
          placeholder="Ten san pham"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Gia San Pham"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <Button onClick={handleAddProduct}>Add Product</Button>
      </div>

      <div className="px-20 mt-10">
        <p>Total 1: {getTotalPrice()}</p>
        <p>Total 2: {totalPrice ? totalPrice : 0}</p>
        {products.map((product, index) => (
          <p className="" key={index}>
            {product.name} - {product.price}$
          </p>
        ))}
      </div>
    </div>
  );
}

export default Test;
