import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
    @ApiPropertyOptional({
        description: 'Vị trí bắt đầu lấy dữ liệu',
        minimum: 0,
        default: 0,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    offset?: number = 0;

    @ApiPropertyOptional({
        description: 'Số lượng dữ liệu tối đa mỗi trang',
        minimum: 1,
        maximum: 100,
        default: 20,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 20;
}
