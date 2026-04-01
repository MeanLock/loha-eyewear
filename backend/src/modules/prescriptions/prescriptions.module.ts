import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EyePrescription } from '../../database/entities';
import { PrescriptionsController } from './prescriptions.controller';
import { PrescriptionsService } from './prescriptions.service';

@Module({
    imports: [TypeOrmModule.forFeature([EyePrescription])],
    controllers: [PrescriptionsController],
    providers: [PrescriptionsService],
    exports: [PrescriptionsService],
})
export class PrescriptionsModule { }
