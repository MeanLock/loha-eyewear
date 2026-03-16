import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('lens_details')
export class LensDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  product_id: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  lens_type: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  lens_index: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lens_material: string;

  @Index()
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  sph: number;

  @Index()
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  cyl: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  add_power: number;

  @Column({ type: 'int', nullable: true })
  diameter: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  coating: string;

  @Column({ type: 'boolean', default: false })
  is_photochromic: boolean;

  @OneToOne(() => Product, (p) => p.lens_detail)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
