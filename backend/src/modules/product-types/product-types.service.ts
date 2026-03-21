import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateProductTypeDto } from './dto/create-product-type.dto';

@Injectable()
export class ProductTypesService {
    constructor(
        @InjectRepository(ProductType) private readonly productTypeRepo: Repository<ProductType>,
    ) { }

    async create(dto: CreateProductTypeDto) {
        const productType = this.productTypeRepo.create({
            name: dto.name,
            config_attributes: dto.attributes.map(({ options, ...attr }) => ({
                ...attr,
                enum_options: options
            }))
        });
        return await this.productTypeRepo.save(productType);
    }
}
