import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import express from 'express';
import { PrintingService } from './printing.service';

@ApiTags('Printing')
@Controller('printing')
export class PrintingController {
    constructor(private readonly printingService: PrintingService) { }

    @Get(':id/pdf')
    @ApiOperation({ summary: 'In Barcode PDF cho Sản phẩm' })
    async getProductPdf(@Param('id') id: string, @Res() res: express.Response) {
        // Cài đặt Headers trả về luồng PDF
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="product_barcode_${id}.pdf"`,
        });

        // Gọi service tạo PDF
        await this.printingService.generateOpticalPdf(id, res);
    }

    @Get('test-direction')
    async testDirection(@Res() res: express.Response) {
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="test.pdf"`,
        });
        await this.printingService.testPrinterDirection(res);
    }

    @Get('test-full-page')
    async testFullPage(@Res() res: express.Response) {
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="test_full.pdf"`,
        });
        await this.printingService.testPrintFullPage(res);
    }
}
