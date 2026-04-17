Đây là dự án Front-End trong quá trình lập trình fullstack của Hoàng Minh Lộc!


Cấu trúc routing của dự án:

"/" => Trang dashboard cơ bản


(Resources)
"/products" => Trang xem danh sách các sản phẩm có trong cửa hàng
- params: productTypeId, page, limit

"/products/create" => Trang để tạo ra sản phẩm
- params: productTypeId (để gọi trước productTypeConfigAttributes luôn)

"/product-types" => Trang xem danh sách các loại sản phẩm có trong cửa hàng, vì data không quá to nên không cần pagination

"/products-types/create" => Tạo một loại sản phẩm mới

"/shipments" => Trang xem các shipment đang có 

``` text
frontend/
├── src/    # Chứa mã nguồn cho NestJS API server

├── frontend/   # Chứa mã nguồn cho ứng dụng Frontend
├── README.md   # File hướng dẫn này
└── .gitignore  # Các file/folder bị loại bỏ khi dùng git
```