import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAttributeValue } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateProductAttributeValuesDto } from './dto/create-product-attribute-value.dto';

@Injectable()
export class ProductAttributeValuesService {
    constructor(
        @InjectRepository(ProductAttributeValue) private productAttributeValueRepo: Repository<ProductAttributeValue>
    ) { }

    async createMany(data: CreateProductAttributeValuesDto) {
        return await this.productAttributeValueRepo.save(data.attribute_values);
    };
}
