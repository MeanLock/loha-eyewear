import { IsArray, IsBoolean, IsEAN, IsEnum, IsInt, IsObject, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { type ValidationRules } from "../types/validation-rules.type";
import { Type } from "class-transformer";
import { AttributeEnumOptionDto } from "src/modules/product-enum-attribute-options/dto/product-enum-attribute-option.enum";
import { AttributeDataType } from "src/database/enums";

export class CreateProductTypeConfigAttributeDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    key: string;

    @IsString()
    @IsOptional()
    @MinLength(1)
    product_type_id: string;

    @IsEnum(AttributeDataType)
    data_type: AttributeDataType;

    @IsBoolean()
    is_required: boolean;

    @IsInt()
    sort_order: number;

    @IsObject()
    @IsOptional()
    @Type(() => Object)
    validation_rules: ValidationRules;

    @IsArray()
    @ValidateNested({ each: true })
    @IsOptional()
    @Type(() => AttributeEnumOptionDto)
    options?: AttributeEnumOptionDto[];
}