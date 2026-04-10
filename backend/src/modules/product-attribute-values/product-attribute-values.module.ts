import { Module } from '@nestjs/common';
import { ProductAttributeValuesController } from './product-attribute-values.controller';
import { ProductAttributeValuesService } from './product-attribute-values.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttributeValue } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAttributeValue])],
  controllers: [ProductAttributeValuesController],
  providers: [ProductAttributeValuesService],
  exports: [ProductAttributeValuesService],
})
export class ProductAttributeValuesModule {}
