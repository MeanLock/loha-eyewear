import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductTypeConfigAttribute } from './product-type-config-attribute.entity';

@Unique(['prefix', 'name'])
@Entity('product_types')
export class ProductType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  prefix: string;

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
