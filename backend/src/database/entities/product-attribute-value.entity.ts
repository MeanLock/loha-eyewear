import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductTypeConfigAttribute } from './product-type-config-attribute.entity';
import { ProductEnumAttributeOption } from './product-enum-attribute-option.entity';

@Entity('product_attribute_values')
@Unique(['product_id', 'attribute_id'])
export class ProductAttributeValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  product_id: string;

  @Column({ type: 'uuid' })
  attribute_id: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  value_string: string | null;

  @Column({ type: 'decimal', precision: 12, scale: 4, nullable: true })
  value_number: number | null;

  @Column({ type: 'boolean', nullable: true })
  value_boolean: boolean | null;

  @Column({ type: 'date', nullable: true })
  value_date: Date | null;

  @Column({ type: 'uuid', nullable: true })
  value_enum_option_id: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => Product, (p) => p.attribute_values)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => ProductTypeConfigAttribute)
  @JoinColumn({ name: 'attribute_id' })
  attribute: ProductTypeConfigAttribute;

  @ManyToOne(() => ProductEnumAttributeOption)
  @JoinColumn({ name: 'value_enum_option_id' })
  value_enum_option: ProductEnumAttributeOption;
}
