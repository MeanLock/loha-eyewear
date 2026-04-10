import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
    @ApiProperty({ format: 'uuid' })
    id: string;

    @ApiProperty({ example: 'SP-001' })
    code: string;

    @ApiProperty({ example: 'Kính thời trang' })
    name: string;

    @ApiProperty({ example: 'https://example.com/image.jpg' })
    image_url: string;

    @ApiProperty({ example: 1500000 })
    listed_price: number;

    @ApiProperty({ example: 1500000 })
    minimum_price: number;

    @ApiProperty({ example: 1500000 })
    minimum_saleable_range_count: number;

    @ApiProperty({ example: 1500000 })
    min_order_range_count: number;

    @ApiProperty({ example: 1500000 })
    price_after_tax: boolean;

    @ApiProperty({ example: 1500000 })
    is_expirable: boolean;

    @ApiProperty({ example: 1500000 })
    parent_id?: string | null;
}
