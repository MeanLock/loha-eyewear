import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query,
    ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PrescriptionsService } from './prescriptions.service';
import { CreateEyePrescriptionDto } from './dto/create-eye-prescription.dto';
import { UpdateEyePrescriptionDto } from './dto/update-eye-prescription.dto';

@ApiTags('Prescriptions')
@Controller('prescriptions')
export class PrescriptionsController {
    constructor(private readonly prescriptionsService: PrescriptionsService) { }

    @Post()
    @ApiOperation({ summary: 'Tạo đơn đo mắt mới' })
    create(@Body() dto: CreateEyePrescriptionDto) {
        return this.prescriptionsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách đơn đo mắt' })
    @ApiQuery({ name: 'phone', required: false, description: 'Lọc theo số điện thoại' })
    findAll(@Query('phone') phone?: string) {
        if (phone) {
            return this.prescriptionsService.findByPhone(phone);
        }
        return this.prescriptionsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy chi tiết đơn đo mắt' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.prescriptionsService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Cập nhật đơn đo mắt' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateEyePrescriptionDto,
    ) {
        return this.prescriptionsService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Xóa đơn đo mắt' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.prescriptionsService.remove(id);
    }
}
