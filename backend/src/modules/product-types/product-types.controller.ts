import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AccountRole } from 'src/database/enums';
import { ProductTypesService } from './product-types.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { ProductTypeBasicResponseDto, ProductTypeResponseDto } from './dto/product-type-response.dto';

@ApiTags('Product Types')
// @ApiBearerAuth('JWT-auth')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(AccountRole.ADMIN)
@Controller('product-types')
export class ProductTypesController {
    constructor(private readonly productTypesService: ProductTypesService) { }

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách loại sản phẩm' })
    @ApiOkResponse({ type: [ProductTypeResponseDto], description: 'Danh sách loại sản phẩm kèm config attributes và enum options' })
    async findAll() {
        return await this.productTypesService.findAll();
    }

    @Get('basic')
    @ApiOperation({summary: 'Chỉ lấy thông tin cơ bản của các loại sản phẩm, chủ yếu là trả ra id'})
    @ApiOkResponse({type: [ProductTypeBasicResponseDto], description: 'Danh sách loại sản phẩm'})
    async findAllBasic(){
        return await this.productTypesService.findAllBasic();
    };

    @Get(':id')
    @ApiOperation({summary: 'Lấy thông tin chi tiết của 1 Product Type'})
    @ApiOkResponse({type: ProductTypeResponseDto, description: 'Thông tin chi tiết của 1 Product Type'})
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
    ){
        return await this.productTypesService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Tạo loại sản phẩm mới' })
    async create(@Body() createProductTypeDto: CreateProductTypeDto) {
        return await this.productTypesService.create(createProductTypeDto);
    }
}
