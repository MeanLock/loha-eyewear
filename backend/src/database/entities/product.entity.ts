import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ProductType } from './product-type.entity';
import { ProductStatus } from './product-status.entity';
import { ProductAttributeValue } from './product-attribute-value.entity';
import { ProductQuantityConfig } from './product-quantity-config.entity';
import { ProductImage } from './product-image.entity';
import { FrameDetail } from './frame-detail.entity';
import { LensDetail } from './lens-detail.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image_url: string;

  @Index()
  @Column({ type: 'uuid' })
  product_type_id: string;

  @Index()
  @Column({ type: 'int', default: 2 })
  status_id: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  listed_price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  minimum_price: number;

  @Column({ type: 'boolean', default: true })
  price_after_tax: boolean;

  @Column({ type: 'boolean', default: false })
  is_expirable: boolean;

  @Column({ type: 'int', default: 1 })
  min_order_range_count: number;

  @Column({ type: 'int', nullable: true })
  minimum_saleable_range_count: number;

  @Column({ type: 'jsonb', nullable: true })
  meta_data: Record<string, any>;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at: Date;

  @ManyToOne(() => ProductType, (t) => t.products)
  @JoinColumn({ name: 'product_type_id' })
  product_type: ProductType;

  @ManyToOne(() => ProductStatus)
  @JoinColumn({ name: 'status_id' })
  status: ProductStatus;

  @OneToMany(() => ProductAttributeValue, (v) => v.product)
  attribute_values: ProductAttributeValue[];

  @OneToMany(() => ProductQuantityConfig, (q) => q.product)
  quantity_configs: ProductQuantityConfig[];

  @OneToMany(() => ProductImage, (img) => img.product)
  images: ProductImage[];

  @OneToOne(() => FrameDetail, (f) => f.product)
  frame_detail: FrameDetail;

  @OneToOne(() => LensDetail, (l) => l.product)
  lens_detail: LensDetail;
}
