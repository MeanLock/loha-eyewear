import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AccountRole } from 'src/database/enums';
import { ProductTypesService } from './product-types.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';

@ApiTags('Product Types')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(AccountRole.ADMIN)
@Controller('product-types')
export class ProductTypesController {
    constructor(private readonly productTypesService: ProductTypesService) { }

    @Post()
    @ApiOperation({ summary: 'Tạo loại sản phẩm mới' })
    async create(@Body() createProductTypeDto: CreateProductTypeDto) {
        return await this.productTypesService.create(createProductTypeDto);
    }
}
