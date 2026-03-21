import { Module } from '@nestjs/common';
import { ProductTypeConfigAttributesController } from './product-type-config-attributes.controller';
import { ProductTypeConfigAttributesService } from './product-type-config-attributes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeConfigAttribute } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTypeConfigAttribute])],
  controllers: [ProductTypeConfigAttributesController],
  providers: [ProductTypeConfigAttributesService]
})
export class ProductTypeConfigAttributesModule { }
