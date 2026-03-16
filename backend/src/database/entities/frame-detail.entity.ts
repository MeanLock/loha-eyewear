import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('frame_details')
export class FrameDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  product_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  frame_style: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  rim_type: string;

  @Column({ type: 'decimal', precision: 5, scale: 1, nullable: true })
  frame_width: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, nullable: true })
  lens_width: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, nullable: true })
  bridge_width: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, nullable: true })
  temple_length: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  frame_color: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  gender_target: string;

  @OneToOne(() => Product, (p) => p.frame_detail)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
