import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';

export class ProductQuantityShipmentInfo {
  @ApiProperty({
    example: 50,
    description: 'Số lượng nhập trong shipment này',
  })
  input_amount: number;

  @ApiProperty({
    example: 50,
    description: 'Số lượng đã bán được trong shipment này',
  })
  sold_count: number;

  @ApiProperty({
    example: 100,
    description: 'Số lượng đã đặt trước trong shipment này',
  })
  reserved_amount: number;

  @ApiProperty({
    example: 'uuis',
    description: 'Id của cấu hình số lượng sản phẩm trong shipment này',
  })
  quantity_config_id: string;
}

export class ProductStatusInfo {
  @ApiProperty({
    example: 2,
    description: 'ID của trạng thái sản phẩm (1: Đang bán, 2: Ngừng bán)',
  })
  id: number;

  @ApiProperty({
    example: 'Đang bán',
    description: 'Tên của trạng thái sản phẩm',
  })
  name: string;
}

export class ProductResponseDto {
  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID của sản phẩm',
  })
  @IsString()
  id: string;

  @ApiProperty({ example: 'SP-001', description: 'Mã SKU của sản phẩm' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Kính thời trang', description: 'Tên sản phẩm' })
  name: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL của hình ảnh sản phẩm',
  })
  image_url: string;

  @ApiProperty({ example: 1500000, description: 'Giá niêm yết của sản phẩm' })
  listed_price: number;

  @ApiProperty({ example: 1500000, description: 'Giá tối thiểu của sản phẩm' })
  minimum_price: number;

  @ApiProperty({
    example: 1500000,
    description:
      'Số ngày tính từ ngày hết hạn tới hôm nay tối thiểu để sản phẩm có thể được bán.',
  })
  minimum_saleable_range_count: number;

  @ApiProperty({ example: 1500000, description: 'Số lượng đơn hàng tối thiểu' })
  min_order_range_count: number;

  @ApiProperty({ example: true, description: 'Giá đã bao gồm thuế hay chưa ?' })
  price_after_tax: boolean;

  @ApiProperty({ example: true, description: 'Có thể hết hạn' })
  is_expirable: boolean;

  @ApiProperty({
    example: 0,
    description: 'Tổng số lượng có thể bán được (tính cả các shipment)',
  })
  total_available_quantity: number; // Tổng số lượng có thể bán được (tính cả các shipment)

  @ApiProperty({
    example: 0,
    description: 'Tổng số lượng shipment chứa sản phẩm này',
  })
  total_shipments: number; // Tổng số lượng shipment chứa sản phẩm này

  @ApiProperty({
    example: 0,
    description: 'Tổng số sản phẩm đã hết hạn',
  })
  total_expired_quantity: number; // Tổng số sản phẩm đã hết hạn

  @ApiProperty({
    example: {
      id: 2,
      name: 'Đang Bán',
    },
    description: 'Thông tin về trạng thái của sản phẩm',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => ProductStatusInfo)
  status: ProductStatusInfo;
}
