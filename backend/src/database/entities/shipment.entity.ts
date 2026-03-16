import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Supplier } from './supplier.entity';
import { ShipmentStatus } from './shipment-status.entity';
import { Account } from './account.entity';
import { ShipmentItem } from './shipment-item.entity';

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  supplier_id: string;

  @Index()
  @Column({ type: 'int', default: 1 })
  shipment_status_id: number;

  @Column({ type: 'int', generated: 'increment' })
  tracking_number: number;

  @Column({ type: 'date', nullable: true })
  ordered_at: Date;

  @Column({ type: 'date', nullable: true })
  expected_at: Date;

  @Column({ type: 'date', nullable: true })
  received_at: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total_cost: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'uuid', nullable: true })
  created_by: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => Supplier, (s) => s.shipments)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @ManyToOne(() => ShipmentStatus)
  @JoinColumn({ name: 'shipment_status_id' })
  shipment_status: ShipmentStatus;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'created_by' })
  creator: Account;

  @OneToMany(() => ShipmentItem, (si) => si.shipment)
  items: ShipmentItem[];
}
