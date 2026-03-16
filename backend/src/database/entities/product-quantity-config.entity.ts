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

@Entity('product_quantity_configs')
@Unique(['product_id', 'unit_name'])
export class ProductQuantityConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  product_id: string;

  @Column({ type: 'varchar', length: 50 })
  unit_name: string;

  @Column({ type: 'boolean', default: false })
  is_base_unit: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 4, default: 1 })
  conversion_factor: number;

  @Column({ type: 'boolean', default: true })
  is_integer_only: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => Product, (p) => p.quantity_configs)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
