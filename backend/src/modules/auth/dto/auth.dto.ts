import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class SearchCustomerDto {
    @ApiProperty({ required: false })
    @IsOptional() // Đổi từ IsNotEmpty sang IsOptional để linh hoạt
    @IsPhoneNumber('VN')
    phone?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    birthYear?: number;
}

export class CreateCustomerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber('VN')
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    birthYear: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    dob?: string; // ISO String từ Frontend
}