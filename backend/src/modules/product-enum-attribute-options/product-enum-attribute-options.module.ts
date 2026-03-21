import { Module } from '@nestjs/common';
import { ProductEnumAttributeOptionsController } from './product-enum-attribute-options.controller';
import { ProductEnumAttributeOptionsService } from './product-enum-attribute-options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEnumAttributeOption } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEnumAttributeOption])],
  controllers: [ProductEnumAttributeOptionsController],
  providers: [ProductEnumAttributeOptionsService],
  exports: [ProductEnumAttributeOptionsService]
})
export class ProductEnumAttributeOptionsModule { }
