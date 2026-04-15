import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  NotFoundException,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiExtraModels,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { AccountRole } from '../../database/enums/account-role.enum';
import { ApiEnvelopeResponse } from '../../common/decorators/swagger.decorator';
import { ProductResponseDto } from './dto/product-response.dto';
import { QueryProductsDto } from './dto/query-product.dto';

@ApiTags('Products') // Gom nhóm API trên Swagger
// @ApiBearerAuth('JWT-auth') // Đánh dấu cần token
@UseGuards(JwtAuthGuard, RolesGuard) // Áp dụng check token và roles
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(AccountRole.ADMIN, AccountRole.MANAGER)
  @ApiOperation({
    summary: 'Tạo sản phẩm mới',
    description: 'API dành cho Admin/Manager để tạo sản phẩm core',
  })
  @ApiEnvelopeResponse({ type: ProductResponseDto })
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách sản phẩm',
    description: 'Hỗ trợ phân trang, phục vụ trang quản lý.',
  })
  @ApiEnvelopeResponse({
    type: ProductResponseDto,
    isArray: true,
    isPaginated: true,
  })
  @Get()
  async findAll(@Query() query: QueryProductsDto, @Req() req: any) {
    return this.productsService.findAll(query, req.user?.role);
  }

  @Get('by-type/:productTypeId')
  @ApiOperation({
    summary: 'Lấy danh sách sản phẩm theo loại sản phẩm',
    description: 'Hỗ trợ pagination',
  })
  @ApiEnvelopeResponse({
    type: ProductResponseDto,
    isArray: true,
    isPaginated: true,
  })
  async findByProductType(
    @Param('productTypeId') productTypeId: string,
    @Query() pagination: PaginationDto,
    @Req() req: any,
  ): Promise<any> {
    const user = req.user; // Lấy thông tin user từ request (đã được validate bởi JwtAuthGuard)
    const userRole = user?.role; // Giả sử role được lưu trong token
    try {
      const result = await this.productsService.findByProductType(
        productTypeId,
        pagination,
        userRole,
      );
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `Loại sản phẩm với ID ${productTypeId} không tồn tại.`,
        );
      }
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết 1 sản phẩm' })
  @ApiParam({
    name: 'id',
    description: 'UUID của sản phẩm',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @ApiEnvelopeResponse({ type: ProductResponseDto })
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Get('parents/:productTypeId')
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm cha' })
  @ApiParam({ name: 'productTypeId', description: 'UUID của loại sản phẩm' })
  @ApiEnvelopeResponse({ type: ProductResponseDto, isArray: true })
  async findParents(@Param('productTypeId') productTypeId: string) {
    return await this.productsService.findParents(productTypeId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin sản phẩm' })
  @ApiParam({ name: 'id', description: 'UUID của sản phẩm' })
  @ApiEnvelopeResponse({ type: ProductResponseDto })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá (Soft Delete) sản phẩm' })
  @ApiParam({ name: 'id', description: 'UUID của sản phẩm' })
  @ApiEnvelopeResponse({ type: Object, description: 'Xoá thành công' })
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(id);
  }
}
