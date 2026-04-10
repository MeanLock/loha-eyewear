import { ApiProperty } from '@nestjs/swagger';
import { AttributeDataType } from 'src/database/enums';
import { type ValidationRules } from 'src/modules/product-type-config-attributes/types/validation-rules.type';

export class EnumOptionResponseDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Đen' })
  value: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/...', nullable: true })
  image_url: string | null;

  @ApiProperty({ example: 0 })
  sort_order: number;
}

export class ConfigAttributeResponseDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Màu sắc' })
  name: string;

  @ApiProperty({ example: 'color' })
  key: string;

  @ApiProperty({
    enum: AttributeDataType,
    example: AttributeDataType.ENUM || 'enum',
  })
  data_type: AttributeDataType;

  @ApiProperty({ example: true })
  is_required: boolean;

  @ApiProperty({ example: 0 })
  sort_order: number;

  @ApiProperty({ nullable: true })
  validation_rules: ValidationRules | null;

  @ApiProperty({ type: [EnumOptionResponseDto] })
  enum_options: EnumOptionResponseDto[];
}

export class ProductTypeResponseDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Kính mát' })
  name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ type: [ConfigAttributeResponseDto] })
  config_attributes: ConfigAttributeResponseDto[];
}

export class ProductTypeBasicResponseDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Kính mát' })
  name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
