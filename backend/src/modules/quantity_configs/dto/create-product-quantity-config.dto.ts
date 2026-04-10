import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";

export class CreateProductQuantityConfigDto {
    @IsUUID()
    @IsNotEmpty()
    product_id: string;

    @IsString()
    @IsNotEmpty()
    unit_name: string;

    @IsBoolean()
    @IsNotEmpty()
    is_base_unit: boolean;

    @IsNumber()
    @IsNotEmpty()
    conversion_factor: number;

    @IsBoolean()
    @IsNotEmpty()
    is_integer_only: boolean;
}

export class CreateProductQuantityConfigsDto {
    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateProductQuantityConfigDto)
    quantity_configs: CreateProductQuantityConfigDto[];
}