import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config(); // Load process.env from .env file

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'loha_user',
    password: process.env.DB_PASSWORD || 'loha_dev_2024',
    database: process.env.DB_DATABASE || 'loha_eyewear',
    entities: [join(__dirname, 'entities', '**', '*.entity{.ts,.js}')],
    migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
    synchronize: false, // Ensure this is always false for migrations
    logging: process.env.NODE_ENV === 'development',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
