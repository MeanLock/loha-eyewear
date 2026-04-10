
# 1. Tạo sản phẩm:

- Người dùng vào trang /products/create

- Gọi API /product-types/basic để lấy ra danh sách các Product Types có trong hệ thống:
	- Url: '`/product-types/basic'`
	- Method: `GET`
	- Response 
``` ts
		[
			{
				id: string,
				name: string,
				created_at: string,
				updated_at: string
			}
		]
```

- Tùy theo loại product-types mà người dùng chọn. Sẽ gọi để lấy details của Product Types đó:
	- Url: '`/product-types/:id'`
	- Method: `GET`
	- Response
``` ts
{
	id: string,
	name: string,
	created_at: string,
	updated_at: string,
	config_attributes: [
		{
			id: string,
			name: string,
			key: string,
			data_type: ENUM("number", "string", "boolean", "enum", "date"),
			is_required: boolean,
			sort_order: number,
			validation_rules: {} ,// Check mục validation rules bên dưới 
			enum_options: [
				{
					id: string,
					value: string,
					image_url: string,
					sort_order: number
				}
			]
		}
	]
}
```

- Đầu tiên người dùng sẽ phải fill trước các thông tin cơ bản nhất của sản phẩm, chưa cần phân biệt product types ra sao:
	- **name**:
		- type: String
		- description: Tên của sản phẩm
		- note: unique
	- **description**:
		- type: String
		- description: Mô tả của sản phẩm
		- note: Là HTML Text nên phải dùng Text Editor để thu thập dữ liệu
	- **image_url:**
		- type: String
		- description: Link ảnh tạm thời của sản phẩm được up lên
		- note: Gọi hàm UploadNewProductMainImage() từ imageService để up lên file temp tạm rồi trả url tạm về
	- **listed_price**:
		- type: Number
		- description: Giá niêm yết của sản phẩm
		- note: phải lớn hơn minimum_price
	- **minimum_price**:
		- type: Number
		- description: Giá thấp nhất có thể giảm của sản phẩm nếu như phải giảm giá khách hàng
		- note: phải bé hơn listed_price. Nhưng không cần lớn hơn giá nhập
	- **price_after_tax**:
		- type: Boolean
		- description: Bật tắt chế độ, nếu là true tức là giá sẽ hiển thị cho khách là listed_price x (1+VAT.Value), còn nếu là false thì listed_price sẽ là giá đã bao gồm VAT
		- note: none
	- **min_order_range_count**:
		- type: Number (Int)
		- description: Số ngày tối thiểu cần để sản phẩm có thể được đặt về
		- note: DEFAULT 1, đơn vị là ngày
	- **is_expirable**:
		- type: Boolean
		- description: Nếu sản phẩm có thể hết hạn thì đánh là true, không thì là false
		- note: DEFAULT False. 
	- **minimum_saleable_range_count:**
		- type: Number (INT)
		- description: Đối với sản phẩm có is_expirable là true, thì chắc chắn con số này phải được set. Không để DEFAULT, đây là khoảng cách tối thiểu từ ngày hết hạn đến ngày hôm nay để có thể bán được. Ví dụ set là 30 thì các sản phẩm muốn được bán trong ngày 06/04/2026 phải có ngày hết hạn trễ hơn 06/05/2026, nếu như là 05/05/2026 thì sẽ không thể bán được chẳng hạn
		- note: nếu is_expirable là false thì DEFAULT để là 0 luôn, còn là true thì phải set >= 1. Đơn vị ở đây là ngày

- Sau đó sẽ là hoản thiện các thông tin yêu cầu của product-type tương ứng. Các attribute sẽ có thể là 1 trong 5 trường hợp: number / string / boolean / date / enum. Và đi kèm với mỗi 1 loại sẽ có các validation rules chung và riêng. Sau đây tôi sẽ giải thích các rules.


# 2. Validation Rules:
- Các rules chung thường sẽ được có ở mọi attribute, nếu không có thì tự động by pass
- Các rules riêng của từng loại chỉ có thể xuất hiện đúng ở attribute có value type là loại đó, nếu như có xuất hiện cái lạ thì by pass luôn để đỡ lỗi
- "rule's value type" là kiểu giá trị thể hiện cho các rules đó, để nhận biết và so sánh dễ hơn => VD: rule: IS INT có rule's value type là boolean tức là is_int: true hoặc is_int: false


