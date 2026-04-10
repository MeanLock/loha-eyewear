/**
 * ===== STRICT JSONB INTERFACES =====
 * Tên attribute PHẢI khớp 100% với Front-end.
 * KHÔNG được tự ý đổi: axs → axis, sph → sphere, v.v.
 */

// ── Sub-objects cho raw_data ──

/** Kết quả đo 1 lần (first_time / second_time / avg) */
export interface EyeMeasurement {
    sph: number;
    cyl: number;
    axis: number;
}

/** Dữ liệu 1 mắt trong raw_data */
export interface EyeRawDetail {
    vd: number;
    first_time: EyeMeasurement;
    second_time: EyeMeasurement;
    avg: EyeMeasurement;
}

/**
 * raw_data JSONB — khớp với Object "eyeprescript" từ FE.
 * Lưu toàn bộ dữ liệu đo thô từ máy.
 */
export interface EyePrescriptionRawData {
    id: string;
    time: string;
    right_eye: EyeRawDetail;
    left_eye: EyeRawDetail;
    pd: number;
}

// ── Sub-objects cho final_rx ──

/**
 * Đơn kính 1 mắt trong final_rx.
 * LƯU Ý: dùng "axs" (KHÔNG phải "axis") — theo yêu cầu FE.
 */
export interface FinalEyeRx {
    sph: number;
    cyl: number;
    add: number; // mặc định = 0
    axis: number;
}

/**
 * final_rx JSONB — khớp với Object "final_prescription" từ FE.
 * Đơn kính cuối cùng sau khi bác sĩ xác nhận.
 */
export interface FinalPrescriptionData {
    left_eye: FinalEyeRx;
    right_eye: FinalEyeRx;
}
