import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Warranty } from './warranty.entity';
import { WarrantyClaimStatus } from './warranty-claim-status.entity';
import { Account } from './account.entity';

@Entity('warranty_claims')
export class WarrantyClaim {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  warranty_id: string;

  @Column({ type: 'text' })
  issue_description: string;

  @Column({ type: 'text', nullable: true })
  resolution: string;

  @Index()
  @Column({ type: 'int', default: 1 })
  status_id: number;

  @Column({ type: 'date', nullable: true })
  resolved_at: Date;

  @Column({ type: 'uuid', nullable: true })
  handled_by: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => Warranty, (w) => w.claims)
  @JoinColumn({ name: 'warranty_id' })
  warranty: Warranty;

  @ManyToOne(() => WarrantyClaimStatus)
  @JoinColumn({ name: 'status_id' })
  status: WarrantyClaimStatus;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'handled_by' })
  handler: Account;
}
