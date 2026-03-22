
## Context:
- Khi người dùng thao tác và tạo loại sản phẩm trên Front End, nếu họ up ảnh. Thì tất cả các ảnh sẽ được up lên cloudinary ở trong folder /temp
- Khi data được gửi về back-end sẽ có dạng như sau (Example):

``` ts
const data = {
	name: "Gọng Kính",
	attributes: [
		{
			data_type: "enum",
			is_required: true,
			key: "frame_type",
			name: "Loại Gọng Kính",
			options: [
				{
					value: "Gọng Kính Cận",
					image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774186205/temp/ihqwx8flps2ehthpkatb.webp",
					sort_order: 0
				},
				// ...
			],
			validation_rules: {
				error_message: "",
				is_spaceable: undefined,
				is_unique: undefined,
				max_length: 0,
				max_options: 1,
				min_length: 0,
				min_options: 1,
			    placeholder: "Gọng kính cận hay gọng thời trang ?",
			    regex_pattern: "",
			    ui_type: undefined
			}
		},
		{
			data_type: "number",
			is_required: true,
			key: "frame_lens_size",
			name: "Độ Rộng Tròng Kính",
			options: [],
			sort_order: 1,
			validation_rules: {
				error_message: "",
				is_spaceable: undefined,
				is_unique: undefined,
				max_length: 0,
				max_value: 100,
				max_options: 1,
				min_length: 0,
				min_value: 1,
				min_options: 1,
			    placeholder: "Nhập độ rộng của tròng mắt mà gọng sở hữu",
			    regex_pattern: "",
			    ui_type: undefined,
			    unit_symbol: "mm"
			}
		}
	]
}
```

- Vì có cascade nên sau khi product-types tạo nó sẽ tự tạo các product-type-attribute-config và product-enum-attribute-options luôn. Vấn đề là cần sắp xếp và lưu lại các ảnh trên cloudinary cho đúng vị trí của nó


## Cấu trúc thư mục:
- Đã có sẵn thư mục /product-types trên cloudinary
- Cần vào thư mục đó tạo thêm thư mục /${productType.id}
- Sau đó vào thư mục đó và tạo thêm các thư mục với tên là id của attribute nào đó mà có ảnh bên trong
- Và đẩy các ảnh lên với tên file là id của nó. Lấy url mới về nhét vào


## Requirement:
- Thực hiện check xem có attribute nào có ảnh trong product-type vừa tạo không, có thì bắt đầu tạo thư mục theo cấu trúc và bắt đầu sắp xếp lại
- Lấy url mới và thay lại đúng cho cái image_url đó