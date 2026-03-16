import { DataSource } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import {
    ProductStatus,
    ShipmentStatus,
    OrderStatus,
    PaymentMethod,
    WarrantyClaimStatus,
    VatConfig,
} from '../entities';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    console.log('🚀 Starting database seed...');

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
        // 2. Shipment Statuses
        console.log('Seeding ShipmentStatus...');
        await queryRunner.manager.save(ShipmentStatus, [
            { id: 1, name: 'draft' },
            { id: 2, name: 'ordered' },
            { id: 3, name: 'in_transit' },
            { id: 4, name: 'received' },
            { id: 5, name: 'cancelled' },
        ]);

        // 3. Order Statuses
        console.log('Seeding OrderStatus...');
        await queryRunner.manager.save(OrderStatus, [
            { id: 1, name: 'pending' },
            { id: 2, name: 'confirmed' },
            { id: 3, name: 'processing' },
            { id: 4, name: 'ready_for_pickup' },
            { id: 5, name: 'completed' },
            { id: 6, name: 'cancelled' },
            { id: 7, name: 'refunded' },
        ]);

        // 4. Payment Methods
        console.log('Seeding PaymentMethod...');
        await queryRunner.manager.save(PaymentMethod, [
            { id: 1, name: 'cash', is_active: true },
            { id: 2, name: 'bank_transfer', is_active: true },
            { id: 3, name: 'card', is_active: true },
            { id: 4, name: 'momo', is_active: true },
            { id: 5, name: 'other', is_active: true },
        ]);

        // 5. Warranty Claim Statuses
        console.log('Seeding WarrantyClaimStatus...');
        await queryRunner.manager.save(WarrantyClaimStatus, [
            { id: 1, name: 'pending' },
            { id: 2, name: 'approved' },
            { id: 3, name: 'rejected' },
            { id: 4, name: 'resolved' },
        ]);

        // 6. VAT Configs
        console.log('Seeding VatConfig...');
        await queryRunner.manager.save(VatConfig, [
            { id: 1, name: 'VAT 10%', value: 0.1, is_active: true, is_default: true },
            { id: 2, name: 'VAT 8%', value: 0.08, is_active: true, is_default: false },
            { id: 3, name: 'No VAT', value: 0, is_active: true, is_default: false },
        ]);

        console.log('✅ Seeding completed successfully!');
    } catch (error) {
        console.error('❌ Error during seeding:', error);
    } finally {
        await queryRunner.release();
        await app.close();
    }
}

bootstrap();
