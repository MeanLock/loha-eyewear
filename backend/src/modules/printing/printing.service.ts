import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/database/entities';
import { DataSource } from 'typeorm';
const PDFDocument = require('pdfkit');
import * as bwipjs from 'bwip-js';
import { Response } from 'express';

@Injectable()
export class PrintingService {
    constructor(private dataSource: DataSource) { }

    async generateOpticalPdf(id: string, res: Response) {
        const product = await this.dataSource.getRepository(Product).findOne({ where: { id } });
        if (!product) throw new NotFoundException(`Product not found`);

        const doc = new PDFDocument({
            size: [142, 85],
            margin: 0,
        });
        doc.pipe(res);

        // ĐĂNG KÝ FONT TIẾNG VIỆT (Thay đường dẫn đúng font của bạn)
        doc.registerFont('Vietnamese', './fonts/BeVietnamPro-Regular.ttf');
        doc.registerFont('VietnameseBold', './fonts/BeVietnamPro-Bold.ttf');
        // BẮT BUỘC: Bạn phải có font này để in tiếng Việt không bị ô vuông
        doc.registerFont('MainFont', './fonts/Roboto-Regular.ttf');
        doc.registerFont('BoldFont', './fonts/Roboto-Bold.ttf');

        doc.save();
        // Di chuyển và xoay để in dọc theo chiều 4.5cm của con tem
        // Tọa độ này giúp chữ chạy từ trái sang phải nếu bạn nhìn con tem nằm ngang
        doc.translate(0, 85);
        doc.rotate(-90, { origin: [0, 0] });

        // HỆ TỌA ĐỘ SAU XOAY: X chạy dọc (0->85), Y chạy ngang (0->142)

        // Lề trái 0.5cm = 14pt
        // Mỗi miếng tem rộng 1.5cm = 42.5pt
        const leftMargin = 10;
        const itemWidth = 42.5;
        const contentHeight = 127; // 4.5cm chiều dài tem

        // --- MIẾNG 1 (Bên trái nhất - Thường in Barcode) ---
        const y1 = leftMargin;
        let currentY = y1;
        doc.font('VietnameseBold').fontSize(5)
            .text('LOHA EYEWEAR', 5, currentY, { width: 75, align: 'center' });
        currentY = doc.y + 0;

        // Tên SP (Dùng font Bold nếu đã register)
        doc.font('Vietnamese').fontSize(4)
            .text(product.name.substring(0, 40), 5, currentY, {
                width: 75,
                align: 'center',
                lineGap: 0.5
            });
        currentY = doc.y + 0;

        // Giá tiền
        const price = `${Number(product.listed_price).toLocaleString()} VND`;
        doc.font('VietnameseBold').fontSize(7)
            .text(price, 5, currentY, { width: 75, align: 'center' });

        // --- MIẾNG 2 (Ở giữa - In Tên và Giá) ---
        const y2 = leftMargin + itemWidth; // Khoảng 54.5pt
        const x = 5;
        const textWidth = 75;

        // 1. Dùng SAVE để xoay ngược 180 độ cho cả cụm (Code + Barcode)
        doc.save();

        // Xoay 180 độ quanh tâm của Miếng 2 để khi gập tem lại nó xuôi chiều
        doc.rotate(180, { origin: [x + textWidth / 2, y2 + 20] });

        // 3. In Barcode ngay dưới Product Code (vẫn trong block xoay 180)
        const barcodeBuffer = await bwipjs.toBuffer({
            bcid: 'code128',
            text: product.code || '123456',
            scale: 5,
            height: 12, // Độ cao thanh barcode
            includetext: true // Tắt text mặc định của bwipjs vì mình đã in ở trên rồi
        });

        // In Barcode tại vị trí y2 + 10 (để cách mã SP ra một chút)
        doc.image(barcodeBuffer, x, y2 + 30, { width: textWidth });

        // 4. RESTORE để thoát khỏi chế độ xoay 180 độ
        doc.restore();

        // Kết thúc
        doc.restore(); // Restore cuối cùng để về trạng thái gốc của PDF
        doc.end();
    }

