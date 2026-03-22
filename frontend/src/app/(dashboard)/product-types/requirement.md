
## Cấu trúc back-end có sẵn ở folder /backend:

- Controller:
``` typescript
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from 'src/common/decorators/roles.decorator';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from 'src/common/guards/roles.guard';

import { AccountRole } from 'src/database/enums';

import { ProductTypesService } from './product-types.service';

import { CreateProductTypeDto } from './dto/create-product-type.dto';

  

@ApiTags('Product Types')

@ApiBearerAuth('JWT-auth')

@UseGuards(JwtAuthGuard, RolesGuard)

@Roles(AccountRole.ADMIN)

@Controller('product-types')

export class ProductTypesController {

    constructor(private readonly productTypesService: ProductTypesService) { }

  

    @Post()

    @ApiOperation({ summary: 'Tạo loại sản phẩm mới' })

    async create(@Body() createProductTypeDto: CreateProductTypeDto) {

        return await this.productTypesService.create(createProductTypeDto);

    }

}
```

- Service:
``` typescript
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
```

- CreateProductTypeDTO:
``` ts
import { Type } from "class-transformer";

import { IsArray, IsString, MinLength, ValidateNested } from "class-validator";

import { CreateProductTypeConfigAttributeDto } from "src/modules/product-type-config-attributes/dto/product-type-config-attribute.dto";

  

export class CreateProductTypeDto {

    @IsString()

    @MinLength(1)

    name: string;

  

    @IsArray()

    @ValidateNested({ each: true })

    @Type(() => CreateProductTypeConfigAttributeDto)

    attributes: CreateProductTypeConfigAttributeDto[];

}
```

- CreateProductTypeConfigAttributeDto:
``` ts
import { IsArray, IsBoolean, IsEAN, IsEnum, IsInt, IsObject, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";

import { type ValidationRules } from "../types/validation-rules.type";

import { Type } from "class-transformer";

import { AttributeEnumOptionDto } from "src/modules/product-enum-attribute-options/dto/product-enum-attribute-option.enum";

import { AttributeDataType } from "src/database/enums";

  

export class CreateProductTypeConfigAttributeDto {

    @IsString()

    @MinLength(1)

    name: string;

  

    @IsString()

    @MinLength(1)

    key: string;

  

    @IsString()

    @IsOptional()

    @MinLength(1)

    product_type_id: string;

  

    @IsEnum(AttributeDataType)

    data_type: AttributeDataType;

  

    @IsBoolean()

    is_required: boolean;

  

    @IsInt()

    sort_order: number;

  

    @IsObject()

    @IsOptional()

    @Type(() => Object)

    validation_rules: ValidationRules;

  

    @IsArray()

    @ValidateNested({ each: true })

    @IsOptional()

    @Type(() => AttributeEnumOptionDto)

    options?: AttributeEnumOptionDto[];

}
```

- AttributeDataType:
``` ts
export enum AttributeDataType {

  NUMBER = 'number',

  STRING = 'string',

  BOOLEAN = 'boolean',

  DATE = 'date',

  ENUM = 'enum',

}
```

- AttributeEnumOptionDto:
``` ts
import { IsString, IsNotEmpty, IsOptional, IsUrl, IsIn, IsInt } from "class-validator";

  

export class AttributeEnumOptionDto {

    @IsString()

    @IsNotEmpty()

    value: string;

  

    @IsString()

    @IsOptional()

    image_url: string;

  

    @IsInt()

    sort_order: number;

}
```

