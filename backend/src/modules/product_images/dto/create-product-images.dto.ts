import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateProductImageDto {
    @ApiProperty({
        description: 'URL của ảnh',
        example: 'https://example.com/image.jpg',
    })
    @IsString()
    @IsNotEmpty()
    product_id: string;

    @ApiProperty({
        description: 'URL của ảnh',
        example: 'https://example.com/image.jpg',
    })
    @IsString()
    @IsNotEmpty()
    image_url: string;

    @ApiProperty({
        description: 'Thứ tự hiển thị',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    sort_order: number;

    @ApiProperty({
        description: 'Ảnh chính',
        example: true,
    })
    @IsBoolean()
    @IsNotEmpty()
    is_primary: boolean;
};

export class CreateProductImagesDto {
    @ApiProperty({
        description: 'Danh sách các ảnh của sản phẩm',
        example: [
            {
                product_id: 'uuid',
                image_url: 'https://example.com/image.jpg',
                sort_order: 1,
                is_primary: true,
            },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductImageDto)
    product_images: CreateProductImageDto[];
}