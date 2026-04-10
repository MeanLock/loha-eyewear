import { Injectable } from '@nestjs/common';
import { ProductQuantityConfig } from 'src/database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductQuantityConfigsDto } from './dto/create-product-quantity-config.dto';

@Injectable()
export class QuantityConfigsService {
    constructor(
        @InjectRepository(ProductQuantityConfig) private quantityConfigRepo: Repository<ProductQuantityConfig>
    ) { }

    async createMany(data: CreateProductQuantityConfigsDto) {
        return this.quantityConfigRepo.save(data.quantity_configs);
    }
}
