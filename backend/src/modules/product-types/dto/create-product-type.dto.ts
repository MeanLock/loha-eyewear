import { Type } from "class-transformer";
import { IsArray, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateProductTypeConfigAttributeDto } from "src/modules/product-type-config-attributes/dto/product-type-config-attribute.dto";

export class CreateProductTypeDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductTypeConfigAttributeDto)
    attributes: CreateProductTypeConfigAttributeDto[];
}