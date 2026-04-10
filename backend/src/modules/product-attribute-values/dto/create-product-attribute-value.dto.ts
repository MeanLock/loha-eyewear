import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";


export class CreateProductAttributeValueDto {
    @ApiProperty({
        description: 'ID của sản phẩm',
        example: 'uuid',
    })
    @IsString()
    @IsNotEmpty()
    product_id: string;

    @ApiProperty({
        description: 'ID của thuộc tính',
        example: 'uuid',
    })
    @IsString()
    @IsNotEmpty()
    attribute_id: string;

    @ApiProperty({
        description: 'Giá trị chuỗi của thuộc tính',
        example: 'Thuộc tính 1',
    })
    @IsString()
    @IsOptional()
    value_string?: string | null;

    @ApiProperty({
        description: 'Giá trị số của thuộc tính',
        example: 'Thuộc tính 1',
    })
    @IsNumber()
    @IsOptional()
    value_number?: number | null;

    @ApiProperty({
        description: 'Giá trị boolean của thuộc tính',
        example: true,
    })
    @IsBoolean()
    @IsOptional()
    value_boolean?: boolean | null;

    @ApiProperty({
        description: 'Giá trị ngày của thuộc tính',
        example: '2022-01-01',
    })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    value_date?: Date | null;

    @ApiProperty({
        description: 'ID của option trong thuộc tính',
        example: 'uuid',
    })
    @IsString()
    @IsOptional()
    value_enum_option_id?: string | null;
}

export class CreateProductAttributeValuesDto {
    @ApiProperty({
        description: 'Danh sách các thuộc tính của sản phẩm',
        example: [
            {
                product_id: 'uuid',
                attribute_id: 'uuid',
                value_string: 'Thuộc tính 1',
                value_number: 1,
                value_boolean: true,
                value_date: '2022-01-01',
                value_enum_option_id: 'uuid',
            },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductAttributeValueDto)
    attribute_values: CreateProductAttributeValueDto[];
}