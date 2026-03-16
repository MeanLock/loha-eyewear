import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { ShipmentItem } from './shipment-item.entity';

@Entity('order_item_allocations')
export class OrderItemAllocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  order_item_id: string;

  @Index()
  @Column({ type: 'uuid' })
  shipment_item_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  allocated_quantity: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ManyToOne(() => OrderItem, (oi) => oi.allocations)
  @JoinColumn({ name: 'order_item_id' })
  order_item: OrderItem;

  @ManyToOne(() => ShipmentItem, (si) => si.allocations)
  @JoinColumn({ name: 'shipment_item_id' })
  shipment_item: ShipmentItem;
}
