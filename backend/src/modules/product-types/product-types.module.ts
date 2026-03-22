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
})
export class ProductTypesModule { }