- ValidationRules:
``` ts
import { ValidationRuleName } from "./validation-rule-name.enum";

  

export type ValidationRules = Partial<{

    // Number

    [ValidationRuleName.IS_INT]: boolean;

    [ValidationRuleName.MIN_VALUE]: number;

    [ValidationRuleName.MAX_VALUE]: number;

    [ValidationRuleName.IS_STEP]: boolean;

    [ValidationRuleName.STEP]: number;

    [ValidationRuleName.IS_NEGATIVEABLE]: boolean;

    [ValidationRuleName.UNIT_SYMBOL]: string;

  

    // String

    [ValidationRuleName.MIN_LENGTH]: number;

    [ValidationRuleName.MAX_LENGTH]: number;

    [ValidationRuleName.UI_TYPE]: string;

    [ValidationRuleName.IS_SPACEABLE]: boolean;

    [ValidationRuleName.IS_UNIQUE]: boolean;

    [ValidationRuleName.IS_UPPERCASE]: boolean;

    [ValidationRuleName.IS_LOWERCASE]: boolean;

  

    // Date

    [ValidationRuleName.MIN_DATE]: string;

    [ValidationRuleName.MAX_DATE]: string;

    [ValidationRuleName.IS_DEFAULT_DATE_TODAY]: boolean;

    [ValidationRuleName.RANGE_FROM_TODAY]: number;

    [ValidationRuleName.RANGE_TO_TODAY]: number;

  

    // Enum

    [ValidationRuleName.MIN_OPTIONS]: number;

    [ValidationRuleName.MAX_OPTIONS]: number;

  

    [ValidationRuleName.DEFAULT_VALUE]: any; // Nên để any vì boolean/string/number đều có default

}>
```

- ValidationRuleNames:
``` ts
export enum ValidationRuleName {

    // Number

    IS_INT = "is_int",

    MIN_VALUE = "min_value",

    MAX_VALUE = "max_value",

    IS_STEP = "is_step",

    STEP = "step",

    IS_NEGATIVEABLE = "is_negativeable",

    UNIT_SYMBOL = "unit_symbol",

    // String

    MIN_LENGTH = "min_length",

    MAX_LENGTH = "max_length",

    UI_TYPE = "ui_type",

    IS_SPACEABLE = "is_spaceable",

    IS_UNIQUE = "is_unique",

    IS_UPPERCASE = "is_uppercase",

    IS_LOWERCASE = "is_lowercase",

    REGEX_PATTERN = "regex_pattern",

    // Boolean

    DEFAULT_VALUE = "default_value",

    // Date

    MIN_DATE = "min_date",

    MAX_DATE = "max_date",

    IS_DEFAULT_DATE_TODAY = "is_default_date_today",

    RANGE_FROM_TODAY = "range_from_today",

    RANGE_TO_TODAY = "range_to_today",

    // Enum

    MIN_OPTIONS = "min_options",

    MAX_OPTIONS = "max_options",

    // All Types

    PLACEHOLDER = "placeholder",

    ERROR_MESSAGE = "error_message",

}
```


## Cấu trúc Entity:

- Product Types:
``` ts
import {

  Entity,

  PrimaryGeneratedColumn,

  Column,

  CreateDateColumn,

  UpdateDateColumn,

  OneToMany,

} from 'typeorm';

import { Product } from './product.entity';

import { ProductTypeConfigAttribute } from './product-type-config-attribute.entity';

  

@Entity('product_types')

export class ProductType {

  @PrimaryGeneratedColumn('uuid')

  id: string;

  

  @Column({ type: 'varchar', length: 100 })

  name: string;

  

  @CreateDateColumn({ type: 'timestamptz' })

  created_at: Date;

  

  @UpdateDateColumn({ type: 'timestamptz' })

  updated_at: Date;

  

  @OneToMany(() => Product, (p) => p.product_type)

  products: Product[];

  

  @OneToMany(() => ProductTypeConfigAttribute, (a) => a.product_type, {

    cascade: true

  })

  config_attributes: ProductTypeConfigAttribute[];

}
```

- Product Type Config Attributes:
``` ts
import {

  Entity,

  PrimaryGeneratedColumn,

  Column,

  CreateDateColumn,

  UpdateDateColumn,

  ManyToOne,

  OneToMany,

  JoinColumn,

} from 'typeorm';

import { ProductType } from './product-type.entity';

import { ProductEnumAttributeOption } from './product-enum-attribute-option.entity';

import { AttributeDataType } from '../enums';

import { type ValidationRules } from 'src/modules/product-type-config-attributes/types/validation-rules.type';

  

@Entity('product_type_config_attributes')

export class ProductTypeConfigAttribute {

  @PrimaryGeneratedColumn('uuid')

  id: string;

  

  @Column({ type: 'uuid' })

  product_type_id: string;

  

  @Column({ type: 'varchar', length: 100 })

  name: string;

  

  @Column({type: "varchar", length: 50})

  key: string;

  

  @Column({ type: 'varchar', length: 20 })

  data_type: AttributeDataType;

  

  @Column({ type: 'boolean', default: false })

  is_required: boolean;

  

  @Column({ type: 'int', default: 0 })

  sort_order: number;

  

  @Column({ type: 'jsonb', nullable: true })

  validation_rules: ValidationRules;

  

  @CreateDateColumn({ type: 'timestamptz' })

  created_at: Date;

  

  @UpdateDateColumn({ type: 'timestamptz' })

  updated_at: Date;

  

  @ManyToOne(() => ProductType, (t) => t.config_attributes)

  @JoinColumn({ name: 'product_type_id' })

  product_type: ProductType;

  

  @OneToMany(() => ProductEnumAttributeOption, (o) => o.attribute, {

    cascade: true

  })

  enum_options: ProductEnumAttributeOption[];

}
```

