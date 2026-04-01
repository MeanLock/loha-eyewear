import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { AccountRole } from '../enums';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ── Primary lookup key ──
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 20, unique: true })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  full_name: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  // ── Optional credentials (nullable cho guest / chỉ-phone flow) ──
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password_hash: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;

  // ── Profile ──
  @Column({ type: 'varchar', length: 10, nullable: true })
  gender: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar_url: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: AccountRole.CUSTOMER,
  })
  role: AccountRole;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  last_login_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at: Date;
}
