import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductType } from '../../database/entities';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ProductAttributeValuesModule } from '../product-attribute-values/product-attribute-values.module';
import { QuantityConfigsModule } from '../quantity_configs/quantity_configs.module';
import { ProductImagesModule } from '../product_images/product_images.module';
import { ProductTypesModule } from '../product-types/product-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductType]),
    CloudinaryModule,
    ProductAttributeValuesModule,
    QuantityConfigsModule,
    ProductImagesModule,
    ProductTypesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
