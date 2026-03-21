import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductStatusesModule } from './modules/product-statuses/product-statuses.module';
import { ProductTypesModule } from './modules/product-types/product-types.module';
import { ProductTypeConfigAttributesModule } from './modules/product-type-config-attributes/product-type-config-attributes.module';
import { ProductEnumAttributeOptionsModule } from './modules/product-enum-attribute-options/product-enum-attribute-options.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: process.env.NODE_ENV === 'development',
      }),
    }),
    ProductsModule,
    AuthModule,
    ProductStatusesModule,
    ProductTypesModule,
    ProductTypeConfigAttributesModule,
    ProductEnumAttributeOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
