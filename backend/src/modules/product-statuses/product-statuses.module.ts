import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductStatusesService } from './product-statuses.service';
import { ProductStatusesController } from './product-statuses.controller';
import { ProductStatus } from '../../database/entities/product-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductStatus])],
  controllers: [ProductStatusesController],
  providers: [ProductStatusesService],
})
export class ProductStatusesModule { }

