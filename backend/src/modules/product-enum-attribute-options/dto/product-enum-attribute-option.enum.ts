import { IsString, IsNotEmpty, IsOptional, IsUrl, IsIn, IsInt } from "class-validator";

export class AttributeEnumOptionDto {
    @IsString()
    @IsNotEmpty()
    value: string;

    @IsString()
    @IsOptional()
    image_url: string;

    @IsInt()
    sort_order: number;
}