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
import { Product } from './product.entity';
import { Account } from './account.entity';
import { OrderItem } from './order-item.entity';
import { WarrantyClaim } from './warranty-claim.entity';

@Entity('warranties')
export class Warranty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 30, unique: true })
  warranty_code: string;

  @Column({ type: 'uuid' })
  product_id: string;

  @Column({ type: 'uuid', nullable: true })
  order_item_id: string;

  @Column({ type: 'uuid', nullable: true })
  customer_id: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'int' })
  duration_months: number;

  @Column({ type: 'text', nullable: true })
  terms: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => OrderItem)
  @JoinColumn({ name: 'order_item_id' })
  order_item: OrderItem;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'customer_id' })
  customer: Account;

  @OneToMany(() => WarrantyClaim, (wc) => wc.warranty)
  claims: WarrantyClaim[];
}