- Product Enum Attribute Option:
``` ts
import {

  Entity,

  PrimaryGeneratedColumn,

  Column,

  CreateDateColumn,

  ManyToOne,

  JoinColumn,

} from 'typeorm';

import { ProductTypeConfigAttribute } from './product-type-config-attribute.entity';

  

@Entity('product_enum_attribute_options')

export class ProductEnumAttributeOption {

  @PrimaryGeneratedColumn('uuid')

  id: string;

  

  @Column({ type: 'uuid' })

  attribute_id: string;

  

  @Column({ type: 'varchar', length: 255 })

  value: string;

  

  @Column({ type: 'varchar', length: 500, nullable: true })

  image_url: string;

  

  @Column({ type: 'int', default: 0 })

  sort_order: number;

  

  @CreateDateColumn({ type: 'timestamptz' })

  created_at: Date;

  

  @ManyToOne(() => ProductTypeConfigAttribute, (a) => a.enum_options)

  @JoinColumn({ name: 'attribute_id' })

  attribute: ProductTypeConfigAttribute;

}
```

## Task:

- Design cho trang /product-types/create để có thể cho phép người dùng sử dụng tạo ra 1 loại sản phẩm với các config chi tiết

- B1: Cho nhập tên của loại sản phẩm
- B2: Cho nút để nhấn thêm 1 attribute
- B3: Điền các config chi tiết có thể có của attribute như:
	- Tên attribute
	- IsRequired
	- Type của attribute
- B4: Với mỗi một type của attribute tương ứng, sẽ hiển thị bộ rules tương ứng ra như trong validation rule names á. Để người dùng config
- B5: Đảm bảo các trường đã valid và gửi về backend 

## Note:

- Xây dựng cấu trúc gửi ảnh lên cloudinary khi có thao tác up ảnh của user (như up ảnh minh họa cho các attribute enum options)
- Cứ mỗi ảnh được up lên, thì lưu tạm vào folder /temp bên trong cloudinary rồi lấy link lưu lại gửi về back end để lát backend handle.
- Có sẵn các .env cần thiết để làm việc với cloudinary rồi, ở file .env á:

``` ts
NEXT_CLOUDINARY_CLOUD_NAME=

NEXT_CLOUDINARY_API_KEY=

NEXT_CLOUDINARY_API_SECRET=
```

- Chức năng này cần Authorization nên gửi kèm token nhé. Và tách ra service riêng luôn nha (Như chức năng auth trong dự án)

## UI:

- Cơ bản dùng các components của ShadCN UI
- Minimal, hiện đại
- UI dễ dùng dễ tương tác
- Hiệu năng tối ưu với form
- UI có thể dùng `Accordion` hoặc `Tabs` cho từng Attribute để tránh trang bị dài dằng dặc khi có quá nhiều config. 

## Bổ sung yêu cầu kỹ thuật Front-end:

- **Form Library:** Sử dụng `react-hook-form` kết hợp với `zod` để validate. Lưu ý validate nested array cho `attributes` và `options`.
    
- **Dynamic Form:** Sử dụng `useFieldArray` để xử lý việc thêm/xóa Attribute và thêm/xóa Enum Options.
    
- **Component hóa:** Tách các bộ Validation Rules theo từng Data Type thành các component riêng (ví dụ: `NumberRules.tsx`, `StringRules.tsx`) để dễ quản lý.
    
- **Cloudinary Service:** Viết một hàm `uploadToCloudinary(file: File)` trả về `secure_url` và `public_id`. Ảnh phải được đẩy vào folder `temp/` như đã nêu.