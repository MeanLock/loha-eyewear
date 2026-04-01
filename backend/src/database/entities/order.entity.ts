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
import { Account } from './account.entity';
import { OrderStatus } from './order-status.entity';
import { PaymentMethod } from './payment-method.entity';
import { VatConfig } from './vat-config.entity';
import { OrderItem } from './order-item.entity';
import { EyePrescription } from './eye-prescription.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 30, unique: true })
  order_code: string;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  customer_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  customer_name: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  customer_phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  customer_email: string;

  @Column({ type: 'text', nullable: true })
  shipping_address: string;

  // ── Liên kết đơn đo mắt ──
  @Column({ type: 'uuid', nullable: true })
  prescription_id: string;

  @Index()
  @Column({ type: 'int', default: 1 })
  status_id: number;

  @Column({ type: 'int', nullable: true })
  payment_method_id: number;

  @Column({ type: 'int', nullable: true })
  vat_config_id: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  discount_amount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  vat_amount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  paid_amount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  remaining_amount: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'uuid', nullable: true })
  created_by: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'customer_id' })
  customer: Account;

  @ManyToOne(() => EyePrescription)
  @JoinColumn({ name: 'prescription_id' })
  prescription: EyePrescription;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: 'status_id' })
  status: OrderStatus;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: 'payment_method_id' })
  payment_method: PaymentMethod;

  @ManyToOne(() => VatConfig)
  @JoinColumn({ name: 'vat_config_id' })
  vat_config: VatConfig;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'created_by' })
  creator: Account;

  @OneToMany(() => OrderItem, (oi) => oi.order)
  items: OrderItem[];
}

