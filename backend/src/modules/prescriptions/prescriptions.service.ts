import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EyePrescription } from '../../database/entities';
import { CreateEyePrescriptionDto } from './dto/create-eye-prescription.dto';
import { UpdateEyePrescriptionDto } from './dto/update-eye-prescription.dto';

@Injectable()
export class PrescriptionsService {
    constructor(
        @InjectRepository(EyePrescription)
        private readonly prescriptionRepo: Repository<EyePrescription>,
    ) { }

    async create(dto: CreateEyePrescriptionDto): Promise<EyePrescription> {
        const prescription = this.prescriptionRepo.create({
            customer_id: dto.customer_id,
            customer_phone: dto.customer_phone,
            raw_data: dto.raw_data as any,
            final_rx: dto.final_rx as any,
            notes: dto.notes,
            measured_at: dto.measured_at ? new Date(dto.measured_at) : undefined,
        });
        return this.prescriptionRepo.save(prescription);
    }

    async findAll(): Promise<EyePrescription[]> {
        return this.prescriptionRepo.find({
            relations: ['customer'],
            order: { created_at: 'DESC' },
        });
    }

    async findOne(id: string): Promise<EyePrescription> {
        const prescription = await this.prescriptionRepo.findOne({
            where: { id },
            relations: ['customer'],
        });
        if (!prescription) {
            throw new NotFoundException(`Không tìm thấy đơn đo mắt với id: ${id}`);
        }
        return prescription;
    }

    async findByPhone(phone: string): Promise<EyePrescription[]> {
        return this.prescriptionRepo.find({
            where: { customer_phone: phone },
            relations: ['customer'],
            order: { created_at: 'DESC' },
        });
    }

    async update(id: string, dto: UpdateEyePrescriptionDto): Promise<EyePrescription> {
        const prescription = await this.findOne(id);
        Object.assign(prescription, {
            ...dto,
            measured_at: dto.measured_at ? new Date(dto.measured_at) : prescription.measured_at,
        });
        return this.prescriptionRepo.save(prescription);
    }

    async remove(id: string): Promise<void> {
        const prescription = await this.findOne(id);
        await this.prescriptionRepo.remove(prescription);
    }
}
