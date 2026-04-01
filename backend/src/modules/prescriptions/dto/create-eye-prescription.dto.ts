import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
    IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

// ── Raw data sub-DTOs (khớp "eyeprescript" từ FE) ──

class EyeMeasurementDto {
    @ApiProperty({ example: -1.5 })
    @IsNumber()
    sph: number;

    @ApiProperty({ example: -0.75 })
    @IsNumber()
    cyl: number;

    @ApiProperty({ example: 90 })
    @IsNumber()
    axis: number;
}

class EyeRawDetailDto {
    @ApiProperty({ example: 12.5 })
    @IsNumber()
    vd: number;

    @ApiProperty({ type: EyeMeasurementDto })
    @ValidateNested()
    @Type(() => EyeMeasurementDto)
    first_time: EyeMeasurementDto;

    @ApiProperty({ type: EyeMeasurementDto })
    @ValidateNested()
    @Type(() => EyeMeasurementDto)
    second_time: EyeMeasurementDto;

    @ApiProperty({ type: EyeMeasurementDto })
    @ValidateNested()
    @Type(() => EyeMeasurementDto)
    avg: EyeMeasurementDto;
}

class RawDataDto {
    @ApiProperty({ example: 'rx-001' })
    @IsString()
    id: string;

    @ApiProperty({ example: '2026-04-01T09:00:00Z' })
    @IsString()
    time: string;

    @ApiProperty({ type: EyeRawDetailDto })
    @ValidateNested()
    @Type(() => EyeRawDetailDto)
    right_eye: EyeRawDetailDto;

    @ApiProperty({ type: EyeRawDetailDto })
    @ValidateNested()
    @Type(() => EyeRawDetailDto)
    left_eye: EyeRawDetailDto;

    @ApiProperty({ example: 63 })
    @IsNumber()
    pd: number;
}

// ── Final Rx sub-DTOs (khớp "final_prescription" từ FE) ──
// LƯU Ý: dùng "axs" (KHÔNG phải "axis")

class FinalEyeRxDto {
    @ApiProperty({ example: -2.0 })
    @IsNumber()
    sph: number;

    @ApiProperty({ example: -0.5 })
    @IsNumber()
    cyl: number;

    @ApiProperty({ example: 0, description: 'Mặc định = 0' })
    @IsNumber()
    add: number = 0;

    @ApiProperty({ example: 180, description: 'Trục (dùng "axs", KHÔNG phải "axis")' })
    @IsNumber()
    axs: number;
}

class FinalRxDto {
    @ApiProperty({ type: FinalEyeRxDto })
    @ValidateNested()
    @Type(() => FinalEyeRxDto)
    left_eye: FinalEyeRxDto;

    @ApiProperty({ type: FinalEyeRxDto })
    @ValidateNested()
    @Type(() => FinalEyeRxDto)
    right_eye: FinalEyeRxDto;
}

// ── Main DTO ──

export class CreateEyePrescriptionDto {
    @ApiProperty({ description: 'Số điện thoại khách hàng', example: '0901234567' })
    @IsString()
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    customer_phone: string;

    @ApiPropertyOptional({ description: 'UUID khách hàng (nếu đã có tài khoản)' })
    @IsUUID()
    @IsOptional()
    customer_id?: string;

    @ApiPropertyOptional({ type: RawDataDto, description: 'Dữ liệu đo thô từ máy' })
    @ValidateNested()
    @Type(() => RawDataDto)
    @IsOptional()
    raw_data?: RawDataDto;

    @ApiPropertyOptional({ type: FinalRxDto, description: 'Đơn kính cuối cùng' })
    @ValidateNested()
    @Type(() => FinalRxDto)
    @IsOptional()
    final_rx?: FinalRxDto;

    @ApiPropertyOptional({ description: 'Ghi chú', example: 'Khách cận nặng, cần kính chống ánh sáng xanh' })
    @IsString()
    @IsOptional()
    notes?: string;

    @ApiPropertyOptional({ description: 'Thời điểm đo', example: '2026-04-01T09:00:00Z' })
    @IsDateString()
    @IsOptional()
    measured_at?: string;
}
