import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductStatusesModule } from './modules/product-statuses/product-statuses.module';
import { ProductTypesModule } from './modules/product-types/product-types.module';
import { ProductTypeConfigAttributesModule } from './modules/product-type-config-attributes/product-type-config-attributes.module';
import { ProductEnumAttributeOptionsModule } from './modules/product-enum-attribute-options/product-enum-attribute-options.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { PrescriptionsModule } from './modules/prescriptions/prescriptions.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrdersController } from './modules/orders/orders.controller';
import { OrdersService } from './modules/orders/orders.service';
import { ProductAttributeValuesModule } from './modules/product-attribute-values/product-attribute-values.module';
import { QuantityConfigsModule } from './modules/quantity_configs/quantity_configs.module';
import { ProductImagesModule } from './modules/product_images/product_images.module';
import { PrintingModule } from './modules/printing/printing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
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
    CloudinaryModule,
    PrescriptionsModule,
    OrdersModule,
    ProductAttributeValuesModule,
    QuantityConfigsModule,
    ProductImagesModule,
    PrintingModule,
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService, OrdersService],
})
export class AppModule {}
