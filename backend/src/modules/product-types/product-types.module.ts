import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from 'src/database/entities';
import { ProductTypesController } from './product-types.controller';
import { ProductTypesService } from './product-types.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType]), CloudinaryModule],
  controllers: [ProductTypesController],
  providers: [ProductTypesService],
  exports: [ProductTypesService], // Export service để có thể sử dụng trong ProductsModule
})
export class ProductTypesModule {}
