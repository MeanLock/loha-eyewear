import { DataSource } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../../app.module';
import { Account } from '../entities';
import { AccountRole } from '../enums/account-role.enum';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    console.log('🚀 Starting account seed...');

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
        console.log('Seeding Accounts...');
        const defaultPassword = await bcrypt.hash('123456', 10);

        const accounts = [
            {
                email: 'admin@loha.com',
                username: 'admin',
                full_name: 'System Admin',
                password_hash: defaultPassword,
                role: AccountRole.ADMIN,
                is_verified: true,
            },
            {
                email: 'manager1@loha.com',
                username: 'manager1',
                full_name: 'Store Manager',
                password_hash: defaultPassword,
                role: AccountRole.MANAGER,
                is_verified: true,
            },
            {
                email: 'salestaff1@loha.com',
                username: 'salestaff1',
                full_name: 'Sale Staff 1',
                password_hash: defaultPassword,
                role: AccountRole.SALE_STAFF,
                is_verified: true,
            },
            {
                email: 'manustaff1@loha.com',
                username: 'manustaff1',
                full_name: 'Manufacturing Staff 1',
                password_hash: defaultPassword,
                role: AccountRole.MANUFACTURING_STAFF,
                is_verified: true,
            }
        ];

        const repo = queryRunner.manager.getRepository(Account);

        for (const acc of accounts) {
            const existing = await repo.findOneBy({ email: acc.email });
            if (!existing) {
                await repo.save(repo.create(acc));
                console.log(`Created: ${acc.email} - ${acc.role}`);
            } else {
                console.log(`Skipped: ${acc.email} already exists`);
            }
        }

        console.log('✅ Seeding Accounts completed successfully!');
    } catch (error) {
        console.error('❌ Error during seeding accounts:', error);
    } finally {
        await queryRunner.release();
        await app.close();
    }
}

bootstrap();
