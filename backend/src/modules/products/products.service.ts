import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { DataSource, IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Product,
  ProductAttributeValue,
  ProductImage,
  ProductQuantityConfig,
} from '../../database/entities';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { createTranslator } from 'short-uuid';
import { ProductTypesService } from '../product-types/product-types.service';
import { AccountRole } from 'src/database/enums';
import { paginate, paginateRaw } from 'nestjs-typeorm-paginate';
import { ProductResponseDto } from './dto/product-response.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private readonly dataSource: DataSource,
    private readonly cloudinaryService: CloudinaryService,
    private readonly productTypeService: ProductTypesService,
  ) {}

  async create(data: CreateProductDto) {
    return await this.dataSource.transaction(async (manager) => {
      // B1: Tạo formattedMetaData - flat object để lưu JSONB trong Postgres
      const formattedMetaData = data.attribute_values.reduce(
        (acc, item) => {
          acc[item.attribute.key] = item.value;
          return acc;
        },
        {} as Record<string, any>,
      );

      // B2: Tạo product cơ bản thôi
      const product = manager.create(Product, {
        code: `TEMP-${Date.now()}`,
        name: data.name,
        description: data.description,
        image_url: data.image_url,
        product_type_id: data.product_type.id,
        status_id: data.status_id,
        listed_price: data.listed_price,
        minimum_price: data.minimum_price,
        price_after_tax: data.price_after_tax,
        is_expirable: data.is_expirable,
        min_order_range_count: data.min_order_range_count,
        minimum_saleable_range_count: data.minimum_saleable_range_count,
        meta_data: formattedMetaData,
        parent_id: data.parent_id,
      });

      // B3: Lưu vào DB để lấy ID
      const savedProduct = await manager.save(Product, product);

      // B4: Sinh SKU code từ UUID của product
      const translator = createTranslator(
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      );
      const shortId = translator.fromUUID(savedProduct.id).substring(0, 8);
      const skuCode = `${data.product_type.prefix}-${shortId}`;

      // B5: Cập nhật lại image_url của sản phẩm cho chuẩn + gom chung với code update
      const newPublicId = `products/${data.product_type.prefix}/${savedProduct.id}/main`;
      // data.image_url đã là public_id (frontend gửi lên), dùng thẳng
      await this.cloudinaryService.renameImage(data.image_url, newPublicId);

      // Gom 2 lần update thành 1: cập nhật code và image_url cùng lúc
      await manager.update(Product, savedProduct.id, {
        image_url: newPublicId,
        code: skuCode,
      });

      // B6: Lưu lại các product attribute values (dùng manager để nằm trong cùng transaction)
      const attributeValueEntities = data.attribute_values.flatMap((item) => {
        // Enum có thể chọn nhiều option → flatten ra nhiều row, 1 row per option
        if (item.attribute.data_type === 'enum') {
          const selectedIds = Array.isArray(item.value)
            ? (item.value as string[])
            : [item.value as string];
          return selectedIds
            .filter((id) => !!id) // Không lưu empty string
            .map((optionId) =>
              manager.create(ProductAttributeValue, {
                product_id: savedProduct.id,
                attribute_id: item.attribute.id,
                value_enum_option_id: optionId,
              }),
            );
        }
        return [
          manager.create(ProductAttributeValue, {
            product_id: savedProduct.id,
            attribute_id: item.attribute.id,
            value_string:
              item.attribute.data_type === 'string'
                ? (item.value as string) || null
                : null,
            value_number:
              item.attribute.data_type === 'number'
                ? (item.value as number)
                : null,
            value_boolean:
              item.attribute.data_type === 'boolean'
                ? (item.value as boolean)
                : null,
            value_date:
              item.attribute.data_type === 'date'
                ? new Date(item.value as string)
                : null,
          }),
        ];
      });
      if (attributeValueEntities.length > 0) {
        await manager.save(ProductAttributeValue, attributeValueEntities);
      }

      // B7: Lưu lại các product quantity configs (dùng manager)
      if (data.quantity_configs.length > 0) {
        const quantityConfigEntities = data.quantity_configs.map((item) =>
          manager.create(ProductQuantityConfig, {
            product_id: savedProduct.id,
            unit_name: item.unit_name,
            is_base_unit: item.is_base_unit,
            conversion_factor: item.conversion_factor,
            is_integer_only: item.is_integer_only,
          }),
        );
        await manager.save(ProductQuantityConfig, quantityConfigEntities);
      }

      // B8: Lưu các product_images, rename từng ảnh sang đúng path (mỗi ảnh có public ID riêng)
      if (data.product_images.length > 0) {
        const productImageEntities = await Promise.all(
          data.product_images.map(async (item, index) => {
            const imagePublicId = `products/${data.product_type.prefix}/${savedProduct.id}/gallery-${index}`;
            // item.image_url đã là public_id (frontend gửi lên), dùng thẳng
            const renamedUrl = await this.cloudinaryService.renameImage(
              item.image_url,
              imagePublicId,
            );
            return manager.create(ProductImage, {
              product_id: savedProduct.id,
              image_url: renamedUrl,
              sort_order: item.sort_order,
              is_primary: item.is_primary,
            });
          }),
        );
        await manager.save(ProductImage, productImageEntities);
      }

      // Trả về product đã được cập nhật đầy đủ (code và image_url mới)
      return { ...savedProduct, code: skuCode, image_url: newPublicId };
    });
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
        currentPage: pagination.page,
      },
    };
  }

  async findOne(id: string) {
    // Stub
    if (id === 'not-found')
      throw new NotFoundException('Sản phẩm không tồn tại');
    return {
      id,
      code: 'SP1',
      name: 'Kính 1',
      listed_price: 1500000,
    };
  }

  async findParents(productTypeId: string) {
    // Tìm ra các sản phẩm có productTypeId trùng và có parentId là null
    const parents = await this.productRepo.find({
      where: {
        product_type_id: productTypeId,
        parent_id: IsNull(),
      },
      select: [
        'id',
        'code',
        'name',
        'image_url',
        'listed_price',
        'minimum_price',
        'minimum_saleable_range_count',
        'min_order_range_count',
        'price_after_tax',
        'is_expirable',
        'parent_id',
      ],
    });
    return parents;
  }

  async findByProductType(
    productTypeId: string,
    pagination: PaginationDto,
    userRole: AccountRole,
  ) {
    console.log('User role trong service:', userRole);
    // Kiểm tra xem Product Type đó có tồn tại không
    const productType = await this.productTypeService.findOne(productTypeId);

    if (!productType) {
      throw new NotFoundException(
        `Loại sản phẩm với ID ${productTypeId} không tồn tại.`,
      );
    }

    // Tìm ra các sản phẩm có productTypeId trùng, tuy nhiên cần check theo role nữa
    const limit = pagination.limit
      ? pagination.limit > 100
        ? 100
        : pagination.limit
      : 10;
    const queryBuilder = this.productRepo
      .createQueryBuilder('product')
      .where('product.product_type_id = :productTypeId', { productTypeId });

    // Bắt đầu thêm vào các điều kiện lọc theo role
    switch (userRole) {
      case AccountRole.CUSTOMER:
        // Khách hàng chỉ thấy sản phẩm có status_id = 2 (đang bán)
        queryBuilder.andWhere('product.status_id = :statusId', { statusId: 2 });
        break;
      case AccountRole.SALE_STAFF:
        // Nhân viên bán hàng thấy sản phẩm có status_id IN (1, 2) (đang bán và ngừng bán)
        queryBuilder.andWhere('product.status_id IN (:...statusIds)', {
          statusIds: [1, 2],
        });
        break;
      case AccountRole.MANAGER:
        // Quản lý thấy tất cả sản phẩm, không cần thêm điều kiện
        break;
      case AccountRole.ADMIN:
        break;
      default:
        // Guest hoặc role không xác định, chỉ thấy sản phẩm có status_id = 2 (đang bán)
        queryBuilder.andWhere('product.status_id = :statusId', { statusId: 2 });
        break;
    }

    // Lọc và thêm các thông số cho phù hợp với yêu cầu
    // Đầu tiên là các thông số có sẵn trong bảng product
    queryBuilder.select([
      'product.id',
      'product.code',
      'product.name',
      'product.image_url',
      'product.listed_price',
      'product.minimum_price',
      'product.minimum_saleable_range_count',
      'product.min_order_range_count',
      'product.price_after_tax',
      'product.is_expirable',
    ]);

    // Sau đó là các thông số cần tính toán từ các bảng liên quan
    // 1. Tính tổng số lượng khả dụng (quy đổi về base unit)
    queryBuilder.addSelect((subQuery) => {
      return subQuery
        .select(
          'SUM((si.input_amount - si.sold_count - si.reserved_count) * pq.conversion_factor)',
        )
        .from('shipment_items', 'si') // Đúng tên bảng trong DB của ShipmentItem
        .innerJoin(
          'product_quantity_configs',
          'pq',
          'pq.id = si.quantity_config_id',
        ) // Đúng tên bảng của ProductQuantityConfig
        .where('si.product_id = product.id')
        .andWhere('si.deleted_at IS NULL'); // Luôn nhớ check deleted_at vì bạn dùng soft delete
    }, 'total_available_quantity');

    // 2. Tổng số lô hàng chứa sản phẩm này
    queryBuilder.addSelect((subQuery) => {
      return subQuery
        .select('COUNT(DISTINCT si.shipment_id)')
        .from('shipment_items', 'si')
        .where('si.product_id = product.id')
        .andWhere('si.deleted_at IS NULL');
    }, 'total_shipments');

    // 3. Tổng số lượng đã hết hạn (chỉ tính những lô có is_expired = true hoặc expire_date < now)
    queryBuilder.addSelect((subQuery) => {
      return subQuery
        .select(
          'SUM((si.input_amount - si.sold_count - si.reserved_count) * pq.conversion_factor)',
        )
        .from('shipment_items', 'si')
        .innerJoin(
          'product_quantity_configs',
          'pq',
          'pq.id = si.quantity_config_id',
        )
        .where('si.product_id = product.id')
        .andWhere('(si.is_expired = true OR si.expire_date < CURRENT_DATE)')
        .andWhere('si.deleted_at IS NULL');
    }, 'total_expired_quantity');

    // Thêm phân trang
    queryBuilder.orderBy('product.id', 'DESC'); // Sắp xếp tùy ý

    // console.log('>>> QUERY BUILDER NÈ: ', queryBuilder.getSql()); // Xem câu SQL thô
    // console.log('>>> PARAMETERS: ', queryBuilder.getParameters()); // Xem các tham số truyền vào
    const options = {
      page: pagination.page, // paginate lib bắt đầu page từ 1
      limit,
      route: `/products/by-type/${productTypeId}`, // Đường dẫn gốc cho pagination links
    };

    // const result = await paginate<any>(queryBuilder, options);
    // const testRaw = await queryBuilder.getRawMany();
    // console.log('Dữ liệu thô từ DB:', testRaw);
    // result.items.forEach((item) => {
    //   item.total_available_quantity =
    //     Number(item.total_available_quantity) || 0;
    //   item.total_shipments = Number(item.total_shipments) || 0;
    //   item.total_expired_quantity = Number(item.total_expired_quantity) || 0;
    // });

    // return result;
    // 1. Ép kiểu về any để lấy được dữ liệu thô
    const result = await paginateRaw<any>(queryBuilder, options);

    const mappedItems = result.items.map((item) => {
      // Khi dùng paginateRaw, tên key có thể dính prefix table hoặc nguyên bản
      // Bạn check log lần nữa nếu key bị đổi tên (thường là "total_available_quantity")
      return {
        id: item.product_id, // Lưu ý: paginateRaw có thể trả về key theo dạng table_column
        code: item.product_code,
        name: item.product_name,
        image_url: item.product_image_url,
        listed_price: item.product_listed_price,
        minimum_price: item.product_minimum_price,
        minimum_saleable_range_count: item.product_minimum_saleable_range_count,
        min_order_range_count: item.product_min_order_range_count,
        price_after_tax: item.product_price_after_tax,
        is_expirable: item.product_is_expirable,
        total_available_quantity: Number(item.total_available_quantity || 0),
        total_shipments: Number(item.total_shipments || 0),
        total_expired_quantity: Number(item.total_expired_quantity || 0),
      };
    });

    return { ...result, items: mappedItems };
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
