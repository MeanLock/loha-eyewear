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
import { Account } from './account.entity';
import type {
    EyePrescriptionRawData,
    FinalPrescriptionData,
} from '../../common/interfaces/eye-prescription.interfaces';

@Entity('eye_prescriptions')
export class EyePrescription {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // ── Liên kết khách hàng ──
    @Index()
    @Column({ type: 'uuid', nullable: true })
    customer_id: string;

    @Index()
    @Column({ type: 'varchar', length: 20 })
    customer_phone: string;

    // ── Dữ liệu đo (JSONB) ──
    @Column({ type: 'jsonb', nullable: true })
    raw_data: EyePrescriptionRawData;

    @Column({ type: 'jsonb', nullable: true })
    final_rx: FinalPrescriptionData;

    // ── Metadata ──
    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ type: 'timestamptz', nullable: true })
    measured_at: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    // ── Relations ──
    @ManyToOne(() => Account, (account) => account.prescriptions)
    @JoinColumn({ name: 'customer_id' })
    customer: Account;
}
