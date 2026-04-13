const PDFDocument = require('pdfkit');
const bwipjs = require('bwip-js');
const fs = require('fs');

async function test() {
    const doc = new PDFDocument({
        size: [198, 142], // Toàn bộ khổ giấy 7x5cm
        margin: 0,
    });
    doc.pipe(fs.createWriteStream('test.pdf'));

    const barcodeBuffer = await bwipjs.toBuffer({
        bcid: 'code128',
        text: 'GK-4191GPO4',
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: 'center',
    });

    doc.save();
    // Rotate to match portrait layout for easy styling
    doc.translate(0, 142);
    doc.rotate(-90, { origin: [0, 0] });

    // Barcode
    doc.image(barcodeBuffer, (142 - 110) / 2, 20, { width: 110 });

    doc.font('Helvetica-Bold').fontSize(12)
        .text('Price: 750,000 VND', 0, 75, { align: 'center', width: 142 });

    doc.font('Helvetica').fontSize(10)
        .text('Gong Nhua Kinh Can', 0, 100, { align: 'center', width: 142 });

    doc.font('Helvetica-Bold').fontSize(14)
        .text('Loc Hai Optic', 0, 125, { align: 'center', width: 142 });
    
    doc.restore();
    doc.end();
}
test();
