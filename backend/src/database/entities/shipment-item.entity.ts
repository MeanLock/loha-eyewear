import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Product } from './product.entity';
import { Shipment } from './shipment.entity';
import { ProductQuantityConfig } from './product-quantity-config.entity';
import { OrderItemAllocation } from './order-item-allocation.entity';

@Entity('shipment_items')
export class ShipmentItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  product_id: string;

  @Index()
  @Column({ type: 'uuid' })
  shipment_id: string;

  @Column({ type: 'uuid' })
  quantity_config_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  input_amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  reserved_count: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  sold_count: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  buy_price: number;

  @Column({ type: 'date', nullable: true })
  expire_date: Date;

  @Column({ type: 'date', nullable: true })
  manufacture_date: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  warehouse_location: string;

  @Column({ type: 'boolean', default: false })
  is_expired: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Shipment, (s) => s.items)
  @JoinColumn({ name: 'shipment_id' })
  shipment: Shipment;

  @ManyToOne(() => ProductQuantityConfig)
  @JoinColumn({ name: 'quantity_config_id' })
  quantity_config: ProductQuantityConfig;

  @OneToMany(() => OrderItemAllocation, (a) => a.shipment_item)
  allocations: OrderItemAllocation[];
}
