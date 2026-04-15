// dto/query-products.dto.ts
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class QueryProductsDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  productTypeId?: string;
}