### 2.1 Rules Chung:
 - DEFAULT VALUE:
	 - key: "default_value"
	 - rule's value type: number/string/boolean/datestring
	 - description: Giá trị cơ bản tương ứng với kiểu dữ liệu của attribute, trừ enum
	 - khi có rule này: Ô nhập, điền giá trị của attribute đó sẽ được tự động fill vào giá trị này lúc khởi tạo
- PLACE HOLDER:
	- key: "placeholder"
	- rule's value type: string
	- description: Mô tả hướng dẫn người dùng làm thế nào để nhập attribute đó đúng cách
	- khi có rule này: Ô placeholder của attribute đó sẽ được tự động fill vào giá trị này lúc khởi tạo
- ERROR_MESSAGE:
	- key: "error_message"
	- rule's value type: string
	- description: Chuỗi câu message trả lỗi khi người dùng điền sai, thiếu thông tin của attribute đó
	- khi có rule này: Toast thông báo invalid sẽ được hiển thị với nội dung là giá trị này

### 2.2 Rules Number:
- IS INT:
	- key: "is_int"
	- rule's value type: boolean (check box)
	- description: Xác định xem attribute nhập có được là số âm không
	- khi có rule này: 
		- Giá trị true => Chỉ được nhập số nguyên
		- Giá trị false => Có thể nhập mọi loại số
- MIN VALUE:
	- key: "min_value"
	- rule's value type: number
	- description: Giá trị nhỏ nhất có thể của attribute đó
	- khi có rule này: Giá trị của attribute không thể bé hơn giá trị này
- MAX VALUE:
	- key: "max_value"
	- rule's value type: number
	- description: Giá trị lớn nhất có thể của attribute đó
	- khi có rule này: Giá trị của attribute không thể lớn hơn giá trị này
- IS STEP:
	- key: "is_step"
	- rule's value type: boolean
	- description: Nếu là true thì thay vì cho nhập số sẽ cho chọn theo bước nhảy 
	- khi có rule này: Giá trị của attribute phải được chọn bằng cách nhấn bước nhảy chứ không thể nhập tay. Hoặc có nhập thì cũng phải chia hết cho step
- STEP:
	- key: "step"
	- rule's value type: number
	- description: Bước nhảy tối thiểu của giá trị nếu như is_step là true
	- khi có rule này: Mỗi bước nhảy của giá trị attribute đều phải là bội của step
- IS NEGATIVEABLE:
	- key: "is_negativeable"
	- rule's value type: boolean
	- description: Nếu set là true thì giá trị có thể âm
	- khi có rule này: 
		- Giá trị là true: Được nhập giá trị < 0 
		- Giá trị là false: Không được nhập giá trị > 0
- UNIT SYMBOL:
	- key: "unit_symbol" 
	- rule's value type: string
	- description: Đơn vị của attribute, để hiển thị cho dễ điền
	- khi có rule này: Hiển thị đơn vị ngay kế bên ô nhập để người dùng dễ nhìn


### 2.3 Rules String:
- MIN LENGTH:
	- key: "min_length"
	- rule's value type: number
	- description: số lượng ký tự tối thiểu cần nhập
	- khi có rule này: check chuỗi vừa nhập trim đi rồi so với số lượng ký tự phải lớn hơn min_length
- MAX LENGTH:
	- key: "max_length"
	- rule's value type: number
	- description: số lượng ký tự tối đa có thể nhập
	- khi có rule này: check chuỗi vừa nhập trim đi rồi so với số lượng ký tự phải bé hơn max_length
- UI TYPE:
	- key: "ui_type"
	- rule's value type: enum("normal", "text-area", "html-text")
	- description: kiểu ô nhập
	- khi có rule này: chọn UI phù hợp để hiển thị ra cho người dùng nhập
- IS SPACEABLE:
	- key: "is_spaceable"
	- rule's value type: boolean
	- description: có cho phép cách trong dữ liệu không ?
	- khi có rule này: 
		- Giá trị là true: được phép cách ra
		- Giá trị là false: không được cách ra phải ghi liền
- IS_UNIQUE:
	- key: "is_unique"
	- rule's value type: boolean
	- description: bắt buộc giá trị này phải là độc nhất
	- khi có rule này: 
		- Nếu là true: Sẽ có nút check kế bên
			- Điền xong người dùng sẽ phải nhấn nút check để check, nút check sẽ gọi API: "/product-types/{product_type.id}/attributes/{attribute.id}/check?value={input_value}"
			- Nếu check chưa tồn tại thì valid
