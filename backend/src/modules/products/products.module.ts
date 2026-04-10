import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../database/entities';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ProductAttributeValuesModule } from '../product-attribute-values/product-attribute-values.module';
import { QuantityConfigsModule } from '../quantity_configs/quantity_configs.module';
import { ProductImagesModule } from '../product_images/product_images.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        CloudinaryModule,
        ProductAttributeValuesModule,
        QuantityConfigsModule,
        ProductImagesModule
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule { }
