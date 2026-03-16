import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        description: 'Mã SKU của sản phẩm (Duy nhất)',
        example: 'SP-001',
    })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({
        description: 'Tên sản phẩm',
        example: 'Gọng kính vuông thời trang V01',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({
        description: 'Mô tả chi tiết sản phẩm',
        example: 'Chất liệu titan nhẹ, bền bỉ, phù hợp gương mặt tròn...',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'Giá niêm yết (VND)',
        example: 1500000,
    })
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    listed_price: number;

    @ApiProperty({
        description: 'Giá bán thấp nhất có thể giảm (VND) - Giới hạn cho nhân viên sale',
        example: 1200000,
    })
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    minimum_price: number;

    @ApiPropertyOptional({
        description: 'Trạng thái có bao gồm thuế không',
        default: true,
    })
    @IsOptional()
    @IsBoolean()
    price_after_tax?: boolean;
}
