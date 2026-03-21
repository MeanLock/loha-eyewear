import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTypeConfigAttribute } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateProductTypeConfigAttributeDto } from './dto/product-type-config-attribute.dto';

@Injectable()
export class ProductTypeConfigAttributesService {
    constructor(
        @InjectRepository(ProductTypeConfigAttribute) private readonly productTypeConfigAttributeRepo: Repository<ProductTypeConfigAttribute>
    ){}
}
