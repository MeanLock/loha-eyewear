import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType)
    private readonly productTypeRepo: Repository<ProductType>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findAll(): Promise<ProductType[]> {
    return this.productTypeRepo.find({
      relations: {
        config_attributes: {
          enum_options: true,
        },
      },
      order: {
        name: 'ASC',
        config_attributes: {
          sort_order: 'ASC',
          enum_options: {
            sort_order: 'ASC',
          },
        },
      },
    });
  }

  async findAllBasic(): Promise<ProductType[]> {
    return this.productTypeRepo.find();
  }

  async findOne(id: string): Promise<ProductType> {
    const productType = await this.productTypeRepo.findOne({
      where: { id },
      relations: {
        config_attributes: {
          enum_options: true,
        },
      },
      order: {
        name: 'ASC',
        config_attributes: {
          sort_order: 'ASC',
          enum_options: {
            sort_order: 'ASC',
          },
        },
      },
    });
    if (!productType) {
      throw new NotFoundException(`Không tìm thấy loại sản phẩm với id: ${id}`);
    }
    return productType;
  }

  async create(dto: CreateProductTypeDto) {
    console.log('--- START ProductTypeService.create ---');
    console.log('Received DTO:', JSON.stringify(dto, null, 2));

    const productType = this.productTypeRepo.create({
      name: dto.name,
      prefix: dto.prefix,
      config_attributes: dto.attributes.map(({ options, ...attr }) => ({
        ...attr,
        enum_options: options,
      })),
    });

    console.log(
      'Mapped productType entity for saving:',
      JSON.stringify(productType, null, 2),
    );

    // Save to DB and generate all UUIDs (Type, Attributes, Options)
    const savedProductType = await this.productTypeRepo.save(productType);
    console.log(
      'Saved productType (first pass):',
      JSON.stringify(savedProductType, null, 2),
    );

    let hasImageUpdates = false;

    // Iterate over the saved entities to move images on Cloudinary
    for (const attr of savedProductType.config_attributes || []) {
      if (attr.enum_options && attr.enum_options.length > 0) {
        for (const option of attr.enum_options) {
          if (option.image_url && option.image_url.includes('/temp/')) {
            const oldPublicId = this.cloudinaryService.extractPublicId(
              option.image_url,
            );
            console.log(
              `Processing image for option ${option.id}. Old Public ID: ${oldPublicId}`,
            );
            if (oldPublicId) {
              const newPublicId = `product-types/${savedProductType.id}/${attr.id}/${option.id}`;
              const newUrl = await this.cloudinaryService.renameImage(
                oldPublicId,
                newPublicId,
              );
              console.log(`Renamed image to: ${newUrl}`);
              option.image_url = newUrl;
              hasImageUpdates = true;
            }
          }
        }
      }
    }

    // If any image was updated, save the ProductType (with its cascaded relations) again
    if (hasImageUpdates) {
      console.log('Image updates detected, saving ProductType again...');
      await this.productTypeRepo.save(savedProductType);
      console.log('Saved productType (second pass)');
    }

    console.log('--- END ProductTypeService.create ---');
    return savedProductType;
  }
}