- IS_UPPERCASE:
	- key: "is_uppercase"
	- rule's value type: boolean
	- description: tự động chuyển các ký tự người dùng nhập thành in hoa hết
	- khi có rule này: Tự động chuyển các ký tự người dùng nhập thành in hoa hết (nếu là true)
- IS_LOWERCASE:
	- key: "is_lowercase"
	- rule's value type: boolean
	- description: tự động chuyển các ký tự người dùng nhập thành in thường hết
	- khi có rule này: Tự động chuyển các ký tự người dùng nhập thành in thường hết (nếu là true)
- REGEX PATTERN:
	- key: "regex_pattern"
	- rule's value type: string
	- description: mẫu regex để valid các string đặc biệt
	- khi có rule này: chuỗi nhập vào phải đúng regex của giá trị regex_pattern


### 2.4 Rules Date:
- MIN DATE
	- key: "min_date"
	- rule's values type: ISO String
	- description: Ngày sớm nhất có thể set được giá trị
	- khi có rule này:
		- Ví dụ như min_date: "1970-01-01T00:00:00.000Z" thì không thể set giá trị sớm hơn như ngày 30/04/1954 được
- MAX DATE
	-  key: "max_date"
	- rule's values type: ISO String
	- description: Ngày trễ nhất có thể set được giá trị
	- khi có rule này:
		- Ví dụ như min_date: "2026-04-06T00:00:00.000Z" thì không thể set giá trị trễ hơn như ngày 07/04/2026 được
- IS DEFAULT DATE TODAY
	- key: "is_default_date_today"
	- rule's values type: boolean
	- description: Để hệ thống tự động gắn giá trị hiện tại thành giá trị khởi tạo luôn
	- khi có rule này: Hệ thống sẽ lấy Date.now() để làm giá trị cho attribute đó
- MAX DAY PAST
	- key: "max_day_past"
	- rule's values type: number (int)
	- description: khoảng cách tối đa mà ngày đã chọn cách ngày hôm nay về trước là bao nhiêu ngày
	- khi có rule này:
		- Ví dụ max_day_past là 3 thì hôm nay là ngày 06/04 => không thể chọn ngày nào sớm hơn 03/04 được, ví dụ như 02/04 sẽ invalid còn 03/04, 04/04. 05/04, 07/04 sẽ valid
- MAX DAY FUTURE
	- key: "max_day_future"
	- rule's values type: number (int)
	- description: khoảng cách tối đa mà ngày đã chọn cách ngày hôm nay về sau là bao nhiêu ngày
	- khi có rule này:
		- Ví dụ max_day_future là 3 thì hôm nay là ngày 06/04 => không thể chọn ngày nào trễ hơn 09/04 được, ví dụ như 10/04 sẽ invalid còn 07/04, 08/04. 09/04, 05/04 sẽ valid

### 2.5 Rules Enum:
- MIN OPTIONS
	- key: "min_options"
	- rule's values type: number (int)
	- description: Số lượng option tối thiểu phải chọn
	- khi có rule này:
		- Số lượng option user chọn sẽ phải lớn hơn hoặc bằng giá trị này
- MAX OPTIONS
	-  key: "max_options"
	- rule's values type: number (int)
	- description: Số lượng option tối đa phải chọn
	- khi có rule này:
		- Số lượng option user chọn sẽ phải bé hơn hoặc bằng giá trị này


# 3. Điền các attribute cho Product tùy theo Product Type:

- Như đã nói ở trên, sau khi điền xong các thông tin cơ bản. Người dùng sẽ phải điền các thông tin của các attribute tương ứng cho Product Type mà Product sở hữu. Phải thỏa:
	- Các validation rules đều phải được thỏa mãn
	- Các attribute is_required phải được điền hết và valid hết


# 4. Cập nhật các thông tin khác:

- Sau khi điền xong hết sẽ được yêu cầu hỏi về việc đây có phải một sản phẩm gốc cho 1 dòng sản phẩm không ? Hay là 1 variant của 1 sản phẩm khác:
	- Nếu chọn sản phẩm gốc thì thôi
	- Nếu chọn variant thì load ra tất cả các product chung product type và có parentId là null (tức là nó là parent)
- Đăng tải tiếp các ảnh thuộc sản phẩm đó:
	- Thay vì gửi cả file ảnh về backend thì tại front end up lên trên trước rồi trả về url
