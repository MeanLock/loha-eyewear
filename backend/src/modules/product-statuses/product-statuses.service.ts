import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductStatusDto } from './dto/create-product-status.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
import { ProductStatus } from '../../database/entities/product-status.entity';

@Injectable()
export class ProductStatusesService {
    constructor(
        @InjectRepository(ProductStatus)
        private readonly productStatusRepository: Repository<ProductStatus>,
    ) { }

    async create(createProductStatusDto: CreateProductStatusDto) {
        const existingStatus = await this.productStatusRepository.findOne({
            where: { name: createProductStatusDto.name },
        });

        if (existingStatus) {
            throw new ConflictException(`Trạng thái sản phẩm với tên '${createProductStatusDto.name}' đã tồn tại.`);
        }

        const newStatus = this.productStatusRepository.create(createProductStatusDto);
        return await this.productStatusRepository.save(newStatus);
    }

    async findAll() {
        return await this.productStatusRepository.find();
    }

    async findOne(id: number) {
        const status = await this.productStatusRepository.findOne({ where: { id } });

        if (!status) {
            throw new NotFoundException(`Không tìm thấy trạng thái sản phẩm với ID: ${id}`);
        }

        return status;
    }

    async update(id: number, updateProductStatusDto: UpdateProductStatusDto) {
        const status = await this.findOne(id);

        if (updateProductStatusDto.name && updateProductStatusDto.name !== status.name) {
            const existingStatus = await this.productStatusRepository.findOne({
                where: { name: updateProductStatusDto.name },
            });

            if (existingStatus) {
                throw new ConflictException(`Trạng thái sản phẩm với tên '${updateProductStatusDto.name}' đã tồn tại.`);
            }
        }

        Object.assign(status, updateProductStatusDto);
        return await this.productStatusRepository.save(status);
    }

    async remove(id: number) {
        const status = await this.findOne(id);
        return await this.productStatusRepository.remove(status);
    }
}
