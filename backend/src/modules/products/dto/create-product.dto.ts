import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

class ProductTypeDto {
    @ApiProperty({
        description: 'ID của loại sản phẩm (uuid)',
        example: '1',
    })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        description: 'Tên của loại sản phẩm',
        example: 'Gọng Kính',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Prefix của loại sản phẩm',
        example: 'GK',
    })
    @IsString()
    @IsNotEmpty()
    prefix: string
};

class AttributeDetailDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    key: string;

    @IsString()
    @IsNotEmpty()
    data_type: string;

    @IsNumber()
    @IsOptional()
    sort_order: number;
}

// 2. Định nghĩa DTO cho từng item trong mảng
class AttributeValueItemDto {
    @ValidateNested()
    @Type(() => AttributeDetailDto)
    attribute: AttributeDetailDto;

    @IsDefined() // Chấp nhận bất cứ kiểu dữ liệu nào miễn là có giá trị
    value: string | number | boolean;
}

class ProductImageDto {
    @ApiProperty({
        description: 'URL của ảnh',
        example: 'https://example.com/product.jpg',
    })
    @IsString()
    @IsNotEmpty()
    image_url: string;

    @ApiProperty({
        description: 'Thứ tự hiển thị của ảnh',
        example: 1,
    })
    @IsNumber()
    @IsOptional()
    sort_order: number;

    @ApiProperty({
        description: 'Có phải ảnh chính hay không',
        example: true,
    })
    @IsBoolean()
    @IsNotEmpty()
    is_primary: boolean;
}

class QuantityConfigDto {
    @ApiProperty({
        description: "Tên của đơn vị",
        example: "Cái, Hộp"
    })
    @IsString()
    @IsNotEmpty()
    unit_name: string;

    @ApiProperty({
        description: "Có phải đơn vị cơ bản nhất của sản phẩm không?",
        example: true,
    })
    @IsBoolean()
    @IsNotEmpty()
    is_base_unit: boolean;

    @ApiProperty({
        description: "Tỉ lệ chuyển đổi so với đơn vị cơ bản.",
        example: 1,
    })
    @IsNumber()
    @Min(0)
    conversion_factor: number;

    @ApiProperty({
        description: "Chỉ được nhập số nguyên ?",
        example: true
    })
    @IsBoolean()
    @IsNotEmpty()
    is_integer_only: boolean;
}

export class CreateProductDto {
    @ApiProperty({
        description: 'Tên sản phẩm',
        example: 'Sản Phẩm A',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Mô tả sản phẩm (HTML Text)',
        example: '<p>Mô tả chi tiết sản phẩm</p>',
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Ảnh sản phẩm (ảnh chính)',
        example: 'https://example.com/product.jpg',
    })
    @IsString()
    image_url: string;


    @ApiProperty({
        description: 'Thông tin loại sản phẩm',
        example: {
            id: '1',
            name: 'Loại sản phẩm A',
            prefix: 'Loại sản phẩm A'
        },
    })
    @Type(() => ProductTypeDto)
    @ValidateNested()
    @IsNotEmpty()
    product_type: ProductTypeDto;

    @ApiProperty({
        description: 'Id Trạng Thái Sản Phẩm',
        example: 1,
    })
    @IsNumber()
    status_id: number;


    @ApiProperty({
        description: 'Giá niêm yết',
        example: 800000,
    })
    @IsNumber()
    @Min(1)
    listed_price: number;


    @ApiProperty({
        description: 'Giá bán thấp nhất',
        example: 800000,
    })
    @IsNumber()
    @Min(0)
    minimum_price: number;

    @ApiProperty({
        description: 'Giá đã bao gồm thuế chưa',
        example: true,
    })
    @IsBoolean()
    @IsOptional()
    price_after_tax?: boolean;

    @ApiProperty({
        description: "Sản phẩm có thể bị hết hạn không ?",
        example: true,
    })
    @IsBoolean()
    is_expirable: boolean;

    @ApiProperty({
        description: "Số ngày tối thiểu cần để đặt sản phẩm này",
        example: 1,
    })
    @IsNumber()
    @Min(1)
    min_order_range_count: number;

    @ApiProperty({
        description: "Khoảng cách ngày tối thiểu để sản phẩm được bán ra nếu sản phẩm có thể bị hết hạn.",
        example: 1,
    })
    @IsNumber()
    @Min(0)
    minimum_saleable_range_count: number;

    @ApiProperty({
        description: "Sản phẩm gốc",
        example: "uuid",
    })
    @IsString()
    @IsOptional()
    parent_id?: string;

    @ApiProperty({
        description: 'Thuộc tính sản phẩm',
        example: [
            {
                attribute: {
                    name: 'Thuộc tính 1',
                    key: 'Thuộc tính 1',
                    data_type: 'Thuộc tính 1',
                    sort_order: 1,
                },
                value: 'Giá trị 1',
            },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true }) // Quan trọng: "each: true" để validate từng phần tử mảng
    @Type(() => AttributeValueItemDto)
    attribute_values: AttributeValueItemDto[];

    @ApiProperty({
        description: 'Ảnh sản phẩm',
        example: [
            {
                image_url: 'https://example.com/product.jpg',
                sort_order: 1,
                is_primary: true,
            },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductImageDto)
    product_images: ProductImageDto[];

    @ApiProperty({
        description: 'Cấu hình đơn vị tính sản phẩm',
        example: [
            {
                unit_name: 'Cái',
                is_base_unit: true,
                conversion_factor: 1,
                is_integer_only: true,
            },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuantityConfigDto)
    quantity_configs: QuantityConfigDto[];
}
