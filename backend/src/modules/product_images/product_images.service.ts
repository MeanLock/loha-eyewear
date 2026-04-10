import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateProductImagesDto } from './dto/create-product-images.dto';

@Injectable()
export class ProductImagesService {
    constructor(
        @InjectRepository(ProductImage) private productImageRepo: Repository<ProductImage>
    ) { }

    async createMany(data: CreateProductImagesDto) {
        return this.productImageRepo.save(data.product_images);
    }
}
