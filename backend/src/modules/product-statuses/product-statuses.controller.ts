import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { ProductStatusesService } from './product-statuses.service';
import { CreateProductStatusDto } from './dto/create-product-status.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { AccountRole } from '../../database/enums/account-role.enum';
import { ApiEnvelopeResponse } from '../../common/decorators/swagger.decorator';
import { ProductStatusResponseDto } from './dto/product-status-response.dto';

@ApiTags('Product Statuses')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(AccountRole.ADMIN)
@Controller('product-statuses')
export class ProductStatusesController {
    constructor(private readonly productStatusesService: ProductStatusesService) { }

    @Post()
    @ApiOperation({ summary: 'Tạo trạng thái sản phẩm mới' })
    @ApiEnvelopeResponse({ type: ProductStatusResponseDto, description: 'Trạng thái đã được tạo thành công' })
    async create(@Body() createProductStatusDto: CreateProductStatusDto) {
        return await this.productStatusesService.create(createProductStatusDto);
    }

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách tất cả các trạng thái' })
    @ApiEnvelopeResponse({ type: ProductStatusResponseDto, isArray: true, description: 'Trả về danh sách trạng thái' })
    async findAll() {
        return await this.productStatusesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy chi tiết trạng thái theo ID' })
    @ApiParam({ name: 'id', description: 'ID của trạng thái', example: 1 })
    @ApiEnvelopeResponse({ type: ProductStatusResponseDto, description: 'Trả về chi tiết trạng thái' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.productStatusesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Cập nhật thông tin trạng thái theo ID' })
    @ApiParam({ name: 'id', description: 'ID của trạng thái', example: 1 })
    @ApiEnvelopeResponse({ type: ProductStatusResponseDto, description: 'Cập nhật thành công' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProductStatusDto: UpdateProductStatusDto,
    ) {
        return await this.productStatusesService.update(id, updateProductStatusDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Xoá vĩnh viễn trạng thái theo ID' })
    @ApiParam({ name: 'id', description: 'ID của trạng thái', example: 1 })
    @ApiEnvelopeResponse({ type: Object, description: 'Xoá thành công' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.productStatusesService.remove(id);
    }
}
