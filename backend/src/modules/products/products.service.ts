import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../../common/dtos/pagination.dto';

// Giả lập entity response cho code gọn
export interface ProductInterface {
    id: string;
    code: string;
    name: string;
    listed_price: number;
}

@Injectable()
export class ProductsService {
    constructor() {
        // Nếu dùng TypeORM thì inject Repo ở đây
        // @InjectRepository(Product) private productRepo: Repository<Product>
    }

    async create(createProductDto: CreateProductDto) {
        // Stub
        return {
            id: 'uuid-1234',
            ...createProductDto,
        };
    }

    async findAll(pagination: PaginationDto) {
        // Stub
        return {
            data: [
                { id: '1', code: 'SP1', name: 'Kính 1', listed_price: 1000 },
                { id: '2', code: 'SP2', name: 'Kính 2', listed_price: 2000 },
            ],
            meta: {
                totalItems: 2,
                itemCount: 2,
                itemsPerPage: pagination.limit,
                totalPages: 1,
                currentPage: Math.floor((pagination.offset || 0) / (pagination.limit || 20)) + 1,
            },
        };
    }

    async findOne(id: string) {
        // Stub
        if (id === 'not-found') throw new NotFoundException('Sản phẩm không tồn tại');
        return {
            id,
            code: 'SP1',
            name: 'Kính 1',
            listed_price: 1500000,
        };
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        return {
            id,
            ...updateProductDto,
        };
    }

    async remove(id: string) {
        return { success: true };
    }
}
