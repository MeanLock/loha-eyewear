import { Module } from '@nestjs/common';
import { ProductImagesController } from './product_images.controller';
import { ProductImagesService } from './product_images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
  exports: [ProductImagesService],
})
export class ProductImagesModule {}
