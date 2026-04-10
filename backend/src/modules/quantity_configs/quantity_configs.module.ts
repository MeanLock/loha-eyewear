import { Module } from '@nestjs/common';
import { QuantityConfigsController } from './quantity_configs.controller';
import { QuantityConfigsService } from './quantity_configs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductQuantityConfig } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductQuantityConfig])],
  controllers: [QuantityConfigsController],
  providers: [QuantityConfigsService],
  exports: [QuantityConfigsService],
})
export class QuantityConfigsModule {}
