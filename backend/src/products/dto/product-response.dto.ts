import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
    @ApiProperty({ format: 'uuid' })
    id: string;

    @ApiProperty({ example: 'SP-001' })
    code: string;

    @ApiProperty({ example: 'Kính thời trang' })
    name: string;

    @ApiProperty({ example: 1500000 })
    listed_price: number;
}
