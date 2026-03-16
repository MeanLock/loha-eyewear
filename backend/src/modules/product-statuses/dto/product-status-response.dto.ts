import { ApiProperty } from '@nestjs/swagger';

export class ProductStatusResponseDto {
    @ApiProperty({ example: 1, description: 'ID của trạng thái sản phẩm' })
    id: number;

    @ApiProperty({ example: 'Active', description: 'Tên trạng thái sản phẩm' })
    name: string;
}
