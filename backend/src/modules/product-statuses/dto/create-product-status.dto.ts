import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProductStatusDto {
    @ApiProperty({
        description: 'Tên trạng thái sản phẩm',
        example: 'Active',
        maxLength: 50,
    })
    @IsNotEmpty({ message: 'Tên trạng thái không được để trống' })
    @IsString({ message: 'Tên trạng thái phải là chuỗi ký tự' })
    @MaxLength(50, { message: 'Tên trạng thái không được vượt quá 50 ký tự' })
    name: string;
}