    async testPrinterDirection(res: Response) {
        const name = "Gọng Nhựa TR-39";
        const price = "450,000 VND";

        const doc = new PDFDocument({
            size: [142, 85],
            margin: 0,
        });
        doc.pipe(res);

        // ĐĂNG KÝ FONT TIẾNG VIỆT (Thay đường dẫn đúng font của bạn)
        doc.registerFont('Vietnamese', './fonts/BeVietnamPro-Regular.ttf');
        doc.registerFont('VietnameseBold', './fonts/BeVietnamPro-Bold.ttf');
        // BẮT BUỘC: Bạn phải có font này để in tiếng Việt không bị ô vuông
        doc.registerFont('MainFont', './fonts/Roboto-Regular.ttf');
        doc.registerFont('BoldFont', './fonts/Roboto-Bold.ttf');

        doc.save();
        // Di chuyển và xoay để in dọc theo chiều 4.5cm của con tem
        // Tọa độ này giúp chữ chạy từ trái sang phải nếu bạn nhìn con tem nằm ngang
        doc.translate(0, 85);
        doc.rotate(-90, { origin: [0, 0] });

        // HỆ TỌA ĐỘ SAU XOAY: X chạy dọc (0->85), Y chạy ngang (0->142)

        // Lề trái 0.5cm = 14pt
        // Mỗi miếng tem rộng 1.5cm = 42.5pt
        const leftMargin = 10;
        const itemWidth = 42.5;
        const contentHeight = 127; // 4.5cm chiều dài tem

        // --- MIẾNG 1 (Bên trái nhất - Thường in Barcode) ---
        const y1 = leftMargin;
        let currentY = y1;
        doc.font('VietnameseBold').fontSize(5)
            .text('LỘC HẢI OPTIC', 5, currentY, { width: 75, align: 'center' });
        currentY = doc.y + 0;

        // Tên SP (Dùng font Bold nếu đã register)
        doc.font('Vietnamese').fontSize(5)
            .text(name, 5, currentY, {
                width: 75,
                align: 'center',
                lineGap: 0.5
            });
        currentY = doc.y + 0.5;

        // Giá tiền
        doc.font('VietnameseBold').fontSize(7)
            .text(price, 5, currentY, { width: 75, align: 'center' });

        // --- MIẾNG 2 (Ở giữa - In Tên và Giá) ---
        const y2 = leftMargin + itemWidth; // Khoảng 54.5pt
        const x = 5;
        const textWidth = 75;

        // 1. Dùng SAVE để xoay ngược 180 độ cho cả cụm (Code + Barcode)
        doc.save();

        // Xoay 180 độ quanh tâm của Miếng 2 để khi gập tem lại nó xuôi chiều
        doc.rotate(180, { origin: [x + textWidth / 2, 33] });

        doc.font('VietnameseBold').fontSize(5)
            .text('LỘC HẢI OPTIC', 5, 0, { width: 75, align: 'center' });

        // In Barcode tại vị trí y2 + 10 (để cách mã SP ra một chút)
        // Tên SP (Dùng font Bold nếu đã register)
        doc.font('Vietnamese').fontSize(5)
            .text(name, 5, doc.y, {
                width: 75,
                align: 'center',
                lineGap: 0.5
            });
        currentY = doc.y + 0;

        // Giá tiền
        doc.font('VietnameseBold').fontSize(7)
            .text(price, 5, doc.y + 0.5, { width: 75, align: 'center' });

        // 4. RESTORE để thoát khỏi chế độ xoay 180 độ
        doc.restore();

        // Kết thúc
        doc.restore(); // Restore cuối cùng để về trạng thái gốc của PDF
        doc.end();
    }

    async testPrintFullPage(res: Response) {
        const doc = new PDFDocument({
            size: [50, 85], // 50mm x 70mm
            margin: 0,
        });
        doc.pipe(res);

        // 1. Vẽ khung viền để xem có bị mất lề không
        doc.rect(0, 0, 50, 85).stroke();

        // 2. Test hướng mặc định (Không xoay)
        doc.fillColor('red').fontSize(10)
            .text('GOC 0,0 - MAC DINH', 5, 5);

        // 3. Test hướng sau khi xoay -90 độ (Giống code cũ của bạn)
        doc.save();
        doc.translate(0, 85);
        doc.rotate(-90, { origin: [0, 0] });

        doc.fillColor('blue').fontSize(7)
            .text('--- CHU NAY DANG XOAY -90 DO ---', 10, 20);

        // Vẽ một hình chữ nhật dài theo chiều 198 mới
        doc.rect(10, 40, 178, 20).stroke();
        doc.restore();

        doc.end();
    }
}
