import { PartialType } from '@nestjs/swagger';
import { CreateEyePrescriptionDto } from './create-eye-prescription.dto';

export class UpdateEyePrescriptionDto extends PartialType(CreateEyePrescriptionDto) { }
