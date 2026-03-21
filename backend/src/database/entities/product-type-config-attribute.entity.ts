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
