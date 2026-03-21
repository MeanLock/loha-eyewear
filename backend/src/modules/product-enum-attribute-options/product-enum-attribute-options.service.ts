import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEnumAttributeOption } from 'src/database/entities';
import { Repository } from 'typeorm';
import { AttributeEnumOptionDto } from './dto/product-enum-attribute-option.enum';

@Injectable()
export class ProductEnumAttributeOptionsService {
    constructor(
        @InjectRepository(ProductEnumAttributeOption) private readonly productEnumAttributeOptionRepo: Repository<ProductEnumAttributeOption>,
    ) { }
    async update(id: string, updateProductEnumAttributeOptionDto: AttributeEnumOptionDto) {
        const { value, image_url, sort_order } = updateProductEnumAttributeOptionDto;
        const productEnumAttributeOption = await this.productEnumAttributeOptionRepo.findOne({ where: { id } });
        if (!productEnumAttributeOption) {
            throw new NotFoundException('Product enum attribute option not found');
        }
        productEnumAttributeOption.value = value;
        productEnumAttributeOption.image_url = image_url;
        productEnumAttributeOption.sort_order = sort_order;
        return await this.productEnumAttributeOptionRepo.save(productEnumAttributeOption);
    }

    async updateImageUrl(id: string, image_url: string) {
        const productEnumAttributeOption = await this.productEnumAttributeOptionRepo.findOne({ where: { id } });
        if (!productEnumAttributeOption) {
            throw new NotFoundException('Product enum attribute option not found');
        }
        productEnumAttributeOption.image_url = image_url;
        return await this.productEnumAttributeOptionRepo.save(productEnumAttributeOption);
    }

    async updateSortOrder(id: string, sort_order: number) {
        const productEnumAttributeOption = await this.productEnumAttributeOptionRepo.findOne({ where: { id } });
        if (!productEnumAttributeOption) {
            throw new NotFoundException('Product enum attribute option not found');
        }
        productEnumAttributeOption.sort_order = sort_order;
        return await this.productEnumAttributeOptionRepo.save(productEnumAttributeOption);
    }

    async updateValue(id: string, value: string) {
        const productEnumAttributeOption = await this.productEnumAttributeOptionRepo.findOne({ where: { id } });
        if (!productEnumAttributeOption) {
            throw new NotFoundException('Product enum attribute option not found');
        }
        productEnumAttributeOption.value = value;
        return await this.productEnumAttributeOptionRepo.save(productEnumAttributeOption);
    }

    async delete(id: string) {
        const productEnumAttributeOption = await this.productEnumAttributeOptionRepo.findOne({ where: { id } });
        if (!productEnumAttributeOption) {
            throw new NotFoundException('Product enum attribute option not found');
        }
        return await this.productEnumAttributeOptionRepo.remove(productEnumAttributeOption);
    }
}
