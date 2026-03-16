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