- Tạo các quantity config available cho sản phẩm:
	- User sẽ cần điền các thông tin sau cho 1 quantity config:
		- unit_name: string => tên của đơn vị
		- is_base_unit: boolean => là đơn vị tiêu chuẩn của mọi đơn vị đo quantity khác của sản phẩm này hay không
		- conversion_factor: number => tỉ số quy đổi so với base_unit, nếu nó chính là base_unit thì conversion_factor sẽ là 1
		- is_integer_only: boolean => chỉ được nhập số nguyên

# 5. Final, gửi về backend những gì ?

- Xong hết rồi, nút nhấn tạo sản phẩm sẽ cần gửi về API: `/products` như sau
	- API Url: `/products`
	- Method: POST
	- Body:
	``` ts
	const formData = {
		name: string,
		description: string,
		image_url: string, //Main Image URL
		product_type: {
			id: string,
			name: string,
			prefix: string
		},
		status_id: 1, // Status => Hết hàng (vì chưa có số lượng)
		listed_price: number,
		minimum_price: number,
		price_after_tax: boolean,
		is_expirable: boolean,
		min_order_range_count: number,
		minimum_saleable_range_count: number,
		parent_id: string || null,
		attribute_values: [
			{
				attribute: {
					id: string,
					name: string,
					key: string,
					data_type: string,
					sort_order: number,
				},
				value: number | string | boolean, 
			}, 
			// More ...
		],
		product_images: [
			{
				sort_order: number,
				image_url: string,
				is_primary: boolean
			},
			// More ...
		],
		quantity_configs: [
			{
				unit_name: string,
				is_base_unit: boolean,
				conversion_factor: number,
				is_integer_only: boolean,
			},
			// More ...
		]
	}
	```

# 6. Backend xử lý như nào ?

## 6.2 Xử lý tạo sản phẩm cơ bản trước:
Các thông số cơ bản đều đã có rồi, bây giờ tập trung tạo sản phẩm cơ bản trước để lấy được id đã. Sau đó mới tạo các thứ liên quan sau:

- Lấy thông tin các attribute_values ra để format lại thành 1 snapshot metadata cho sản phẩm, metadata đó sẽ có dạng JSON là:
``` ts

const formattedMetaData = {
	data.attribute_values[0].attribute.key = data.attribute_values[0].value,
	data.attribute_values[1].attribute.key = data.attribute_values[1].value,
	data.attribute_values[2].attribute.key = data.attribute_values[2].value,
	data.attribute_values[3].attribute.key = data.attribute_values[3].value,
	// ...
}

```

- Tạo sản phẩm mới với các thông số cần là:
``` ts
const newProduct = {
	code: `TEMP-${Date.now()}`,
	name: data.name,
	description: data.description,
	image_url: data.image_url,
	product_type_id: data.product_type.id,
	status_id: data.status_id,
	listed_price: data.listed_price,
	minimum_price: data.minimum_price,
	price_after_tax: data.price_after_tax,
	is_expirable: data.is_expirable,
	min_order_range_count: data.min_order_range_count,
	meta_data: formattedMetaData,
	parent_id: data.parent_id
}
```

- Nhận Id từ sản phẩm vừa tạo ra:
``` ts
const productId = await save(newProduct).id; //Đại loại như thế
```

- Tạo sku code mới cho product rồi cập nhật lại:
	- SKU Code mới sẽ được cấu thành từ:
	``` ts
	import short from 'short-uuid'; 
	
	const translator = short(); 
	const shortId = translator.fromUUID(productId); 
	
	const newCode = `${data.product_type.prefix}-${shortId}`
	```
	- Update lại product.code thành newCode mới đó
	
- Cập nhật lại img_url cho chuẩn:
	- Tạo đường link mới là: /products/${product.id}/main/image.webp
	- Update lại link


- Tiếp theo là ghi nhận lại các record attribute value ra bảng product_attribute_values:
	- Với mỗi 1 attribute_value, check xem data-type là gì:
		- Là number => tạo row với product_id, attribute_id và value_number
		- Là string => tạo row với product_id, attribute_id và value_string
		- Là boolean  => tạo row với product_id, attribute_id và value_boolean
		- Là date => tạo row với product_id, attribute_id và value_date
		- Là enum =>  => tạo row với product_id, attribute_id và value_enum_option_id

- Tạo các quantity_configs tương ứng với sản phẩm đó:

- Thay tên của các product_image thành url mới đã có id của product